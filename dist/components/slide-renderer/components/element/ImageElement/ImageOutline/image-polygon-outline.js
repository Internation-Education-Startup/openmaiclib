import { jsx as o } from "react/jsx-runtime";
import { useElementOutline as a } from "../../hooks/useElementOutline.js";
function c({
  width: t,
  height: e,
  createPath: s,
  outline: r
}) {
  const { outlineWidth: l, outlineColor: n, strokeDashArray: i } = a(r);
  return r ? /* @__PURE__ */ o("svg", { className: "absolute top-0 left-0 z-[2] overflow-visible", width: t, height: e, children: /* @__PURE__ */ o(
    "path",
    {
      vectorEffect: "non-scaling-stroke",
      strokeLinecap: "butt",
      strokeMiterlimit: "8",
      fill: "transparent",
      d: s(t, e),
      stroke: n,
      strokeWidth: l,
      strokeDasharray: i
    }
  ) }) : null;
}
export {
  c as ImagePolygonOutline
};
//# sourceMappingURL=image-polygon-outline.js.map
