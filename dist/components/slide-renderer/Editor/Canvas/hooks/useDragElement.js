import { useCallback as xt } from "react";
import { useCanvasStore as R } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import { useKeyboardStore as yt } from "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useHistorySnapshot as bt } from "../../../../../lib/hooks/use-history-snapshot.js";
import { getRectRotatedRange as k, uniqAlignLines as ut } from "../../../../../lib/utils/element.js";
import { useCanvasOperations as Et } from "../../../../../lib/hooks/use-canvas-operations.js";
function Vt(y, q, A) {
  const L = R.use.activeElementIdList(), B = R.use.activeGroupElementId(), G = R.use.canvasScale(), U = yt((D) => D.shiftKeyState), _ = R.use.viewportRatio(), K = R.use.viewportSize(), j = Et().updateSlide, { addHistorySnapshot: F } = bt();
  return {
    dragElement: xt(
      (D, o) => {
        var at;
        const S = D.nativeEvent, H = S instanceof TouchEvent;
        if (H && !((at = S.changedTouches) != null && at.length) || !L.includes(o.id)) return;
        let Q = !0;
        const T = K, z = K * _, b = 5, Z = JSON.parse(JSON.stringify(y.current)).filter(
          (e) => L.includes(e.id)
        ), ht = o.left, gt = o.top, $ = o.width, tt = "height" in o && o.height ? o.height : 0, et = "rotate" in o && o.rotate ? o.rotate : 0, J = H ? S.changedTouches[0].pageX : S.pageX, N = H ? S.changedTouches[0].pageY : S.pageY;
        let W = null;
        const P = o.id === B;
        let X = [], Y = [];
        for (const e of y.current) {
          if (e.type === "line" || P && e.id === o.id || !P && L.includes(e.id)) continue;
          let c, u, f, v;
          if ("rotate" in e && e.rotate) {
            const { xRange: m, yRange: w } = k({
              left: e.left,
              top: e.top,
              width: e.width,
              height: e.height,
              rotate: e.rotate
            });
            c = m[0], u = w[0], f = m[1] - m[0], v = w[1] - w[0];
          } else
            c = e.left, u = e.top, f = e.width, v = e.height;
          const a = c + f, i = u + v, h = u + v / 2, l = c + f / 2, g = { value: u, range: [c, a] }, p = { value: i, range: [c, a] }, V = {
            value: h,
            range: [c, a]
          }, I = { value: c, range: [u, i] }, x = { value: a, range: [u, i] }, E = {
            value: l,
            range: [u, i]
          };
          X.push(g, p, V), Y.push(I, x, E);
        }
        const lt = { value: 0, range: [0, T] }, pt = {
          value: z,
          range: [0, T]
        }, dt = {
          value: z / 2,
          range: [0, T]
        }, ft = { value: 0, range: [0, z] }, vt = {
          value: T,
          range: [0, z]
        }, mt = {
          value: T / 2,
          range: [0, z]
        };
        X.push(lt, pt, dt), Y.push(ft, vt, mt), X = ut(X), Y = ut(Y);
        const nt = (e) => {
          const c = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX, u = e instanceof MouseEvent ? e.pageY : e.changedTouches[0].pageY;
          if (W !== !1 && (W = Math.abs(J - c) < b && Math.abs(N - u) < b), !Q || W) return;
          let f = (c - J) / G, v = (u - N) / G;
          U && (Math.abs(f) > Math.abs(v) && (v = 0), Math.abs(f) < Math.abs(v) && (f = 0));
          let a = ht + f, i = gt + v, h, l, g, p;
          if (L.length === 1 || P)
            if (et) {
              const { xRange: n, yRange: t } = k({
                left: a,
                top: i,
                width: $,
                height: tt,
                rotate: et
              });
              h = n[0], l = n[1], g = t[0], p = t[1];
            } else o.type === "line" ? (h = a, l = a + Math.max(o.start[0], o.end[0]), g = i, p = i + Math.max(o.start[1], o.end[1])) : (h = a, l = a + $, g = i, p = i + tt);
          else {
            const n = [], t = [], M = [], s = [];
            for (let d = 0; d < Z.length; d++) {
              const r = Z[d], C = r.left + f, O = r.top + v, it = r.width, st = "height" in r && r.height ? r.height : 0, Mt = "rotate" in r && r.rotate ? r.rotate : 0;
              if ("rotate" in r && r.rotate) {
                const { xRange: rt, yRange: ct } = k({
                  left: C,
                  top: O,
                  width: it,
                  height: st,
                  rotate: Mt
                });
                n.push(rt[0]), t.push(ct[0]), M.push(rt[1]), s.push(ct[1]);
              } else r.type === "line" ? (n.push(C), t.push(O), M.push(C + Math.max(r.start[0], r.end[0])), s.push(O + Math.max(r.start[1], r.end[1]))) : (n.push(C), t.push(O), M.push(C + it), s.push(O + st));
            }
            h = Math.min(...n), l = Math.max(...M), g = Math.min(...t), p = Math.max(...s);
          }
          const V = h + (l - h) / 2, I = g + (p - g) / 2, x = [];
          let E = !1, m = !1;
          for (let n = 0; n < X.length; n++) {
            const { value: t, range: M } = X[n], s = Math.min(...M, h, l), d = Math.max(...M, h, l);
            Math.abs(g - t) < b && !m && (i = i - (g - t), m = !0, x.push({
              type: "horizontal",
              axis: { x: s - 50, y: t },
              length: d - s + 100
            })), Math.abs(p - t) < b && !m && (i = i - (p - t), m = !0, x.push({
              type: "horizontal",
              axis: { x: s - 50, y: t },
              length: d - s + 100
            })), Math.abs(I - t) < b && !m && (i = i - (I - t), m = !0, x.push({
              type: "horizontal",
              axis: { x: s - 50, y: t },
              length: d - s + 100
            }));
          }
          for (let n = 0; n < Y.length; n++) {
            const { value: t, range: M } = Y[n], s = Math.min(...M, g, p), d = Math.max(...M, g, p);
            Math.abs(h - t) < b && !E && (a = a - (h - t), E = !0, x.push({
              type: "vertical",
              axis: { x: t, y: s - 50 },
              length: d - s + 100
            })), Math.abs(l - t) < b && !E && (a = a - (l - t), E = !0, x.push({
              type: "vertical",
              axis: { x: t, y: s - 50 },
              length: d - s + 100
            })), Math.abs(V - t) < b && !E && (a = a - (V - t), E = !0, x.push({
              type: "vertical",
              axis: { x: t, y: s - 50 },
              length: d - s + 100
            }));
          }
          A(x);
          let w;
          if (L.length === 1 || P)
            w = y.current.map((n) => n.id === o.id ? { ...n, left: a, top: i } : n);
          else {
            const n = y.current.find((t) => t.id === o.id);
            if (!n) return;
            w = y.current.map((t) => L.includes(t.id) ? t.id === o.id ? { ...t, left: a, top: i } : {
              ...t,
              left: t.left + (a - n.left),
              top: t.top + (i - n.top)
            } : t);
          }
          y.current = w, q(w);
        }, ot = (e) => {
          Q = !1, document.ontouchmove = null, document.ontouchend = null, document.onmousemove = null, document.onmouseup = null, A([]);
          const c = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX, u = e instanceof MouseEvent ? e.pageY : e.changedTouches[0].pageY;
          J === c && N === u || (j({ elements: y.current }), F());
        };
        H ? (document.ontouchmove = nt, document.ontouchend = ot) : (document.onmousemove = nt, document.onmouseup = ot);
      },
      [
        L,
        B,
        U,
        G,
        y,
        q,
        A,
        j,
        F,
        _,
        K
      ]
    )
  };
}
export {
  Vt as useDragElement
};
//# sourceMappingURL=useDragElement.js.map
