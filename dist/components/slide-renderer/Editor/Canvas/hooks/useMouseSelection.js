import { useState as v, useCallback as R } from "react";
import { useKeyboardStore as V } from "../../../../../lib/store/keyboard.js";
import { useCanvasStore as I } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { getElementRange as W } from "../../../../../lib/utils/element.js";
function G(g, h) {
  const [C, S] = v(!1), [u, E] = v(1), [d, L] = v({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  }), f = I.use.canvasScale(), b = I.use.hiddenElementIdList(), X = I.use.setActiveElementIdList(), Y = V((p) => p.ctrlOrShiftKeyActive()), K = R(
    (p) => {
      if (!h.current) return;
      let y = !0;
      const w = h.current.getBoundingClientRect(), x = 5, A = p.pageX, P = p.pageY, k = (A - w.x) / f, H = (P - w.y) / f;
      L({
        top: H,
        left: k,
        width: 0,
        height: 0
      }), S(!1), E(4);
      const O = (r) => {
        if (!y) return;
        const M = r.pageX, i = r.pageY, t = (M - A) / f, o = (i - P) / f, e = Math.abs(t), n = Math.abs(o);
        if (e < x || n < x) return;
        let s = 0;
        t > 0 && o > 0 ? s = 4 : t < 0 && o < 0 ? s = 2 : t > 0 && o < 0 ? s = 1 : t < 0 && o > 0 && (s = 3), L((c) => ({
          ...c,
          width: e,
          height: n
        })), S(!0), E(s);
      }, Q = () => {
        document.onmousemove = null, document.onmouseup = null, y = !1;
        let r = [];
        for (const i of g.current) {
          const t = d.left, o = d.top, e = d.width, n = d.height, { minX: s, maxX: c, minY: a, maxY: m } = W(i);
          let l = !1;
          Y ? u === 4 ? l = c > t && s < t + e && m > o && a < o + n : u === 2 ? l = c > t - e && s < t - e + e && m > o - n && a < o - n + n : u === 1 ? l = c > t && s < t + e && m > o - n && a < o - n + n : u === 3 && (l = c > t - e && s < t - e + e && m > o && a < o + n) : u === 4 ? l = s > t && c < t + e && a > o && m < o + n : u === 2 ? l = s > t - e && c < t - e + e && a > o - n && m < o - n + n : u === 1 ? l = s > t && c < t + e && a > o - n && m < o - n + n : u === 3 && (l = s > t - e && c < t - e + e && a > o && m < o + n), l && !i.lock && !b.includes(i.id) && r.push(i);
        }
        r = r.filter((i) => {
          if (i.groupId) {
            const t = r.map(
              (e) => e.id
            );
            return g.current.filter(
              (e) => e.groupId === i.groupId
            ).every(
              (e) => t.includes(e.id)
            );
          }
          return !0;
        });
        const M = r.map((i) => i.id);
        X(M), S(!1);
      };
      document.onmousemove = O, document.onmouseup = Q;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally excludes mouseSelection state to avoid infinite re-creation
    [
      h,
      f,
      Y,
      b,
      g,
      X
    ]
  );
  return {
    mouseSelection: d,
    mouseSelectionVisible: C,
    mouseSelectionQuadrant: u,
    updateMouseSelection: K
  };
}
export {
  G as useMouseSelection
};
//# sourceMappingURL=useMouseSelection.js.map
