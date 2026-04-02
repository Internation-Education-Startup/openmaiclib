import { jsxs as a, jsx as e, Fragment as P } from "react/jsx-runtime";
import { useState as N, useRef as F, useCallback as H } from "react";
import { useRouter as X } from "../../shims/next-navigation.js";
import { PanelLeftClose as q, Globe as G, RefreshCw as U, AlertCircle as B, Cpu as $, MousePointer2 as J, PieChart as K, BookOpen as C } from "lucide-react";
import { cn as t } from "../../lib/utils/cn.js";
import { ThumbnailSlide as Q } from "../slide-renderer/components/ThumbnailSlide/index.js";
import { useCanvasStore as S } from "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as I, PENDING_SCENE_ID as h } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { useI18n as V } from "../../lib/hooks/use-i18n.js";
const Y = 220, Z = 170, ee = 400;
function pe({
  collapsed: m,
  onCollapseChange: j,
  onSceneSelect: c,
  onRetryOutline: b
}) {
  const { t: g } = V(), M = X(), { scenes: f, currentSceneId: v, setCurrentSceneId: x, generatingOutlines: k, generationStatus: _ } = I(), z = I.use.failedOutlines(), D = S.use.viewportSize(), W = S.use.viewportRatio(), [E, y] = N(null), A = async (r) => {
    if (b) {
      y(r);
      try {
        await b(r);
      } finally {
        y(null);
      }
    }
  }, [u, R] = N(Y), p = F(!1), T = H(
    (r) => {
      r.preventDefault(), p.current = !0;
      const l = r.clientX, n = u, s = (o) => {
        const d = o.clientX - l, w = Math.min(ee, Math.max(Z, n + d));
        R(w);
      }, i = () => {
        p.current = !1, document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", i), document.body.style.cursor = "", document.body.style.userSelect = "";
      };
      document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", s), document.addEventListener("mouseup", i);
    },
    [u]
  ), L = (r) => ({
    slide: C,
    quiz: K,
    interactive: J,
    pbl: $
  })[r] || C;
  return /* @__PURE__ */ a(
    "div",
    {
      style: {
        width: m ? 0 : u,
        transition: p.current ? "none" : "width 0.3s ease"
      },
      className: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-gray-100 dark:border-gray-800 shadow-[2px_0_24px_rgba(0,0,0,0.02)] flex flex-col shrink-0 z-20 relative overflow-visible",
      children: [
        !m && /* @__PURE__ */ e(
          "div",
          {
            onMouseDown: T,
            className: "absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize z-50 group hover:bg-purple-400/30 dark:hover:bg-purple-600/30 active:bg-purple-500/40 dark:active:bg-purple-500/40 transition-colors",
            children: /* @__PURE__ */ e("div", { className: "absolute right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-400 dark:group-hover:bg-purple-500 transition-colors" })
          }
        ),
        /* @__PURE__ */ a("div", { className: t("flex flex-col w-full h-full overflow-hidden", m && "hidden"), children: [
          /* @__PURE__ */ a("div", { className: "h-10 flex items-center justify-between shrink-0 relative mt-3 mb-1 px-3", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => M.push("/"),
                className: "flex items-center gap-2 cursor-pointer rounded-lg px-1.5 -mx-1.5 py-1 -my-1 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 active:scale-[0.97] transition-all duration-150",
                title: g("generation.backToHome"),
                children: /* @__PURE__ */ e("img", { src: "/logo-horizontal.png", alt: "OpenMAIC", className: "h-6" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => j(!0),
                className: "w-7 h-7 shrink-0 rounded-lg flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-gray-200/90 dark:hover:bg-gray-700/90 hover:text-gray-700 dark:hover:text-gray-200 active:scale-90 transition-all duration-200",
                children: /* @__PURE__ */ e(q, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ a(
            "div",
            {
              "data-testid": "scene-list",
              className: "flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-2 scrollbar-hide pt-1",
              children: [
                f.map((r, l) => {
                  const n = v === r.id, s = L(r.type), i = r.type === "slide", o = i ? r.content : null;
                  return /* @__PURE__ */ a(
                    "div",
                    {
                      "data-testid": "scene-item",
                      onClick: () => {
                        c ? c(r.id) : x(r.id);
                      },
                      className: t(
                        "group relative rounded-lg transition-all duration-200 cursor-pointer flex flex-col gap-1 p-1.5",
                        n ? "bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-200 dark:ring-purple-700" : "hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                      ),
                      children: [
                        /* @__PURE__ */ e("div", { className: "flex justify-between items-center px-2 pt-0.5", children: /* @__PURE__ */ a("div", { className: "flex items-center gap-2 max-w-full", children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: t(
                                "text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                                n ? "bg-purple-600 dark:bg-purple-500 text-white shadow-sm shadow-purple-500/30" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                              ),
                              children: l + 1
                            }
                          ),
                          /* @__PURE__ */ e(
                            "span",
                            {
                              "data-testid": "scene-title",
                              className: t(
                                "text-xs font-bold truncate transition-colors",
                                n ? "text-purple-700 dark:text-purple-300" : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                              ),
                              children: r.title
                            }
                          )
                        ] }) }),
                        /* @__PURE__ */ e("div", { className: "relative aspect-video w-full rounded overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/5", children: /* @__PURE__ */ a("div", { className: "absolute inset-0 flex items-center justify-center", children: [
                          i && o ? /* @__PURE__ */ e(
                            Q,
                            {
                              slide: o.canvas,
                              viewportSize: D,
                              viewportRatio: W,
                              size: Math.max(100, u - 28)
                            }
                          ) : r.type === "quiz" ? (
                            /* Quiz: question bar + 2x2 option grid */
                            /* @__PURE__ */ a("div", { className: "w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 p-2 flex flex-col", children: [
                              /* @__PURE__ */ e("div", { className: "h-1.5 w-4/5 bg-orange-200/70 dark:bg-orange-700/30 rounded-full mb-1.5" }),
                              /* @__PURE__ */ e("div", { className: "flex-1 grid grid-cols-2 gap-1", children: [0, 1, 2, 3].map((d) => /* @__PURE__ */ a(
                                "div",
                                {
                                  className: t(
                                    "rounded flex items-center gap-1 px-1",
                                    d === 1 ? "bg-orange-400/20 dark:bg-orange-500/20 border border-orange-300/50 dark:border-orange-600/30" : "bg-white/60 dark:bg-white/5 border border-orange-100/60 dark:border-orange-800/20"
                                  ),
                                  children: [
                                    /* @__PURE__ */ e(
                                      "div",
                                      {
                                        className: t(
                                          "w-1.5 h-1.5 rounded-full shrink-0",
                                          d === 1 ? "bg-orange-400 dark:bg-orange-500" : "bg-orange-200 dark:bg-orange-700/50"
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ e(
                                      "div",
                                      {
                                        className: t(
                                          "h-1 rounded-full flex-1",
                                          d === 1 ? "bg-orange-300/60 dark:bg-orange-600/40" : "bg-orange-100/80 dark:bg-orange-800/30"
                                        )
                                      }
                                    )
                                  ]
                                },
                                d
                              )) })
                            ] })
                          ) : r.type === "interactive" ? (
                            /* Interactive: browser window with chrome + content */
                            /* @__PURE__ */ a("div", { className: "w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 p-1.5 flex flex-col", children: [
                              /* @__PURE__ */ a("div", { className: "flex items-center gap-1 mb-1 pb-1 border-b border-emerald-200/40 dark:border-emerald-700/20", children: [
                                /* @__PURE__ */ a("div", { className: "flex gap-0.5", children: [
                                  /* @__PURE__ */ e("div", { className: "w-1 h-1 rounded-full bg-red-300 dark:bg-red-500/60" }),
                                  /* @__PURE__ */ e("div", { className: "w-1 h-1 rounded-full bg-amber-300 dark:bg-amber-500/60" }),
                                  /* @__PURE__ */ e("div", { className: "w-1 h-1 rounded-full bg-green-300 dark:bg-green-500/60" })
                                ] }),
                                /* @__PURE__ */ e("div", { className: "h-1.5 flex-1 bg-emerald-200/40 dark:bg-emerald-700/30 rounded-full ml-0.5" })
                              ] }),
                              /* @__PURE__ */ a("div", { className: "flex-1 flex gap-1", children: [
                                /* @__PURE__ */ e("div", { className: "w-1/4 space-y-1 pt-0.5", children: [1, 2, 3].map((d) => /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "h-0.5 w-full bg-emerald-200/60 dark:bg-emerald-700/30 rounded-full"
                                  },
                                  d
                                )) }),
                                /* @__PURE__ */ e("div", { className: "flex-1 bg-emerald-100/40 dark:bg-emerald-800/20 rounded flex items-center justify-center border border-emerald-200/40 dark:border-emerald-700/20", children: /* @__PURE__ */ e(G, { className: "w-4 h-4 text-emerald-300/80 dark:text-emerald-600/50" }) })
                              ] })
                            ] })
                          ) : r.type === "pbl" ? (
                            /* PBL: kanban board with 3 columns */
                            /* @__PURE__ */ a("div", { className: "w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 p-1.5 flex flex-col", children: [
                              /* @__PURE__ */ a("div", { className: "flex items-center gap-1 mb-1.5", children: [
                                /* @__PURE__ */ e("div", { className: "w-1.5 h-1.5 rounded bg-blue-300 dark:bg-blue-600" }),
                                /* @__PURE__ */ e("div", { className: "h-1 w-8 bg-blue-200/60 dark:bg-blue-700/30 rounded-full" })
                              ] }),
                              /* @__PURE__ */ e("div", { className: "flex-1 flex gap-1 overflow-hidden", children: [0, 1, 2].map((d) => /* @__PURE__ */ a(
                                "div",
                                {
                                  className: "flex-1 bg-white/50 dark:bg-white/5 rounded p-0.5 flex flex-col gap-0.5",
                                  children: [
                                    /* @__PURE__ */ e(
                                      "div",
                                      {
                                        className: t(
                                          "h-0.5 w-3 rounded-full mb-0.5",
                                          d === 0 ? "bg-blue-300/70" : d === 1 ? "bg-amber-300/70" : "bg-green-300/70"
                                        )
                                      }
                                    ),
                                    Array.from({
                                      length: d === 0 ? 3 : d === 1 ? 2 : 1
                                    }).map((w, O) => /* @__PURE__ */ e(
                                      "div",
                                      {
                                        className: "h-2 w-full bg-blue-100/60 dark:bg-blue-800/20 rounded border border-blue-200/30 dark:border-blue-700/20"
                                      },
                                      O
                                    ))
                                  ]
                                },
                                d
                              )) })
                            ] })
                          ) : (
                            /* Fallback */
                            /* @__PURE__ */ a("div", { className: "w-full h-full flex flex-col items-center justify-center gap-1 bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-500", children: [
                              /* @__PURE__ */ e(s, { className: "w-4 h-4" }),
                              /* @__PURE__ */ e("span", { className: "text-[9px] font-bold uppercase tracking-wider opacity-80", children: r.type })
                            ] })
                          ),
                          i && /* @__PURE__ */ e(
                            "div",
                            {
                              className: t(
                                "absolute inset-0 bg-purple-500/0 transition-colors",
                                n ? "bg-purple-500/0" : "group-hover:bg-black/5 dark:group-hover:bg-white/5"
                              )
                            }
                          )
                        ] }) })
                      ]
                    },
                    r.id
                  );
                }),
                k.length > 0 && (() => {
                  const r = k[0], l = z.some((o) => o.id === r.id), n = E === r.id, s = _ === "paused", i = v === h;
                  return /* @__PURE__ */ a(
                    "div",
                    {
                      onClick: () => {
                        l || (c ? c(h) : x(h));
                      },
                      className: t(
                        "group relative rounded-lg flex flex-col gap-1 p-1.5 transition-all duration-200",
                        l ? "opacity-100 cursor-default" : "cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50",
                        !l && !i && "opacity-60",
                        i && !l && "bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-200 dark:ring-purple-700 opacity-100"
                      ),
                      children: [
                        /* @__PURE__ */ e("div", { className: "flex justify-between items-center px-2 pt-0.5", children: /* @__PURE__ */ a("div", { className: "flex items-center gap-2 max-w-full", children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: t(
                                "text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                                i && !l ? "bg-purple-600 dark:bg-purple-500 text-white shadow-sm shadow-purple-500/30" : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                              ),
                              children: f.length + 1
                            }
                          ),
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: t(
                                "text-xs font-bold truncate transition-colors",
                                i && !l ? "text-purple-700 dark:text-purple-300" : l ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"
                              ),
                              children: r.title
                            }
                          )
                        ] }) }),
                        /* @__PURE__ */ a(
                          "div",
                          {
                            className: t(
                              "relative aspect-video w-full rounded overflow-hidden ring-1",
                              l ? "bg-red-50/30 dark:bg-red-950/10 ring-red-100 dark:ring-red-900/20" : "bg-gray-100 dark:bg-gray-800 ring-black/5 dark:ring-white/5"
                            ),
                            children: [
                              /* @__PURE__ */ e("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-1.5", children: l ? /* @__PURE__ */ a("div", { className: "flex items-center gap-1 text-xs font-medium text-red-500/90 dark:text-red-400", children: [
                                b ? /* @__PURE__ */ e(
                                  "button",
                                  {
                                    onClick: (o) => {
                                      o.stopPropagation(), A(r.id);
                                    },
                                    disabled: n,
                                    className: "p-1 -ml-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors active:scale-95 disabled:opacity-50 disabled:active:scale-100",
                                    title: g("generation.retryScene"),
                                    children: /* @__PURE__ */ e(
                                      U,
                                      {
                                        className: t("w-3.5 h-3.5", n && "animate-spin")
                                      }
                                    )
                                  }
                                ) : /* @__PURE__ */ e(B, { className: "w-3.5 h-3.5" }),
                                /* @__PURE__ */ e("span", { children: g(n ? "generation.retryingScene" : "stage.generationFailed") })
                              ] }) : /* @__PURE__ */ a(P, { children: [
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: t(
                                      "h-2 w-3/5 bg-gray-200 dark:bg-gray-700 rounded",
                                      !s && "animate-pulse"
                                    )
                                  }
                                ),
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: t(
                                      "h-1.5 w-2/5 bg-gray-200 dark:bg-gray-700 rounded",
                                      !s && "animate-pulse"
                                    )
                                  }
                                ),
                                /* @__PURE__ */ e("span", { className: "text-[9px] font-medium text-gray-400 dark:text-gray-500 mt-0.5", children: g(s ? "stage.paused" : "stage.generating") })
                              ] }) }),
                              !l && !s && /* @__PURE__ */ e("div", { className: "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" })
                            ]
                          }
                        )
                      ]
                    },
                    `generating-${r.id}`
                  );
                })()
              ]
            }
          ),
          /* @__PURE__ */ e("div", { className: "mt-auto" })
        ] })
      ]
    }
  );
}
export {
  pe as SceneSidebar
};
//# sourceMappingURL=scene-sidebar.js.map
