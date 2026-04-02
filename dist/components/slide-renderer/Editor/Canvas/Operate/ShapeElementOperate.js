import { jsxs as c, jsx as h, Fragment as v } from "react/jsx-runtime";
import { useMemo as l } from "react";
import { useCanvasStore as S } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { SHAPE_PATH_FORMULAS as H } from "../../../../../configs/shapes.js";
import { useCommonOperate as P } from "../hooks/useCommonOperate.js";
import { RotateHandler as z } from "./RotateHandler.js";
import { ResizeHandler as F } from "./ResizeHandler.js";
import { BorderLine as M } from "./BorderLine.js";
function W({
  elementInfo: t,
  handlerVisible: m,
  rotateElement: x,
  scaleElement: g,
  moveShapeKeypoint: u
}) {
  const r = S.use.canvasScale(), d = l(
    () => t.width * r,
    [t.width, r]
  ), y = l(
    () => t.height * r,
    [t.height, r]
  ), { resizeHandlers: w, borderLines: b } = P(d, y), f = l(() => {
    if (!t.pathFormula || t.keypoints === void 0) return [];
    const o = H[t.pathFormula];
    return t.keypoints.map((e, a) => {
      const _ = o.getBaseSize[a], s = o.relative[a], i = _(t.width, t.height) * e;
      let p = {};
      return s === "left" ? p = { left: i * r + "px" } : s === "right" ? p = {
        left: (t.width - i) * r + "px"
      } : s === "center" ? p = {
        left: (t.width - i) / 2 * r + "px"
      } : s === "top" ? p = { top: i * r + "px" } : s === "bottom" ? p = {
        top: (t.height - i) * r + "px"
      } : s === "left_bottom" ? p = {
        left: i * r + "px",
        top: t.height * r + "px"
      } : s === "right_bottom" ? p = {
        left: (t.width - i) * r + "px",
        top: t.height * r + "px"
      } : s === "top_right" ? p = {
        left: t.width * r + "px",
        top: i * r + "px"
      } : s === "bottom_right" && (p = {
        left: t.width * r + "px",
        top: (t.height - i) * r + "px"
      }), {
        keypoint: e,
        styles: p
      };
    });
  }, [t, r]);
  return /* @__PURE__ */ c("div", { className: "shape-element-operate", children: [
    b.map((o) => /* @__PURE__ */ h(
      M,
      {
        type: o.type,
        style: o.style,
        className: "operate-border-line"
      },
      o.type
    )),
    m && /* @__PURE__ */ c(v, { children: [
      w.map((o) => /* @__PURE__ */ h(
        F,
        {
          type: o.direction,
          rotate: t.rotate,
          style: o.style,
          className: "operate-resize-handler",
          onMouseDown: (e) => {
            e.stopPropagation(), g(e, t, o.direction);
          }
        },
        o.direction
      )),
      /* @__PURE__ */ h(
        z,
        {
          className: "operate-rotate-handler",
          style: { left: d / 2 + "px" },
          onMouseDown: (o) => {
            o.stopPropagation(), x(o, t);
          }
        }
      ),
      f.map((o, e) => /* @__PURE__ */ h(
        "div",
        {
          className: "operate-keypoint-handler absolute w-[10px] h-[10px] left-0 top-0 m-[-5px_0_0_-5px] border border-primary bg-[#ffe873] rounded-[1px]",
          style: o.styles,
          onMouseDown: (a) => {
            a.stopPropagation(), u(a, t, e);
          }
        },
        e
      ))
    ] })
  ] });
}
export {
  W as ShapeElementOperate
};
//# sourceMappingURL=ShapeElementOperate.js.map
