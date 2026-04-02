import { jsx as n, jsxs as x } from "react/jsx-runtime";
import { useMemo as S } from "react";
import { ElementTypes as a } from "../../../../lib/types/slides.js";
import { ImageElement as V } from "../../components/element/ImageElement/index.js";
import { TextElement as B } from "../../components/element/TextElement/index.js";
import { LineElement as D } from "../../components/element/LineElement/index.js";
import { ShapeElement as G } from "../../components/element/ShapeElement/index.js";
import { ChartElement as X } from "../../components/element/ChartElement/index.js";
import { LatexElement as j } from "../../components/element/LatexElement/index.js";
import { TableElement as w } from "../../components/element/TableElement/index.js";
import { VideoElement as z } from "../../components/element/VideoElement/index.js";
import { ContextMenu as Z, ContextMenuTrigger as $, ContextMenuContent as f, ContextMenuSeparator as m, ContextMenuSub as F, ContextMenuSubTrigger as U, ContextMenuShortcut as p, ContextMenuSubContent as W, ContextMenuItem as C } from "../../../ui/context-menu.js";
import { ElementAlignCommands as l, ElementOrderCommands as i } from "../../../../lib/types/edit.js";
import { useCanvasOperations as q } from "../../../../lib/hooks/use-canvas-operations.js";
function xe({
  elementInfo: e,
  elementIndex: T,
  isMultiSelect: u,
  selectElement: c,
  openLinkDialog: g
}) {
  const E = S(() => ({
    [a.IMAGE]: V,
    [a.TEXT]: B,
    [a.SHAPE]: G,
    [a.LINE]: D,
    [a.CHART]: X,
    [a.LATEX]: j,
    [a.TABLE]: w,
    [a.VIDEO]: z
    // TODO: Add other element types
    // [ElementTypes.AUDIO]: AudioElement,
  })[e.type] || null, [e.type]), {
    copyElement: O,
    pasteElement: M,
    cutElement: y,
    deleteElement: A,
    lockElement: L,
    unlockElement: v,
    selectAllElements: N,
    alignElementToCanvas: d,
    orderElement: o,
    combineElements: R,
    uncombineElements: P
  } = q(), k = () => e.lock ? [
    {
      text: "解锁",
      handler: () => v(e)
    }
  ] : [
    {
      text: "剪切",
      subText: "Ctrl + X",
      handler: y
    },
    {
      text: "复制",
      subText: "Ctrl + C",
      handler: O
    },
    {
      text: "粘贴",
      subText: "Ctrl + V",
      handler: M
    },
    { divider: !0 },
    {
      text: "水平居中",
      handler: () => d(l.HORIZONTAL),
      children: [
        {
          text: "水平垂直居中",
          handler: () => d(l.CENTER)
        },
        {
          text: "水平居中",
          handler: () => d(l.HORIZONTAL)
        },
        {
          text: "左对齐",
          handler: () => d(l.LEFT)
        },
        {
          text: "右对齐",
          handler: () => d(l.RIGHT)
        }
      ]
    },
    {
      text: "垂直居中",
      handler: () => d(l.VERTICAL),
      children: [
        {
          text: "水平垂直居中",
          handler: () => d(l.CENTER)
        },
        {
          text: "垂直居中",
          handler: () => d(l.VERTICAL)
        },
        {
          text: "顶部对齐",
          handler: () => d(l.TOP)
        },
        {
          text: "底部对齐",
          handler: () => d(l.BOTTOM)
        }
      ]
    },
    { divider: !0 },
    {
      text: "置于顶层",
      disable: u && !e.groupId,
      handler: () => o(e, i.TOP),
      children: [
        {
          text: "置于顶层",
          handler: () => o(e, i.TOP)
        },
        {
          text: "上移一层",
          handler: () => o(e, i.UP)
        }
      ]
    },
    {
      text: "置于底层",
      disable: u && !e.groupId,
      handler: () => o(e, i.BOTTOM),
      children: [
        {
          text: "置于底层",
          handler: () => o(e, i.BOTTOM)
        },
        {
          text: "下移一层",
          handler: () => o(e, i.DOWN)
        }
      ]
    },
    { divider: !0 },
    {
      text: "设置链接",
      handler: g,
      disable: !0
    },
    {
      text: e.groupId ? "取消组合" : "组合",
      subText: "Ctrl + G",
      handler: e.groupId ? P : R,
      hide: !u
    },
    {
      text: "全选",
      subText: "Ctrl + A",
      handler: N
    },
    {
      text: "锁定",
      subText: "Ctrl + L",
      handler: L
    },
    {
      text: "删除",
      subText: "Delete",
      handler: A
    }
  ];
  return E ? /* @__PURE__ */ n(
    "div",
    {
      id: `editable-element-${e.id}`,
      className: "editable-element absolute",
      style: {
        zIndex: T
      },
      children: /* @__PURE__ */ x(Z, { children: [
        /* @__PURE__ */ n($, { children: /* @__PURE__ */ n(E, { elementInfo: e, selectElement: c }) }),
        /* @__PURE__ */ n(f, { children: k().map((t, h) => t.divider ? /* @__PURE__ */ n(m, {}, h) : t.children && t.children.length > 0 ? /* @__PURE__ */ x(F, { children: [
          /* @__PURE__ */ x(U, { disabled: t.disable, hidden: t.hide, children: [
            t.text,
            t.subText && /* @__PURE__ */ n(p, { children: t.subText })
          ] }),
          /* @__PURE__ */ n(W, { children: t.children.map(
            (r, s) => r.divider ? /* @__PURE__ */ n(m, {}, s) : /* @__PURE__ */ x(
              C,
              {
                onClick: (H) => {
                  var b;
                  H.stopPropagation(), (b = r.handler) == null || b.call(r);
                },
                disabled: r.disable,
                hidden: r.hide,
                children: [
                  r.text,
                  r.subText && /* @__PURE__ */ n(p, { children: r.subText })
                ]
              },
              s
            )
          ) })
        ] }, h) : /* @__PURE__ */ x(
          C,
          {
            onClick: (r) => {
              var s;
              r.stopPropagation(), (s = t.handler) == null || s.call(t);
            },
            disabled: t.disable,
            hidden: t.hide,
            children: [
              t.text,
              t.subText && /* @__PURE__ */ n(p, { children: t.subText })
            ]
          },
          h
        )) })
      ] })
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      id: `editable-element-${e.id}`,
      className: "editable-element absolute",
      style: {
        zIndex: T,
        left: e.left + "px",
        top: e.top + "px",
        width: e.width + "px"
      },
      children: /* @__PURE__ */ x("div", { className: "p-2 bg-gray-100 border border-gray-300 text-xs text-gray-500", children: [
        e.type,
        " element (not implemented)"
      ] })
    }
  );
}
export {
  xe as EditableElement
};
//# sourceMappingURL=EditableElement.js.map
