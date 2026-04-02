import { useCallback as ct } from "react";
import { useCanvasStore as Q } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import { useKeyboardStore as gt } from "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { OperateResizeHandlers as o } from "../../../../../lib/types/edit.js";
import { MIN_SIZE as Tt } from "../../../../../configs/element.js";
import { SHAPE_PATH_FORMULAS as Mt } from "../../../../../configs/shapes.js";
import { uniqAlignLines as ht } from "../../../../../lib/utils/element.js";
import { useHistorySnapshot as dt } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useCanvasOperations as Ot } from "../../../../../lib/hooks/use-canvas-operations.js";
const ft = (I, P) => {
  const { left: Z, top: $, width: W, height: j } = I, H = Math.sqrt(Math.pow(W, 2) + Math.pow(j, 2)) / 2, m = Math.atan(j / W) * 180 / Math.PI, C = (180 - P - m) * Math.PI / 180, b = (m - P) * Math.PI / 180, U = (90 - P) * Math.PI / 180, X = P * Math.PI / 180, V = W / 2, k = j / 2, _ = Z + V, a = $ + k, i = {
    left: _ + H * Math.cos(C),
    top: a - H * Math.sin(C)
  }, Y = {
    left: _ + k * Math.cos(U),
    top: a - k * Math.sin(U)
  }, L = {
    left: _ + H * Math.cos(b),
    top: a - H * Math.sin(b)
  }, x = {
    left: _ + V * Math.cos(X),
    top: a + V * Math.sin(X)
  }, g = {
    left: _ - H * Math.cos(C),
    top: a + H * Math.sin(C)
  }, M = {
    left: _ - k * Math.sin(X),
    top: a + k * Math.cos(X)
  }, h = {
    left: _ - H * Math.cos(b),
    top: a + H * Math.sin(b)
  }, c = {
    left: _ - V * Math.cos(X),
    top: a - V * Math.sin(X)
  };
  return {
    leftTopPoint: i,
    topPoint: Y,
    rightTopPoint: L,
    rightPoint: x,
    rightBottomPoint: g,
    bottomPoint: M,
    leftBottomPoint: h,
    leftPoint: c
  };
}, lt = (I, P) => ({
  [o.RIGHT_BOTTOM]: P.leftTopPoint,
  [o.LEFT_BOTTOM]: P.rightTopPoint,
  [o.LEFT_TOP]: P.rightBottomPoint,
  [o.RIGHT_TOP]: P.leftBottomPoint,
  [o.TOP]: P.bottomPoint,
  [o.BOTTOM]: P.topPoint,
  [o.LEFT]: P.rightPoint,
  [o.RIGHT]: P.leftPoint
})[I];
function Ft(I, P, Z) {
  const $ = Q.use.setScalingState(), W = Q.use.activeElementIdList(), j = Q.use.activeGroupElementId(), H = Q.use.canvasScale(), m = Q.use.viewportRatio(), C = Q.use.viewportSize(), b = Ot().updateSlide, U = gt((_) => _.ctrlOrShiftKeyActive()), { addHistorySnapshot: X } = dt(), V = ct(
    (_, a, i) => {
      var J;
      const Y = _.nativeEvent, L = Y instanceof TouchEvent;
      if (L && !((J = Y.changedTouches) != null && J.length)) return;
      let x = !0;
      $(!0);
      const g = a.left, M = a.top, h = a.width, c = a.height, tt = a.type === "table" ? a.cellMinHeight : 0, q = "rotate" in a && a.rotate ? a.rotate : 0, D = Math.PI * q / 180, A = U || "fixedRatio" in a && a.fixedRatio, R = h / c, it = L ? Y.changedTouches[0].pageX : Y.pageX, z = L ? Y.changedTouches[0].pageY : Y.pageY, K = Tt[a.type] || 20, f = (n, l) => {
        if (!A) return n < K ? K : n;
        let d = K, O = K;
        const v = a.width / a.height;
        return v < 1 && (O = K / v), v > 1 && (d = K * v), l === "width" ? n < d ? d : n : n < O ? O : n;
      };
      let F, y = 0, N = 0, G = [], S = [];
      if ("rotate" in a && a.rotate) {
        const { left: n, top: l, width: d, height: O } = a;
        F = ft({ left: n, top: l, width: d, height: O }, q);
        const v = lt(i, F);
        y = v.left, N = v.top;
      } else {
        const n = C, l = C * m, d = a.id === j;
        for (const E of I.current) {
          if ("rotate" in E && E.rotate || E.type === "line" || d && E.id === a.id || !d && W.includes(E.id)) continue;
          const t = E.left, e = E.top, p = E.width, w = E.height, et = t + p, ot = e + w, at = { value: e, range: [t, et] }, rt = { value: ot, range: [t, et] }, ut = { value: t, range: [e, ot] }, pt = { value: et, range: [e, ot] };
          G.push(at, rt), S.push(ut, pt);
        }
        const O = { value: 0, range: [0, n] }, v = {
          value: l,
          range: [0, n]
        }, r = {
          value: l / 2,
          range: [0, n]
        }, s = { value: 0, range: [0, l] }, u = {
          value: n,
          range: [0, l]
        }, T = {
          value: n / 2,
          range: [0, l]
        };
        G.push(O, v, r), S.push(s, u, T), G = ht(G), S = ht(S);
      }
      const B = (n, l) => {
        const O = [];
        let v = !1, r = !1;
        const s = { offsetX: 0, offsetY: 0 };
        if (l || l === 0)
          for (let u = 0; u < G.length; u++) {
            const { value: T, range: E } = G[u], t = Math.min(...E, n || 0), e = Math.max(...E, n || 0);
            Math.abs(l - T) < 5 && !r && (s.offsetY = l - T, r = !0, O.push({
              type: "horizontal",
              axis: { x: t - 50, y: T },
              length: e - t + 100
            }));
          }
        if (n || n === 0)
          for (let u = 0; u < S.length; u++) {
            const { value: T, range: E } = S[u], t = Math.min(...E, l || 0), e = Math.max(...E, l || 0);
            Math.abs(n - T) < 5 && !v && (s.offsetX = n - T, v = !0, O.push({
              type: "vertical",
              axis: { x: T, y: t - 50 },
              length: e - t + 100
            }));
          }
        return Z(O), s;
      }, nt = (n) => {
        if (!x) return;
        const l = n instanceof MouseEvent ? n.pageX : n.changedTouches[0].pageX, d = n instanceof MouseEvent ? n.pageY : n.changedTouches[0].pageY, O = l - it, v = d - z;
        let r = h, s = c, u = g, T = M;
        if (q) {
          const t = (Math.cos(D) * O + Math.sin(D) * v) / H;
          let e = (Math.cos(D) * v - Math.sin(D) * O) / H;
          A && ((i === o.RIGHT_BOTTOM || i === o.LEFT_TOP) && (e = t / R), (i === o.LEFT_BOTTOM || i === o.RIGHT_TOP) && (e = -t / R)), i === o.RIGHT_BOTTOM ? (r = f(h + t, "width"), s = f(c + e, "height")) : i === o.LEFT_BOTTOM ? (r = f(h - t, "width"), s = f(c + e, "height"), u = g - (r - h)) : i === o.LEFT_TOP ? (r = f(h - t, "width"), s = f(c - e, "height"), u = g - (r - h), T = M - (s - c)) : i === o.RIGHT_TOP ? (r = f(h + t, "width"), s = f(c - e, "height"), T = M - (s - c)) : i === o.TOP ? (s = f(c - e, "height"), T = M - (s - c)) : i === o.BOTTOM ? s = f(c + e, "height") : i === o.LEFT ? (r = f(h - t, "width"), u = g - (r - h)) : i === o.RIGHT && (r = f(h + t, "width"));
          const p = ft({ width: r, height: s, left: u, top: T }, q), w = lt(i, p), et = w.left, ot = w.top, at = et - y, rt = ot - N;
          u = u - at, T = T - rt;
        } else {
          let t = O / H, e = v / H;
          if (A && ((i === o.RIGHT_BOTTOM || i === o.LEFT_TOP) && (e = t / R), (i === o.LEFT_BOTTOM || i === o.RIGHT_TOP) && (e = -t / R)), i === o.RIGHT_BOTTOM) {
            const { offsetX: p, offsetY: w } = B(
              g + h + t,
              M + c + e
            );
            t = t - p, e = e - w, A && (w ? t = e * R : e = t / R), r = f(h + t, "width"), s = f(c + e, "height");
          } else if (i === o.LEFT_BOTTOM) {
            const { offsetX: p, offsetY: w } = B(
              g + t,
              M + c + e
            );
            t = t - p, e = e - w, A && (w ? t = -e * R : e = -t / R), r = f(h - t, "width"), s = f(c + e, "height"), u = g - (r - h);
          } else if (i === o.LEFT_TOP) {
            const { offsetX: p, offsetY: w } = B(
              g + t,
              M + e
            );
            t = t - p, e = e - w, A && (w ? t = e * R : e = t / R), r = f(h - t, "width"), s = f(c - e, "height"), u = g - (r - h), T = M - (s - c);
          } else if (i === o.RIGHT_TOP) {
            const { offsetX: p, offsetY: w } = B(
              g + h + t,
              M + e
            );
            t = t - p, e = e - w, A && (w ? t = -e * R : e = -t / R), r = f(h + t, "width"), s = f(c - e, "height"), T = M - (s - c);
          } else if (i === o.LEFT) {
            const { offsetX: p } = B(g + t, null);
            t = t - p, r = f(h - t, "width"), u = g - (r - h);
          } else if (i === o.RIGHT) {
            const { offsetX: p } = B(g + h + t, null);
            t = t - p, r = f(h + t, "width");
          } else if (i === o.TOP) {
            const { offsetY: p } = B(null, M + e);
            e = e - p, s = f(c - e, "height"), T = M - (s - c);
          } else if (i === o.BOTTOM) {
            const { offsetY: p } = B(null, M + c + e);
            e = e - p, s = f(c + e, "height");
          }
        }
        const E = I.current.map((t) => {
          if (a.id !== t.id) return t;
          if (t.type === "shape" && "pathFormula" in t && t.pathFormula) {
            const e = Mt[t.pathFormula];
            let p = "";
            return "editable" in e ? p = e.formula(r, s, t.keypoints) : p = e.formula(r, s), {
              ...t,
              left: u,
              top: T,
              width: r,
              height: s,
              viewBox: [r, s],
              path: p
            };
          }
          if (t.type === "table") {
            let e = tt + (s - c) / t.data.length;
            return e = e < 36 ? 36 : e, e === tt ? { ...t, left: u, width: r } : {
              ...t,
              left: u,
              top: T,
              width: r,
              height: s,
              cellMinHeight: e < 36 ? 36 : e
            };
          }
          return { ...t, left: u, top: T, width: r, height: s };
        });
        I.current = E, P(E);
      }, st = (n) => {
        x = !1, document.ontouchmove = null, document.ontouchend = null, document.onmousemove = null, document.onmouseup = null, Z([]);
        const l = n instanceof MouseEvent ? n.pageX : n.changedTouches[0].pageX, d = n instanceof MouseEvent ? n.pageY : n.changedTouches[0].pageY;
        it === l && z === d || ($(!1), b({ elements: I.current }), X());
      };
      L ? (document.ontouchmove = nt, document.ontouchend = st) : (document.onmousemove = nt, document.onmouseup = st);
    },
    [
      I,
      P,
      H,
      W,
      j,
      m,
      C,
      U,
      $,
      Z,
      b,
      X
    ]
  ), k = ct(
    (_, a, i) => {
      let Y = !0;
      const { minX: L, maxX: x, minY: g, maxY: M } = a, h = x - L, c = M - g, tt = h / c, q = _.pageX, D = _.pageY, A = JSON.parse(JSON.stringify(I.current)), R = (z) => {
        if (!Y) return;
        const K = z.pageX, f = z.pageY, F = (K - q) / H;
        let y = (f - D) / H;
        U && ((i === o.RIGHT_BOTTOM || i === o.LEFT_TOP) && (y = F / tt), (i === o.LEFT_BOTTOM || i === o.RIGHT_TOP) && (y = -F / tt));
        let N = L, G = x, S = g, B = M;
        i === o.RIGHT_BOTTOM ? (G = x + F, B = M + y) : i === o.LEFT_BOTTOM ? (N = L + F, B = M + y) : i === o.LEFT_TOP ? (N = L + F, S = g + y) : i === o.RIGHT_TOP ? (G = x + F, S = g + y) : i === o.TOP ? S = g + y : i === o.BOTTOM ? B = M + y : i === o.LEFT ? N = L + F : i === o.RIGHT && (G = x + F);
        const nt = G - N, st = B - S;
        let J = nt / h, n = st / c;
        J <= 0 && (J = 0), n <= 0 && (n = 0);
        const l = I.current.map((d) => {
          if ((d.type === "image" || d.type === "shape") && W.includes(d.id)) {
            const O = A.find((v) => v.id === d.id);
            return {
              ...d,
              width: O.width * J,
              height: O.height * n,
              left: N + (O.left - L) * J,
              top: S + (O.top - g) * n
            };
          }
          return d;
        });
        I.current = l, P(l);
      }, it = (z) => {
        Y = !1, document.onmousemove = null, document.onmouseup = null, !(q === z.pageX && D === z.pageY) && (b({ elements: I.current }), X());
      };
      document.onmousemove = R, document.onmouseup = it;
    },
    [
      I,
      P,
      H,
      W,
      U,
      b,
      X
    ]
  );
  return {
    scaleElement: V,
    scaleMultiElement: k
  };
}
export {
  Ft as useScaleElement
};
//# sourceMappingURL=useScaleElement.js.map
