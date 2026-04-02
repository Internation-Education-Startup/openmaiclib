import { jsx as i, jsxs as h } from "react/jsx-runtime";
import { ElementOutline as a } from "../ElementOutline.js";
import { Chart as l } from "./Chart.js";
function d({ elementInfo: t, target: r }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: `base-element-chart absolute ${r === "thumbnail" ? "pointer-events-none" : ""}`,
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ i(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ h(
            "div",
            {
              className: "element-content w-full h-full",
              style: {
                backgroundColor: t.fill
              },
              children: [
                /* @__PURE__ */ i(
                  a,
                  {
                    width: t.width,
                    height: t.height,
                    outline: t.outline
                  }
                ),
                /* @__PURE__ */ i(
                  l,
                  {
                    width: t.width,
                    height: t.height,
                    type: t.chartType,
                    data: t.data,
                    themeColors: t.themeColors,
                    textColor: t.textColor,
                    lineColor: t.lineColor,
                    options: t.options
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
  d as BaseChartElement
};
//# sourceMappingURL=BaseChartElement.js.map
