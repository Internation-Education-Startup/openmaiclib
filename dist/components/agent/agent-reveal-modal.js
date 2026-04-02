import { jsx as e, jsxs as i } from "react/jsx-runtime";
import { useState as y, useRef as g, useEffect as k } from "react";
import { AnimatePresence as w, motion as n } from "motion/react";
import { X as z, Sparkles as N } from "lucide-react";
import { cn as C } from "../../lib/utils/cn.js";
import { useI18n as $ } from "../../lib/hooks/use-i18n.js";
function L(r) {
  return r.startsWith("http") || r.startsWith("/") || r.startsWith("data:");
}
function I(r, l) {
  const d = parseInt(r.slice(1, 3), 16), u = parseInt(r.slice(3, 5), 16), c = parseInt(r.slice(5, 7), 16), m = Math.round(d + (255 - d) * l), h = Math.round(u + (255 - u) * l), b = Math.round(c + (255 - c) * l);
  return `rgb(${m},${h},${b})`;
}
const T = {
  teacher: "👨‍🏫",
  assistant: "🤝",
  student: "🎓"
};
function Z({ agents: r, open: l, onClose: d, onAllRevealed: u }) {
  const { t: c } = $(), [m, h] = y(0), [b, v] = y(!1), p = g(!1), a = g(u);
  a.current = u;
  const x = m >= r.length && r.length > 0;
  return k(() => {
    if (!l) {
      h(0), v(!1), p.current = !1;
      return;
    }
    let t = 0;
    const s = setTimeout(() => {
      if (t = 1, h(1), r.length <= 1) {
        setTimeout(() => {
          var o;
          p.current || (p.current = !0, (o = a.current) == null || o.call(a));
        }, 600);
        return;
      }
      const f = setInterval(() => {
        t++, h(t), t >= r.length && (clearInterval(f), setTimeout(() => {
          var o;
          p.current || (p.current = !0, (o = a.current) == null || o.call(a));
        }, 600));
      }, 500);
      return () => clearInterval(f);
    }, 400);
    return () => clearTimeout(s);
  }, [l, r.length]), k(() => {
    if (!x) return;
    const t = setTimeout(() => v(!0), 800);
    return () => clearTimeout(t);
  }, [x]), /* @__PURE__ */ e(w, { children: l && /* @__PURE__ */ i(
    n.div,
    {
      className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-100/90 backdrop-blur-sm dark:bg-black/70 dark:backdrop-blur-md",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      children: [
        x && /* @__PURE__ */ e(
          n.button,
          {
            className: "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/5 text-zinc-500 backdrop-blur-sm transition-colors hover:bg-black/10 hover:text-zinc-700 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 dark:hover:text-white",
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.2, duration: 0.2 },
            onClick: d,
            children: /* @__PURE__ */ e(z, { className: "size-5" })
          }
        ),
        /* @__PURE__ */ i(
          n.h2,
          {
            className: "mb-8 text-2xl font-bold text-zinc-800 drop-shadow-sm dark:text-white dark:drop-shadow-lg md:text-3xl",
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1, duration: 0.4 },
            children: [
              /* @__PURE__ */ e(N, { className: "mr-2 inline-block size-6 text-amber-500 dark:text-yellow-400" }),
              c("generation.agentRevealTitle")
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap items-stretch justify-center gap-4 px-4 md:gap-5", children: r.map((t, s) => {
          const f = s < m, o = T[t.role] ?? "🎓";
          return /* @__PURE__ */ e(
            n.div,
            {
              className: "group relative",
              style: { width: 196, height: 290, perspective: 900 },
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: s * 0.08, duration: 0.3 },
              children: /* @__PURE__ */ i(
                n.div,
                {
                  className: "relative size-full",
                  style: {
                    transformStyle: b ? "flat" : "preserve-3d"
                  },
                  animate: { rotateY: f ? 0 : 180 },
                  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                  children: [
                    /* @__PURE__ */ e(
                      "div",
                      {
                        className: "absolute inset-0 overflow-clip rounded-2xl",
                        style: { backfaceVisibility: "hidden" },
                        children: /* @__PURE__ */ e(
                          "div",
                          {
                            className: "absolute inset-0 rounded-2xl p-[2px]",
                            style: {
                              background: `linear-gradient(160deg, ${t.color}, ${I(t.color, 0.35)}, ${t.color})`
                            },
                            children: /* @__PURE__ */ i("div", { className: "relative flex size-full flex-col overflow-clip rounded-[14px] bg-white dark:bg-zinc-900", children: [
                              /* @__PURE__ */ i("div", { className: "relative shrink-0 overflow-hidden", style: { height: 56 }, children: [
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "absolute inset-0",
                                    style: {
                                      background: `linear-gradient(135deg, ${t.color}30 0%, ${t.color}10 100%)`
                                    }
                                  }
                                ),
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "absolute inset-0 opacity-[0.04]",
                                    style: {
                                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                                    }
                                  }
                                ),
                                /* @__PURE__ */ i(
                                  "svg",
                                  {
                                    className: "absolute right-0 top-0 size-16 text-white/[0.06]",
                                    viewBox: "0 0 64 64",
                                    children: [
                                      /* @__PURE__ */ e(
                                        "line",
                                        {
                                          x1: "64",
                                          y1: "0",
                                          x2: "0",
                                          y2: "64",
                                          stroke: "currentColor",
                                          strokeWidth: "1"
                                        }
                                      ),
                                      /* @__PURE__ */ e(
                                        "line",
                                        {
                                          x1: "64",
                                          y1: "16",
                                          x2: "16",
                                          y2: "64",
                                          stroke: "currentColor",
                                          strokeWidth: "1"
                                        }
                                      ),
                                      /* @__PURE__ */ e(
                                        "line",
                                        {
                                          x1: "64",
                                          y1: "32",
                                          x2: "32",
                                          y2: "64",
                                          stroke: "currentColor",
                                          strokeWidth: "1"
                                        }
                                      )
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ e("div", { className: "relative z-10 -mt-7 flex justify-center", children: /* @__PURE__ */ e(
                                "div",
                                {
                                  className: "flex size-[50px] items-center justify-center rounded-full border-[2.5px] shadow-lg shadow-black/40",
                                  style: {
                                    borderColor: t.color,
                                    backgroundColor: "#f8f8fc"
                                  },
                                  children: L(t.avatar) ? /* @__PURE__ */ e(
                                    "img",
                                    {
                                      src: t.avatar,
                                      alt: t.name,
                                      className: "size-full rounded-full object-cover"
                                    }
                                  ) : /* @__PURE__ */ e("span", { className: "text-2xl", children: t.avatar || t.name.charAt(0) })
                                }
                              ) }),
                              /* @__PURE__ */ i("div", { className: "mt-1.5 flex flex-col items-center gap-0.5 px-3", children: [
                                /* @__PURE__ */ e(
                                  "h3",
                                  {
                                    className: "max-w-full truncate text-center text-[13px] font-bold tracking-wide",
                                    style: { color: t.color },
                                    children: t.name
                                  }
                                ),
                                /* @__PURE__ */ i(
                                  "span",
                                  {
                                    className: "inline-flex items-center gap-1 rounded-full px-2 py-px text-[10px] font-medium",
                                    style: {
                                      color: t.color,
                                      backgroundColor: `${t.color}12`
                                    },
                                    children: [
                                      /* @__PURE__ */ e("span", { className: "text-[9px]", children: o }),
                                      c(`settings.agentRoles.${t.role}`)
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ i("div", { className: "mx-5 mt-2 flex items-center gap-2", children: [
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "h-px flex-1",
                                    style: {
                                      background: `linear-gradient(to right, transparent, ${t.color}40, transparent)`
                                    }
                                  }
                                ),
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "size-1 rounded-full",
                                    style: { backgroundColor: `${t.color}60` }
                                  }
                                ),
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: "h-px flex-1",
                                    style: {
                                      background: `linear-gradient(to right, transparent, ${t.color}40, transparent)`
                                    }
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ e("div", { className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-3.5 pt-1.5 pb-3", children: /* @__PURE__ */ e("p", { className: "text-left text-[10.5px] leading-[1.65] text-zinc-600 dark:text-zinc-400", children: t.persona }) }),
                              /* @__PURE__ */ e(
                                "div",
                                {
                                  className: "pointer-events-none absolute inset-x-0 bottom-0 h-8",
                                  style: {
                                    background: `linear-gradient(to top, ${t.color}08, transparent)`
                                  }
                                }
                              )
                            ] })
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ e(
                      "div",
                      {
                        className: "absolute inset-0 overflow-hidden rounded-2xl",
                        style: {
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        },
                        children: /* @__PURE__ */ e(
                          "div",
                          {
                            className: "absolute inset-0 rounded-2xl p-[2px]",
                            style: {
                              background: "linear-gradient(160deg, #6366f1, #a855f7, #6366f1)"
                            },
                            children: /* @__PURE__ */ i(
                              "div",
                              {
                                className: "relative flex size-full flex-col items-center justify-center rounded-[14px]",
                                style: {
                                  background: "linear-gradient(145deg, #1e1b4b 0%, #312e81 40%, #1e1b4b 100%)"
                                },
                                children: [
                                  /* @__PURE__ */ e("div", { className: "absolute inset-3 rounded-xl border border-white/[0.08]" }),
                                  /* @__PURE__ */ e(
                                    "svg",
                                    {
                                      className: "absolute left-3 top-3 size-5 text-white/[0.07]",
                                      viewBox: "0 0 20 20",
                                      children: /* @__PURE__ */ e("path", { d: "M10 0 L20 10 L10 20 L0 10 Z", fill: "currentColor" })
                                    }
                                  ),
                                  /* @__PURE__ */ e(
                                    "svg",
                                    {
                                      className: "absolute right-3 top-3 size-5 text-white/[0.07]",
                                      viewBox: "0 0 20 20",
                                      children: /* @__PURE__ */ e("path", { d: "M10 0 L20 10 L10 20 L0 10 Z", fill: "currentColor" })
                                    }
                                  ),
                                  /* @__PURE__ */ e(
                                    "svg",
                                    {
                                      className: "absolute bottom-3 left-3 size-5 text-white/[0.07]",
                                      viewBox: "0 0 20 20",
                                      children: /* @__PURE__ */ e("path", { d: "M10 0 L20 10 L10 20 L0 10 Z", fill: "currentColor" })
                                    }
                                  ),
                                  /* @__PURE__ */ e(
                                    "svg",
                                    {
                                      className: "absolute bottom-3 right-3 size-5 text-white/[0.07]",
                                      viewBox: "0 0 20 20",
                                      children: /* @__PURE__ */ e("path", { d: "M10 0 L20 10 L10 20 L0 10 Z", fill: "currentColor" })
                                    }
                                  ),
                                  /* @__PURE__ */ e(N, { className: "size-9 text-purple-300/70" }),
                                  /* @__PURE__ */ e("span", { className: "mt-1.5 text-xl font-bold text-purple-200/60", children: "?" })
                                ]
                              }
                            )
                          }
                        )
                      }
                    )
                  ]
                }
              )
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ i(
          n.div,
          {
            className: "mt-6 flex flex-col items-center gap-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3 },
            children: [
              /* @__PURE__ */ e("div", { className: "flex gap-1.5", children: r.map((t, s) => /* @__PURE__ */ e(
                "div",
                {
                  className: C(
                    "size-2 rounded-full transition-colors duration-300",
                    s < m ? "bg-zinc-700 dark:bg-white" : "bg-zinc-300 dark:bg-white/30"
                  )
                },
                s
              )) }),
              x && /* @__PURE__ */ e(
                n.button,
                {
                  className: "rounded-full bg-zinc-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white/15 dark:hover:bg-white/25",
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3, duration: 0.3 },
                  onClick: d,
                  children: c("generation.continue")
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
export {
  Z as AgentRevealModal
};
//# sourceMappingURL=agent-reveal-modal.js.map
