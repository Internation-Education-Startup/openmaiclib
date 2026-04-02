import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { motion as n } from "motion/react";
function u({
  geometry: r,
  color: e = "#ff3b30",
  duration: l = 3e3
}) {
  const { centerX: a, centerY: i } = r, t = {
    x: a > 50 ? 105 : -5,
    y: i > 50 ? 105 : -5
  };
  return /* @__PURE__ */ o(
    n.div,
    {
      initial: {
        opacity: 0,
        left: `${t.x}%`,
        top: `${t.y}%`
      },
      animate: {
        opacity: 1,
        left: `${a}%`,
        top: `${i}%`
      },
      exit: {
        opacity: 0,
        left: `${t.x}%`,
        top: `${t.y}%`,
        transition: { duration: 0.25, ease: [0.4, 0, 1, 1] }
      },
      transition: {
        left: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        top: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.15 }
      },
      className: "absolute z-[101] pointer-events-none",
      children: /* @__PURE__ */ s("div", { className: "relative -translate-x-1/2 -translate-y-1/2", children: [
        /* @__PURE__ */ o(
          n.div,
          {
            animate: { scale: [1, 2.8], opacity: [0.6, 0] },
            transition: {
              repeat: 1 / 0,
              duration: 1.5,
              ease: "easeOut",
              repeatDelay: 0.3
            },
            className: "absolute inset-0 rounded-full",
            style: { border: `1.5px solid ${e}` }
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            className: "w-2.5 h-2.5 rounded-full",
            style: {
              backgroundColor: e,
              boxShadow: `0 0 8px 2px ${e}60`
            }
          }
        )
      ] })
    },
    `laser-${a}-${i}`
  );
}
export {
  u as LaserOverlay
};
//# sourceMappingURL=LaserOverlay.js.map
