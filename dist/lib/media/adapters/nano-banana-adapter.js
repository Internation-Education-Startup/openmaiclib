const l = "gemini-2.5-flash-image", m = "https://generativelanguage.googleapis.com";
async function w(r, i) {
  var s, d, g;
  const c = r.baseUrl || m, h = r.model || l, t = await fetch(`${c}/v1beta/models/${h}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": r.apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: i.prompt }]
        }
      ],
      generationConfig: {
        responseModalities: ["IMAGE"]
      }
    })
  });
  if (!t.ok) {
    const e = await t.text();
    throw new Error(`Gemini image generation failed (${t.status}): ${e}`);
  }
  const n = await t.json();
  if (n.error)
    throw new Error(`Gemini error: ${n.error.code} - ${n.error.message}`);
  const a = (g = (d = (s = n.candidates) == null ? void 0 : s[0]) == null ? void 0 : d.content) == null ? void 0 : g.parts;
  if (!a || a.length === 0)
    throw new Error("Gemini returned empty response");
  const o = a.find((e) => e.inlineData);
  if (!(o != null && o.inlineData)) {
    const e = a.find((p) => p.text);
    throw new Error(`Gemini did not return an image. Response text: ${(e == null ? void 0 : e.text) || "none"}`);
  }
  return {
    base64: o.inlineData.data,
    width: i.width || 1024,
    height: i.height || 1024
  };
}
export {
  w as generateWithNanoBanana
};
//# sourceMappingURL=nano-banana-adapter.js.map
