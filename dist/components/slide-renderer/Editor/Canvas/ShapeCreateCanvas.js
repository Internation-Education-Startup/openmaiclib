import { jsx as y } from "react/jsx-runtime";
import { useRef as T, useState as f, useCallback as C, useEffect as U, useMemo as j } from "react";
import { useKeyboardStore as z } from "../../../../lib/store/keyboard.js";
import { useCanvasStore as I } from "../../../../lib/store/canvas.js";
import "../../../../lib/store/snapshot.js";
import "../../../../lib/store/stage.js";
import "../../../../lib/store/settings.js";
import { useSceneSelector as W } from "../../../../lib/contexts/scene-context.js";
import { toast as Z } from "sonner";
function et({ onCreated: h }) {
  const k = z((t) => t.ctrlOrShiftKeyActive()), S = I.use.setCreatingCustomShapeState(), x = W((t) => t.canvas.theme), g = T(null), [L, P] = f(!1), [i, D] = f({ x: 0, y: 0 }), [u, w] = f(null), [n, E] = f([]), [b, d] = f(!1), l = C(() => {
    S(!1);
  }, [S]), v = C(
    (t = !0) => {
      const o = n.map((r) => r[0]), e = n.map((r) => r[1]), s = Math.min(...o), a = Math.min(...e), c = Math.max(...o), Y = Math.max(...e), $ = n.map((r) => [r[0] - s, r[1] - a]);
      let p = "";
      for (let r = 0; r < $.length; r++) {
        const m = $[r];
        r === 0 ? p += `M ${m[0]} ${m[1]} ` : p += `L ${m[0]} ${m[1]} `;
      }
      t && (p += "Z");
      const A = [s + i.x, a + i.y], O = [c + i.x, Y + i.y], B = [c - s, Y - a];
      return {
        start: A,
        end: O,
        path: p,
        viewBox: B
      };
    },
    [n, i]
  ), X = C(() => {
    h({
      ...v(!1),
      fill: "rgba(0, 0, 0, 0)",
      outline: {
        width: 2,
        color: x.themeColors[0],
        style: "solid"
      }
    }), l();
  }, [h, v, x, l]);
  U(() => {
    if (!g.current) return;
    const { x: t, y: o } = g.current.getBoundingClientRect();
    D({ x: t, y: o }), Z.info(
      "Click to draw any shape, close the path to finish, press ESC or right-click to cancel, press ENTER to finish early"
    );
    const e = (s) => {
      const a = s.key.toUpperCase();
      a === "ESCAPE" && l(), a === "ENTER" && X();
    };
    return document.addEventListener("keydown", e), () => {
      document.removeEventListener("keydown", e);
    };
  }, [l, X]);
  const M = (t, o = !1) => {
    let e = t.pageX - i.x, s = t.pageY - i.y;
    if (o) return { pageX: e, pageY: s };
    if (k && n.length) {
      const [a, c] = n[n.length - 1];
      Math.abs(a - e) - Math.abs(c - s) > 0 ? s = c : e = a;
    }
    return { pageX: e, pageY: s };
  }, R = (t) => {
    if (L) {
      const { pageX: s, pageY: a } = M(t, !0);
      E([...n, [s, a]]), w(null);
      return;
    }
    const { pageX: o, pageY: e } = M(t);
    if (w([o, e]), n.length >= 2) {
      const [s, a] = n[0];
      Math.abs(s - o) < 5 && Math.abs(a - e) < 5 ? d(!0) : d(!1);
    } else d(!1);
  }, K = j(() => {
    let t = "";
    for (let o = 0; o < n.length; o++) {
      const e = n[o];
      o === 0 ? t += `M ${e[0]} ${e[1]} ` : t += `L ${e[0]} ${e[1]} `;
    }
    return n.length && u && (t += `L ${u[0]} ${u[1]}`), t;
  }, [n, u]), N = (t) => {
    const { pageX: o, pageY: e } = M(t);
    P(!0), b ? h(v()) : E([...n, [o, e]]);
    const s = () => {
      P(!1), document.removeEventListener("mouseup", s);
    };
    document.addEventListener("mouseup", s);
  };
  return /* @__PURE__ */ y(
    "div",
    {
      ref: g,
      className: "shape-create-canvas absolute top-0 left-0 w-full h-full z-[2] cursor-crosshair",
      onMouseDown: (t) => {
        t.stopPropagation(), N(t);
      },
      onMouseMove: R,
      onContextMenu: (t) => {
        t.stopPropagation(), t.preventDefault(), l();
      },
      children: /* @__PURE__ */ y("svg", { className: "w-full h-full overflow-visible", children: /* @__PURE__ */ y(
        "path",
        {
          d: K,
          stroke: "#d14424",
          fill: b ? "rgba(226, 83, 77, 0.15)" : "none",
          strokeWidth: "2"
        }
      ) })
    }
  );
}
export {
  et as ShapeCreateCanvas
};
//# sourceMappingURL=ShapeCreateCanvas.js.map
