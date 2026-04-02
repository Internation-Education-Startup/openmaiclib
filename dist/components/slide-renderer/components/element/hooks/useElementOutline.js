import { useMemo as c } from "react";
function y(r) {
  const $ = c(() => (r == null ? void 0 : r.width) ?? 0, [r == null ? void 0 : r.width]), d = c(() => (r == null ? void 0 : r.style) || "solid", [r == null ? void 0 : r.style]), h = c(() => (r == null ? void 0 : r.color) || "#d14424", [r == null ? void 0 : r.color]), f = c(() => {
    const s = $;
    return d === "dashed" ? s <= 6 ? `${s * 4.5} ${s * 2}` : `${s * 4} ${s * 1.5}` : d === "dotted" ? s <= 6 ? `${s * 1.8} ${s * 1.6}` : `${s * 1.5} ${s * 1.2}` : "0 0";
  }, [$, d]);
  return {
    outlineWidth: $,
    outlineStyle: d,
    outlineColor: h,
    strokeDashArray: f
  };
}
export {
  y as useElementOutline
};
//# sourceMappingURL=useElementOutline.js.map
