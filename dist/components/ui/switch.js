import { jsx as r } from "react/jsx-runtime";
import * as a from "react";
import * as e from "@radix-ui/react-switch";
import { cn as o } from "../../lib/utils/cn.js";
const n = a.forwardRef(({ className: t, ...i }, s) => /* @__PURE__ */ r(
  e.Root,
  {
    className: o(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      t
    ),
    ...i,
    ref: s,
    children: /* @__PURE__ */ r(
      e.Thumb,
      {
        className: o(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
n.displayName = e.Root.displayName;
export {
  n as Switch
};
//# sourceMappingURL=switch.js.map
