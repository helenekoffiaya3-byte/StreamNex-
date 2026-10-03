import channels from "../../config/channels.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }), {
      status: 405,
      headers: { "content-type": "application/json", "allow": "GET" }
    });
  }

  const publicChannels = channels.map((channel) => ({
    id: channel.id,
    channelNumber: channel.channelNumber,
    name: channel.name,
    group: channel.group || "",
    logoUrl: channel.logoUrl || "",
    productionUrl: channel.productionUrl || null,
    streamEnabled: Boolean(channel.streamEnabled)
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
