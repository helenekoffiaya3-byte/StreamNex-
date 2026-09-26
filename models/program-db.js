const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dataDir = process.env.STREAMLIVE_DATA_DIR || path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.STREAMLIVE_DB_PATH || path.join(dataDir, 'streamlive.sqlite');
const db = new Database(dbPath, { timeout: 7000 });

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 7000');
db.pragma('foreign_keys = ON');
db.pragma('trusted_schema = OFF');
db.pragma('secure_delete = ON');

function ensureColumn(table, column, definition) {
  const columns = db.prepare('PRAGMA table_info(' + table + ')').all();
  if (!columns.some(item => item.name === column)) {
    db.exec('ALTER TABLE ' + table + ' ADD COLUMN ' + column + ' ' + definition);
  }
}

db.exec(`
CREATE TABLE IF NOT EXISTS channels (
  channel_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  group_name TEXT NOT NULL DEFAULT 'Autre',
  description TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  live_stream_url TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  admin_customized INTEGER NOT NULL DEFAULT 0 CHECK(admin_customized IN (0,1)),
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS programs (
  program_id TEXT PRIMARY KEY,
  channel_id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'show',
  description TEXT NOT NULL DEFAULT '',
  poster TEXT,
  poster_source_url TEXT,
  poster_source_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed','archived')),
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  observed_first_seen_at TEXT,
  observed_last_seen_at TEXT,
  occurrences_count INTEGER NOT NULL DEFAULT 0,
  distinct_days_count INTEGER NOT NULL DEFAULT 0,
  is_recurring INTEGER NOT NULL DEFAULT 0,
  playback_url TEXT
);

CREATE TABLE IF NOT EXISTS program_occurrences (
  occurrence_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  start_at TEXT NOT NULL,
  end_at TEXT,
  subtitle TEXT,
  season_number INTEGER,
  episode_number INTEGER,
  description TEXT NOT NULL DEFAULT '',
  poster TEXT,
  poster_source_url TEXT,
  poster_source_type TEXT,
  UNIQUE(program_id, start_at),
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_programs_channel_status
  ON programs(channel_id, status);

CREATE INDEX IF NOT EXISTS idx_occurrences_program_start
  ON program_occurrences(program_id, start_at);

CREATE TABLE IF NOT EXISTS sync_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  status TEXT NOT NULL,
  imported_count INTEGER NOT NULL DEFAULT 0,
  confirmed_count INTEGER NOT NULL DEFAULT 0,
  error TEXT
);

CREATE TABLE IF NOT EXISTS media_assets (
  media_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT,
  occurrence_id INTEGER,
  media_type TEXT NOT NULL DEFAULT 'video' CHECK(media_type IN ('video','audio','image','subtitle','other')),
  storage_path TEXT NOT NULL UNIQUE,
  public_url TEXT,
  mime_type TEXT,
  file_size INTEGER NOT NULL DEFAULT 0,
  duration_seconds REAL,
  video_codec TEXT,
  audio_codec TEXT,
  width INTEGER,
  height INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','available','failed','deleted')),
  sha256 TEXT,
  recorded_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE SET NULL,
  FOREIGN KEY(occurrence_id) REFERENCES program_occurrences(occurrence_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS recordings (
  recording_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL,
  occurrence_id INTEGER,
  media_id INTEGER,
  channel_id TEXT NOT NULL,
  source_url TEXT,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  expected_duration_seconds REAL,
  actual_duration_seconds REAL,
  status TEXT NOT NULL DEFAULT 'recording' CHECK(status IN ('recording','finalizing','available','partial','failed')),
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
  FOREIGN KEY(occurrence_id) REFERENCES program_occurrences(occurrence_id) ON DELETE SET NULL,
  FOREIGN KEY(media_id) REFERENCES media_assets(media_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_media_program_status
  ON media_assets(program_id, status);
CREATE INDEX IF NOT EXISTS idx_media_occurrence
  ON media_assets(occurrence_id);
CREATE INDEX IF NOT EXISTS idx_media_recorded_at
  ON media_assets(recorded_at);
CREATE INDEX IF NOT EXISTS idx_recordings_program_started
  ON recordings(program_id, started_at);
CREATE INDEX IF NOT EXISTS idx_recordings_status
  ON recordings(status);
CREATE INDEX IF NOT EXISTS idx_recordings_channel_started
  ON recordings(channel_id, started_at);

CREATE TABLE IF NOT EXISTS broadcast_feeds (
  feed_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  channel_id TEXT,
  mode TEXT NOT NULL DEFAULT 'playlist' CHECK(mode IN ('playlist','scheduled')),
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  output_format TEXT NOT NULL DEFAULT 'hls' CHECK(output_format IN ('hls','mp4','json')),
  loop_enabled INTEGER NOT NULL DEFAULT 0 CHECK(loop_enabled IN (0,1)),
  target_duration_seconds INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(channel_id) REFERENCES channels(channel_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS broadcast_feed_items (
  feed_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  program_id TEXT NOT NULL,
  occurrence_id INTEGER,
  duration_seconds INTEGER,
  transition TEXT NOT NULL DEFAULT 'cut',
  created_at TEXT NOT NULL,
  PRIMARY KEY(feed_id, position),
  FOREIGN KEY(feed_id) REFERENCES broadcast_feeds(feed_id) ON DELETE CASCADE,
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
  FOREIGN KEY(occurrence_id) REFERENCES program_occurrences(occurrence_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_feed_items_program ON broadcast_feed_items(program_id);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin','user','moderator')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_permissions (
  user_id INTEGER PRIMARY KEY,
  permissions TEXT NOT NULL DEFAULT '["media:download"]',
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
`);

