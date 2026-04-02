import { jsx as r } from "react/jsx-runtime";
import { useSceneSelector as c } from "../../../../lib/contexts/scene-context.js";
import { useSlideBackgroundStyle as i } from "../../../../lib/hooks/use-slide-background-style.js";
function d() {
  const o = c(
    (n) => n.canvas.background
  ), { backgroundStyle: t } = i(o), e = {
    ...t,
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    position: "absolute",
    pointerEvents: "none"
    // Don't block mouse events
  };
  return /* @__PURE__ */ r("div", { className: "viewport-background", style: e });
}
export {
  d as ViewportBackground
};
//# sourceMappingURL=ViewportBackground.js.map
