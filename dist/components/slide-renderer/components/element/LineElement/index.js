import { jsx as t, jsxs as p } from "react/jsx-runtime";
import { useMemo as i } from "react";
import { getLineElementPath as k } from "../../../../../lib/utils/element.js";
import { useElementShadow as v } from "../hooks/useElementShadow.js";
import { LinePointMarker as c } from "./LinePointMarker.js";
function x({ elementInfo: r, selectElement: a }) {
  const { shadowStyle: o } = v(r.shadow), d = (s) => {
    r.lock || (s.stopPropagation(), a == null || a(s, r));
  }, u = i(() => {
    const s = Math.abs(r.start[0] - r.end[0]);
    return s < 24 ? 24 : s;
  }, [r.start, r.end]), $ = i(() => {
    const s = Math.abs(r.start[1] - r.end[1]);
    return s < 24 ? 24 : s;
  }, [r.start, r.end]), w = i(() => {
    const s = r.width;
    return r.style === "dashed" ? s <= 8 ? `${s * 5} ${s * 2.5}` : `${s * 5} ${s * 1.5}` : r.style === "dotted" ? s <= 8 ? `${s * 1.8} ${s * 1.6}` : `${s * 1.5} ${s * 1.2}` : "0 0";
  }, [r.width, r.style]), h = i(() => k(r), [r]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: `editable-element-line absolute pointer-events-none ${r.lock ? "lock" : ""}`,
      style: {
        top: `${r.top}px`,
        left: `${r.left}px`
      },
      children: /* @__PURE__ */ t(
        "div",
        {
          className: "element-content relative w-full h-full",
          style: {
            filter: o ? `drop-shadow(${o})` : ""
          },
          onMouseDown: d,
          onTouchStart: d,
          children: /* @__PURE__ */ p(
            "svg",
            {
              overflow: "visible",
              width: u,
              height: $,
              className: "transform-origin-[0_0]",
              children: [
                /* @__PURE__ */ p("defs", { children: [
                  r.points[0] && /* @__PURE__ */ t(
                    c,
                    {
                      id: r.id,
                      position: "start",
                      type: r.points[0],
                      color: r.color,
                      baseSize: r.width
                    }
                  ),
                  r.points[1] && /* @__PURE__ */ t(
                    c,
                    {
                      id: r.id,
                      position: "end",
                      type: r.points[1],
                      color: r.color,
                      baseSize: r.width
                    }
                  )
                ] }),
                /* @__PURE__ */ t(
                  "path",
                  {
                    className: `line-point pointer-events-auto ${r.lock ? "cursor-default" : "cursor-move"}`,
                    d: h,
                    stroke: r.color,
                    strokeWidth: r.width,
                    strokeDasharray: w,
                    fill: "none",
                    markerStart: r.points[0] ? `url(#${r.id}-${r.points[0]}-start)` : "",
                    markerEnd: r.points[1] ? `url(#${r.id}-${r.points[1]}-end)` : ""
                  }
                ),
                /* @__PURE__ */ t(
                  "path",
                  {
                    className: `line-path pointer-events-auto ${r.lock ? "cursor-default" : "cursor-move"}`,
                    d: h,
                    stroke: "transparent",
                    strokeWidth: "20",
                    fill: "none"
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
}
export {
  x as LineElement
};
//# sourceMappingURL=index.js.map
