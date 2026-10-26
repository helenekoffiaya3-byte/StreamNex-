const plans = { test: { amount: 0.10 }, basic: { amount: 3.99 }, standard: { amount: 6.99 } };

export default async (request, context) => {
  const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const secret = Netlify.env.get("FLW_SECRET_KEY");
  if (!secret) return json({ error: "Flutterwave is not configured. Add FLW_SECRET_KEY in Netlify environment variables." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request" }, 400); }
  const plan = plans[String(body.plan || "")];
  const email = String(body.email || "").trim().toLowerCase();
  if (!plan) return json({ error: "Unknown plan" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Invalid email" }, 400);
  const txRef = "sn-" + String(body.plan) + "-" + crypto.randomUUID();
  const siteUrl = (Netlify.env.get("STREAMNEX_SITE_URL") || context.site?.url || new URL(request.url).origin).replace(/\/$/, "");
  const payload = { tx_ref: txRef, amount: plan.amount.toFixed(2), currency: "EUR", redirect_url: siteUrl + "/?payment=return", payment_options: "card", customer: { email }, customizations: { title: "StreamNex", description: "StreamNex subscription" } };
  let response;
  try {
    response = await fetch("https://api.flutterwave.com/v3/payments", { method: "POST", headers: { Authorization: "Bearer " + secret, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch { return json({ error: "Flutterwave is temporarily unavailable" }, 502); }
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.status !== "success" || !result.data?.link) return json({ error: "Flutterwave could not create the payment session" }, 502);
  return json({ checkoutUrl: result.data.link, tx_ref: txRef });
};