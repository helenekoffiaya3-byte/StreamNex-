const { createUser, getUserById } = require('../services/authService');
const { db } = require('../models/program-db');

async function main() {
  const email = String(process.env.STREAMLIVE_ADMIN_EMAIL || 'streamliveprod2inc@gmail.com').trim().toLowerCase();
  const username = String(process.env.STREAMLIVE_ADMIN_USERNAME || 'streamlive-admin').trim();
  const password = String(process.env.STREAMLIVE_ADMIN_PASSWORD || '').trim();

  if (!password || password.length < 12) {
    throw new Error('STREAMLIVE_ADMIN_PASSWORD doit être défini côté serveur et contenir au moins 12 caractères.');
  }

  const existing = db.prepare('SELECT id, email, role FROM users WHERE email = ? COLLATE NOCASE').get(email);

  if (existing) {
    db.prepare('UPDATE users SET role = \'admin\', is_active = 1, updated_at = ? WHERE id = ?')
      .run(new Date().toISOString(), existing.id);
    db.prepare('INSERT INTO user_permissions (user_id, permissions) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET permissions = excluded.permissions')
      .run(existing.id, JSON.stringify(['media:download']));
    console.log(`Admin StreamLive déjà présent: ${email} (id=${existing.id}).`);
    return;
  }

  const user = await createUser({
    username,
    email,
    password,
    role: 'admin',
    permissions: ['media:download']
  });

  console.log(`Admin StreamLive créé: ${user.email} (id=${user.id}).`);
}

main().catch(error => {
  console.error('[init-admin] Échec:', error.message);
  process.exitCode = 1;
});
