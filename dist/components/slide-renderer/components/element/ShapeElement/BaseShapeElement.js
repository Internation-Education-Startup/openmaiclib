import { jsx as a, jsxs as i } from "react/jsx-runtime";
import { useElementOutline as c } from "../hooks/useElementOutline.js";
import { useElementShadow as h } from "../hooks/useElementShadow.js";
import { useElementFlip as g } from "../hooks/useElementFlip.js";
import { useElementFill as u } from "../hooks/useElementFill.js";
import { GradientDefs as x } from "./GradientDefs.js";
import { PatternDefs as y } from "./PatternDefs.js";
function S({ elementInfo: t }) {
  const { fill: e } = u(t, "base"), { outlineWidth: o, outlineColor: l, strokeDashArray: p } = c(t.outline), { shadowStyle: s } = h(t.shadow), { flipStyle: d } = g(t.flipH, t.flipV), r = t.text || {
    content: "",
    align: "middle",
    defaultFontName: "Microsoft YaHei",
    defaultColor: "#333333"
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: "base-element-shape absolute",
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ i(
            "div",
            {
              className: "element-content relative w-full h-full",
              style: {
                opacity: t.opacity,
                filter: s ? `drop-shadow(${s})` : "",
                transform: d,
                color: r.defaultColor,
                fontFamily: r.defaultFontName
              },
              children: [
                /* @__PURE__ */ i(
                  "svg",
                  {
                    overflow: "visible",
                    width: t.width,
                    height: t.height,
                    className: "transform-origin-[0_0] overflow-visible block",
                    children: [
                      /* @__PURE__ */ i("defs", { children: [
                        t.pattern && /* @__PURE__ */ a(y, { id: `base-pattern-${t.id}`, src: t.pattern }),
                        t.gradient && /* @__PURE__ */ a(
                          x,
                          {
                            id: `base-gradient-${t.id}`,
                            type: t.gradient.type,
                            colors: t.gradient.colors,
                            rotate: t.gradient.rotate
                          }
                        )
                      ] }),
                      /* @__PURE__ */ a(
                        "g",
                        {
                          transform: `scale(${t.width / t.viewBox[0]}, ${t.height / t.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`,
                          children: /* @__PURE__ */ a(
                            "path",
                            {
                              vectorEffect: "non-scaling-stroke",
                              strokeLinecap: "butt",
                              strokeMiterlimit: "8",
                              d: t.path,
                              fill: e,
                              stroke: l,
                              strokeWidth: o,
                              strokeDasharray: p
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: `shape-text flex flex-col px-2.5 py-2.5 leading-relaxed break-words absolute inset-0 ${r.align === "top" ? "justify-start" : r.align === "bottom" ? "justify-end" : "justify-center"}`,
                    style: {
                      lineHeight: r.lineHeight,
                      letterSpacing: `${r.wordSpace || 0}px`
                    },
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "ProseMirror-static [&_p]:mb-[var(--paragraphSpace)]",
                        style: {
                          // @ts-expect-error CSS custom properties
                          "--paragraphSpace": `${r.paragraphSpace === void 0 ? 5 : r.paragraphSpace}px`
                        },
                        dangerouslySetInnerHTML: { __html: r.content }
                      }
                    )
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
  S as BaseShapeElement
};
//# sourceMappingURL=BaseShapeElement.js.map
