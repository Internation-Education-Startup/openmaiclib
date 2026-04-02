import { jsx as t } from "react/jsx-runtime";
function p({ style: r, className: e, onMouseDown: o }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: `rotate-handler absolute w-[10px] h-[10px] -top-[25px] -ml-[5px] border border-primary bg-white rounded-[1px] cursor-grab active:cursor-grabbing ${e || ""}`,
      style: r,
      onMouseDown: o
    }
  );
}
export {
  p as RotateHandler
};
//# sourceMappingURL=RotateHandler.js.map
