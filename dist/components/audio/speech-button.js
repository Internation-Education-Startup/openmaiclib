import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { useRef as N, useEffect as C, useCallback as m } from "react";
import { Loader2 as R, Mic as _ } from "lucide-react";
import { useAudioRecorder as T } from "../../lib/hooks/use-audio-recorder.js";
import { useI18n as j } from "../../lib/hooks/use-i18n.js";
import { cn as a } from "../../lib/utils/cn.js";
import { Tooltip as z, TooltipTrigger as E, TooltipContent as L } from "../ui/tooltip.js";
import { toast as $ } from "sonner";
function q({
  onTranscription: i,
  className: h,
  disabled: c,
  size: u = "sm"
}) {
  const { t: n } = j(), l = N(i);
  C(() => {
    l.current = i;
  }, [i]);
  const f = m((t) => {
    l.current(t);
  }, []), g = m((t) => {
    $.error(t);
  }, []), { isRecording: r, isProcessing: o, startRecording: b, stopRecording: x } = T({
    onTranscription: f,
    onError: g
  }), v = r || o, y = () => {
    r ? x() : o || b();
  }, s = u === "md", k = s ? "h-8 w-8" : "h-6 w-6", p = s ? "w-4 h-4" : "w-3.5 h-3.5", w = s ? 14 : 10;
  return /* @__PURE__ */ d(z, { children: [
    /* @__PURE__ */ e(E, { asChild: !0, children: /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        disabled: c || o,
        onClick: y,
        className: a(
          "relative flex items-center justify-center rounded-lg transition-all duration-200 shrink-0 cursor-pointer",
          k,
          v ? "bg-violet-500/90 dark:bg-violet-600/80 text-white shadow-[0_0_12px_rgba(139,92,246,0.45)] dark:shadow-[0_0_12px_rgba(139,92,246,0.3)]" : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/80",
          c && "opacity-40 pointer-events-none",
          h
        ),
        children: [
          r && /* @__PURE__ */ e(
            "span",
            {
              className: "absolute inset-[-4px] rounded-[10px] border border-violet-400/40 dark:border-violet-400/25",
              style: {
                animation: "speech-ring 2s ease-in-out infinite"
              }
            }
          ),
          o ? /* @__PURE__ */ e(R, { className: a(p, "animate-spin") }) : r ? (
            /* Mini equalizer bars */
            /* @__PURE__ */ e("span", { className: "flex items-center gap-[2.5px] relative z-10", children: [0, 1, 2].map((t) => /* @__PURE__ */ e(
              "span",
              {
                className: "rounded-full bg-white",
                style: {
                  width: s ? 2.5 : 2,
                  animation: `speech-bar ${0.4 + t * 0.15}s ease-in-out ${t * 0.1}s infinite alternate`,
                  height: 3
                }
              },
              t
            )) })
          ) : /* @__PURE__ */ e(_, { className: a(p, "relative z-10") }),
          /* @__PURE__ */ e("style", { jsx: !0, children: `
            @keyframes speech-bar {
              0% {
                height: 3px;
              }
              100% {
                height: ${w}px;
              }
            }
            @keyframes speech-ring {
              0%,
              100% {
                opacity: 0.3;
                transform: scale(1);
              }
              50% {
                opacity: 0.7;
                transform: scale(1.08);
              }
            }
          ` })
        ]
      }
    ) }),
    /* @__PURE__ */ e(L, { side: "top", className: "text-xs", children: n(o ? "roundtable.processing" : r ? "voice.stopListening" : "voice.startListening") })
  ] });
}
export {
  q as SpeechButton
};
//# sourceMappingURL=speech-button.js.map
