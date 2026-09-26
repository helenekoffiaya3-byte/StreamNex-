const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  getBroadcastFeed,
  updateBroadcastFeedRuntime
} = require('../models/program-db');

const ROOT = path.resolve(
  process.env.STREAMLIVE_BROADCAST_HLS_DIR ||
  path.join(process.cwd(), 'public', 'hls', 'feeds')
);
const VOD_ROOT = path.resolve(
  process.env.VOD_MEDIA_ROOT ||
  path.join(process.cwd(), 'storage', 'vod')
);
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const engines = new Map();

function resolveLocalMedia(playbackUrl) {
  const value = String(playbackUrl || '').trim();
  if (!value.startsWith('/vod/')) return null;

  const candidate = path.resolve(VOD_ROOT, value.slice(5));
  if (candidate === VOD_ROOT || !candidate.startsWith(VOD_ROOT + path.sep)) return null;

  try {
    return fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : null;
  } catch {
    return null;
  }
}

function cleanOutput(outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  for (const file of fs.readdirSync(outputDir)) {
    if (/^streamlive(?:-|\.)/i.test(file)) {
      try { fs.rmSync(path.join(outputDir, file), { force: true }); } catch {}
    }
  }
}

function nextPosition(entry) {
  const total = entry.items.length;
  if (!total) return null;
  const next = entry.position + 1;
  if (next < total) return next;
  return entry.loopEnabled ? 0 : null;
}

