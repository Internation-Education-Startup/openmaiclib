import { jsx as t } from "react/jsx-runtime";
import * as n from "react";
import * as o from "@radix-ui/react-popover";
import { cn as s } from "../../lib/utils/cn.js";
const l = o.Root, c = o.Trigger, m = n.forwardRef(({ className: e, align: a = "center", sideOffset: r = 4, ...d }, i) => /* @__PURE__ */ t(o.Portal, { children: /* @__PURE__ */ t(
  o.Content,
  {
    ref: i,
    align: a,
    sideOffset: r,
    className: s(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...d
  }
) }));
m.displayName = o.Content.displayName;
export {
  l as Popover,
  m as PopoverContent,
  c as PopoverTrigger
};
//# sourceMappingURL=popover.js.map
