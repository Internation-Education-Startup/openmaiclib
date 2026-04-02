const m = "veo-3.0-generate-001", f = "https://generativelanguage.googleapis.com";
function g(t) {
  return new Promise((r) => setTimeout(r, t));
}
function y(t) {
  switch (t) {
    case "9:16":
      return { width: 720, height: 1280 };
    case "1:1":
      return { width: 1080, height: 1080 };
    case "4:3":
      return { width: 1024, height: 768 };
    default:
      return { width: 1280, height: 720 };
  }
}
function u(t) {
  return {
    "Content-Type": "application/json",
    "x-goog-api-key": t
  };
}
async function E(t, r, i, o) {
  const s = `${t}/v1beta/models/${i}:predictLongRunning`, e = {
    instances: [{ prompt: o.prompt }]
  }, n = {};
  o.aspectRatio && (n.aspectRatio = o.aspectRatio), o.duration && (n.durationSeconds = o.duration), Object.keys(n).length > 0 && (e.parameters = n);
  const a = await fetch(s, {
    method: "POST",
    headers: u(r),
    body: JSON.stringify(e)
  });
  if (!a.ok) {
    const d = await a.text();
    throw new Error(`Veo submit failed (${a.status}): ${d}`);
  }
  return a.json();
}
async function T(t, r, i, o) {
  const s = `${t}/v1beta/models/${i}:fetchPredictOperation`, e = await fetch(s, {
    method: "POST",
    headers: u(r),
    body: JSON.stringify({ operationName: o })
  });
  if (!e.ok) {
    const n = await e.text();
    throw new Error(`Veo poll failed (${e.status}): ${n}`);
  }
  return e.json();
}
async function L(t, r) {
  var c;
  const i = t.model || m, o = t.baseUrl || f, s = await E(o, t.apiKey, i, r);
  if (!s.name)
    throw new Error("Veo returned operation without name");
  let e = s, n = 0;
  for (; !e.done; ) {
    if (n >= 60)
      throw new Error("Veo video generation timed out after 10 minutes");
    await g(1e4), e = await T(o, t.apiKey, i, e.name), n++;
  }
  if (e.error)
    throw new Error(`Veo generation failed: ${e.error.code} - ${e.error.message}`);
  const a = (c = e.response) == null ? void 0 : c.videos;
  if (!a || a.length === 0)
    throw new Error("Veo returned no generated videos");
  const d = a[0];
  if (!d.bytesBase64Encoded)
    throw new Error("Veo returned video entry without data");
  const h = d.bytesBase64Encoded, w = d.mimeType || "video/mp4", { width: l, height: p } = y(r.aspectRatio);
  return {
    url: `data:${w};base64,${h}`,
    duration: r.duration || 8,
    width: l,
    height: p
  };
}
export {
  L as generateWithVeo
};
//# sourceMappingURL=veo-adapter.js.map
