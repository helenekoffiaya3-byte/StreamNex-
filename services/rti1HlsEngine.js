const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { getActiveRti1Program, loadRti1Schedule } = require('./rti1Scheduler');

class Rti1HLSEngine {
  constructor({
    schedule = loadRti1Schedule(),
    outputDir = path.join(process.cwd(), 'public', 'hls', 'rti1'),
    ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg'
  } = {}) {
    this.schedule = schedule;
    this.outputDir = path.resolve(outputDir);
    this.ffmpegPath = ffmpegPath;
    this.ffmpegProcess = null;
    this.currentProgramId = null;
    this.restartTimer = null;
    this.running = false;
    fs.mkdirSync(this.outputDir, { recursive: true });
  }

  start() {
    if (this.running) return this.sync();
    this.running = true;
    this.sync();
  }

  sync() {
    if (!this.running) return;
    const status = getActiveRti1Program(this.schedule);
    if (!status.success) return this.stopProcess();

    const program = status.activeProgram;
    const fallbackPath = path.resolve(process.cwd(), 'storage', 'vod', 'fallback_slate.mp4');
    const useFallback = !program.canPlay || !program.absolutePath;

    if (useFallback && process.env.RTI1_HLS_FALLBACK !== 'true') {
      this.currentProgramId = program.id;
      return this.stopProcess();
    }

    const inputPath = useFallback ? fallbackPath : program.absolutePath;
    if (!fs.existsSync(inputPath)) {
      this.currentProgramId = program.id;
      return this.stopProcess();
    }

    if (this.currentProgramId !== program.id || !this.ffmpegProcess) {
      this.runFFmpeg(
        program,
        useFallback ? 0 : program.offsetSeconds,
        inputPath,
        useFallback
      );
    }
  }

  runFFmpeg(program, offsetSeconds, inputPath, loopInput) {
    this.stopProcess();
    this.currentProgramId = program.id;

    const playlistPath = path.join(this.outputDir, 'stream.m3u8');
    const segmentPattern = path.join(this.outputDir, 'rti1-%06d.ts');

    const args = [
      '-hide_banner', '-loglevel', 'warning',
      '-ss', String(offsetSeconds),
      '-re',
      ...(loopInput ? ['-stream_loop', '-1'] : []),
      '-i', inputPath,
      '-map', '0:v:0', '-map', '0:a:0?',
      '-c:v', 'libx264', '-preset', process.env.RTI1_HLS_PRESET || 'veryfast',
      '-tune', 'zerolatency', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '128k', '-ar', '44100',
      '-f', 'hls', '-hls_time', '4', '-hls_list_size', '6',
      '-hls_flags', 'delete_segments+omit_endlist+independent_segments',
      '-hls_segment_filename', segmentPattern,
      '-y', playlistPath
    ];

    const child = spawn(this.ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    this.ffmpegProcess = child;

    child.stderr.on('data', chunk => {
      const message = String(chunk).trim();
      if (message) console.warn('[RTI1 HLS]', message);
    });

    child.once('error', error => {
      console.error('[RTI1 HLS] FFmpeg indisponible:', error.message);
      if (this.ffmpegProcess === child) this.ffmpegProcess = null;
    });

    child.once('close', () => {
      if (this.ffmpegProcess !== child || !this.running) return;
      this.ffmpegProcess = null;
      this.currentProgramId = null;
      this.scheduleRestart(1000);
    });
  }

  scheduleRestart(delay) {
    clearTimeout(this.restartTimer);
    this.restartTimer = setTimeout(() => {
      this.restartTimer = null;
      this.sync();
    }, delay);
  }

  stopProcess() {
    if (this.ffmpegProcess) {
      const child = this.ffmpegProcess;
      this.ffmpegProcess = null;
      child.kill('SIGTERM');
    }
    this.cleanupOutput();
  }

  cleanupOutput() {
    try { fs.rmSync(path.join(this.outputDir, 'stream.m3u8'), { force: true }); } catch {}
    try {
      for (const file of fs.readdirSync(this.outputDir)) {
        if (/^rti1-\d+\.ts$/i.test(file)) fs.rmSync(path.join(this.outputDir, file), { force: true });
      }
    } catch {}
  }

  isReady() {
    return fs.existsSync(path.join(this.outputDir, 'stream.m3u8'));
  }

  stop() {
    this.running = false;
    clearTimeout(this.restartTimer);
    this.restartTimer = null;
    this.stopProcess();
    this.currentProgramId = null;
  }
}

module.exports = Rti1HLSEngine;
