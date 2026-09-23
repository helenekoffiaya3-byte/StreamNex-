require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      mediaSrc: ["'self'", 'blob:', 'http:', 'https:'],
      connectSrc: ["'self'", 'http:', 'https:', 'ws:', 'wss:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Accès CORS refusé.'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id', 'X-EPG-Sync-Token'],
  maxAge: 86400
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(xss({ maxDepth: 50 }));
app.use(hpp());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes. Réessayez plus tard.' }
});

const shuffleLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Trop de zaps. Veuillez patienter.' }
});

app.use('/api', globalLimiter);
app.use(express.static(__dirname));

const CHANNEL_CONFIG = require('./config/channels');

function validatePlaybackUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(String(value).trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

const CHANNELS = CHANNEL_CONFIG.map((channel, index) => ({
  ...channel,
  number: index + 1,
  // Une URL de lecture doit provenir explicitement de la configuration réelle
  // de la chaîne. Aucun fallback / chemin HLS n'est fabriqué par le serveur.
  url: validatePlaybackUrl(channel.productionUrl)
}));

const userSessions = new Map();
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 30 * 60 * 1000);

function pruneSessions() {
  const now = Date.now();
  for (const [key, session] of userSessions) {
    if (now - session.lastAccess > SESSION_TTL_MS) userSessions.delete(key);
  }
}

setInterval(pruneSessions, Math.min(SESSION_TTL_MS, 5 * 60 * 1000)).unref();

function getSessionPool(sessionId) {
  const key = String(sessionId || 'default').slice(0, 128);
  let session = userSessions.get(key);

  if (!session || !Array.isArray(session.pool) || session.pool.length === 0) {
    session = {
      pool: CHANNELS.map(channel => channel.id),
      lastAccess: Date.now()
    };
    userSessions.set(key, session);
  } else {
    session.lastAccess = Date.now();
  }

  return { key, pool: session.pool };
}

app.get('/api/stream/random', shuffleLimiter, (req, res) => {
  const { pool } = getSessionPool(req.query.sessionId);
  const randomIndex = Math.floor(Math.random() * pool.length);
  const selectedId = pool.splice(randomIndex, 1)[0];
  const channel = CHANNELS.find(item => item.id === selectedId);

  if (!channel) {
    return res.status(500).json({ success: false, error: 'Chaîne introuvable.' });
  }

  const { getOccurrencesByChannel } = require('./models/program-db');
  const now = Date.now();
  const occurrence = getOccurrencesByChannel(
    channel.id,
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  ).find(item => {
    const start = Date.parse(item.startAt);
    const end = item.endAt ? Date.parse(item.endAt) : NaN;
    return Number.isFinite(start) && start <= now && (Number.isNaN(end) || now < end);
  });

  res.json({
    success: true,
    channel: {
      id: channel.id,
      name: channel.name,
      group: channel.group,
      number: channel.number,
      logoUrl: channel.logoUrl || '/assets/logos/' + channel.id + '.png'
    },
    occurrenceId: occurrence?.occurrenceId || null,
    remainingCount: pool.length,
    totalCount: CHANNELS.length,
    cycleComplete: pool.length === 0
  });
});

app.get('/api/stream/channels', (_req, res) => {
  const channels = CHANNELS.map(channel => ({
    id: channel.id,
    name: channel.name,
    group: channel.group,
    number: channel.number,
    channelUrl: (process.env.SITE_BASE_URL || '').replace(/\/$/, '') + '/channel/' + channel.id,
    logoUrl: channel.logoUrl || '/assets/logos/' + channel.id + '.png'
  }));

  res.json({
    success: true,
    count: channels.length,
    totalCount: channels.length,
    channels
  });
});

app.get('/api/channels/:id', (req, res) => {
  const channel = CHANNELS.find(item => item.id === req.params.id);
  if (!channel) {
    return res.status(404).json({ success: false, message: 'Chaîne non trouvée.' });
  }

  const { getProgramsByChannel } = require('./models/program-db');
  const programs = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));

  res.json({
    success: true,
    channel: {
      id: channel.id,
      name: channel.name,
      group: channel.group,
      number: channel.number,
      logoUrl: channel.logoUrl || '/assets/logos/' + channel.id + '.png',
      programs
    }
  });
});

