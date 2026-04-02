import { jsx as l, jsxs as a } from "react/jsx-runtime";
import { useMemo as i } from "react";
import { useSlideBackgroundStyle as o } from "../../../../lib/hooks/use-slide-background-style.js";
import { ThumbnailElement as u } from "./ThumbnailElement.js";
function p({
  slide: s,
  size: e,
  viewportSize: t,
  viewportRatio: n,
  visible: d = !0
}) {
  const m = i(() => e / t, [e, t]), { backgroundStyle: c } = o(s.background);
  return d ? /* @__PURE__ */ l(
    "div",
    {
      className: "thumbnail-slide bg-white overflow-hidden select-none",
      style: {
        width: `${e}px`,
        height: `${e * n}px`
      },
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "elements origin-top-left",
          style: {
            width: `${t}px`,
            height: `${t * n}px`,
            transform: `scale(${m})`
          },
          children: [
            /* @__PURE__ */ l("div", { className: "background w-full h-full bg-center absolute", style: c }),
            s.elements.map((r, h) => /* @__PURE__ */ l(u, { elementInfo: r, elementIndex: h + 1 }, r.id))
          ]
        }
      )
    }
  ) : /* @__PURE__ */ l(
    "div",
    {
      className: "thumbnail-slide bg-white overflow-hidden select-none",
      style: {
        width: `${e}px`,
        height: `${e * n}px`
      },
      children: /* @__PURE__ */ l("div", { className: "placeholder w-full h-full flex justify-center items-center text-gray-400 text-sm", children: "加载中 ..." })
    }
  );
}
export {
  p as ThumbnailSlide
};
//# sourceMappingURL=index.js.map
