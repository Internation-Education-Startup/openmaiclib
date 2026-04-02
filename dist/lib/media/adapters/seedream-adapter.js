const s = "doubao-seedream-5-0-260128", d = "https://ark.cn-beijing.volces.com";
function c(e) {
  if (e.width && e.height) {
    const t = e.width * e.height;
    if (t < 3686400) {
      const a = Math.ceil(Math.sqrt(3686400 / t));
      return `${e.width * a}x${e.height * a}`;
    }
    return `${e.width}x${e.height}`;
  }
  return "2K";
}
async function m(e, t) {
  var h;
  const a = e.baseUrl || d, r = await fetch(`${a}/api/v3/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${e.apiKey}`
    },
    body: JSON.stringify({
      model: e.model || s,
      prompt: t.prompt,
      size: c(t),
      watermark: !1
    })
  });
  if (!r.ok) {
    const n = await r.text();
    throw new Error(`Seedream generation failed (${r.status}): ${n}`);
  }
  const i = (h = (await r.json()).data) == null ? void 0 : h[0];
  if (!i)
    throw new Error("Seedream returned empty response");
  return {
    url: i.url,
    base64: i.b64_json,
    width: t.width || 1024,
    height: t.height || 1024
  };
}
export {
  m as generateWithSeedream
};
//# sourceMappingURL=seedream-adapter.js.map
