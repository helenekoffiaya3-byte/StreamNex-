const express = require('express');
const { rateLimit } = require('express-rate-limit');
const {
  db,
  syncConfiguredChannels,
  upsertChannel,
  addOccurrence,
  listAdminChannels,
  getAdminChannel,
  updateAdminChannel,
  deleteAdminChannel,
  updateProgram,
  deleteProgram,
  updateOccurrence,
  searchProgramsAll,
  createBroadcastFeed,
  getBroadcastFeed,
  listBroadcastFeeds,
  deleteBroadcastFeed
} = require('../models/program-db');
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
  return Boolean(getAdminChannel(channelId));
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
  const channels = listAdminChannels();
  res.json({ success: true, count: channels.length, channels });
});

router.post('/channels', (req, res) => {
  try {
    const id = String(req.body.id || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const name = String(req.body.name || '').trim();
    if (!id || id.length > 120) return res.status(400).json({ success: false, error: 'Identifiant de chaîne invalide.' });
    if (!name || name.length > 200) return res.status(400).json({ success: false, error: 'Nom de chaîne invalide.' });
    if (getAdminChannel(id)) return res.status(409).json({ success: false, error: 'Cette chaîne existe déjà.' });
    const channel = upsertChannel(id, name, req.body.liveStreamUrl || null, {
      group: req.body.groupName,
      description: req.body.description,
      logoUrl: req.body.logoUrl,
      active: req.body.active !== false,
      sortOrder: Number.isInteger(req.body.sortOrder) ? req.body.sortOrder : 9999,
      adminCustomized: true
    });
    res.status(201).json({ success: true, channel: getAdminChannel(id) || channel });
  } catch (error) {
    console.error('[API] admin create channel:', error);
    res.status(400).json({ success: false, error: error.message || 'Impossible de créer la chaîne.' });
  }
});

router.put('/channels/:channelId', (req, res) => {
  try {
    const channelId = req.params.channelId;
    if (!getAdminChannel(channelId)) return res.status(404).json({ success: false, error: 'Chaîne introuvable.' });
    const name = String(req.body.name || '').trim();
    if (!name || name.length > 200) return res.status(400).json({ success: false, error: 'Nom de chaîne invalide.' });
    const channel = updateAdminChannel(channelId, {
      name,
      groupName: String(req.body.groupName || 'Autre').trim(),
      description: String(req.body.description || '').trim(),
      logoUrl: req.body.logoUrl || null,
      liveStreamUrl: req.body.liveStreamUrl || null,
      active: req.body.active !== false,
      sortOrder: Number.isInteger(req.body.sortOrder) ? req.body.sortOrder : 0
    });
    res.json({ success: true, channel });
  } catch (error) {
    console.error('[API] admin update channel:', error);
    res.status(400).json({ success: false, error: error.message || 'Impossible de modifier la chaîne.' });
  }
});

router.delete('/channels/:channelId', (req, res) => {
  try {
    const channelId = req.params.channelId;
    if (CHANNELS.some(channel => channel.id === channelId)) {
      return res.status(409).json({ success: false, error: 'Les 140 chaînes configurées ne peuvent pas être supprimées depuis cet outil.' });
    }
    if (!deleteAdminChannel(channelId)) return res.status(404).json({ success: false, error: 'Chaîne introuvable.' });
    res.json({ success: true });
  } catch (error) {
    res.status(409).json({ success: false, error: error.message });
  }
});

router.get('/programs/search', (req, res) => {
  try {
    const programs = searchProgramsAll({
      query: String(req.query.q || '').trim(),
      channelId: req.query.channelId ? String(req.query.channelId) : null,
      type: req.query.type ? String(req.query.type) : null,
      limit: Number(req.query.limit || 250)
    });
    res.json({ success: true, count: programs.length, programs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/feeds', (_req, res) => {
  res.json({ success: true, feeds: listBroadcastFeeds() });
});

router.get('/feeds/:feedId', (req, res) => {
  const feed = getBroadcastFeed(req.params.feedId);
  if (!feed) return res.status(404).json({ success: false, error: 'Flux introuvable.' });
  res.json({ success: true, feed });
});

router.post('/feeds', (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const slug = String(req.body.slug || name).trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!name || name.length > 200) return res.status(400).json({ success:false,error:'Nom du flux invalide.' });
    if (!slug || slug.length > 120) return res.status(400).json({ success:false,error:'Identifiant du flux invalide.' });
    if (!items.length) return res.status(400).json({ success:false,error:'Ajoutez au moins un programme au flux.' });
    for (const item of items) {
      const p = db.prepare('SELECT program_id FROM programs WHERE program_id = ? AND status <> \'archived\'').get(item.programId);
      if (!p) return res.status(400).json({ success:false,error:'Programme introuvable : '+item.programId });
    }
    const feedId = 'feed-' + slug + '-' + Date.now().toString(36);
    const feed = createBroadcastFeed({
      feedId, name, slug, description:String(req.body.description||''),
      channelId:req.body.channelId||null, mode:req.body.mode==='scheduled'?'scheduled':'playlist',
      outputFormat:req.body.outputFormat==='json'?'json':'hls',
      loopEnabled:Boolean(req.body.loopEnabled),
      targetDurationSeconds:Number(req.body.targetDurationSeconds)||null
    }, items);
    res.status(201).json({ success:true, feed, playbackUrl:'/api/admin/feeds/'+encodeURIComponent(feedId)+'/manifest.m3u8' });
  } catch(error) {
    res.status(400).json({ success:false,error:error.message });
  }
});

router.get('/feeds/:feedId/manifest.m3u8', (req, res) => {
  const feed=getBroadcastFeed(req.params.feedId);
  if(!feed) return res.status(404).send('#EXTM3U\n');
  const playable=feed.items.filter(i=>i.playbackUrl);
  res.type('application/vnd.apple.mpegurl');
  let out='#EXTM3U\n#EXT-X-VERSION:3\n';
  for(const item of playable){
    if(item.durationSeconds) out+='#EXTINF:'+Number(item.durationSeconds).toFixed(3)+', '+item.title+'\n';
    out+=(item.playbackUrl || '')+'\n';
  }
  if(feed.loopEnabled) out+='#EXT-X-PLAYLIST-TYPE:EVENT\n';
  res.send(out);
});

router.delete('/feeds/:feedId', (req,res) => {
  if(!deleteBroadcastFeed(req.params.feedId)) return res.status(404).json({success:false,error:'Flux introuvable.'});
  res.json({success:true});
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

  res.json({ success: true, channel: getAdminChannel(channelId), programs, occurrences });
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

router.put('/programs/:programId', (req, res) => {
  try {
    const programId = req.params.programId;
    const existing = db.prepare('SELECT * FROM programs WHERE program_id = ?').get(programId);
    if (!existing) return res.status(404).json({ success: false, error: 'Programme introuvable.' });
    const title = String(req.body.title || '').trim();
    if (!title || title.length > 200) return res.status(400).json({ success: false, error: 'Titre invalide.' });
    const program = updateProgram(programId, {
      title,
      type: String(req.body.type || 'show'),
      description: String(req.body.description || ''),
      poster: req.body.poster || null,
      playbackUrl: req.body.playbackUrl || null,
      status: String(req.body.status || 'confirmed'),
      sourceType: 'admin-curated'
    });
    res.json({ success: true, program });
  } catch (error) {
    console.error('[API] admin update program:', error);
    res.status(400).json({ success: false, error: error.message || 'Impossible de modifier le programme.' });
  }
});

router.delete('/programs/:programId', (req, res) => {
  try {
    if (!deleteProgram(req.params.programId)) return res.status(404).json({ success: false, error: 'Programme introuvable.' });
    res.json({ success: true });
  } catch (error) {
    console.error('[API] admin delete program:', error);
    res.status(409).json({ success: false, error: error.message || 'Impossible de supprimer le programme.' });
  }
});

router.put('/schedule/:occurrenceId', (req, res) => {
  try {
    const occurrenceId = Number(req.params.occurrenceId);
    if (!Number.isInteger(occurrenceId) || occurrenceId <= 0) return res.status(400).json({ success: false, error: 'Programmation invalide.' });
    const existing = db.prepare('SELECT * FROM program_occurrences WHERE occurrence_id = ?').get(occurrenceId);
    if (!existing) return res.status(404).json({ success: false, error: 'Programmation introuvable.' });
    const channelId = String(req.body.channelId || existing.channel_id);
    const startAt = normalizeIso(req.body.startAt, 'Date/heure de début');
    const endAt = normalizeIso(req.body.endAt, 'Date/heure de fin');
    if (!channelExists(channelId)) return res.status(400).json({ success: false, error: 'Chaîne introuvable.' });
    if (Date.parse(endAt) <= Date.parse(startAt)) return res.status(400).json({ success: false, error: 'La fin doit être après le début.' });
    const conflict = validateScheduleWindow(channelId, startAt, endAt, occurrenceId);
    if (conflict) return res.status(409).json({ success: false, error: 'Conflit de programmation.', conflict });
    const programId = String(req.body.programId || existing.program_id);
    const program = db.prepare('SELECT * FROM programs WHERE program_id = ? AND channel_id = ?').get(programId, channelId);
    if (!program) return res.status(400).json({ success: false, error: 'Programme introuvable pour cette chaîne.' });
    const occurrence = updateOccurrence(occurrenceId, {
      channelId,
      startAt,
      endAt,
      subtitle: req.body.subtitle || null,
      seasonNumber: Number.isInteger(req.body.seasonNumber) ? req.body.seasonNumber : null,
      episodeNumber: Number.isInteger(req.body.episodeNumber) ? req.body.episodeNumber : null,
      description: String(req.body.description || ''),
      playbackUrl: req.body.playbackUrl || null,
      broadcastType: req.body.broadcastType === 'rerun' ? 'rerun' : 'broadcast'
    });
    res.json({ success: true, occurrence });
  } catch (error) {
    console.error('[API] admin update schedule:', error);
    res.status(400).json({ success: false, error: error.message || 'Impossible de modifier la programmation.' });
  }
});

router.post('/schedule', (req, res) =>
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
