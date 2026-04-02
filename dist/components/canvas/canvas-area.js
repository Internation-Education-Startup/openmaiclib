import { jsxs as r, jsx as a } from "react/jsx-runtime";
import { useCallback as F } from "react";
import { AnimatePresence as y, motion as l } from "motion/react";
import { Play as M } from "lucide-react";
import { cn as m } from "../../lib/utils/cn.js";
import { SceneRenderer as R } from "../stage/scene-renderer.js";
import { SceneProvider as v } from "../../lib/contexts/scene-context.js";
import { Whiteboard as W } from "../whiteboard/index.js";
import { CanvasToolbar as D } from "./canvas-toolbar.js";
import { useI18n as J } from "../../lib/hooks/use-i18n.js";
function aa({
  currentScene: t,
  currentSceneIndex: g,
  scenesCount: k,
  mode: c,
  engineState: f,
  isLiveSession: i,
  whiteboardOpen: o,
  sidebarCollapsed: u,
  chatCollapsed: N,
  onToggleSidebar: w,
  onToggleChat: _,
  onPrevSlide: C,
  onNextSlide: j,
  onPlayPause: s,
  onWhiteboardClose: h,
  isPresenting: z,
  onTogglePresentation: A,
  showStopDiscussion: T,
  onStopDiscussion: B,
  hideToolbar: E,
  isPendingScene: b,
  isGenerationFailed: H,
  onRetryGeneration: x
}) {
  const { t: p } = J(), d = c === "playback" && !o, I = d && f !== "playing" && (t == null ? void 0 : t.type) === "slide" && !i && !b, X = F(
    (e) => {
      if (!d || i || (t == null ? void 0 : t.type) !== "slide") return;
      const Y = e.currentTarget.querySelectorAll("[data-video-element]");
      for (const q of Y) {
        const n = q.getBoundingClientRect();
        if (e.clientX >= n.left && e.clientX <= n.right && e.clientY >= n.top && e.clientY <= n.bottom)
          return;
      }
      s();
    },
    [d, i, s, t == null ? void 0 : t.type]
  );
  return /* @__PURE__ */ r("div", { className: "w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900 group/canvas", children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: m(
          "flex-1 min-h-0 relative overflow-hidden flex items-center justify-center p-2 transition-colors duration-500",
          (t == null ? void 0 : t.type) === "interactive" ? "bg-blue-50/30 dark:bg-blue-900/10" : "bg-gray-50/30 dark:bg-gray-900/30"
        ),
        children: /* @__PURE__ */ r(
          "div",
          {
            className: m(
              "aspect-[16/9] h-full max-h-full max-w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden relative transition-all duration-700",
              d && !i && (t == null ? void 0 : t.type) === "slide" && "cursor-pointer",
              (t == null ? void 0 : t.type) === "interactive" ? "shadow-blue-200/50 dark:shadow-blue-900/50 ring-1 ring-blue-900/5 dark:ring-blue-500/10" : "shadow-gray-200/50 dark:shadow-gray-800/50 ring-1 ring-gray-950/5 dark:ring-white/5"
            ),
            onClick: X,
            children: [
              /* @__PURE__ */ a("div", { className: "absolute inset-0 z-[110] pointer-events-none", children: /* @__PURE__ */ a(v, { children: /* @__PURE__ */ a(W, { isOpen: o, onClose: h }) }) }),
              t && !o && /* @__PURE__ */ a("div", { className: "absolute inset-0", children: /* @__PURE__ */ a(v, { children: /* @__PURE__ */ a(R, { scene: t, mode: c }) }) }),
              /* @__PURE__ */ a(y, { children: b && !t && /* @__PURE__ */ a(
                l.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.4, ease: "easeOut" },
                  className: "absolute inset-0 z-[105] flex flex-col items-center justify-center bg-white dark:bg-gray-800",
                  children: H ? /* @__PURE__ */ r("div", { className: "flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ a("div", { className: "w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center", children: /* @__PURE__ */ a(
                      "svg",
                      {
                        className: "w-6 h-6 text-red-400 dark:text-red-500",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        strokeWidth: 1.5,
                        children: /* @__PURE__ */ a(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ a("span", { className: "text-sm text-red-500 dark:text-red-400 font-medium", children: p("stage.generationFailed") }),
                    x && /* @__PURE__ */ a(
                      "button",
                      {
                        onClick: x,
                        className: "mt-1 px-4 py-1.5 text-xs font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors active:scale-95",
                        children: p("generation.retryScene")
                      }
                    )
                  ] }) : /* @__PURE__ */ r("div", { className: "flex flex-col items-center gap-4", children: [
                    /* @__PURE__ */ r("div", { className: "relative w-12 h-12", children: [
                      /* @__PURE__ */ a("div", { className: "absolute inset-0 rounded-full border-2 border-gray-100 dark:border-gray-700" }),
                      /* @__PURE__ */ a("div", { className: "absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 dark:border-t-purple-400 animate-spin" })
                    ] }),
                    /* @__PURE__ */ a(
                      l.span,
                      {
                        initial: { opacity: 0, y: 4 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.2, duration: 0.3 },
                        className: "text-sm text-gray-400 dark:text-gray-500 font-medium",
                        children: p("stage.generatingNextPage")
                      }
                    )
                  ] })
                }
              ) }),
              t && /* @__PURE__ */ a("div", { className: "absolute top-4 right-4 text-gray-200 dark:text-gray-700 font-black text-4xl opacity-50 pointer-events-none select-none mix-blend-multiply dark:mix-blend-screen", children: (g + 1).toString().padStart(2, "0") }),
              /* @__PURE__ */ a(y, { children: I && /* @__PURE__ */ a(
                l.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.3 },
                  className: "absolute inset-0 z-[102] flex items-center justify-center pointer-events-none",
                  children: /* @__PURE__ */ a(
                    l.div,
                    {
                      className: "opacity-50 group-hover/canvas:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer",
                      exit: { pointerEvents: "none" },
                      onClick: (e) => {
                        e.stopPropagation(), s();
                      },
                      children: /* @__PURE__ */ a(
                        l.div,
                        {
                          initial: { scale: 0.85 },
                          animate: { scale: [1, 1.06] },
                          exit: { scale: 1.15, opacity: 0 },
                          transition: {
                            default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                            scale: {
                              repeat: 1 / 0,
                              repeatType: "mirror",
                              duration: 1,
                              ease: "easeInOut"
                            }
                          },
                          className: "w-20 h-20 rounded-full bg-white/95 dark:bg-gray-800/95 flex items-center justify-center shadow-[0_4px_30px_rgba(147,51,234,0.15),inset_0_0_0_1px_rgba(233,213,255,0.5)] dark:shadow-[0_4px_30px_rgba(147,51,234,0.3),inset_0_0_0_1px_rgba(126,34,206,0.3)]",
                          style: { willChange: "transform" },
                          children: /* @__PURE__ */ a(M, { className: "w-7 h-7 text-purple-600 dark:text-purple-400 fill-purple-600/90 dark:fill-purple-400/90 ml-0.5" })
                        }
                      )
                    }
                  )
                }
              ) })
            ]
          }
        )
      }
    ),
    !E && /* @__PURE__ */ a(
      D,
      {
        className: m(
          "shrink-0 h-9 px-2",
          "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl",
          "border-t border-gray-200/40 dark:border-gray-700/40"
        ),
        currentSceneIndex: g,
        scenesCount: k,
        engineState: f,
        isLiveSession: i,
        whiteboardOpen: o,
        sidebarCollapsed: u,
        chatCollapsed: N,
        onToggleSidebar: w,
        onToggleChat: _,
        onPrevSlide: C,
        onNextSlide: j,
        onPlayPause: s,
        onWhiteboardClose: h,
        isPresenting: z,
        onTogglePresentation: A,
        showStopDiscussion: T,
        onStopDiscussion: B
      }
    )
  ] });
}
export {
  aa as CanvasArea
};
//# sourceMappingURL=canvas-area.js.map
