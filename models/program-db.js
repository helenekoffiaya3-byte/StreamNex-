const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dataDir = process.env.STREAMLIVE_DATA_DIR || path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.STREAMLIVE_DB_PATH || path.join(dataDir, 'streamlive.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function ensureColumn(table, column, definition) {
  const columns = db.prepare('PRAGMA table_info(' + table + ')').all();
  if (!columns.some(item => item.name === column)) {
    db.exec('ALTER TABLE ' + table + ' ADD COLUMN ' + column + ' ' + definition);
  }
}

db.exec(`
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
`);

ensureColumn('programs', 'poster_source_url', 'TEXT');
ensureColumn('programs', 'poster_source_type', 'TEXT');
ensureColumn('program_occurrences', 'poster_source_url', 'TEXT');
ensureColumn('program_occurrences', 'poster_source_type', 'TEXT');

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
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    occurrencesCount: row.occurrences_count,
    distinctDaysCount: row.distinct_days_count,
    isRecurring: Boolean(row.is_recurring),
    playbackUrl: row.playback_url,
    posterSourceUrl: row.poster_source_url || null,
    posterSourceType: row.poster_source_type || null
  };
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
    SELECT occurrence_id AS occurrenceId, program_id AS programId,
           channel_id AS channelId, start_at AS startAt, end_at AS endAt,
           subtitle, season_number AS seasonNumber,
           episode_number AS episodeNumber, description, poster,
           poster_source_url AS posterSourceUrl, poster_source_type AS posterSourceType
    FROM program_occurrences
    JOIN programs ON programs.program_id = program_occurrences.program_id
    WHERE program_occurrences.channel_id = ?
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
  return db.prepare(sql).all(...params);
}

function getOccurrenceById(occurrenceId) {
  return db.prepare(`
    SELECT occurrence_id AS occurrenceId, program_id AS programId,
           channel_id AS channelId, start_at AS startAt, end_at AS endAt,
           subtitle, season_number AS seasonNumber,
           episode_number AS episodeNumber, description, poster,
           poster_source_url AS posterSourceUrl, poster_source_type AS posterSourceType
    FROM program_occurrences
    WHERE occurrence_id = ?
  `).get(occurrenceId);
}

function getProgramOccurrences(programId) {
  return db.prepare(`
    SELECT occurrence_id AS occurrenceId, program_id AS programId,
           channel_id AS channelId, start_at AS startAt, end_at AS endAt,
           subtitle, season_number AS seasonNumber,
           episode_number AS episodeNumber, description, poster
    FROM program_occurrences
    WHERE program_id = ?
    ORDER BY start_at
  `).all(programId);
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
        distinct_days_count, is_recurring, playback_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, 0, 0, 0, ?)
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
      entry.playbackUrl || null
    );
  } else {
    db.prepare(`
      UPDATE programs
      SET description = CASE WHEN ? <> '' THEN ? ELSE description END,
          poster = COALESCE(?, poster),
          poster_source_url = COALESCE(?, poster_source_url),
          poster_source_type = COALESCE(?, poster_source_type),
          playback_url = COALESCE(?, playback_url)
      WHERE program_id = ?
    `).run(
      entry.description || '',
      entry.description || '',
      entry.poster || null,
      entry.posterSourceUrl || null,
      entry.posterSourceType || null,
      entry.playbackUrl || null,
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
      poster_source_url, poster_source_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(program_id, start_at) DO UPDATE SET
      end_at = excluded.end_at,
      subtitle = excluded.subtitle,
      season_number = excluded.season_number,
      episode_number = excluded.episode_number,
      description = excluded.description,
      poster = COALESCE(excluded.poster, program_occurrences.poster),
      poster_source_url = COALESCE(excluded.poster_source_url, program_occurrences.poster_source_url),
      poster_source_type = COALESCE(excluded.poster_source_type, program_occurrences.poster_source_type)
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
    occurrence.posterSourceType || null
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
        first_seen_at = ?,
        last_seen_at = ?
    WHERE program_id = ?
  `).run(
    stats.count,
    stats.distinctDays,
    stats.distinctDays,
    stats.firstSeenAt || new Date().toISOString(),
    stats.lastSeenAt || new Date().toISOString(),
    programId
  );
}

function confirmEligiblePrograms() {
  const threshold = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  const rows = db.prepare(`
    SELECT program_id
    FROM programs
    WHERE status = 'pending'
      AND first_seen_at <= ?
      AND last_seen_at IS NOT NULL
      AND distinct_days_count >= 3
      AND (julianday(last_seen_at) - julianday(first_seen_at)) >= 3
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

module.exports = {
  db,
  getProgram,
  getProgramsByChannel,
  getProgramOccurrences,
  getOccurrenceById,
  getOccurrencesByChannel,
  upsertProgram,
  addOccurrence,
  confirmEligiblePrograms,
  createSyncRun,
  finishSyncRun,
  getLatestSyncRun
};
