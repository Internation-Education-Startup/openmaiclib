import { jsxs as l, jsx as r } from "react/jsx-runtime";
import { useState as b, useEffect as x, useMemo as u } from "react";
import { useCanvasStore as n } from "../../../../lib/store/canvas.js";
import "../../../../lib/store/snapshot.js";
import "../../../../lib/store/keyboard.js";
import "../../../../lib/store/stage.js";
import "../../../../lib/store/settings.js";
import "../../../../lib/contexts/scene-context.js";
import { getElementListRange as f } from "../../../../lib/utils/element.js";
function k({ viewportStyles: t, elementList: m }) {
  const i = n.use.canvasScale(), h = n.use.activeElementIdList(), g = n.use.viewportRatio(), o = n.use.viewportSize(), [a, p] = b(null);
  x(() => {
    const e = m.filter((d) => h.includes(d.id));
    e.length ? p(f(e)) : p(null);
  }, [m, h]);
  const s = u(() => t.width * i / (o / 100), [t.width, i, o]), c = Array.from({ length: 20 }, (e, d) => d + 1);
  return /* @__PURE__ */ l("div", { className: "ruler text-xs", children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: "corner absolute bg-white border border-gray-200 w-5 h-5",
        style: {
          left: t.left - 25 + "px",
          top: t.top - 25 + "px"
        }
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: "h absolute bg-white border border-gray-200 h-5 flex justify-between items-center overflow-hidden",
        style: {
          width: t.width * i + "px",
          left: t.left + "px",
          top: t.top - 25 + "px"
        },
        children: [
          c.map((e) => /* @__PURE__ */ l(
            "div",
            {
              className: `ruler-marker-100 h-full leading-5 text-right flex-shrink-0 pr-[5px] relative ${s < 36 ? "[&>span]:hidden" : ""} ${s < 72 ? "before:hidden" : ""}`,
              style: { width: s + "px" },
              children: [
                e * 100 <= o && /* @__PURE__ */ r("span", { children: e * 100 }),
                /* @__PURE__ */ r("div", { className: "absolute right-0 bottom-0 w-[0.1px] h-3 bg-gray-600 last:content-none" }),
                /* @__PURE__ */ r("div", { className: "absolute right-1/2 bottom-0 w-[0.1px] h-2 bg-gray-600" })
              ]
            },
            `h-marker-100-${e}`
          )),
          a && /* @__PURE__ */ r(
            "div",
            {
              className: "range absolute top-0 bottom-0 bg-primary/10",
              style: {
                left: a.minX * i + "px",
                width: (a.maxX - a.minX) * i + "px"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: "v absolute bg-white border border-gray-200 w-5 overflow-hidden",
        style: {
          height: t.height * i + "px",
          top: t.top + "px",
          left: t.left - 25 + "px"
        },
        children: [
          c.map((e) => /* @__PURE__ */ l(
            "div",
            {
              className: `ruler-marker-100 w-full leading-5 text-right pb-[5px] relative [writing-mode:vertical-rl] ${s < 36 ? "[&>span]:hidden" : ""} ${s < 72 ? "before:hidden" : ""}`,
              style: { height: s + "px" },
              children: [
                e * 100 <= o * g && /* @__PURE__ */ r("span", { children: e * 100 }),
                /* @__PURE__ */ r("div", { className: "absolute bottom-0 right-0 h-[0.1px] w-3 bg-gray-600 last:content-none" }),
                /* @__PURE__ */ r("div", { className: "absolute bottom-1/2 right-0 h-[0.1px] w-2 bg-gray-600" })
              ]
            },
            `v-marker-100-${e}`
          )),
          a && /* @__PURE__ */ r(
            "div",
            {
              className: "range absolute left-0 right-0 bg-primary/10",
              style: {
                top: a.minY * i + "px",
                height: (a.maxY - a.minY) * i + "px"
              }
            }
          )
        ]
      }
    )
  ] });
}
export {
  k as Ruler
};
//# sourceMappingURL=Ruler.js.map
