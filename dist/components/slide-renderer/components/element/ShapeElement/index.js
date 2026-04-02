import { jsx as i, jsxs as l } from "react/jsx-runtime";
import { useState as E, useEffect as N, useMemo as C, useCallback as g } from "react";
import { useCanvasStore as D } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useCanvasOperations as F } from "../../../../../lib/hooks/use-canvas-operations.js";
import { useHistorySnapshot as T } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useElementShadow as j } from "../hooks/useElementShadow.js";
import { useElementFlip as H } from "../hooks/useElementFlip.js";
import { useElementFill as M } from "../hooks/useElementFill.js";
import { useElementOutline as P } from "../hooks/useElementOutline.js";
import { GradientDefs as B } from "./GradientDefs.js";
import { PatternDefs as O } from "./PatternDefs.js";
import { ProsemirrorEditor as W } from "../ProsemirrorEditor.js";
function rt({ elementInfo: t, selectElement: p }) {
  const c = D.use.handleElementId(), { updateElement: u, removeElementProps: h } = F(), { addHistorySnapshot: e } = T(), { shadowStyle: n } = j(t.shadow), { flipStyle: v } = H(t.flipH, t.flipV), { fill: m } = M(t, "editable"), { outlineWidth: w, outlineColor: y, strokeDashArray: f } = P(t.outline), [o, x] = E(!1), d = (a, s = !0) => {
    t.lock || (a.stopPropagation(), p == null || p(a, t, s));
  };
  N(() => {
    c !== t.id && o && x(!1);
  }, [c, t.id, o]);
  const r = C(() => {
    const a = {
      content: "",
      align: "middle",
      defaultFontName: "Microsoft Yahei",
      defaultColor: "#000000"
    };
    return t.text ? t.text : a;
  }, [t.text]), k = g(
    (a, s = !1) => {
      const S = { ...r, content: a };
      u({
        id: t.id,
        props: { text: S }
      }), s || e();
    },
    [t.id, r, u, e]
  ), b = g(() => {
    if (!t.text) return;
    t.text.content.replace(/<[^>]+>/g, "") || (h({ id: t.id, propName: "text" }), e());
  }, [t.id, t.text, h, e]), $ = () => {
    x(!0);
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: `editable-element-shape absolute pointer-events-none ${t.lock ? "lock" : ""}`,
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
          children: /* @__PURE__ */ l(
            "div",
            {
              className: `element-content relative w-full h-full ${t.lock ? "" : "cursor-move"}`,
              style: {
                opacity: t.opacity,
                filter: n ? `drop-shadow(${n})` : "",
                transform: v,
                color: r.defaultColor,
                fontFamily: r.defaultFontName
              },
              onMouseDown: (a) => d(a),
              onTouchStart: (a) => d(a),
              onDoubleClick: $,
              children: [
                /* @__PURE__ */ l(
                  "svg",
                  {
                    overflow: "visible",
                    width: t.width,
                    height: t.height,
                    className: "transform-origin-[0_0] block",
                    children: [
                      /* @__PURE__ */ l("defs", { children: [
                        t.pattern && /* @__PURE__ */ i(O, { id: `editable-pattern-${t.id}`, src: t.pattern }),
                        t.gradient && !t.pattern && /* @__PURE__ */ i(
                          B,
                          {
                            id: `editable-gradient-${t.id}`,
                            type: t.gradient.type,
                            colors: t.gradient.colors,
                            rotate: t.gradient.rotate
                          }
                        )
                      ] }),
                      /* @__PURE__ */ i(
                        "g",
                        {
                          transform: `scale(${t.width / t.viewBox[0]}, ${t.height / t.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`,
                          children: /* @__PURE__ */ i(
                            "path",
                            {
                              className: "shape-path pointer-events-auto",
                              vectorEffect: "non-scaling-stroke",
                              strokeLinecap: "butt",
                              strokeMiterlimit: "8",
                              d: t.path,
                              fill: m,
                              stroke: y,
                              strokeWidth: w,
                              strokeDasharray: f
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ i(
                  "div",
                  {
                    className: `shape-text absolute inset-0 flex flex-col p-[10px] leading-[1.5] break-words pointer-events-none ${o || r.content ? "pointer-events-auto" : ""} ${r.align === "top" ? "justify-start" : r.align === "bottom" ? "justify-end" : "justify-center"}`,
                    style: {
                      lineHeight: r.lineHeight,
                      letterSpacing: `${r.wordSpace || 0}px`,
                      // @ts-expect-error - CSS custom property
                      "--paragraphSpace": `${r.paragraphSpace === void 0 ? 5 : r.paragraphSpace}px`
                    },
                    children: (o || r.content) && /* @__PURE__ */ i(
                      W,
                      {
                        elementId: t.id,
                        defaultColor: r.defaultColor,
                        defaultFontName: r.defaultFontName,
                        editable: !t.lock && o,
                        value: r.content,
                        onUpdate: ({ value: a, ignore: s }) => k(a, s),
                        onBlur: b,
                        onMouseDown: (a) => d(a, !1)
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
  rt as ShapeElement
};
//# sourceMappingURL=index.js.map
