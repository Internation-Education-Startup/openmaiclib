import { jsx as r, jsxs as y } from "react/jsx-runtime";
import { useCanvasStore as n } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCanvasOperations as X } from "../../../../../lib/hooks/use-canvas-operations.js";
import { useHistorySnapshot as Y } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useElementShadow as j } from "../hooks/useElementShadow.js";
import { useElementFlip as F } from "../hooks/useElementFlip.js";
import { useClipImage as T } from "./useClipImage.js";
import { useFilter as V } from "./useFilter.js";
import { ImageOutline as q } from "./ImageOutline/index.js";
import { ImageClipHandler as z } from "./ImageClipHandler.js";
function rt({ elementInfo: t, selectElement: p }) {
  const S = n.use.clipingImageElementId(), f = n.use.setClipingImageElementId(), { updateElement: k } = X(), { addHistorySnapshot: M } = Y(), { shadowStyle: h } = j(t.shadow), { flipStyle: $ } = F(t.flipH, t.flipV), { clipShape: d, imgPosition: s } = T(t), { filter: x } = V(t.filters), b = S === t.id, g = (i) => {
    t.lock || (i.stopPropagation(), p == null || p(i, t));
  }, E = (i) => {
    if (f(""), !i) return;
    const { range: N, position: o } = i, P = t.clip || {
      shape: "rect",
      range: [
        [0, 0],
        [100, 100]
      ]
    }, u = t.left + o.left, e = t.top + o.top, w = t.width + o.width, m = t.height + o.height;
    let C = 0, v = 0;
    if (t.rotate) {
      const c = u + w / 2 - (t.left + t.width / 2), l = -(e + m / 2 - (t.top + t.height / 2)), a = -t.rotate * Math.PI / 180, H = c * Math.cos(a) - l * Math.sin(a), O = c * Math.sin(a) + l * Math.cos(a);
      C = H - c, v = -(O - l);
    }
    const D = {
      clip: { ...P, range: N },
      left: u + C,
      top: e + v,
      width: w,
      height: m
    };
    k({ id: t.id, props: D }), M();
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: `editable-element-image absolute ${t.lock ? "lock" : ""}`,
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
          children: b ? /* @__PURE__ */ r(
            z,
            {
              src: t.src,
              clipData: t.clip,
              width: t.width,
              height: t.height,
              top: t.top,
              left: t.left,
              rotate: t.rotate,
              clipPath: d.style,
              onClip: E
            }
          ) : /* @__PURE__ */ y(
            "div",
            {
              className: `element-content w-full h-full relative ${t.lock ? "" : "cursor-move"}`,
              style: {
                filter: h ? `drop-shadow(${h})` : "",
                transform: $
              },
              onMouseDown: g,
              onTouchStart: g,
              children: [
                /* @__PURE__ */ r(q, { elementInfo: t }),
                /* @__PURE__ */ y(
                  "div",
                  {
                    className: "image-content w-full h-full overflow-hidden relative",
                    style: { clipPath: d.style },
                    children: [
                      /* @__PURE__ */ r(
                        "img",
                        {
                          src: t.src,
                          draggable: !1,
                          style: {
                            position: "absolute",
                            top: s.top,
                            left: s.left,
                            width: s.width,
                            height: s.height,
                            filter: x
                          },
                          alt: "",
                          onDragStart: (i) => i.preventDefault()
                        }
                      ),
                      t.colorMask && /* @__PURE__ */ r(
                        "div",
                        {
                          className: "color-mask absolute inset-0",
                          style: {
                            backgroundColor: t.colorMask
                          }
                        }
                      )
                    ]
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
  rt as ImageElement
};
//# sourceMappingURL=index.js.map