ensureColumn('programs', 'poster_source_url', 'TEXT');
ensureColumn('programs', 'poster_source_type', 'TEXT');
ensureColumn('program_occurrences', 'poster_source_url', 'TEXT');
ensureColumn('program_occurrences', 'poster_source_type', 'TEXT');
ensureColumn('program_occurrences', 'playback_url', 'TEXT');
ensureColumn('program_occurrences', 'broadcast_type', "TEXT NOT NULL DEFAULT 'broadcast'");
ensureColumn('programs', 'observed_first_seen_at', 'TEXT');
ensureColumn('programs', 'observed_last_seen_at', 'TEXT');
ensureColumn('programs', 'source_type', "TEXT NOT NULL DEFAULT 'epg'");
ensureColumn('channels', 'group_name', "TEXT NOT NULL DEFAULT 'Autre'");
ensureColumn('channels', 'description', "TEXT NOT NULL DEFAULT ''");
ensureColumn('channels', 'logo_url', 'TEXT');
ensureColumn('channels', 'active', 'INTEGER NOT NULL DEFAULT 1');
ensureColumn('channels', 'sort_order', 'INTEGER NOT NULL DEFAULT 0');
ensureColumn('channels', 'admin_customized', 'INTEGER NOT NULL DEFAULT 0');
ensureColumn('broadcast_feeds', 'engine_status', "TEXT NOT NULL DEFAULT 'STOPPED'");
ensureColumn('broadcast_feeds', 'engine_pid', 'INTEGER');
ensureColumn('broadcast_feeds', 'engine_position', 'INTEGER');
ensureColumn('broadcast_feeds', 'engine_program_id', 'TEXT');
ensureColumn('broadcast_feeds', 'engine_last_error', 'TEXT');
ensureColumn('broadcast_feeds', 'engine_started_at', 'TEXT');

function rowToProgram(row) {
  if (!row) return null;
  return {
    programId: row.program_id,
    channelId: row.channel_id,
    title: row.title,
    type: row.type,
    description: row.description,
    poster: row.poster,
    status: row.status,
    sourceType: row.source_type || 'epg',
    firstSeenAt: row.observed_first_seen_at || null,
    lastSeenAt: row.observed_last_seen_at || null,
    occurrencesCount: row.occurrences_count,
    distinctDaysCount: row.distinct_days_count,
    isRecurring: Boolean(row.is_recurring),
    playbackUrl: row.playback_url,
    posterSourceUrl: row.poster_source_url || null,
    posterSourceType: row.poster_source_type || null
  };
}

function normalizeOccurrence(row) {
  if (!row) return null;
  const start = Date.parse(row.startAt);
  const end = row.endAt ? Date.parse(row.endAt) : NaN;
  return {
    ...row,
    durationMinutes: Number.isFinite(start) && Number.isFinite(end) && end > start
      ? Math.round((end - start) / 60000)
      : null,
    poster: row.poster || null,
    posterSourceUrl: row.posterSourceUrl || null,
    posterSourceType: row.posterSourceType || null,
    broadcastType: row.broadcastType || 'broadcast'
  };
}

function syncConfiguredChannels(channels) {
  if (!Array.isArray(channels)) throw new TypeError('La configuration des chaînes doit être un tableau.');
  const now = new Date().toISOString();
  const statement = db.prepare(`
    INSERT INTO channels (channel_id, name, group_name, description, logo_url, live_stream_url, active, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(channel_id) DO UPDATE SET
      name = CASE WHEN channels.admin_customized = 1 THEN channels.name ELSE excluded.name END,
      live_stream_url = CASE WHEN channels.admin_customized = 1 THEN channels.live_stream_url ELSE excluded.live_stream_url END,
      group_name = CASE WHEN channels.admin_customized = 1 THEN channels.group_name ELSE excluded.group_name END,
      logo_url = CASE WHEN channels.admin_customized = 1 THEN channels.logo_url ELSE excluded.logo_url END,
      updated_at = excluded.updated_at
  `);
  const transaction = db.transaction(() => {
    for (const channel of channels) {
      if (!channel?.id || !channel?.name) continue;
      statement.run(
        channel.id,
        channel.name,
        channel.group || 'Autre',
        channel.description || '',
        channel.logoUrl || null,
        channel.productionUrl || null,
        channel.active === false ? 0 : 1,
        Number.isInteger(channel.number) ? channel.number : 0,
        now
      );
    }
  });
  transaction();
  return channels.length;
}

function upsertChannel(channelId, name, liveStreamUrl = null, options = {}) {
  db.prepare(`
    INSERT INTO channels (channel_id, name, group_name, description, logo_url, live_stream_url, active, sort_order, admin_customized, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(channel_id) DO UPDATE SET
      name = excluded.name,
      group_name = excluded.group_name,
      description = excluded.description,
      logo_url = excluded.logo_url,
      live_stream_url = excluded.live_stream_url,
      active = excluded.active,
      sort_order = excluded.sort_order,
      admin_customized = excluded.admin_customized,
      updated_at = excluded.updated_at
  `).run(
    channelId,
    name,
    options.group || 'Autre',
    options.description || '',
    options.logoUrl || null,
    liveStreamUrl || null,
    options.active === false ? 0 : 1,
    Number.isInteger(options.sortOrder) ? options.sortOrder : 0,
    options.adminCustomized === false ? 0 : 1,
    new Date().toISOString()
  );
}

function getChannelPlaybackUrl(channelId) {
  const row = db.prepare('SELECT live_stream_url FROM channels WHERE channel_id = ?').get(channelId);
  return row?.live_stream_url || null;
}
function listAdminChannels() {
  return db.prepare(`
    SELECT channel_id AS id, name, group_name AS groupName, description,
           logo_url AS logoUrl, live_stream_url AS liveStreamUrl,
           active, sort_order AS sortOrder, admin_customized AS adminCustomized
    FROM channels
    ORDER BY sort_order ASC, name COLLATE NOCASE
  `).all();
}

function getAdminChannel(channelId) {
  return db.prepare(`
    SELECT channel_id AS id, name, group_name AS groupName, description,
           logo_url AS logoUrl, live_stream_url AS liveStreamUrl,
           active, sort_order AS sortOrder, admin_customized AS adminCustomized
    FROM channels WHERE channel_id = ?
  `).get(channelId) || null;
}

