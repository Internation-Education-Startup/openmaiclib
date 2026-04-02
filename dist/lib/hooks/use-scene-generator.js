import { useRef as G, useCallback as M } from "react";
import { useStageStore as _ } from "../store/stage.js";
import { getCurrentModelConfig as z } from "../utils/model-config.js";
import { useSettingsStore as k } from "../store/settings.js";
import { db as Q } from "../utils/database.js";
import { splitLongSpeechActions as W } from "../audio/tts-utils.js";
import { generateMediaForOutlines as X } from "../media/media-orchestrator.js";
import { createLogger as Y } from "../logger.js";
const j = Y("SceneGenerator");
function V() {
  var c, u;
  const t = z(), a = k.getState(), r = (c = a.imageProvidersConfig) == null ? void 0 : c[a.imageProviderId], o = (u = a.videoProvidersConfig) == null ? void 0 : u[a.videoProviderId];
  return {
    "Content-Type": "application/json",
    "x-model": t.modelString || "",
    "x-api-key": t.apiKey || "",
    "x-base-url": t.baseUrl || "",
    "x-provider-type": t.providerType || "",
    "x-requires-api-key": String(t.requiresApiKey ?? !1),
    // Image generation provider
    "x-image-provider": a.imageProviderId || "",
    "x-image-model": a.imageModelId || "",
    "x-image-api-key": (r == null ? void 0 : r.apiKey) || "",
    "x-image-base-url": (r == null ? void 0 : r.baseUrl) || "",
    // Video generation provider
    "x-video-provider": a.videoProviderId || "",
    "x-video-model": a.videoModelId || "",
    "x-video-api-key": (o == null ? void 0 : o.apiKey) || "",
    "x-video-base-url": (o == null ? void 0 : o.baseUrl) || "",
    // Media generation toggles
    "x-image-generation-enabled": String(a.imageGenerationEnabled ?? !1),
    "x-video-generation-enabled": String(a.videoGenerationEnabled ?? !1)
  };
}
async function J(t, a) {
  const r = await fetch("/api/generate/scene-content", {
    method: "POST",
    headers: V(),
    body: JSON.stringify(t),
    signal: a
  });
  return r.ok ? r.json() : { success: !1, error: (await r.json().catch(() => ({ error: "Request failed" }))).error || `HTTP ${r.status}` };
}
async function L(t, a) {
  const r = await fetch("/api/generate/scene-actions", {
    method: "POST",
    headers: V(),
    body: JSON.stringify(t),
    signal: a
  });
  return r.ok ? r.json() : { success: !1, error: (await r.json().catch(() => ({ error: "Request failed" }))).error || `HTTP ${r.status}` };
}
async function Z(t, a, r) {
  var P;
  const o = k.getState();
  if (o.ttsProviderId === "browser-native-tts") return;
  const c = (P = o.ttsProvidersConfig) == null ? void 0 : P[o.ttsProviderId], u = await fetch("/api/generate/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: a,
      audioId: t,
      ttsProviderId: o.ttsProviderId,
      ttsModelId: c == null ? void 0 : c.modelId,
      ttsVoice: o.ttsVoice,
      ttsSpeed: o.ttsSpeed,
      ttsApiKey: (c == null ? void 0 : c.apiKey) || void 0,
      ttsBaseUrl: (c == null ? void 0 : c.baseUrl) || void 0
    }),
    signal: r
  }), i = await u.json().catch(() => ({ success: !1, error: u.statusText || "Invalid TTS response" }));
  if (!u.ok || !i.success || !i.base64 || !i.format) {
    const p = new Error(
      i.details || i.error || `TTS request failed: HTTP ${u.status}`
    );
    throw j.warn("TTS failed for", t, ":", p), p;
  }
  const e = atob(i.base64), O = new Uint8Array(e.length);
  for (let p = 0; p < e.length; p++)
    O[p] = e.charCodeAt(p);
  const K = new Blob([O], { type: `audio/${i.format}` });
  await Q.audioFiles.put({
    id: t,
    blob: K,
    format: i.format,
    createdAt: Date.now()
  });
}
async function N(t, a) {
  const r = k.getState().ttsProviderId;
  t.actions = W(t.actions || [], r);
  const o = t.actions.filter(
    (i) => i.type === "speech" && !!i.text
  );
  if (o.length === 0) return { success: !0, failedCount: 0 };
  let c = 0, u;
  for (const i of o) {
    const e = `tts_${i.id}`;
    i.audioId = e;
    try {
      await Z(e, i.text, a);
    } catch (O) {
      c++, u = O instanceof Error ? O.message : `TTS failed for action ${i.id}`, j.warn("TTS generation failed:", {
        providerId: r,
        actionId: i.id,
        textLength: i.text.length,
        error: u
      });
    }
  }
  return {
    success: c === 0,
    failedCount: c,
    error: u
  };
}
function ce(t = {}) {
  const a = G(!1), r = G(!1), o = G(null), c = G(null), u = G(null), i = G(null), e = _, O = M(
    async (d) => {
      var R, T, E, b, C, $, q, H;
      if (u.current = d, r.current) return;
      r.current = !0, a.current = !1;
      const f = (n) => {
        const s = e.getState().generatingOutlines;
        s.some((y) => y.id === n) && e.getState().setGeneratingOutlines(s.filter((y) => y.id !== n));
      };
      c.current = new AbortController();
      const g = c.current.signal, S = e.getState(), { outlines: w, scenes: I, stage: x } = S, m = S.generationEpoch;
      if (!x || w.length === 0) {
        r.current = !1;
        return;
      }
      e.getState().setGenerationStatus("generating");
      const F = new Set(I.map((n) => n.order)), l = w.filter((n) => !F.has(n.order)).sort((n, s) => n.order - s.order);
      if (l.length === 0) {
        e.getState().setGenerationStatus("completed"), e.getState().setGeneratingOutlines([]), (R = t.onComplete) == null || R.call(t), r.current = !1;
        return;
      }
      e.getState().setGeneratingOutlines(l), o.current = new AbortController(), X(w, x.id, o.current.signal).catch((n) => {
        j.warn("Media generation error:", n);
      });
      let h = [];
      const v = [...I].sort((n, s) => n.order - s.order);
      v.length > 0 && (h = (v[v.length - 1].actions || []).filter((s) => s.type === "speech").map((s) => s.text));
      try {
        let n = !1;
        for (const s of l) {
          if (a.current || e.getState().generationEpoch !== m) {
            e.getState().setGenerationStatus("paused"), n = !0;
            break;
          }
          e.getState().setCurrentGeneratingOrder(s.order), (T = t.onPhaseChange) == null || T.call(t, "content", s);
          const y = await J(
            {
              outline: s,
              allOutlines: w,
              stageId: x.id,
              pdfImages: d.pdfImages,
              imageMapping: d.imageMapping,
              stageInfo: d.stageInfo,
              agents: d.agents
            },
            g
          );
          if (!y.success || !y.content) {
            if (a.current || e.getState().generationEpoch !== m) {
              n = !0;
              break;
            }
            e.getState().addFailedOutline(s), (E = t.onSceneFailed) == null || E.call(t, s, y.error || "Content generation failed"), e.getState().setGenerationStatus("paused"), n = !0;
            break;
          }
          if (a.current || e.getState().generationEpoch !== m) {
            e.getState().setGenerationStatus("paused"), n = !0;
            break;
          }
          (b = t.onPhaseChange) == null || b.call(t, "actions", s);
          const A = await L(
            {
              outline: y.effectiveOutline || s,
              allOutlines: w,
              content: y.content,
              stageId: x.id,
              agents: d.agents,
              previousSpeeches: h,
              userProfile: d.userProfile
            },
            g
          );
          if (A.success && A.scene) {
            const U = A.scene, B = k.getState();
            if (B.ttsEnabled && B.ttsProviderId !== "browser-native-tts") {
              const D = await N(U, g);
              if (!D.success) {
                if (a.current || e.getState().generationEpoch !== m) {
                  n = !0;
                  break;
                }
                e.getState().addFailedOutline(s), (C = t.onSceneFailed) == null || C.call(t, s, D.error || "TTS generation failed"), e.getState().setGenerationStatus("paused"), n = !0;
                break;
              }
            }
            if (e.getState().generationEpoch !== m) {
              n = !0;
              break;
            }
            f(s.id), e.getState().addScene(U), ($ = t.onSceneGenerated) == null || $.call(t, U, s.order), h = A.previousSpeeches || [];
          } else {
            if (a.current || e.getState().generationEpoch !== m) {
              n = !0;
              break;
            }
            e.getState().addFailedOutline(s), (q = t.onSceneFailed) == null || q.call(t, s, A.error || "Actions generation failed"), e.getState().setGenerationStatus("paused"), n = !0;
            break;
          }
        }
        !a.current && !n && (e.getState().setGenerationStatus("completed"), e.getState().setGeneratingOutlines([]), (H = t.onComplete) == null || H.call(t));
      } catch (n) {
        if (n instanceof DOMException && n.name === "AbortError")
          j.info("Generation aborted"), e.getState().setGenerationStatus("paused");
        else
          throw n;
      } finally {
        r.current = !1, c.current = null;
      }
    },
    [t, e]
  );
  i.current = O;
  const K = M(() => {
    var d, f;
    a.current = !0, e.getState().bumpGenerationEpoch(), (d = c.current) == null || d.abort(), (f = o.current) == null || f.abort();
  }, [e]), P = M(() => r.current, []), p = M(
    async (d) => {
      var F;
      const f = e.getState(), g = f.failedOutlines.find((l) => l.id === d), S = u.current;
      if (!g || !f.stage || !S) return;
      const w = () => {
        const l = e.getState().generatingOutlines;
        l.some((h) => h.id === d) && e.getState().setGeneratingOutlines(l.filter((h) => h.id !== d));
      };
      e.getState().retryFailedOutline(d), e.getState().setGenerationStatus("generating");
      const I = e.getState().generatingOutlines;
      I.some((l) => l.id === g.id) || e.getState().setGeneratingOutlines([...I, g]);
      const m = new AbortController().signal;
      try {
        const l = await J(
          {
            outline: g,
            allOutlines: f.outlines,
            stageId: f.stage.id,
            pdfImages: S.pdfImages,
            imageMapping: S.imageMapping,
            stageInfo: S.stageInfo,
            agents: S.agents
          },
          m
        );
        if (!l.success || !l.content) {
          e.getState().addFailedOutline(g);
          return;
        }
        const h = [...e.getState().scenes].sort((b, C) => b.order - C.order), v = h[h.length - 1], R = v ? (v.actions || []).filter((b) => b.type === "speech").map((b) => b.text) : [], T = await L(
          {
            outline: l.effectiveOutline || g,
            allOutlines: f.outlines,
            content: l.content,
            stageId: f.stage.id,
            agents: S.agents,
            previousSpeeches: R,
            userProfile: S.userProfile
          },
          m
        );
        if (!T.success || !T.scene) {
          e.getState().addFailedOutline(g);
          return;
        }
        const E = k.getState();
        if (E.ttsEnabled && E.ttsProviderId !== "browser-native-tts" && !(await N(T.scene, m)).success) {
          e.getState().addFailedOutline(g);
          return;
        }
        w(), e.getState().addScene(T.scene), e.getState().generatingOutlines.length > 0 && u.current && ((F = i.current) == null || F.call(i, u.current));
      } catch (l) {
        l instanceof DOMException && l.name === "AbortError" || e.getState().addFailedOutline(g);
      }
    },
    [e]
  );
  return { generateRemaining: O, retrySingleOutline: p, stop: K, isGenerating: P };
}
export {
  Z as generateAndStoreTTS,
  ce as useSceneGenerator
};
//# sourceMappingURL=use-scene-generator.js.map
