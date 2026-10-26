import { createHmac, timingSafeEqual } from "node:crypto";

const sign = (value, secret) => createHmac("sha256", secret).update(value).digest("base64url");
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export default async (request) => {
  if (request.method !== "GET") return json({ active: false, error: "Méthode non autorisée." }, 405);
  const secret = Netlify.env.get("STREAMNEX_SESSION_SECRET");
  if (!secret) return json({ active: false, error: "Session non configurée." }, 503);
  const rawCookie = request.headers.get("cookie") || "";
  const found = rawCookie.split(";").map(x => x.trim()).find(x => x.startsWith("streamnex_session="));
  if (!found) return json({ active: false }, 401);
  const value = found.slice("streamnex_session=".length);
  const splitAt = value.lastIndexOf(".");
  if (splitAt < 1) return json({ active: false }, 401);
  const payload = value.slice(0, splitAt);
  const signature = value.slice(splitAt + 1);
  const expected = sign(payload, secret);
  const a = Buffer.from(signature), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return json({ active: false }, 401);
  let data;
  try { data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")); } catch { return json({ active: false }, 401); }
  if (!data.email || !Number.isFinite(data.expiresAt) || data.expiresAt <= Date.now()) {
    return json({ active: false }, 401);
  }
  return json({ active: true, plan: data.plan, email: data.email, expiresAt: new Date(data.expiresAt).toISOString() });
};
