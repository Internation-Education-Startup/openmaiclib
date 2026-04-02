import { jsx as r } from "react/jsx-runtime";
import { cn as i } from "../../lib/utils/cn.js";
function o({ src: t, alt: e, className: l }) {
  return t.startsWith("http") || t.startsWith("data:") || t.startsWith("/") ? /* @__PURE__ */ r("img", { src: t, alt: e || "", className: i("w-full h-full object-cover", l) }) : /* @__PURE__ */ r(
    "span",
    {
      role: "img",
      "aria-label": e || "",
      className: i("flex items-center justify-center w-full h-full select-none", l),
      children: t
    }
  );
}
export {
  o as AvatarDisplay
};
//# sourceMappingURL=avatar-display.js.map
