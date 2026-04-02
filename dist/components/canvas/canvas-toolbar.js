import { jsxs as a, jsx as e } from "react/jsx-runtime";
import { useState as ae, useRef as H, useCallback as T, useEffect as re } from "react";
import { LayoutList as le, ChevronLeft as ie, Pause as se, Play as oe, ChevronRight as ne, Repeat as de, PencilLine as ce, Minimize2 as me, Maximize2 as ue, MessageSquare as he, VolumeX as be, Volume1 as xe, Volume2 as ge } from "lucide-react";
import { cn as t } from "../../lib/utils/cn.js";
import "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as pe } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { useI18n as ye } from "../../lib/hooks/use-i18n.js";
import { TooltipProvider as q, Tooltip as B, TooltipTrigger as E, TooltipContent as U } from "../ui/tooltip.js";
const l = t(
  "relative w-7 h-7 rounded-md flex items-center justify-center",
  "transition-all duration-150 outline-none cursor-pointer",
  "hover:bg-gray-500/[0.08] dark:hover:bg-gray-400/[0.08] active:scale-90"
);
function x() {
  return /* @__PURE__ */ e("div", { className: "w-px h-3 bg-gray-200/80 dark:bg-gray-700/60 mx-0.5 shrink-0" });
}
function ve({
  muted: o,
  volume: i,
  disabled: n
}) {
  const d = "w-3.5 h-3.5";
  return n || o || i === 0 ? /* @__PURE__ */ e(be, { className: d }) : i < 0.5 ? /* @__PURE__ */ e(xe, { className: d }) : /* @__PURE__ */ e(ge, { className: d });
}
function Fe({
  currentSceneIndex: o,
  scenesCount: i,
  engineState: n,
  isLiveSession: d,
  whiteboardOpen: g,
  sidebarCollapsed: X,
  chatCollapsed: $,
  onToggleSidebar: f,
  onToggleChat: k,
  onPrevSlide: A,
  onNextSlide: I,
  onPlayPause: J,
  onWhiteboardClose: K,
  showStopDiscussion: Q,
  onStopDiscussion: w,
  isPresenting: h,
  onTogglePresentation: N,
  className: W,
  ttsEnabled: b,
  ttsMuted: c,
  ttsVolume: C = 1,
  onToggleMute: m,
  onVolumeChange: p,
  autoPlayLecture: P,
  onToggleAutoPlay: z,
  playbackSpeed: y = 1,
  onCycleSpeed: j
}) {
  const { t: r } = ye(), Y = o > 0, Z = o < i - 1, _ = !d, O = pe(
    (s) => {
      var u, V, F, G;
      return ((G = (F = (V = (u = s.stage) == null ? void 0 : u.whiteboard) == null ? void 0 : V[0]) == null ? void 0 : F.elements) == null ? void 0 : G.length) || 0;
    }
  ), [M, L] = ae(!1), v = H(void 0), S = H(null), ee = T(() => {
    clearTimeout(v.current), L(!0);
  }, []), te = T(() => {
    v.current = setTimeout(() => L(!1), 300);
  }, []);
  re(() => () => clearTimeout(v.current), []);
  const R = c ? 0 : C, D = r(h ? "stage.exitFullscreen" : "stage.fullscreen");
  return /* @__PURE__ */ a("div", { className: t("flex items-center gap-2", W), children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-1 shrink-0 pl-1", children: [
      f && /* @__PURE__ */ e(
        "button",
        {
          onClick: f,
          className: t(
            l,
            "w-6 h-6",
            X ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"
          ),
          "aria-label": "Toggle sidebar",
          children: /* @__PURE__ */ e(le, { className: "w-3.5 h-3.5" })
        }
      ),
      /* @__PURE__ */ a("span", { className: "text-[11px] text-gray-400 dark:text-gray-500 tabular-nums select-none font-medium", children: [
        o + 1,
        /* @__PURE__ */ e("span", { className: "opacity-35 mx-px", children: "/" }),
        i
      ] })
    ] }),
    /* @__PURE__ */ e(x, {}),
    /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center min-w-0", children: /* @__PURE__ */ a(
      "div",
      {
        className: t(
          "inline-flex items-center gap-0.5 px-1 h-7",
          h ? "" : "bg-gray-100/60 dark:bg-gray-800/60 rounded-lg"
        ),
        children: [
          m && /* @__PURE__ */ a(
            "div",
            {
              ref: S,
              className: "relative flex items-center",
              onMouseEnter: ee,
              onMouseLeave: te,
              children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: m,
                    disabled: !b,
                    className: t(
                      l,
                      "w-6 h-6",
                      b ? c ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400" : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    ),
                    "aria-label": c ? "Unmute" : "Mute",
                    children: /* @__PURE__ */ e(ve, { muted: !!c, volume: C, disabled: !b })
                  }
                ),
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: t(
                      "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center",
                      "transition-all duration-200 ease-out pointer-events-none opacity-0",
                      M && b && "pointer-events-auto opacity-100"
                    ),
                    children: [
                      /* @__PURE__ */ a("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-2 py-2.5 flex flex-col items-center gap-1.5", children: [
                        /* @__PURE__ */ e("span", { className: "text-[10px] text-gray-400 dark:text-gray-500 tabular-nums font-medium select-none", children: Math.round(R * 100) }),
                        /* @__PURE__ */ e(
                          "input",
                          {
                            type: "range",
                            min: 0,
                            max: 1,
                            step: 0.05,
                            value: R,
                            onChange: (s) => {
                              const u = parseFloat(s.target.value);
                              p == null || p(u), u > 0 && c && (m == null || m());
                            },
                            className: t(
                              "appearance-none cursor-pointer",
                              "h-16 w-1 rounded-full",
                              "bg-gray-200 dark:bg-gray-600",
                              "[writing-mode:vertical-lr] [direction:rtl]",
                              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3",
                              "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:dark:bg-violet-400",
                              "[&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer",
                              "[&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3",
                              "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-violet-500 [&::-moz-range-thumb]:border-0"
                            )
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e("div", { className: "w-2 h-2 bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 rotate-45 -mt-[5px]" })
                    ]
                  }
                )
              ]
            }
          ),
          j && /* @__PURE__ */ e(q, { delayDuration: 0, children: /* @__PURE__ */ a(B, { children: [
            /* @__PURE__ */ e(E, { asChild: !0, children: /* @__PURE__ */ e(
              "button",
              {
                onClick: j,
                className: t(
                  "w-8 h-5 rounded flex items-center justify-center",
                  "transition-all duration-150 outline-none cursor-pointer",
                  "text-[11px] font-semibold tabular-nums leading-none",
                  "active:scale-90",
                  y !== 1 ? "text-violet-600 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-400/10" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                ),
                "aria-label": "Playback speed",
                children: y === 1.5 ? "1.5x" : `${y}x`
              }
            ) }),
            /* @__PURE__ */ e(U, { side: "top", className: "text-xs", children: r("roundtable.speed") })
          ] }) }),
          /* @__PURE__ */ e(x, {}),
          i > 1 && /* @__PURE__ */ e(
            "button",
            {
              onClick: A,
              disabled: !Y,
              className: t(
                l,
                "w-6 h-6 text-gray-500 dark:text-gray-400 disabled:opacity-20 disabled:pointer-events-none"
              ),
              "aria-label": "Previous scene",
              children: /* @__PURE__ */ e(ie, { className: "w-3.5 h-3.5" })
            }
          ),
          Q && w ? /* @__PURE__ */ a(
            "button",
            {
              onClick: (s) => {
                s.stopPropagation(), w();
              },
              className: t(
                "flex items-center gap-1.5 h-6 px-2.5 rounded-md",
                "bg-red-500/10 dark:bg-red-400/10 text-red-600 dark:text-red-400",
                "text-[11px] font-semibold whitespace-nowrap",
                "hover:bg-red-500/20 dark:hover:bg-red-400/20 active:scale-95 transition-all cursor-pointer"
              ),
              title: r("roundtable.stopDiscussion"),
              children: [
                /* @__PURE__ */ a("span", { className: "relative flex h-1.5 w-1.5 shrink-0", children: [
                  /* @__PURE__ */ e("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                  /* @__PURE__ */ e("span", { className: "relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" })
                ] }),
                r("roundtable.stopDiscussion")
              ]
            }
          ) : _ ? /* @__PURE__ */ e(
            "button",
            {
              onClick: J,
              className: t(
                l,
                "w-7 h-6",
                n === "playing" ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
              ),
              "aria-label": n === "playing" ? "Pause" : "Play",
              children: n === "playing" ? /* @__PURE__ */ e(se, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ e(oe, { className: "w-3.5 h-3.5 ml-px" })
            }
          ) : null,
          i > 1 && /* @__PURE__ */ e(
            "button",
            {
              onClick: I,
              disabled: !Z,
              className: t(
                l,
                "w-6 h-6 text-gray-500 dark:text-gray-400 disabled:opacity-20 disabled:pointer-events-none"
              ),
              "aria-label": "Next scene",
              children: /* @__PURE__ */ e(ne, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ e(x, {}),
          z && /* @__PURE__ */ e(q, { delayDuration: 0, children: /* @__PURE__ */ a(B, { children: [
            /* @__PURE__ */ e(E, { asChild: !0, children: /* @__PURE__ */ e(
              "button",
              {
                onClick: z,
                className: t(
                  l,
                  "w-8 h-6",
                  P ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
                ),
                "aria-label": "Auto-play",
                children: /* @__PURE__ */ e(de, { className: "w-3.5 h-3.5" })
              }
            ) }),
            /* @__PURE__ */ e(U, { side: "top", className: "text-xs", children: r(P ? "roundtable.autoPlayOff" : "roundtable.autoPlay") })
          ] }) }),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: (s) => {
                s.stopPropagation(), K();
              },
              className: t(
                l,
                "w-6 h-6",
                g ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
              ),
              title: r(g ? "whiteboard.minimize" : "whiteboard.open"),
              children: [
                /* @__PURE__ */ e(ce, { className: "w-3.5 h-3.5" }),
                !g && O > 0 && /* @__PURE__ */ e("span", { className: "absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full" })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a("div", { className: "flex items-center justify-end gap-px shrink-0 pr-1", children: [
      /* @__PURE__ */ e(x, {}),
      N && /* @__PURE__ */ e(
        "button",
        {
          onClick: N,
          className: t(
            l,
            "w-6 h-6",
            h ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
          ),
          "aria-label": D,
          title: D,
          children: h ? /* @__PURE__ */ e(me, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ e(ue, { className: "w-3.5 h-3.5" })
        }
      ),
      k && /* @__PURE__ */ e(
        "button",
        {
          onClick: k,
          className: t(
            l,
            "w-6 h-6",
            $ ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"
          ),
          "aria-label": "Toggle chat",
          children: /* @__PURE__ */ e(he, { className: "w-3.5 h-3.5" })
        }
      )
    ] })
  ] });
}
export {
  Fe as CanvasToolbar
};
//# sourceMappingURL=canvas-toolbar.js.map
