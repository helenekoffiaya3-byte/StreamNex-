import * as channelModule from "../../config/channels.js";

const channels = Array.isArray(channelModule)
  ? channelModule
  : Array.isArray(channelModule?.default)
    ? channelModule.default
    : Array.isArray(channelModule?.CHANNELS)
      ? channelModule.CHANNELS
      : [];

export default async function handler(request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }), {
      status: 405,
      headers: { "content-type": "application/json", "allow": "GET" }
    });
  }

  if (!Array.isArray(channels) || channels.length === 0) {
    return new Response(JSON.stringify({ error: "EMPTY_CHANNEL_CATALOGUE", channels: [] }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }

  const mode = request.url ? new URL(request.url).searchParams.get("mode") : null;
  const sourceChannels = mode === "live" ? channels : channels.filter((channel) => !channel.liveOnly);
  const publicChannels = sourceChannels.map((channel) => ({
    id: channel.id,
    tvgId: channel.tvgId || channel.id,
    channelNumber: channel.channelNumber,
    name: channel.name,
    group: channel.group || "",
    logoUrl: channel.logoUrl || "",
    bouquet: null,
    bouquets: [],
    webUrl: channel.webUrl || null,
    streamUrl: channel.streamUrl || channel.productionUrl || channel.hlsUrl || channel.directUrl || null,
    webConfigured: Boolean(channel.webUrl || channel.streamUrl || channel.productionUrl || channel.hlsUrl || channel.directUrl),
    liveOnly: Boolean(channel.liveOnly)
  }));

  return new Response(JSON.stringify(publicChannels), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export const config = { path: "/api/channels" };
