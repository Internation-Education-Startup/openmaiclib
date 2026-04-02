import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { Dialog as e } from "radix-ui";
import { cn as n } from "../../lib/utils/cn.js";
import { Button as d } from "./button.js";
import { XIcon as s } from "lucide-react";
function D({ ...a }) {
  return /* @__PURE__ */ t(e.Root, { "data-slot": "dialog", ...a });
}
function u({ ...a }) {
  return /* @__PURE__ */ t(e.Portal, { "data-slot": "dialog-portal", ...a });
}
function c({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    e.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: n(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50",
        a
      ),
      ...o
    }
  );
}
function h({
  className: a,
  children: o,
  showCloseButton: l = !0,
  ...r
}) {
  return /* @__PURE__ */ i(u, { children: [
    /* @__PURE__ */ t(c, {}),
    /* @__PURE__ */ i(
      e.Content,
      {
        "data-slot": "dialog-content",
        className: n(
          "bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-3/4 gap-6 rounded-xl p-6 text-sm ring-1 duration-100 fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
          a
        ),
        ...r,
        children: [
          o,
          l && /* @__PURE__ */ t(e.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ i(d, { variant: "ghost", className: "absolute top-4 right-4", size: "icon-sm", children: [
            /* @__PURE__ */ t(s, {}),
            /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function b({ className: a, ...o }) {
  return /* @__PURE__ */ t(
    e.Title,
    {
      "data-slot": "dialog-title",
      className: n("leading-none font-medium", a),
      ...o
    }
  );
}
function N({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    e.Description,
    {
      "data-slot": "dialog-description",
      className: n(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        a
      ),
      ...o
    }
  );
}
export {
  D as Dialog,
  h as DialogContent,
  N as DialogDescription,
  c as DialogOverlay,
  u as DialogPortal,
  b as DialogTitle
};
//# sourceMappingURL=dialog.js.map
