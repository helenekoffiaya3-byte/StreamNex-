const express = require('express');
const { rateLimit } = require('express-rate-limit');
const { db, syncConfiguredChannels, upsertProgram, addOccurrence } = require('../models/program-db');
const { requireAdminAuth, ADMIN_EMAIL } = require('../services/adminAuth');
const CHANNELS = require('../config/channels');

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, error: 'Trop de requêtes administrateur.' }
});

router.use(limiter, requireAdminAuth);

function normalizeIso(value, field) {
  const parsed = new Date(String(value || ''));
  if (!value || Number.isNaN(parsed.getTime())) throw new Error(field + ' invalide.');
  return parsed.toISOString();
}

function channelExists(channelId) {
  return CHANNELS.some(channel => channel.id === channelId);
}

function validateScheduleWindow(channelId, startAt, endAt, excludeOccurrenceId = null) {
  const row = db.prepare(`
    SELECT occurrence_id AS occurrenceId, start_at AS startAt, end_at AS endAt, title
    FROM program_occurrences
    WHERE channel_id = ?
      AND (? IS NULL OR occurrence_id <> ?)
      AND end_at IS NOT NULL
      AND start_at < ?
      AND end_at > ?
    ORDER BY start_at
    LIMIT 1
  `).get(channelId, excludeOccurrenceId, excludeOccurrenceId, endAt, startAt);
  return row || null;
}

router.get('/me', (req, res) => {
  res.json({
    success: true,
    admin: {
      email: ADMIN_EMAIL,
      username: req.admin.username || null,
      role: req.admin.role
    }
  });
});

router.get('/dashboard', (_req, res) => {
  try {
    const count = table => db.prepare('SELECT COUNT(*) AS count FROM ' + table).get().count;
    const stats = {
      channels: count('channels'),
      configuredChannels: CHANNELS.length,
      programs: count('programs'),
      occurrences: count('program_occurrences'),
      mediaAssets: count('media_assets'),
      recordings: count('recordings'),
      recordingSegments: count('recording_segments'),
      replayCatalog: count('replay_catalog'),
      episodes: count('episodes'),
      movies: count('movies'),
      series: count('series'),
      subtitles: count('subtitles'),
      audioTracks: count('audio_tracks')
    };
    return res.json({
      success: true,
      database: 'streamlive-production',
      visibility: 'admin-only',
      adminEmail: ADMIN_EMAIL,
      stats
    });
  } catch (error) {
    console.error('[API] admin dashboard:', error);
    return res.status(500).json({ success: false, error: 'Base de données administrateur indisponible.' });
  }
});

router.get('/channels', (_req, res) => {
  syncConfiguredChannels(CHANNELS);
  const channels = db.prepare(`
    SELECT c.channel_id AS id, c.name,
           c.live_stream_url AS liveStreamUrl, c.updated_at AS updatedAt
    FROM channels c
    ORDER BY c.channel_id
  `).all();
  res.json({ success: true, count: channels.length, channels });
});

router.get('/channels/:channelId/programs', (req, res) => {
  const channelId = req.params.channelId;
  if (!channelExists(channelId)) return res.status(404).json({ success: false, error: 'Chaîne introuvable.' });

  const programs = db.prepare(`
    SELECT program_id AS programId, channel_id AS channelId, title, type,
           description, poster, status, source_type AS sourceType,
           occurrences_count AS occurrencesCount, is_recurring AS isRecurring
    FROM programs
    WHERE channel_id = ?
    ORDER BY title COLLATE NOCASE
  `).all(channelId);

  const occurrences = db.prepare(`
    SELECT po.occurrence_id AS occurrenceId, po.program_id AS programId,
           p.title, po.start_at AS startAt, po.end_at AS endAt,
           po.broadcast_type AS broadcastType, po.subtitle,
           po.season_number AS seasonNumber, po.episode_number AS episodeNumber,
           po.description, po.playback_url AS playbackUrl
    FROM program_occurrences po
    JOIN programs p ON p.program_id = po.program_id
    WHERE po.channel_id = ?
    ORDER BY po.start_at
  `).all(channelId);

  res.json({ success: true, channel: CHANNELS.find(c => c.id === channelId), programs, occurrences });
});

