import { jsx as r } from "react/jsx-runtime";
import { cva as o } from "class-variance-authority";
import { Tabs as e } from "radix-ui";
import { cn as i } from "../../lib/utils/cn.js";
function b({
  className: a,
  orientation: t = "horizontal",
  ...n
}) {
  return /* @__PURE__ */ r(
    e.Root,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      className: i("gap-2 group/tabs flex data-[orientation=horizontal]:flex-col", a),
      ...n
    }
  );
}
const s = o(
  "rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function f({
  className: a,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ r(
    e.List,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: i(s({ variant: t }), a),
      ...n
    }
  );
}
function p({ className: a, ...t }) {
  return /* @__PURE__ */ r(
    e.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: i(
        "gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background dark:data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 data-active:text-foreground",
        "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        a
      ),
      ...t
    }
  );
}
function c({ className: a, ...t }) {
  return /* @__PURE__ */ r(
    e.Content,
    {
      "data-slot": "tabs-content",
      className: i("text-sm flex-1 outline-none", a),
      ...t
    }
  );
}
export {
  b as Tabs,
  c as TabsContent,
  f as TabsList,
  p as TabsTrigger,
  s as tabsListVariants
};
//# sourceMappingURL=tabs.js.map
