import { jsx as r, jsxs as a } from "react/jsx-runtime";
import { useState as w, useRef as q, useCallback as z, useEffect as h } from "react";
import { createPortal as D } from "react-dom";
import { motion as F } from "motion/react";
import { X as T, Play as N, Pause as W } from "lucide-react";
import { useI18n as X } from "../../lib/hooks/use-i18n.js";
const u = 256, P = 12, J = ({
  action: C,
  mode: s,
  anchorRef: x,
  align: I = "right",
  portalContainer: j,
  agentName: g,
  agentAvatar: y,
  agentColor: p,
  onSkip: f,
  onListen: M,
  onTogglePause: $
}) => {
  const { t: i } = X(), [l, O] = w(100), k = q(!1), n = s === "paused", [d, _] = w(null), v = z(() => {
    const e = x.current;
    if (!e) return;
    const t = e.getBoundingClientRect(), c = t.left + t.width / 2, m = t.top;
    let o = c - u / 2;
    o = Math.max(
      P,
      Math.min(window.innerWidth - u - P, o)
    );
    const b = Math.max(16, Math.min(u - 16, c - o)), R = window.innerHeight - m + 12;
    _({ left: o, bottom: R, tailOffset: b });
  }, [x]);
  if (h(() => {
    let e;
    const t = () => {
      v(), e = requestAnimationFrame(t);
    };
    return e = requestAnimationFrame(t), () => cancelAnimationFrame(e);
  }, [v]), h(() => {
    if (s !== "playback") return;
    const e = 5e3, t = 50, c = t / e * 100, m = setInterval(() => {
      O((o) => {
        const b = o - c;
        return b <= 0 ? (clearInterval(m), 0) : b;
      });
    }, t);
    return () => clearInterval(m);
  }, [s]), h(() => {
    l <= 0 && !k.current && s === "playback" && (k.current = !0, f());
  }, [l, f, s]), !d) return null;
  const A = /* @__PURE__ */ r(
    F.div,
    {
      initial: { opacity: 0, y: 10, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
      className: "fixed w-64 z-[9999] pointer-events-auto",
      style: {
        left: d.left,
        bottom: d.bottom,
        ...I === "left" ? { transformOrigin: "bottom left" } : { transformOrigin: "bottom right" }
      },
      children: /* @__PURE__ */ a("div", { className: "relative", children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation(), f();
            },
            className: "absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all z-20 group/close",
            title: i("proactiveCard.skip"),
            children: /* @__PURE__ */ r(T, { className: "w-3 h-3 stroke-[2.5]" })
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: "absolute -bottom-[6px] w-3 h-3 bg-white dark:bg-gray-800 border-b border-r border-gray-100 dark:border-gray-700 z-10",
            style: {
              left: `${d.tailOffset}px`,
              transform: "translateX(-50%) rotate(45deg)"
            }
          }
        ),
        /* @__PURE__ */ a("div", { className: "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 flex flex-col gap-2.5 relative overflow-hidden", children: [
          /* @__PURE__ */ r("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gray-50/50 dark:bg-gray-700/50", children: /* @__PURE__ */ r(
            "div",
            {
              className: `h-full transition-all duration-[50ms] ease-linear ${n ? "bg-gray-300 dark:bg-gray-600" : "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600"}`,
              style: { width: `${l}%` }
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-2 px-0.5 pt-1", children: [
            y && /* @__PURE__ */ r("div", { className: "w-6 h-6 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ r(
              "img",
              {
                src: y,
                alt: g || "",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5 flex-1 min-w-0", children: [
              g && /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-gray-700 dark:text-gray-300 truncate", children: g }),
              /* @__PURE__ */ r(
                "span",
                {
                  className: "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full shrink-0",
                  style: {
                    color: p || "#d97706",
                    backgroundColor: p ? `${p}18` : "rgba(217, 119, 6, 0.08)"
                  },
                  children: i("proactiveCard.discussion")
                }
              )
            ] }),
            /* @__PURE__ */ a(
              "span",
              {
                className: `text-[10px] font-bold tabular-nums shrink-0 ${n ? "text-gray-300 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"}`,
                children: [
                  Math.max(0, Math.ceil(l / 100 * 5)),
                  "s"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ r("p", { className: "text-[13px] font-bold text-gray-800 dark:text-gray-200 leading-snug px-0.5", children: C.topic }),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ a(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation(), M();
                },
                className: "flex-1 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white text-[11px] font-black rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] shadow-sm shadow-amber-200/50 dark:shadow-amber-800/50",
                children: [
                  /* @__PURE__ */ r(N, { className: "w-3 h-3 fill-current" }),
                  " ",
                  i("proactiveCard.join")
                ]
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation(), $();
                },
                className: `p-2 aspect-square rounded-lg border transition-colors active:scale-90 ${n ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/50" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 border-gray-100 dark:border-gray-600"}`,
                title: i(n ? "proactiveCard.resume" : "proactiveCard.pause"),
                children: n ? /* @__PURE__ */ r(N, { className: "w-3 h-3 fill-current" }) : /* @__PURE__ */ r(W, { className: "w-3 h-3 fill-current" })
              }
            )
          ] })
        ] })
      ] })
    }
  );
  return D(A, j || document.body);
};
export {
  J as ProactiveCard
};
//# sourceMappingURL=proactive-card.js.map