app.get('/api/channels/:id/programs', (req, res) => {
  const channel = CHANNELS.find(item => item.id === req.params.id);
  if (!channel) {
    return res.status(404).json({ success: false, error: 'Chaîne non trouvée.' });
  }

  const { getProgramsByChannel, getOccurrencesByChannel } = require('./models/program-db');
  const programs = getProgramsByChannel(channel.id);
  const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const occurrences = getOccurrencesByChannel(channel.id, from, to).map(occurrence => ({ ...occurrence, playbackUrl: null }));

  res.json({
    success: true,
    channelId: channel.id,
    programs,
    occurrences,
    epg: occurrences,
    fetchedAt: new Date().toISOString()
  });
});

app.get('/api/live/channels', (_req, res) => {
  const { getOccurrencesByChannel, getChannelPlaybackUrl } = require('./models/program-db');
  const now = Date.now();
  const from = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const to = new Date(now + 24 * 60 * 60 * 1000).toISOString();

  const channels = CHANNELS.map(channel => {
    const occurrences = getOccurrencesByChannel(channel.id, from, to);
    const current = occurrences.find(occurrence => {
      const start = Date.parse(occurrence.startAt);
      const end = occurrence.endAt ? Date.parse(occurrence.endAt) : NaN;
      return Number.isFinite(start) &&
        start <= now &&
        (Number.isNaN(end) || now < end);
    }) || null;

    const liveStreamUrl = validatePlaybackUrl(getChannelPlaybackUrl(channel.id));

    return {
      id: channel.id,
      name: channel.name,
      group: channel.group,
      number: channel.number,
      logoUrl: channel.logoUrl || '/assets/logos/' + channel.id + '.png',
      liveAvailable: Boolean(current && liveStreamUrl),
      occurrence: current ? {
        occurrenceId: current.occurrenceId,
        title: current.title || current.subtitle || null,
        subtitle: current.subtitle || null,
        startAt: current.startAt,
        endAt: current.endAt || null,
        poster: current.poster || null,
        seasonNumber: current.seasonNumber ?? null,
        episodeNumber: current.episodeNumber ?? null
      } : null
    };
  });

  res.json({
    success: true,
    fetchedAt: new Date().toISOString(),
    count: channels.length,
    channels
  });
});

app.get('/api/epg/vitrine', (_req, res) => {
  const { getOccurrencesByChannel, getChannelPlaybackUrl } = require('./models/program-db');
  const now = Date.now();
  const from = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const to = new Date(now + 24 * 60 * 60 * 1000).toISOString();
  const live = [];
  const replays = [];

  for (const channel of CHANNELS) {
    for (const occurrence of getOccurrencesByChannel(channel.id, from, to)) {
      const start = Date.parse(occurrence.startAt);
      const end = occurrence.endAt ? Date.parse(occurrence.endAt) : NaN;
      if (!Number.isFinite(start)) continue;

      const base = {
        channelId: channel.id,
        channelName: channel.name,
        channelGroup: channel.group,
        occurrenceId: occurrence.occurrenceId,
        title: occurrence.title || occurrence.subtitle || null,
        subtitle: occurrence.subtitle || null,
        startAt: occurrence.startAt,
        endAt: occurrence.endAt || null,
        poster: occurrence.poster || null,
        seasonNumber: occurrence.seasonNumber ?? null,
        episodeNumber: occurrence.episodeNumber ?? null
      };

      const liveUrl = validatePlaybackUrl(getChannelPlaybackUrl(channel.id));
      if (start <= now && (Number.isNaN(end) || now < end) && liveUrl) {
        live.push({ ...base, mode: 'LIVE' });
      } else if (Number.isFinite(end) && end <= now && validatePlaybackUrl(occurrence.playbackUrl)) {
        replays.push({ ...base, mode: 'VOD' });
      }
    }
  }

  live.sort((a,b) => Date.parse(a.startAt) - Date.parse(b.startAt));
  replays.sort((a,b) => Date.parse(b.startAt) - Date.parse(a.startAt));

  res.json({
    success: true,
    fetchedAt: new Date().toISOString(),
    live: live.slice(0, 30),
    replays: replays.slice(0, 30)
  });
});

app.get('/api/catalog/:channelId', (req, res) => {
  const channel = CHANNELS.find(item => item.id === req.params.channelId);
  if (!channel) {
    return res.status(404).json({
      success: false,
      error: 'Chaîne non trouvée.'
    });
  }

  const { getProgramsByChannel } = require('./models/program-db');
  const programs = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));

  return res.json({
    success: true,
    channelId: channel.id,
    available: programs.length > 0,
    count: programs.length,
    programs
  });
});

