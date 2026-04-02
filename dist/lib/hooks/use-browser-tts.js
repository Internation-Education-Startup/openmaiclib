import { useState as f, useRef as A, useEffect as C, useCallback as h } from "react";
function T(S = {}) {
  const {
    onStart: i,
    onEnd: t,
    onError: s,
    rate: l = 1,
    pitch: p = 1,
    volume: r = 1,
    lang: y = "zh-CN"
  } = S, [v, c] = f(!1), [g, n] = f(!1), [u, m] = f([]), o = A(null);
  C(() => {
    if (typeof window > "u" || !window.speechSynthesis)
      return;
    const a = () => {
      const w = window.speechSynthesis.getVoices();
      m(w);
    };
    return a(), window.speechSynthesis.onvoiceschanged !== void 0 && (window.speechSynthesis.onvoiceschanged = a), () => {
      window.speechSynthesis.onvoiceschanged !== void 0 && (window.speechSynthesis.onvoiceschanged = null);
    };
  }, []);
  const k = h(
    (a, w) => {
      if (typeof window > "u" || !window.speechSynthesis) {
        s == null || s("浏览器不支持 Web Speech API");
        return;
      }
      window.speechSynthesis.cancel();
      const e = new SpeechSynthesisUtterance(a);
      if (e.rate = l, e.pitch = p, e.volume = r, e.lang = y, w) {
        const d = u.find((P) => P.voiceURI === w);
        d && (e.voice = d);
      }
      e.onstart = () => {
        c(!0), n(!1), i == null || i();
      }, e.onend = () => {
        c(!1), n(!1), o.current = null, t == null || t();
      }, e.onerror = (d) => {
        c(!1), n(!1), o.current = null, s == null || s(d.error);
      }, e.onpause = () => {
        n(!0);
      }, e.onresume = () => {
        n(!1);
      }, o.current = e, window.speechSynthesis.speak(e);
    },
    [l, p, r, y, u, i, t, s]
  ), b = h(() => {
    typeof window < "u" && window.speechSynthesis && window.speechSynthesis.pause();
  }, []), V = h(() => {
    typeof window < "u" && window.speechSynthesis && window.speechSynthesis.resume();
  }, []), I = h(() => {
    typeof window < "u" && window.speechSynthesis && (window.speechSynthesis.cancel(), c(!1), n(!1), o.current = null);
  }, []);
  return {
    speak: k,
    pause: b,
    resume: V,
    cancel: I,
    isSpeaking: v,
    isPaused: g,
    availableVoices: u
  };
}
export {
  T as useBrowserTTS
};
//# sourceMappingURL=use-browser-tts.js.map
