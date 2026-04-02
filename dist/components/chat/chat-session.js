import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { memo as E, useRef as f, useCallback as F, useEffect as R } from "react";
import { motion as S, AnimatePresence as T } from "motion/react";
import { cn as u } from "../../lib/utils/cn.js";
import { useI18n as Q } from "../../lib/hooks/use-i18n.js";
import { AvatarDisplay as U } from "../ui/avatar-display.js";
import { CircleStop as W } from "lucide-react";
import { InlineActionTag as O } from "./inline-action-tag.js";
import { useUserProfileStore as z } from "../../lib/store/user-profile.js";
const L = {
  teacher: "/avatars/teacher.png",
  user: "/avatars/user.png"
}, G = E(function({
  message: o,
  isUser: w,
  isTeacher: l,
  isStreaming: h,
  isLastMessage: s,
  isActive: N
}) {
  const d = o.parts || [], p = !!(h && s), m = d.some(
    (r) => {
      var n;
      return r.type === "text" && r.text || ((n = r.type) == null ? void 0 : n.startsWith("action-"));
    }
  );
  if (!m && N && o.role === "assistant")
    return /* @__PURE__ */ i("div", { className: "flex gap-1.5 items-center py-1.5 px-1", children: [
      /* @__PURE__ */ e(
        "span",
        {
          className: u(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            l ? "bg-purple-400/70 dark:bg-purple-500/70" : "bg-indigo-400/70 dark:bg-indigo-500/70"
          )
        }
      ),
      /* @__PURE__ */ e(
        "span",
        {
          className: u(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            l ? "bg-purple-400/70 dark:bg-purple-500/70" : "bg-indigo-400/70 dark:bg-indigo-500/70"
          ),
          style: { animationDelay: "200ms" }
        }
      ),
      /* @__PURE__ */ e(
        "span",
        {
          className: u(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            l ? "bg-purple-400/70 dark:bg-purple-500/70" : "bg-indigo-400/70 dark:bg-indigo-500/70"
          ),
          style: { animationDelay: "400ms" }
        }
      )
    ] });
  if (!m) return null;
  const x = d.reduce(
    (r, n, g) => n.type === "text" && n.text ? g : r,
    -1
  );
  return /* @__PURE__ */ e(
    "div",
    {
      className: u(
        "inline-block px-2.5 py-1.5 rounded-xl text-[12px] leading-relaxed max-w-full text-left transition-shadow duration-300",
        w ? "bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-tr-sm shadow-sm shadow-purple-300/30 dark:shadow-purple-900/50 ring-1 ring-purple-500/20" : l ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-sm shadow-sm" : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200 border border-indigo-100/50 dark:border-indigo-800/50 rounded-tl-sm"
      ),
      children: /* @__PURE__ */ e("span", { className: "break-words", children: d.map((r, n) => {
        var g, c;
        if (r.type === "text" || r.type === "step-start") {
          const y = r.type === "text" ? r.text : "";
          if (!y) return null;
          const k = n === x;
          return /* @__PURE__ */ i("span", { children: [
            y,
            p && k && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-current opacity-50 animate-pulse ml-1 align-middle" }),
            ((g = o.metadata) == null ? void 0 : g.interrupted) && k && !p && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-red-500 ml-1 align-middle" })
          ] }, `${o.id}-${n}`);
        }
        return (c = r.type) != null && c.startsWith("action-") ? /* @__PURE__ */ e(
          O,
          {
            actionName: r.actionName || r.type.replace("action-", ""),
            state: r.state || "result"
          },
          `${o.id}-action-${n}`
        ) : null;
      }) })
    }
  );
});
function ne({
  session: a,
  isActive: o,
  isStreaming: w,
  activeBubbleId: l,
  onEndSession: h
}) {
  const { t: s } = Q(), N = z((t) => t.avatar), d = f(null), p = f(null), m = f(null), x = a.type === "discussion", r = a.type === "qa", n = (x || r) && a.status === "active", g = a.status === "completed" && (x || r), c = f(!0), y = F(() => {
    const t = d.current;
    t && (c.current = t.scrollHeight - t.scrollTop - t.clientHeight < 40);
  }, []), k = a.messages.length;
  R(() => {
    p.current && (p.current.scrollIntoView({ behavior: "smooth", block: "end" }), c.current = !0);
  }, [k]);
  const C = f(0);
  if (R(() => {
    c.current && (cancelAnimationFrame(C.current), C.current = requestAnimationFrame(() => {
      const t = d.current;
      t && (t.scrollTop = t.scrollHeight);
    }));
  }, [a.messages]), R(() => {
    l && m.current && (m.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    }), c.current = !0);
  }, [l]), a.messages.length === 0 && !o)
    return /* @__PURE__ */ e("div", { className: "h-20 flex items-center justify-center text-center px-2", children: /* @__PURE__ */ e("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: s("chat.noMessages") }) });
  const P = s(x ? "chat.stopDiscussion" : "chat.endQA");
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ i(
      "div",
      {
        ref: d,
        onScroll: y,
        className: "space-y-1 overflow-y-auto scrollbar-hide",
        children: [
          a.messages.map((t, V) => {
            var $, D, j;
            const b = (($ = t.metadata) == null ? void 0 : $.originalRole) === "user", I = ((D = t.metadata) == null ? void 0 : D.originalRole) === "teacher", X = b ? N || L.user : ((j = t.metadata) == null ? void 0 : j.senderAvatar) || L.teacher, v = l === t.id, q = V === a.messages.length - 1;
            return /* @__PURE__ */ i(
              S.div,
              {
                ref: v ? m : void 0,
                initial: { opacity: 0, y: 4 },
                animate: v ? {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 0 0 0 rgba(124, 58, 237, 0)",
                    "0 0 20px 0 rgba(124, 58, 237, 0.15)",
                    "0 0 8px 0 rgba(124, 58, 237, 0.08)"
                  ]
                } : {
                  opacity: 1,
                  y: 0,
                  boxShadow: "0 0 0 0 rgba(124, 58, 237, 0)"
                },
                transition: v ? {
                  boxShadow: {
                    duration: 2.5,
                    repeat: 1 / 0,
                    ease: "easeInOut"
                  },
                  default: { duration: 0.3 }
                } : { duration: 0.3 },
                className: u(
                  "flex gap-2 px-1.5 py-1 rounded-lg border-l-[3px] border-l-transparent transition-[background-color,border-color] duration-300",
                  b && "flex-row-reverse",
                  v && "border-l-violet-500 dark:border-l-violet-400 bg-violet-50/50 dark:bg-violet-900/20"
                ),
                children: [
                  /* @__PURE__ */ e("div", { className: "w-5 h-5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 mt-0.5 ring-1 ring-gray-200/50 dark:ring-gray-700/50", children: /* @__PURE__ */ e(U, { src: X, alt: "avatar", className: "text-xs" }) }),
                  /* @__PURE__ */ i("div", { className: u("flex-1 min-w-0", b && "text-right"), children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: u(
                          "text-[9px] font-bold uppercase tracking-wider block mb-0.5",
                          b ? "text-purple-500 dark:text-purple-400" : I ? "text-purple-400 dark:text-purple-300" : "text-indigo-400 dark:text-indigo-300"
                        ),
                        children: (() => {
                          var B, H;
                          const A = (B = t.metadata) == null ? void 0 : B.agentId;
                          if (A) {
                            const M = s(`settings.agentNames.${A}`);
                            if (M !== `settings.agentNames.${A}`) return M;
                          }
                          return ((H = t.metadata) == null ? void 0 : H.senderName) || s("chat.unknown");
                        })()
                      }
                    ),
                    /* @__PURE__ */ e(
                      G,
                      {
                        message: t,
                        isUser: b,
                        isTeacher: I,
                        isStreaming: !!w,
                        isLastMessage: q,
                        isActive: o
                      }
                    )
                  ] })
                ]
              },
              t.id
            );
          }),
          /* @__PURE__ */ e(T, { children: g && /* @__PURE__ */ i(
            S.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: 1, scaleX: 1 },
              exit: { opacity: 0, scaleX: 0 },
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              className: "mx-3 mt-2 mb-1 flex items-center gap-2",
              children: [
                /* @__PURE__ */ e("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" }),
                /* @__PURE__ */ i("span", { className: "flex items-center gap-1 text-[9px] text-gray-400 dark:text-gray-500 font-medium", children: [
                  /* @__PURE__ */ e(W, { className: "w-2.5 h-2.5" }),
                  s("chat.ended")
                ] }),
                /* @__PURE__ */ e("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" })
              ]
            }
          ) }),
          /* @__PURE__ */ e("div", { ref: p })
        ]
      }
    ),
    /* @__PURE__ */ e(T, { children: n && h && /* @__PURE__ */ i(
      S.button,
      {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 5 },
        whileHover: { scale: 1.02 },
        onClick: () => h(a.id),
        className: "mt-2 mx-2 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-800/50 px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md",
        children: [
          /* @__PURE__ */ i("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ e("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-red-500 opacity-75" }),
            /* @__PURE__ */ e("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-red-500 dark:bg-red-400" })
          ] }),
          P
        ]
      }
    ) })
  ] });
}
export {
  ne as ChatSessionComponent
};
//# sourceMappingURL=chat-session.js.map
