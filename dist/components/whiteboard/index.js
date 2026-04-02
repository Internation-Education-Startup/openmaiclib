import { jsx as e, Fragment as z, jsxs as i } from "react/jsx-runtime";
import { useRef as f, useState as y } from "react";
import { AnimatePresence as v, motion as o } from "motion/react";
import { PencilLine as H, RotateCcw as I, Eraser as O, History as R, Minimize2 as T } from "lucide-react";
import { WhiteboardCanvas as V } from "./whiteboard-canvas.js";
import { WhiteboardHistory as A } from "./whiteboard-history.js";
import { useCanvasStore as c } from "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as w } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { useWhiteboardHistoryStore as k } from "../../lib/store/whiteboard-history.js";
import { createStageAPI as E } from "../../lib/api/stage-api.js";
import { toast as N } from "sonner";
import { useI18n as F } from "../../lib/hooks/use-i18n.js";
function ae({ isOpen: C, onClose: S }) {
  var u, b;
  const { t: r } = F(), s = w.use.stage(), n = c.use.whiteboardClearing(), l = f(!1), [p, h] = y(!1), [_, M] = y(!1), m = f(null), g = k((a) => a.snapshots.length), t = (u = s == null ? void 0 : s.whiteboard) == null ? void 0 : u[0], d = ((b = t == null ? void 0 : t.elements) == null ? void 0 : b.length) || 0, W = E(w), j = async () => {
    if (!t || d === 0 || l.current) return;
    l.current = !0, t.elements && t.elements.length > 0 && k.getState().pushSnapshot(t.elements), c.getState().setWhiteboardClearing(!0);
    const a = Math.min(380 + d * 55, 1400);
    await new Promise((P) => setTimeout(P, a));
    const x = W.whiteboard.delete(t.id);
    c.getState().setWhiteboardClearing(!1), l.current = !1, x.success ? N.success(r("whiteboard.clearSuccess")) : N.error(r("whiteboard.clearError") + x.error);
  };
  return /* @__PURE__ */ e(z, { children: /* @__PURE__ */ e(v, { children: C && /* @__PURE__ */ i(
    o.div,
    {
      initial: { opacity: 0, scale: 0.92, y: 30 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 1.2
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 16,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      },
      className: "absolute inset-4 pointer-events-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-[0_32px_80px_-20px_rgba(0,0,0,0.25)] border-2 border-purple-200/60 dark:border-purple-700/60 flex flex-col overflow-hidden z-[120] ring-4 ring-purple-100/40 dark:ring-purple-800/40",
      children: [
        /* @__PURE__ */ i("div", { className: "h-14 px-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0 bg-white/50 dark:bg-gray-800/50", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400", children: /* @__PURE__ */ e(H, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ e("span", { className: "font-bold text-gray-800 dark:text-gray-200 tracking-tight", children: r("whiteboard.title") })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(v, { children: _ && /* @__PURE__ */ e(
              o.button,
              {
                type: "button",
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.15 },
                onClick: () => {
                  var a;
                  return (a = m.current) == null ? void 0 : a.resetView();
                },
                whileTap: { scale: 0.9 },
                className: "p-2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors",
                title: r("whiteboard.resetView"),
                children: /* @__PURE__ */ e(I, { className: "w-4 h-4" })
              }
            ) }),
            /* @__PURE__ */ e(
              o.button,
              {
                type: "button",
                onClick: j,
                disabled: n || d === 0,
                whileTap: { scale: 0.9 },
                className: "p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40 disabled:pointer-events-none",
                title: r("whiteboard.clear"),
                children: /* @__PURE__ */ e(
                  o.div,
                  {
                    animate: n ? { rotate: [0, -15, 15, -10, 10, 0] } : { rotate: 0 },
                    transition: n ? { duration: 0.5, ease: "easeInOut" } : { duration: 0.2 },
                    children: /* @__PURE__ */ e(O, { className: "w-4 h-4" })
                  }
                )
              }
            ),
            /* @__PURE__ */ i("div", { className: "relative", children: [
              /* @__PURE__ */ i(
                o.button,
                {
                  type: "button",
                  onClick: () => h(!p),
                  whileTap: { scale: 0.9 },
                  className: "relative p-2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors",
                  title: r("whiteboard.history"),
                  children: [
                    /* @__PURE__ */ e(R, { className: "w-4 h-4" }),
                    g > 0 && /* @__PURE__ */ e("span", { className: "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center", children: g })
                  ]
                }
              ),
              /* @__PURE__ */ e(A, { isOpen: p, onClose: () => h(!1) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: S,
                className: "p-2 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors",
                title: r("whiteboard.minimize"),
                children: /* @__PURE__ */ e(T, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden", children: /* @__PURE__ */ e(V, { ref: m, onViewModifiedChange: M }) })
      ]
    }
  ) }) });
}
export {
  ae as Whiteboard
};
//# sourceMappingURL=index.js.map
