const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');

const app = express();
const PORT = process.env.PORT || 3000;
const STREAM_BASE_URL = (process.env.STREAM_BASE_URL || 'https://streamlive.com/live').replace(/\/$/, '');

app.disable('x-powered-by');

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,https://streamlive.com')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      mediaSrc: ["'self'", "blob:", "http:", "https:"],
      connectSrc: ["'self'", "http:", "https:", "ws:", "wss:"],
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
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id'],
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

const STREAM_BASE_URL = (
  process.env.STREAM_BASE_URL || 'http://localhost:8080/live'
).replace(/\/$/, '');

const CHANNELS = CHANNEL_CONFIG.map((channel, index) => ({
  ...channel,
  number: index + 1,
  url: channel.productionUrl || `${STREAM_BASE_URL}/${channel.id}/index.m3u8`
}));

const userSessions = new Map();
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 30 * 60 * 1000);

function pruneSessions(){
  const now=Date.now();
  for(const [key,session] of userSessions){
    if(now-session.lastAccess > SESSION_TTL_MS) userSessions.delete(key);
  }
}
setInterval(pruneSessions, Math.min(SESSION_TTL_MS, 5 * 60 * 1000)).unref();

function getSessionPool(sessionId) {
  const key = String(sessionId || 'default').slice(0, 128);
  let session = userSessions.get(key);

  if (!session || !Array.isArray(session.pool) || session.pool.length === 0) {
    session = { pool: CHANNELS.map(channel => channel.id), lastAccess: Date.now() };
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

  res.json({ success: true, channel, remainingCount: pool.length, totalCount: CHANNELS.length, cycleComplete: pool.length === 0 });
});

app.get('/api/stream/channels', (_req, res) => {
  const channels = CHANNELS.map((channel, index) => ({
    ...channel,
    number: index + 1,
    streamUrl: channel.url,
    channelUrl: (process.env.SITE_BASE_URL || 'https://streamlive.com').replace(/\/$/, '') + '/channel/' + channel.id,
    logoUrl: '/assets/logos/' + channel.id + '.png'
  }));

  res.json({ success: true, count: channels.length, totalCount: channels.length, channels });
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, service: 'StreamLive', channels: CHANNELS.length, streamBaseUrl: STREAM_BASE_URL, siteBaseUrl: process.env.SITE_BASE_URL || 'https://streamlive.com', sessionStore: 'memory', sessionTtlMs: SESSION_TTL_MS });
});

app.listen(PORT, () => {
  console.log(`StreamLive backend actif sur http://localhost:${PORT}`);
});
