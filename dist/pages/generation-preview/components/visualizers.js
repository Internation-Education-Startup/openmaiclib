import { jsx as e, jsxs as l } from "react/jsx-runtime";
import { useState as p, useEffect as h } from "react";
import { motion as r, AnimatePresence as f } from "motion/react";
import { MessageSquare as u, Focus as v, Play as x, Clapperboard as y, BarChart3 as N, Puzzle as k, Globe as g, MousePointer2 as w, Search as I, ScanLine as z } from "lucide-react";
import { cn as b } from "../../../lib/utils/cn.js";
function R({
  stepId: i,
  outlines: s,
  webSearchSources: d
}) {
  switch (i) {
    case "pdf-analysis":
      return /* @__PURE__ */ e(W, {});
    case "web-search":
      return /* @__PURE__ */ e(j, { sources: d || [] });
    case "outline":
      return /* @__PURE__ */ e(S, { outlines: s || [] });
    case "agent-generation":
      return /* @__PURE__ */ e(B, {});
    case "slide-content":
      return /* @__PURE__ */ e($, {});
    case "actions":
      return /* @__PURE__ */ e(P, {});
    default:
      return null;
  }
}
function W() {
  return /* @__PURE__ */ l("div", { className: "size-32 relative flex items-center justify-center", children: [
    /* @__PURE__ */ e(
      r.div,
      {
        className: "absolute inset-2 bg-cyan-500/5 rounded-2xl blur-lg",
        animate: { opacity: [0.3, 0.6, 0.3] },
        transition: { duration: 2, repeat: 1 / 0 }
      }
    ),
    /* @__PURE__ */ l("div", { className: "w-20 h-28 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ e("div", { className: "p-3 space-y-2 mt-1", children: [80, 60, 90, 45, 70].map((i, s) => /* @__PURE__ */ e(
        r.div,
        {
          className: "h-1.5 bg-slate-100 dark:bg-slate-700 rounded",
          style: { width: `${i}%` },
          animate: { opacity: [0.4, 1, 0.4] },
          transition: { duration: 2, repeat: 1 / 0, delay: s * 0.2 }
        },
        s
      )) }),
      /* @__PURE__ */ e(
        r.div,
        {
          className: "absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)]",
          animate: { top: ["5%", "90%", "5%"] },
          transition: { duration: 2.5, repeat: 1 / 0, ease: "easeInOut" }
        }
      )
    ] }),
    /* @__PURE__ */ e(
      r.div,
      {
        className: "absolute -top-1 -right-1",
        animate: { rotate: [0, 10, -10, 0] },
        transition: { duration: 3, repeat: 1 / 0 },
        children: /* @__PURE__ */ e(z, { className: "size-6 text-cyan-500/70" })
      }
    )
  ] });
}
function j({ sources: i }) {
  const [s, d] = p(0);
  h(() => {
    if (i.length === 0) return;
    const a = setInterval(() => {
      d((t) => (t + 1) % Math.min(i.length, 4));
    }, 1400);
    return () => clearInterval(a);
  }, [i.length]);
  const o = [
    { titleW: 70, urlW: 45, snippetW: [90, 60] },
    { titleW: 55, urlW: 50, snippetW: [80, 75] },
    { titleW: 65, urlW: 40, snippetW: [85, 50] },
    { titleW: 50, urlW: 55, snippetW: [70, 65] }
  ], c = 38;
  return /* @__PURE__ */ l("div", { className: "size-56 relative flex items-center justify-center", children: [
    /* @__PURE__ */ e(
      r.div,
      {
        className: "absolute inset-0 blur-3xl rounded-full bg-teal-500/8",
        animate: { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] },
        transition: { duration: 3.5, repeat: 1 / 0 }
      }
    ),
    /* @__PURE__ */ l("div", { className: "w-44 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative", children: [
      /* @__PURE__ */ l("div", { className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2", children: [
        /* @__PURE__ */ e(I, { className: "size-3 text-teal-500 shrink-0" }),
        /* @__PURE__ */ e("div", { className: "flex-1 h-4 bg-slate-50 dark:bg-slate-700/50 rounded-full overflow-hidden flex items-center px-2", children: /* @__PURE__ */ e(
          r.div,
          {
            className: "h-1.5 bg-teal-500/25 rounded-full",
            initial: { width: 0 },
            animate: { width: "70%" },
            transition: { duration: 0.8, ease: "easeOut" }
          }
        ) })
      ] }),
      /* @__PURE__ */ l("div", { className: "p-2 space-y-0.5 relative", children: [
        i.length > 0 && /* @__PURE__ */ e(
          r.div,
          {
            className: "absolute left-2 right-2 rounded-lg bg-teal-500/[0.06] dark:bg-teal-400/[0.08]",
            style: { height: c - 6 },
            animate: { y: s * c },
            transition: { type: "spring", stiffness: 300, damping: 28 }
          }
        ),
        i.length === 0 ? (
          // Skeleton: pulsing result placeholders
          o.map((a, t) => /* @__PURE__ */ l(
            r.div,
            {
              className: "px-2 py-1.5 space-y-1",
              animate: { opacity: [0.3, 0.7, 0.3] },
              transition: {
                duration: 1.4,
                repeat: 1 / 0,
                delay: t * 0.15
              },
              children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "h-1.5 bg-teal-200/40 dark:bg-teal-800/30 rounded",
                    style: { width: `${a.titleW}%` }
                  }
                ),
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "h-1 bg-slate-100 dark:bg-slate-700 rounded",
                    style: { width: `${a.urlW}%` }
                  }
                ),
                /* @__PURE__ */ e("div", { className: "flex gap-1", children: a.snippetW.map((n, m) => /* @__PURE__ */ e(
                  "div",
                  {
                    className: "h-1 bg-slate-100 dark:bg-slate-700 rounded",
                    style: { width: `${n * 0.5}%` }
                  },
                  m
                )) })
              ]
            },
            t
          ))
        ) : (
          // Live results
          i.slice(0, 4).map((a, t) => {
            const n = t === s;
            return /* @__PURE__ */ l(
              r.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: t * 0.08, duration: 0.25 },
                className: "relative px-2 py-1.5 space-y-0.5",
                children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: b(
                        "text-[8px] font-semibold truncate transition-colors duration-300 leading-tight",
                        n ? "text-teal-600 dark:text-teal-400" : "text-slate-600 dark:text-slate-400"
                      ),
                      children: a.title
                    }
                  ),
                  /* @__PURE__ */ e("div", { className: "text-[6px] text-teal-500/50 truncate leading-tight", children: a.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 32) }),
                  /* @__PURE__ */ l("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ e("div", { className: "h-0.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full" }),
                    /* @__PURE__ */ e("div", { className: "h-0.5 w-1/3 bg-slate-100 dark:bg-slate-700 rounded-full" })
                  ] })
                ]
              },
              a.url
            );
          })
        )
      ] }),
      /* @__PURE__ */ e(
        r.div,
        {
          className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12 pointer-events-none",
          initial: { left: "-150%" },
          animate: { left: "200%" },
          transition: {
            duration: 2,
            repeat: 1 / 0,
            repeatDelay: 2,
            ease: "linear"
          }
        }
      )
    ] }),
    i.length > 0 && /* @__PURE__ */ l(
      r.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 400, damping: 15 },
        className: "absolute -top-2 -right-2 h-6 px-2 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-teal-500/25 z-20 gap-0.5",
        children: [
          /* @__PURE__ */ e(g, { className: "size-2.5" }),
          i.length
        ]
      }
    )
  ] });
}
function S({ outlines: i }) {
  const s = [];
  return i.forEach((d, o) => {
    var c;
    s.push(`${o + 1}. ${d.title}`), (c = d.keyPoints) == null || c.slice(0, 2).forEach((a) => {
      const t = a.length > 18 ? a.substring(0, 18) + "..." : a;
      s.push(`   • ${t}`);
    });
  }), /* @__PURE__ */ l("div", { className: "w-40 h-52 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl p-4 overflow-hidden relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500", children: [
    /* @__PURE__ */ e("div", { className: "absolute top-0 inset-x-0 h-1 bg-blue-500/50" }),
    /* @__PURE__ */ e("div", { className: "w-1/3 h-2 bg-slate-100 dark:bg-slate-700 rounded mb-3" }),
    /* @__PURE__ */ e("div", { className: "space-y-1.5 font-mono text-[8px] text-muted-foreground leading-tight", children: s.length === 0 ? (
      // Waiting for first outline — show placeholder skeleton
      /* @__PURE__ */ e("div", { className: "space-y-2", children: [60, 80, 50, 70].map((d, o) => /* @__PURE__ */ e(
        r.div,
        {
          className: "h-1.5 bg-slate-100 dark:bg-slate-700 rounded",
          style: { width: `${d}%` },
          animate: { opacity: [0.3, 0.7, 0.3] },
          transition: { duration: 1.2, repeat: 1 / 0, delay: o * 0.2 }
        },
        o
      )) })
    ) : s.map((d, o) => /* @__PURE__ */ e(
      r.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        className: b(
          "truncate",
          d.startsWith("   ") ? "pl-1 opacity-80" : "text-blue-600 dark:text-blue-400 font-semibold text-[9px]"
        ),
        children: d
      },
      o
    )) }),
    /* @__PURE__ */ e(
      r.div,
      {
        className: "absolute bottom-3 right-3 size-2 bg-blue-500 rounded-full",
        animate: { opacity: [0, 1, 0] },
        transition: { repeat: 1 / 0, duration: 0.8 }
      }
    )
  ] });
}
function B() {
  return /* @__PURE__ */ e("div", { className: "w-60 h-40 mx-auto flex items-center justify-center", children: /* @__PURE__ */ e("div", { className: "flex gap-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ e(
    r.div,
    {
      className: "w-14 h-20 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 dark:from-purple-600 dark:to-blue-700 shadow-lg",
      animate: { y: [0, -8, 0], rotateZ: [0, 3, -3, 0] },
      transition: {
        duration: 1.5,
        repeat: 1 / 0,
        delay: i * 0.3,
        ease: "easeInOut"
      },
      children: /* @__PURE__ */ e("div", { className: "w-full h-full flex items-center justify-center text-white/80 text-lg font-bold", children: "?" })
    },
    i
  )) }) });
}
function $() {
  const [i, s] = p(0), d = 4;
  h(() => {
    const t = setInterval(() => {
      s((n) => (n + 1) % d);
    }, 3200);
    return () => clearInterval(t);
  }, []);
  const o = {
    enter: { x: 50, opacity: 0, scale: 0.9, rotateY: -15 },
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: { x: -50, opacity: 0, scale: 0.9, rotateY: 15 }
  }, a = ((t) => {
    switch (t) {
      case 0:
        return {
          color: "blue",
          label: "SLIDE",
          badge: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800"
        };
      case 1:
        return {
          color: "purple",
          label: "QUIZ",
          badge: "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800"
        };
      case 2:
        return {
          color: "amber",
          label: "PBL",
          badge: "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800"
        };
      case 3:
        return {
          color: "emerald",
          label: "WEB",
          badge: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800"
        };
      default:
        return { color: "blue", label: "", badge: "" };
    }
  })(i);
  return /* @__PURE__ */ l("div", { className: "size-56 relative flex items-center justify-center perspective-[800px]", children: [
    /* @__PURE__ */ e(
      r.div,
      {
        className: b(
          "absolute inset-0 blur-3xl rounded-full transition-colors duration-1000",
          a.color === "blue" && "bg-blue-500/10",
          a.color === "purple" && "bg-purple-500/10",
          a.color === "amber" && "bg-amber-500/10",
          a.color === "emerald" && "bg-emerald-500/10"
        ),
        animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] },
        transition: { duration: 4, repeat: 1 / 0 }
      },
      `glow-${i}`
    ),
    [0, 1].map((t) => /* @__PURE__ */ e(
      r.div,
      {
        className: b(
          "absolute border rounded-full transition-colors duration-1000",
          a.color === "blue" && "border-blue-500/10",
          a.color === "purple" && "border-purple-500/10",
          a.color === "amber" && "border-amber-500/10",
          a.color === "emerald" && "border-emerald-500/10"
        ),
        style: {
          width: 180 + t * 50,
          height: 180 + t * 50,
          borderStyle: "dashed"
        },
        animate: { rotate: 360 },
        transition: {
          duration: 40 + t * 15,
          ease: "linear",
          repeat: 1 / 0,
          delay: t * -5
        }
      },
      t
    )),
    /* @__PURE__ */ e("div", { className: "w-40 h-28 relative", children: /* @__PURE__ */ e(f, { mode: "popLayout", children: /* @__PURE__ */ l(
      r.div,
      {
        variants: o,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { type: "spring", stiffness: 80, damping: 16 },
        className: b(
          "absolute inset-0 bg-white dark:bg-slate-800 rounded-xl border shadow-xl overflow-hidden flex flex-col p-3 origin-center",
          a.color === "blue" && "border-blue-200 dark:border-blue-900/30",
          a.color === "purple" && "border-purple-200 dark:border-purple-900/30",
          a.color === "amber" && "border-amber-200 dark:border-amber-900/30",
          a.color === "emerald" && "border-emerald-200 dark:border-emerald-900/30"
        ),
        children: [
          /* @__PURE__ */ e(
            r.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.1 },
              className: b(
                "absolute top-1.5 right-1.5 z-20 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm",
                a.badge
              ),
              children: a.label
            }
          ),
          i === 0 && /* @__PURE__ */ l("div", { className: "flex flex-col h-full pt-1", children: [
            /* @__PURE__ */ e(
              r.div,
              {
                initial: { width: "0%" },
                animate: { width: "55%" },
                transition: { delay: 0.2 },
                className: "h-2 bg-blue-500/20 rounded-full mb-3 shrink-0"
              }
            ),
            /* @__PURE__ */ l("div", { className: "flex gap-2 flex-1", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 space-y-2", children: [0.8, 0.9, 0.6, 0.7].map((t, n) => /* @__PURE__ */ e(
                r.div,
                {
                  initial: { width: 0 },
                  animate: { width: `${t * 100}%` },
                  transition: { delay: 0.3 + n * 0.1 },
                  className: "h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full"
                },
                n
              )) }),
              /* @__PURE__ */ e(
                r.div,
                {
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.4 },
                  className: "w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center shrink-0",
                  children: /* @__PURE__ */ e(N, { className: "size-6 text-blue-500/60" })
                }
              )
            ] })
          ] }),
          i === 1 && /* @__PURE__ */ l("div", { className: "flex flex-col h-full justify-center space-y-2 pt-2", children: [
            /* @__PURE__ */ e(
              r.div,
              {
                initial: { y: -5, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { delay: 0.2 },
                className: "flex justify-center mb-1",
                children: /* @__PURE__ */ e("div", { className: "h-2 w-3/4 bg-purple-500/20 rounded-full" })
              }
            ),
            /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-2", children: [0, 1, 2, 3].map((t) => /* @__PURE__ */ l(
              r.div,
              {
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { delay: 0.3 + t * 0.1 },
                className: b(
                  "h-6 rounded border flex items-center px-2",
                  t === 1 ? "bg-purple-500 text-white border-purple-500" : "bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-700"
                ),
                children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: b(
                        "size-1.5 rounded-full mr-2",
                        t === 1 ? "bg-white" : "bg-slate-300"
                      )
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: b(
                        "h-1 w-8 rounded-full",
                        t === 1 ? "bg-white/50" : "bg-slate-200 dark:bg-slate-600"
                      )
                    }
                  )
                ]
              },
              t
            )) })
          ] }),
          i === 2 && /* @__PURE__ */ l("div", { className: "flex flex-col h-full pt-1", children: [
            /* @__PURE__ */ l("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ e(k, { className: "size-3 text-amber-500 shrink-0" }),
              /* @__PURE__ */ e(
                r.div,
                {
                  initial: { width: 0 },
                  animate: { width: "40%" },
                  className: "h-2 bg-amber-500/20 rounded-full"
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "flex-1 flex gap-2 overflow-hidden", children: [0, 1, 2].map((t) => /* @__PURE__ */ l(
              r.div,
              {
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { delay: 0.2 + t * 0.15 },
                className: "flex-1 bg-slate-50 dark:bg-slate-700/30 rounded flex flex-col gap-1 p-1",
                children: [
                  /* @__PURE__ */ e("div", { className: "h-1 w-6 bg-slate-200 dark:bg-slate-600 rounded mb-1" }),
                  [0, 1].map((n) => /* @__PURE__ */ e(
                    "div",
                    {
                      className: "h-3 w-full bg-white dark:bg-slate-600 rounded border border-slate-100 dark:border-slate-500 shadow-sm"
                    },
                    n
                  ))
                ]
              },
              t
            )) })
          ] }),
          i === 3 && /* @__PURE__ */ l("div", { className: "flex flex-col h-full relative pt-1", children: [
            /* @__PURE__ */ l("div", { className: "flex items-center gap-1 mb-2 border-b border-slate-100 dark:border-slate-700 pb-1 pr-10", children: [
              /* @__PURE__ */ l("div", { className: "flex gap-0.5", children: [
                /* @__PURE__ */ e("div", { className: "size-1.5 rounded-full bg-red-400" }),
                /* @__PURE__ */ e("div", { className: "size-1.5 rounded-full bg-amber-400" }),
                /* @__PURE__ */ e("div", { className: "size-1.5 rounded-full bg-green-400" })
              ] }),
              /* @__PURE__ */ e("div", { className: "h-1.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full ml-1" })
            ] }),
            /* @__PURE__ */ l("div", { className: "flex-1 flex gap-2 relative", children: [
              /* @__PURE__ */ e(
                r.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.3 },
                  className: "w-1/3 bg-slate-50 dark:bg-slate-700/30 rounded p-1 space-y-1",
                  children: [1, 2, 3].map((t) => /* @__PURE__ */ e(
                    "div",
                    {
                      className: "h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-full"
                    },
                    t
                  ))
                }
              ),
              /* @__PURE__ */ l("div", { className: "flex-1 bg-emerald-50 dark:bg-emerald-900/10 rounded border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden flex items-center justify-center", children: [
                /* @__PURE__ */ e(g, { className: "size-8 text-emerald-200 dark:text-emerald-800" }),
                /* @__PURE__ */ e(
                  r.div,
                  {
                    className: "absolute",
                    animate: { x: [20, -10, 15, 0], y: [10, -15, 5, 0] },
                    transition: { duration: 3, ease: "easeInOut" },
                    children: /* @__PURE__ */ e(w, { className: "size-3 text-emerald-600 fill-emerald-600" })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e(
            r.div,
            {
              className: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 dark:via-white/10 to-transparent -skew-x-12 pointer-events-none",
              initial: { left: "-150%" },
              animate: { left: "200%" },
              transition: {
                duration: 1.5,
                repeat: 1 / 0,
                repeatDelay: 1,
                ease: "linear"
              }
            }
          )
        ]
      },
      i
    ) }) })
  ] });
}
function P() {
  const [i, s] = p(0), d = [
    {
      icon: u,
      label: "Speech",
      color: "text-violet-500",
      activeBg: "bg-violet-500/10",
      activeBorder: "border-violet-200 dark:border-violet-800"
    },
    {
      icon: v,
      label: "Spotlight",
      color: "text-amber-500",
      activeBg: "bg-amber-500/10",
      activeBorder: "border-amber-200 dark:border-amber-800"
    },
    {
      icon: u,
      label: "Speech",
      color: "text-violet-500",
      activeBg: "bg-violet-500/10",
      activeBorder: "border-violet-200 dark:border-violet-800"
    },
    {
      icon: x,
      label: "Interact",
      color: "text-emerald-500",
      activeBg: "bg-emerald-500/10",
      activeBorder: "border-emerald-200 dark:border-emerald-800"
    },
    {
      icon: u,
      label: "Speech",
      color: "text-violet-500",
      activeBg: "bg-violet-500/10",
      activeBorder: "border-violet-200 dark:border-violet-800"
    }
  ], o = 34;
  return h(() => {
    const c = setInterval(() => {
      s((a) => (a + 1) % d.length);
    }, 1600);
    return () => clearInterval(c);
  }, []), /* @__PURE__ */ l("div", { className: "size-56 relative flex items-center justify-center", children: [
    /* @__PURE__ */ e(
      r.div,
      {
        className: "absolute inset-0 blur-3xl rounded-full bg-violet-500/8",
        animate: { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] },
        transition: { duration: 3.5, repeat: 1 / 0 }
      }
    ),
    /* @__PURE__ */ l("div", { className: "w-44 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden relative", children: [
      /* @__PURE__ */ l("div", { className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2", children: [
        /* @__PURE__ */ e(y, { className: "size-3 text-violet-500" }),
        /* @__PURE__ */ e(
          r.div,
          {
            initial: { width: 0 },
            animate: { width: "50%" },
            transition: { delay: 0.2 },
            className: "h-1.5 bg-violet-500/20 rounded-full"
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { className: "p-2 space-y-1.5 relative", children: [
        /* @__PURE__ */ e(
          r.div,
          {
            className: "absolute left-2 right-2 rounded-lg bg-violet-500/[0.06] dark:bg-violet-400/[0.08]",
            style: { height: o - 6 },
            animate: { y: i * o },
            transition: { type: "spring", stiffness: 300, damping: 28 }
          }
        ),
        d.map((c, a) => {
          const t = c.icon, n = a === i, m = a < i;
          return /* @__PURE__ */ l(
            r.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: m ? 0.4 : 1, x: 0 },
              transition: { delay: 0.1 + a * 0.08, duration: 0.3 },
              className: "relative flex items-center gap-2 px-2 py-1.5 rounded-lg",
              children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: b(
                      "size-4 rounded flex items-center justify-center shrink-0 transition-colors duration-300",
                      n ? c.color : "text-slate-300 dark:text-slate-600"
                    ),
                    children: /* @__PURE__ */ e(t, { className: "size-3" })
                  }
                ),
                /* @__PURE__ */ l("div", { className: "flex-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: b(
                        "text-[8px] font-semibold uppercase tracking-wider transition-colors duration-300",
                        n ? c.color : "text-slate-400 dark:text-slate-500"
                      ),
                      children: c.label
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: b(
                        "h-1 flex-1 rounded-full transition-colors duration-300",
                        n ? "bg-current opacity-20" : "bg-slate-100 dark:bg-slate-700"
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ e(
                  r.div,
                  {
                    className: "size-1.5 rounded-full bg-violet-500",
                    animate: { opacity: n ? [1, 0.3, 1] : 0 },
                    transition: n ? { duration: 0.8, repeat: 1 / 0 } : { duration: 0.2 }
                  }
                )
              ]
            },
            a
          );
        })
      ] })
    ] })
  ] });
}
export {
  R as StepVisualizer
};
//# sourceMappingURL=visualizers.js.map
