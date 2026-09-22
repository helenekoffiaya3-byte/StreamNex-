const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const {
  upsertProgram,
  addOccurrence,
  confirmEligiblePrograms,
  createSyncRun,
  finishSyncRun
} = require('../models/program-db');

const CHANNEL_CONFIG = require('../config/channels');
const EPG_MAP_FILE = path.join(__dirname, '..', 'config', 'epg-map.json');
const IPTV_CHANNELS_URL = 'https://iptv-org.github.io/api/channels.json';
const IPTV_GUIDES_URL = 'https://iptv-org.github.io/api/guides.json';

const SOURCE_EPG_URL = process.env.SOURCE_EPG_URL?.trim() || null;

function validateEpgSourceUrl(value) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}
const CHANNEL_MAP = parseChannelMap(process.env.EPG_CHANNEL_MAP_JSON);
const USE_IPTV_ORG_GUIDES = process.env.EPG_USE_IPTV_ORG_GUIDES === 'true';

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

function loadIptvOrgMap() {
  if (!fs.existsSync(EPG_MAP_FILE)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(EPG_MAP_FILE, 'utf8'));
    return parsed && Array.isArray(parsed.mappings) ? parsed : null;
  } catch (error) {
    console.error('[Robot EPG] epg-map.json invalide:', error.message);
    return null;
  }
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function buildAutomaticIptvOrgMap(remoteChannels, guides) {
  const guideByChannel = new Map();

  for (const guide of guides) {
    const channelId = String(guide?.channel || '').trim();
    if (!channelId || !Array.isArray(guide.sources)) continue;

    const sources = guide.sources.map(source => {
      try {
        const url = new URL(String(source?.url || '').trim());
        if (!['http:', 'https:'].includes(url.protocol)) return null;
        return { url: url.toString(), format: source?.format || null, host: source?.host || null };
      } catch {
        return null;
      }
    }).filter(Boolean);

    if (sources.length) guideByChannel.set(channelId, sources);
  }

  const mappings = [];
  const ambiguous = [];

  for (const local of CHANNEL_CONFIG) {
    const localId = normalize(local.id);
    const localName = normalize(local.name);
    const candidates = remoteChannels.map(remote => {
      const ids = [remote.id, ...(Array.isArray(remote.alt_names) ? remote.alt_names : [])].map(normalize);
      const name = normalize(remote.name);
      let score = 0;
      if (localId && ids.includes(localId)) score = 100;
      else if (localName && (name === localName || ids.includes(localName))) score = 95;
      return { remote, score };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

    if (!candidates.length) {
      mappings.push({ streamliveChannelId: local.id, streamliveName: local.name, iptvOrgChannelId: null, guides: [] });
      continue;
    }

    const best = candidates.filter(item => item.score === candidates[0].score);
    if (best.length > 1) {
      ambiguous.push(local.id);
      mappings.push({ streamliveChannelId: local.id, streamliveName: local.name, iptvOrgChannelId: null, guides: [] });
      continue;
    }

    const remote = candidates[0].remote;
    mappings.push({
      streamliveChannelId: local.id,
      streamliveName: local.name,
      iptvOrgChannelId: remote.id,
      guides: (guideByChannel.get(remote.id) || []).map(source => ({ sources: [source] }))
    });
  }

  return { mappings, ambiguous };
}

async function getIptvOrgMap() {
  const localMap = loadIptvOrgMap();
  if (localMap?.mappings?.length) return localMap;

  const [channels, guides] = await Promise.all([
    fetchJson(IPTV_CHANNELS_URL),
    fetchJson(IPTV_GUIDES_URL)
  ]);

  if (!Array.isArray(channels) || !Array.isArray(guides)) {
    throw new Error('Les APIs iptv-org channels.json/guides.json sont invalides.');
  }

  const generated = buildAutomaticIptvOrgMap(channels, guides);
  console.log(`[Robot EPG] Mapping automatique : ${generated.mappings.length}/${CHANNEL_CONFIG.length} chaînes configurées, ${generated.ambiguous.length} ambiguës.`);
  return { generatedAt: new Date().toISOString(), mappings: generated.mappings };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`Source JSON HTTP ${response.status}: ${url}`);
  return response.json();
}

async function fetchXml(url) {
  const response = await fetch(url, {
    headers: { accept: 'application/xml,text/xml,application/gzip,*/*' },
    signal: AbortSignal.timeout(30000)
  });

  if (!response.ok) throw new Error(`Source EPG HTTP ${response.status}: ${url}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  if (!buffer.length) throw new Error(`Source EPG vide: ${url}`);

  const isGzip = buffer[0] === 0x1f && buffer[1] === 0x8b;
  if (isGzip) {
    const zlib = require('zlib');
    return zlib.gunzipSync(buffer).toString('utf8');
  }

  return buffer.toString('utf8');
}

function importXmltv(xml, channelResolver = null) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    trimValues: true
  });

  const parsed = parser.parse(xml);
  const rawPrograms = asArray(parsed?.tv?.programme);
  let importedCount = 0;

  for (const raw of rawPrograms) {
    const sourceChannelId = String(raw['@_channel'] || '').trim();
    if (channelResolver && !channelResolver.has(sourceChannelId)) continue;

    const channelId = channelResolver?.get(sourceChannelId) || resolveChannelId(sourceChannelId);
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

  return importedCount;
}

async function runEpgSync() {
  const syncId = createSyncRun();
  let importedCount = 0;

  const configuredSource = validateEpgSourceUrl(SOURCE_EPG_URL);

  if (!configuredSource && !USE_IPTV_ORG_GUIDES) {
    const message = SOURCE_EPG_URL
      ? 'SOURCE_EPG_URL invalide. Utilisez une URL HTTP(S) réelle et autorisée. Aucune donnée EPG ne sera créée.'
      : 'SOURCE_EPG_URL non configurée. Le robot reste en veille. Aucune donnée EPG ne sera créée.';

    finishSyncRun(syncId, 'skipped', 0, 0, message);
    console.warn('[Robot EPG]', message);
    return { skipped: true, importedCount: 0, confirmedCount: 0 };
  }

  try {
    if (configuredSource) {
      const xml = await fetchXml(configuredSource);
      importedCount += importXmltv(xml);
    } else {
      const map = await getIptvOrgMap();

      const sourceGroups = new Map();
      const sourceToLocal = new Map();

      for (const mapping of map.mappings) {
        sourceToLocal.set(mapping.iptvOrgChannelId, mapping.streamliveChannelId);
        for (const guide of mapping.guides || []) {
          for (const source of guide.sources || []) {
            if (!source.url) continue;

            if (!sourceGroups.has(source.url)) {
              sourceGroups.set(source.url, new Set());
            }
            sourceGroups.get(source.url).add(mapping.iptvOrgChannelId);
          }
        }
      }

      for (const [sourceUrl, sourceChannelIds] of sourceGroups) {
        const xml = await fetchXml(sourceUrl);
        const resolver = new Map();
        for (const sourceChannelId of sourceChannelIds) {
          const localChannelId = sourceToLocal.get(sourceChannelId);
          if (localChannelId) resolver.set(sourceChannelId, localChannelId);
        }
        importedCount += importXmltv(xml, resolver);
      }
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
