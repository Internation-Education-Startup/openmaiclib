import { jsxs as r, jsx as h } from "react/jsx-runtime";
import { useClipImage as u } from "../useClipImage.js";
import { ImageRectOutline as a } from "./image-rect-outline.js";
import { ImageEllipseOutline as o } from "./image-ellipse-outline.js";
import { ImagePolygonOutline as p } from "./image-polygon-outline.js";
function c({ elementInfo: i }) {
  const { clipShape: t } = u(i);
  return /* @__PURE__ */ r("div", { className: "image-outline", children: [
    t.type === "rect" && /* @__PURE__ */ h(
      a,
      {
        width: i.width,
        height: i.height,
        radius: t.radius,
        outline: i.outline
      }
    ),
    t.type === "ellipse" && /* @__PURE__ */ h(
      o,
      {
        width: i.width,
        height: i.height,
        outline: i.outline
      }
    ),
    t.type === "polygon" && /* @__PURE__ */ h(
      p,
      {
        width: i.width,
        height: i.height,
        outline: i.outline,
        createPath: t.createPath
      }
    )
  ] });
}
export {
  c as ImageOutline
};
//# sourceMappingURL=index.js.map
