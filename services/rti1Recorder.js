require('dotenv').config();

const { spawn, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const { getActiveRti1Program, loadRti1Schedule, validateRti1Schedule } = require('./rti1Scheduler');
const { db, addOccurrence, registerRecording, finalizeRecording, failRecording, setRecordingState, addRecordingSegment, getRecordingSegments, publishReplay } = require('../models/program-db');

const TIMEZONE = 'Africa/Abidjan';
const CHANNEL_ID = 'rti-1';
const RECORD_ENABLED = process.env.RTI1_RECORD_ENABLED !== 'false';
const SOURCE_URL = String(process.env.RTI1_RECORD_SOURCE_URL || '').trim();
const FFMPEG_PATH = process.env.FFMPEG_PATH || 'ffmpeg';
const INTERVAL_MS = Math.max(5000, Number(process.env.RTI1_RECORD_INTERVAL_MS || 15000));
const OUTPUT_ROOT = path.resolve(
  process.env.RTI1_RECORD_ROOT ||
  path.join(process.cwd(), 'storage', 'vod', 'rti1', 'archive')
);
const TRANSCODE_FALLBACK = process.env.RTI1_RECORD_TRANSCODE_FALLBACK === 'true';

function safeName(value) {
  return String(value || 'program')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'program';
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function isoForDate(date, hhmm) {
  const [hour, minute] = String(hhmm).split(':').map(Number);
  const value = new Date(date);
  value.setUTCHours(hour, minute, 0, 0);
  return value;
}

function occurrenceStart(now, program) {
  const startToday = isoForDate(now, program.startTime);
  const endToday = isoForDate(now, program.endTime);
  if (endToday <= startToday) {
    if (now < endToday) {
      const previous = new Date(startToday);
      previous.setUTCDate(previous.getUTCDate() - 1);
      return previous;
    }
  }
  if (now < startToday && endToday > startToday) {
    const previous = new Date(startToday);
    previous.setUTCDate(previous.getUTCDate() - 1);
    return previous;
  }
  return startToday;
}

function occurrenceEnd(start, program) {
  const end = isoForDate(start, program.endTime);
  if (end <= start) end.setUTCDate(end.getUTCDate() + 1);
  return end;
}

function outputFor(program, startAt) {
  const dayDir = path.join(OUTPUT_ROOT, dateKey(startAt));
  fs.mkdirSync(dayDir, { recursive: true });
  const base = safeName(program.id + '-' + program.title);
  return {
    dayDir,
    finalPath: path.join(dayDir, base + '.mp4'),
    tempPath: path.join(dayDir, '.' + base + '.recording.mp4'),
    url: '/vod/rti1/archive/' + dateKey(startAt) + '/' + base + '.mp4'
  };
}

class Rti1Recorder {
  constructor({ schedule = loadRti1Schedule() } = {}) {
    validateRti1Schedule(schedule);
    this.schedule = schedule;
    this.process = null;
    this.timer = null;
    this.activeKey = null;
    this.recordingId = null;
    this.recordingStartedAt = null;
    this.stopping = false;
    this.segmentSequence = 0;
  }

  start() {
    if (!RECORD_ENABLED) {
      console.log('[RTI1 Recorder] Désactivé par RTI1_RECORD_ENABLED=false.');
      return;
    }
    if (!SOURCE_URL) {
      console.warn('[RTI1 Recorder] RTI1_RECORD_SOURCE_URL absent: enregistrement automatique désactivé.');
      return;
    }
    if (this.timer) return;
    this.stopping = false;
    this.sync();
    this.timer = setInterval(() => this.sync(), INTERVAL_MS);
    this.timer.unref();
    console.log('[RTI1 Recorder] Actif — source configurée.');
  }

  sync() {
    if (this.stopping || !SOURCE_URL || this.process) return;
    const now = new Date();
    const status = getActiveRti1Program(this.schedule, now);
    if (!status.success) return;

    const program = status.activeProgram;
    const startAt = occurrenceStart(now, program);
    const endAt = occurrenceEnd(startAt, program);
    const remainingSeconds = Math.max(1, Math.ceil((endAt.getTime() - now.getTime()) / 1000));
    const key = program.id + '@' + startAt.toISOString();

    if (this.activeKey !== key) {
      this.activeKey = key;
      this.segmentSequence = 0;
      this.recordingId = null;
      this.recordingStartedAt = null;
      this.createRecording(program, startAt, endAt, remainingSeconds);
      return;
    }

    // Same occurrence after a network failure: resume with a new segment.
    if (this.recordingId && remainingSeconds > 0) {
      this.startSegment(program, startAt, endAt, remainingSeconds);
    }
  }

  createRecording(program, startAt, endAt, durationSeconds) {
    const occurrence = db.prepare(
      'SELECT occurrence_id FROM program_occurrences WHERE program_id = ? AND start_at = ?'
    ).get(program.id, startAt.toISOString());

    this.recordingId = registerRecording({
      programId: program.id,
      occurrenceId: occurrence?.occurrence_id || null,
      channelId: CHANNEL_ID,
      sourceUrl: SOURCE_URL,
      startedAt: new Date().toISOString(),
      expectedDurationSeconds: durationSeconds
    });
    setRecordingState(this.recordingId, 'RECORDING', { status: 'recording' });
    this.recordingStartedAt = new Date().toISOString();
    this.segmentSequence = 0;
    this.startSegment(program, startAt, endAt, durationSeconds);
  }

  startSegment(program, startAt, endAt, durationSeconds) {
    if (this.process || !this.recordingId || durationSeconds <= 0 || this.stopping) return;

    this.segmentSequence += 1;
    const output = outputFor(program, startAt);
    const segmentDir = path.join(output.dayDir, 'segments');
    fs.mkdirSync(segmentDir, { recursive: true });
    const segmentBase = safeName(program.id + '-' + startAt.toISOString().replace(/[:.]/g, '-') + '-seg' + this.segmentSequence);
    const segmentPath = path.join(segmentDir, segmentBase + '.ts');
    const segmentRelative = path.relative(process.cwd(), segmentPath);
    const segmentStartedAt = new Date().toISOString();

    const args = [
      '-hide_banner', '-loglevel', 'warning',
      '-reconnect', '1',
      '-reconnect_streamed', '1',
      '-reconnect_delay_max', '5',
      '-i', SOURCE_URL,
      '-t', String(durationSeconds),
      '-map', '0:v:0',
      '-map', '0:a:0?',
      '-c', 'copy',
      '-f', 'mpegts',
      '-y', segmentPath
    ];

    console.log('[RTI1 Recorder] Segment', this.segmentSequence, program.title, '→', segmentPath);
    const child = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    this.process = child;

    child.stderr.on('data', chunk => {
      const message = String(chunk).trim();
      if (message) console.warn('[RTI1 Recorder]', message);
    });

    child.once('error', error => {
      if (this.process === child) this.process = null;
      console.error('[RTI1 Recorder] FFmpeg indisponible:', error.message);
      try { fs.rmSync(segmentPath, { force: true }); } catch {}
      if (this.recordingId) setRecordingState(this.recordingId, 'PARTIAL', { status: 'partial', error: error.message });
      if (!this.stopping) setTimeout(() => this.sync(), 250).unref();
    });

    child.once('close', async code => {
      if (this.process !== child) return;
      this.process = null;

      const endedAt = new Date().toISOString();
      let duration = 0;
      let size = 0;
      try {
        if (fs.existsSync(segmentPath)) {
          const stat = fs.statSync(segmentPath);
          size = stat.size;
          duration = await probeDuration(segmentPath);
        }
      } catch (error) {
        console.warn('[RTI1 Recorder] Probe segment échoué:', error.message);
      }

      if (size > 0 && duration > 0) {
        addRecordingSegment({
          recordingId: this.recordingId,
          sequenceNumber: this.segmentSequence,
          startedAt: segmentStartedAt,
          endedAt,
          durationSeconds: duration,
          storagePath: segmentRelative,
          fileSize: size,
          status: code === 0 ? 'available' : 'partial',
          error: code === 0 ? null : 'FFmpeg interrupted before scheduled end.'
        });
        db.prepare('UPDATE recordings SET segment_count = ?, updated_at = ? WHERE recording_id = ?')
          .run(this.segmentSequence, endedAt, this.recordingId);
      } else {
        try { fs.rmSync(segmentPath, { force: true }); } catch {}
      }

      const now = new Date();
      const remaining = Math.max(0, (endAt.getTime() - now.getTime()) / 1000);
      if (code === 0 && remaining <= 2) {
        await this.finalizeOccurrence(program, startAt, endAt);
        return;
      }

      if (remaining > 2 && !this.stopping) {
        setRecordingState(this.recordingId, 'PARTIAL', { status: 'partial', error: code === 0 ? null : 'Network/source interruption; recording will resume.' });
        setTimeout(() => this.sync(), 250).unref();
        return;
      }

      if (!this.stopping) {
        setRecordingState(this.recordingId, 'FAILED', { status: 'failed', error: 'Recording ended without a complete scheduled master.' });
        this.resetOccurrence();
      }
    });
  }

  async finalizeOccurrence(program, startAt, endAt) {
    if (!this.recordingId) return;
    const recordingId = this.recordingId;
    const output = outputFor(program, startAt);
    const segments = getRecordingSegments(recordingId)
      .filter(item => item.status === 'available' || item.status === 'partial')
      .sort((a, b) => a.sequenceNumber - b.sequenceNumber);

    if (!segments.length) {
      setRecordingState(recordingId, 'FAILED', { status: 'failed', error: 'No valid recording segment was produced.' });
      this.resetOccurrence();
      return;
    }

    setRecordingState(recordingId, 'FINALIZING', { status: 'finalizing' });
    fs.mkdirSync(output.dayDir, { recursive: true });
    const concatPath = path.join(output.dayDir, '.' + safeName(program.id + '-' + startAt.toISOString()) + '.concat.txt');
    const finalTemp = output.tempPath;
    const concatLines = segments.map(segment => "file '" + path.resolve(process.cwd(), segment.storagePath).replace(/'/g, "'\\''") + "'").join('\n') + '\n';
    fs.writeFileSync(concatPath, concatLines, 'utf8');

    try {
      await runProcess(FFMPEG_PATH, [
        '-hide_banner', '-loglevel', 'warning',
        '-f', 'concat', '-safe', '0', '-i', concatPath,
        '-map', '0:v:0', '-map', '0:a:0?',
        '-c', 'copy', '-bsf:a', 'aac_adtstoasc',
        '-movflags', '+faststart', '-y', finalTemp
      ]);
      if (!fs.existsSync(finalTemp)) throw new Error('Master MP4 absent après assemblage.');
      setRecordingState(recordingId, 'VALIDATING', { status: 'finalizing' });

      const stat = fs.statSync(finalTemp);
      const duration = await probeDuration(finalTemp);
      const expected = (endAt.getTime() - startAt.getTime()) / 1000;
      if (duration < Math.max(1, expected - 5)) {
        throw new Error('Durée du master insuffisante: ' + duration + 's / ' + expected + 's attendues.');
      }

      const sha256 = await sha256File(finalTemp);
      fs.renameSync(finalTemp, output.finalPath);
      addOccurrence(program.id, {
        channelId: CHANNEL_ID,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        description: program.description || '',
        playbackUrl: output.url
      });

      const mediaId = finalizeRecording(recordingId, {
        storagePath: path.relative(process.cwd(), output.finalPath),
        publicUrl: output.url,
        mimeType: 'video/mp4',
        fileSize: stat.size,
        durationSeconds: duration,
        recordedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        sha256
      });

      publishReplay({
        recordingId,
        mediaId,
        programId: program.id,
        occurrenceId: db.prepare('SELECT occurrence_id FROM program_occurrences WHERE program_id = ? AND start_at = ?').get(program.id, startAt.toISOString())?.occurrence_id || null,
        channelId: CHANNEL_ID,
        title: program.title,
        playbackUrl: output.url,
        durationSeconds: duration,
        broadcastDate: startAt.toISOString().slice(0, 10),
        genre: program.category || null
      });
      setRecordingState(recordingId, 'AVAILABLE', { status: 'available', completedAt: new Date().toISOString() });
      console.log('[RTI1 Recorder] Replay disponible:', output.url);
    } catch (error) {
      console.error('[RTI1 Recorder] Assemblage/validation impossible:', error.message);
      setRecordingState(recordingId, 'FAILED', { status: 'failed', error: error.message });
      try { fs.rmSync(finalTemp, { force: true }); } catch {}
    } finally {
      try { fs.rmSync(concatPath, { force: true }); } catch {}
      this.resetOccurrence();
    }
  }

  resetOccurrence() {
    this.process = null;
    this.activeKey = null;
    this.recordingId = null;
    this.recordingStartedAt = null;
    this.segmentSequence = 0;
    if (!this.stopping) setTimeout(() => this.sync(), 250).unref();
  }

  stopCurrent(callback) {
    if (!this.process) return callback();
    const child = this.process;
    this.process = null;
    child.once('close', () => callback());
    child.kill('SIGTERM');
  }

  stop() {
    this.stopping = true;
    clearInterval(this.timer);
    this.timer = null;
    this.stopCurrent(() => {});
    this.activeKey = null;
  }
}

function runProcess(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', chunk => { stderr += String(chunk); });
    child.once('error', reject);
    child.once('close', code => code === 0 ? resolve() : reject(new Error(stderr.trim() || ('Process exited with code ' + code))));
  });
}

function probeDuration(filePath) {
  return new Promise((resolve, reject) => {
    execFile(process.env.FFPROBE_PATH || 'ffprobe', [
      '-v', 'error', '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1', filePath
    ], { timeout: 30000 }, (error, stdout) => {
      if (error) return reject(error);
      const value = Number(String(stdout).trim());
      if (!Number.isFinite(value)) return reject(new Error('Durée ffprobe invalide.'));
      resolve(value);
    });
  });
}

function sha256File(filePath) {
  const crypto = require('crypto');
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', chunk => hash.update(chunk));
    stream.once('error', reject);
    stream.once('end', () => resolve(hash.digest('hex')));
  });
}

if (require.main === module) {
  const recorder = new Rti1Recorder();
  recorder.start();
  const shutdown = () => {
    recorder.stop();
    setTimeout(() => process.exit(0), 250).unref();
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

module.exports = Rti1Recorder;
