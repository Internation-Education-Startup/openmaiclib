const c = "grok-imagine-video", w = "https://api.x.ai/v1";
function f(t) {
  return new Promise((r) => setTimeout(r, t));
}
function l(t) {
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
function d(t) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${t}`
  };
}
async function L(t, r, a, e) {
  const i = {
    model: a,
    prompt: e.prompt
  };
  e.duration && (i.duration = e.duration);
  const n = await fetch(`${t}/videos/generations`, {
    method: "POST",
    headers: d(r),
    body: JSON.stringify(i)
  });
  if (!n.ok) {
    const o = await n.text();
    throw new Error(`Grok video submit failed (${n.status}): ${o}`);
  }
  const s = await n.json();
  if (!s.request_id)
    throw new Error("Grok video returned empty request_id");
  return s.request_id;
}
async function T(t, r, a) {
  const e = await fetch(`${t}/videos/${a}`, {
    method: "GET",
    headers: d(r)
  });
  if (!e.ok) {
    const i = await e.text();
    throw new Error(`Grok video poll failed (${e.status}): ${i}`);
  }
  return e.json();
}
async function _(t, r) {
  var n;
  const a = t.model || c, e = t.baseUrl || w, i = await L(e, t.apiKey, a, r);
  for (let s = 0; s < 60; s++) {
    await f(1e4);
    const o = await T(e, t.apiKey, i);
    if (o.status === "done") {
      if (!((n = o.video) != null && n.url))
        throw new Error("Grok video task completed but no video URL returned");
      const { width: u, height: h } = l(r.aspectRatio);
      return {
        url: o.video.url,
        duration: o.video.duration || r.duration || 6,
        width: u,
        height: h
      };
    }
    if (o.status === "failed")
      throw new Error(`Grok video generation failed: ${JSON.stringify(o)}`);
  }
  throw new Error(
    `Grok video generation timed out after ${60 * 1e4 / 1e3}s (request: ${i})`
  );
}
export {
  _ as generateWithGrokVideo
};
//# sourceMappingURL=grok-video-adapter.js.map
