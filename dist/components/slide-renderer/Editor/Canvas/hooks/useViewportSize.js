import { useState as b, useCallback as P, useRef as X, useEffect as A, useMemo as Y } from "react";
import { useCanvasStore as g } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
function j(r) {
  const [f, w] = b(0), [V, d] = b(0), u = g.use.canvasPercentage(), S = g.use.canvasDragged(), p = g.use.setCanvasScale(), W = g.use.setCanvasDragged(), t = g.use.viewportRatio(), s = g.use.viewportSize(), l = P(() => {
    if (!r.current) return;
    const e = r.current.clientWidth, o = r.current.clientHeight;
    if (o / e > t) {
      const n = e * (u / 100);
      p(n / s), w((e - n) / 2), d((o - n * t) / 2);
    } else {
      const n = o * (u / 100);
      p(n / (s * t)), w((e - n / t) / 2), d((o - n) / 2);
    }
  }, [r, u, t, s, p]), C = P(
    (e, o) => {
      if (!r.current) return;
      const n = r.current.clientWidth, h = r.current.clientHeight;
      if (h / n > t) {
        const c = n * (e / 100), a = n * (o / 100), v = c * t, m = a * t;
        p(c / s), w((i) => i - (c - a) / 2), d((i) => i - (v - m) / 2);
      } else {
        const c = h * (e / 100), a = h * (o / 100), v = c / t, m = a / t;
        p(c / (s * t)), w((i) => i - (v - m) / 2), d((i) => i - (c - a) / 2);
      }
    },
    [r, t, s, p]
  ), H = X(u);
  A(() => {
    H.current !== u && (C(u, H.current), H.current = u);
  }, [u, C]), A(() => {
    l();
  }, [t, s, l]), A(() => {
    S || l();
  }, [S, l]), A(() => {
    const e = r.current, o = new ResizeObserver(l);
    return e && o.observe(e), () => {
      e && o.unobserve(e);
    };
  }, [r, l]);
  const z = P(
    (e) => {
      let o = !0;
      const n = e.pageX, h = e.pageY, c = f, a = V, v = (i) => {
        if (!o) return;
        const D = i.pageX, M = i.pageY;
        w(c + (D - n)), d(a + (M - h));
      }, m = () => {
        o = !1, document.onmousemove = null, document.onmouseup = null, W(!0);
      };
      document.onmousemove = v, document.onmouseup = m;
    },
    [f, V, W]
  );
  return {
    viewportStyles: Y(
      () => ({
        width: s,
        height: s * t,
        left: f,
        top: V
      }),
      [s, t, f, V]
    ),
    dragViewport: z
  };
}
export {
  j as useViewportSize
};
//# sourceMappingURL=useViewportSize.js.map
