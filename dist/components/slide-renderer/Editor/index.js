import { jsx as o } from "react/jsx-runtime";
import { Canvas as r } from "./Canvas/index.js";
import { ScreenCanvas as l } from "./ScreenCanvas.js";
function f({ mode: e }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ o("div", { className: "flex-1 overflow-hidden", children: e === "autonomous" ? /* @__PURE__ */ o(r, {}) : /* @__PURE__ */ o(l, {}) }) });
}
export {
  f as SlideEditor
};
//# sourceMappingURL=index.js.map
