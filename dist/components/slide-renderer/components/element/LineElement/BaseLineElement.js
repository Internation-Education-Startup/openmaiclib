import { jsx as r, jsxs as e } from "react/jsx-runtime";
import { useRef as v, useState as D, useMemo as i, useEffect as b } from "react";
import { getLineElementPath as S } from "../../../../../lib/utils/element.js";
import { useElementShadow as E } from "../hooks/useElementShadow.js";
import { LinePointMarker as p } from "./LinePointMarker.js";
const l = 600;
function L({ elementInfo: t, animate: o }) {
  const { shadowStyle: d } = E(t.shadow), h = v(null), [c, u] = D(!o), y = i(() => {
    const s = Math.abs(t.start[0] - t.end[0]);
    return s < 24 ? 24 : s;
  }, [t.start, t.end]), $ = i(() => {
    const s = Math.abs(t.start[1] - t.end[1]);
    return s < 24 ? 24 : s;
  }, [t.start, t.end]), w = i(() => {
    const s = t.width;
    return t.style === "dashed" ? s <= 8 ? `${s * 5} ${s * 2.5}` : `${s * 5} ${s * 1.5}` : t.style === "dotted" ? s <= 8 ? `${s * 1.8} ${s * 1.6}` : `${s * 1.5} ${s * 1.2}` : "0 0";
  }, [t.width, t.style]), g = i(() => S(t), [t]);
  return b(() => {
    if (!o) return;
    const s = h.current;
    if (!s) return;
    const a = s.getTotalLength();
    if (a === 0) {
      const n = setTimeout(() => u(!0), 0);
      return () => clearTimeout(n);
    }
    s.style.strokeDasharray = `${a}`, s.style.strokeDashoffset = `${a}`, s.style.transition = "none", s.getBoundingClientRect(), s.style.transition = `stroke-dashoffset ${l}ms ease-out`, s.style.strokeDashoffset = "0";
    const k = setTimeout(() => {
      s.style.transition = "none", s.style.strokeDasharray = "", s.style.strokeDashoffset = "", u(!0);
    }, l + 50);
    return () => clearTimeout(k);
  }, [o]), /* @__PURE__ */ r(
    "div",
    {
      className: "base-element-line absolute",
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          className: "element-content relative w-full h-full",
          style: { filter: d ? `drop-shadow(${d})` : "" },
          children: /* @__PURE__ */ e(
            "svg",
            {
              overflow: "visible",
              width: y,
              height: $,
              className: "transform-origin-[0_0] overflow-visible",
              children: [
                /* @__PURE__ */ e("defs", { children: [
                  t.points[0] && /* @__PURE__ */ r(
                    p,
                    {
                      id: t.id,
                      position: "start",
                      type: t.points[0],
                      color: t.color,
                      baseSize: t.width
                    }
                  ),
                  t.points[1] && /* @__PURE__ */ r(
                    p,
                    {
                      id: t.id,
                      position: "end",
                      type: t.points[1],
                      color: t.color,
                      baseSize: t.width
                    }
                  )
                ] }),
                /* @__PURE__ */ r(
                  "path",
                  {
                    ref: h,
                    d: g,
                    stroke: t.color,
                    strokeWidth: t.width,
                    strokeDasharray: w,
                    fill: "none",
                    markerStart: c && t.points[0] ? `url(#${t.id}-${t.points[0]}-start)` : "",
                    markerEnd: c && t.points[1] ? `url(#${t.id}-${t.points[1]}-end)` : ""
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
  L as BaseLineElement
};
//# sourceMappingURL=BaseLineElement.js.map
