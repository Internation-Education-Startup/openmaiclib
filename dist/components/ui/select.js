import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { Select as r } from "radix-ui";
import { cn as o } from "../../lib/utils/cn.js";
import { ChevronDownIcon as l, CheckIcon as c, ChevronUpIcon as u } from "lucide-react";
function x({ ...e }) {
  return /* @__PURE__ */ t(r.Root, { "data-slot": "select", ...e });
}
function b({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    r.Group,
    {
      "data-slot": "select-group",
      className: o("scroll-my-1 p-1", e),
      ...a
    }
  );
}
function w({ ...e }) {
  return /* @__PURE__ */ t(r.Value, { "data-slot": "select-value", ...e });
}
function z({
  className: e,
  size: a = "default",
  children: n,
  ...s
}) {
  return /* @__PURE__ */ i(
    r.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": a,
      className: o(
        "border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...s,
      children: [
        n,
        /* @__PURE__ */ t(r.Icon, { asChild: !0, children: /* @__PURE__ */ t(l, { className: "text-muted-foreground size-4 pointer-events-none" }) })
      ]
    }
  );
}
function S({
  className: e,
  children: a,
  position: n = "item-aligned",
  align: s = "center",
  ...d
}) {
  return /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ i(
    r.Content,
    {
      "data-slot": "select-content",
      className: o(
        "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      align: s,
      ...d,
      children: [
        /* @__PURE__ */ t(p, {}),
        /* @__PURE__ */ t(
          r.Viewport,
          {
            "data-position": n,
            className: o(
              "data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]",
              n === "popper" && ""
            ),
            children: a
          }
        ),
        /* @__PURE__ */ t(m, {})
      ]
    }
  ) });
}
function y({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    r.Label,
    {
      "data-slot": "select-label",
      className: o("text-muted-foreground px-2 py-1.5 text-xs", e),
      ...a
    }
  );
}
function N({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ i(
    r.Item,
    {
      "data-slot": "select-item",
      className: o(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ t("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ t(r.ItemIndicator, { children: /* @__PURE__ */ t(c, { className: "pointer-events-none" }) }) }),
        /* @__PURE__ */ t(r.ItemText, { children: a })
      ]
    }
  );
}
function I({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    r.Separator,
    {
      "data-slot": "select-separator",
      className: o("bg-border -mx-1 my-1 h-px pointer-events-none", e),
      ...a
    }
  );
}
function p({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    r.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: o(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...a,
      children: /* @__PURE__ */ t(u, {})
    }
  );
}
function m({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    r.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: o(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...a,
      children: /* @__PURE__ */ t(l, {})
    }
  );
}
export {
  x as Select,
  S as SelectContent,
  b as SelectGroup,
  N as SelectItem,
  y as SelectLabel,
  m as SelectScrollDownButton,
  p as SelectScrollUpButton,
  I as SelectSeparator,
  z as SelectTrigger,
  w as SelectValue
};
//# sourceMappingURL=select.js.map
