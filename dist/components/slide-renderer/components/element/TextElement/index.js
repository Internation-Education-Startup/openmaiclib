import { jsx as d, jsxs as T } from "react/jsx-runtime";
import { useRef as F, useState as E, useEffect as v, useCallback as w } from "react";
import { debounce as O } from "lodash";
import { useCanvasStore as H } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
import { useHistorySnapshot as z } from "../../../../../lib/hooks/use-history-snapshot.js";
import { useElementShadow as M } from "../hooks/useElementShadow.js";
import { ElementOutline as W } from "../ElementOutline.js";
import { ProsemirrorEditor as j } from "../ProsemirrorEditor.js";
import { useCanvasOperations as D } from "../../../../../lib/hooks/use-canvas-operations.js";
function _({ elementInfo: t, selectElement: o }) {
  const c = H.use.handleElementId(), s = H.use.isScaling(), { updateElement: a, deleteElement: x } = D(), { addHistorySnapshot: b } = z(), { shadowStyle: N } = M(t.shadow), h = F(null), [p, S] = E(-1), [u, C] = E(-1), l = (i, r = !0) => {
    t.lock || (i.stopPropagation(), o == null || o(i, t, r));
  }, k = c === t.id;
  v(() => {
    c === t.id && (s || (!t.vertical && p !== -1 && (a({
      id: t.id,
      props: { height: p }
    }), S(-1)), t.vertical && u !== -1 && (a({
      id: t.id,
      props: { width: u }
    }), C(-1))));
  }, [
    s,
    c,
    t.id,
    t.vertical,
    p,
    u,
    a
  ]);
  const $ = w(
    (i) => {
      const r = i[0].contentRect;
      if (!h.current) return;
      const e = r.height + 20, g = r.width + 20;
      !t.vertical && t.height !== e && (s ? S(e) : a({
        id: t.id,
        props: { height: e }
      })), t.vertical && t.width !== g && (s ? C(g) : a({
        id: t.id,
        props: { width: g }
      }));
    },
    [
      t.vertical,
      t.height,
      t.width,
      t.id,
      s,
      a
    ]
  );
  v(() => {
    const i = h.current, r = new ResizeObserver($);
    return i && r.observe(i), () => {
      i && r.unobserve(i);
    };
  }, [$]);
  const R = w(
    (i, r = !1) => {
      a({
        id: t.id,
        props: { content: i }
      }), r || b();
    },
    [t.id, a, b]
  ), y = w(() => {
    O(
      () => {
        t.content.replace(/<[^>]+>/g, "") || x(t.id);
      },
      300,
      { trailing: !0 }
    )();
  }, [t.content, t.id, x]);
  return v(() => {
    k || y();
  }, [k, y]), /* @__PURE__ */ d(
    "div",
    {
      className: `editable-element-text absolute ${t.lock ? "lock" : ""}`,
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ T(
            "div",
            {
              ref: h,
              className: `element-content relative p-[10px] leading-[1.5] break-words ${t.lock ? "cursor-default" : "cursor-move"}`,
              style: {
                width: t.vertical ? "auto" : `${t.width}px`,
                height: t.vertical ? `${t.height}px` : "auto",
                backgroundColor: t.fill,
                opacity: t.opacity,
                textShadow: N,
                lineHeight: t.lineHeight,
                letterSpacing: `${t.wordSpace || 0}px`,
                color: t.defaultColor,
                fontFamily: t.defaultFontName,
                writingMode: t.vertical ? "vertical-rl" : "horizontal-tb",
                // @ts-expect-error - CSS custom property
                "--paragraphSpace": `${t.paragraphSpace === void 0 ? 5 : t.paragraphSpace}px`
              },
              onMouseDown: (i) => l(i),
              onTouchStart: (i) => l(i),
              children: [
                /* @__PURE__ */ d(
                  W,
                  {
                    width: t.width,
                    height: t.height,
                    outline: t.outline
                  }
                ),
                /* @__PURE__ */ d("div", { className: "text relative", children: /* @__PURE__ */ d(
                  j,
                  {
                    elementId: t.id,
                    defaultColor: t.defaultColor,
                    defaultFontName: t.defaultFontName,
                    editable: !t.lock,
                    value: t.content,
                    onUpdate: ({ value: i, ignore: r }) => R(i, r),
                    onMouseDown: (i) => l(i, !1)
                  }
                ) }),
                /* @__PURE__ */ d("div", { className: "drag-handler top absolute left-0 right-0 h-[10px] top-0" }),
                /* @__PURE__ */ d("div", { className: "drag-handler bottom absolute left-0 right-0 h-[10px] bottom-0" })
              ]
            }
          )
        }
      )
    }
  );
}
export {
  _ as TextElement
};
//# sourceMappingURL=index.js.map