router.post('/programs', (req, res) => {
  try {
    const channelId = String(req.body.channelId || '').trim();
    const title = String(req.body.title || '').trim();
    if (!channelExists(channelId)) return res.status(400).json({ success: false, error: 'Chaîne introuvable.' });
    if (!title || title.length > 200) return res.status(400).json({ success: false, error: 'Titre de programme invalide.' });

    const programId = String(req.body.programId || (channelId + '-' + title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')).slice(0, 180);
    const existing = db.prepare('SELECT program_id AS programId FROM programs WHERE program_id = ?').get(programId);
    if (existing) return res.status(409).json({ success: false, error: 'Ce programme existe déjà.' });

    db.prepare(`
      INSERT INTO programs (
        program_id, channel_id, title, type, description, poster,
        status, first_seen_at, last_seen_at, occurrences_count,
        distinct_days_count, is_recurring, playback_url, source_type
      ) VALUES (?, ?, ?, ?, ?, ?, 'confirmed', ?, ?, 0, 0, 0, ?, 'admin-curated')
    `).run(
      programId,
      channelId,
      title,
      String(req.body.type || 'show'),
      String(req.body.description || ''),
      req.body.poster || null,
      new Date().toISOString(),
      new Date().toISOString(),
      req.body.playbackUrl || null
    );

    const program = db.prepare('SELECT * FROM programs WHERE program_id = ?').get(programId);
    res.status(201).json({ success: true, program });
  } catch (error) {
    console.error('[API] admin create program:', error);
    res.status(500).json({ success: false, error: 'Impossible de créer le programme.' });
  }
});

router.post('/schedule', (req, res) => {
  try {
    const channelId = String(req.body.channelId || '').trim();
    const programId = String(req.body.programId || '').trim();
    const startAt = normalizeIso(req.body.startAt, 'Date/heure de début');
    const endAt = normalizeIso(req.body.endAt, 'Date/heure de fin');
    const broadcastType = req.body.broadcastType === 'rerun' ? 'rerun' : 'broadcast';

    if (!channelExists(channelId)) return res.status(400).json({ success: false, error: 'Chaîne introuvable.' });
    const program = db.prepare('SELECT * FROM programs WHERE program_id = ? AND channel_id = ?').get(programId, channelId);
    if (!program) return res.status(400).json({ success: false, error: 'Programme introuvable pour cette chaîne.' });
    if (Date.parse(endAt) <= Date.parse(startAt)) {
      return res.status(400).json({ success: false, error: 'La fin doit être après le début.' });
    }

    const conflict = validateScheduleWindow(channelId, startAt, endAt);
    if (conflict) {
      return res.status(409).json({
        success: false,
        error: 'Conflit de programmation : un autre programme est déjà prévu sur ce créneau.',
        conflict
      });
    }

    const occurrence = {
      channelId,
      startAt,
      endAt,
      broadcastType,
      subtitle: req.body.subtitle || null,
      seasonNumber: Number.isInteger(req.body.seasonNumber) ? req.body.seasonNumber : null,
      episodeNumber: Number.isInteger(req.body.episodeNumber) ? req.body.episodeNumber : null,
      description: String(req.body.description || ''),
      playbackUrl: req.body.playbackUrl || null
    };
    addOccurrence(programId, occurrence);

    const created = db.prepare(`
      SELECT occurrence_id AS occurrenceId, program_id AS programId,
             channel_id AS channelId, start_at AS startAt, end_at AS endAt,
             broadcast_type AS broadcastType, subtitle, playback_url AS playbackUrl
      FROM program_occurrences
      WHERE program_id = ? AND start_at = ?
    `).get(programId, startAt);

    res.status(201).json({ success: true, occurrence: created });
  } catch (error) {
    console.error('[API] admin schedule:', error);
    res.status(400).json({ success: false, error: error.message || 'Programmation invalide.' });
  }
});

router.delete('/schedule/:occurrenceId', (req, res) => {
  const id = Number(req.params.occurrenceId);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ success: false, error: 'Occurrence invalide.' });
  const result = db.prepare('DELETE FROM program_occurrences WHERE occurrence_id = ?').run(id);
  if (!result.changes) return res.status(404).json({ success: false, error: 'Programmation introuvable.' });
  res.json({ success: true });
});

module.exports = router;
