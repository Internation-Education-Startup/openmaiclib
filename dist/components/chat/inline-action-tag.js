import { jsxs as w, jsx as r } from "react/jsx-runtime";
import { cn as o } from "../../lib/utils/cn.js";
import { MessageSquare as y, Minus as p, Table2 as x, Sigma as m, BarChart3 as u, Shapes as h, Type as _, Trash2 as g, Eraser as k, PanelLeftClose as I, PanelLeftOpen as T, Play as S, MousePointer2 as L, Flashlight as v, Zap as C, PenLine as E, Loader2 as N } from "lucide-react";
const l = "bg-violet-50 dark:bg-violet-500/15 border-violet-300/40 dark:border-violet-500/30 text-violet-600 dark:text-violet-300", P = "bg-violet-500 dark:bg-violet-400", b = "bg-yellow-50 dark:bg-yellow-500/15 border-yellow-300/40 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-300", f = "bg-red-50 dark:bg-red-500/15 border-red-300/40 dark:border-red-500/30 text-red-600 dark:text-red-300", A = "bg-amber-50 dark:bg-amber-500/15 border-amber-300/40 dark:border-amber-500/30 text-amber-700 dark:text-amber-300", O = "bg-gray-50 dark:bg-gray-500/15 border-gray-300/40 dark:border-gray-500/30 text-gray-600 dark:text-gray-300", Y = {
  // Slide effects
  spotlight: { label: "Spotlight", Icon: v, style: b },
  laser: { label: "Laser", Icon: L, style: f },
  play_video: { label: "Play", Icon: S, style: b },
  // Whiteboard lifecycle
  wb_open: { label: "Open", Icon: T, style: l, wb: !0 },
  wb_close: { label: "Close", Icon: I, style: l, wb: !0 },
  wb_clear: { label: "Clear", Icon: k, style: l, wb: !0 },
  wb_delete: { label: "Delete", Icon: g, style: l, wb: !0 },
  // Whiteboard drawing
  wb_draw_text: { label: "Text", Icon: _, style: l, wb: !0 },
  wb_draw_shape: { label: "Shape", Icon: h, style: l, wb: !0 },
  wb_draw_chart: { label: "Chart", Icon: u, style: l, wb: !0 },
  wb_draw_latex: { label: "Formula", Icon: m, style: l, wb: !0 },
  wb_draw_table: { label: "Table", Icon: x, style: l, wb: !0 },
  wb_draw_line: { label: "Line", Icon: p, style: l, wb: !0 },
  // Social
  discussion: { label: "Discuss", Icon: y, style: A }
};
function j({ actionName: t, state: a }) {
  const e = Y[t], d = (e == null ? void 0 : e.Icon) || C, i = (e == null ? void 0 : e.label) || t, c = (e == null ? void 0 : e.style) || O, s = (e == null ? void 0 : e.wb) ?? !1, n = a === "running" || a === "input-available";
  return /* @__PURE__ */ w(
    "span",
    {
      className: o(
        "inline-flex items-center mx-1 rounded-full border align-middle leading-none whitespace-nowrap",
        "text-[9px] font-bold tracking-wide",
        // Slightly tighter padding when wb accent is present (accent provides left visual weight)
        s ? "pl-0.5 pr-1.5 py-px" : "px-1.5 py-px",
        c,
        n && "animate-pulse"
      ),
      children: [
        s && /* @__PURE__ */ r(
          "span",
          {
            className: o(
              "inline-flex items-center justify-center rounded-full mr-0.5 shrink-0",
              "w-3 h-3",
              P
            ),
            children: /* @__PURE__ */ r(E, { className: "w-[7px] h-[7px] text-white dark:text-violet-950", strokeWidth: 2.5 })
          }
        ),
        n ? /* @__PURE__ */ r(N, { className: "w-2.5 h-2.5 animate-spin shrink-0" }) : /* @__PURE__ */ r(d, { className: "w-2.5 h-2.5 shrink-0" }),
        /* @__PURE__ */ r("span", { className: "ml-0.5", children: i })
      ]
    }
  );
}
export {
  j as InlineActionTag
};
//# sourceMappingURL=inline-action-tag.js.map
