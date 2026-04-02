import { jsx as e, jsxs as n } from "react/jsx-runtime";
import { AlertDialog as o } from "radix-ui";
import { cn as l } from "../../lib/utils/cn.js";
import { Button as i } from "./button.js";
function p({ ...t }) {
  return /* @__PURE__ */ e(o.Root, { "data-slot": "alert-dialog", ...t });
}
function s({ ...t }) {
  return /* @__PURE__ */ e(o.Portal, { "data-slot": "alert-dialog-portal", ...t });
}
function u({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    o.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: l(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50",
        t
      ),
      ...a
    }
  );
}
function x({
  className: t,
  size: a = "default",
  container: r,
  ...d
}) {
  return /* @__PURE__ */ n(s, { container: r, children: [
    /* @__PURE__ */ e(u, {}),
    /* @__PURE__ */ e(
      o.Content,
      {
        "data-slot": "alert-dialog-content",
        "data-size": a,
        className: l(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-6 rounded-xl p-6 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          t
        ),
        ...d
      }
    )
  ] });
}
function z({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: l(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        t
      ),
      ...a
    }
  );
}
function A({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: l(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        t
      ),
      ...a
    }
  );
}
function D({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    o.Title,
    {
      "data-slot": "alert-dialog-title",
      className: l(
        "text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        t
      ),
      ...a
    }
  );
}
function h({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    o.Description,
    {
      "data-slot": "alert-dialog-description",
      className: l(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
        t
      ),
      ...a
    }
  );
}
function b({
  className: t,
  variant: a = "default",
  size: r = "default",
  ...d
}) {
  return /* @__PURE__ */ e(i, { variant: a, size: r, asChild: !0, children: /* @__PURE__ */ e(
    o.Action,
    {
      "data-slot": "alert-dialog-action",
      className: l(t),
      ...d
    }
  ) });
}
function w({
  className: t,
  variant: a = "outline",
  size: r = "default",
  ...d
}) {
  return /* @__PURE__ */ e(i, { variant: a, size: r, asChild: !0, children: /* @__PURE__ */ e(
    o.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: l(t),
      ...d
    }
  ) });
}
export {
  p as AlertDialog,
  b as AlertDialogAction,
  w as AlertDialogCancel,
  x as AlertDialogContent,
  h as AlertDialogDescription,
  A as AlertDialogFooter,
  z as AlertDialogHeader,
  u as AlertDialogOverlay,
  s as AlertDialogPortal,
  D as AlertDialogTitle
};
//# sourceMappingURL=alert-dialog.js.map