app.get('/api/channels/:id/catalog', (req, res) => {
  const channel = CHANNELS.find(item => item.id === req.params.id);
  if (!channel) {
    return res.status(404).json({ success: false, error: 'Chaîne non trouvée.' });
  }

  const { getProgramsByChannel } = require('./models/program-db');
  const programs = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));

  res.json({
    success: true,
    channelId: channel.id,
    count: programs.length,
    programs
  });
});

app.get('/api/programs/:id', (req, res) => {
  const { getProgram, getProgramOccurrences, getChannelPlaybackUrl } = require('./models/program-db');
  const program = getProgram(req.params.id);

  if (!program) {
    return res.status(404).json({ success: false, message: 'Contenu introuvable.' });
  }

  const channel = CHANNELS.find(item => item.id === program.channelId);

  res.json({
    success: true,
    program: {
      ...program,
      occurrences: getProgramOccurrences(program.programId)
    }
  });
});

app.get('/api/programs/:id/episodes', (req, res) => {
  const { getProgram, getProgramOccurrences } = require('./models/program-db');
  const program = getProgram(req.params.id);

  if (!program) {
    return res.status(404).json({ success: false, error: 'Programme introuvable.' });
  }

  const episodes = getProgramOccurrences(program.programId)
    .filter(item => item.seasonNumber != null && item.episodeNumber != null)
    .map(item => ({
      ...item,
      playbackUrl: null
    }));

  res.json({
    success: true,
    programId: program.programId,
    title: program.title,
    episodes
  });
});

app.get('/api/series/:id', (req, res) => {
  const { getProgram, getProgramOccurrences } = require('./models/program-db');
  const program = getProgram(req.params.id);

  if (!program || program.type !== 'series') {
    return res.status(404).json({ success: false, error: 'Série introuvable.' });
  }

  const occurrences = getProgramOccurrences(program.programId);
  const seasons = new Map();

  for (const item of occurrences) {
    if (item.seasonNumber == null || item.episodeNumber == null) continue;
    if (!seasons.has(item.seasonNumber)) seasons.set(item.seasonNumber, []);
    seasons.get(item.seasonNumber).push({
      episodeNumber: item.episodeNumber,
      title: item.subtitle || null,
      description: item.description || null,
      poster: item.poster || null,
      playbackUrl: null
    });
  }

  res.json({
    success: true,
    series: {
      ...program,
      seasons: Array.from(seasons.entries()).map(([seasonNumber, episodes]) => ({
        seasonNumber,
        episodes: episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)
      }))
    }
  });
});

app.get('/api/programs/resolve-playback', (req, res) => {
  const channelId = String(req.query.channelId || '').trim();
  const occurrenceId = Number(req.query.occurrenceId);
  const channel = CHANNELS.find(item => item.id === channelId);

  if (!channel) {
    return res.status(404).json({ success: false, error: 'Chaîne introuvable.' });
  }

  // La résolution est toujours liée à une occurrence EPG existante.
  // Le client ne peut pas fournir lui-même une URL VOD arbitraire.
  if (!Number.isSafeInteger(occurrenceId) || occurrenceId <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Une occurrence EPG valide est requise.'
    });
  }

  const { getProgram, getOccurrenceById, getChannelPlaybackUrl } = require('./models/program-db');
  const occurrence = getOccurrenceById(occurrenceId);

  if (!occurrence) {
    return res.status(404).json({ success: false, error: 'Occurrence EPG introuvable.' });
  }

  if (occurrence.channelId !== channel.id) {
    return res.status(403).json({
      success: false,
      error: 'Cette occurrence n’appartient pas à la chaîne demandée.'
    });
  }

  const program = getProgram(occurrence.programId);
  if (!program || program.channelId !== channel.id || program.status !== 'confirmed') {
    return res.status(404).json({
      success: false,
      error: 'Programme EPG confirmé introuvable.'
    });
  }

  const now = Date.now();
  const startAt = Date.parse(occurrence.startAt);
  const endAt = occurrence.endAt ? Date.parse(occurrence.endAt) : NaN;
  const isLive = Number.isFinite(startAt) &&
    startAt <= now &&
    (Number.isNaN(endAt) || now < endAt);

  const liveStreamUrl = validatePlaybackUrl(getChannelPlaybackUrl(channel.id));

  if (isLive && liveStreamUrl) {
    return res.json({
      success: true,
      mode: 'LIVE',
      playbackUrl: liveStreamUrl,
      programTitle: occurrence.title || occurrence.subtitle || program.title
    });
  }

  // Une VOD est utilisable uniquement si elle a été enregistrée côté serveur
  // par le robot/backend. Elle n'est jamais acceptée depuis req.query.
  const vodUrl = validatePlaybackUrl(occurrence.playbackUrl) || validatePlaybackUrl(program.playbackUrl);
  if (vodUrl) {
    return res.json({
      success: true,
      mode: 'VOD',
      playbackUrl: vodUrl,
      programTitle: occurrence.title || occurrence.subtitle || program.title
    });
  }

  return res.json({
    success: true,
    mode: 'NONE',
    playbackUrl: null,
    programTitle: occurrence.title || occurrence.subtitle || program.title,
    message: 'Aucune source vidéo réelle et autorisée n’est disponible pour cette occurrence.'
  });
});

