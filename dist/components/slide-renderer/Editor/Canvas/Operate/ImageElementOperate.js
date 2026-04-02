import { jsxs as m, jsx as o, Fragment as v } from "react/jsx-runtime";
import { useMemo as a } from "react";
import { useCanvasStore as c } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCommonOperate as w } from "../hooks/useCommonOperate.js";
import { RotateHandler as x } from "./RotateHandler.js";
import { ResizeHandler as H } from "./ResizeHandler.js";
import { BorderLine as N } from "./BorderLine.js";
function f({
  elementInfo: r,
  handlerVisible: d,
  rotateElement: l,
  scaleElement: n
}) {
  const t = c.use.canvasScale(), i = c.use.clipingImageElementId(), g = a(
    () => i === r.id,
    [i, r.id]
  ), s = a(
    () => r.width * t,
    [r.width, t]
  ), h = a(
    () => r.height * t,
    [r.height, t]
  ), { resizeHandlers: u, borderLines: y } = w(s, h);
  return /* @__PURE__ */ m("div", { className: `image-element-operate ${g ? "invisible" : ""}`, children: [
    y.map((e) => /* @__PURE__ */ o(
      N,
      {
        type: e.type,
        style: e.style,
        className: "operate-border-line"
      },
      e.type
    )),
    d && /* @__PURE__ */ m(v, { children: [
      u.map((e) => /* @__PURE__ */ o(
        H,
        {
          type: e.direction,
          rotate: r.rotate,
          style: e.style,
          className: "operate-resize-handler",
          onMouseDown: (p) => {
            p.stopPropagation(), n(p, r, e.direction);
          }
        },
        e.direction
      )),
      /* @__PURE__ */ o(
        x,
        {
          className: "operate-rotate-handler",
          style: { left: s / 2 + "px" },
          onMouseDown: (e) => {
            e.stopPropagation(), l(e, r);
          }
        }
      )
    ] })
  ] });
}
export {
  f as ImageElementOperate
};
//# sourceMappingURL=ImageElementOperate.js.map
