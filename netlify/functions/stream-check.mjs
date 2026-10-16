import channels from "../../config/channels.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
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
    // Read only a small prefix; never return source URLs or manifest contents to callers.
    const reader = response.body?.getReader();
    let prefix = "";
    if (reader) {
      try {
        while (prefix.length < 512) {
          const { done, value } = await reader.read();
          if (done) break;
          prefix += new TextDecoder().decode(value, { stream: true });
          if (prefix.includes("\\n") || prefix.includes("\\r")) break;
        }
      } finally {
        await reader.cancel().catch(() => {});
      }
    }
    const contentType = response.headers.get("content-type") || "";
    const looksHls = prefix.trimStart().startsWith("#EXTM3U");
    return {
      ok: response.ok && looksHls,
      httpStatus: response.status,
      contentType,
      looksHls,
      error: response.ok ? (looksHls ? null : "INVALID_M3U8") : "HTTP_ERROR"
    };
  } catch (error) {
    return { ok: false, httpStatus: 0, contentType: "", looksHls: false, error: error.name === "AbortError" ? "TIMEOUT" : "FETCH_ERROR" };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(request) {
  if (request.method !== "GET") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  const token = typeof process !== "undefined" ? process.env.STREAM_CHECK_TOKEN : null;
  if (!token) return json({ error: "STREAM_CHECK_NOT_CONFIGURED" }, 503);
  const supplied = request.headers.get("authorization") || "";
  if (supplied !== `Bearer ${token}`) return json({ error: "UNAUTHORIZED" }, 401);

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
