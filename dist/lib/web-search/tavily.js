import { proxyFetch as u } from "../server/proxy-fetch.js";
const h = "https://api.tavily.com/search", p = 400;
async function y(t) {
  const { query: e, apiKey: r, maxResults: a = 5 } = t, c = e.slice(0, p), n = await u(h, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${r}`
    },
    body: JSON.stringify({
      query: c,
      search_depth: "basic",
      max_results: a,
      include_answer: "basic"
    })
  });
  if (!n.ok) {
    const s = await n.text().catch(() => "");
    throw new Error(`Tavily API error (${n.status}): ${s || n.statusText}`);
  }
  const o = await n.json(), i = (o.results || []).map((s) => ({
    title: s.title,
    url: s.url,
    content: s.content,
    score: s.score
  }));
  return {
    answer: o.answer || "",
    sources: i,
    query: o.query,
    responseTime: o.response_time
  };
}
function f(t) {
  if (!t.answer && t.sources.length === 0)
    return "";
  const e = [];
  if (t.answer && (e.push(t.answer), e.push("")), t.sources.length > 0) {
    e.push("Sources:");
    for (const r of t.sources)
      e.push(`- [${r.title}](${r.url}): ${r.content.slice(0, 200)}`);
  }
  return e.join(`
`);
}
export {
  f as formatSearchResultsAsContext,
  y as searchWithTavily
};
//# sourceMappingURL=tavily.js.map
