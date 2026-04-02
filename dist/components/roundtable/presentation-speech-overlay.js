import { jsx as e, jsxs as b, Fragment as E } from "react/jsx-runtime";
import { useState as P } from "react";
import { AnimatePresence as k, motion as y } from "motion/react";
import { ChevronUp as R, Play as w, Pause as A, Loader2 as D, Volume2 as L, ChevronDown as U, Repeat as z } from "lucide-react";
import { useI18n as T } from "../../lib/hooks/use-i18n.js";
import { AvatarDisplay as _ } from "../ui/avatar-display.js";
import { cn as h } from "../../lib/utils/cn.js";
import { DEFAULT_TEACHER_AVATAR as B, DEFAULT_STUDENT_AVATAR as N } from "./constants.js";
const j = "w-[min(420px,calc(100vw-3rem))]";
function F({
  playbackView: r,
  participants: a,
  speakingAgentId: i,
  isTopicPending: d,
  fallbackTeacherName: n,
  fallbackStudentName: v,
  fallbackUserName: m,
  userAvatar: l
}) {
  const { phase: o, bubbleRole: u, sourceText: c } = r, s = o === "lecturePlaying" || o === "lecturePaused" || o === "discussionActive" || o === "discussionPaused", x = o === "discussionActive" && u !== null && c === "";
  if (!s || u !== "teacher" && u !== "agent" && u !== "user" || !c && !x) return null;
  const g = a.find((t) => t.role === "teacher"), p = i ? a.find(
    (t) => t.id === i && t.role !== "teacher" && t.role !== "user"
  ) : null;
  if (u === "teacher")
    return {
      key: "teacher",
      role: "teacher",
      side: "left",
      name: (g == null ? void 0 : g.name) || n,
      avatar: (g == null ? void 0 : g.avatar) || B,
      text: c,
      isLoading: x,
      isTopicPending: d
    };
  if (u === "user") {
    const t = a.find((f) => f.role === "user");
    return {
      key: "user",
      role: "user",
      side: "right",
      name: (t == null ? void 0 : t.name) || m,
      avatar: l || (t == null ? void 0 : t.avatar) || N,
      text: c,
      isLoading: x,
      isTopicPending: d
    };
  }
  return {
    key: `agent-${i || "unknown"}`,
    role: "agent",
    side: "right",
    name: (p == null ? void 0 : p.name) || v,
    avatar: (p == null ? void 0 : p.avatar) || N,
    text: c,
    isLoading: x,
    isTopicPending: d
  };
}
function V({
  bubble: r,
  onExpand: a,
  onPlayPause: i,
  isPaused: d
}) {
  return /* @__PURE__ */ b("div", { className: "flex items-center gap-2", onClick: a, children: [
    /* @__PURE__ */ b(
      "div",
      {
        className: h(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl shadow-md cursor-pointer transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
          r.role === "user" ? "bg-violet-50/80 dark:bg-violet-950/70 border-violet-200/70 dark:border-violet-800/60" : r.role === "agent" ? "bg-blue-50/80 dark:bg-blue-950/70 border-blue-200/70 dark:border-blue-800/60" : "bg-white/80 dark:bg-gray-900/85 border-gray-200/70 dark:border-gray-700/70"
        ),
        children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: h(
                "w-6 h-6 rounded-full overflow-hidden border shrink-0",
                r.role === "user" ? "border-violet-300 dark:border-violet-600" : r.role === "agent" ? "border-blue-300 dark:border-blue-600" : "border-purple-200 dark:border-purple-700"
              ),
              children: /* @__PURE__ */ e(_, { src: r.avatar, alt: r.name })
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-xs font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px]", children: r.name }),
          /* @__PURE__ */ e(R, { className: "w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" })
        ]
      }
    ),
    i && /* @__PURE__ */ e(
      "div",
      {
        onClick: (n) => {
          n.stopPropagation(), i();
        },
        className: h(
          "p-2 rounded-full border backdrop-blur-xl shadow-md cursor-pointer transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
          r.role === "user" ? "bg-violet-50/80 dark:bg-violet-950/70 border-violet-200/70 dark:border-violet-800/60 hover:bg-violet-100 dark:hover:bg-violet-900/70" : r.role === "agent" ? "bg-blue-50/80 dark:bg-blue-950/70 border-blue-200/70 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/70" : "bg-white/80 dark:bg-gray-900/85 border-gray-200/70 dark:border-gray-700/70 hover:bg-gray-100 dark:hover:bg-gray-800/70"
        ),
        children: d ? /* @__PURE__ */ e(w, { className: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400 ml-0.5" }) : /* @__PURE__ */ e(A, { className: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400" })
      }
    )
  ] });
}
function C({
  bubble: r,
  onClick: a,
  onCollapse: i,
  audioIndicatorState: d,
  buttonState: n,
  isPaused: v
}) {
  const { t: m } = T();
  return /* @__PURE__ */ b(
    "div",
    {
      "aria-live": "polite",
      onClick: a,
      className: h(
        "relative w-full min-w-0 rounded-3xl border backdrop-blur-xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)] overflow-hidden group/bubble",
        a && "cursor-pointer",
        r.role === "user" ? "bg-violet-50/60 dark:bg-violet-950/55 border-violet-200/70 dark:border-violet-800/60" : r.role === "agent" ? "bg-blue-50/60 dark:bg-blue-950/55 border-blue-200/70 dark:border-blue-800/60" : "bg-white/62 dark:bg-gray-900/82 border-gray-200/70 dark:border-gray-700/70"
      ),
      children: [
        /* @__PURE__ */ b("div", { className: "flex items-center gap-3 px-4 pt-3 pb-2", children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: h(
                "w-10 h-10 rounded-full overflow-hidden border-2 shadow-sm shrink-0",
                r.role === "user" ? "border-violet-300 dark:border-violet-600" : r.role === "agent" ? "border-blue-300 dark:border-blue-600" : "border-purple-200 dark:border-purple-700"
              ),
              children: /* @__PURE__ */ e(_, { src: r.avatar, alt: r.name })
            }
          ),
          /* @__PURE__ */ b("div", { className: "min-w-0", children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: h(
                  "text-[11px] font-semibold uppercase tracking-[0.16em]",
                  r.role === "user" ? "text-violet-500 dark:text-violet-300" : r.role === "agent" ? "text-blue-500 dark:text-blue-300" : "text-purple-500 dark:text-purple-300"
                ),
                children: r.role === "user" ? m("roundtable.you") : r.role === "agent" ? m("settings.agentRoles.student") : m("settings.agentRoles.teacher")
              }
            ),
            /* @__PURE__ */ b("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e("div", { className: "text-sm font-medium text-gray-900 dark:text-gray-100 truncate", children: r.name }),
              d === "generating" && /* @__PURE__ */ e(D, { className: "w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-spin" }),
              d === "playing" && /* @__PURE__ */ e(L, { className: "w-3.5 h-3.5 text-gray-500 dark:text-gray-400" })
            ] })
          ] }),
          i && /* @__PURE__ */ e(
            "div",
            {
              onClick: (l) => {
                l.stopPropagation(), i();
              },
              className: "absolute top-2 right-2 p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors duration-200 cursor-pointer z-10",
              children: /* @__PURE__ */ e(U, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "ml-4 mr-10 mb-4 max-h-[140px] overflow-y-auto scrollbar-hide", children: r.isLoading ? /* @__PURE__ */ e("div", { className: "flex gap-1 items-center py-1", children: [0, 0.2, 0.4].map((l) => /* @__PURE__ */ e(
          y.div,
          {
            animate: { opacity: [0.3, 1, 0.3] },
            transition: { repeat: 1 / 0, duration: 1, delay: l },
            className: h(
              "w-1.5 h-1.5 rounded-full",
              r.role === "user" ? "bg-violet-400 dark:bg-violet-500" : r.role === "agent" ? "bg-blue-400 dark:bg-blue-500" : "bg-purple-400 dark:bg-purple-500"
            )
          },
          l
        )) }) : /* @__PURE__ */ b("p", { className: "text-[15px] leading-relaxed whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100", children: [
          r.text,
          r.isTopicPending && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-red-500 ml-1 align-middle" })
        ] }) }),
        r.role !== "user" && !r.isLoading && n && n !== "none" && (() => {
          const l = r.role === "agent" ? "#3b82f6" : "#a855f7";
          return n === "play" ? /* @__PURE__ */ e(
            "div",
            {
              onClick: (o) => {
                o.stopPropagation(), a == null || a();
              },
              className: "absolute right-2.5 bottom-2.5 z-20 p-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300 cursor-pointer",
              children: /* @__PURE__ */ e(w, { className: "w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400 ml-0.5" })
            }
          ) : n === "restart" ? /* @__PURE__ */ e(
            "div",
            {
              onClick: (o) => {
                o.stopPropagation(), a == null || a();
              },
              className: "absolute right-2.5 bottom-2.5 z-20 p-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300 cursor-pointer",
              children: /* @__PURE__ */ e(z, { className: "w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400" })
            }
          ) : /* @__PURE__ */ e(
            "div",
            {
              onClick: (o) => {
                o.stopPropagation(), a == null || a();
              },
              className: "absolute right-2.5 bottom-2.5 z-20 p-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300 cursor-pointer",
              children: v ? /* @__PURE__ */ e(w, { className: "w-3.5 h-3.5 text-amber-500 dark:text-amber-400 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400 ml-0.5" }) : /* @__PURE__ */ b(E, { children: [
                /* @__PURE__ */ b("div", { className: "flex gap-0.5 items-end justify-center h-3.5 w-3.5 group-hover/bubble:hidden", children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: "w-1 rounded-full",
                      style: {
                        backgroundColor: l,
                        animation: "breathing-bar-1 0.6s ease-in-out infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: "w-1 rounded-full",
                      style: {
                        backgroundColor: l,
                        animation: "breathing-bar-2 0.4s ease-in-out infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: "w-1 rounded-full",
                      style: {
                        backgroundColor: l,
                        animation: "breathing-bar-3 0.5s ease-in-out infinite"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ e(A, { className: "w-3.5 h-3.5 text-purple-600 dark:text-purple-400 hidden group-hover/bubble:block" })
              ] })
            }
          );
        })()
      ]
    }
  );
}
function J({
  playbackView: r,
  participants: a,
  speakingAgentId: i,
  isTopicPending: d,
  userAvatar: n,
  side: v = "left",
  onBubbleClick: m,
  audioIndicatorState: l,
  buttonState: o,
  isPaused: u
}) {
  const { t: c } = T(), s = F({
    playbackView: r,
    participants: a,
    speakingAgentId: i,
    isTopicPending: d,
    fallbackTeacherName: c("roundtable.teacher"),
    fallbackStudentName: c("settings.agentRoles.student"),
    fallbackUserName: c("roundtable.you"),
    userAvatar: n
  }), [x, g] = P(!1), p = !!(s && s.side === v), t = (f) => /* @__PURE__ */ e(k, { mode: "wait", initial: !1, children: x ? /* @__PURE__ */ e(
    y.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.18 },
      children: /* @__PURE__ */ e(
        V,
        {
          bubble: f,
          onExpand: () => g(!1),
          onPlayPause: m,
          isPaused: u
        }
      )
    },
    "collapsed"
  ) : /* @__PURE__ */ e(
    y.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.18 },
      className: j,
      children: /* @__PURE__ */ e(
        C,
        {
          bubble: f,
          onClick: m,
          onCollapse: () => g(!0),
          audioIndicatorState: l,
          buttonState: o,
          isPaused: u
        }
      )
    },
    "expanded"
  ) });
  return v === "left" ? /* @__PURE__ */ e("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ e(k, { mode: "wait", children: p && s && /* @__PURE__ */ e(
    y.div,
    {
      initial: { opacity: 0, x: -20, y: 12 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.22, ease: [0.21, 1, 0.36, 1] },
      className: "absolute bottom-6 left-6 z-30 pointer-events-auto",
      children: t(s)
    },
    s.key
  ) }) }) : /* @__PURE__ */ e(k, { mode: "wait", children: p && s && /* @__PURE__ */ e(
    y.div,
    {
      initial: { opacity: 0, x: 20, y: 12 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.22, ease: [0.21, 1, 0.36, 1] },
      className: "pointer-events-auto",
      children: t(s)
    },
    s.key
  ) });
}
export {
  C as PresentationBubbleCard,
  J as PresentationSpeechOverlay,
  F as buildPresentationBubbleModel
};
//# sourceMappingURL=presentation-speech-overlay.js.map
