import { jsx as e, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { cn as r } from "../../lib/utils/cn.js";
import { useI18n as b } from "../../lib/hooks/use-i18n.js";
import { ChevronDown as h, Circle as o, CheckCircle as f, Clock as y } from "lucide-react";
import { AnimatePresence as k, motion as N } from "motion/react";
import { ChatSessionComponent as v } from "./chat-session.js";
const w = {
  qa: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  discussion: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  lecture: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
};
function C(l) {
  switch (l) {
    case "active":
      return /* @__PURE__ */ e(o, { className: "size-2.5 fill-green-500 text-green-500" });
    case "interrupted":
      return /* @__PURE__ */ e(y, { className: "size-2.5 text-yellow-500" });
    case "completed":
      return /* @__PURE__ */ e(f, { className: "size-2.5 text-gray-400" });
    case "idle":
    default:
      return /* @__PURE__ */ e(o, { className: "size-2.5 text-gray-300" });
  }
}
function B({
  sessions: l,
  expandedSessionIds: s,
  isStreaming: c,
  activeBubbleId: p,
  onToggleExpand: u,
  onEndSession: m
}) {
  const { t: g } = b();
  return /* @__PURE__ */ e(x, { children: l.map((t) => {
    const n = s.has(t.id), a = t.status === "active", d = t.type === "lecture" ? "bg-purple-500" : t.type === "qa" ? "bg-blue-500" : "bg-amber-500";
    return /* @__PURE__ */ i(
      "div",
      {
        className: r(
          "rounded-xl border transition-all duration-500 overflow-hidden",
          a ? "border-purple-200 dark:border-purple-700 bg-purple-50/30 dark:bg-purple-900/20 shadow-sm" : "border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50"
        ),
        children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => u(t.id),
              className: "w-full flex items-center gap-1.5 px-3 py-2 text-left hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors",
              children: [
                /* @__PURE__ */ i("span", { className: "relative flex h-2.5 w-2.5 shrink-0", children: [
                  /* @__PURE__ */ e("span", { className: r(d, "relative inline-flex rounded-full h-2.5 w-2.5") }),
                  a && /* @__PURE__ */ e(
                    "span",
                    {
                      className: r(
                        d,
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: r(
                      "text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-px rounded shrink-0",
                      w[t.type]
                    ),
                    children: g(`chat.badge.${t.type}`)
                  }
                ),
                /* @__PURE__ */ e("span", { className: "flex-1 text-[11px] font-semibold text-gray-700 dark:text-gray-300 truncate", children: t.title }),
                /* @__PURE__ */ e("div", { className: "flex items-center gap-1 text-[9px] text-gray-400 dark:text-gray-500", children: C(t.status) }),
                /* @__PURE__ */ e("span", { className: "text-[9px] text-gray-400 dark:text-gray-500 font-medium tabular-nums shrink-0", children: t.messages.length }),
                /* @__PURE__ */ e(
                  h,
                  {
                    className: r(
                      "w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 shrink-0",
                      !n && "-rotate-90"
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e(k, { initial: !1, children: n && /* @__PURE__ */ e(
            N.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.2, ease: "easeInOut" },
              className: "overflow-hidden border-t border-gray-100/50 dark:border-gray-700/50",
              children: /* @__PURE__ */ e("div", { className: "px-2 pb-2 pt-1", children: /* @__PURE__ */ e(
                v,
                {
                  session: t,
                  isActive: a,
                  isStreaming: c && a,
                  activeBubbleId: p,
                  onEndSession: m
                }
              ) })
            }
          ) })
        ]
      },
      t.id
    );
  }) });
}
export {
  B as SessionList
};
//# sourceMappingURL=session-list.js.map
