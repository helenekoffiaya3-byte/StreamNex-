import { getStore } from "@netlify/blobs";

const STORE_NAME = "streamlive-source-review";
const MAX_URL_LENGTH = 2048;
const MAX_BODY_BYTES = 256 * 1024;
const TIMEOUT_MS = 7000;

function reply(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

function safePublicUrl(raw) {
  try {
    const u = new URL(String(raw || ""));
    if (!["https:", "http:"].includes(u.protocol) || u.username || u.password) return null;
    const h = u.hostname.toLowerCase();
    if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal") ||
        h === "0.0.0.0" || h === "::1" || h.startsWith("127.") || h.startsWith("10.") ||
        h.startsWith("192.168.") || h.startsWith("169.254.") ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(h)) return null;
    return u;
  } catch { return null; }
}

function formatFrom(url, type, sample = "") {
  const path = url.pathname.toLowerCase();
  const ct = (type || "").toLowerCase();
  if (/\.m3u8$/.test(path) || ct.includes("mpegurl") || sample.trimStart().startsWith("#EXTM3U")) return "HLS";
  if (/\.mpd$/.test(path) || ct.includes("dash+xml")) return "MPEG-DASH";
  if (/\.mp4$/.test(path) || ct.startsWith("video/mp4")) return "MP4";
  if (/\.mp3$/.test(path) || ct.startsWith("audio/mpeg")) return "MP3";
  if (ct.includes("text/html") || sample.trimStart().startsWith("<!doctype html") || sample.trimStart().startsWith("<html")) return "HTML_PAGE";
  if (ct.startsWith("video/")) return "VIDEO_OTHER";
  if (ct.startsWith("audio/")) return "AUDIO_OTHER";
  return "UNKNOWN";
}

async function inspectUrl(input) {
  let current = safePublicUrl(input);
  if (!current) return { ok: false, error: "URL_NOT_ALLOWED", message: "URL HTTP(S) publique requise." };
  let response;
  try {
    for (let hop = 0; hop <= 3; hop++) {
      response = await fetch(current.href, {
        method: "GET",
        redirect: "manual",
        headers: { "Range": "bytes=0-4095", "User-Agent": "StreamLiveSourceVerifier/1.0" },
        signal: AbortSignal.timeout(TIMEOUT_MS)
      });
      if ([301,302,303,307,308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location || hop === 3) return { ok: false, error: "REDIRECT_LIMIT", status: response.status };
        const next = safePublicUrl(new URL(location, current).href);
        if (!next) return { ok: false, error: "UNSAFE_REDIRECT" };
        current = next;
        continue;
      }
      break;
    }
    const type = response.headers.get("content-type") || "";
    const length = Number(response.headers.get("content-length") || 0);
    let sample = "";
    if (!/^(video|audio)\//i.test(type) && !/mpegurl|dash\+xml/i.test(type)) {
      const reader = response.body?.getReader();
      if (reader) {
        const chunks = [];
        let total = 0;
        try {
          while (total < MAX_BODY_BYTES) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = value.slice(0, MAX_BODY_BYTES - total);
            chunks.push(chunk); total += chunk.length;
            if (total >= 4096) break;
          }
        } finally { try { await reader.cancel(); } catch {} }
        const bytes = new Uint8Array(chunks.reduce((n, x) => n + x.length, 0));
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        sample = new TextDecoder().decode(bytes);
      }
    } else {
      try { await response.body?.cancel(); } catch {}
    }
    const format = formatFrom(current, type, sample);
    const looksPlayable = ["HLS", "MPEG-DASH", "MP4", "MP3", "VIDEO_OTHER", "AUDIO_OTHER"].includes(format);
    return {
      ok: response.ok,
      url: current.href,
      httpStatus: response.status,
      contentType: type || null,
      contentLength: Number.isFinite(length) && length > 0 ? length : null,
      format,
      playerHint: format === "HLS" ? "Hls.js ou lecture native HLS" : format === "MP4" || format === "MP3" || format === "VIDEO_OTHER" || format === "AUDIO_OTHER" ? "Lecture native éventuelle" : format === "MPEG-DASH" ? "Lecteur DASH requis; non pris en charge par la configuration HLS actuelle" : "Page web ou format indéterminé",
      playableEndpointCandidate: looksPlayable && response.ok,
      officialStatus: "NON_VERIFIE",
      rightsStatus: "NON_VERIFIE",
      note: "Une réponse HTTP positive ne prouve ni l'identité du diffuseur, ni la lecture réelle, ni le droit de retransmission."
    };
  } catch (error) {
    return { ok: false, error: error?.name === "TimeoutError" ? "TIMEOUT" : "FETCH_FAILED", message: "La page n'a pas pu être vérifiée depuis Netlify." };
  }
}

export default async function handler(request) {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname.endsWith("/source-verify")) {
    const target = url.searchParams.get("url") || "";
    if (target.length > MAX_URL_LENGTH) return reply({ error: "URL_TOO_LONG" }, 400);
    return reply(await inspectUrl(target));
  }
  if (request.method === "POST" && url.pathname.endsWith("/source-review")) {
    const expected = typeof Netlify !== "undefined" ? Netlify.env.get("STREAMLIVE_SOURCE_REVIEW_TOKEN") : undefined;
    if (!expected || request.headers.get("authorization") !== "Bearer " + expected) return reply({ error: "UNAUTHORIZED", message: "Validation administrative non configurée." }, 401);
    let body;
    try { body = await request.json(); } catch { return reply({ error: "INVALID_JSON" }, 400); }
    const name = String(body?.channelName || "").trim().slice(0, 120);
    const target = safePublicUrl(body?.url);
    if (name.length < 2 || !target || String(body?.url || "").length > MAX_URL_LENGTH) return reply({ error: "INVALID_CANDIDATE" }, 400);
    const verification = await inspectUrl(target.href);
    const key = "pending/" + encodeURIComponent(name.toLowerCase()).slice(0, 140) + "/" + encodeURIComponent(target.hostname + target.pathname).slice(0, 240);
    const store = getStore(STORE_NAME);
    const existing = await store.get(key, { type: "json" });
    const record = {
      channelName: name,
      url: target.href,
      status: "pending_manual_review",
      firstSeenAt: existing?.firstSeenAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verification,
      approvedForCatalogue: false
    };
    await store.setJSON(key, record);
    return reply({ saved: true, status: record.status, record });
  }
  if (request.method === "GET" && url.pathname.endsWith("/source-review")) {
    const expected = typeof Netlify !== "undefined" ? Netlify.env.get("STREAMLIVE_SOURCE_REVIEW_TOKEN") : undefined;
    if (!expected || request.headers.get("authorization") !== "Bearer " + expected) return reply({ error: "UNAUTHORIZED" }, 401);
    const store = getStore(STORE_NAME);
    const { blobs } = await store.list({ prefix: "pending/" });
    const records = [];
    for (const item of blobs.slice(0, 100)) {
      const record = await store.get(item.key, { type: "json" });
      if (record) records.push(record);
    }
    return reply({ count: records.length, records });
  }
  return reply({ error: "NOT_FOUND" }, 404);
}

export const config = {
  path: ["/api/source-verify", "/api/source-review"],
  rateLimit: { action: "rate_limit", aggregateBy: "ip", windowSize: 60, windowLimit: 30 }
};
