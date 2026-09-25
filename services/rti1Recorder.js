const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { getActiveRti1Program, loadRti1Schedule, validateRti1Schedule } = require('./rti1Scheduler');
const { addOccurrence } = require('../models/program-db');

const TIMEZONE = 'Africa/Abidjan';
const CHANNEL_ID = 'rti-1';
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
    this.stopping = false;
  }

  start() {
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
    if (this.stopping || !SOURCE_URL) return;
    const now = new Date();
    const status = getActiveRti1Program(this.schedule, now);
    if (!status.success) return;

    const program = status.activeProgram;
    const startAt = occurrenceStart(now, program);
    const endAt = occurrenceEnd(startAt, program);
    const remainingSeconds = Math.max(1, Math.ceil((endAt.getTime() - now.getTime()) / 1000));
    const key = program.id + '@' + startAt.toISOString();

    if (this.activeKey === key && this.process) return;
    if (this.activeKey === key && !this.process) return;

    this.stopCurrent(() => {
      if (this.stopping) return;
      this.startRecording(program, startAt, endAt, remainingSeconds);
    });
  }

  startRecording(program, startAt, endAt, durationSeconds) {
    const output = outputFor(program, startAt);
    if (fs.existsSync(output.tempPath)) {
      try { fs.rmSync(output.tempPath, { force: true }); } catch {}
    }

    this.activeKey = program.id + '@' + startAt.toISOString();

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
      '-movflags', '+faststart',
      '-y', output.tempPath
    ];

    console.log('[RTI1 Recorder] Enregistrement:', program.title, '→', output.finalPath);
    const child = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    this.process = child;

    child.stderr.on('data', chunk => {
      const message = String(chunk).trim();
      if (message) console.warn('[RTI1 Recorder]', message);
    });

    child.once('error', error => {
      console.error('[RTI1 Recorder] FFmpeg indisponible:', error.message);
      if (this.process === child) this.process = null;
    });

    child.once('close', code => {
      if (this.process !== child) return;
      this.process = null;

      if (code === 0 && fs.existsSync(output.tempPath)) {
        try {
          fs.renameSync(output.tempPath, output.finalPath);
          addOccurrence(program.id, {
            channelId: CHANNEL_ID,
            startAt: startAt.toISOString(),
            endAt: endAt.toISOString(),
            description: program.description || '',
            playbackUrl: output.url
          });
          console.log('[RTI1 Recorder] Replay disponible:', output.url);
        } catch (error) {
          console.error('[RTI1 Recorder] Finalisation impossible:', error.message);
        }
      } else {
        console.error('[RTI1 Recorder] Capture échouée pour', program.id, 'code=', code);
        try { fs.rmSync(output.tempPath, { force: true }); } catch {}
        if (TRANSCODE_FALLBACK && !this.stopping) {
          this.transcodeFallback(program, startAt, endAt, output);
        }
      }

      if (!this.stopping) {
        this.activeKey = null;
        this.sync();
      }
    });
  }

  transcodeFallback(program, startAt, endAt, output) {
    const durationSeconds = Math.max(1, Math.ceil((endAt.getTime() - Date.now()) / 1000));
    if (durationSeconds <= 0) return;

    const args = [
      '-hide_banner', '-loglevel', 'warning',
      '-reconnect', '1',
      '-reconnect_streamed', '1',
      '-reconnect_delay_max', '5',
      '-i', SOURCE_URL,
      '-t', String(durationSeconds),
      '-map', '0:v:0',
      '-map', '0:a:0?',
      '-c:v', 'libx264', '-preset', 'veryfast',
      '-c:a', 'aac', '-b:a', '128k',
      '-movflags', '+faststart',
      '-y', output.tempPath
    ];

    console.warn('[RTI1 Recorder] Fallback transcodage activé:', program.id);
    const child = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    this.process = child;

    child.stderr.on('data', chunk => {
      const message = String(chunk).trim();
      if (message) console.warn('[RTI1 Recorder]', message);
    });

    child.once('close', code => {
      if (this.process !== child) return;
      this.process = null;
      if (code === 0 && fs.existsSync(output.tempPath)) {
        try {
          fs.renameSync(output.tempPath, output.finalPath);
          addOccurrence(program.id, {
            channelId: CHANNEL_ID,
            startAt: startAt.toISOString(),
            endAt: endAt.toISOString(),
            description: program.description || '',
            playbackUrl: output.url
          });
          console.log('[RTI1 Recorder] Replay disponible après transcodage:', output.url);
        } catch (error) {
          console.error('[RTI1 Recorder] Finalisation fallback impossible:', error.message);
        }
      } else {
        try { fs.rmSync(output.tempPath, { force: true }); } catch {}
      }
      this.activeKey = null;
    });
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
