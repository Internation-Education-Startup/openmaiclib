import { jsx as i, jsxs as d } from "react/jsx-runtime";
import { useRef as y, useState as w, useCallback as x, useLayoutEffect as v } from "react";
import { AnimatePresence as k, motion as a } from "motion/react";
import { useSceneSelector as b } from "../../../lib/contexts/scene-context.js";
import { useCanvasStore as m } from "../../../lib/store/canvas.js";
function N() {
  const n = m.use.spotlightElementId(), s = m.use.spotlightOptions(), c = y(null), [e, r] = w(null), u = b(
    (o) => o.canvas.elements
  ), h = x(() => {
    if (!n || !c.current) {
      r(null);
      return;
    }
    const o = document.getElementById(`screen-element-${n}`);
    if (!o) {
      r(null);
      return;
    }
    const p = o.querySelector(".element-content") ?? o, t = c.current.getBoundingClientRect(), l = p.getBoundingClientRect();
    if (t.width === 0 || t.height === 0) {
      r(null);
      return;
    }
    r({
      x: (l.left - t.left) / t.width * 100,
      y: (l.top - t.top) / t.height * 100,
      w: l.width / t.width * 100,
      h: l.height / t.height * 100
    });
  }, [n]);
  v(() => {
    h();
  }, [h, u]);
  const g = !!n && !!s && !!e, f = (s == null ? void 0 : s.dimness) ?? 0.7;
  return /* @__PURE__ */ i(
    "div",
    {
      ref: c,
      className: "absolute inset-0 z-[100] pointer-events-none overflow-hidden",
      children: /* @__PURE__ */ i(k, { mode: "wait", children: g && e && /* @__PURE__ */ i(
        a.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "absolute inset-0",
          children: /* @__PURE__ */ d(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              className: "absolute inset-0",
              children: [
                /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ d("mask", { id: `mask-${n}`, children: [
                  /* @__PURE__ */ i("rect", { x: "0", y: "0", width: "100", height: "100", fill: "white" }),
                  /* @__PURE__ */ i(
                    a.rect,
                    {
                      fill: "black",
                      initial: {
                        x: e.x - 8,
                        y: e.y - 8,
                        width: e.w + 16,
                        height: e.h + 16,
                        rx: 4
                      },
                      animate: {
                        x: e.x - 0.4,
                        y: e.y - 0.6,
                        width: e.w + 0.8,
                        height: e.h + 1.2,
                        rx: 1
                      },
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  )
                ] }) }),
                /* @__PURE__ */ i(
                  "rect",
                  {
                    width: "100",
                    height: "100",
                    fill: `rgba(0,0,0,${f})`,
                    mask: `url(#mask-${n})`,
                    className: "backdrop-blur-[1.5px]"
                  }
                ),
                /* @__PURE__ */ i(
                  a.rect,
                  {
                    initial: {
                      x: e.x - 4,
                      y: e.y - 4,
                      width: e.w + 8,
                      height: e.h + 8,
                      opacity: 0,
                      rx: 2
                    },
                    animate: {
                      x: e.x - 0.4,
                      y: e.y - 0.6,
                      width: e.w + 0.8,
                      height: e.h + 1.2,
                      opacity: 1,
                      rx: 1
                    },
                    fill: "none",
                    stroke: "rgba(255,255,255,0.7)",
                    strokeWidth: "1.2",
                    style: { vectorEffect: "non-scaling-stroke" },
                    transition: {
                      duration: 0.5,
                      delay: 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                )
              ]
            }
          )
        },
        `spotlight-${n}`
      ) })
    }
  );
}
export {
  N as SpotlightOverlay
};
//# sourceMappingURL=SpotlightOverlay.js.map
