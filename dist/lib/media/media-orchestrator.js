import { useMediaGenerationStore as m } from "../store/media-generation.js";
import { useSettingsStore as u } from "../store/settings.js";
import { mediaFileKey as y, db as g } from "../utils/database.js";
import { createLogger as b } from "../logger.js";
const v = b("MediaOrchestrator");
class l extends Error {
  constructor(s, e) {
    super(s), this.errorCode = e;
  }
}
async function P(t, s, e) {
  const r = u.getState(), a = m.getState(), o = [];
  for (const i of t)
    if (i.mediaGenerations)
      for (const c of i.mediaGenerations) {
        if (c.type === "image" && !r.imageGenerationEnabled || c.type === "video" && !r.videoGenerationEnabled) continue;
        const n = a.getTask(c.elementId);
        (n == null ? void 0 : n.status) === "done" || (n == null ? void 0 : n.status) === "failed" || o.push(c);
      }
  if (o.length !== 0) {
    m.getState().enqueueTasks(s, o);
    for (const i of o) {
      if (e != null && e.aborted) break;
      await w(i, s, e);
    }
  }
}
async function j(t) {
  const s = m.getState(), e = s.getTask(t);
  if (!e || e.status !== "failed") return;
  const r = u.getState();
  if (e.type === "image" && !r.imageGenerationEnabled) {
    s.markFailed(t, "Generation disabled", "GENERATION_DISABLED");
    return;
  }
  if (e.type === "video" && !r.videoGenerationEnabled) {
    s.markFailed(t, "Generation disabled", "GENERATION_DISABLED");
    return;
  }
  const a = y(e.stageId, t);
  await g.mediaFiles.delete(a).catch(() => {
  }), s.markPendingForRetry(t), await w(
    {
      type: e.type,
      prompt: e.prompt,
      elementId: e.elementId,
      aspectRatio: e.params.aspectRatio,
      style: e.params.style
    },
    e.stageId
  );
}
async function w(t, s, e) {
  m.getState().markGenerating(t.elementId);
  try {
    let a, o, i;
    if (t.type === "image")
      a = (await R(t, e)).url, i = "image/png";
    else {
      const f = await k(t, e);
      a = f.url, o = f.poster, i = "video/mp4";
    }
    if (e != null && e.aborted) return;
    const c = await h(a), n = o ? await h(o).catch(() => {
    }) : void 0;
    await g.mediaFiles.put({
      id: y(s, t.elementId),
      stageId: s,
      type: t.type,
      blob: c,
      mimeType: i,
      size: c.size,
      poster: n,
      prompt: t.prompt,
      params: JSON.stringify({
        aspectRatio: t.aspectRatio,
        style: t.style
      }),
      createdAt: Date.now()
    });
    const d = URL.createObjectURL(c), p = n ? URL.createObjectURL(n) : void 0;
    m.getState().markDone(t.elementId, d, p);
  } catch (a) {
    if (e != null && e.aborted) return;
    const o = a instanceof Error ? a.message : String(a), i = a instanceof l ? a.errorCode : void 0;
    v.error(`Failed ${t.elementId}:`, o), m.getState().markFailed(t.elementId, o, i), i && await g.mediaFiles.put({
      id: y(s, t.elementId),
      stageId: s,
      type: t.type,
      blob: new Blob(),
      // empty placeholder
      mimeType: t.type === "image" ? "image/png" : "video/mp4",
      size: 0,
      prompt: t.prompt,
      params: JSON.stringify({
        aspectRatio: t.aspectRatio,
        style: t.style
      }),
      error: o,
      errorCode: i,
      createdAt: Date.now()
    }).catch(() => {
    });
  }
}
async function R(t, s) {
  var c, n, d;
  const e = u.getState(), r = (c = e.imageProvidersConfig) == null ? void 0 : c[e.imageProviderId], a = await fetch("/api/generate/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-image-provider": e.imageProviderId || "",
      "x-image-model": e.imageModelId || "",
      "x-api-key": (r == null ? void 0 : r.apiKey) || "",
      "x-base-url": (r == null ? void 0 : r.baseUrl) || ""
    },
    body: JSON.stringify({
      prompt: t.prompt,
      aspectRatio: t.aspectRatio,
      style: t.style
    }),
    signal: s
  });
  if (!a.ok) {
    const p = await a.json().catch(() => ({}));
    throw new l(p.error || `Image API returned ${a.status}`, p.errorCode);
  }
  const o = await a.json();
  if (!o.success)
    throw new l(o.error || "Image generation failed", o.errorCode);
  const i = ((n = o.result) == null ? void 0 : n.url) || ((d = o.result) != null && d.base64 ? `data:image/png;base64,${o.result.base64}` : "");
  if (!i) throw new Error("No image URL in response");
  return { url: i };
}
async function k(t, s) {
  var c, n, d;
  const e = u.getState(), r = (c = e.videoProvidersConfig) == null ? void 0 : c[e.videoProviderId], a = await fetch("/api/generate/video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-video-provider": e.videoProviderId || "",
      "x-video-model": e.videoModelId || "",
      "x-api-key": (r == null ? void 0 : r.apiKey) || "",
      "x-base-url": (r == null ? void 0 : r.baseUrl) || ""
    },
    body: JSON.stringify({
      prompt: t.prompt,
      aspectRatio: t.aspectRatio
    }),
    signal: s
  });
  if (!a.ok) {
    const p = await a.json().catch(() => ({}));
    throw new l(p.error || `Video API returned ${a.status}`, p.errorCode);
  }
  const o = await a.json();
  if (!o.success)
    throw new l(o.error || "Video generation failed", o.errorCode);
  const i = (n = o.result) == null ? void 0 : n.url;
  if (!i) throw new Error("No video URL in response");
  return { url: i, poster: (d = o.result) == null ? void 0 : d.poster };
}
async function h(t) {
  if (t.startsWith("data:"))
    return (await fetch(t)).blob();
  if (t.startsWith("http://") || t.startsWith("https://")) {
    const e = await fetch("/api/proxy-media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: t })
    });
    if (!e.ok) {
      const r = await e.json().catch(() => ({}));
      throw new Error(r.error || `Proxy fetch failed: ${e.status}`);
    }
    return e.blob();
  }
  const s = await fetch(t);
  if (!s.ok) throw new Error(`Failed to fetch blob: ${s.status}`);
  return s.blob();
}
export {
  P as generateMediaForOutlines,
  j as retryMediaTask
};
//# sourceMappingURL=media-orchestrator.js.map
