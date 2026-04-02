import { useCallback as F } from "react";
import { useHistorySnapshot as B } from "../../../../../lib/hooks/use-history-snapshot.js";
import { SHAPE_PATH_FORMULAS as C } from "../../../../../configs/shapes.js";
import { useCanvasOperations as D } from "../../../../../lib/hooks/use-canvas-operations.js";
function I(f, M, y) {
  const T = D().updateSlide, { addHistorySnapshot: X } = B();
  return {
    moveShapeKeypoint: F(
      (K, h, p = 0) => {
        var A;
        const i = K.nativeEvent, d = i instanceof TouchEvent;
        if (d && !((A = i.changedTouches) != null && A.length)) return;
        let Y = !0;
        const b = d ? i.changedTouches[0].pageX : i.pageX, E = d ? i.changedTouches[0].pageY : i.pageY, P = h.keypoints, u = C[h.pathFormula];
        let S = null;
        if ("editable" in u && u.editable) {
          const e = u.getBaseSize[p], g = u.range[p], m = u.relative[p], a = P[p], c = e(h.width, h.height), v = c * a, [r, t] = g;
          S = { baseSize: c, originPos: v, min: r, max: t, relative: m };
        }
        const _ = (e) => {
          if (!Y) return;
          const g = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX, m = e instanceof MouseEvent ? e.pageY : e.changedTouches[0].pageY, a = (g - b) / y, c = (m - E) / y, v = f.current.map((r) => {
            if (r.id === h.id && S) {
              const { baseSize: t, originPos: n, min: w, max: z, relative: s } = S, H = r;
              let o = 0;
              s === "center" ? o = (n - a * 2) / t : s === "left" ? o = (n + a) / t : s === "right" ? o = (n - a) / t : s === "top" ? o = (n + c) / t : s === "bottom" ? o = (n - c) / t : s === "left_bottom" ? o = (n + a) / t : s === "right_bottom" ? o = (n - a) / t : s === "top_right" ? o = (n + c) / t : s === "bottom_right" && (o = (n - c) / t), o < w && (o = w), o > z && (o = z);
              let l = [];
              return Array.isArray(P) ? (l = [...P], l[p] = o) : l = [o], {
                ...r,
                keypoints: l,
                path: u.formula(H.width, H.height, l)
              };
            }
            return r;
          });
          f.current = v, M(v);
        }, k = (e) => {
          Y = !1, document.ontouchmove = null, document.ontouchend = null, document.onmousemove = null, document.onmouseup = null;
          const g = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX, m = e instanceof MouseEvent ? e.pageY : e.changedTouches[0].pageY;
          b === g && E === m || (T({ elements: f.current }), X());
        };
        d ? (document.ontouchmove = _, document.ontouchend = k) : (document.onmousemove = _, document.onmouseup = k);
      },
      [f, M, y, T, X]
    )
  };
}
export {
  I as useMoveShapeKeypoint
};
//# sourceMappingURL=useMoveShapeKeypoint.js.map