app.get('/api/epg/status', (_req, res) => {
  const latestRun = getLatestSyncRun();
  const automaticGuidesEnabled = process.env.EPG_USE_IPTV_ORG_GUIDES === 'true';

  res.json({
    success: true,
    sourceConfigured: Boolean(process.env.SOURCE_EPG_URL?.trim()),
    automaticGuidesEnabled,
    status: latestRun?.status || (automaticGuidesEnabled ? 'waiting_for_sync' : 'waiting_for_source'),
    lastSync: latestRun || null
  });
});

app.post('/api/epg/sync', async (req, res) => {
  const expectedToken = String(process.env.EPG_SYNC_TOKEN || '').trim();
  const providedToken = String(req.get('X-EPG-Sync-Token') || '').trim();

  if (!expectedToken || !providedToken || providedToken !== expectedToken) {
    return res.status(401).json({
      success: false,
      error: 'Synchronisation EPG non autorisée.'
    });
  }

  try {
    const result = await runEpgSync();
    return res.json({ success: true, ...result });
  } catch (error) {
    return res.status(502).json({
      success: false,
      error: 'La synchronisation EPG a échoué.',
      detail: error.message
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    service: 'StreamLive',
    channels: CHANNELS.length,
    configuredLiveStreams: CHANNELS.filter(channel => Boolean(require('./models/program-db').getChannelPlaybackUrl(channel.id))).length,
    streamBaseUrlConfigured: false,
    siteBaseUrl: process.env.SITE_BASE_URL || null,
    sessionStore: 'memory',
    sessionTtlMs: SESSION_TTL_MS,
    epgSourceConfigured: Boolean(process.env.SOURCE_EPG_URL),
    automaticEpgGuidesEnabled: process.env.EPG_USE_IPTV_ORG_GUIDES === 'true',
    epgSyncEndpointProtected: Boolean(process.env.EPG_SYNC_TOKEN)
  });
});

const { getLatestSyncRun } = require('./models/program-db');
const { runEpgSync } = require('./services/epgRobot');
const cron = require('node-cron');

const EPG_SYNC_CRON = process.env.EPG_SYNC_CRON || '0 */6 * * *';

if (cron.validate(EPG_SYNC_CRON)) {
  cron.schedule(EPG_SYNC_CRON, () => {
    runEpgSync().catch(error => {
      console.error('[Robot EPG] Synchronisation planifiée échouée:', error.message);
    });
  });
} else {
  console.error('[Robot EPG] EPG_SYNC_CRON invalide:', EPG_SYNC_CRON);
}

if (process.env.EPG_SYNC_ON_START !== 'false') {
  runEpgSync().catch(error => {
    console.error('[Robot EPG] Synchronisation au démarrage échouée:', error.message);
  });
}

app.get('/live', (_req, res) => {
  res.sendFile(path.join(__dirname, 'live.html'));
});

app.get('/channel/:id', (req, res) => {
  if (!CHANNELS.some(channel => channel.id === req.params.id)) {
    return res.status(404).send('Chaîne non trouvée.');
  }
  res.sendFile(path.join(__dirname, 'public', 'channel.html'));
});

app.listen(PORT, () => {
  console.log(`StreamLive backend actif sur le port ${PORT}`);
});
