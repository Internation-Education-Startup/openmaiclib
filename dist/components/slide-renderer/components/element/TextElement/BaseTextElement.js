import { jsx as a, jsxs as h } from "react/jsx-runtime";
import { useElementShadow as p } from "../hooks/useElementShadow.js";
import { ElementOutline as d } from "../ElementOutline.js";
function c({ elementInfo: t, target: i }) {
  const { shadowStyle: r } = p(t.shadow);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "base-element-text absolute",
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
          children: /* @__PURE__ */ h(
            "div",
            {
              className: "element-content relative p-[10px] leading-[1.5] break-words",
              style: {
                width: t.vertical ? "auto" : `${t.width}px`,
                height: t.vertical ? `${t.height}px` : "auto",
                backgroundColor: t.fill,
                opacity: t.opacity,
                textShadow: r,
                lineHeight: t.lineHeight,
                letterSpacing: `${t.wordSpace || 0}px`,
                color: t.defaultColor,
                fontFamily: t.defaultFontName,
                writingMode: t.vertical ? "vertical-rl" : "horizontal-tb",
                // @ts-expect-error - CSS custom property
                "--paragraphSpace": `${t.paragraphSpace === void 0 ? 5 : t.paragraphSpace}px`
              },
              children: [
                /* @__PURE__ */ a(
                  d,
                  {
                    width: t.width,
                    height: t.height,
                    outline: t.outline
                  }
                ),
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: `text ProseMirror-static relative ${i === "thumbnail" ? "pointer-events-none" : ""}`,
                    dangerouslySetInnerHTML: { __html: t.content }
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
  c as BaseTextElement
};
//# sourceMappingURL=BaseTextElement.js.map
