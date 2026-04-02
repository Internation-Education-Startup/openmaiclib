import { jsx as x } from "react/jsx-runtime";
import { useState as b, useRef as K, useEffect as N, useMemo as S } from "react";
import { useCanvasStore as P } from "../../../../lib/store/canvas.js";
import "../../../../lib/store/snapshot.js";
import { useKeyboardStore as R } from "../../../../lib/store/keyboard.js";
import "../../../../lib/store/stage.js";
import "../../../../lib/store/settings.js";
import "../../../../lib/contexts/scene-context.js";
function q({ onCreated: X }) {
  const e = P.use.creatingElement(), w = P.use.setCreatingElement(), z = R((t) => t.ctrlOrShiftKeyActive()), [f, L] = b(), [d, $] = b(), Y = K(null), [y, C] = b({ x: 0, y: 0 });
  N(() => {
    if (!Y.current) return;
    const { x: t, y: l } = Y.current.getBoundingClientRect();
    C({ x: t, y: l });
  }, []);
  const D = (t) => {
    let l = !0;
    const s = t.pageX, n = t.pageY;
    L([s, n]);
    const c = (a) => {
      if (!e || !l) return;
      let o = a.pageX, r = a.pageY;
      if (z) {
        const i = o - s, p = r - n, u = Math.abs(i), h = Math.abs(p);
        if (e.type === "shape") {
          const M = p > 0 && i < 0 || p < 0 && i > 0;
          u > h ? r = M ? n - i : n + i : o = M ? s - p : s + p;
        } else e.type === "line" && (u > h ? r = n : o = s);
      }
      $([o, r]);
    }, m = (a) => {
      if (document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", m), a.button === 2) {
        setTimeout(() => w(null), 0);
        return;
      }
      l = !1;
      const o = a.pageX, r = a.pageY, i = 30;
      if ((e == null ? void 0 : e.type) === "line" && (Math.abs(o - s) >= i || Math.abs(r - n) >= i))
        X({
          start: [s, n],
          end: [o, r]
        });
      else if ((e == null ? void 0 : e.type) !== "line" && Math.abs(o - s) >= i && Math.abs(r - n) >= i)
        X({
          start: [s, n],
          end: [o, r]
        });
      else {
        const u = Math.min(o, s), h = Math.min(r, n), M = Math.max(o, s), g = Math.max(r, n), _ = M - u >= i ? M - u : 200, E = g - h >= i ? g - h : 200;
        X({
          start: [u, h],
          end: [u + _, h + E]
        });
      }
    };
    document.addEventListener("mousemove", c), document.addEventListener("mouseup", m);
  }, v = S(() => {
    if (!f || !d || !e || e.type !== "line") return null;
    const [t, l] = f, [s, n] = d, c = Math.min(t, s), m = Math.max(t, s), a = Math.min(l, n), o = Math.max(l, n), r = m - c >= 24 ? m - c : 24, i = o - a >= 24 ? o - a : 24, p = t === c ? 0 : m - c, u = l === a ? 0 : o - a, h = s === c ? 0 : m - c, M = n === a ? 0 : o - a, g = `M${p}, ${u} L${h}, ${M}`;
    return {
      svgWidth: r,
      svgHeight: i,
      path: g
    };
  }, [f, d, e]), O = S(() => {
    if (!f || !d) return {};
    const [t, l] = f, [s, n] = d, c = Math.min(t, s), m = Math.max(t, s), a = Math.min(l, n), o = Math.max(l, n), r = m - c, i = o - a;
    return {
      left: c - y.x + "px",
      top: a - y.y + "px",
      width: r + "px",
      height: i + "px"
    };
  }, [f, d, y]);
  return /* @__PURE__ */ x(
    "div",
    {
      ref: Y,
      className: "element-create-selection absolute top-0 left-0 w-full h-full z-[2] cursor-crosshair",
      onMouseDown: (t) => {
        t.stopPropagation(), D(t);
      },
      onContextMenu: (t) => {
        t.stopPropagation(), t.preventDefault();
      },
      children: f && d && /* @__PURE__ */ x(
        "div",
        {
          className: `selection absolute opacity-80 ${(e == null ? void 0 : e.type) !== "line" ? "border border-primary" : ""}`,
          style: O,
          children: (e == null ? void 0 : e.type) === "line" && v && /* @__PURE__ */ x("svg", { className: "overflow-visible", width: v.svgWidth, height: v.svgHeight, children: /* @__PURE__ */ x("path", { d: v.path, stroke: "#d14424", fill: "none", strokeWidth: "2" }) })
        }
      )
    }
  );
}
export {
  q as ElementCreateSelection
};
//# sourceMappingURL=ElementCreateSelection.js.map
