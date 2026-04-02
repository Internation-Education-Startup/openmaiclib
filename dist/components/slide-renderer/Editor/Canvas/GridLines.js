import { jsx as f } from "react/jsx-runtime";
import { useMemo as l } from "react";
import { useCanvasStore as c } from "../../../../lib/store/canvas.js";
import "../../../../lib/store/snapshot.js";
import "../../../../lib/store/keyboard.js";
import "../../../../lib/store/stage.js";
import "../../../../lib/store/settings.js";
import { useSceneSelector as h } from "../../../../lib/contexts/scene-context.js";
function b() {
  const r = c.use.gridLineSize(), i = c.use.viewportRatio(), e = c.use.viewportSize(), s = h(
    (t) => t.canvas.background
  ), p = l(() => {
    const t = (s == null ? void 0 : s.color) || "#fff";
    return `rgba(${t === "#fff" || t.startsWith("#f") || t.startsWith("#e") ? "0, 0, 0" : "255, 255, 255"}, 0.5)`;
  }, [s]), m = l(() => {
    const t = e, a = e * i;
    let n = "";
    for (let o = 0; o <= Math.floor(a / r); o++)
      n += `M0 ${o * r} L${t} ${o * r} `;
    for (let o = 0; o <= Math.floor(t / r); o++)
      n += `M${o * r} 0 L${o * r} ${a} `;
    return n;
  }, [e, i, r]);
  return /* @__PURE__ */ f(
    "svg",
    {
      className: "grid-lines absolute inset-0 pointer-events-none z-40",
      width: e,
      height: e * i,
      viewBox: `0 0 ${e} ${e * i}`,
      children: /* @__PURE__ */ f("path", { d: m, fill: "none", stroke: p, strokeWidth: "1", strokeDasharray: "5 5" })
    }
  );
}
export {
  b as GridLines
};
//# sourceMappingURL=GridLines.js.map
