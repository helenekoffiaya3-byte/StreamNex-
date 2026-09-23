const fs = require('fs');
const path = require('path');
require('dotenv').config();
const channels = require('../config/channels');

const TIMEOUT_MS = Number(process.env.CHANNEL_HEALTH_TIMEOUT_MS || 7000);
const CONCURRENCY_LIMIT = Number(process.env.CHANNEL_HEALTH_CONCURRENCY || 10);

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, redirect: 'follow', signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function testChannelStream(channel) {
  const url = channel.productionUrl;
  if (!url) {
    return { id: channel.id, name: channel.name, status: 'MISSING_URL', ok: false };
  }

  try {
    let response;
    try {
      response = await fetchWithTimeout(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'StreamLive-HealthCheck/1.0', Accept: '*/*' }
      });
    } catch {}

    const headType = String(response?.headers?.get('content-type') || '').toLowerCase();
    const needsManifest = !response || !response.ok || !headType || headType.includes('text/html') || /\.m3u8(?:$|[?#])/i.test(url);

    if (needsManifest) {
      response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'StreamLive-HealthCheck/1.0',
          Accept: 'application/vnd.apple.mpegurl, application/x-mpegURL, */*'
        }
      });
    }

    if (!response.ok) {
      return { id: channel.id, name: channel.name, url, status: `HTTP_${response.status}`, ok: false };
    }

    const text = await response.text();
    if (!text.includes('#EXTM3U')) {
      return { id: channel.id, name: channel.name, url, status: 'INVALID_HLS', ok: false };
    }

    return {
      id: channel.id,
      name: channel.name,
      url,
      finalUrl: response.url || url,
      status: 'ONLINE',
      ok: true
    };
  } catch (error) {
    return {
      id: channel.id,
      name: channel.name,
      url,
      status: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      message: error.message,
      ok: false
    };
  }
}

async function runAudit() {
  const results = [];
  for (let i = 0; i < channels.length; i += CONCURRENCY_LIMIT) {
    const batch = await Promise.all(channels.slice(i, i + CONCURRENCY_LIMIT).map(testChannelStream));
    results.push(...batch);
    for (const result of batch) {
      console.log(`${result.ok ? 'OK' : 'NO'} [${result.id}] ${result.name} -> ${result.status}`);
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    total: results.length,
    online: results.filter(item => item.ok).length,
    offlineOrMissing: results.filter(item => !item.ok).length,
    results
  };

  const reportPath = path.join(process.cwd(), 'channels-health-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));

  if (process.env.CHANNEL_HEALTH_STRICT === 'true' && summary.offlineOrMissing > 0) process.exitCode = 1;
}

runAudit().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
