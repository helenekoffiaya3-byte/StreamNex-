const express = require('express');
const jwt = require('jsonwebtoken');
const { rateLimit } = require('express-rate-limit');
const { verifyUserCredentials } = require('../services/authService');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, error: 'Trop de tentatives de connexion. Réessayez plus tard.' }
});

function cookieValue(token, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `streamlive_session=${encodeURIComponent(token)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

router.post('/login', loginLimiter, async (req, res) => {
  const username = String(req.body?.username || req.body?.email || '').trim();
  const password = String(req.body?.password || '');

  if (!username || username.length < 3 || username.length > 254 || password.length < 8 || password.length > 128) {
    return res.status(400).json({ success: false, error: 'Identifiants invalides.' });
  }
  if (!/^[^\u0000-\u001F\u007F]+$/.test(username)) {
    return res.status(400).json({ success: false, error: 'Identifiant invalide.' });
  }

  const user = await verifyUserCredentials(username, password);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Identifiants invalides.' });
  }

  const secret = String(process.env.STREAMLIVE_AUTH_JWT_SECRET || '').trim();
  if (!secret) {
    return res.status(503).json({ success: false, error: 'Authentification JWT non configurée côté serveur.' });
  }

  const issuer = String(process.env.STREAMLIVE_AUTH_JWT_ISSUER || '').trim();
  const audience = String(process.env.STREAMLIVE_AUTH_JWT_AUDIENCE || '').trim();
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(user.uuid),
    user_id: user.id,
    username: user.username,
    role: user.role,
    permissions: user.permissions,
    nbf: now
  };

  const options = {
    algorithm: 'HS256',
    expiresIn: process.env.STREAMLIVE_AUTH_JWT_EXPIRES_IN || '24h'
  };
  if (issuer) options.issuer = issuer;
  if (audience) options.audience = audience;

  const token = jwt.sign(payload, secret, options);
  res.setHeader('Set-Cookie', cookieValue(token, 86400));

  const response = {
    success: true,
    user: {
      id: user.id,
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    }
  };

  if (process.env.STREAMLIVE_AUTH_RETURN_TOKEN === 'true') response.token = token;
  return res.json(response);
});

router.post('/logout', (_req, res) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `streamlive_session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${secure}`);
  return res.json({ success: true });
});

module.exports = router;
