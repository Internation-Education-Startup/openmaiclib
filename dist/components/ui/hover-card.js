import { jsx as r } from "react/jsx-runtime";
import { HoverCard as t } from "radix-ui";
import { cn as n } from "../../lib/utils/cn.js";
function l({ ...o }) {
  return /* @__PURE__ */ r(t.Root, { "data-slot": "hover-card", ...o });
}
function c({ ...o }) {
  return /* @__PURE__ */ r(t.Trigger, { "data-slot": "hover-card-trigger", ...o });
}
function f({
  className: o,
  align: e = "center",
  sideOffset: a = 4,
  ...d
}) {
  return /* @__PURE__ */ r(t.Portal, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ r(
    t.Content,
    {
      "data-slot": "hover-card-content",
      align: e,
      sideOffset: a,
      className: n(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-64 rounded-lg p-4 text-sm shadow-md ring-1 duration-100 z-50 origin-(--radix-hover-card-content-transform-origin) outline-hidden",
        o
      ),
      ...d
    }
  ) });
}
export {
  l as HoverCard,
  f as HoverCardContent,
  c as HoverCardTrigger
};
//# sourceMappingURL=hover-card.js.map
