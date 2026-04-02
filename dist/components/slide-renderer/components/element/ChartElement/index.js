import { jsx as t, jsxs as a } from "react/jsx-runtime";
import { ElementOutline as d } from "../ElementOutline.js";
import { Chart as l } from "./Chart.js";
function c({ elementInfo: r, selectElement: i }) {
  const o = (h) => {
    r.lock || (h.stopPropagation(), i == null || i(h, r));
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: `editable-element-chart absolute ${r.lock ? "lock" : ""}`,
      style: {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`
      },
      children: /* @__PURE__ */ t(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${r.rotate}deg)` },
          children: /* @__PURE__ */ a(
            "div",
            {
              className: `element-content relative w-full h-full overflow-hidden ${r.lock ? "cursor-default" : "cursor-move"}`,
              style: {
                backgroundColor: r.fill
              },
              onMouseDown: o,
              onTouchStart: o,
              children: [
                /* @__PURE__ */ t(
                  d,
                  {
                    width: r.width,
                    height: r.height,
                    outline: r.outline
                  }
                ),
                /* @__PURE__ */ t(
                  l,
                  {
                    width: r.width,
                    height: r.height,
                    type: r.chartType,
                    data: r.data,
                    themeColors: r.themeColors,
                    textColor: r.textColor,
                    lineColor: r.lineColor,
                    options: r.options
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
}
export {
  c as ChartElement
};
//# sourceMappingURL=index.js.map
