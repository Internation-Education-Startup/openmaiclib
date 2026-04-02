import { jsx as c, jsxs as p, Fragment as k } from "react/jsx-runtime";
import { useMemo as d } from "react";
import { useCanvasStore as e } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { OperateLineHandlers as i } from "../../../../../lib/types/edit.js";
import { ResizeHandler as g } from "./ResizeHandler.js";
function D({
  elementInfo: r,
  handlerVisible: l,
  dragLineElement: y
}) {
  var o;
  const s = e.use.canvasScale(), u = d(
    () => Math.max(r.start[0], r.end[0]),
    [r.start, r.end]
  ), x = d(
    () => Math.max(r.start[1], r.end[1]),
    [r.start, r.end]
  ), v = d(() => {
    const a = [
      {
        handler: i.START,
        style: {
          left: r.start[0] * s + "px",
          top: r.start[1] * s + "px"
        }
      },
      {
        handler: i.END,
        style: {
          left: r.end[0] * s + "px",
          top: r.end[1] * s + "px"
        }
      }
    ];
    if (r.curve || r.broken || r.broken2) {
      const t = r.curve || r.broken || r.broken2;
      a.push({
        handler: i.C,
        style: {
          left: t[0] * s + "px",
          top: t[1] * s + "px"
        }
      });
    } else if (r.cubic) {
      const [t, h] = r.cubic;
      a.push({
        handler: i.C1,
        style: {
          left: t[0] * s + "px",
          top: t[1] * s + "px"
        }
      }), a.push({
        handler: i.C2,
        style: {
          left: h[0] * s + "px",
          top: h[1] * s + "px"
        }
      });
    }
    return a;
  }, [r, s]);
  return /* @__PURE__ */ c("div", { className: "line-element-operate", children: l && /* @__PURE__ */ p(k, { children: [
    v.map((a) => /* @__PURE__ */ c(
      g,
      {
        style: a.style,
        className: "operate-resize-handler",
        onMouseDown: (t) => {
          t.stopPropagation(), y(t, r, a.handler);
        }
      },
      a.handler
    )),
    /* @__PURE__ */ p(
      "svg",
      {
        width: u || 1,
        height: x || 1,
        stroke: r.color,
        className: "absolute left-0 top-0 pointer-events-none origin-top-left",
        style: { transform: `scale(${s})`, overflow: "visible" },
        children: [
          r.curve && /* @__PURE__ */ p("g", { children: [
            /* @__PURE__ */ c(
              "line",
              {
                className: "anchor-line stroke-1 stroke-dasharray-[5_5] opacity-50",
                x1: r.start[0],
                y1: r.start[1],
                x2: r.curve[0],
                y2: r.curve[1]
              }
            ),
            /* @__PURE__ */ c(
              "line",
              {
                className: "anchor-line stroke-1 stroke-dasharray-[5_5] opacity-50",
                x1: r.end[0],
                y1: r.end[1],
                x2: r.curve[0],
                y2: r.curve[1]
              }
            )
          ] }),
          (o = r.cubic) == null ? void 0 : o.map((a, t) => /* @__PURE__ */ p("g", { children: [
            t === 0 && /* @__PURE__ */ c(
              "line",
              {
                className: "anchor-line stroke-1 stroke-dasharray-[5_5] opacity-50",
                x1: r.start[0],
                y1: r.start[1],
                x2: a[0],
                y2: a[1]
              }
            ),
            t === 1 && /* @__PURE__ */ c(
              "line",
              {
                className: "anchor-line stroke-1 stroke-dasharray-[5_5] opacity-50",
                x1: r.end[0],
                y1: r.end[1],
                x2: a[0],
                y2: a[1]
              }
            )
          ] }, t))
        ]
      }
    )
  ] }) });
}
export {
  D as LineElementOperate
};
//# sourceMappingURL=LineElementOperate.js.map
