const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { db } = require('../models/program-db');
const argon2 = require('argon2');

const username = String(process.env.INIT_ADMIN_USERNAME || '').trim();
const email = String(process.env.INIT_ADMIN_EMAIL || '').trim();
const password = String(process.env.INIT_ADMIN_PASSWORD || '');

if (!username || !email || !password) {
  console.error('INIT_ADMIN_USERNAME, INIT_ADMIN_EMAIL et INIT_ADMIN_PASSWORD sont obligatoires pour créer le premier administrateur.');
  process.exit(1);
}

const options = { type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 1 };

(async () => {
  const existing = db.prepare('SELECT id, username FROM users WHERE username = ? OR email = ? OR role = ? LIMIT 1')
    .get(username, email, 'admin');

  if (existing) {
    console.log(`Administrateur déjà présent: ${existing.username} (id ${existing.id}).`);
    db.close();
    return;
  }

  const hash = await argon2.hash(password, options);
  const uuid = require('crypto').randomUUID();
  const now = new Date().toISOString();

  const transaction = db.transaction(() => {
    const info = db.prepare(`
      INSERT INTO users (uuid, username, email, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'admin', ?, ?)
    `).run(uuid, username, email, hash, now, now);

    db.prepare('INSERT INTO user_permissions (user_id, permissions) VALUES (?, ?)')
      .run(info.lastInsertRowid, JSON.stringify(['media:download', 'download:media', 'download', 'admin:access']));

    return info.lastInsertRowid;
  });

  const id = transaction();
  console.log(`Administrateur créé: ${username} (id ${id}). Le mot de passe n'est jamais affiché.`);
  db.close();
})().catch(error => {
  console.error('Initialisation DB échouée:', error.message);
  process.exit(1);
});
