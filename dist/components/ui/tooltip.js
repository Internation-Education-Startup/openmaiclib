import { jsx as a, jsxs as n } from "react/jsx-runtime";
import { Tooltip as o } from "radix-ui";
import { cn as d } from "../../lib/utils/cn.js";
function l({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ a(
    o.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function f({ ...t }) {
  return /* @__PURE__ */ a(l, { children: /* @__PURE__ */ a(o.Root, { "data-slot": "tooltip", ...t }) });
}
function c({ ...t }) {
  return /* @__PURE__ */ a(o.Trigger, { "data-slot": "tooltip-trigger", ...t });
}
function u({
  className: t,
  sideOffset: e = 0,
  children: i,
  ...r
}) {
  return /* @__PURE__ */ a(o.Portal, { children: /* @__PURE__ */ n(
    o.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      className: d(
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-foreground text-background z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin)",
        t
      ),
      ...r,
      children: [
        i,
        /* @__PURE__ */ a(o.Arrow, { className: "size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 translate-y-[calc(-50%_-_2px)]" })
      ]
    }
  ) });
}
export {
  f as Tooltip,
  u as TooltipContent,
  l as TooltipProvider,
  c as TooltipTrigger
};
//# sourceMappingURL=tooltip.js.map
