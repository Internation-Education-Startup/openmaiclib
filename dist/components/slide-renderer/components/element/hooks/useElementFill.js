import { useMemo as t } from "react";
function u(r, i) {
  return {
    fill: t(() => r.pattern ? `url(#${i}-pattern-${r.id})` : r.gradient ? `url(#${i}-gradient-${r.id})` : r.fill || "none", [r.pattern, r.gradient, r.fill, r.id, i])
  };
}
export {
  u as useElementFill
};
//# sourceMappingURL=useElementFill.js.map
