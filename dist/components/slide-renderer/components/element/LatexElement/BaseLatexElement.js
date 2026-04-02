import { jsx as r } from "react/jsx-runtime";
import { useRef as d, useState as u, useLayoutEffect as p } from "react";
function y({ elementInfo: t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "base-element-latex absolute",
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ r("div", { className: "element-content relative w-full h-full", children: t.html ? /* @__PURE__ */ r(
            x,
            {
              html: t.html,
              width: t.width,
              height: t.height,
              align: t.align
            }
          ) : t.path && t.viewBox ? /* @__PURE__ */ r(
            "svg",
            {
              overflow: "visible",
              width: t.width,
              height: t.height,
              stroke: t.color,
              strokeWidth: t.strokeWidth,
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "transform-origin-[0_0] overflow-visible",
              children: /* @__PURE__ */ r(
                "g",
                {
                  transform: `scale(${t.width / t.viewBox[0]}, ${t.height / t.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`,
                  children: /* @__PURE__ */ r("path", { d: t.path })
                }
              )
            }
          ) : null })
        }
      )
    }
  );
}
const g = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};
function x({
  html: t,
  width: e,
  height: s,
  align: a = "center"
}) {
  const i = d(null), [h, o] = u(1);
  p(() => {
    if (!i.current) return;
    const l = i.current.scrollWidth, c = i.current.scrollHeight;
    l > 0 && c > 0 && o(Math.min(e / l, s / c));
  }, [t, e, s]);
  const n = g[a];
  return /* @__PURE__ */ r(
    "div",
    {
      style: {
        width: e,
        height: s,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: n
      },
      children: /* @__PURE__ */ r(
        "div",
        {
          ref: i,
          className: "[&_.katex-display]:!m-0",
          style: {
            transformOrigin: a === "left" ? "left center" : a === "right" ? "right center" : "center center",
            transform: `scale(${h})`,
            whiteSpace: "nowrap"
          },
          dangerouslySetInnerHTML: { __html: t }
        }
      )
    }
  );
}
export {
  y as BaseLatexElement
};
//# sourceMappingURL=BaseLatexElement.js.map
