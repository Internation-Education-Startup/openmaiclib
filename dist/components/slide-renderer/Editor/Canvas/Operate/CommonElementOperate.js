import { jsxs as p, jsx as e, Fragment as u } from "react/jsx-runtime";
import { useMemo as a } from "react";
import { useCanvasStore as g } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCommonOperate as v } from "../hooks/useCommonOperate.js";
import { RotateHandler as w } from "./RotateHandler.js";
import { ResizeHandler as x } from "./ResizeHandler.js";
import { BorderLine as H } from "./BorderLine.js";
function f({
  elementInfo: r,
  handlerVisible: m,
  rotateElement: c,
  scaleElement: d
}) {
  const o = g.use.canvasScale(), s = a(
    () => r.width * o,
    [r.width, o]
  ), n = a(
    () => r.height * o,
    [r.height, o]
  ), { resizeHandlers: l, borderLines: h } = v(s, n), y = a(
    () => ["chart", "video", "audio"].includes(r.type),
    [r.type]
  );
  return /* @__PURE__ */ p("div", { className: "common-element-operate", children: [
    h.map((t) => /* @__PURE__ */ e(
      H,
      {
        type: t.type,
        style: t.style,
        className: "operate-border-line"
      },
      t.type
    )),
    m && /* @__PURE__ */ p(u, { children: [
      l.map((t) => /* @__PURE__ */ e(
        x,
        {
          type: t.direction,
          rotate: r.rotate,
          style: t.style,
          className: "operate-resize-handler",
          onMouseDown: (i) => {
            i.stopPropagation(), d(i, r, t.direction);
          }
        },
        t.direction
      )),
      !y && /* @__PURE__ */ e(
        w,
        {
          className: "operate-rotate-handler",
          style: { left: s / 2 + "px" },
          onMouseDown: (t) => {
            t.stopPropagation(), c(t, r);
          }
        }
      )
    ] })
  ] });
}
export {
  f as CommonElementOperate
};
//# sourceMappingURL=CommonElementOperate.js.map
