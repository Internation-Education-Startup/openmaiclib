import { useState as g, useRef as d, useCallback as v, useEffect as L } from "react";
import { ensureVoicesLoaded as x, playBrowserTTSPreview as A, isBrowserTTSAbortError as j } from "./browser-tts-preview.js";
function O() {
  const [m, o] = g(!1), r = d(null), f = d(0), s = d(null), c = d(null), i = v(() => {
    var e;
    f.current += 1, (e = r.current) == null || e.call(r), r.current = null, s.current && (s.current.pause(), s.current = null), c.current && (URL.revokeObjectURL(c.current), c.current = null);
  }, []), U = v(() => {
    i(), o(!1);
  }, [i]);
  L(() => i, [i]);
  const I = v(
    async (e) => {
      var p, y;
      i();
      const R = ++f.current, t = () => f.current !== R;
      o(!0);
      try {
        if (e.providerId === "browser-native-tts") {
          if (typeof window > "u" || !window.speechSynthesis)
            throw new Error("Browser does not support Speech Synthesis API");
          const n = await x();
          if (t()) return;
          if (n.length === 0)
            throw new Error("No browser TTS voices available");
          const T = A({
            text: e.text,
            voice: e.voice,
            rate: e.speed,
            voices: n
          });
          r.current = T.cancel, await T.promise, t() || (r.current = null, o(!1));
          return;
        }
        const a = {
          text: e.text,
          audioId: "preview",
          ttsProviderId: e.providerId,
          ttsModelId: e.modelId,
          ttsVoice: e.voice,
          ttsSpeed: e.speed
        };
        (p = e.apiKey) != null && p.trim() && (a.ttsApiKey = e.apiKey), (y = e.baseUrl) != null && y.trim() && (a.ttsBaseUrl = e.baseUrl);
        const w = await fetch("/api/generate/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a)
        });
        if (t()) return;
        const u = await w.json().catch(() => ({ error: w.statusText }));
        if (t()) return;
        if (!w.ok || !u.base64)
          throw new Error(u.error || "TTS preview failed");
        const b = atob(u.base64), h = new Uint8Array(b.length);
        for (let n = 0; n < b.length; n++) h[n] = b.charCodeAt(n);
        const P = new Blob([h], { type: `audio/${u.format || "mp3"}` });
        c.current && URL.revokeObjectURL(c.current);
        const S = URL.createObjectURL(P);
        c.current = S;
        const l = new Audio(S);
        s.current = l, l.onended = () => {
          t() || (s.current = null, o(!1));
        }, l.onerror = () => {
          t() || (s.current = null, o(!1));
        }, await l.play();
      } catch (a) {
        if (t() || (r.current = null, o(!1)), !j(a))
          throw a;
      }
    },
    [i]
  );
  return { previewing: m, startPreview: I, stopPreview: U };
}
export {
  O as useTTSPreview
};
//# sourceMappingURL=use-tts-preview.js.map
