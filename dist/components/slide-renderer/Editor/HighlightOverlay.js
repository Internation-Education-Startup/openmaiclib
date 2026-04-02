import { jsxs as d, Fragment as u, jsx as o } from "react/jsx-runtime";
import { useMemo as m } from "react";
import { useSceneSelector as f } from "../../../lib/contexts/scene-context.js";
import { useCanvasStore as g } from "../../../lib/store/canvas.js";
function v() {
  const r = g.use.highlightedElementIds(), n = g.use.highlightOptions(), s = f(
    (t) => t.canvas.elements
  ), a = m(() => r.length ? s.filter((t) => r.includes(t.id) && t.type !== "line") : [], [s, r]);
  if (!a.length || !n)
    return null;
  const { color: e = "#ff6b6b", opacity: h = 0.3, borderWidth: i = 3, animated: l = !0 } = n;
  return /* @__PURE__ */ d(u, { children: [
    a.map((t) => {
      const p = "height" in t ? t.height : 0, c = "rotate" in t ? t.rotate : 0;
      return /* @__PURE__ */ d(
        "div",
        {
          className: "highlight-overlay absolute pointer-events-none",
          style: {
            left: `${t.left}px`,
            top: `${t.top}px`,
            width: `${t.width}px`,
            height: `${p}px`,
            transform: `rotate(${c || 0}deg)`,
            transformOrigin: "center",
            zIndex: 999,
            transition: "all 0.3s ease-in-out"
          },
          children: [
            /* @__PURE__ */ o(
              "div",
              {
                className: `absolute inset-0 rounded ${l ? "animate-pulse" : ""}`,
                style: {
                  border: `${i}px solid ${e}`,
                  boxShadow: `
                0 0 ${i * 3}px ${e},
                inset 0 0 ${i * 2}px rgba(255,255,255,${h * 0.5})
              `,
                  backgroundColor: `${e}${Math.round(h * 255).toString(16).padStart(2, "0")}`
                }
              }
            ),
            l && /* @__PURE__ */ o(
              "div",
              {
                className: "absolute inset-0 rounded animate-ping",
                style: {
                  border: `${i}px solid ${e}`,
                  opacity: 0.5,
                  animationDuration: "2s"
                }
              }
            )
          ]
        },
        t.id
      );
    }),
    /* @__PURE__ */ o("style", { jsx: !0, children: `
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        .highlight-overlay.animate-pulse {
          animation: breathe 2s ease-in-out infinite;
        }
      ` })
  ] });
}
export {
  v as HighlightOverlay
};
//# sourceMappingURL=HighlightOverlay.js.map