function updateAdminChannel(channelId, values) {
  const result = db.prepare(`
    UPDATE channels
    SET name = ?, group_name = ?, description = ?, logo_url = ?,
        live_stream_url = ?, active = ?, sort_order = ?,
        admin_customized = 1, updated_at = ?
    WHERE channel_id = ?
  `).run(
    values.name,
    values.groupName || 'Autre',
    values.description || '',
    values.logoUrl || null,
    values.liveStreamUrl || null,
    values.active === false ? 0 : 1,
    Number.isInteger(values.sortOrder) ? values.sortOrder : 0,
    new Date().toISOString(),
    channelId
  );
  return result.changes ? getAdminChannel(channelId) : null;
}

function deleteAdminChannel(channelId) {
  const hasPrograms = db.prepare('SELECT 1 FROM programs WHERE channel_id = ? LIMIT 1').get(channelId);
  if (hasPrograms) throw new Error('Impossible de supprimer une chaîne qui contient encore des programmes.');
  const result = db.prepare('DELETE FROM channels WHERE channel_id = ?').run(channelId);
  return result.changes > 0;
}

function updateProgram(programId, values) {
  const result = db.prepare(`
    UPDATE programs
    SET title = ?, type = ?, description = ?, poster = ?,
        playback_url = ?, status = ?, source_type = ?
    WHERE program_id = ?
  `).run(
    values.title,
    values.type || 'show',
    values.description || '',
    values.poster || null,
    values.playbackUrl || null,
    values.status || 'confirmed',
    values.sourceType || 'admin-curated',
    programId
  );
  return result.changes ? getProgram(programId) : null;
}

function deleteProgram(programId) {
  const result = db.prepare('DELETE FROM programs WHERE program_id = ?').run(programId);
  return result.changes > 0;
}

function updateOccurrence(occurrenceId, values) {
  const result = db.prepare(`
    UPDATE program_occurrences
    SET channel_id = ?, start_at = ?, end_at = ?, subtitle = ?,
        season_number = ?, episode_number = ?, description = ?,
        playback_url = ?, broadcast_type = ?
    WHERE occurrence_id = ?
  `).run(
    values.channelId,
    values.startAt,
    values.endAt || null,
    values.subtitle || null,
    values.seasonNumber ?? null,
    values.episodeNumber ?? null,
    values.description || '',
    values.playbackUrl || null,
    values.broadcastType || 'broadcast',
    occurrenceId
  );
  return result.changes ? getOccurrenceById(occurrenceId) : null;
}


function getProgram(programId) {
  return rowToProgram(db.prepare('SELECT * FROM programs WHERE program_id = ?').get(programId));
}

function getProgramsByChannel(channelId, status = 'confirmed') {
  return db.prepare(`
    SELECT * FROM programs
    WHERE channel_id = ? AND status = ?
    ORDER BY title COLLATE NOCASE
  `).all(channelId, status).map(rowToProgram);
}

function getOccurrencesByChannel(channelId, fromIso = null, toIso = null) {
  let sql = `
    SELECT po.occurrence_id AS occurrenceId, po.program_id AS programId,
           programs.title AS title,
           po.channel_id AS channelId, po.start_at AS startAt, po.end_at AS endAt,
           po.subtitle, po.season_number AS seasonNumber,
           po.episode_number AS episodeNumber, po.description, po.poster,
           po.poster_source_url AS posterSourceUrl, po.poster_source_type AS posterSourceType, po.playback_url AS playbackUrl, po.broadcast_type AS broadcastType
    FROM program_occurrences AS po
    JOIN programs ON programs.program_id = po.program_id
    WHERE po.channel_id = ?
      AND programs.status = 'confirmed'
  `;
  const params = [channelId];

  if (fromIso) {
    sql += ' AND (end_at IS NULL OR end_at >= ?)';
    params.push(fromIso);
  }
  if (toIso) {
    sql += ' AND start_at <= ?';
    params.push(toIso);
  }

  sql += ' ORDER BY start_at';
  return db.prepare(sql).all(...params).map(normalizeOccurrence);
}

function getOccurrenceById(occurrenceId) {
  const row = db.prepare(`
    SELECT occurrence_id AS occurrenceId, program_id AS programId,
           programs.title AS title,
           channel_id AS channelId, start_at AS startAt, end_at AS endAt,
           subtitle, season_number AS seasonNumber,
           episode_number AS episodeNumber, description, poster,
           poster_source_url AS posterSourceUrl, poster_source_type AS posterSourceType, playback_url AS playbackUrl
    FROM program_occurrences
    JOIN programs ON programs.program_id = program_occurrences.program_id
    WHERE occurrence_id = ?
  `).get(occurrenceId);

  return normalizeOccurrence(row);
}

function getProgramOccurrences(programId) {
  return db.prepare(`
    SELECT occurrence_id AS occurrenceId, program_id AS programId,
           programs.title AS title,
           channel_id AS channelId, start_at AS startAt, end_at AS endAt,
           subtitle, season_number AS seasonNumber,
           episode_number AS episodeNumber, description, poster,
           poster_source_url AS posterSourceUrl, poster_source_type AS posterSourceType, playback_url AS playbackUrl
    FROM program_occurrences
    JOIN programs ON programs.program_id = program_occurrences.program_id
    WHERE program_occurrences.program_id = ?
    ORDER BY start_at
  `).all(programId).map(normalizeOccurrence);
}

function syncCatalogPrograms(programGroups, extraPrograms = []) {
  const all = [];
  if (programGroups && typeof programGroups === 'object') {
    for (const programs of Object.values(programGroups)) {
      if (Array.isArray(programs)) all.push(...programs);
    }
  }
  if (Array.isArray(extraPrograms)) all.push(...extraPrograms);

  const seen = new Set();
  const transaction = db.transaction(() => {
    for (const program of all) {
      const channelId = program?.channelId || program?.originalChannel;
      if (!program?.programId || !program?.title || !channelId || seen.has(program.programId)) continue;
      seen.add(program.programId);
      upsertProgram({
        programId: program.programId,
        channelId,
        title: program.title,
        type: program.type || 'show',
        description: program.description || '',
        poster: program.poster || null,
        playbackUrl: program.playbackUrl || null,
        sourceType: 'catalog'
      });
      db.prepare(`
        UPDATE programs
        SET status = 'confirmed',
            source_type = 'catalog'
        WHERE program_id = ?
      `).run(program.programId);
    }
  });
  transaction();
  return seen.size;
}

