import channels from "../../config/channels.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }), {
      status: 405,
      headers: { "content-type": "application/json", "allow": "GET" }
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
    productionUrl: channel.productionUrl || null,
    streamEnabled: Boolean(channel.streamEnabled),
    streamConfigured: Boolean(channel.productionUrl || channel.youtubeChannelId),
    liveOnly: Boolean(channel.liveOnly),
    streamEnv: channel.streamEnv || null,
    streamSource: channel.streamSource || (channel.productionUrl ? "hls" : null),
    youtubeChannelId: channel.youtubeChannelId || null
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
