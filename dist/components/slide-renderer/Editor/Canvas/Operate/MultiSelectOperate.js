import { jsxs as X, jsx as a } from "react/jsx-runtime";
import { useMemo as i, useState as Y, useEffect as E } from "react";
import { useCanvasStore as p } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { getElementListRange as h } from "../../../../../lib/utils/element.js";
import { useCommonOperate as L } from "../hooks/useCommonOperate.js";
import { ResizeHandler as S } from "./ResizeHandler.js";
import { BorderLine as z } from "./BorderLine.js";
function N({ elementList: m, scaleMultiElement: c }) {
  const n = p.use.activeElementIdList(), o = p.use.canvasScale(), r = i(
    () => m.filter((e) => n.includes(e.id)),
    [m, n]
  ), [t, l] = Y({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
  }), u = i(() => (t.maxX - t.minX) * o, [t, o]), d = i(() => (t.maxY - t.minY) * o, [t, o]), { resizeHandlers: f, borderLines: x } = L(u, d);
  E(() => {
    const { minX: e, maxX: s, minY: v, maxY: g } = h(r);
    l({ minX: e, maxX: s, minY: v, maxY: g });
  }, [r]);
  const y = i(() => r.some((e) => !((e.type === "image" || e.type === "shape") && !e.rotate)), [r]);
  return /* @__PURE__ */ X(
    "div",
    {
      className: "multi-select-operate absolute top-0 left-0 z-44",
      style: {
        left: t.minX * o + "px",
        top: t.minY * o + "px",
        pointerEvents: "auto"
        // Enable mouse events for multi-select controls
      },
      children: [
        x.map((e) => /* @__PURE__ */ a(z, { type: e.type, style: e.style }, e.type)),
        !y && f.map((e) => /* @__PURE__ */ a(
          S,
          {
            type: e.direction,
            style: e.style,
            onMouseDown: (s) => {
              s.stopPropagation(), c(s, t, e.direction);
            }
          },
          e.direction
        ))
      ]
    }
  );
}
export {
  N as MultiSelectOperate
};
//# sourceMappingURL=MultiSelectOperate.js.map
