import { jsx as o } from "react/jsx-runtime";
import { Label as a } from "radix-ui";
import { cn as r } from "../../lib/utils/cn.js";
function i({ className: e, ...t }) {
  return /* @__PURE__ */ o(
    a.Root,
    {
      "data-slot": "label",
      className: r(
        "gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        e
      ),
      ...t
    }
  );
}
export {
  i as Label
};
//# sourceMappingURL=label.js.map
