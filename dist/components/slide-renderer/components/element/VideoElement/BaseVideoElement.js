import { jsx as r, jsxs as a } from "react/jsx-runtime";
import { useRef as x, useEffect as v } from "react";
import { useAnimate as C } from "motion/react";
import { useCanvasStore as u } from "../../../../../lib/store/canvas.js";
import { isMediaPlaceholder as P, useMediaGenerationStore as V } from "../../../../../lib/store/media-generation.js";
import { useSettingsStore as D } from "../../../../../lib/store/settings.js";
import { useMediaStageId as R } from "../../../../../lib/contexts/media-stage-context.js";
import { retryMediaTask as G } from "../../../../../lib/media/media-orchestrator.js";
import { VideoOff as y, Film as M, ShieldAlert as B, RotateCcw as T } from "lucide-react";
import { useI18n as $ } from "../../../../../lib/hooks/use-i18n.js";
import { createLogger as A } from "../../../../../lib/logger.js";
const L = A("BaseVideoElement");
function X({ elementInfo: i }) {
  const { t: n } = $(), d = x(null), l = u.use.playingVideoElementId(), m = x(""), [c, p] = C(), b = R(), o = P(i.src), e = V((t) => {
    if (!o) return;
    const s = t.tasks[i.src];
    if (!(s && s.stageId !== b))
      return s;
  }), w = D((t) => t.videoGenerationEnabled), g = (e == null ? void 0 : e.status) === "done" && e.objectUrl ? e.objectUrl : i.src, f = o && !e && !w, N = o && !f && (!e || e.status === "pending" || e.status === "generating"), E = o && (e == null ? void 0 : e.status) === "failed", k = !o || (e == null ? void 0 : e.status) === "done";
  v(() => {
    const t = d.current;
    t && t.pause();
  }, []), v(() => {
    const t = d.current;
    if (!t) return;
    const s = l === i.id, h = m.current === i.id;
    m.current = l, s && !h ? (p(
      c.current,
      { scale: [1, 1.035, 1] },
      {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.35, 1]
      }
    ), t.play().catch((j) => {
      L.warn("[BaseVideoElement] play() failed:", j);
    })) : !s && h && t.pause();
  }, [l, i.id, p, c]);
  const S = () => {
    u.getState().playingVideoElementId === i.id && u.getState().pauseVideo();
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: "absolute",
      "data-video-element": !0,
      style: {
        top: `${i.top}px`,
        left: `${i.left}px`,
        width: `${i.width}px`,
        height: `${i.height}px`
      },
      onClick: (t) => t.stopPropagation(),
      onPointerDown: (t) => t.stopPropagation(),
      children: /* @__PURE__ */ r(
        "div",
        {
          ref: c,
          className: "w-full h-full",
          style: { transform: `rotate(${i.rotate}deg)` },
          children: f ? /* @__PURE__ */ r("div", { className: "w-full h-full bg-gray-50 dark:bg-gray-900/30 flex items-center justify-center rounded", children: /* @__PURE__ */ a("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ r(y, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ r("span", { children: n("settings.mediaGenerationDisabled") })
          ] }) }) : N ? /* @__PURE__ */ a("div", { className: "w-full h-full bg-gradient-to-br from-indigo-50 via-violet-50/60 to-blue-50 dark:from-indigo-950/40 dark:via-violet-950/30 dark:to-blue-950/20 flex items-center justify-center rounded", children: [
            /* @__PURE__ */ r("style", { children: `
              @keyframes vid-pulse-ring { 0%, 100% { opacity: 0.15; transform: scale(0.85); } 50% { opacity: 0.35; transform: scale(1.1); } }
            ` }),
            /* @__PURE__ */ a("div", { className: "relative w-14 h-14", children: [
              /* @__PURE__ */ r(
                "div",
                {
                  className: "absolute inset-0 rounded-full border-2 border-indigo-300/40 dark:border-indigo-500/30",
                  style: {
                    animation: "vid-pulse-ring 2.4s ease-in-out infinite"
                  }
                }
              ),
              /* @__PURE__ */ r(
                M,
                {
                  className: "absolute inset-0 m-auto w-5 h-5 text-indigo-400/80 dark:text-indigo-500/70",
                  strokeWidth: 1.5
                }
              )
            ] })
          ] }) : E ? /* @__PURE__ */ r("div", { className: "w-full h-full bg-red-50 dark:bg-red-900/20 flex flex-col items-center justify-center gap-1.5 rounded", children: (e == null ? void 0 : e.errorCode) === "CONTENT_SENSITIVE" ? /* @__PURE__ */ a("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400", children: [
            /* @__PURE__ */ r(B, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ r("span", { children: n("settings.mediaContentSensitive") })
          ] }) : (e == null ? void 0 : e.errorCode) === "GENERATION_DISABLED" ? /* @__PURE__ */ a("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ r(y, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ r("span", { children: n("settings.mediaGenerationDisabled") })
          ] }) : /* @__PURE__ */ a(
            "button",
            {
              onClick: (t) => {
                t.stopPropagation(), G(i.src);
              },
              onPointerDown: (t) => t.stopPropagation(),
              className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 rounded hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors",
              children: [
                /* @__PURE__ */ r(T, { className: "w-3 h-3" }),
                n("settings.mediaRetry")
              ]
            }
          ) }) : k && g && !o || o && (e == null ? void 0 : e.status) === "done" ? /* @__PURE__ */ r(
            "video",
            {
              ref: d,
              className: "w-full h-full",
              style: { objectFit: "contain" },
              src: g,
              poster: (e == null ? void 0 : e.poster) || i.poster,
              preload: "metadata",
              controls: !0,
              onEnded: S
            }
          ) : /* @__PURE__ */ r("div", { className: "w-full h-full flex items-center justify-center bg-black/10 rounded", children: /* @__PURE__ */ r(
            "svg",
            {
              className: "w-12 h-12 text-gray-400",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 1.5,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ r("polygon", { points: "5 3 19 12 5 21 5 3" })
            }
          ) })
        }
      )
    }
  );
}
export {
  X as BaseVideoElement
};
//# sourceMappingURL=BaseVideoElement.js.map
