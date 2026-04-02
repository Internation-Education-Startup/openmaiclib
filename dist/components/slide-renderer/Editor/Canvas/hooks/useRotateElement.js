import { useCallback as A } from "react";
import { useHistorySnapshot as B } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useCanvasOperations as D } from "../../../../../lib/hooks/use-canvas-operations.js";
const F = (e, c) => {
  const a = Math.atan2(e, c);
  return 180 / Math.PI * a;
};
function q(e, c, a, u) {
  const i = D().updateSlide, { addHistorySnapshot: h } = B();
  return {
    rotateElement: A(
      (v, o) => {
        var M;
        const l = v.nativeEvent, d = l instanceof TouchEvent;
        if (d && !((M = l.changedTouches) != null && M.length)) return;
        let m = !0, t = 0;
        const E = o.rotate || 0, T = o.left, X = o.top, Y = o.width, C = o.height, y = T + Y / 2, H = X + C / 2;
        if (!a.current) return;
        const f = a.current.getBoundingClientRect(), g = (s) => {
          if (!m) return;
          const P = s instanceof MouseEvent ? s.pageX : s.changedTouches[0].pageX, w = s instanceof MouseEvent ? s.pageY : s.changedTouches[0].pageY, x = (P - f.left) / u, O = (w - f.top) / u, S = x - y, k = H - O;
          t = F(S, k);
          const n = 5;
          Math.abs(t) <= n ? t = 0 : t > 0 && Math.abs(t - 45) <= n ? t -= t - 45 : t < 0 && Math.abs(t + 45) <= n ? t -= t + 45 : t > 0 && Math.abs(t - 90) <= n ? t -= t - 90 : t < 0 && Math.abs(t + 90) <= n ? t -= t + 90 : t > 0 && Math.abs(t - 135) <= n ? t -= t - 135 : t < 0 && Math.abs(t + 135) <= n ? t -= t + 135 : t > 0 && Math.abs(t - 180) <= n ? t -= t - 180 : t < 0 && Math.abs(t + 180) <= n && (t -= t + 180);
          const b = e.current.map((r) => r.id === o.id && "rotate" in r ? { ...r, rotate: t } : r);
          e.current = b, c(b);
        }, p = () => {
          m = !1, document.onmousemove = null, document.onmouseup = null, document.ontouchmove = null, document.ontouchend = null, E !== t && (i({ elements: e.current }), h());
        };
        d ? (document.ontouchmove = g, document.ontouchend = p) : (document.onmousemove = g, document.onmouseup = p);
      },
      [e, c, a, u, i, h]
    )
  };
}
export {
  q as useRotateElement
};
//# sourceMappingURL=useRotateElement.js.map
