import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useState as s } from "react";
import { Dialog as P, DialogContent as q, DialogTitle as I, DialogDescription as B } from "../ui/dialog.js";
import { Button as N } from "../ui/button.js";
import { Input as c } from "../ui/input.js";
import { Label as l } from "../ui/label.js";
import { Checkbox as M } from "../ui/checkbox.js";
import { Plus as j } from "lucide-react";
import { useI18n as K } from "../../lib/hooks/use-i18n.js";
import { cn as d } from "../../lib/utils/cn.js";
function S({ open: o, onOpenChange: p, onAdd: x }) {
  const { t: r } = K(), [m, g] = s(""), [a, n] = s("openai"), [h, u] = s(""), [v, b] = s(""), [y, f] = s(!0), [C, k] = s(o);
  o !== C && (k(o), o || (g(""), n("openai"), u(""), b(""), f(!0)));
  const D = () => {
    p(!1);
  }, A = () => {
    x({
      name: m,
      type: a,
      baseUrl: h,
      icon: v,
      requiresApiKey: y
    });
  };
  return /* @__PURE__ */ e(P, { open: o, onOpenChange: p, children: /* @__PURE__ */ t(q, { className: "sm:max-w-[450px]", children: [
    /* @__PURE__ */ e(I, { className: "sr-only", children: r("settings.addProviderDialog") }),
    /* @__PURE__ */ e(B, { className: "sr-only", children: r("settings.addProviderDescription") }),
    /* @__PURE__ */ t("div", { className: "space-y-4", children: [
      /* @__PURE__ */ e("div", { className: "pb-3 border-b", children: /* @__PURE__ */ e("h2", { className: "text-lg font-semibold", children: r("settings.addProviderDialog") }) }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e(l, { children: r("settings.providerName") }),
        /* @__PURE__ */ e(
          c,
          {
            placeholder: r("settings.providerNamePlaceholder"),
            value: m,
            onChange: (i) => g(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e(l, { children: r("settings.providerApiMode") }),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => n("openai"),
              className: d(
                "p-2 rounded-lg border text-left text-sm transition-colors",
                a === "openai" ? "bg-primary/5 border-primary/50" : "hover:bg-muted/50 border-transparent"
              ),
              children: r("settings.apiModeOpenAI")
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => n("anthropic"),
              className: d(
                "p-2 rounded-lg border text-left text-sm transition-colors",
                a === "anthropic" ? "bg-primary/5 border-primary/50" : "hover:bg-muted/50 border-transparent"
              ),
              children: r("settings.apiModeAnthropic")
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => n("google"),
              className: d(
                "p-2 rounded-lg border text-left text-sm transition-colors",
                a === "google" ? "bg-primary/5 border-primary/50" : "hover:bg-muted/50 border-transparent"
              ),
              children: r("settings.apiModeGoogle")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e(l, { children: r("settings.defaultBaseUrl") }),
        /* @__PURE__ */ e(
          c,
          {
            type: "url",
            placeholder: "https://api.example.com/v1",
            value: h,
            onChange: (i) => u(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e(l, { children: r("settings.providerIcon") }),
        /* @__PURE__ */ e(
          c,
          {
            type: "url",
            placeholder: "https://example.com/icon.svg",
            value: v,
            onChange: (i) => b(i.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ e(
          M,
          {
            id: "requires-api-key",
            checked: y,
            onCheckedChange: (i) => f(i)
          }
        ),
        /* @__PURE__ */ e("label", { htmlFor: "requires-api-key", className: "text-sm cursor-pointer", children: r("settings.requiresApiKey") })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2 pt-3 border-t", children: [
        /* @__PURE__ */ e(N, { variant: "outline", size: "sm", onClick: D, children: r("settings.cancelEdit") }),
        /* @__PURE__ */ t(N, { size: "sm", onClick: A, className: "gap-1.5", children: [
          /* @__PURE__ */ e(j, { className: "h-3.5 w-3.5" }),
          r("settings.addProviderButton")
        ] })
      ] })
    ] })
  ] }) });
}
export {
  S as AddProviderDialog
};
//# sourceMappingURL=add-provider-dialog.js.map
