const SEARCH_ENDPOINT = "https://html.duckduckgo.com/html/";
const MAX_RESULTS = 8;

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

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function safeResultUrl(raw) {
  try {
    const url = new URL(decodeHtml(raw));
    if (!["https:", "http:"].includes(url.protocol)) return null;
    if (url.username || url.password) return null;
    if (/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(url.hostname)) return null;
    if (url.hostname.endsWith(".local") || url.hostname.endsWith(".internal")) return null;
    return url.href;
  } catch {
    return null;
  }
}

function extractResults(html) {
  const results = [];
  const blocks = html.split(/<div class="result[^"]*"/i).slice(1);
  for (const block of blocks) {
    if (results.length >= MAX_RESULTS) break;
    const link = block.match(/<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!link) continue;
    let href = decodeHtml(link[1]);
    try {
      const parsed = new URL(href, SEARCH_ENDPOINT);
      if (parsed.hostname.includes("duckduckgo.com") && parsed.searchParams.has("uddg")) {
        href = decodeURIComponent(parsed.searchParams.get("uddg"));
      }
    } catch {}
    href = safeResultUrl(href);
    if (!href) continue;
    const title = decodeHtml(link[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>|class="result__snippet"[^>]*>([\s\S]*?)<\/td>/i)
      || block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\//i);
    const snippet = decodeHtml((snippetMatch?.[1] || snippetMatch?.[2] || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (title && !results.some((item) => item.url === href)) {
      results.push({ title, url: href, snippet, verification: "À vérifier", reachable: null });
    }
  }
  return results;
}

async function searchBrave(query, apiKey) {
  const endpoint = "https://api.search.brave.com/res/v1/web/search";
  const response = await fetch(endpoint + "?q=" + encodeURIComponent(query) + "&count=" + MAX_RESULTS + "&country=fr&search_lang=fr", {
    headers: { "Accept": "application/json", "X-Subscription-Token": apiKey },
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error("BRAVE_HTTP_" + response.status);
  const payload = await response.json();
  return (Array.isArray(payload.web?.results) ? payload.web.results : [])
    .map((item) => {
      const safeUrl = safeResultUrl(item.url || "");
      return safeUrl ? { title: String(item.title || "").slice(0, 240), url: safeUrl, snippet: String(item.description || "").slice(0, 600), verification: "À vérifier", reachable: null } : null;
    })
    .filter((item, index, all) => item && item.title && all.findIndex((other) => other?.url === item.url) === index)
    .slice(0, MAX_RESULTS);
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "METHOD_NOT_ALLOWED" }, 405);
  }

  const url = new URL(request.url);
  const name = (url.searchParams.get("name") || "").trim().slice(0, 100);
  if (name.length < 2) return json({ error: "CHANNEL_NAME_REQUIRED" }, 400);

  const query = '"' + name + '" (site officiel OR direct OR live OR livestream)';
  try {
    const apiKey = typeof Netlify !== "undefined" ? Netlify.env.get("BRAVE_SEARCH_API_KEY") : undefined;
    let results;
    let provider;
    if (apiKey) {
      results = await searchBrave(query, apiKey);
      provider = "Brave Search API";
    } else {
      const response = await fetch(SEARCH_ENDPOINT + "?q=" + encodeURIComponent(query) + "&kl=fr-fr", {
        headers: { "user-agent": "Mozilla/5.0 (compatible; StreamLiveSourceFinder/1.0)", "accept": "text/html" },
        signal: AbortSignal.timeout(8000),
        redirect: "follow"
      });
      if (!response.ok) return json({ error: "SEARCH_PROVIDER_UNAVAILABLE", message: "Le moteur de recherche a répondu HTTP " + response.status }, 502);
      results = extractResults(await response.text());
      provider = "DuckDuckGo HTML (secours, disponibilité non garantie)";
    }
    return json({
      query: name + " source officielle direct live",
      provider,
      count: results.length,
      results,
      notice: "Les résultats sont des pistes de recherche. Ni le caractère officiel, ni la disponibilité, ni le droit de retransmission ne sont confirmés automatiquement. Ne les ajoutez pas au catalogue avant vérification."
    });
  } catch (error) {
    return json({
      error: "SOURCE_SEARCH_FAILED",
      message: "La recherche automatique est temporairement indisponible.",
      detail: error?.name === "TimeoutError" ? "SEARCH_TIMEOUT" : "SEARCH_NETWORK_ERROR"
    }, 502);
  }
}

export const config = { path: "/api/source-discovery", rateLimit: { action: "rate_limit", aggregateBy: "ip", windowSize: 60, windowLimit: 20 } };
