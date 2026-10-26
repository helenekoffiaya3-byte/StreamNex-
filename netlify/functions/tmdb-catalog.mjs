const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "public, max-age=300" } });

export default async (request) => {
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
  const key = Netlify.env.get("TMDB_API_KEY");
  if (!key) return json({ error: "TMDB_API_KEY is not configured" }, 503);
  const url = new URL(request.url);
  const type = url.searchParams.get("type") === "tv" ? "tv" : "movie";
  const category = url.searchParams.get("category") || "popular";
  const query = (url.searchParams.get("query") || "").trim().slice(0, 120);
  let path;
  if (category === "search" && query) path = "/search/" + type;
  else if (category === "trending") path = "/trending/" + type + "/day";
  else if (category === "action" && type === "movie") path = "/discover/movie";
  else path = "/" + type + "/popular";
  const params = new URLSearchParams({ api_key: key, language: "fr-FR", page: "1" });
  if (category === "search" && query) params.set("query", query);
  if (category === "action" && type === "movie") params.set("with_genres", "28");
  let response;
  try { response = await fetch("https://api.themoviedb.org/3" + path + "?" + params.toString()); }
  catch { return json({ error: "TMDB is temporarily unavailable" }, 502); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) return json({ error: "TMDB request failed" }, 502);
  return json({ results: Array.isArray(data.results) ? data.results.slice(0, 20) : [] });
};