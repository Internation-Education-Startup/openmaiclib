import { jsx as e } from "react/jsx-runtime";
import * as a from "react";
import * as r from "@radix-ui/react-checkbox";
import { Check as c } from "lucide-react";
import { cn as o } from "../../lib/utils/cn.js";
const d = a.forwardRef(({ className: i, ...t }, s) => /* @__PURE__ */ e(
  r.Root,
  {
    ref: s,
    className: o(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      i
    ),
    ...t,
    children: /* @__PURE__ */ e(r.Indicator, { className: o("flex items-center justify-center text-current"), children: /* @__PURE__ */ e(c, { className: "h-4 w-4" }) })
  }
));
d.displayName = r.Root.displayName;
export {
  d as Checkbox
};
//# sourceMappingURL=checkbox.js.map
