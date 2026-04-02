import { jsx as t } from "react/jsx-runtime";
import { useRef as d, useState as u, useLayoutEffect as p } from "react";
function g({ elementInfo: r, selectElement: i }) {
  const s = (a) => {
    r.lock || (a.stopPropagation(), i == null || i(a, r));
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: `editable-element-latex absolute ${r.lock ? "lock" : ""}`,
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
          children: /* @__PURE__ */ t(
            "div",
            {
              className: `element-content relative w-full h-full ${r.lock ? "cursor-default" : "cursor-move"}`,
              onMouseDown: s,
              onTouchStart: s,
              children: r.html ? /* @__PURE__ */ t(
                w,
                {
                  html: r.html,
                  width: r.width,
                  height: r.height
                }
              ) : r.path && r.viewBox ? /* @__PURE__ */ t(
                "svg",
                {
                  overflow: "visible",
                  width: r.width,
                  height: r.height,
                  stroke: r.color,
                  strokeWidth: r.strokeWidth,
                  fill: "none",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "transform-origin-[0_0]",
                  children: /* @__PURE__ */ t(
                    "g",
                    {
                      transform: `scale(${r.width / r.viewBox[0]}, ${r.height / r.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`,
                      children: /* @__PURE__ */ t("path", { d: r.path })
                    }
                  )
                }
              ) : null
            }
          )
        }
      )
    }
  );
}
function w({ html: r, width: i, height: s }) {
  const a = d(null), [c, l] = u(1);
  return p(() => {
    if (!a.current) return;
    const o = a.current.scrollWidth, h = a.current.scrollHeight;
    o > 0 && h > 0 && l(Math.min(i / o, s / h));
  }, [r, i, s]), /* @__PURE__ */ t("div", { style: { width: i, height: s, overflow: "hidden" }, children: /* @__PURE__ */ t(
    "div",
    {
      ref: a,
      className: "[&_.katex-display]:!m-0",
      style: {
        transformOrigin: "0 0",
        transform: `scale(${c})`,
        whiteSpace: "nowrap"
      },
      dangerouslySetInnerHTML: { __html: r }
    }
  ) });
}
export {
  g as LatexElement
};
//# sourceMappingURL=index.js.map
