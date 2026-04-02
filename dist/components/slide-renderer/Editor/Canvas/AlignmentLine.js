import { jsx as o } from "react/jsx-runtime";
function p({ type: e, axis: t, length: i, canvasScale: r }) {
  const d = t.x * r, l = t.y * r, n = e === "vertical" ? { height: `${i * r}px` } : { width: `${i * r}px` };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "alignment-line absolute z-42",
      style: {
        left: `${d}px`,
        top: `${l}px`
      },
      children: /* @__PURE__ */ o(
        "div",
        {
          className: `line ${e === "vertical" ? "border-l border-dashed border-primary -translate-x-0.5" : "border-t border-dashed border-primary -translate-y-0.5"}`,
          style: n
        }
      )
    }
  );
}
export {
  p as AlignmentLine
};
//# sourceMappingURL=AlignmentLine.js.map
