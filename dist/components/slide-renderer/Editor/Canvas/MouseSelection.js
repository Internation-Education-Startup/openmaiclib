import { jsx as x } from "react/jsx-runtime";
function b({
  top: r,
  left: s,
  width: t,
  height: i,
  quadrant: e,
  canvasScale: o
}) {
  const p = {
    left: `${(e === 2 || e === 3 ? s - t : s) * o}px`,
    top: `${(e === 2 || e === 1 ? r - i : r) * o}px`,
    width: `${t * o}px`,
    height: `${i * o}px`
  };
  return /* @__PURE__ */ x(
    "div",
    {
      className: "mouse-selection absolute border-2 border-primary border-dashed z-41",
      style: p
    }
  );
}
export {
  b as MouseSelection
};
//# sourceMappingURL=MouseSelection.js.map
