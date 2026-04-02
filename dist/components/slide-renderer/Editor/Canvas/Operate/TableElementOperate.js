import { jsxs as m, jsx as o, Fragment as y } from "react/jsx-runtime";
import { useMemo as a } from "react";
import { useCanvasStore as g } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCommonOperate as w } from "../hooks/useCommonOperate.js";
import { RotateHandler as b } from "./RotateHandler.js";
import { ResizeHandler as v } from "./ResizeHandler.js";
import { BorderLine as x } from "./BorderLine.js";
function W({
  elementInfo: r,
  handlerVisible: c,
  rotateElement: d,
  scaleElement: l
}) {
  const e = g.use.canvasScale(), s = a(() => r.outline.width || 1, [r.outline.width]), i = a(
    () => (r.width + s) * e,
    [r.width, s, e]
  ), n = a(
    () => r.height * e,
    [r.height, e]
  ), { resizeHandlers: h, borderLines: u } = w(i, n);
  return /* @__PURE__ */ m("div", { className: "table-element-operate", children: [
    u.map((t) => /* @__PURE__ */ o(
      x,
      {
        type: t.type,
        style: t.style,
        className: "operate-border-line"
      },
      t.type
    )),
    c && /* @__PURE__ */ m(y, { children: [
      h.map((t) => /* @__PURE__ */ o(
        v,
        {
          type: t.direction,
          rotate: r.rotate,
          style: t.style,
          className: "operate-resize-handler",
          onMouseDown: (p) => {
            p.stopPropagation(), l(p, r, t.direction);
          }
        },
        t.direction
      )),
      /* @__PURE__ */ o(
        b,
        {
          className: "operate-rotate-handler",
          style: { left: i / 2 + "px" },
          onMouseDown: (t) => {
            t.stopPropagation(), d(t, r);
          }
        }
      )
    ] })
  ] });
}
export {
  W as TableElementOperate
};
//# sourceMappingURL=TableElementOperate.js.map
