import { promises as h } from "fs";
import w from "path";
import { createLogger as _ } from "../logger.js";
import { CLASSROOMS_DIR as k } from "./classroom-storage.js";
import { IMAGE_PROVIDERS as V, generateImage as j } from "../media/image-providers.js";
import { VIDEO_PROVIDERS as L, normalizeVideoOptions as M, generateVideo as B } from "../media/video-providers.js";
import { generateTTS as F } from "../audio/tts-providers.js";
import { TTS_PROVIDERS as P, DEFAULT_TTS_VOICES as x, DEFAULT_TTS_MODELS as N } from "../audio/constants.js";
import { isMediaPlaceholder as K } from "../store/media-generation.js";
import { getServerImageProviders as q, getServerVideoProviders as G, getServerTTSProviders as C, resolveTTSApiKey as z, resolveTTSBaseUrl as W, resolveImageApiKey as X, resolveImageBaseUrl as Z, resolveVideoApiKey as H, resolveVideoBaseUrl as J } from "./provider-config.js";
import { splitLongSpeechActions as Q } from "../audio/tts-utils.js";
const l = _("ClassroomMedia");
async function U(c) {
  await h.mkdir(c, { recursive: !0 });
}
const Y = 12e4, R = 100 * 1024 * 1024;
async function E(c) {
  const r = await fetch(c, { signal: AbortSignal.timeout(Y) });
  if (!r.ok) throw new Error(`Download failed: ${r.status} ${r.statusText}`);
  const i = Number(r.headers.get("content-length") || 0);
  if (i > R)
    throw new Error(`File too large: ${i} bytes (max ${R})`);
  return Buffer.from(await r.arrayBuffer());
}
function A(c, r, i) {
  return `${c}/api/classroom-media/${r}/${i}`;
}
async function fe(c, r, i) {
  const f = w.join(k, r, "media");
  await U(f);
  const d = c.flatMap((n) => n.mediaGenerations ?? []);
  if (d.length === 0) return {};
  const t = Object.keys(q()), I = Object.keys(G()), T = {}, O = d.filter((n) => n.type === "image" && t.length > 0), b = d.filter((n) => n.type === "video" && I.length > 0), S = async () => {
    var n, a;
    for (const o of O)
      try {
        const e = t[0], m = X(e);
        if (!m) {
          l.warn(`No API key for image provider "${e}", skipping ${o.elementId}`);
          continue;
        }
        const s = V[e], p = (a = (n = s == null ? void 0 : s.models) == null ? void 0 : n[0]) == null ? void 0 : a.id, u = await j(
          { providerId: e, apiKey: m, baseUrl: Z(e), model: p },
          { prompt: o.prompt, aspectRatio: o.aspectRatio || "16:9" }
        );
        let y, v;
        if (u.base64)
          y = Buffer.from(u.base64, "base64"), v = "png";
        else if (u.url) {
          y = await E(u.url);
          const D = w.extname(new URL(u.url).pathname).replace(".", "");
          v = ["png", "jpg", "jpeg", "webp"].includes(D) ? D : "png";
        } else {
          l.warn(`Image generation returned no data for ${o.elementId}`);
          continue;
        }
        const g = `${o.elementId}.${v}`;
        await h.writeFile(w.join(f, g), y), T[o.elementId] = A(i, r, `media/${g}`), l.info(`Generated image: ${g}`);
      } catch (e) {
        l.warn(`Image generation failed for ${o.elementId}:`, e);
      }
  }, $ = async () => {
    var n, a;
    for (const o of b)
      try {
        const e = I[0], m = H(e);
        if (!m) {
          l.warn(`No API key for video provider "${e}", skipping ${o.elementId}`);
          continue;
        }
        const s = L[e], p = (a = (n = s == null ? void 0 : s.models) == null ? void 0 : n[0]) == null ? void 0 : a.id, u = M(e, {
          prompt: o.prompt,
          aspectRatio: o.aspectRatio || "16:9"
        }), y = await B(
          { providerId: e, apiKey: m, baseUrl: J(e), model: p },
          u
        ), v = await E(y.url), g = `${o.elementId}.mp4`;
        await h.writeFile(w.join(f, g), v), T[o.elementId] = A(i, r, `media/${g}`), l.info(`Generated video: ${g}`);
      } catch (e) {
        l.warn(`Video generation failed for ${o.elementId}:`, e);
      }
  };
  return await Promise.all([S(), $()]), T;
}
function me(c, r) {
  var i;
  if (Object.keys(r).length !== 0)
    for (const f of c) {
      if (f.type !== "slide") continue;
      const d = (i = f.content) == null ? void 0 : i.canvas;
      if (d != null && d.elements)
        for (const t of d.elements)
          (t.type === "image" || t.type === "video") && typeof t.src == "string" && K(t.src) && r[t.src] && (t.src = r[t.src]);
    }
}
async function pe(c, r, i) {
  var S, $, n;
  const f = w.join(k, r, "audio");
  await U(f);
  const d = Object.keys(C()).filter(
    (a) => a !== "browser-native-tts"
  );
  if (d.length === 0) {
    l.warn("No server TTS provider configured, skipping TTS generation");
    return;
  }
  const t = d[0], I = z(t);
  if (!I) {
    l.warn(`No API key for TTS provider "${t}", skipping TTS generation`);
    return;
  }
  const T = W(t) || ((S = P[t]) == null ? void 0 : S.defaultBaseUrl), O = x[t] || "default", b = ((n = ($ = P[t]) == null ? void 0 : $.supportedFormats) == null ? void 0 : n[0]) || "mp3";
  for (const a of c)
    if (a.actions) {
      a.actions = Q(a.actions, t);
      for (const o of a.actions) {
        if (o.type !== "speech" || !o.text) continue;
        const e = o, m = `tts_${o.id}`;
        try {
          const s = await F(
            {
              providerId: t,
              modelId: N[t] || "",
              apiKey: I,
              baseUrl: T,
              voice: O,
              speed: e.speed
            },
            e.text
          ), p = `${m}.${b}`;
          await h.writeFile(w.join(f, p), s.audio), e.audioId = m, e.audioUrl = A(i, r, `audio/${p}`), l.info(`Generated TTS: ${p} (${s.audio.length} bytes)`);
        } catch (s) {
          l.warn(`TTS generation failed for action ${o.id}:`, s);
        }
      }
    }
}
export {
  fe as generateMediaForClassroom,
  pe as generateTTSForClassroom,
  me as replaceMediaPlaceholders
};
//# sourceMappingURL=classroom-media-generation.js.map
