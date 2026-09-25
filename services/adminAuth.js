const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = String(process.env.STREAMLIVE_ADMIN_EMAIL || 'streamliveprod2inc@gmail.com').trim().toLowerCase();

function parseCookieHeader(value) {
  const cookies = {};
  for (const part of String(value || '').split(';')) {
    const index = part.indexOf('=');
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    const val = part.slice(index + 1).trim();
    if (!key) continue;
    try { cookies[key] = decodeURIComponent(val); } catch { cookies[key] = ''; }
  }
  return cookies;
}

function getToken(req) {
  const authorization = String(req.get('Authorization') || '').trim();
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  if (match) return match[1].trim();
  return parseCookieHeader(req.get('Cookie') || '').streamlive_session || null;
}

function verifyAdminClaims(req) {
  const token = getToken(req);
  if (!token) { const e=new Error('Authentification administrateur requise.'); e.statusCode=401; throw e; }

  const secret = String(process.env.STREAMLIVE_AUTH_JWT_SECRET || '').trim();
  if (!secret) { const e=new Error('Authentification JWT non configurée.'); e.statusCode=503; throw e; }

  const options={algorithms:['HS256']};
  const issuer=String(process.env.STREAMLIVE_AUTH_JWT_ISSUER || '').trim();
  const audience=String(process.env.STREAMLIVE_AUTH_JWT_AUDIENCE || '').trim();
  if (issuer) options.issuer=issuer;
  if (audience) options.audience=audience;

  let claims;
  try { claims=jwt.verify(token,secret,options); }
  catch { const e=new Error('Session administrateur invalide ou expirée.'); e.statusCode=401; throw e; }

  const email=String(claims.email || '').trim().toLowerCase();
  if (claims.role !== 'admin' || email !== ADMIN_EMAIL) {
    const e=new Error('Accès administrateur interdit.'); e.statusCode=403; throw e;
  }
  return claims;
}

function requireAdminAuth(req,res,next) {
  try { req.admin=verifyAdminClaims(req); return next(); }
  catch(error) { return res.status(error.statusCode || 401).json({success:false,error:error.message || 'Accès administrateur refusé.'}); }
}

module.exports={ADMIN_EMAIL,getToken,verifyAdminClaims,requireAdminAuth};
