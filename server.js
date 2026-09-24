require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');
const path = require('path');
const fs = require('fs');

const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// StreamLive is deployed behind Nginx. Trust exactly one proxy hop so rate limiting
// uses the real client IP without trusting an arbitrary forwarded-IP chain.
app.set('trust proxy', 1);
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
      mediaSrc: ["'self'", 'blob:', 'https:'],
      connectSrc: ["'self'", 'https:', 'wss:'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: false
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id', 'X-EPG-Sync-Token'],
  credentials: true,
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
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  const pathname = String(req.path || '');
  const isHlsAsset = pathname.endsWith('.m3u8') || pathname.endsWith('.ts');
  if (!isHlsAsset) return next();

  const origin = req.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Origin, Accept, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') return res.status(204).end();
  return next();
});

// Never expose source, configuration, database, credentials, Docker metadata or
// runtime storage through the root static directory.
app.use((req, res, next) => {
  const pathname = String(req.path || '');
  const blocked = [
    /^\/(?:data|storage|config|models|services|routes|scripts)(?:\/|$)/i,
    /^\/(?:\.git|\.github)(?:\/|$)/i,
    /(?:^|\/)\.env(?:\.|$)/i,
    /\.(?:sqlite|sqlite3|db|pem|key|crt|log)$/i,
    /^\/(?:Dockerfile(?:\..*)?|docker-compose(?:\..*)?|package(?:-lock)?\.json)$/
  ];
  if (blocked.some(pattern => pattern.test(pathname))) {
    return res.status(404).end();
  }
  return next();
});

app.use(express.static(__dirname, {
  dotfiles: 'deny',
  fallthrough: true,
  index: 'index.html'
}));

const crypto = require('crypto');

const AUTH_JWT_SECRET = String(process.env.STREAMLIVE_AUTH_JWT_SECRET || '').trim();
const AUTH_JWT_ISSUER = String(process.env.STREAMLIVE_AUTH_JWT_ISSUER || '').trim();
const AUTH_JWT_AUDIENCE = String(process.env.STREAMLIVE_AUTH_JWT_AUDIENCE || '').trim();

function base64UrlDecode(value) {
  return Buffer.from(String(value).replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (String(value).length % 4)) % 4), 'base64');
}

function verifyJwt(token) {
  if (!AUTH_JWT_SECRET) throw new Error('Authentification JWT non configurée.');

  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('JWT invalide.');

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  let header;
  let payload;
  try {
    header = JSON.parse(base64UrlDecode(encodedHeader).toString('utf8'));
    payload = JSON.parse(base64UrlDecode(encodedPayload).toString('utf8'));
  } catch {
    throw new Error('JWT malformé.');
  }

  if (header.alg !== 'HS256' || header.typ !== 'JWT') {
    throw new Error('Algorithme JWT non autorisé.');
  }

  const expected = crypto
    .createHmac('sha256', AUTH_JWT_SECRET)
    .update(encodedHeader + '.' + encodedPayload)
    .digest();

  let provided;
  try {
    provided = base64UrlDecode(encodedSignature);
  } catch {
    throw new Error('Signature JWT invalide.');
  }

  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    throw new Error('Signature JWT invalide.');
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload.sub || typeof payload.sub !== 'string') throw new Error('JWT sans identifiant utilisateur.');
  if (!Number.isSafeInteger(payload.exp) || payload.exp <= now) {
    throw new Error('JWT expiré ou sans expiration.');
  }
  if (payload.nbf != null && (!Number.isSafeInteger(payload.nbf) || payload.nbf > now)) {
    throw new Error('JWT pas encore valide.');
  }

  if (AUTH_JWT_ISSUER && payload.iss !== AUTH_JWT_ISSUER) {
    throw new Error('Émetteur JWT invalide.');
  }
  if (AUTH_JWT_AUDIENCE) {
    const audience = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!audience.includes(AUTH_JWT_AUDIENCE)) throw new Error('Audience JWT invalide.');
  }

  return payload;
}

function parseCookieHeader(value) {
  const cookies = {};
  for (const part of String(value || '').split(';')) {
    const index = part.indexOf('=');
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const val = part.slice(index + 1).trim();
    if (key) {
      try {
        cookies[key] = decodeURIComponent(val);
      } catch {
        cookies[key] = '';
      }
    }
  }
  return cookies;
}

function getBearerToken(req) {
  const authorization = String(req.get('Authorization') || '').trim();
  if (authorization) {
    const match = /^Bearer\s+(.+)$/i.exec(authorization);
    if (match) return match[1].trim();
  }

  const cookies = parseCookieHeader(req.get('Cookie') || '');
  return cookies.streamlive_session || null;
}

function hasMediaDownloadPermission(claims) {
  if (claims.role === 'admin') return true;
  const permissions = [
    ...(Array.isArray(claims.permissions) ? claims.permissions : []),
    ...(typeof claims.scope === 'string' ? claims.scope.split(/\s+/) : [])
  ].map(value => String(value).trim());

  return permissions.includes('media:download') ||
    permissions.includes('download:media') ||
    permissions.includes('download');
}

function requireMediaDownloadAuth(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentification requise.'
    });
  }

  try {
    const claims = verifyJwt(token);
    if (!hasMediaDownloadPermission(claims)) {
      return res.status(403).json({
        success: false,
        error: 'Droit de téléchargement insuffisant.'
      });
    }

    req.auth = {
      userId: claims.sub,
      claims
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Session utilisateur invalide ou expirée.'
    });
  }
}

