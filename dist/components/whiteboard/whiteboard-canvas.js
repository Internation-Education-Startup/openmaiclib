import { jsx as r, jsxs as J } from "react/jsx-runtime";
import { forwardRef as _, useState as X, useRef as S, useCallback as Y, useImperativeHandle as it, useEffect as C, useMemo as K } from "react";
import { AnimatePresence as Q, motion as V } from "motion/react";
import { useCanvasStore as lt } from "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as ut } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { ScreenElement as dt } from "../slide-renderer/Editor/ScreenElement.js";
import { useI18n as mt } from "../../lib/hooks/use-i18n.js";
function ft({
  element: k,
  index: e,
  isClearing: n,
  totalElements: c
}) {
  const o = n ? (c - 1 - e) * 0.055 : 0, s = n ? (e % 2 === 0 ? 1 : -1) * (2 + e * 0.4) : 0;
  return /* @__PURE__ */ r(
    V.div,
    {
      layout: !1,
      initial: { opacity: 0, scale: 0.92, y: 8, filter: "blur(4px)" },
      animate: n ? {
        opacity: 0,
        scale: 0.35,
        y: -35,
        rotate: s,
        filter: "blur(8px)",
        transition: {
          duration: 0.38,
          delay: o,
          ease: [0.5, 0, 1, 0.6]
        }
      } : {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
          delay: e * 0.05
        }
      },
      exit: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.2 }
      },
      className: "absolute inset-0",
      style: { pointerEvents: n ? "none" : void 0 },
      children: /* @__PURE__ */ r("div", { style: { pointerEvents: "auto" }, children: /* @__PURE__ */ r(dt, { elementInfo: k, elementIndex: e, animate: !0 }) })
    }
  );
}
const ht = _(function({
  canvasHeight: e,
  canvasWidth: n,
  containerWidth: c,
  containerHeight: o,
  containerScale: s,
  elements: i,
  isClearing: l,
  onViewModifiedChange: p,
  readyHintText: M,
  readyText: L
}, z) {
  const [m, x] = X(1), [b, g] = X(0), [f, P] = X(0), [I, w] = X(!1), [W, B] = X(!1), E = S({ x: 0, y: 0, panX: 0, panY: 0 }), O = S(i.length), y = S(null), U = S(null), Z = m !== 1 || b !== 0 || f !== 0, q = Y(
    (t, a, u) => {
      const h = s * u, d = n / 2 + c / (2 * h), v = e / 2 + o / (2 * h);
      return {
        x: Math.max(-d, Math.min(d, t)),
        y: Math.max(-v, Math.min(v, a))
      };
    },
    [n, e, c, o, s]
  ), R = Y((t) => {
    w(!1), B(t), x(1), g(0), P(0), y.current && (window.clearTimeout(y.current), y.current = null), t && (y.current = window.setTimeout(() => {
      B(!1), y.current = null;
    }, 250));
  }, []);
  it(
    z,
    () => ({
      resetView: () => R(!0)
    }),
    [R]
  ), C(() => {
    p == null || p(Z);
  }, [Z, p]);
  const H = Y(
    (t) => {
      t.button === 0 && (t.preventDefault(), w(!0), E.current = { x: t.clientX, y: t.clientY, panX: b, panY: f }, t.currentTarget.setPointerCapture(t.pointerId));
    },
    [b, f]
  ), tt = Y(
    (t) => {
      if (!I)
        return;
      const a = t.clientX - E.current.x, u = t.clientY - E.current.y, h = Math.max(s * m, 1e-3), d = E.current.panX + a / h, v = E.current.panY + u / h, D = q(d, v, m);
      g(D.x), P(D.y);
    },
    [s, m, I, q]
  ), F = Y((t) => {
    t.currentTarget.hasPointerCapture(t.pointerId) && t.currentTarget.releasePointerCapture(t.pointerId), w(!1);
  }, []);
  C(() => {
    const t = U.current;
    if (!t)
      return;
    const a = (u) => {
      if (u.preventDefault(), i.length === 0)
        return;
      const h = u.deltaY > 0 ? 0.9 : 1.1;
      x((d) => {
        const v = Math.min(5, Math.max(0.2, d * h)), D = t.getBoundingClientRect(), st = u.clientX - D.left, at = u.clientY - D.top, ct = s * d, j = s * v, G = 1 / j - 1 / ct;
        return g(($) => {
          const A = $ + (st - c / 2) * G, N = n / 2 + c / (2 * j);
          return Math.max(-N, Math.min(N, A));
        }), P(($) => {
          const A = $ + (at - o / 2) * G, N = e / 2 + o / (2 * j);
          return Math.max(-N, Math.min(N, A));
        }), v;
      });
    };
    return t.addEventListener("wheel", a, { passive: !1 }), () => t.removeEventListener("wheel", a);
  }, [i.length, s, c, o, n, e]), C(() => () => {
    y.current && window.clearTimeout(y.current);
  }, []), C(() => {
    const t = O.current, a = i.length;
    O.current = a;
    const u = t > 0 && a === 0, h = t === 0 && a > 0;
    if (!u && !h)
      return;
    let d = !1;
    return queueMicrotask(() => {
      d || R(!1);
    }), () => {
      d = !0;
    };
  }, [i.length, R]);
  const et = Y(
    (t) => {
      t == null || t.preventDefault(), R(!0);
    },
    [R]
  ), T = s * m, nt = (c - n * T) / 2 + b * T, rt = (o - e * T) / 2 + f * T, ot = `translate(${nt}px, ${rt}px) scale(${T})`;
  return (
    /* Viewport — fills workspace, handles pointer events, no clipping */
    /* @__PURE__ */ r(
      "div",
      {
        ref: U,
        className: "w-full h-full relative select-none",
        style: {
          cursor: I ? "grabbing" : "grab"
        },
        onPointerDown: H,
        onPointerMove: tt,
        onPointerUp: F,
        onPointerCancel: F,
        onDoubleClick: et,
        children: /* @__PURE__ */ J(
          "div",
          {
            className: "absolute bg-white shadow-2xl rounded-lg border border-gray-200 dark:border-gray-600",
            style: {
              width: n,
              height: e,
              left: 0,
              top: 0,
              transform: ot,
              transformOrigin: "0 0",
              transition: W ? "transform 0.25s ease-out" : void 0
            },
            children: [
              /* @__PURE__ */ r(Q, { children: i.length === 0 && !l && /* @__PURE__ */ r(
                V.div,
                {
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { delay: 0.25, duration: 0.4 }
                  },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                  className: "absolute inset-0 flex items-center justify-center",
                  children: /* @__PURE__ */ J("div", { className: "text-center text-gray-400", children: [
                    /* @__PURE__ */ r("p", { className: "text-lg font-medium", children: L }),
                    /* @__PURE__ */ r("p", { className: "text-sm mt-1", children: M })
                  ] })
                },
                "placeholder"
              ) }),
              /* @__PURE__ */ r("div", { className: "absolute inset-0", children: /* @__PURE__ */ r(Q, { mode: "popLayout", children: i.map((t, a) => /* @__PURE__ */ r(
                ft,
                {
                  element: t,
                  index: a,
                  isClearing: l,
                  totalElements: i.length
                },
                t.id
              )) }) })
            ]
          }
        )
      }
    )
  );
}), Mt = _(
  function({ onViewModifiedChange: e }, n) {
    var g;
    const { t: c } = mt(), o = ut.use.stage(), s = lt.use.whiteboardClearing(), i = S(null), [l, p] = X({ width: 0, height: 0 }), M = (g = o == null ? void 0 : o.whiteboard) == null ? void 0 : g[0], L = M == null ? void 0 : M.elements, z = K(() => L ?? [], [L]), m = 1e3, x = 562.5, b = K(() => l.width === 0 || l.height === 0 ? 1 : Math.min(l.width / m, l.height / x), [l.width, l.height, m, x]);
    return C(() => {
      const f = i.current;
      if (!f)
        return;
      const P = new ResizeObserver((I) => {
        const w = I[0];
        w && p({
          width: w.contentRect.width,
          height: w.contentRect.height
        });
      });
      return P.observe(f), p({ width: f.clientWidth, height: f.clientHeight }), () => P.disconnect();
    }, []), /* @__PURE__ */ r("div", { ref: i, className: "w-full h-full overflow-hidden", children: /* @__PURE__ */ r(
      ht,
      {
        ref: n,
        canvasHeight: x,
        canvasWidth: m,
        containerWidth: l.width,
        containerHeight: l.height,
        containerScale: b,
        elements: z,
        isClearing: s,
        onViewModifiedChange: e,
        readyHintText: c("whiteboard.readyHint"),
        readyText: c("whiteboard.ready")
      }
    ) });
  }
);
export {
  Mt as WhiteboardCanvas
};
//# sourceMappingURL=whiteboard-canvas.js.map
