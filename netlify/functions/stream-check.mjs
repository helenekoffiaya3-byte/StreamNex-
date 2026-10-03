import channels from "../../config/channels.js";

function json(data, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "accept": "application/vnd.apple.mpegurl, audio/mpegurl, text/plain, */*" },
      signal: controller.signal,
      redirect: "follow"
    });
    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";
    const looksHls = text.trimStart().startsWith("#EXTM3U");
    return {
      ok: response.ok && looksHls,
      httpStatus: response.status,
      contentType,
      looksHls,
      finalUrl: response.url,
      error: response.ok ? (looksHls ? null : "INVALID_M3U8") : "HTTP_ERROR"
    };
  } catch (error) {
    return { ok: false, httpStatus: 0, contentType: "", looksHls: false, finalUrl: url, error: error.name === "AbortError" ? "TIMEOUT" : "FETCH_ERROR" };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(request) {
  if (request.method !== "GET") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  const results = [];
  for (const channel of channels) {
    const source = channel.productionUrl || null;
    if (!source) {
      results.push({
        id: channel.id,
        name: channel.name,
        source: channel.youtubeChannelId ? "youtube-live" : null,
        status: channel.youtubeChannelId ? "youtube-live" : "unconfigured"
      });
      continue;
    }
    results.push({
      id: channel.id,
      name: channel.name,
      source: "hls",
      status: "checking",
      url: source,
      ...(await probe(source))
    });
  }

  return json({
    checkedAt: new Date().toISOString(),
    total: results.length,
    hls: results.filter((r) => r.source === "hls").length,
    youtubeLive: results.filter((r) => r.source === "youtube-live").length,
    unconfigured: results.filter((r) => r.status === "unconfigured").length,
    results
  });
}

export const config = { path: "/api/stream-check" };
