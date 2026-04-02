import { jsx as o } from "react/jsx-runtime";
const m = {
  dot: "m0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z",
  arrow: "M0,0 L10,5 0,10 Z"
}, $ = {
  "arrow-start": 180,
  "arrow-end": 0
};
function f({ id: n, position: a, type: t, baseSize: e, color: s }) {
  const c = m[t], i = $[`${t}-${a}`] || 0, r = e < 2 ? 2 : e;
  return /* @__PURE__ */ o(
    "marker",
    {
      id: `${n}-${t}-${a}`,
      markerUnits: "userSpaceOnUse",
      orient: "auto",
      markerWidth: r * 3,
      markerHeight: r * 3,
      refX: r * 1.5,
      refY: r * 1.5,
      children: /* @__PURE__ */ o(
        "path",
        {
          d: c,
          fill: s,
          transform: `scale(${r * 0.3}, ${r * 0.3}) rotate(${i}, 5, 5)`
        }
      )
    }
  );
}
export {
  f as LinePointMarker
};
//# sourceMappingURL=LinePointMarker.js.map
