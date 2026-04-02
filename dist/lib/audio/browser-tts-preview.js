function d() {
  const e = new Error("Browser TTS preview canceled");
  return e.name = "AbortError", e;
}
function E(e) {
  const o = (e.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  return (e.length > 0 ? o / e.length : 0) > 0.3 ? "zh-CN" : "en-US";
}
function _(e) {
  return e instanceof Error && e.name === "AbortError";
}
async function p() {
  if (typeof window > "u" || !window.speechSynthesis)
    return [];
  const e = window.speechSynthesis.getVoices();
  return e.length > 0 ? e : new Promise((o) => {
    let i = !1, r = null;
    const t = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", a), r !== null && window.clearTimeout(r);
    }, n = () => {
      i || (i = !0, t(), o(window.speechSynthesis.getVoices()));
    }, a = () => {
      window.speechSynthesis.getVoices().length > 0 && n();
    };
    window.speechSynthesis.addEventListener("voiceschanged", a), r = window.setTimeout(n, 2e3);
  });
}
function v(e, o, i) {
  const r = o.trim(), t = r && r !== "default" && e.find(
    (n) => n.voiceURI === r || n.name === r || n.lang === r
  ) || null;
  return {
    voice: t,
    lang: (t == null ? void 0 : t.lang) || E(i)
  };
}
function I(e) {
  const o = typeof window < "u" ? window.speechSynthesis : void 0;
  if (!o)
    return {
      promise: Promise.reject(new Error("Browser does not support Speech Synthesis API")),
      cancel: () => {
      }
    };
  let i = !1, r = !1, t = !1, n = null, a = null;
  const h = (u) => {
    i || (i = !0, n !== null && (window.clearTimeout(n), n = null), u());
  }, c = (u, s) => {
    i || (i = !0, n !== null && (window.clearTimeout(n), n = null), u(s));
  };
  return { promise: new Promise((u, s) => {
    a = s, (async () => {
      try {
        const w = e.voices ?? await p();
        if (t) {
          c(s, d());
          return;
        }
        if (w.length === 0) {
          c(s, new Error("No browser TTS voices available"));
          return;
        }
        const l = new SpeechSynthesisUtterance(e.text);
        l.rate = e.rate ?? 1;
        const { voice: T, lang: S } = v(w, e.voice ?? "", e.text);
        if (T && (l.voice = T), l.lang = S, l.onstart = () => {
          r = !0;
        }, l.onend = () => {
          if (!r) {
            c(s, new Error("Browser TTS preview ended before playback started"));
            return;
          }
          h(u);
        }, l.onerror = (f) => {
          if (t || f.error === "canceled" || f.error === "interrupted") {
            c(s, d());
            return;
          }
          c(s, new Error(f.error));
        }, n = window.setTimeout(() => {
          o.cancel(), c(s, new Error("Browser TTS preview timed out"));
        }, 3e4), o.cancel(), t) {
          c(s, d());
          return;
        }
        o.speak(l);
      } catch (w) {
        c(s, w);
      }
    })();
  }), cancel: () => {
    i || t || (t = !0, o.cancel(), a && c(a, d()));
  } };
}
export {
  p as ensureVoicesLoaded,
  _ as isBrowserTTSAbortError,
  I as playBrowserTTSPreview,
  v as resolveBrowserVoice
};
//# sourceMappingURL=browser-tts-preview.js.map
