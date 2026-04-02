import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { useRef as v, useState as E, useEffect as se } from "react";
import { useCanvasStore as o } from "../../../../lib/store/canvas.js";
import { useSceneSelector as re } from "../../../../lib/contexts/scene-context.js";
import { useKeyboardStore as ie } from "../../../../lib/store/keyboard.js";
import { useViewportSize as le } from "./hooks/useViewportSize.js";
import { useSelectElement as ae } from "./hooks/useSelectElement.js";
import { useDragElement as ce } from "./hooks/useDragElement.js";
import { useRotateElement as ue } from "./hooks/useRotateElement.js";
import { useMouseSelection as de } from "./hooks/useMouseSelection.js";
import { useScaleElement as me } from "./hooks/useScaleElement.js";
import { useDragLineElement as pe } from "./hooks/useDragLineElement.js";
import { useMoveShapeKeypoint as he } from "./hooks/useMoveShapeKeypoint.js";
import { useInsertFromCreateSelection as fe } from "./hooks/useInsertFromCreateSelection.js";
import { useDrop as ge } from "./hooks/useDrop.js";
import { AlignmentLine as xe } from "./AlignmentLine.js";
import { MouseSelection as Se } from "./MouseSelection.js";
import { ViewportBackground as be } from "./ViewportBackground.js";
import { EditableElement as ve } from "./EditableElement.js";
import { Operate as Ee } from "./Operate/index.js";
import { MultiSelectOperate as Ce } from "./Operate/MultiSelectOperate.js";
import { ElementCreateSelection as we } from "./ElementCreateSelection.js";
import { ShapeCreateCanvas as Le } from "./ShapeCreateCanvas.js";
import { Ruler as Me } from "./Ruler.js";
import { GridLines as Te } from "./GridLines.js";
import { useCanvasOperations as ye } from "../../../../lib/hooks/use-canvas-operations.js";
import { ContextMenu as Ie, ContextMenuTrigger as ke, ContextMenuContent as Re, ContextMenuSeparator as R, ContextMenuSub as _e, ContextMenuSubTrigger as $e, ContextMenuShortcut as C, ContextMenuSubContent as Ae, ContextMenuItem as _ } from "../../../ui/context-menu.js";
function at(De) {
  const S = v(null), c = v(null), p = re(
    (e) => e.canvas.elements
  ), l = o.use.canvasScale(), u = o.use.activeElementIdList(), $ = o.use.activeGroupElementId(), A = o.use.handleElementId(), w = o.use.hiddenElementIdList(), L = o.use.creatingElement(), M = o.use.creatingCustomShape(), b = o.use.showRuler(), d = o.use.gridLineSize(), D = o.use.setActiveElementIdList(), h = o.use.setGridLineSize(), N = o.use.setRulerState(), T = ie((e) => e.spaceKeyState), [V, y] = E([]), [G, z] = E(!1), i = v(p || []), [g, m] = E(p || []);
  se(() => {
    const e = p ? JSON.parse(JSON.stringify(p)) : [];
    i.current = e, m(e);
  }, [p]);
  const { viewportStyles: a, dragViewport: K } = le(S);
  ge(S);
  const { dragElement: O } = ce(i, m, y), { selectElement: B } = ae(i, O), { mouseSelection: x, mouseSelectionVisible: j, mouseSelectionQuadrant: F, updateMouseSelection: J } = de(i, c), { scaleElement: P, scaleMultiElement: q } = me(
    i,
    m,
    y
  ), { rotateElement: Q } = ue(
    i,
    m,
    c,
    l
  ), { dragLineElement: H } = pe(i, m), { moveShapeKeypoint: U } = he(i, m, l), { insertElementFromCreateSelection: W } = fe(c), X = (e) => {
    const n = e.target;
    n.closest('[data-slot="context-menu-content"]') || n.closest('[data-slot="context-menu-sub-content"]') || n.closest('[data-slot="context-menu-item"]') || n.closest('[data-slot="context-menu-sub-trigger"]') || (u.length && D([]), T ? K(e) : J(e));
  }, Y = (e) => {
    u.length || L || M || c.current && c.current.getBoundingClientRect();
  }, I = () => {
    z(!0);
  }, { pasteElement: Z, selectAllElements: ee, deleteAllElements: te } = ye(), ne = () => [
    {
      text: "粘贴",
      subText: "Ctrl + V",
      handler: Z
    },
    {
      text: "全选",
      subText: "Ctrl + A",
      handler: ee
    },
    {
      text: "标尺",
      subText: b ? "√" : "",
      handler: () => N(!b)
    },
    {
      text: "网格线",
      handler: () => h(d ? 0 : 50),
      children: [
        {
          text: "无",
          subText: d === 0 ? "√" : "",
          handler: () => h(0)
        },
        {
          text: "小",
          subText: d === 25 ? "√" : "",
          handler: () => h(25)
        },
        {
          text: "中",
          subText: d === 50 ? "√" : "",
          handler: () => h(50)
        },
        {
          text: "大",
          subText: d === 100 ? "√" : "",
          handler: () => h(100)
        }
      ]
    },
    {
      text: "重置当前页",
      handler: te
    }
  ];
  return /* @__PURE__ */ r(Ie, { children: [
    /* @__PURE__ */ t(ke, { children: /* @__PURE__ */ r(
      "div",
      {
        className: "canvas relative h-full w-full overflow-hidden bg-gray-100 select-none",
        ref: S,
        onMouseDown: X,
        onDoubleClick: Y,
        children: [
          L && /* @__PURE__ */ t(we, { onCreated: W }),
          M && /* @__PURE__ */ t(
            Le,
            {
              onCreated: (e) => {
              }
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              className: "viewport-wrapper absolute shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_0_12px_0_rgba(0,0,0,0.1)]",
              style: {
                width: `${a.width * l}px`,
                height: `${a.height * l}px`,
                left: `${a.left}px`,
                top: `${a.top}px`
              },
              children: [
                /* @__PURE__ */ r("div", { className: "operates absolute top-0 left-0 w-full h-full pointer-events-none", children: [
                  V.map((e, n) => /* @__PURE__ */ t(
                    xe,
                    {
                      type: e.type,
                      axis: e.axis,
                      length: e.length,
                      canvasScale: l
                    },
                    `${e.type}-${e.axis.x}-${e.axis.y}-${n}`
                  )),
                  u.length > 1 && /* @__PURE__ */ t(
                    Ce,
                    {
                      elementList: g,
                      scaleMultiElement: q
                    }
                  ),
                  g.map(
                    (e) => !w.includes(e.id) && /* @__PURE__ */ t(
                      Ee,
                      {
                        elementInfo: e,
                        isSelected: u.includes(e.id),
                        isActive: A === e.id,
                        isActiveGroupElement: $ === e.id,
                        isMultiSelect: u.length > 1,
                        rotateElement: Q,
                        scaleElement: P,
                        dragLineElement: H,
                        moveShapeKeypoint: U,
                        openLinkDialog: I
                      },
                      e.id
                    )
                  ),
                  /* @__PURE__ */ t(be, {})
                ] }),
                /* @__PURE__ */ r(
                  "div",
                  {
                    ref: c,
                    className: "viewport absolute top-0 left-0 origin-top-left",
                    style: {
                      width: `${a.width}px`,
                      height: `${a.height}px`,
                      transform: `scale(${l})`
                    },
                    children: [
                      d > 0 && /* @__PURE__ */ t(Te, {}),
                      j && /* @__PURE__ */ t(
                        Se,
                        {
                          top: x.top,
                          left: x.left,
                          width: x.width,
                          height: x.height,
                          quadrant: F,
                          canvasScale: l
                        }
                      ),
                      g.map(
                        (e, n) => w.includes(e.id) ? null : /* @__PURE__ */ t(
                          ve,
                          {
                            elementInfo: e,
                            elementIndex: n + 1,
                            isMultiSelect: u.length > 1,
                            selectElement: B,
                            openLinkDialog: I
                          },
                          e.id
                        )
                      )
                    ]
                  }
                )
              ]
            }
          ),
          b && /* @__PURE__ */ t(Me, { viewportStyles: a, elementList: g }),
          T && /* @__PURE__ */ t("div", { className: "drag-mask absolute inset-0 cursor-grab" }),
          G && /* @__PURE__ */ t("div", { children: "LinkDialog placeholder" })
        ]
      }
    ) }),
    /* @__PURE__ */ t(Re, { children: ne().map((e, n) => e.divider ? /* @__PURE__ */ t(R, {}, n) : e.children && e.children.length > 0 ? /* @__PURE__ */ r(_e, { children: [
      /* @__PURE__ */ r($e, { disabled: e.disable, hidden: e.hide, children: [
        e.text,
        e.subText && /* @__PURE__ */ t(C, { children: e.subText })
      ] }),
      /* @__PURE__ */ t(Ae, { children: e.children.map(
        (s, f) => s.divider ? /* @__PURE__ */ t(R, {}, f) : /* @__PURE__ */ r(
          _,
          {
            onClick: (oe) => {
              var k;
              oe.stopPropagation(), (k = s.handler) == null || k.call(s);
            },
            disabled: s.disable,
            hidden: s.hide,
            children: [
              s.text,
              s.subText && /* @__PURE__ */ t(C, { children: s.subText })
            ]
          },
          f
        )
      ) })
    ] }, n) : /* @__PURE__ */ r(
      _,
      {
        onClick: (s) => {
          var f;
          s.stopPropagation(), (f = e.handler) == null || f.call(e);
        },
        disabled: e.disable,
        hidden: e.hide,
        children: [
          e.text,
          e.subText && /* @__PURE__ */ t(C, { children: e.subText })
        ]
      },
      n
    )) })
  ] });
}
export {
  at as Canvas,
  at as default
};
//# sourceMappingURL=index.js.map
