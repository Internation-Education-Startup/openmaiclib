import { jsx as s } from "react/jsx-runtime";
function n({ type: e, isWide: r = !1, style: o, className: b }) {
  const t = {
    top: "border-t",
    bottom: "border-b",
    left: "border-l",
    right: "border-r"
  }[e], f = r ? {
    top: 'before:absolute before:-top-2 before:-left-2 before:w-[calc(100%+16px)] before:h-4 before:bg-transparent before:cursor-move before:content-[""]',
    bottom: 'before:absolute before:-bottom-2 before:-left-2 before:w-[calc(100%+16px)] before:h-4 before:bg-transparent before:cursor-move before:content-[""]',
    left: 'before:absolute before:-top-2 before:-left-2 before:w-4 before:h-[calc(100%+16px)] before:bg-transparent before:cursor-move before:content-[""]',
    right: 'before:absolute before:-top-2 before:-right-2 before:w-4 before:h-[calc(100%+16px)] before:bg-transparent before:cursor-move before:content-[""]'
  }[e] : "";
  return /* @__PURE__ */ s(
    "div",
    {
      className: `border-line absolute inset-0 border-dashed border-primary ${t} ${f} ${b || ""}`,
      style: o
    }
  );
}
export {
  n as BorderLine
};
//# sourceMappingURL=BorderLine.js.map
