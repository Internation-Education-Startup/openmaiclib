import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useState as c, useCallback as N } from "react";
import { Label as b } from "../ui/label.js";
import { Input as w } from "../ui/input.js";
import { Button as g } from "../ui/button.js";
import { AlertDialog as D, AlertDialogContent as y, AlertDialogHeader as I, AlertDialogTitle as k, AlertDialogDescription as A, AlertDialogFooter as S, AlertDialogCancel as T } from "../ui/alert-dialog.js";
import { AlertTriangle as p, Trash2 as u, Loader2 as F } from "lucide-react";
import { useI18n as j } from "../../lib/hooks/use-i18n.js";
import { clearDatabase as L } from "../../lib/utils/database.js";
import { toast as f } from "sonner";
import { createLogger as B } from "../../lib/logger.js";
const G = B("GeneralSettings");
function Q() {
  const { t } = j(), [C, n] = c(!1), [o, l] = c(""), [s, m] = c(!1), d = t("settings.clearCacheConfirmPhrase"), i = o === d, h = N(async () => {
    if (i) {
      m(!0);
      try {
        await L(), localStorage.clear(), sessionStorage.clear(), f.success(t("settings.clearCacheSuccess")), setTimeout(() => {
          window.location.reload();
        }, 1e3);
      } catch (a) {
        G.error("Failed to clear cache:", a), f.error(t("settings.clearCacheFailed")), m(!1);
      }
    }
  }, [i, t]), v = t("settings.clearCacheConfirmItems").split("、").length > 1 ? t("settings.clearCacheConfirmItems").split("、") : t("settings.clearCacheConfirmItems").split(", ");
  return /* @__PURE__ */ r("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ r("div", { className: "relative rounded-xl border border-destructive/30 bg-destructive/[0.03] dark:bg-destructive/[0.06] overflow-hidden", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none",
          style: {
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 11px
            )`
          }
        }
      ),
      /* @__PURE__ */ r("div", { className: "relative p-4 space-y-4", children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ e("div", { className: "p-1.5 rounded-md bg-destructive/10 text-destructive", children: /* @__PURE__ */ e(p, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-destructive", children: t("settings.dangerZone") })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ e("p", { className: "text-sm font-medium", children: t("settings.clearCache") }),
            /* @__PURE__ */ e("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: t("settings.clearCacheDescription") })
          ] }),
          /* @__PURE__ */ r(
            g,
            {
              variant: "destructive",
              size: "sm",
              className: "shrink-0",
              onClick: () => {
                l(""), n(!0);
              },
              children: [
                /* @__PURE__ */ e(u, { className: "w-3.5 h-3.5 mr-1.5" }),
                t("settings.clearCache")
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(
      D,
      {
        open: C,
        onOpenChange: (a) => {
          s || (n(a), a || l(""));
        },
        children: /* @__PURE__ */ r(y, { children: [
          /* @__PURE__ */ r(I, { children: [
            /* @__PURE__ */ r(k, { className: "flex items-center gap-2 text-destructive", children: [
              /* @__PURE__ */ e(p, { className: "w-5 h-5" }),
              t("settings.clearCacheConfirmTitle")
            ] }),
            /* @__PURE__ */ e(A, { asChild: !0, children: /* @__PURE__ */ r("div", { className: "space-y-3", children: [
              /* @__PURE__ */ e("p", { children: t("settings.clearCacheConfirmDescription") }),
              /* @__PURE__ */ e("ul", { className: "space-y-1.5 ml-1", children: v.map((a, x) => /* @__PURE__ */ r("li", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" }),
                a.trim()
              ] }, x)) }),
              /* @__PURE__ */ r("div", { className: "pt-1", children: [
                /* @__PURE__ */ e(b, { className: "text-xs font-medium text-foreground", children: t("settings.clearCacheConfirmInput") }),
                /* @__PURE__ */ e(
                  w,
                  {
                    className: "mt-1.5 h-9 text-sm",
                    placeholder: d,
                    value: o,
                    onChange: (a) => l(a.target.value),
                    onKeyDown: (a) => {
                      a.key === "Enter" && i && h();
                    },
                    autoFocus: !0
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ r(S, { children: [
            /* @__PURE__ */ e(T, { disabled: s, children: t("common.cancel") }),
            /* @__PURE__ */ r(
              g,
              {
                variant: "destructive",
                disabled: !i || s,
                onClick: h,
                children: [
                  s ? /* @__PURE__ */ e(F, { className: "w-4 h-4 mr-1.5 animate-spin" }) : /* @__PURE__ */ e(u, { className: "w-4 h-4 mr-1.5" }),
                  t("settings.clearCacheButton")
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Q as GeneralSettings
};
//# sourceMappingURL=general-settings.js.map
