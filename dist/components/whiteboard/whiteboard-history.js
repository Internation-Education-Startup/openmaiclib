import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { useRef as S, useEffect as N } from "react";
import { AnimatePresence as k, motion as E } from "motion/react";
import { RotateCcw as $ } from "lucide-react";
import { useWhiteboardHistoryStore as u } from "../../lib/store/whiteboard-history.js";
import { useCanvasStore as I } from "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as R } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { createStageAPI as j } from "../../lib/api/stage-api.js";
import { elementFingerprint as H } from "../../lib/utils/element-fingerprint.js";
import { toast as c } from "sonner";
import { useI18n as A } from "../../lib/hooks/use-i18n.js";
function U({ isOpen: l, onClose: d }) {
  const { t: r } = A(), n = u((e) => e.snapshots), h = I.use.whiteboardClearing(), m = S(null);
  N(() => {
    if (!l) return;
    const e = (a) => {
      m.current && !m.current.contains(a.target) && d();
    }, t = setTimeout(() => document.addEventListener("mousedown", e), 0);
    return () => {
      clearTimeout(t), document.removeEventListener("mousedown", e);
    };
  }, [l, d]);
  const y = (e) => {
    if (h) {
      c.error(r("whiteboard.restoreError"));
      return;
    }
    const t = u.getState().getSnapshot(e);
    if (!t) return;
    const g = j(R), i = g.whiteboard.get();
    if (!i.success || !i.data)
      return;
    const x = i.data.id, w = t.fingerprint, v = H(i.data.elements ?? []);
    if (w === v) {
      c.success(r("whiteboard.restored")), d();
      return;
    }
    const f = i.data.elements ?? [];
    f.length > 0 && u.getState().pushSnapshot(f);
    const p = g.whiteboard.update({ elements: t.elements }, x);
    if (!p.success) {
      console.error("Failed to restore whiteboard snapshot:", p.error), c.error(r("whiteboard.restoreError") + (p.error ?? ""));
      return;
    }
    c.success(r("whiteboard.restored")), d();
  }, b = (e) => {
    const t = new Date(e);
    return `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ o(k, { children: l && /* @__PURE__ */ s(
    E.div,
    {
      ref: m,
      initial: { opacity: 0, y: -8, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -8, scale: 0.95 },
      transition: { duration: 0.15 },
      className: "absolute right-0 top-full mt-2 z-[130] w-72 max-h-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col",
      children: [
        /* @__PURE__ */ s("div", { className: "px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between", children: [
          /* @__PURE__ */ o("span", { className: "text-sm font-semibold text-gray-700 dark:text-gray-200", children: r("whiteboard.history") }),
          /* @__PURE__ */ o("span", { className: "text-xs text-gray-400", children: n.length > 0 ? `${n.length}` : "" })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto", children: n.length === 0 ? /* @__PURE__ */ o("div", { className: "px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500", children: r("whiteboard.noHistory") }) : /* @__PURE__ */ o("div", { className: "py-1", children: [...n].reverse().map((e, t) => {
          const a = n.length - 1 - t;
          return /* @__PURE__ */ s(
            "div",
            {
              className: "px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group",
              children: [
                /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ o("div", { className: "text-sm font-medium text-gray-700 dark:text-gray-200 truncate", children: `#${a + 1}` }),
                  /* @__PURE__ */ s("div", { className: "text-xs text-gray-400 dark:text-gray-500 mt-0.5", children: [
                    b(e.timestamp),
                    " ·",
                    " ",
                    r("whiteboard.elementCount").replace(
                      "{count}",
                      String(e.elements.length)
                    )
                  ] })
                ] }),
                /* @__PURE__ */ s(
                  "button",
                  {
                    type: "button",
                    onClick: () => y(a),
                    disabled: h,
                    className: "ml-2 px-2 py-1 text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                    children: [
                      /* @__PURE__ */ o($, { className: "w-3 h-3" }),
                      r("whiteboard.restore")
                    ]
                  }
                )
              ]
            },
            `${e.timestamp}-${a}`
          );
        }) }) })
      ]
    }
  ) });
}
export {
  U as WhiteboardHistory
};
//# sourceMappingURL=whiteboard-history.js.map
