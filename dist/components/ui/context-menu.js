import { jsx as n, jsxs as i } from "react/jsx-runtime";
import { ContextMenu as o } from "radix-ui";
import { cn as a } from "../../lib/utils/cn.js";
import { ChevronRightIcon as s } from "lucide-react";
function f({ ...t }) {
  return /* @__PURE__ */ n(o.Root, { "data-slot": "context-menu", ...t });
}
function g({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    o.Trigger,
    {
      "data-slot": "context-menu-trigger",
      className: a("select-none", t),
      ...e
    }
  );
}
function x({ ...t }) {
  return /* @__PURE__ */ n(o.Sub, { "data-slot": "context-menu-sub", ...t });
}
function p({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(o.Portal, { children: /* @__PURE__ */ n(
    o.Content,
    {
      "data-slot": "context-menu-content",
      className: a(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-36 rounded-md p-1 shadow-md ring-1 duration-100 z-50 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto",
        t
      ),
      ...e
    }
  ) });
}
function v({
  className: t,
  inset: e,
  variant: r = "default",
  ...d
}) {
  return /* @__PURE__ */ n(
    o.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: a(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive focus:*:[svg]:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        t
      ),
      ...d
    }
  );
}
function b({
  className: t,
  inset: e,
  children: r,
  ...d
}) {
  return /* @__PURE__ */ i(
    o.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: a(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        t
      ),
      ...d,
      children: [
        r,
        /* @__PURE__ */ n(s, { className: "ml-auto" })
      ]
    }
  );
}
function h({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    o.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: a(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground min-w-32 rounded-md border p-1 shadow-lg duration-100 z-50 origin-(--radix-context-menu-content-transform-origin) overflow-hidden",
        t
      ),
      ...e
    }
  );
}
function C({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    o.Separator,
    {
      "data-slot": "context-menu-separator",
      className: a("bg-border -mx-1 my-1 h-px", t),
      ...e
    }
  );
}
function M({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: a(
        "text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-xs tracking-widest",
        t
      ),
      ...e
    }
  );
}
export {
  f as ContextMenu,
  p as ContextMenuContent,
  v as ContextMenuItem,
  C as ContextMenuSeparator,
  M as ContextMenuShortcut,
  x as ContextMenuSub,
  h as ContextMenuSubContent,
  b as ContextMenuSubTrigger,
  g as ContextMenuTrigger
};
//# sourceMappingURL=context-menu.js.map