const CHANNEL_CONFIG = require('./config/channels');
const { channelPrograms, unassignedPrograms } = require('./config/catalog');


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
  const dbPrograms = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));
  const staticPrograms = Array.isArray(channelPrograms[channel.id]) ? channelPrograms[channel.id] : [];
  const programs = [...staticPrograms, ...dbPrograms].filter((program, index, list) =>
    list.findIndex(item => item.programId === program.programId) === index
  );

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
  const dbPrograms = getProgramsByChannel(channel.id);
  const staticPrograms = Array.isArray(channelPrograms[channel.id]) ? channelPrograms[channel.id] : [];
  const programs = [...staticPrograms, ...dbPrograms].filter((program, index, list) =>
    list.findIndex(item => item.programId === program.programId) === index
  );
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
  const dbPrograms = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));
  const staticPrograms = Array.isArray(channelPrograms[channel.id]) ? channelPrograms[channel.id] : [];
  const programs = [...staticPrograms, ...dbPrograms].filter((program, index, list) =>
    list.findIndex(item => item.programId === program.programId) === index
  );

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
  const dbPrograms = getProgramsByChannel(channel.id).map(program => ({ ...program, playbackUrl: null }));
  const staticPrograms = Array.isArray(channelPrograms[channel.id]) ? channelPrograms[channel.id] : [];
  const programs = [...staticPrograms, ...dbPrograms].filter((program, index, list) =>
    list.findIndex(item => item.programId === program.programId) === index
  );

  res.json({
    success: true,
    channelId: channel.id,
    count: programs.length,
    programs
  });
});

app.get('/api/catalog/reserve', (_req, res) => {
  res.json({
    success: true,
    count: unassignedPrograms.length,
    programs: unassignedPrograms
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
    streamBaseUrlConfigured: Boolean(String(process.env.STREAM_BASE_URL || '').trim()),
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

app.get('/api/download/media', requireMediaDownloadAuth, (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Méthode non autorisée.' });
  }

  const id = String(req.query.id || '').trim();
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) {
    return res.status(400).json({ success: false, error: 'Identifiant média invalide.' });
  }

  const mediaRoot = path.resolve(process.env.STREAMLIVE_MEDIA_DIR || path.join(__dirname, 'storage', 'videos'));
  const filePath = path.resolve(mediaRoot, id + '.mp4');
  const relative = path.relative(mediaRoot, filePath);

  if (relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    return res.status(400).json({ success: false, error: 'Chemin média invalide.' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'Fichier vidéo introuvable.' });
  }

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return res.status(404).json({ success: false, error: 'Fichier vidéo introuvable.' });
  }

  if (!stat.isFile()) {
    return res.status(404).json({ success: false, error: 'Média indisponible.' });
  }

  const range = req.headers.range;
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="streamlive_' + id + '.mp4"');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length, Content-Range');

  if (!range) {
    res.setHeader('Content-Length', stat.size);
    return fs.createReadStream(filePath).pipe(res);
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) {
    res.setHeader('Content-Range', 'bytes */' + stat.size);
    return res.status(416).end();
  }

  const hasStart = match[1] !== '';
  const hasEnd = match[2] !== '';
  let start;
  let end;

  if (!hasStart && !hasEnd) {
    res.setHeader('Content-Range', 'bytes */' + stat.size);
    return res.status(416).end();
  }

  if (!hasStart) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      res.setHeader('Content-Range', 'bytes */' + stat.size);
      return res.status(416).end();
    }
    start = Math.max(0, stat.size - suffixLength);
    end = stat.size - 1;
  } else {
    start = Number(match[1]);
    end = hasEnd ? Number(match[2]) : stat.size - 1;
  }

  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || start >= stat.size) {
    res.setHeader('Content-Range', 'bytes */' + stat.size);
    return res.status(416).end();
  }

  end = Math.min(end, stat.size - 1);
  res.status(206);
  res.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + stat.size);
  res.setHeader('Content-Length', end - start + 1);
  return fs.createReadStream(filePath, { start, end }).pipe(res);
});

app.get('/live', (_req, res) => {
  res.sendFile(path.join(__dirname, 'live.html'));
});

app.get('/channel/:id', (req, res) => {
  if (!CHANNELS.some(channel => channel.id === req.params.id)) {
    return res.status(404).send('Chaîne non trouvée.');
  }
  res.sendFile(path.join(__dirname, 'public', 'channel.html'));
});

// JSON 404 for unknown API routes.
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'Route API introuvable.' });
});

// Centralized error handling. In production, internal stack traces are never
// returned to clients.
app.use((err, req, res, _next) => {
  const status = Number.isInteger(err?.statusCode) && err.statusCode >= 400 && err.statusCode < 600
    ? err.statusCode
    : (Number.isInteger(err?.status) && err.status >= 400 && err.status < 600 ? err.status : 500);

  console.error('[Express error]', {
    method: req.method,
    path: req.path,
    status,
    message: err?.message || String(err)
  });

  if (res.headersSent) return;

  res.status(status).json({
    success: false,
    error: status === 413 ? 'PAYLOAD_TOO_LARGE' : 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'production'
      ? (status === 413 ? 'Requête trop volumineuse.' : 'Une erreur interne est survenue.')
      : (err?.message || 'Erreur interne.')
  });
});

const server = app.listen(PORT, () => {
  console.log(`StreamLive backend actif sur le port ${PORT}`);
});

// Fatal process errors must terminate the process so Docker can restart it.
// Keeping a potentially corrupted Node process alive is unsafe.
let shuttingDown = false;
function gracefulShutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`[StreamLive] Arrêt demandé: ${signal}`);

  server.close(() => {
    try {
      require('./models/program-db').db.close();
    } catch (error) {
      console.error('[StreamLive] Fermeture SQLite échouée:', error.message);
    }
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('[StreamLive] Unhandled rejection:', reason);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error('[StreamLive] Uncaught exception:', error);
  gracefulShutdown('uncaughtException');
});
