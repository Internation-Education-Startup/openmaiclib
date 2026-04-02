import { jsx as t } from "react/jsx-runtime";
import { StaticTable as l } from "./StaticTable.js";
function h({ elementInfo: r, selectElement: a }) {
  const o = (i) => {
    r.lock || (i.stopPropagation(), a == null || a(i, r));
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: `editable-element-table absolute ${r.lock ? "lock" : ""}`,
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
              className: `element-content relative w-full h-full overflow-hidden ${r.lock ? "cursor-default" : "cursor-move"}`,
              onMouseDown: o,
              onTouchStart: o,
              children: /* @__PURE__ */ t(l, { elementInfo: r })
            }
          )
        }
      )
    }
  );
}
export {
  h as TableElement
};
//# sourceMappingURL=index.js.map
