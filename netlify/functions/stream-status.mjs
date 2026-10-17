import channels from "../../config/channels.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }), {
      status: 405,
      headers: { "content-type": "application/json", "allow": "GET" }
    });
  }

  const configured = channels.filter((channel) => Boolean(channel.webUrl));
  const missing = channels.filter((channel) => !channel.webUrl).map((channel) => ({
    id: channel.id,
    name: channel.name,
    channelNumber: channel.channelNumber,
    configured: false,
    reason: "WEB_URL_MISSING"
  }));

  return new Response(JSON.stringify({
    total: channels.length,
    configured: configured.length,
    unavailable: missing.length,
    allConfigured: missing.length === 0,
    sourceType: "official-web-link",
    channels: channels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      channelNumber: channel.channelNumber,
      configured: Boolean(channel.webUrl),
      webUrl: channel.webUrl || null
    }))
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export const config = { path: "/api/stream-status" };
