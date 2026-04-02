import { jsxs as n, jsx as r } from "react/jsx-runtime";
import { useRef as w, useEffect as v } from "react";
import { BookOpen as I, MessageSquare as A, Play as j, MousePointer2 as L, Flashlight as O } from "lucide-react";
import { cn as c } from "../../lib/utils/cn.js";
import { useI18n as C } from "../../lib/hooks/use-i18n.js";
const P = {
  spotlight: {
    Icon: O,
    style: "bg-yellow-50 dark:bg-yellow-500/15 border-yellow-300/40 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-300"
  },
  laser: {
    Icon: L,
    style: "bg-red-50 dark:bg-red-500/15 border-red-300/40 dark:border-red-500/30 text-red-600 dark:text-red-300"
  },
  play_video: {
    Icon: j,
    style: "bg-yellow-50 dark:bg-yellow-500/15 border-yellow-300/40 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-300"
  }
};
function V({ notes: p, currentSceneId: s }) {
  const { t: i } = C(), o = w(null);
  return v(() => {
    if (!s || !o.current) return;
    const t = o.current.querySelector(`[data-scene-id="${s}"]`);
    t && t.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [s]), p.length === 0 ? /* @__PURE__ */ n("div", { className: "h-full flex flex-col items-center justify-center text-center p-6", children: [
    /* @__PURE__ */ r("div", { className: "w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-3 text-purple-300 dark:text-purple-600 ring-1 ring-purple-100 dark:ring-purple-800/30", children: /* @__PURE__ */ r(I, { className: "w-6 h-6" }) }),
    /* @__PURE__ */ r("p", { className: "text-xs font-medium text-gray-500 dark:text-gray-400", children: i("chat.lectureNotes.empty") }),
    /* @__PURE__ */ r("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 mt-1", children: i("chat.lectureNotes.emptyHint") })
  ] }) : /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: "flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 scrollbar-hide",
      children: p.map((t, m) => {
        const d = t.sceneId === s, x = m + 1, b = i("chat.lectureNotes.pageLabel").replace("{n}", String(x));
        return /* @__PURE__ */ n(
          "div",
          {
            "data-scene-id": t.sceneId,
            className: c(
              "relative mb-3 last:mb-0 rounded-lg px-3 py-2.5 transition-colors duration-200",
              d ? "bg-purple-50/80 dark:bg-purple-950/25 ring-1 ring-purple-200/60 dark:ring-purple-700/30" : "bg-gray-50/50 dark:bg-gray-800/30"
            ),
            children: [
              /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mb-1.5", children: [
                /* @__PURE__ */ r(
                  "div",
                  {
                    className: c(
                      "w-2 h-2 rounded-full shrink-0",
                      d ? "bg-purple-500 dark:bg-purple-400 shadow-sm shadow-purple-400/40" : "bg-gray-300 dark:bg-gray-600"
                    )
                  }
                ),
                /* @__PURE__ */ r(
                  "span",
                  {
                    className: c(
                      "text-[10px] font-semibold tracking-wide",
                      d ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-gray-500"
                    ),
                    children: b
                  }
                ),
                d && /* @__PURE__ */ r("span", { className: "text-[9px] font-bold px-1.5 py-px rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300", children: i("chat.lectureNotes.currentPage") })
              ] }),
              /* @__PURE__ */ r("h4", { className: "text-[13px] font-bold text-gray-800 dark:text-gray-100 mb-1.5 leading-snug pl-4", children: t.sceneTitle }),
              /* @__PURE__ */ r("div", { className: "pl-4 space-y-1", children: (() => {
                const a = [];
                let l = [];
                for (const e of t.items)
                  e.kind === "action" && e.type === "discussion" ? (l.length > 0 && (a.push({
                    kind: "trailing",
                    inlineActions: l
                  }), l = []), a.push({ kind: "discussion", label: e.label })) : e.kind === "action" ? l.push(e.type) : (a.push({
                    kind: "speech",
                    inlineActions: l,
                    text: e.text
                  }), l = []);
                return l.length > 0 && a.push({ kind: "trailing", inlineActions: l }), a.map((e, u) => {
                  if (e.kind === "discussion")
                    return /* @__PURE__ */ n(
                      "div",
                      {
                        className: "my-1.5 flex items-start gap-1.5 rounded-md border border-amber-200/60 dark:border-amber-700/30 bg-amber-50/60 dark:bg-amber-900/10 px-2 py-1.5",
                        children: [
                          /* @__PURE__ */ r(A, { className: "w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" }),
                          /* @__PURE__ */ r("span", { className: "text-[11px] leading-snug text-amber-800 dark:text-amber-300", children: e.label })
                        ]
                      },
                      u
                    );
                  const h = (e.kind === "trailing", e.inlineActions);
                  return /* @__PURE__ */ n(
                    "p",
                    {
                      className: "text-[12px] leading-[1.8] text-gray-700 dark:text-gray-300",
                      children: [
                        h.map((y, f) => {
                          const g = P[y];
                          if (!g) return null;
                          const { Icon: k, style: N } = g;
                          return /* @__PURE__ */ r(
                            "span",
                            {
                              className: c(
                                "inline-flex items-center justify-center w-4 h-4 rounded-full border align-middle mr-0.5",
                                N
                              ),
                              children: /* @__PURE__ */ r(k, { className: "w-2.5 h-2.5" })
                            },
                            f
                          );
                        }),
                        e.kind === "speech" ? e.text : null
                      ]
                    },
                    u
                  );
                });
              })() })
            ]
          },
          t.sceneId
        );
      })
    }
  );
}
export {
  V as LectureNotesView
};
//# sourceMappingURL=lecture-notes-view.js.map
