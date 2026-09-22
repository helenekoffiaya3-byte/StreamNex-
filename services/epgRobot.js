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
  return String(value['#text'] ?? value._ ?? '');
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
  const isoBase = `${digits.slice(0,4)}-${digits.slice(4,6)}-${digits.slice(6,8)}T${digits.slice(8,10)}:${digits.slice(10,12)}:${digits.slice(12,14)}`;
  const zone = match[2] && match[2] !== 'Z'
    ? `${match[2].slice(0,3)}:${match[2].slice(3)}`
    : 'Z';

  const date = new Date(isoBase + zone);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseEpisode(value) {
  const raw = textValue(value);
  if (!raw) return { seasonNumber: null, episodeNumber: null };

  const xmltvNs = raw.split('.');
  if (xmltvNs.length >= 2 && /^\d+$/.test(xmltvNs[0]) && /^\d+$/.test(xmltvNs[1])) {
    return {
      seasonNumber: Number(xmltvNs[0]) + 1,
      episodeNumber: Number(xmltvNs[1]) + 1
    };
  }

  const match = raw.match(/S(\d+)\s*E(\d+)/i);
  if (match) {
    return { seasonNumber: Number(match[1]), episodeNumber: Number(match[2]) };
  }

  return { seasonNumber: null, episodeNumber: null };
}

function detectType(title, raw) {
  const category = textValue(asArray(raw.category)[0]).toLowerCase();
  if (/news|journal|information|actualité|jt/.test(category + ' ' + title.toLowerCase())) return 'news';
  if (/series|série|soap|feuilleton/.test(category + ' ' + title.toLowerCase()) || raw['episode-num'] || raw['series-id']) return 'series';
  if (/movie|film|cinéma/.test(category + ' ' + title.toLowerCase())) return 'movie';
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
    const message = 'SOURCE_EPG_URL non configurée. Synchronisation ignorée.';
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
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      trimValues: true
    });

    const parsed = parser.parse(xml);
    const rawPrograms = asArray(parsed?.tv?.programme);

    for (const raw of rawPrograms) {
      const sourceChannelId = raw['@_channel'];
      const channelId = resolveChannelId(sourceChannelId);
      if (!channelId) continue;

      const title = textValue(asArray(raw.title)[0]).trim();
      const startAt = parseXmltvDate(raw['@_start']);
      if (!title || !startAt) continue;

      const endAt = parseXmltvDate(raw['@_stop']);
      const description = textValue(asArray(raw.desc)[0]).trim();
      const subtitle = textValue(asArray(raw['sub-title'])[0]).trim();
      const poster = raw.icon?.['@_src'] || null;
      const episode = parseEpisode(asArray(raw['episode-num'])[0]);
      const type = detectType(title, raw);
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
        subtitle,
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        description,
        poster
      });

      importedCount += 1;
    }

    const confirmedCount = confirmEligiblePrograms();
    finishSyncRun(syncId, 'success', importedCount, confirmedCount);

    console.log(`[Robot EPG] OK: ${importedCount} occurrences importées, ${confirmedCount} programmes confirmés.`);
    return { skipped: false, importedCount, confirmedCount };
  } catch (error) {
    finishSyncRun(syncId, 'error', importedCount, 0, error.message);
    console.error('[Robot EPG] Erreur:', error);
    throw error;
  }
}

module.exports = { runEpgSync };
