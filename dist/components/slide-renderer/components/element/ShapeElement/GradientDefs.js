import { jsx as o } from "react/jsx-runtime";
function f({ id: e, type: a, colors: n, rotate: p = 0 }) {
  return a === "linear" ? /* @__PURE__ */ o(
    "linearGradient",
    {
      id: e,
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
      gradientTransform: `rotate(${p},0.5,0.5)`,
      children: n.map((r, t) => /* @__PURE__ */ o("stop", { offset: `${r.pos}%`, stopColor: r.color }, t))
    }
  ) : /* @__PURE__ */ o("radialGradient", { id: e, children: n.map((r, t) => /* @__PURE__ */ o("stop", { offset: `${r.pos}%`, stopColor: r.color }, t)) });
}
export {
  f as GradientDefs
};
//# sourceMappingURL=GradientDefs.js.map
