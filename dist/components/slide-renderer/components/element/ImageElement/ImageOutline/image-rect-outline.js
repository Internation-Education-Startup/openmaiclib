import { jsx as s } from "react/jsx-runtime";
import { useElementOutline as a } from "../../hooks/useElementOutline.js";
function u({ width: t, height: e, outline: r, radius: o = "0" }) {
  const { outlineWidth: l, outlineColor: n, strokeDashArray: i } = a(r);
  return r ? /* @__PURE__ */ s("svg", { className: "absolute top-0 left-0 z-[2] overflow-visible", width: t, height: e, children: /* @__PURE__ */ s(
    "rect",
    {
      vectorEffect: "non-scaling-stroke",
      strokeLinecap: "butt",
      strokeMiterlimit: "8",
      fill: "transparent",
      rx: o,
      ry: o,
      width: t,
      height: e,
      stroke: n,
      strokeWidth: l,
      strokeDasharray: i
    }
  ) }) : null;
}
export {
  u as ImageRectOutline
};
//# sourceMappingURL=image-rect-outline.js.map