function upsertProgram(entry) {
  const existing = db.prepare('SELECT * FROM programs WHERE program_id = ?').get(entry.programId);
  const now = new Date().toISOString();

  if (!existing) {
    db.prepare(`
      INSERT INTO programs (
        program_id, channel_id, title, type, description, poster,
        poster_source_url, poster_source_type,
        status, first_seen_at, last_seen_at, occurrences_count,
        distinct_days_count, is_recurring, playback_url, source_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, 0, 0, 0, ?, ?)
    `).run(
      entry.programId,
      entry.channelId,
      entry.title,
      entry.type,
      entry.description || '',
      entry.poster || null,
      entry.posterSourceUrl || null,
      entry.posterSourceType || null,
      now,
      now,
      entry.playbackUrl || null,
      entry.sourceType || 'epg'
    );
  } else {
    db.prepare(`
      UPDATE programs
      SET description = CASE WHEN ? <> '' THEN ? ELSE description END,
          poster = COALESCE(?, poster),
          poster_source_url = COALESCE(?, poster_source_url),
          poster_source_type = COALESCE(?, poster_source_type),
          playback_url = COALESCE(?, playback_url),
          source_type = COALESCE(?, source_type)
      WHERE program_id = ?
    `).run(
      entry.description || '',
      entry.description || '',
      entry.poster || null,
      entry.posterSourceUrl || null,
      entry.posterSourceType || null,
      entry.playbackUrl || null,
      entry.sourceType || null,
      entry.programId
    );
  }

  return getProgram(entry.programId);
}

function addOccurrence(programId, occurrence) {
  db.prepare(`
    INSERT INTO program_occurrences (
      program_id, channel_id, start_at, end_at, subtitle,
      season_number, episode_number, description, poster,
      poster_source_url, poster_source_type, playback_url, broadcast_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(program_id, start_at) DO UPDATE SET
      end_at = excluded.end_at,
      subtitle = excluded.subtitle,
      season_number = excluded.season_number,
      episode_number = excluded.episode_number,
      description = excluded.description,
      poster = COALESCE(excluded.poster, program_occurrences.poster),
      poster_source_url = COALESCE(excluded.poster_source_url, program_occurrences.poster_source_url),
      poster_source_type = COALESCE(excluded.poster_source_type, program_occurrences.poster_source_type),
      playback_url = COALESCE(excluded.playback_url, program_occurrences.playback_url),
      broadcast_type = excluded.broadcast_type
  `).run(
    programId,
    occurrence.channelId,
    occurrence.startAt,
    occurrence.endAt || null,
    occurrence.subtitle || null,
    occurrence.seasonNumber ?? null,
    occurrence.episodeNumber ?? null,
    occurrence.description || '',
    occurrence.poster || null,
    occurrence.posterSourceUrl || null,
    occurrence.posterSourceType || null,
    occurrence.playbackUrl || null,
    occurrence.broadcastType || 'broadcast'
  );

  const nowIso = new Date().toISOString();
  const stats = db.prepare(`
    SELECT
      COUNT(*) AS count,
      COUNT(CASE WHEN start_at <= ? THEN 1 END) AS observedCount,
      COUNT(DISTINCT CASE
        WHEN start_at <= ? THEN substr(start_at, 1, 10)
      END) AS distinctDays,
      MIN(CASE WHEN start_at <= ? THEN start_at END) AS firstSeenAt,
      MAX(CASE WHEN start_at <= ? THEN start_at END) AS lastSeenAt
    FROM program_occurrences
    WHERE program_id = ?
  `).get(nowIso, nowIso, nowIso, nowIso, programId);

  db.prepare(`
    UPDATE programs
    SET occurrences_count = ?,
        distinct_days_count = ?,
        is_recurring = CASE
          WHEN status = 'confirmed' AND ? >= 3 THEN 1
          ELSE 0
        END,
        observed_first_seen_at = ?,
        observed_last_seen_at = ?
    WHERE program_id = ?
  `).run(
    stats.count,
    stats.distinctDays,
    stats.distinctDays,
    stats.firstSeenAt || null,
    stats.lastSeenAt || null,
    programId
  );
}

