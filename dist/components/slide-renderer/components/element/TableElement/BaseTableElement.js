import { jsx as e } from "react/jsx-runtime";
import { StaticTable as a } from "./StaticTable.js";
function s({ elementInfo: t, target: l }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: `base-element-table absolute ${l === "thumbnail" ? "pointer-events-none" : ""}`,
      style: {
        top: `${t.top}px`,
        left: `${t.left}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      },
      children: /* @__PURE__ */ e(
        "div",
        {
          className: "rotate-wrapper w-full h-full",
          style: { transform: `rotate(${t.rotate}deg)` },
          children: /* @__PURE__ */ e("div", { className: "element-content w-full h-full", children: /* @__PURE__ */ e(a, { elementInfo: t }) })
        }
      )
    }
  );
}
export {
  s as BaseTableElement
};
//# sourceMappingURL=BaseTableElement.js.map
