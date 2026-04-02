const w = "qwen-image-max", d = "https://dashscope.aliyuncs.com";
function p(t) {
  const e = t.width || 1024, s = t.height || 576;
  return `${e}*${s}`;
}
async function u(t, e) {
  var c, h, g;
  const s = t.baseUrl || d, a = await fetch(`${s}/api/v1/services/aigc/multimodal-generation/generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t.apiKey}`
    },
    body: JSON.stringify({
      model: t.model || w,
      input: {
        messages: [
          {
            role: "user",
            content: [
              {
                text: e.prompt
              }
            ]
          }
        ]
      },
      parameters: {
        negative_prompt: e.negativePrompt || void 0,
        prompt_extend: !0,
        watermark: !1,
        size: p(e)
      }
    })
  });
  if (!a.ok) {
    const m = await a.text();
    throw new Error(`Qwen Image generation failed (${a.status}): ${m}`);
  }
  const r = await a.json(), o = (c = r.output) == null ? void 0 : c.choices;
  if (!o || o.length === 0)
    throw r.code || r.message ? new Error(`Qwen Image error: ${r.code} - ${r.message}`) : new Error("Qwen Image returned empty response");
  const i = (g = (h = o[0]) == null ? void 0 : h.message) == null ? void 0 : g.content, n = i == null ? void 0 : i.find((m) => m.image);
  if (!(n != null && n.image))
    throw new Error("Qwen Image response missing image URL");
  return {
    url: n.image,
    width: e.width || 1024,
    height: e.height || 576
  };
}
export {
  u as generateWithQwenImage
};
//# sourceMappingURL=qwen-image-adapter.js.map
