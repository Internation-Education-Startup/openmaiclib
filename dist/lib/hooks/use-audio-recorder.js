import { useState as v, useRef as h, useCallback as k } from "react";
import { ASR_PROVIDERS as z } from "../audio/constants.js";
import { createLogger as B } from "../logger.js";
const T = B("AudioRecorder");
function V(M = {}) {
  const { onTranscription: f, onError: r } = M, [b, u] = v(!1), [U, A] = v(!1), [K, s] = v(0), i = h(null), I = h([]), e = h(null), l = h(null), a = h(!1), D = k(
    async (p) => {
      var g, o, m, S;
      A(!0);
      try {
        const t = new FormData();
        if (t.append("audio", p, "recording.webm"), typeof window < "u") {
          const { useSettingsStore: c } = await import("../store/settings.js"), { asrProviderId: y, asrLanguage: x, asrProvidersConfig: R } = c.getState();
          t.append("providerId", y), t.append(
            "modelId",
            ((g = R == null ? void 0 : R[y]) == null ? void 0 : g.modelId) || ((o = z[y]) == null ? void 0 : o.defaultModelId) || ""
          ), t.append("language", x);
          const w = R == null ? void 0 : R[y];
          (m = w == null ? void 0 : w.apiKey) != null && m.trim() && t.append("apiKey", w.apiKey), (S = w == null ? void 0 : w.baseUrl) != null && S.trim() && t.append("baseUrl", w.baseUrl);
        }
        const n = await fetch("/api/transcription", {
          method: "POST",
          body: t
        });
        if (!n.ok) {
          const c = await n.json();
          throw new Error(c.error || "Transcription failed");
        }
        const d = await n.json();
        f == null || f(d.text);
      } catch (t) {
        T.error("Transcription error:", t), r == null || r(t instanceof Error ? t.message : "语音识别失败，请重试");
      } finally {
        A(!1), s(0);
      }
    },
    [f, r]
  ), L = k(async () => {
    if (!a.current) {
      a.current = !0;
      try {
        if (typeof window < "u") {
          const { useSettingsStore: o } = await import("../store/settings.js"), { asrProviderId: m, asrLanguage: S } = o.getState();
          if (m === "browser-native") {
            if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
              r == null || r("您的浏览器不支持语音识别功能");
              return;
            }
            const t = window.SpeechRecognition || window.webkitSpeechRecognition, n = new t();
            n.lang = S || "zh-CN", n.continuous = !1, n.interimResults = !1, n.onstart = () => {
              u(!0), s(0), e.current = setInterval(() => {
                s((d) => d + 1);
              }, 1e3);
            }, n.onresult = (d) => {
              const c = d.results[0][0].transcript;
              f == null || f(c);
            }, n.onerror = (d) => {
              T.error("Speech recognition error:", d.error);
              let c = "语音识别失败";
              switch (d.error) {
                case "aborted":
                  a.current = !1, u(!1), s(0), e.current && (clearInterval(e.current), e.current = null);
                  return;
                case "no-speech":
                  c = "未检测到语音输入";
                  break;
                case "audio-capture":
                  c = "无法访问麦克风";
                  break;
                case "not-allowed":
                  c = "麦克风权限被拒绝";
                  break;
                case "network":
                  c = "网络错误";
                  break;
                default:
                  c = `语音识别错误: ${d.error}`;
              }
              r == null || r(c), a.current = !1, u(!1), s(0), e.current && (clearInterval(e.current), e.current = null);
            }, n.onend = () => {
              a.current = !1, u(!1), s(0), e.current && (clearInterval(e.current), e.current = null);
            }, n.start(), l.current = n;
            return;
          }
        }
        const p = await navigator.mediaDevices.getUserMedia({ audio: !0 }), g = new MediaRecorder(p, {
          mimeType: "audio/webm"
        });
        i.current = g, I.current = [], g.ondataavailable = (o) => {
          o.data.size > 0 && I.current.push(o.data);
        }, g.onstop = async () => {
          p.getTracks().forEach((m) => m.stop());
          const o = new Blob(I.current, {
            type: "audio/webm"
          });
          await D(o), a.current = !1;
        }, g.start(), u(!0), s(0), e.current = setInterval(() => {
          s((o) => o + 1);
        }, 1e3);
      } catch (p) {
        a.current = !1, T.error("Failed to start recording:", p), r == null || r("无法访问麦克风，请检查权限设置");
      }
    }
  }, [f, r, D]), P = k(() => {
    if (l.current) {
      l.current.stop(), l.current = null, a.current = !1, u(!1), e.current && (clearInterval(e.current), e.current = null);
      return;
    }
    i.current && b && (i.current.stop(), a.current = !1, u(!1), e.current && (clearInterval(e.current), e.current = null));
  }, [b]), j = k(() => {
    if (l.current) {
      l.current.onresult = null, l.current.onerror = null, l.current.stop(), l.current = null, a.current = !1, u(!1), s(0), e.current && (clearInterval(e.current), e.current = null);
      return;
    }
    i.current && b && (i.current.ondataavailable = null, i.current.onstop = null, i.current.stop(), i.current.stream && i.current.stream.getTracks().forEach((p) => p.stop()), a.current = !1, u(!1), s(0), e.current && (clearInterval(e.current), e.current = null), I.current = []);
  }, [b]);
  return {
    isRecording: b,
    isProcessing: U,
    recordingTime: K,
    startRecording: L,
    stopRecording: P,
    cancelRecording: j
  };
}
export {
  V as useAudioRecorder
};
//# sourceMappingURL=use-audio-recorder.js.map
