const fs = require('fs');
const path = require('path');

const IPTV_CHANNELS_URL = 'https://iptv-org.github.io/api/channels.json';
const IPTV_GUIDES_URL = 'https://iptv-org.github.io/api/guides.json';

const CHANNELS_FILE = path.join(__dirname, '..', 'config', 'channels.js');
const OUTPUT_FILE = path.join(__dirname, '..', 'config', 'epg-map.json');

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function scoreMatch(local, remote) {
  const localId = normalize(local.id);
  const localName = normalize(local.name);
  const remoteId = normalize(remote.id);
  const remoteName = normalize(remote.name);

  if (localId && localId === remoteId) return 100;
  if (localName && localName === remoteName) return 95;
  if (localName && (remoteName.includes(localName) || localName.includes(remoteName))) return 60;
  return 0;
}

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value || '').trim());
    return /^https?:$/i.test(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(30000)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} pour ${url}`);
  }

  return response.json();
}

async function mapChannels() {
  console.log('[EPG mapping] Récupération des métadonnées publiées par iptv-org...');

  const [remoteChannels, guides] = await Promise.all([
    fetchJson(IPTV_CHANNELS_URL),
    fetchJson(IPTV_GUIDES_URL)
  ]);

  if (!Array.isArray(remoteChannels) || !Array.isArray(guides)) {
    throw new Error('Réponse iptv-org invalide : channels.json/guides.json doit être un tableau.');
  }

  const localChannels = require(CHANNELS_FILE);
  if (!Array.isArray(localChannels)) {
    throw new Error('config/channels.js doit exporter un tableau de chaînes.');
  }

  const guideByChannel = new Map();

  for (const guide of guides) {
    const channelId = String(guide?.channel || '').trim();
    if (!channelId) continue;

    const sources = Array.isArray(guide.sources)
      ? guide.sources
          .map(source => {
            const url = safeHttpUrl(source?.url);
            if (!url) return null;
            return {
              url,
              format: source?.format || null,
              host: source?.host || null
            };
          })
          .filter(Boolean)
      : [];

    if (!sources.length) continue;

    if (!guideByChannel.has(channelId)) guideByChannel.set(channelId, []);

    const existing = guideByChannel.get(channelId);
    const key = JSON.stringify({
      feed: guide.feed || null,
      site: guide.site || null,
      siteId: guide.site_id || null,
      siteName: guide.site_name || null,
      lang: guide.lang || null,
      sources
    });

    if (!existing.some(item => item.key === key)) {
      existing.push({
        key,
        feed: guide.feed || null,
        site: guide.site || null,
        siteId: guide.site_id || null,
        siteName: guide.site_name || null,
        lang: guide.lang || null,
        sources
      });
    }
  }

  const mappings = [];
  const missing = [];
  const ambiguous = [];

  for (const local of localChannels) {
    const candidates = remoteChannels
      .map(remote => ({ remote, score: scoreMatch(local, remote) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (!candidates.length) {
      missing.push(local.id);
      continue;
    }

    const bestScore = candidates[0].score;
    const best = candidates.filter(item => item.score === bestScore);

    if (best.length > 1 && bestScore < 100) {
      ambiguous.push({
        channelId: local.id,
        name: local.name,
        candidates: best.map(item => ({ id: item.remote.id, name: item.remote.name }))
      });
      continue;
    }

    const remote = candidates[0].remote;
    const guideEntries = (guideByChannel.get(remote.id) || []).map(({ key, ...guide }) => guide);

    mappings.push({
      streamliveChannelId: local.id,
      streamliveName: local.name,
      iptvOrgChannelId: remote.id,
      iptvOrgName: remote.name,
      country: remote.country || null,
      guides: guideEntries
    });
  }

  const result = {
    generatedAt: new Date().toISOString(),
    provider: 'iptv-org/api',
    providerChannelsUrl: IPTV_CHANNELS_URL,
    providerGuidesUrl: IPTV_GUIDES_URL,
    mappings
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2) + '\n');

  const withGuide = mappings.filter(item => item.guides.length > 0).length;

  console.log('[EPG mapping] Terminé.');
  console.log(`[EPG mapping] Chaînes StreamLive : ${localChannels.length}`);
  console.log(`[EPG mapping] Correspondances sûres : ${mappings.length}`);
  console.log(`[EPG mapping] Avec au moins une source EPG publiée : ${withGuide}`);
  console.log(`[EPG mapping] Non trouvées : ${missing.length}`);
  console.log(`[EPG mapping] Ambiguës : ${ambiguous.length}`);
  console.log(`[EPG mapping] Fichier : ${OUTPUT_FILE}`);

  if (missing.length) console.warn('[EPG mapping] Non trouvées:', missing.join(', '));
  if (ambiguous.length) console.warn('[EPG mapping] Ambiguës:', JSON.stringify(ambiguous, null, 2));

  return result;
}

if (require.main === module) {
  mapChannels().catch(error => {
    console.error('[EPG mapping] Échec:', error.message);
    process.exitCode = 1;
  });
}

module.exports = { mapChannels };
