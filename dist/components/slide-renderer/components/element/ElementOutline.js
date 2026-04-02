import { jsx as o } from "react/jsx-runtime";
import { useElementOutline as i } from "./hooks/useElementOutline.js";
function f({ width: e, height: t, outline: r }) {
  const { outlineWidth: l, outlineColor: n, strokeDashArray: s } = i(r);
  return r ? /* @__PURE__ */ o(
    "svg",
    {
      className: "element-outline absolute top-0 left-0 overflow-visible",
      width: e,
      height: t,
      children: /* @__PURE__ */ o(
        "path",
        {
          vectorEffect: "non-scaling-stroke",
          strokeLinecap: "butt",
          strokeMiterlimit: "8",
          fill: "transparent",
          d: `M0,0 L${e},0 L${e},${t} L0,${t} Z`,
          stroke: n,
          strokeWidth: l,
          strokeDasharray: s
        }
      )
    }
  ) : null;
}
export {
  f as ElementOutline
};
//# sourceMappingURL=ElementOutline.js.map
