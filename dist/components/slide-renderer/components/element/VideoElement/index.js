import { jsx as l, jsxs as i } from "react/jsx-runtime";
import { isMediaPlaceholder as o } from "../../../../../lib/store/media-generation.js";
function d({ elementInfo: t, selectElement: a }) {
  const s = (r) => {
    t.lock || (r.stopPropagation(), a == null || a(r, t));
  };
  return /* @__PURE__ */ l(
    "div",
    {
      className: `editable-element-video absolute ${t.lock ? "lock" : ""}`,
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ l(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ i(
            "div",
            {
              className: `element-content w-full h-full relative ${t.lock ? "" : "cursor-move"}`,
              onMouseDown: s,
              onTouchStart: s,
              children: [
                t.poster ? /* @__PURE__ */ l(
                  "img",
                  {
                    className: "w-full h-full",
                    style: { objectFit: "contain" },
                    src: t.poster,
                    alt: "",
                    draggable: !1,
                    onDragStart: (r) => r.preventDefault()
                  }
                ) : t.src && !o(t.src) ? /* @__PURE__ */ l(
                  "video",
                  {
                    className: "w-full h-full",
                    style: { objectFit: "contain", pointerEvents: "none" },
                    src: t.src,
                    preload: "metadata"
                  }
                ) : /* @__PURE__ */ l("div", { className: "w-full h-full bg-black/10 rounded" }),
                /* @__PURE__ */ l("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ l("div", { className: "w-12 h-12 rounded-full bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ l("svg", { className: "w-6 h-6 text-white ml-0.5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ l("polygon", { points: "5 3 19 12 5 21 5 3" }) }) }) })
              ]
            }
          )
        }
      )
    }
  );
}
export {
  d as VideoElement
};
//# sourceMappingURL=index.js.map
