const RTI_PLAY_URL = "https://www.rtiplay.ci/";
const CHANNELS = {
  "rti-1": "RTI1",
  "rti-2": "RTI2",
  "la-3": "La 3"
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      ...extraHeaders
    }
  });
}

export default async function handler(request) {
  if (request.method !== "GET") return json({ error: "METHOD_NOT_ALLOWED" }, 405, { allow: "GET" });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(RTI_PLAY_URL, {
      method: "GET",
      redirect: "follow",
      headers: { "accept": "text/html,application/xhtml+xml", "user-agent": "Streamlive/1.0" },
      signal: controller.signal
    });
    const html = await response.text();

    if (!response.ok) {
      return json({ available: false, activeChannel: null, error: "RTI_PLAY_HTTP_ERROR", httpStatus: response.status });
    }

    const text = html.replace(/\s+/g, " ");
    const match = text.match(/Vous\s+suivez\s+actuellement\s+([^<]{1,80}?)\s+en\s+direct/i);
    const current = match ? match[1].trim() : "";
    let activeChannel = null;

    for (const id of Object.keys(CHANNELS)) {
      if (current.toLowerCase() === CHANNELS[id].toLowerCase()) {
        activeChannel = id;
        break;
      }
    }

    return json({
      available: true,
      activeChannel,
      activeName: activeChannel ? CHANNELS[activeChannel] : null,
      liveUrl: activeChannel ? RTI_PLAY_URL : null,
      checkedAt: new Date().toISOString(),
      source: RTI_PLAY_URL
    });
  } catch (error) {
    return json({
      available: false,
      activeChannel: null,
      error: error.name === "AbortError" ? "RTI_PLAY_TIMEOUT" : "RTI_PLAY_FETCH_ERROR"
    }, 502);
  } finally {
    clearTimeout(timer);
  }
}

export const config = { path: "/api/rti-live-status" };
