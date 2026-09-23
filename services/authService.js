const crypto = require('crypto');
const argon2 = require('argon2');
const { db } = require('../models/program-db');

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 1
};

function parsePermissions(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

async function createUser({ username, email, password, role = 'user', permissions = ['media:download'] }) {
  if (!username || !email || !password) throw new Error('username, email et password sont requis.');
  if (!['admin', 'user', 'moderator'].includes(role)) throw new Error('Rôle invalide.');

  const passwordHash = await argon2.hash(password, ARGON2_OPTIONS);
  const uuid = crypto.randomUUID();
  const now = new Date().toISOString();

  const transaction = db.transaction(() => {
    const info = db.prepare(`
      INSERT INTO users (uuid, username, email, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(uuid, username.trim(), email.trim(), passwordHash, role, now, now);

    db.prepare(`
      INSERT INTO user_permissions (user_id, permissions) VALUES (?, ?)
    `).run(info.lastInsertRowid, JSON.stringify(permissions));

    return info.lastInsertRowid;
  });

  const id = transaction();
  return getUserById(id);
}

async function verifyUserCredentials(usernameOrEmail, password) {
  const row = db.prepare(`
    SELECT u.id, u.uuid, u.username, u.email, u.password_hash, u.role,
           u.is_active, p.permissions
    FROM users u
    LEFT JOIN user_permissions p ON p.user_id = u.id
    WHERE (u.username = ? OR u.email = ?) AND u.is_active = 1
  `).get(String(usernameOrEmail).trim(), String(usernameOrEmail).trim());

  if (!row || !(await argon2.verify(row.password_hash, password))) return null;

  db.prepare('UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?')
    .run(new Date().toISOString(), new Date().toISOString(), row.id);

  return {
    id: row.id,
    uuid: row.uuid,
    username: row.username,
    email: row.email,
    role: row.role,
    permissions: parsePermissions(row.permissions)
  };
}

function getUserById(id) {
  const row = db.prepare(`
    SELECT u.id, u.uuid, u.username, u.email, u.role, u.is_active, p.permissions
    FROM users u
    LEFT JOIN user_permissions p ON p.user_id = u.id
    WHERE u.id = ?
  `).get(id);
  if (!row) return null;
  return { ...row, permissions: parsePermissions(row.permissions) };
}

module.exports = { createUser, verifyUserCredentials, getUserById };
