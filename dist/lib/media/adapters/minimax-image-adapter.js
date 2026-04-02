const w = "https://api.minimaxi.com";
async function d(i, r) {
  var h, p, g;
  const l = (i.baseUrl || w).replace(/\/$/, ""), u = i.model || "image-01", c = r.aspectRatio || "1:1", a = await fetch(`${l}/v1/image_generation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${i.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: u,
      prompt: r.prompt,
      negative_prompt: r.negativePrompt,
      aspect_ratio: c,
      response_format: "url",
      n: 1,
      prompt_optimizer: !1
    })
  });
  if (!a.ok) {
    const t = await a.text().catch(() => a.statusText);
    throw new Error(`MiniMax Image API error: ${t}`);
  }
  const e = await a.json();
  if (((h = e == null ? void 0 : e.base_resp) == null ? void 0 : h.status_code) !== 0 && ((p = e == null ? void 0 : e.base_resp) == null ? void 0 : p.status_code) !== void 0) {
    const t = e.base_resp.status_code, s = e.base_resp.status_msg || "unknown error";
    throw new Error(`MiniMax Image API error ${t}: ${s}`);
  }
  const o = (g = e == null ? void 0 : e.data) == null ? void 0 : g.image_urls;
  if (!o || o.length === 0)
    throw new Error(`MiniMax Image: no image URLs returned. Response: ${JSON.stringify(e)}`);
  const _ = o[0];
  let n = r.width || 1024, m = r.height || 1024;
  if (!r.width && !r.height) {
    const [t, s] = c.split(":").map(Number);
    t && s && (t > s ? (n = 1024, m = Math.round(1024 * s / t)) : (m = 1024, n = Math.round(1024 * t / s)));
  }
  return {
    url: _,
    width: n,
    height: m
  };
}
export {
  d as generateWithMiniMaxImage
};
//# sourceMappingURL=minimax-image-adapter.js.map
