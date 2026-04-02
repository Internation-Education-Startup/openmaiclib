const s = "grok-imagine-image", h = "https://api.x.ai/v1";
async function p(t, a) {
  var o;
  const n = t.baseUrl || h, e = await fetch(`${n}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t.apiKey}`
    },
    body: JSON.stringify({
      model: t.model || s,
      prompt: a.prompt,
      n: 1,
      response_format: "url"
    })
  });
  if (!e.ok) {
    const i = await e.text();
    throw new Error(`Grok image generation failed (${e.status}): ${i}`);
  }
  const r = (o = (await e.json()).data) == null ? void 0 : o[0];
  if (!r)
    throw new Error("Grok returned empty image response");
  return {
    url: r.url,
    base64: r.b64_json,
    width: a.width || 1024,
    height: a.height || 1024
  };
}
export {
  p as generateWithGrokImage
};
//# sourceMappingURL=grok-image-adapter.js.map
