import { jsxs as tt, jsx as d } from "react/jsx-runtime";
import { useState as F, useRef as at, useCallback as S, useMemo as Y, useEffect as j } from "react";
import { useCanvasStore as ct } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import { useKeyboardStore as ft } from "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { KEYS as gt } from "../../../../../configs/hotkey.js";
import { OperateResizeHandlers as h } from "../../../../../lib/types/edit.js";
function Et({
  src: U,
  clipPath: et,
  width: T,
  height: L,
  rotate: l,
  clipData: G,
  onClip: D
}) {
  const b = ct.use.canvasScale(), q = ft((e) => e.ctrlOrShiftKeyActive()), [ot, it] = F({
    top: "0",
    left: "0"
  }), [A, k] = F(!1), [z, nt] = F(null), [a, K] = F({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  }), $ = at(null), M = S(() => {
    const [e, o] = G ? G.range : [
      [0, 0],
      [100, 100]
    ], p = (o[0] - e[0]) / 100, s = (o[1] - e[1]) / 100, r = e[0] / p, f = e[1] / s;
    return { widthScale: p, heightScale: s, left: r, top: f };
  }, [G]), g = Y(() => {
    const { widthScale: e, heightScale: o, left: p, top: s } = M();
    return {
      left: -p,
      top: -s,
      width: 100 / e,
      height: 100 / o
    };
  }, [M]), st = Y(() => ({
    top: g.top + "%",
    left: g.left + "%",
    width: g.width + "%",
    height: g.height + "%"
  }), [g]), Z = Y(() => {
    const { top: e, left: o, width: p, height: s } = a;
    return {
      top: e + "%",
      left: o + "%",
      width: p + "%",
      height: s + "%"
    };
  }, [a]), E = Y(() => {
    const e = g.width, o = g.height, { top: p, left: s, width: r, height: f } = a;
    return {
      left: -s * (100 / r) + "%",
      top: -p * (100 / f) + "%",
      width: e / r * 100 + "%",
      height: o / f * 100 + "%"
    };
  }, [g, a]), rt = S(() => {
    const { left: e, top: o } = M();
    K({
      left: e,
      top: o,
      width: 100,
      height: 100
    }), it({
      top: -o + "%",
      left: -e + "%"
    });
  }, [M]), H = S(() => {
    if (A) return;
    if (!z) {
      D(null);
      return;
    }
    const { left: e, top: o } = M(), p = {
      left: (a.left - e) / 100 * T,
      top: (a.top - o) / 100 * L,
      width: (a.width - 100) / 100 * T,
      height: (a.height - 100) / 100 * L
    };
    D({
      range: z,
      position: p
    });
  }, [
    A,
    z,
    M,
    a,
    T,
    L,
    D
  ]), X = S(() => {
    const e = {
      left: parseInt(E.left),
      top: parseInt(E.top),
      width: parseInt(E.width),
      height: parseInt(E.height)
    }, o = 100 / e.width, p = 100 / e.height, s = [
      -e.left * o,
      -e.top * p
    ], r = [o * 100 + s[0], p * 100 + s[1]];
    nt([s, r]);
  }, [E]), lt = S(
    (e) => {
      k(!0);
      let o = !0;
      const p = e.pageX, s = e.pageY, r = g, f = { ...a }, x = (t) => {
        if (!o) return;
        const y = t.pageX, W = t.pageY, O = (y - p) / b, R = (W - s) / b, N = Math.sqrt(O * O + R * R), _ = Math.atan2(R, O) - l / 180 * Math.PI, C = N * Math.cos(_) / T * 100, B = N * Math.sin(_) / L * 100;
        let I = f.left + C, P = f.top + B;
        I < 0 ? I = 0 : I + f.width > r.width && (I = r.width - f.width), P < 0 ? P = 0 : P + f.height > r.height && (P = r.height - f.height), K({
          ...a,
          left: I,
          top: P
        });
      }, c = () => {
        o = !1, document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", c), X(), setTimeout(() => {
          k(!1);
        }, 0);
      };
      document.addEventListener("mousemove", x), document.addEventListener("mouseup", c);
    },
    [b, l, T, L, g, a, X]
  ), J = S(
    (e, o) => {
      e.stopPropagation(), k(!0);
      let p = !0;
      const s = 50 / T * 100, r = 50 / L * 100, f = e.pageX, x = e.pageY, c = g, t = { ...a }, y = a.width / a.height, W = (R) => {
        if (!p) return;
        const N = R.pageX, V = R.pageY, _ = (N - f) / b, C = (V - x) / b, B = Math.sqrt(_ * _ + C * C), P = Math.atan2(C, _) - l / 180 * Math.PI;
        let i = B * Math.cos(P) / T * 100, n = B * Math.sin(P) / L * 100;
        q && ((o === h.RIGHT_BOTTOM || o === h.LEFT_TOP) && (n = i / y), (o === h.LEFT_BOTTOM || o === h.RIGHT_TOP) && (n = -i / y));
        let m, u, w, v;
        o === h.LEFT_TOP ? (t.left + i < 0 && (i = -t.left), t.top + n < 0 && (n = -t.top), t.width - i < s && (i = t.width - s), t.height - n < r && (n = t.height - r), w = t.width - i, v = t.height - n, m = t.left + i, u = t.top + n) : o === h.RIGHT_TOP ? (t.left + t.width + i > c.width && (i = c.width - (t.left + t.width)), t.top + n < 0 && (n = -t.top), t.width + i < s && (i = s - t.width), t.height - n < r && (n = t.height - r), w = t.width + i, v = t.height - n, m = t.left, u = t.top + n) : o === h.LEFT_BOTTOM ? (t.left + i < 0 && (i = -t.left), t.top + t.height + n > c.height && (n = c.height - (t.top + t.height)), t.width - i < s && (i = t.width - s), t.height + n < r && (n = r - t.height), w = t.width - i, v = t.height + n, m = t.left + i, u = t.top) : o === h.RIGHT_BOTTOM ? (t.left + t.width + i > c.width && (i = c.width - (t.left + t.width)), t.top + t.height + n > c.height && (n = c.height - (t.top + t.height)), t.width + i < s && (i = s - t.width), t.height + n < r && (n = r - t.height), w = t.width + i, v = t.height + n, m = t.left, u = t.top) : o === h.TOP ? (t.top + n < 0 && (n = -t.top), t.height - n < r && (n = t.height - r), w = t.width, v = t.height - n, m = t.left, u = t.top + n) : o === h.BOTTOM ? (t.top + t.height + n > c.height && (n = c.height - (t.top + t.height)), t.height + n < r && (n = r - t.height), w = t.width, v = t.height + n, m = t.left, u = t.top) : o === h.LEFT ? (t.left + i < 0 && (i = -t.left), t.width - i < s && (i = t.width - s), w = t.width - i, v = t.height, m = t.left + i, u = t.top) : (t.left + t.width + i > c.width && (i = c.width - (t.left + t.width)), t.width + i < s && (i = s - t.width), v = t.height, w = t.width + i, m = t.left, u = t.top), K({
          left: m,
          top: u,
          width: w,
          height: v
        });
      }, O = () => {
        p = !1, document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", O), X(), setTimeout(() => k(!1), 0);
      };
      document.addEventListener("mousemove", W), document.addEventListener("mouseup", O);
    },
    [
      b,
      l,
      T,
      L,
      g,
      a,
      q,
      X
    ]
  ), Q = Y(() => {
    const e = "rotate-";
    return l > -22.5 && l <= 22.5 ? e + "0" : l > 22.5 && l <= 67.5 ? e + "45" : l > 67.5 && l <= 112.5 ? e + "90" : l > 112.5 && l <= 157.5 ? e + "135" : l > 157.5 || l <= -157.5 ? e + "0" : l > -157.5 && l <= -112.5 ? e + "45" : l > -112.5 && l <= -67.5 ? e + "90" : l > -67.5 && l <= -22.5 ? e + "135" : e + "0";
  }, [l]), pt = [
    h.LEFT_TOP,
    h.RIGHT_TOP,
    h.LEFT_BOTTOM,
    h.RIGHT_BOTTOM
  ], ht = [
    h.TOP,
    h.BOTTOM,
    h.LEFT,
    h.RIGHT
  ];
  return j(() => {
    rt();
  }, []), j(() => {
    const e = (o) => {
      o.key.toUpperCase() === gt.ENTER && H();
    };
    return document.addEventListener("keydown", e), () => {
      document.removeEventListener("keydown", e);
    };
  }, [H]), j(() => {
    const e = (o) => {
      $.current && !$.current.contains(o.target) && H();
    };
    return document.addEventListener("mousedown", e), () => {
      document.removeEventListener("mousedown", e);
    };
  }, [H]), /* @__PURE__ */ tt(
    "div",
    {
      ref: $,
      className: "image-clip-handler w-full h-full relative",
      style: ot,
      children: [
        /* @__PURE__ */ d(
          "img",
          {
            className: "bottom-img absolute top-0 left-0 w-full h-full opacity-50",
            src: U,
            draggable: !1,
            alt: "",
            style: st
          }
        ),
        /* @__PURE__ */ d(
          "div",
          {
            className: "top-image-content absolute overflow-hidden",
            style: {
              ...Z,
              clipPath: et
            },
            children: /* @__PURE__ */ d(
              "img",
              {
                className: "top-img absolute w-full h-full",
                src: U,
                draggable: !1,
                alt: "",
                style: E
              }
            )
          }
        ),
        /* @__PURE__ */ tt(
          "div",
          {
            className: "operate absolute w-full h-full top-0 left-0 cursor-move",
            style: Z,
            onMouseDown: (e) => {
              e.stopPropagation(), lt(e);
            },
            children: [
              pt.map((e) => /* @__PURE__ */ d(
                "div",
                {
                  className: `clip-point ${e} ${Q}`,
                  onMouseDown: (o) => J(o, e),
                  children: /* @__PURE__ */ d("svg", { width: "16", height: "16", fill: "#fff", stroke: "#333", children: /* @__PURE__ */ d(
                    "path",
                    {
                      strokeWidth: "0.3",
                      shapeRendering: "crispEdges",
                      d: "M 16 0 L 0 0 L 0 16 L 4 16 L 4 4 L 16 4 L 16 0 Z"
                    }
                  ) })
                },
                e
              )),
              ht.map((e) => /* @__PURE__ */ d(
                "div",
                {
                  className: `clip-point ${e} ${Q}`,
                  onMouseDown: (o) => J(o, e),
                  children: /* @__PURE__ */ d("svg", { width: "16", height: "16", fill: "#fff", stroke: "#333", children: /* @__PURE__ */ d("path", { strokeWidth: "0.3", shapeRendering: "crispEdges", d: "M 16 0 L 0 0 L 0 4 L 16 4 Z" }) })
                },
                e
              ))
            ]
          }
        ),
        /* @__PURE__ */ d("style", { jsx: !0, children: `
        .clip-point {
          position: absolute;
          width: 16px;
          height: 16px;
        }

        .clip-point svg {
          overflow: visible;
        }

        .clip-point.left-top {
          left: 0;
          top: 0;
        }
        .clip-point.right-top {
          left: 100%;
          top: 0;
          transform: rotate(90deg);
          transform-origin: 0 0;
        }
        .clip-point.left-bottom {
          left: 0;
          top: 100%;
          transform: rotate(-90deg);
          transform-origin: 0 0;
        }
        .clip-point.right-bottom {
          left: 100%;
          top: 100%;
          transform: rotate(180deg);
          transform-origin: 0 0;
        }
        .clip-point.top {
          left: 50%;
          top: 0;
          margin-left: -8px;
        }
        .clip-point.bottom {
          left: 50%;
          bottom: 0;
          margin-left: -8px;
          transform: rotate(180deg);
        }
        .clip-point.left {
          left: 0;
          top: 50%;
          margin-top: -8px;
          transform: rotate(-90deg);
        }
        .clip-point.right {
          right: 0;
          top: 50%;
          margin-top: -8px;
          transform: rotate(90deg);
        }

        .clip-point.left-top.rotate-0,
        .clip-point.right-bottom.rotate-0,
        .clip-point.left.rotate-45,
        .clip-point.right.rotate-45,
        .clip-point.left-bottom.rotate-90,
        .clip-point.right-top.rotate-90,
        .clip-point.top.rotate-135,
        .clip-point.bottom.rotate-135 {
          cursor: nwse-resize;
        }
        .clip-point.top.rotate-0,
        .clip-point.bottom.rotate-0,
        .clip-point.left-top.rotate-45,
        .clip-point.right-bottom.rotate-45,
        .clip-point.left.rotate-90,
        .clip-point.right.rotate-90,
        .clip-point.left-bottom.rotate-135,
        .clip-point.right-top.rotate-135 {
          cursor: ns-resize;
        }
        .clip-point.left-bottom.rotate-0,
        .clip-point.right-top.rotate-0,
        .clip-point.top.rotate-45,
        .clip-point.bottom.rotate-45,
        .clip-point.left-top.rotate-90,
        .clip-point.right-bottom.rotate-90,
        .clip-point.left.rotate-135,
        .clip-point.right.rotate-135 {
          cursor: nesw-resize;
        }
        .clip-point.left.rotate-0,
        .clip-point.right.rotate-0,
        .clip-point.left-bottom.rotate-45,
        .clip-point.right-top.rotate-45,
        .clip-point.top.rotate-90,
        .clip-point.bottom.rotate-90,
        .clip-point.left-top.rotate-135,
        .clip-point.right-bottom.rotate-135 {
          cursor: ew-resize;
        }
      ` })
      ]
    }
  );
}
export {
  Et as ImageClipHandler
};
//# sourceMappingURL=ImageClipHandler.js.map
