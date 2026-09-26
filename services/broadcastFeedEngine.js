const path = require('path');
const fs = require('fs');
const HLSEngine = require('./hlsEngine');
const { getBroadcastFeed, updateBroadcastFeedRuntime } = require('../models/program-db');

const ROOT = path.resolve(process.env.STREAMLIVE_BROADCAST_HLS_DIR || path.join(process.cwd(), 'public', 'hls', 'feeds'));
const VOD_ROOT = path.resolve(process.env.VOD_MEDIA_ROOT || path.join(process.cwd(), 'storage', 'vod'));
const engines = new Map();

function timeText(minutes) {
  const m = minutes % 1440;
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}

function resolveLocalMedia(playbackUrl) {
  const value = String(playbackUrl || '').trim();
  if (!value.startsWith('/vod/')) return null;
  const candidate = path.resolve(VOD_ROOT, value.slice(5));
  if (candidate === VOD_ROOT || !candidate.startsWith(VOD_ROOT + path.sep)) return null;
  return fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : null;
}

function buildSchedule(feed) {
  const valid = feed.items.filter(item => resolveLocalMedia(item.playbackUrl));
  if (!valid.length) throw new Error('Aucun programme du flux ne possède un média local /vod/ disponible.');

  const schedule = [];
  let cursor = 0;
  for (let index = 0; index < 15; index += 1) {
    const item = valid[index % valid.length];
    const duration = Math.max(60, Number(item.durationSeconds || 1800) || 1800);
    const remaining = 1440 - cursor;
    if (remaining <= 0) break;
    const minutes = index === 14 ? remaining : Math.max(1, Math.min(Math.ceil(duration / 60), remaining));
    const media = resolveLocalMedia(item.playbackUrl);
    schedule.push({
      id: feed.feedId + '-' + index,
      title: item.title,
      startTime: timeText(cursor),
      endTime: timeText(cursor + minutes),
      vodFile: 'storage/vod/' + path.relative(VOD_ROOT, media).split(path.sep).join('/')
    });
    cursor += minutes;
  }
  if (schedule.length < 15) {
    const last = schedule[schedule.length - 1];
    last.endTime = '00:00';
  }
  return schedule;
}

function start(feedId) {
  const feed = getBroadcastFeed(feedId);
  if (!feed) throw new Error('Flux introuvable.');
  if (!feed.loopEnabled) throw new Error('Le moteur de diffusion continue nécessite la boucle automatique pour couvrir la grille 24 h.');
  if (engines.has(feedId)) return status(feedId);

  const schedule = buildSchedule(feed);
  const outputDir = path.join(ROOT, feedId);
  fs.mkdirSync(outputDir, { recursive: true });
  const engine = new HLSEngine({ schedule, outputDir, ffmpegPath: process.env.FFMPEG_PATH || 'ffmpeg' });

  engines.set(feedId, { engine, schedule, startedAt: new Date().toISOString() });
  updateBroadcastFeedRuntime(feedId, {
    status: 'RUNNING',
    pid: null,
    currentPosition: null,
    currentProgramId: null,
    lastError: null,
    startedAt: engines.get(feedId).startedAt,
    updatedAt: new Date().toISOString()
  });
  engine.start();
  return status(feedId);
}

function stop(feedId) {
  const entry = engines.get(feedId);
  if (entry) {
    entry.engine.stop();
    engines.delete(feedId);
  }
  updateBroadcastFeedRuntime(feedId, {
    status: 'STOPPED',
    pid: null,
    currentPosition: null,
    currentProgramId: null,
    lastError: null,
    startedAt: null,
    updatedAt: new Date().toISOString()
  });
  return status(feedId);
}

function status(feedId) {
  const feed = getBroadcastFeed(feedId);
  if (!feed) return null;
  const entry = engines.get(feedId);
  const playlist = path.join(ROOT, feedId, 'streamlive.m3u8');
  return {
    feedId,
    status: entry ? 'RUNNING' : 'STOPPED',
    startedAt: entry?.startedAt || null,
    playlistReady: fs.existsSync(playlist),
    playbackUrl: '/hls/feeds/' + encodeURIComponent(feedId) + '/streamlive.m3u8',
    itemCount: feed.items.length
  };
}

function stopAll() {
  for (const feedId of engines.keys()) stop(feedId);
}

module.exports = { start, stop, status, stopAll, buildSchedule };
