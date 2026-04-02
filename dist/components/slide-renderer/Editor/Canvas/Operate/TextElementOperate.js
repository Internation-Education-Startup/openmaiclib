import { jsxs as c, jsx as a, Fragment as x } from "react/jsx-runtime";
import { useMemo as o } from "react";
import { useCanvasStore as v } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCommonOperate as g } from "../hooks/useCommonOperate.js";
import { RotateHandler as H } from "./RotateHandler.js";
import { ResizeHandler as z } from "./ResizeHandler.js";
import { BorderLine as w } from "./BorderLine.js";
function T({
  elementInfo: t,
  handlerVisible: l,
  rotateElement: d,
  scaleElement: n
}) {
  const r = v.use.canvasScale(), s = o(
    () => t.width * r,
    [t.width, r]
  ), h = o(
    () => t.height * r,
    [t.height, r]
  ), { textElementResizeHandlers: i, verticalTextElementResizeHandlers: p, borderLines: y } = g(s, h), u = o(
    () => t.vertical ? p : i,
    [t.vertical, i, p]
  );
  return /* @__PURE__ */ c("div", { className: "text-element-operate", children: [
    y.map((e) => /* @__PURE__ */ a(
      w,
      {
        type: e.type,
        style: e.style,
        className: "operate-border-line"
      },
      e.type
    )),
    l && /* @__PURE__ */ c(x, { children: [
      u.map((e) => /* @__PURE__ */ a(
        z,
        {
          type: e.direction,
          rotate: t.rotate,
          style: e.style,
          className: "operate-resize-handler",
          onMouseDown: (m) => {
            m.stopPropagation(), n(m, t, e.direction);
          }
        },
        e.direction
      )),
      /* @__PURE__ */ a(
        H,
        {
          className: "operate-rotate-handler",
          style: { left: s / 2 + "px" },
          onMouseDown: (e) => {
            e.stopPropagation(), d(e, t);
          }
        }
      )
    ] })
  ] });
}
export {
  T as TextElementOperate
};
//# sourceMappingURL=TextElementOperate.js.map