function replaceEpgSnapshot(entries) {
  if (!Array.isArray(entries)) throw new TypeError('Le snapshot EPG doit être un tableau.');

  const channelIds = new Set();
  const programIds = new Set();
  const occurrenceKeys = new Set();

  for (const entry of entries) {
    const program = entry?.program;
    const occurrence = entry?.occurrence;
    if (!program || !occurrence) throw new Error('Snapshot EPG incomplet.');

    if (!program.channelId || !occurrence.channelId || program.channelId !== occurrence.channelId) {
      throw new Error('Snapshot EPG incohérent : canal programme/occurrence différent.');
    }
    if (!program.programId || !program.title || !occurrence.startAt) {
      throw new Error('Snapshot EPG invalide : identifiants, titre ou date manquants.');
    }

    channelIds.add(program.channelId);
    programIds.add(program.programId);
    const key = program.programId + '\\u0000' + occurrence.startAt;
    if (occurrenceKeys.has(key)) {
      throw new Error('Snapshot EPG invalide : occurrence dupliquée.');
    }
    occurrenceKeys.add(key);
  }

  const transaction = db.transaction(() => {
    db.prepare('DELETE FROM program_occurrences').run();
    db.prepare('DELETE FROM programs').run();

    const insertProgram = db.prepare(`
      INSERT INTO programs (
        program_id, channel_id, title, type, description, poster,
        poster_source_url, poster_source_type, status,
        first_seen_at, last_seen_at, observed_first_seen_at,
        observed_last_seen_at, occurrences_count, distinct_days_count,
        is_recurring, playback_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, 0, 0, 0, ?)
    `);

    const insertOccurrence = db.prepare(`
      INSERT INTO program_occurrences (
        program_id, channel_id, start_at, end_at, subtitle,
        season_number, episode_number, description, poster,
        poster_source_url, poster_source_type, playback_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const programs = new Map();
    for (const entry of entries) {
      const program = entry.program;
      const occurrence = entry.occurrence;
      if (!programs.has(program.programId)) {
        programs.set(program.programId, program);
      }
      insertOccurrence.run(
        program.programId,
        occurrence.channelId,
        occurrence.startAt,
        occurrence.endAt || null,
        occurrence.subtitle || null,
        occurrence.seasonNumber ?? null,
        occurrence.episodeNumber ?? null,
        occurrence.description || '',
        occurrence.poster || null,
        occurrence.posterSourceUrl || null,
        occurrence.posterSourceType || null,
        occurrence.playbackUrl || null
      );
    }

    const nowIso = new Date().toISOString();
    for (const program of programs.values()) {
      const stats = db.prepare(`
        SELECT COUNT(*) AS count,
               COUNT(CASE WHEN start_at <= ? THEN 1 END) AS observedCount,
               COUNT(DISTINCT CASE WHEN start_at <= ? THEN substr(start_at, 1, 10) END) AS distinctDays,
               MIN(CASE WHEN start_at <= ? THEN start_at END) AS firstSeenAt,
               MAX(CASE WHEN start_at <= ? THEN start_at END) AS lastSeenAt
        FROM program_occurrences
        WHERE program_id = ?
      `).get(nowIso, nowIso, nowIso, nowIso, program.programId);

      insertProgram.run(
        program.programId,
        program.channelId,
        program.title,
        program.type || 'show',
        program.description || '',
        program.poster || null,
        program.posterSourceUrl || null,
        program.posterSourceType || null,
        nowIso,
        nowIso,
        stats.firstSeenAt || null,
        stats.lastSeenAt || null,
        program.playbackUrl || null
      );

      db.prepare(`
        UPDATE programs
        SET occurrences_count = ?,
            distinct_days_count = ?,
            is_recurring = CASE WHEN ? >= 3 THEN 1 ELSE 0 END
        WHERE program_id = ?
      `).run(stats.count, stats.distinctDays, stats.distinctDays, program.programId);
    }
  });

  transaction.immediate();
  return {
    importedCount: entries.length,
    programCount: programIds.size,
    channelCount: channelIds.size
  };
}

function confirmEligiblePrograms() {
  const threshold = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  const rows = db.prepare(`
    SELECT program_id
    FROM programs
    WHERE status = 'pending'
      AND observed_first_seen_at IS NOT NULL
      AND observed_first_seen_at <= ?
      AND observed_last_seen_at IS NOT NULL
      AND distinct_days_count >= 3
      AND (julianday(observed_last_seen_at) - julianday(observed_first_seen_at)) >= 3
  `).all(threshold);

  const update = db.prepare(`
    UPDATE programs
    SET status = 'confirmed',
        is_recurring = 1
    WHERE program_id = ?
  `);

  const transaction = db.transaction(() => {
    for (const row of rows) update.run(row.program_id);
  });

  transaction();
  return rows.length;
}

function createSyncRun() {
  const result = db.prepare(`
    INSERT INTO sync_runs (started_at, status) VALUES (?, 'running')
  `).run(new Date().toISOString());
  return result.lastInsertRowid;
}

function getLatestSyncRun() {
  const row = db.prepare(`
    SELECT id, started_at AS startedAt, completed_at AS completedAt,
           status, imported_count AS importedCount,
           confirmed_count AS confirmedCount, error
    FROM sync_runs
    ORDER BY id DESC
    LIMIT 1
  `).get();

  return row || null;
}

function finishSyncRun(id, status, importedCount, confirmedCount, error = null) {
  db.prepare(`
    UPDATE sync_runs
    SET completed_at = ?, status = ?, imported_count = ?,
        confirmed_count = ?, error = ?
    WHERE id = ?
  `).run(
    new Date().toISOString(),
    status,
    importedCount,
    confirmedCount,
    error,
    id
  );
}

// Media-catalog extensions. These tables are additive so existing EPG data remains intact.
db.exec(`
CREATE TABLE IF NOT EXISTS episodes (
  episode_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL,
  series_id TEXT,
  season_number INTEGER,
  episode_number INTEGER,
  title TEXT,
  synopsis TEXT,
  duration_seconds REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(program_id, season_number, episode_number),
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movies (
  movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL UNIQUE,
  original_title TEXT,
  release_year INTEGER,
  duration_seconds REAL,
  synopsis TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS series (
  series_id TEXT PRIMARY KEY,
  program_id TEXT,
  title TEXT NOT NULL,
  synopsis TEXT,
  poster TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS program_genres (
  program_id TEXT NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY(program_id, genre_id),
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
  FOREIGN KEY(genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS persons (
  person_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(name, role)
);

CREATE TABLE IF NOT EXISTS program_persons (
  program_id TEXT NOT NULL,
  person_id INTEGER NOT NULL,
  PRIMARY KEY(program_id, person_id),
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(person_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subtitles (
  subtitle_id INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id INTEGER,
  language TEXT NOT NULL,
  label TEXT,
  storage_path TEXT,
  public_url TEXT,
  mime_type TEXT DEFAULT 'text/vtt',
  status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('pending','available','failed','deleted')),
  created_at TEXT NOT NULL,
  FOREIGN KEY(media_id) REFERENCES media_assets(media_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audio_tracks (
  audio_track_id INTEGER PRIMARY KEY AUTOINCREMENT,
  media_id INTEGER,
  language TEXT,
  label TEXT,
  codec TEXT,
  channels INTEGER,
  bitrate_kbps INTEGER,
  status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('pending','available','failed','deleted')),
  created_at TEXT NOT NULL,
  FOREIGN KEY(media_id) REFERENCES media_assets(media_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recording_segments (
  segment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  recording_id INTEGER NOT NULL,
  sequence_number INTEGER NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_seconds REAL,
  storage_path TEXT NOT NULL UNIQUE,
  file_size INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'recording' CHECK(status IN ('recording','partial','validating','available','failed')),
  error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(recording_id, sequence_number),
  FOREIGN KEY(recording_id) REFERENCES recordings(recording_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS replay_catalog (
  replay_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL,
  occurrence_id INTEGER,
  media_id INTEGER NOT NULL,
  channel_id TEXT NOT NULL,
  broadcast_date TEXT NOT NULL,
  title TEXT NOT NULL,
  genre TEXT,
  playback_url TEXT NOT NULL,
  duration_seconds REAL,
  status TEXT NOT NULL DEFAULT 'available' CHECK(status IN ('pending','available','hidden','deleted')),
  published_at TEXT NOT NULL,
  UNIQUE(media_id),
  FOREIGN KEY(program_id) REFERENCES programs(program_id) ON DELETE CASCADE,
  FOREIGN KEY(occurrence_id) REFERENCES program_occurrences(occurrence_id) ON DELETE SET NULL,
  FOREIGN KEY(media_id) REFERENCES media_assets(media_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_episodes_series_season_episode ON episodes(series_id, season_number, episode_number);
CREATE INDEX IF NOT EXISTS idx_program_genres_genre ON program_genres(genre_id);
CREATE INDEX IF NOT EXISTS idx_program_persons_person ON program_persons(person_id);
CREATE INDEX IF NOT EXISTS idx_subtitles_media_status ON subtitles(media_id, status);
CREATE INDEX IF NOT EXISTS idx_audio_tracks_media_status ON audio_tracks(media_id, status);
CREATE INDEX IF NOT EXISTS idx_segments_recording_sequence ON recording_segments(recording_id, sequence_number);
CREATE INDEX IF NOT EXISTS idx_segments_status ON recording_segments(status);
CREATE INDEX IF NOT EXISTS idx_replay_catalog_channel_date ON replay_catalog(channel_id, broadcast_date);
CREATE INDEX IF NOT EXISTS idx_replay_catalog_program ON replay_catalog(program_id);
CREATE INDEX IF NOT EXISTS idx_replay_catalog_status ON replay_catalog(status);
`);

ensureColumn('recordings', 'state', "TEXT NOT NULL DEFAULT 'RECORDING'");
ensureColumn('recordings', 'segment_count', 'INTEGER NOT NULL DEFAULT 0');
ensureColumn('recordings', 'completed_at', 'TEXT');
ensureColumn('recordings', 'master_sha256', 'TEXT');
ensureColumn('recordings', 'master_storage_path', 'TEXT');

function setRecordingState(recordingId, state, extra = {}) {
  const allowed = new Set(['RECORDING', 'FINALIZING', 'VALIDATING', 'AVAILABLE', 'FAILED', 'PARTIAL']);
  if (!allowed.has(state)) throw new Error('Etat d\'enregistrement invalide: ' + state);
  const now = new Date().toISOString();
  const fields = ['state = ?', 'updated_at = ?'];
  const values = [state, now];
  if (Object.prototype.hasOwnProperty.call(extra, 'status')) { fields.push('status = ?'); values.push(extra.status); }
  if (Object.prototype.hasOwnProperty.call(extra, 'error')) { fields.push('error = ?'); values.push(extra.error); }
  if (Object.prototype.hasOwnProperty.call(extra, 'completedAt')) { fields.push('completed_at = ?'); values.push(extra.completedAt); }
  if (Object.prototype.hasOwnProperty.call(extra, 'segmentCount')) { fields.push('segment_count = ?'); values.push(extra.segmentCount); }
  values.push(recordingId);
  db.prepare('UPDATE recordings SET ' + fields.join(', ') + ' WHERE recording_id = ?').run(...values);
}

function addRecordingSegment(segment) {
  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO recording_segments (
      recording_id, sequence_number, started_at, ended_at, duration_seconds,
      storage_path, file_size, status, error, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(recording_id, sequence_number) DO UPDATE SET
      ended_at = excluded.ended_at,
      duration_seconds = excluded.duration_seconds,
      storage_path = excluded.storage_path,
      file_size = excluded.file_size,
      status = excluded.status,
      error = excluded.error,
      updated_at = excluded.updated_at
  `).run(
    segment.recordingId,
    segment.sequenceNumber,
    segment.startedAt,
    segment.endedAt || null,
    segment.durationSeconds ?? null,
    segment.storagePath,
    segment.fileSize || 0,
    segment.status || 'available',
    segment.error || null,
    now,
    now
  );
  return Number(result.lastInsertRowid);
}

function getRecordingSegments(recordingId) {
  return db.prepare(`
    SELECT segment_id AS segmentId, recording_id AS recordingId,
           sequence_number AS sequenceNumber, started_at AS startedAt,
           ended_at AS endedAt, duration_seconds AS durationSeconds,
           storage_path AS storagePath, file_size AS fileSize,
           status, error
    FROM recording_segments
    WHERE recording_id = ?
    ORDER BY sequence_number
  `).all(recordingId);
}

function publishReplay({ recordingId, mediaId, programId, occurrenceId, channelId, title, playbackUrl, durationSeconds, broadcastDate, genre = null }) {
  const now = new Date().toISOString();
  return db.prepare(`
    INSERT INTO replay_catalog (
      program_id, occurrence_id, media_id, channel_id, broadcast_date,
      title, genre, playback_url, duration_seconds, status, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'available', ?)
    ON CONFLICT(media_id) DO UPDATE SET
      playback_url = excluded.playback_url,
      duration_seconds = excluded.duration_seconds,
      status = 'available',
      published_at = excluded.published_at
  `).run(
    programId, occurrenceId || null, mediaId, channelId, broadcastDate,
    title, genre, playbackUrl, durationSeconds ?? null, now
  ).lastInsertRowid;
}

function getReplayCatalog({ channelId = null, programId = null, date = null, genre = null, limit = 100 } = {}) {
  const safeLimit = Math.min(500, Math.max(1, Number(limit) || 100));
  let sql = `
    SELECT replay_id AS replayId, program_id AS programId,
           occurrence_id AS occurrenceId, media_id AS mediaId,
           channel_id AS channelId, broadcast_date AS broadcastDate,
           title, genre, playback_url AS playbackUrl,
           duration_seconds AS durationSeconds, published_at AS publishedAt
    FROM replay_catalog
    WHERE status = 'available'
  `;
  const params = [];
  if (channelId) { sql += ' AND channel_id = ?'; params.push(channelId); }
  if (programId) { sql += ' AND program_id = ?'; params.push(programId); }
  if (date) { sql += ' AND broadcast_date = ?'; params.push(date); }
  if (genre) { sql += ' AND genre = ?'; params.push(genre); }
  sql += ' ORDER BY broadcast_date DESC, published_at DESC LIMIT ?';
  params.push(safeLimit);
  return db.prepare(sql).all(...params);
}

function registerRecording(recording) {
  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO recordings (
      program_id, occurrence_id, channel_id, source_url,
      started_at, expected_duration_seconds, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'recording', ?, ?)
  `).run(
    recording.programId,
    recording.occurrenceId || null,
    recording.channelId,
    recording.sourceUrl || null,
    recording.startedAt,
    recording.expectedDurationSeconds ?? null,
    now,
    now
  );
  return Number(result.lastInsertRowid);
}

function finalizeRecording(recordingId, media) {
  const now = new Date().toISOString();
  const transaction = db.transaction(() => {
    const recording = db.prepare('SELECT * FROM recordings WHERE recording_id = ?').get(recordingId);
    if (!recording) throw new Error('Enregistrement introuvable: ' + recordingId);

    const mediaResult = db.prepare(`
      INSERT INTO media_assets (
        program_id, occurrence_id, media_type, storage_path, public_url,
        mime_type, file_size, duration_seconds, video_codec, audio_codec,
        width, height, status, sha256, recorded_at, created_at, updated_at
      ) VALUES (?, ?, 'video', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available', ?, ?, ?, ?)
      ON CONFLICT(storage_path) DO UPDATE SET
        program_id = excluded.program_id,
        occurrence_id = excluded.occurrence_id,
        public_url = excluded.public_url,
        mime_type = excluded.mime_type,
        file_size = excluded.file_size,
        duration_seconds = excluded.duration_seconds,
        video_codec = excluded.video_codec,
        audio_codec = excluded.audio_codec,
        width = excluded.width,
        height = excluded.height,
        status = 'available',
        sha256 = excluded.sha256,
        recorded_at = excluded.recorded_at,
        updated_at = excluded.updated_at
    `).run(
      recording.program_id,
      recording.occurrence_id || null,
      media.storagePath,
      media.publicUrl || null,
      media.mimeType || 'video/mp4',
      media.fileSize || 0,
      media.durationSeconds ?? null,
      media.videoCodec || null,
      media.audioCodec || null,
      media.width || null,
      media.height || null,
      media.sha256 || null,
      media.recordedAt || now,
      now,
      now
    );

    const mediaRow = db.prepare('SELECT media_id FROM media_assets WHERE storage_path = ?').get(media.storagePath);
    db.prepare(`
      UPDATE recordings
      SET media_id = ?, ended_at = ?, actual_duration_seconds = ?,
          status = 'available', error = NULL, updated_at = ?
      WHERE recording_id = ?
    `).run(
      mediaRow.media_id,
      media.endedAt || now,
      media.durationSeconds ?? null,
      now,
      recordingId
    );

    if (recording.occurrence_id) {
      db.prepare('UPDATE program_occurrences SET playback_url = ? WHERE occurrence_id = ?')
        .run(media.publicUrl || null, recording.occurrence_id);
    }
    return Number(mediaRow.media_id);
  });
  return transaction();
}

function failRecording(recordingId, status = 'failed', error = null) {
  db.prepare(`
    UPDATE recordings
    SET status = ?, ended_at = ?, error = ?, updated_at = ?
    WHERE recording_id = ?
  `).run(status, new Date().toISOString(), error, new Date().toISOString(), recordingId);
}


function searchProgramsAll({ query = '', channelId = null, type = null, limit = 250 } = {}) {
  const safeLimit = Math.min(1000, Math.max(1, Number(limit) || 250));
  let sql = `
    SELECT p.*, c.name AS channel_name
    FROM programs p
    LEFT JOIN channels c ON c.channel_id = p.channel_id
    WHERE p.status <> 'archived'
  `;
  const params = [];
  if (query) {
    sql += ` AND (p.title LIKE ? OR p.description LIKE ? OR p.program_id LIKE ?)`;
    const q = '%' + String(query).slice(0, 200) + '%';
    params.push(q, q, q);
  }
  if (channelId) { sql += ' AND p.channel_id = ?'; params.push(channelId); }
  if (type) { sql += ' AND p.type = ?'; params.push(type); }
  sql += ' ORDER BY p.title COLLATE NOCASE, c.name COLLATE NOCASE LIMIT ?';
  params.push(safeLimit);
  return db.prepare(sql).all(...params).map(row => ({ ...rowToProgram(row), channelName: row.channel_name }));
}

function createBroadcastFeed(values, items = []) {
  const now = new Date().toISOString();
  const transaction = db.transaction(() => {
    db.prepare(`
      INSERT INTO broadcast_feeds
        (feed_id, name, slug, description, channel_id, mode, active, output_format, loop_enabled, target_duration_seconds, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      values.feedId, values.name, values.slug, values.description || '', values.channelId || null,
      values.mode || 'playlist', values.active === false ? 0 : 1, values.outputFormat || 'hls',
      values.loopEnabled ? 1 : 0, values.targetDurationSeconds || null, now, now
    );
    const stmt = db.prepare(`
      INSERT INTO broadcast_feed_items
        (feed_id, position, program_id, occurrence_id, duration_seconds, transition, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    items.forEach((item, index) => stmt.run(values.feedId, index, item.programId, item.occurrenceId || null, item.durationSeconds || null, item.transition || 'cut', now));
  });
  transaction();
  return getBroadcastFeed(values.feedId);
}

function getBroadcastFeed(feedId) {
  const feed = db.prepare('SELECT * FROM broadcast_feeds WHERE feed_id = ?').get(feedId);
  if (!feed) return null;
  const items = db.prepare(`
    SELECT fi.position, fi.program_id AS programId, fi.occurrence_id AS occurrenceId,
           fi.duration_seconds AS durationSeconds, fi.transition,
           p.title, p.type, p.playback_url AS playbackUrl, c.name AS channelName
    FROM broadcast_feed_items fi
    JOIN programs p ON p.program_id = fi.program_id
    LEFT JOIN channels c ON c.channel_id = p.channel_id
    WHERE fi.feed_id = ? ORDER BY fi.position
  `).all(feedId);
  return {
    feedId: feed.feed_id, name: feed.name, slug: feed.slug, description: feed.description,
    channelId: feed.channel_id, mode: feed.mode, active: Boolean(feed.active),
    outputFormat: feed.output_format, loopEnabled: Boolean(feed.loop_enabled),
    targetDurationSeconds: feed.target_duration_seconds,
    engineStatus: feed.engine_status || 'STOPPED',
    enginePid: feed.engine_pid || null,
    enginePosition: feed.engine_position ?? null,
    engineProgramId: feed.engine_program_id || null,
    engineLastError: feed.engine_last_error || null,
    engineStartedAt: feed.engine_started_at || null,
    createdAt: feed.created_at, updatedAt: feed.updated_at, items
  };
}

function listBroadcastFeeds() {
  return db.prepare(`
    SELECT f.*, COUNT(i.position) AS itemCount
    FROM broadcast_feeds f LEFT JOIN broadcast_feed_items i ON i.feed_id = f.feed_id
    GROUP BY f.feed_id ORDER BY f.updated_at DESC
  `).all().map(f => ({
    feedId:f.feed_id,name:f.name,slug:f.slug,description:f.description,channelId:f.channel_id,
    mode:f.mode,active:Boolean(f.active),outputFormat:f.output_format,loopEnabled:Boolean(f.loop_enabled),
    targetDurationSeconds:f.target_duration_seconds,itemCount:Number(f.itemCount),
    engineStatus:f.engine_status || 'STOPPED',
    enginePid:f.engine_pid || null,
    enginePosition:f.engine_position ?? null,
    engineProgramId:f.engine_program_id || null,
    engineLastError:f.engine_last_error || null,
    engineStartedAt:f.engine_started_at || null
  }));
}

function updateBroadcastFeedRuntime(feedId, values = {}) {
  db.prepare(`
    UPDATE broadcast_feeds
    SET engine_status = ?, engine_pid = ?, engine_position = ?,
        engine_program_id = ?, engine_last_error = ?, engine_started_at = ?,
        updated_at = ?
    WHERE feed_id = ?
  `).run(
    values.status || 'STOPPED',
    values.pid ?? null,
    values.currentPosition ?? null,
    values.currentProgramId || null,
    values.lastError || null,
    values.startedAt || null,
    values.updatedAt || new Date().toISOString(),
    feedId
  );
  return getBroadcastFeed(feedId);
}

function deleteBroadcastFeed(feedId) {
  return db.prepare('DELETE FROM broadcast_feeds WHERE feed_id = ?').run(feedId).changes > 0;
}

function getReplayMedia({ channelId = null, programId = null, limit = 100 } = {}) {
  const safeLimit = Math.min(500, Math.max(1, Number(limit) || 100));
  let sql = `
    SELECT
      ma.media_id AS mediaId,
      ma.program_id AS programId,
      ma.occurrence_id AS occurrenceId,
      p.title,
      ma.public_url AS playbackUrl,
      ma.storage_path AS storagePath,
      ma.file_size AS fileSize,
      ma.duration_seconds AS durationSeconds,
      ma.video_codec AS videoCodec,
      ma.audio_codec AS audioCodec,
      ma.width,
      ma.height,
      ma.recorded_at AS recordedAt,
      r.started_at AS startedAt,
      r.ended_at AS endedAt,
      r.status AS recordingStatus
    FROM media_assets ma
    JOIN programs p ON p.program_id = ma.program_id
    LEFT JOIN recordings r ON r.media_id = ma.media_id
    WHERE ma.media_type = 'video' AND ma.status = 'available'
  `;
  const params = [];
  if (channelId) {
    sql += ' AND p.channel_id = ?';
    params.push(channelId);
  }
  if (programId) {
    sql += ' AND ma.program_id = ?';
    params.push(programId);
  }
  sql += ' ORDER BY COALESCE(ma.recorded_at, ma.created_at) DESC LIMIT ?';
  params.push(safeLimit);
  return db.prepare(sql).all(...params);
}

module.exports = {
  db,
  getProgram,
  getProgramsByChannel,
  getProgramOccurrences,
  getOccurrenceById,
  getOccurrencesByChannel,
  upsertProgram,
  syncCatalogPrograms,
  addOccurrence,
  replaceEpgSnapshot,
  confirmEligiblePrograms,
  createSyncRun,
  finishSyncRun,
  getLatestSyncRun,
  upsertChannel,
  syncConfiguredChannels,
  getChannelPlaybackUrl,
  listAdminChannels,
  getAdminChannel,
  updateAdminChannel,
  deleteAdminChannel,
  updateProgram,
  deleteProgram,
  updateOccurrence,
  registerRecording,
  finalizeRecording,
  failRecording,
  getReplayMedia,
  searchProgramsAll,
  createBroadcastFeed,
  getBroadcastFeed,
  listBroadcastFeeds,
  deleteBroadcastFeed,
  updateBroadcastFeedRuntime,
  setRecordingState,
  addRecordingSegment,
  getRecordingSegments,
  publishReplay,
  getReplayCatalog
};