function persist(entry, values) {
  try {
    updateBroadcastFeedRuntime(entry.feedId, {
      ...values,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Broadcast Feed] Runtime DB error:', error.message);
  }
}

function finish(entry, errorMessage = null) {
  if (engines.get(entry.feedId) !== entry) return;
  entry.running = false;
  clearTimeout(entry.restartTimer);
  entry.restartTimer = null;
  entry.child = null;

  persist(entry, {
    status: errorMessage ? 'ERROR' : 'STOPPED',
    pid: null,
    currentPosition: entry.position,
    currentProgramId: entry.items[entry.position]?.programId || null,
    lastError: errorMessage,
    startedAt: errorMessage ? entry.startedAt : null
  });

  engines.delete(entry.feedId);
}

function launchItem(entry) {
  if (!entry.running || engines.get(entry.feedId) !== entry) return;

  const item = entry.items[entry.position];
  if (!item) return finish(entry);

  const inputPath = resolveLocalMedia(item.playbackUrl);
  if (!inputPath) {
    const message = 'Média locale indisponible pour « ' + item.title + ' ».';
    console.warn('[Broadcast Feed]', message);
    persist(entry, {
      status: 'RUNNING',
      pid: null,
      currentPosition: entry.position,
      currentProgramId: item.programId,
      lastError: message,
      startedAt: entry.startedAt
    });

    const next = nextPosition(entry);
    if (next === null) return finish(entry, message);
    entry.position = next;
    return setImmediate(() => launchItem(entry));
  }

  const outputDir = entry.outputDir;
  const playlistPath = path.join(outputDir, 'streamlive.m3u8');
  const segmentPrefix = 'streamlive-' + Date.now() + '-';
  const segmentPattern = path.join(outputDir, segmentPrefix + '%06d.ts');

  const args = [
    '-hide_banner',
    '-loglevel', 'warning',
    '-re',
    '-i', inputPath,
    '-map', '0:v:0',
    '-map', '0:a:0?',
    '-c:v', 'libx264',
    '-preset', process.env.STREAMLIVE_HLS_PRESET || 'veryfast',
    '-tune', 'zerolatency',
    '-pix_fmt', 'yuv420p',
    '-g', process.env.STREAMLIVE_HLS_GOP || '48',
    '-keyint_min', process.env.STREAMLIVE_HLS_GOP || '48',
    '-sc_threshold', '0',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', process.env.STREAMLIVE_HLS_SEGMENT_SECONDS || '4',
    '-hls_list_size', process.env.STREAMLIVE_HLS_LIST_SIZE || '6',
    '-hls_flags', 'append_list+delete_segments+omit_endlist+independent_segments+temp_file',
    '-hls_segment_filename', segmentPattern,
    '-y',
    playlistPath
  ];

  persist(entry, {
    status: 'RUNNING',
    pid: null,
    currentPosition: entry.position,
    currentProgramId: item.programId,
    lastError: null,
    startedAt: entry.startedAt
  });

  const child = spawn(FFMPEG, args, {
    stdio: ['ignore', 'ignore', 'pipe']
  });

  entry.child = child;

  persist(entry, {
    status: 'RUNNING',
    pid: child.pid || null,
    currentPosition: entry.position,
    currentProgramId: item.programId,
    lastError: null,
    startedAt: entry.startedAt
  });

  child.stderr.on('data', chunk => {
    const message = String(chunk).trim();
    if (message) console.warn('[Broadcast Feed FFmpeg]', message);
  });

  child.once('error', error => {
    if (!entry.running || entry.child !== child) return;
    entry.child = null;
    const message = 'FFmpeg indisponible: ' + error.message;
    persist(entry, {
      status: 'ERROR',
      pid: null,
      currentPosition: entry.position,
      currentProgramId: item.programId,
      lastError: message,
      startedAt: entry.startedAt
    });
    finish(entry, message);
  });

  child.once('close', (code, signal) => {
    if (!entry.running || entry.child !== child) return;
    entry.child = null;

    if (code !== 0) {
      const message = 'FFmpeg a quitté avec le code ' + String(code) +
        (signal ? ' (' + signal + ')' : '') + '.';
      persist(entry, {
        status: 'ERROR',
        pid: null,
        currentPosition: entry.position,
        currentProgramId: item.programId,
        lastError: message,
        startedAt: entry.startedAt
      });
      return finish(entry, message);
    }

    const next = nextPosition(entry);
    if (next === null) {
      return finish(entry);
    }

    entry.position = next;
    persist(entry, {
      status: 'RUNNING',
      pid: null,
      currentPosition: entry.position,
      currentProgramId: entry.items[entry.position]?.programId || null,
      lastError: null,
      startedAt: entry.startedAt
    });

    entry.restartTimer = setTimeout(() => {
      entry.restartTimer = null;
      launchItem(entry);
    }, 250);
  });
}

function start(feedId) {
  const feed = getBroadcastFeed(feedId);
  if (!feed) throw new Error('Flux introuvable.');
  if (!feed.items.length) throw new Error('Le flux ne contient aucun programme.');

  const existing = engines.get(feedId);
  if (existing?.running) return status(feedId);

  const outputDir = path.join(ROOT, feedId);
  cleanOutput(outputDir);

  const entry = {
    feedId,
    items: feed.items.filter(item => item.playbackUrl),
    loopEnabled: Boolean(feed.loopEnabled),
    outputDir,
    position: 0,
    child: null,
    restartTimer: null,
    running: true,
    startedAt: new Date().toISOString()
  };

  if (!entry.items.length) {
    throw new Error('Aucun programme du flux ne possède un média /vod/ disponible.');
  }

  engines.set(feedId, entry);
  persist(entry, {
    status: 'RUNNING',
    pid: null,
    currentPosition: 0,
    currentProgramId: entry.items[0].programId,
    lastError: null,
    startedAt: entry.startedAt
  });

  launchItem(entry);
  return status(feedId);
}

function stop(feedId) {
  const entry = engines.get(feedId);
  if (!entry) {
    const feed = getBroadcastFeed(feedId);
    if (feed) updateBroadcastFeedRuntime(feedId, {
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

  entry.running = false;
  clearTimeout(entry.restartTimer);
  entry.restartTimer = null;

  const child = entry.child;
  entry.child = null;
  if (child) {
    try { child.kill('SIGTERM'); } catch {}
  }

  persist(entry, {
    status: 'STOPPED',
    pid: null,
    currentPosition: entry.position,
    currentProgramId: entry.items[entry.position]?.programId || null,
    lastError: null,
    startedAt: null
  });

  engines.delete(feedId);
  return status(feedId);
}

function status(feedId) {
  const feed = getBroadcastFeed(feedId);
  if (!feed) return null;

  const entry = engines.get(feedId);
  const playlist = path.join(ROOT, feedId, 'streamlive.m3u8');

  return {
    feedId,
    status: entry?.running ? 'RUNNING' : (feed.engineStatus || 'STOPPED'),
    startedAt: entry?.startedAt || feed.engineStartedAt || null,
    playlistReady: fs.existsSync(playlist),
    playbackUrl: '/hls/feeds/' + encodeURIComponent(feedId) + '/streamlive.m3u8',
    itemCount: feed.items.length,
    currentPosition: entry?.position ?? feed.enginePosition ?? null,
    currentProgramId: entry?.items?.[entry.position]?.programId || feed.engineProgramId || null,
    lastError: feed.engineLastError || null
  };
}

function stopAll() {
  for (const feedId of Array.from(engines.keys())) stop(feedId);
}

module.exports = {
  start,
  stop,
  status,
  stopAll,
  resolveLocalMedia
};
