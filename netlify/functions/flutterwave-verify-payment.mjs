import { createHmac, randomUUID } from "node:crypto";

const plans = { test: { amount: 0.10, days: 1 }, basic: { amount: 3.99, days: 30 }, standard: { amount: 6.99, days: 30 } };
const sign = (value, secret) => createHmac("sha256", secret).update(value).digest("base64url");

export default async (request) => {
  const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const apiSecret = Netlify.env.get("FLW_SECRET_KEY");
  const sessionSecret = Netlify.env.get("STREAMNEX_SESSION_SECRET");
  if (!apiSecret || !sessionSecret) return json({ error: "Secure payment configuration is incomplete" }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const id = String(body.transaction_id || "");
  const txRef = String(body.tx_ref || "");
  const match = /^sn-(test|basic|standard)-[0-9a-f-]{36}$/i.exec(txRef);
  if (!/^\d+$/.test(id) || !match) return json({ error: "Invalid payment reference" }, 400);
  const planId = match[1].toLowerCase(), plan = plans[match[1].toLowerCase()];
  let response;
  try {
    response = await fetch("https://api.flutterwave.com/v3/transactions/" + encodeURIComponent(id) + "/verify", { headers: { Authorization: "Bearer " + apiSecret } });
  } catch { return json({ error: "Could not reach Flutterwave for verification" }, 502); }
  const result = await response.json().catch(() => ({})), payment = result.data;
  const amountMatches = payment && Math.round(Number(payment.amount) * 100) === Math.round(plan.amount * 100);
  if (!response.ok || result.status !== "success" || payment?.status !== "successful" || payment?.tx_ref !== txRef || String(payment?.currency || "").toUpperCase() !== "EUR" || !amountMatches) {
    return json({ error: "Flutterwave did not confirm the matching payment. Access was not enabled." }, 402);
  }
  const email = String(payment.customer?.email || "").trim().toLowerCase();
  if (!email) return json({ error: "The verified transaction has no customer email" }, 400);
  const paidAt = new Date(payment["created_at"]).getTime();
  if (!Number.isFinite(paidAt) || paidAt > Date.now() + 300000) return json({ error: "Invalid payment timestamp" }, 402);
  const expiresAt = paidAt + plan.days * 86400000;
  if (expiresAt <= Date.now()) return json({ error: "Subscription payment has expired" }, 402);
  const payload = Buffer.from(JSON.stringify({ email, plan: planId, expiresAt, nonce: randomUUID() })).toString("base64url");
  const value = payload + "." + sign(payload, sessionSecret);
  const cookie = "streamnex_session=" + value + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=" + Math.floor((expiresAt - Date.now()) / 1000);
  return json({ active: true, plan: planId, expiresAt: new Date(expiresAt).toISOString() }, 200, { "Set-Cookie": cookie });
};