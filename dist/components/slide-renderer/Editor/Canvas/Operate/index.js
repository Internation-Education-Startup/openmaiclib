import { jsxs as D, jsx as d } from "react/jsx-runtime";
import { useMemo as m } from "react";
import { useCanvasStore as x } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import { useSceneSelector as $ } from "../../../../../lib/contexts/scene-context.js";
import { ElementTypes as r } from "../../../../../lib/types/slides.js";
import { ImageElementOperate as j } from "./ImageElementOperate.js";
import { TextElementOperate as w } from "./TextElementOperate.js";
import { ShapeElementOperate as M } from "./ShapeElementOperate.js";
import { LineElementOperate as H } from "./LineElementOperate.js";
import { TableElementOperate as V } from "./TableElementOperate.js";
import { CommonElementOperate as c } from "./CommonElementOperate.js";
function Z({
  elementInfo: t,
  isSelected: E,
  isActive: O,
  isActiveGroupElement: y,
  isMultiSelect: u,
  rotateElement: A,
  scaleElement: T,
  dragLineElement: b,
  moveShapeKeypoint: v,
  openLinkDialog: X
}) {
  const p = x.use.canvasScale(), L = x.use.toolbarState(), n = $((o) => o.canvas), l = m(() => {
    if (!(n != null && n.animations)) return [];
    const s = n.elements.map((i) => i.id), f = n.animations.filter(
      (i) => s.includes(i.elId)
    ), e = [];
    for (const i of f)
      if (i.trigger === "click" || !e.length)
        e.push({ animations: [i], autoNext: !1 });
      else if (i.trigger === "meantime") {
        const a = e[e.length - 1];
        a.animations = a.animations.filter((k) => k.elId !== i.elId), a.animations.push(i), e[e.length - 1] = a;
      } else if (i.trigger === "auto") {
        const a = e[e.length - 1];
        a.autoNext = !0, e[e.length - 1] = a, e.push({ animations: [i], autoNext: !1 });
      }
    return e;
  }, [n]), h = m(() => ({
    [r.IMAGE]: j,
    [r.TEXT]: w,
    [r.SHAPE]: M,
    [r.LINE]: H,
    [r.TABLE]: V,
    [r.CHART]: c,
    [r.LATEX]: c,
    [r.VIDEO]: c,
    [r.AUDIO]: c
  })[t.type] || null, [t.type]), g = m(() => {
    if (!l) return [];
    const o = [];
    for (let s = 0; s < l.length; s++)
      l[s].animations.map((e) => e.elId).includes(t.id) && o.push(s);
    return o;
  }, [l, t.id]), N = m(() => "rotate" in t ? t.rotate : 0, [t]), S = m(() => "height" in t ? t.height : 0, [t]), C = !t.lock && (y || !u);
  return /* @__PURE__ */ D(
    "div",
    {
      className: `operate absolute z-43 select-none ${u && !O ? "opacity-20" : ""}`,
      style: {
        top: t.top * p + "px",
        left: t.left * p + "px",
        transform: `rotate(${N}deg)`,
        transformOrigin: `${t.width * p / 2}px ${S * p / 2}px`,
        pointerEvents: "auto"
        // Enable mouse events for operate controls
      },
      children: [
        E && h && /* @__PURE__ */ d(
          h,
          {
            elementInfo: t,
            handlerVisible: C,
            rotateElement: A,
            scaleElement: T,
            dragLineElement: b,
            moveShapeKeypoint: v
          }
        ),
        L === "elAnimation" && g.length > 0 && /* @__PURE__ */ d("div", { className: "animation-index absolute top-0 -left-6 text-xs", children: g.map((o) => /* @__PURE__ */ d(
          "div",
          {
            className: "index-item w-[18px] h-[18px] bg-white text-primary border border-primary flex justify-center items-center mt-[5px] first:mt-0",
            children: o + 1
          },
          o
        )) })
      ]
    }
  );
}
export {
  Z as Operate
};
//# sourceMappingURL=index.js.map
