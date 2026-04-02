import { useRef as s, useEffect as g, useCallback as m } from "react";
import { useSettingsStore as b } from "../store/settings.js";
import { useBrowserTTS as A } from "./use-browser-tts.js";
import { getAvailableProvidersWithVoices as C, resolveAgentVoice as rr } from "../audio/voice-resolver.js";
function sr({ enabled: M, agents: E, onAudioStateChange: K }) {
  const T = b((r) => r.ttsProvidersConfig), q = b((r) => r.ttsSpeed), a = b((r) => r.ttsMuted), V = b((r) => r.ttsVolume), x = b((r) => r.playbackSpeed), D = b((r) => r.ttsProviderId), L = b((r) => r.ttsVoice), w = s([]), i = s(!1), u = s(!1), k = s(null), y = s(0), U = s(null), n = s(null), e = s(K);
  e.current = K;
  const p = s(() => {
  }), {
    speak: N,
    pause: O,
    resume: Q,
    cancel: F
  } = A({
    rate: q,
    onEnd: () => {
      var r;
      i.current = !1, y.current++, (r = e.current) == null || r.call(e, null, "idle"), u.current || p.current();
    }
  }), H = s(F);
  H.current = F;
  const J = s(N);
  J.current = N;
  const W = s(O);
  W.current = O;
  const z = s(Q);
  z.current = Q;
  const G = s(/* @__PURE__ */ new Map());
  g(() => {
    const r = /* @__PURE__ */ new Map();
    E.forEach((c, o) => r.set(c.id, o)), G.current = r;
  }, [E]);
  const X = m(
    (r) => {
      var d, f, v;
      const c = C(T);
      if (!r)
        return c.length > 0 ? {
          providerId: c[0].providerId,
          voiceId: ((d = c[0].voices[0]) == null ? void 0 : d.id) ?? "default"
        } : { providerId: "browser-native-tts", voiceId: "default" };
      const o = E.find((t) => t.id === r);
      if (!o)
        return c.length > 0 ? {
          providerId: c[0].providerId,
          voiceId: ((f = c[0].voices[0]) == null ? void 0 : f.id) ?? "default",
          modelId: void 0
        } : { providerId: "browser-native-tts", voiceId: "default", modelId: void 0 };
      if (o.role === "teacher")
        return {
          providerId: D,
          voiceId: L,
          modelId: (v = T[D]) == null ? void 0 : v.modelId
        };
      const l = G.current.get(r) ?? 0;
      return rr(o, l, c);
    },
    [E, T, D, L]
  ), Y = m(async () => {
    var o, l, d, f, v;
    if (u.current || i.current || w.current.length === 0) return;
    if (!M || a) {
      w.current = [];
      return;
    }
    i.current = !0;
    const r = w.current.shift();
    if (r.providerId === "browser-native-tts") {
      k.current = r.providerId, (o = e.current) == null || o.call(e, r.agentId, "playing"), J.current(r.text, r.voiceId);
      return;
    }
    k.current = r.providerId, (l = e.current) == null || l.call(e, r.agentId, "generating");
    const c = new AbortController();
    U.current = c;
    try {
      const t = T[r.providerId], $ = await fetch("/api/generate/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: r.text,
          audioId: r.partId,
          ttsProviderId: r.providerId,
          ttsModelId: r.modelId || (t == null ? void 0 : t.modelId),
          ttsVoice: r.voiceId,
          ttsSpeed: q,
          ttsApiKey: t == null ? void 0 : t.apiKey,
          ttsBaseUrl: (t == null ? void 0 : t.serverBaseUrl) || (t == null ? void 0 : t.baseUrl)
        }),
        signal: c.signal
      });
      if (!$.ok) throw new Error(`TTS API error: ${$.status}`);
      const j = await $.json();
      if (!j.base64) throw new Error("No audio in response");
      const S = `data:audio/${j.format || "mp3"};base64,${j.base64}`, I = new Audio(S);
      if (I.playbackRate = x, I.volume = a ? 0 : V, n.current = I, I.addEventListener("ended", () => {
        var P;
        n.current = null, i.current = !1, y.current++, (P = e.current) == null || P.call(e, r.agentId, "idle"), u.current || queueMicrotask(() => p.current());
      }), I.addEventListener("error", () => {
        var P;
        n.current = null, i.current = !1, y.current++, (P = e.current) == null || P.call(e, r.agentId, "idle"), u.current || queueMicrotask(() => p.current());
      }), u.current) {
        (d = e.current) == null || d.call(e, r.agentId, "playing"), I.pause();
        return;
      }
      (f = e.current) == null || f.call(e, r.agentId, "playing"), await I.play();
    } catch (t) {
      t.name !== "AbortError" && console.error("[DiscussionTTS] TTS generation failed:", t), n.current = null, i.current = !1, y.current++, (v = e.current) == null || v.call(e, r.agentId, "idle"), u.current || queueMicrotask(() => p.current());
    }
  }, [M, a, V, T, q, x]);
  p.current = Y;
  const Z = m(
    (r, c, o, l) => {
      var t;
      if (!M || a || !o.trim()) return;
      const { providerId: d, modelId: f, voiceId: v } = X(l);
      w.current.push({
        messageId: r,
        partId: c,
        text: o,
        agentId: l,
        providerId: d,
        modelId: f,
        voiceId: v
      }), i.current ? d !== "browser-native-tts" && ((t = e.current) == null || t.call(e, l, "generating")) : p.current();
    },
    [M, a, X]
  ), B = m(() => {
    var r, c;
    u.current = !1, k.current = null, (r = U.current) == null || r.abort(), U.current = null, n.current && (n.current.pause(), n.current.src = "", n.current = null), H.current(), w.current = [], i.current = !1, y.current = 0, (c = e.current) == null || c.call(e, null, "idle");
  }, []), _ = m(() => {
    u.current || (u.current = !0, k.current === "browser-native-tts" ? W.current() : n.current && !n.current.paused && n.current.pause());
  }, []), h = m(() => {
    u.current && (u.current = !1, k.current === "browser-native-tts" ? z.current() : n.current && n.current.paused ? n.current.play() : i.current || p.current());
  }, []);
  g(() => {
    n.current && (n.current.playbackRate = x);
  }, [x]), g(() => {
    n.current && (n.current.volume = a ? 0 : V);
  }, [V, a]), g(() => B, [B]);
  const R = m(() => ({
    holding: i.current || w.current.length > 0,
    segmentDone: y.current
  }), []);
  return {
    handleSegmentSealed: Z,
    cleanup: B,
    pause: _,
    resume: h,
    shouldHold: R
  };
}
export {
  sr as useDiscussionTTS
};
//# sourceMappingURL=use-discussion-tts.js.map
