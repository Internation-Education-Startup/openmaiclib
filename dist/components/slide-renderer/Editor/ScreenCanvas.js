import { jsx as e, jsxs as f } from "react/jsx-runtime";
import { ScreenElement as S } from "./ScreenElement.js";
import { HighlightOverlay as w } from "./HighlightOverlay.js";
import { SpotlightOverlay as x } from "./SpotlightOverlay.js";
import { LaserOverlay as $ } from "./LaserOverlay.js";
import { useSlideBackgroundStyle as b } from "../../../lib/hooks/use-slide-background-style.js";
import { useCanvasStore as a } from "../../../lib/store/canvas.js";
import "../../../lib/store/snapshot.js";
import "../../../lib/store/keyboard.js";
import "../../../lib/store/stage.js";
import "../../../lib/store/settings.js";
import { useSceneSelector as p } from "../../../lib/contexts/scene-context.js";
import { findElementGeometry as h } from "../../../lib/utils/geometry.js";
import { useViewportSize as _ } from "./Canvas/hooks/useViewportSize.js";
import { useRef as I, useMemo as v } from "react";
import { AnimatePresence as N } from "motion/react";
function X() {
  const m = a.use.canvasScale(), r = p(
    (t) => t.canvas.elements
  ), d = I(null), { viewportStyles: n } = _(d), g = p(
    (t) => t.canvas.background
  ), { backgroundStyle: y } = b(g), o = a.use.laserElementId(), l = a.use.laserOptions(), s = a.use.zoomTarget(), u = v(() => !o || !r.find((i) => i.id === o) ? null : h(
    { type: "slide", content: { canvas: { elements: r } } },
    o
  ), [o, r]), c = v(() => !s || !r.find((i) => i.id === s.elementId) ? null : h(
    { type: "slide", content: { canvas: { elements: r } } },
    s.elementId
  ), [s, r]);
  return /* @__PURE__ */ e("div", { className: "relative h-full w-full overflow-hidden select-none", ref: d, children: /* @__PURE__ */ f(
    "div",
    {
      className: "absolute shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_0_12px_0_rgba(0,0,0,0.1)] rounded-lg overflow-hidden transition-transform duration-700",
      style: {
        width: `${n.width * m}px`,
        height: `${n.height * m}px`,
        left: `${n.left}px`,
        top: `${n.top}px`,
        ...s && c ? {
          transform: `scale(${s.scale})`,
          transformOrigin: `${c.centerX}% ${c.centerY}%`
        } : {}
      },
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "w-full h-full bg-position-center rounded-lg",
            style: { ...y }
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            className: "absolute top-0 left-0 origin-top-left",
            style: {
              width: `${n.width}px`,
              height: `${n.height}px`,
              transform: `scale(${m})`
            },
            children: [
              r.map((t, i) => /* @__PURE__ */ e(S, { elementInfo: t, elementIndex: i + 1 }, t.id)),
              /* @__PURE__ */ e(w, {})
            ]
          }
        ),
        /* @__PURE__ */ e(x, {}),
        /* @__PURE__ */ e("div", { className: "absolute inset-0 pointer-events-none", style: { padding: "5%" }, children: /* @__PURE__ */ e("div", { className: "relative w-full h-full", children: /* @__PURE__ */ e(N, { children: o && u && /* @__PURE__ */ e(
          $,
          {
            geometry: u,
            color: l == null ? void 0 : l.color,
            duration: l == null ? void 0 : l.duration
          },
          `laser-${o}`
        ) }) }) })
      ]
    }
  ) });
}
export {
  X as ScreenCanvas
};
//# sourceMappingURL=ScreenCanvas.js.map
