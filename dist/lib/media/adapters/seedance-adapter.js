const u = "doubao-seedance-1-5-pro-251215", d = "https://ark.cn-beijing.volces.com";
function h(e) {
  if (e)
    return e;
}
function w(e) {
  if (e)
    return e;
}
function l(e, r) {
  const t = {
    "480p": 480,
    "720p": 720,
    "1080p": 1080
  }[r || "720p"] || 720;
  if (!e) return { width: Math.round(t * 16 / 9), height: t };
  const [n, o] = e.split(":").map(Number);
  return !n || !o ? { width: Math.round(t * 16 / 9), height: t } : { width: Math.round(t * n / o), height: t };
}
async function f(e, r) {
  const a = e.baseUrl || d, t = {
    model: e.model || u,
    content: [
      {
        type: "text",
        text: r.prompt
      }
    ],
    watermark: !1
  }, n = h(r.aspectRatio);
  n && (t.ratio = n), r.duration && (t.duration = r.duration);
  const o = w(r.resolution);
  o && (t.resolution = o);
  const i = await fetch(`${a}/api/v3/contents/generations/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${e.apiKey}`
    },
    body: JSON.stringify(t)
  });
  if (!i.ok) {
    const c = await i.text();
    throw new Error(`Seedance task submission failed (${i.status}): ${c}`);
  }
  const s = await i.json();
  if (!s.id)
    throw new Error("Seedance returned empty task ID");
  return s.id;
}
async function p(e, r) {
  var o, i;
  const a = e.baseUrl || d, t = await fetch(`${a}/api/v3/contents/generations/tasks/${r}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${e.apiKey}`
    }
  });
  if (!t.ok) {
    const s = await t.text();
    throw new Error(`Seedance poll failed (${t.status}): ${s}`);
  }
  const n = await t.json();
  if (n.status === "succeeded") {
    if (!((o = n.content) != null && o.video_url))
      throw new Error("Seedance task succeeded but no video URL returned");
    const s = l(n.ratio, n.resolution);
    return {
      url: n.content.video_url,
      duration: n.duration || 5,
      width: s.width,
      height: s.height
    };
  }
  if (n.status === "failed")
    throw new Error(`Seedance video generation failed: ${((i = n.error) == null ? void 0 : i.message) || "Unknown error"}`);
  return null;
}
async function m(e, r) {
  const a = await f(e, r);
  for (let t = 0; t < 60; t++) {
    await new Promise((o) => setTimeout(o, 5e3));
    const n = await p(e, a);
    if (n) return n;
  }
  throw new Error(
    `Seedance video generation timed out after ${60 * 5e3 / 1e3}s (task: ${a})`
  );
}
export {
  m as generateWithSeedance,
  p as pollSeedanceTask,
  f as submitSeedanceTask
};
//# sourceMappingURL=seedance-adapter.js.map
