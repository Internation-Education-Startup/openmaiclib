import { useCallback as I } from "react";
import { useKeyboardStore as J } from "../../../../../lib/store/keyboard.js";
import { useCanvasStore as Q } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { OperateLineHandlers as X } from "../../../../../lib/types/edit.js";
import { useHistorySnapshot as V } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useCanvasOperations as W } from "../../../../../lib/hooks/use-canvas-operations.js";
function ct(S, B) {
  const N = W().updateSlide, D = Q.use.canvasScale(), m = J((T) => T.ctrlOrShiftKeyActive()), { addHistorySnapshot: U } = V();
  return {
    dragLineElement: I(
      (T, t, y) => {
        let _ = !0;
        const i = 8, j = T.pageX, q = T.pageY, O = [];
        for (let v = 0; v < S.current.length; v++) {
          const M = S.current[v];
          if (M.type === "line" || M.rotate) continue;
          const P = M.left, p = M.top, x = M.width, r = M.height, o = P + x, s = p + r, n = p + r / 2, C = P + x / 2, c = { x: C, y: p }, f = { x: C, y: s }, w = { x: P, y: n }, A = { x: o, y: n }, d = { x: P, y: p }, g = { x: o, y: p }, l = { x: P, y: s }, k = { x: o, y: s };
          O.push(
            c,
            f,
            w,
            A,
            d,
            g,
            l,
            k
          );
        }
        const F = (v) => {
          if (!_) return;
          const M = v.pageX, P = v.pageY, p = (M - j) / D, x = (P - q) / D;
          let r = t.left + t.start[0], o = t.top + t.start[1], s = t.left + t.end[0], n = t.top + t.end[1];
          const C = t.broken || t.broken2 || t.curve || [0, 0];
          let c = t.left + C[0], f = t.top + C[1];
          const [w, A] = t.cubic || [
            [0, 0],
            [0, 0]
          ];
          let d = t.left + w[0], g = t.top + w[1], l = t.left + A[0], k = t.top + A[1];
          if (y === X.START) {
            r = r + p, o = o + x, Math.abs(r - s) < i && (r = s), Math.abs(o - n) < i && (o = n);
            for (const Y of O) {
              const { x: a, y: E } = Y;
              if (Math.abs(a - r) < i && Math.abs(E - o) < i) {
                r = a, o = E;
                break;
              }
            }
          } else if (y === X.END) {
            s = s + p, n = n + x, Math.abs(r - s) < i && (s = r), Math.abs(o - n) < i && (n = o);
            for (const Y of O) {
              const { x: a, y: E } = Y;
              if (Math.abs(a - s) < i && Math.abs(E - n) < i) {
                s = a, n = E;
                break;
              }
            }
          } else y === X.C ? (c = c + p, f = f + x, Math.abs(c - r) < i && (c = r), Math.abs(f - o) < i && (f = o), Math.abs(c - s) < i && (c = s), Math.abs(f - n) < i && (f = n), Math.abs(c - (r + s) / 2) < i && Math.abs(f - (o + n) / 2) < i && (c = (r + s) / 2, f = (o + n) / 2)) : y === X.C1 ? (d = d + p, g = g + x, Math.abs(d - r) < i && (d = r), Math.abs(g - o) < i && (g = o), Math.abs(d - s) < i && (d = s), Math.abs(g - n) < i && (g = n)) : y === X.C2 && (l = l + p, k = k + x, Math.abs(l - r) < i && (l = r), Math.abs(k - o) < i && (k = o), Math.abs(l - s) < i && (l = s), Math.abs(k - n) < i && (k = n));
          const e = Math.min(r, s), u = Math.min(o, n), H = Math.max(r, s), K = Math.max(o, n), b = [0, 0], h = [H - e, K - u];
          r > s && (b[0] = H - e, h[0] = 0), o > n && (b[1] = K - u, h[1] = 0);
          const z = S.current.map((Y) => {
            if (Y.id === t.id) {
              const a = {
                ...Y,
                left: e,
                top: u,
                start: b,
                end: h
              };
              return y === X.START || y === X.END ? (m ? (t.broken && (a.broken = [c - e, f - u]), t.curve && (a.curve = [c - e, f - u]), t.cubic && (a.cubic = [
                [d - e, g - u],
                [l - e, k - u]
              ])) : (t.broken && (a.broken = [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2]), t.curve && (a.curve = [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2]), t.cubic && (a.cubic = [
                [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2],
                [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2]
              ])), t.broken2 && (a.broken2 = [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2])) : y === X.C ? (t.broken && (a.broken = [c - e, f - u]), t.curve && (a.curve = [c - e, f - u]), t.broken2 && (H - e >= K - u ? a.broken2 = [c - e, a.broken2[1]] : a.broken2 = [a.broken2[0], f - u])) : t.cubic && (a.cubic = [
                [d - e, g - u],
                [l - e, k - u]
              ]), a;
            }
            return Y;
          });
          S.current = z, B(z);
        }, G = (v) => {
          _ = !1, document.onmousemove = null, document.onmouseup = null;
          const M = v.pageX, P = v.pageY;
          j === M && q === P || (N({ elements: S.current }), U());
        };
        document.onmousemove = F, document.onmouseup = G;
      },
      [
        S,
        B,
        D,
        m,
        N,
        U
      ]
    )
  };
}
export {
  ct as useDragLineElement
};
//# sourceMappingURL=useDragLineElement.js.map
