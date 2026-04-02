import { jsx as r } from "react/jsx-runtime";
import { useMemo as n } from "react";
import { ElementTypes as e } from "../../../../lib/types/slides.js";
import { BaseImageElement as a } from "../element/ImageElement/BaseImageElement.js";
import { BaseTextElement as l } from "../element/TextElement/BaseTextElement.js";
import { BaseShapeElement as p } from "../element/ShapeElement/BaseShapeElement.js";
import { BaseLineElement as i } from "../element/LineElement/BaseLineElement.js";
import { BaseChartElement as s } from "../element/ChartElement/BaseChartElement.js";
import { BaseLatexElement as E } from "../element/LatexElement/BaseLatexElement.js";
import { BaseTableElement as T } from "../element/TableElement/BaseTableElement.js";
import { BaseVideoElement as f } from "../element/VideoElement/BaseVideoElement.js";
function g({ elementInfo: t, elementIndex: o }) {
  const m = n(() => ({
    [e.IMAGE]: a,
    [e.TEXT]: l,
    [e.SHAPE]: p,
    [e.LINE]: i,
    [e.CHART]: s,
    [e.LATEX]: E,
    [e.TABLE]: T,
    // TODO: Add other element types
    [e.VIDEO]: f
    // [ElementTypes.AUDIO]: BaseAudioElement,
  })[t.type] || null, [t.type]);
  return m ? /* @__PURE__ */ r(
    "div",
    {
      className: `base-element base-element-${t.id}`,
      style: {
        zIndex: o
      },
      children: /* @__PURE__ */ r(m, { elementInfo: t, target: "thumbnail" })
    }
  ) : null;
}
export {
  g as ThumbnailElement
};
//# sourceMappingURL=ThumbnailElement.js.map
