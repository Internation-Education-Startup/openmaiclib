import { jsx as n } from "react/jsx-runtime";
import { ElementTypes as e } from "../../../lib/types/slides.js";
import { useMemo as a } from "react";
import { BaseImageElement as p } from "../components/element/ImageElement/BaseImageElement.js";
import { BaseTextElement as s } from "../components/element/TextElement/BaseTextElement.js";
import { BaseShapeElement as f } from "../components/element/ShapeElement/BaseShapeElement.js";
import { BaseLineElement as E } from "../components/element/LineElement/BaseLineElement.js";
import { BaseChartElement as c } from "../components/element/ChartElement/BaseChartElement.js";
import { BaseLatexElement as u } from "../components/element/LatexElement/BaseLatexElement.js";
import { BaseTableElement as T } from "../components/element/TableElement/BaseTableElement.js";
import { BaseVideoElement as B } from "../components/element/VideoElement/BaseVideoElement.js";
import { useSceneSelector as y } from "../../../lib/contexts/scene-context.js";
function V({ elementInfo: t, elementIndex: l, animate: i }) {
  const m = a(() => ({
    [e.IMAGE]: p,
    [e.TEXT]: s,
    [e.SHAPE]: f,
    [e.LINE]: E,
    [e.CHART]: c,
    [e.LATEX]: u,
    [e.TABLE]: T,
    [e.VIDEO]: B
    // TODO: Add other element types
    // [ElementTypes.AUDIO]: BaseAudioElement,
  })[t.type] || null, [t.type]), o = y(
    (r) => r.type === "slide" ? r.canvas.theme : {
      fontColor: "#333333",
      fontName: "Microsoft YaHei"
    }
  );
  return m ? /* @__PURE__ */ n(
    "div",
    {
      className: "screen-element",
      id: `screen-element-${t.id}`,
      style: {
        zIndex: l,
        color: o.fontColor,
        fontFamily: o.fontName
      },
      children: /* @__PURE__ */ n(m, { elementInfo: t, animate: i })
    }
  ) : null;
}
export {
  V as ScreenElement
};
//# sourceMappingURL=ScreenElement.js.map
