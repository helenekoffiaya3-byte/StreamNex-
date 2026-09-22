const { XMLParser } = require('fast-xml-parser');
const {
  upsertProgram,
  addOccurrence,
  confirmEligiblePrograms,
  createSyncRun,
  finishSyncRun
} = require('../models/program-db');

const CHANNEL_CONFIG = require('../config/channels');

const SOURCE_EPG_URL = process.env.SOURCE_EPG_URL || null;
const CHANNEL_MAP = parseChannelMap(process.env.EPG_CHANNEL_MAP_JSON);

function parseChannelMap(value) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.error('[Robot EPG] EPG_CHANNEL_MAP_JSON invalide:', error.message);
    return {};
  }
}

function asArray(value) {
  return value == null ? [] : Array.isArray(value) ? value : [value];
}

function textValue(value) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return String(value['#text'] ?? value._ ?? '').trim();
}

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseXmltvDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;

  const match = raw.match(/^(\d{14})(?:\s*([+-]\d{4}|Z))?/);
  if (!match) return null;

  const digits = match[1];
  const base = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}T${digits.slice(8, 10)}:${digits.slice(10, 12)}:${digits.slice(12, 14)}`;
  const zone = match[2] && match[2] !== 'Z'
    ? `${match[2].slice(0, 3)}:${match[2].slice(3)}`
    : 'Z';

  const date = new Date(base + zone);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseEpisode(value) {
  const raw = textValue(value);
  if (!raw) return { seasonNumber: null, episodeNumber: null };

  const ns = raw.match(/^(\d+)\s*\.\s*(\d+)/);
  if (ns) {
    return {
      seasonNumber: Number(ns[1]) + 1,
      episodeNumber: Number(ns[2]) + 1
    };
  }

  const onscreen = raw.match(/S(\d+)\s*E(\d+)/i);
  if (onscreen) {
    return {
      seasonNumber: Number(onscreen[1]),
      episodeNumber: Number(onscreen[2])
    };
  }

  return { seasonNumber: null, episodeNumber: null };
}

function detectType(raw) {
  const category = textValue(asArray(raw.category)[0]).toLowerCase();

  if (/news|journal|information|actualité|jt/.test(category)) return 'news';
  if (/movie|film|cinéma/.test(category)) return 'movie';

  if (
    raw['episode-num'] ||
    raw['series-id'] ||
    /series|série|soap|feuilleton/.test(category)
  ) {
    return 'series';
  }

  return 'show';
}

function resolveChannelId(sourceChannelId) {
  const mapped = CHANNEL_MAP[sourceChannelId] || sourceChannelId;
  return CHANNEL_CONFIG.some(channel => channel.id === mapped) ? mapped : null;
}

async function runEpgSync() {
  const syncId = createSyncRun();
  let importedCount = 0;

  if (!SOURCE_EPG_URL) {
    const message = 'SOURCE_EPG_URL non configurée. Aucune donnée EPG ne sera créée.';
    finishSyncRun(syncId, 'skipped', 0, 0, message);
    console.warn('[Robot EPG]', message);
    return { skipped: true, importedCount: 0, confirmedCount: 0 };
  }

  try {
    const response = await fetch(SOURCE_EPG_URL, {
      headers: { accept: 'application/xml,text/xml,*/*' },
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      throw new Error(`Source EPG HTTP ${response.status}`);
    }

    const xml = await response.text();
    if (!xml.trim()) throw new Error('La source EPG a renvoyé un document vide.');

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      trimValues: true
    });

    const parsed = parser.parse(xml);
    const rawPrograms = asArray(parsed?.tv?.programme);

    for (const raw of rawPrograms) {
      const sourceChannelId = String(raw['@_channel'] || '').trim();
      const channelId = resolveChannelId(sourceChannelId);
      if (!channelId) continue;

      const title = textValue(asArray(raw.title)[0]);
      const startAt = parseXmltvDate(raw['@_start']);
      if (!title || !startAt) continue;

      const endAt = parseXmltvDate(raw['@_stop']);
      const description = textValue(asArray(raw.desc)[0]);
      const subtitle = textValue(asArray(raw['sub-title'])[0]);
      const poster = raw.icon && raw.icon['@_src'] ? String(raw.icon['@_src']) : null;
      const episode = parseEpisode(asArray(raw['episode-num'])[0]);
      const type = detectType(raw);
      const programId = `${channelId}-${slugify(title)}`;

      upsertProgram({
        programId,
        channelId,
        title,
        type,
        description,
        poster
      });

      addOccurrence(programId, {
        channelId,
        startAt,
        endAt,
        subtitle: subtitle || null,
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        description,
        poster
      });

      importedCount += 1;
    }

    const confirmedCount = confirmEligiblePrograms();
    finishSyncRun(syncId, 'success', importedCount, confirmedCount);

    console.log(`[Robot EPG] OK: ${importedCount} occurrences réelles importées, ${confirmedCount} programmes confirmés.`);
    return { skipped: false, importedCount, confirmedCount };
  } catch (error) {
    finishSyncRun(syncId, 'error', importedCount, 0, error.message);
    console.error('[Robot EPG] Erreur:', error.message);
    throw error;
  }
}

module.exports = { runEpgSync };
