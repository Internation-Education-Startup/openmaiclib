import { useCallback as X } from "react";
import { useCanvasStore as Y } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
function v(r) {
  const t = Y.use.canvasScale(), x = Y.use.creatingElement(), S = Y.use.setCreatingElement(), u = X(
    (n) => {
      const { start: e, end: g } = n;
      if (!r.current) return;
      const l = r.current.getBoundingClientRect(), [c, a] = e, [i, m] = g, s = Math.min(c, i), p = Math.max(c, i), o = Math.min(a, m), C = Math.max(a, m), f = (s - l.x) / t, M = (o - l.y) / t, h = (p - s) / t, d = (C - o) / t;
      return { left: f, top: M, width: h, height: d };
    },
    [r, t]
  ), E = X(
    (n) => {
      const { start: e, end: g } = n;
      if (!r.current) return;
      const l = r.current.getBoundingClientRect(), [c, a] = e, [i, m] = g, s = Math.min(c, i), p = Math.max(c, i), o = Math.min(a, m), C = Math.max(a, m), f = (s - l.x) / t, M = (o - l.y) / t, h = (p - s) / t, d = (C - o) / t;
      return {
        left: f,
        top: M,
        start: [c === s ? 0 : h, a === o ? 0 : d],
        end: [i === s ? 0 : h, m === o ? 0 : d]
      };
    },
    [r, t]
  ), y = X(
    (n) => {
      if (!x) return;
      const e = x.type;
      e === "text" || e === "shape" ? u(n) : e === "line" && E(n), S(null);
    },
    [x, u, E, S]
  );
  return {
    formatCreateSelection: u,
    insertElementFromCreateSelection: y
  };
}
export {
  v as useInsertFromCreateSelection
};
//# sourceMappingURL=useInsertFromCreateSelection.js.map
