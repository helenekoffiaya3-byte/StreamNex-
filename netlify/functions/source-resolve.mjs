import { castSat } from "../../config/cast-sat.js";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function envNameFor(channelId) {
  const safe = String(channelId || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return safe ? `CASTSAT_${safe}_HLS_URL` : null;
}

function findSatelliteMatch(channelId) {
  const list = Array.isArray(castSat.catalogueCoverage) ? castSat.catalogueCoverage : [];
  return list.find((entry) => entry.id === channelId) || null;
}

export default async function handler(request) {
  if (request.method !== "GET") return json({ error: "METHOD_NOT_ALLOWED" }, 405);

  const url = new URL(request.url);
  const channelId = url.searchParams.get("id");
  const preferSatellite = url.searchParams.get("preferSatellite") === "1";
  if (!channelId) return json({ error: "MISSING_CHANNEL_ID" }, 400);

  const match = findSatelliteMatch(channelId);
  const envName = envNameFor(channelId);
  const satelliteUrl = envName ? Netlify.env.get(envName) : null;

  return json({
    channelId,
    preferredSource: preferSatellite && satelliteUrl ? "cast-sat" : "live",
    liveFallbackAllowed: true,
    satellite: match ? {
      satelliteId: match.satelliteId || null,
      serviceId: match.serviceId || null,
      status: match.status || "unknown",
      physicalReceptionVerified: Boolean(match.physicalReceptionVerified),
      redistributionEnabled: Boolean(match.redistributionEnabled)
    } : null,
    castSat: {
      configured: Boolean(satelliteUrl),
      env: envName,
      url: satelliteUrl || null
    },
    source: satelliteUrl && preferSatellite ? {
      type: "hls",
      mode: "cast-sat",
      url: satelliteUrl
    } : null
  });
}

export const config = { path: "/api/source-resolve" };
