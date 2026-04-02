import { jsx as o } from "react/jsx-runtime";
import { useElementOutline as i } from "../../hooks/useElementOutline.js";
function u({ width: e, height: r, outline: t }) {
  const { outlineWidth: l, outlineColor: s, strokeDashArray: n } = i(t);
  return t ? /* @__PURE__ */ o("svg", { className: "absolute top-0 left-0 z-[2] overflow-visible", width: e, height: r, children: /* @__PURE__ */ o(
    "ellipse",
    {
      vectorEffect: "non-scaling-stroke",
      strokeLinecap: "butt",
      strokeMiterlimit: "8",
      fill: "transparent",
      cx: e / 2,
      cy: r / 2,
      rx: e / 2,
      ry: r / 2,
      stroke: s,
      strokeWidth: l,
      strokeDasharray: n
    }
  ) }) : null;
}
export {
  u as ImageEllipseOutline
};
//# sourceMappingURL=image-ellipse-outline.js.map
