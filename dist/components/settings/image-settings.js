import { jsxs as l, jsx as s, Fragment as q } from "react/jsx-runtime";
import { useState as r, useMemo as G, useCallback as V } from "react";
import { Label as v } from "../ui/label.js";
import { Input as b } from "../ui/input.js";
import { Button as m } from "../ui/button.js";
import { Dialog as X, DialogContent as Z, DialogTitle as H, DialogDescription as J } from "../ui/dialog.js";
import { useI18n as Q } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as y } from "../../lib/store/settings.js";
import { IMAGE_PROVIDERS as W } from "../../lib/media/image-providers.js";
import { EyeOff as Y, Eye as P, Loader2 as ee, Zap as se, CheckCircle2 as ae, XCircle as te, Plus as le, Settings2 as ie, Trash2 as ne } from "lucide-react";
import { cn as oe } from "../../lib/utils/cn.js";
function be({ selectedProviderId: i }) {
  const { t } = Q(), B = y((e) => e.imageModelId), D = y((e) => e.imageProvidersConfig);
  y((e) => e.setImageModelId);
  const c = y((e) => e.setImageProviderConfig), [w, z] = r(!1), [k, C] = r(!1), [N, h] = r("idle"), [S, g] = r(""), [K, p] = r(!1), [u, U] = r(null), [o, x] = r({ id: "", name: "" }), [j, A] = r(i);
  i !== j && (A(i), h("idle"), g(""));
  const a = D[i], d = W[i], E = (d == null ? void 0 : d.models) || [], f = G(
    () => (a == null ? void 0 : a.customModels) || [],
    [a == null ? void 0 : a.customModels]
  ), M = !!(a != null && a.isServerConfigured), O = (e) => {
    c(i, { apiKey: e });
  }, T = (e) => {
    c(i, { baseUrl: e });
  }, $ = async () => {
    C(!0), h("idle"), g("");
    try {
      const n = await (await fetch("/api/verify-image-provider", {
        method: "POST",
        headers: {
          "x-image-provider": i,
          "x-image-model": B || "",
          "x-api-key": (a == null ? void 0 : a.apiKey) || "",
          "x-base-url": (a == null ? void 0 : a.baseUrl) || ""
        }
      })).json();
      n.success ? (h("success"), g(t("settings.imageConnectivitySuccess"))) : (h("error"), g(`${t("settings.imageConnectivityFailed")}: ${n.message}`));
    } catch (e) {
      h("error"), g(`${t("settings.imageConnectivityFailed")}: ${e}`);
    } finally {
      C(!1);
    }
  }, I = () => {
    U(null), x({ id: "", name: "" }), p(!0);
  }, F = (e) => {
    U(e), x({ ...f[e] }), p(!0);
  }, L = V(() => {
    if (!o.id.trim()) return;
    const e = [...f];
    u !== null ? e[u] = {
      id: o.id.trim(),
      name: o.name.trim() || o.id.trim()
    } : e.push({
      id: o.id.trim(),
      name: o.name.trim() || o.id.trim()
    }), c(i, {
      customModels: e
    }), p(!1);
  }, [o, u, f, i, c]), R = (e) => {
    const n = f.filter((de, _) => _ !== e);
    c(i, {
      customModels: n
    });
  };
  return /* @__PURE__ */ l("div", { className: "space-y-6 max-w-3xl", children: [
    M && /* @__PURE__ */ s("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: t("settings.serverConfiguredNotice") }),
    /* @__PURE__ */ l("div", { className: "space-y-2", children: [
      /* @__PURE__ */ s(v, { children: "API Key" }),
      /* @__PURE__ */ l("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ l("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ s(
            b,
            {
              name: `image-api-key-${i}`,
              type: w ? "text" : "password",
              autoComplete: "new-password",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: t(M ? "settings.optionalOverride" : "settings.enterApiKey"),
              value: (a == null ? void 0 : a.apiKey) || "",
              onChange: (e) => O(e.target.value),
              className: "h-8 pr-8"
            }
          ),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              onClick: () => z(!w),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: w ? /* @__PURE__ */ s(Y, { className: "h-4 w-4" }) : /* @__PURE__ */ s(P, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ s(
          m,
          {
            variant: "outline",
            size: "sm",
            onClick: $,
            disabled: k || !(a != null && a.apiKey) && !M,
            className: "gap-1.5",
            children: k ? /* @__PURE__ */ s(ee, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ l(q, { children: [
              /* @__PURE__ */ s(se, { className: "h-3.5 w-3.5" }),
              t("settings.testConnection")
            ] })
          }
        )
      ] }),
      S && /* @__PURE__ */ s(
        "div",
        {
          className: oe(
            "rounded-lg p-3 text-sm overflow-hidden",
            N === "success" && "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
            N === "error" && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
          ),
          children: /* @__PURE__ */ l("div", { className: "flex items-start gap-2 min-w-0", children: [
            N === "success" && /* @__PURE__ */ s(ae, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            N === "error" && /* @__PURE__ */ s(te, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            /* @__PURE__ */ s("p", { className: "flex-1 min-w-0 break-all", children: S })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "space-y-2", children: [
      /* @__PURE__ */ s(v, { children: "Base URL" }),
      /* @__PURE__ */ s(
        b,
        {
          name: `image-base-url-${i}`,
          type: "url",
          autoComplete: "off",
          autoCapitalize: "none",
          autoCorrect: "off",
          spellCheck: !1,
          value: (a == null ? void 0 : a.baseUrl) || "",
          onChange: (e) => T(e.target.value),
          placeholder: (a == null ? void 0 : a.serverBaseUrl) || (d == null ? void 0 : d.defaultBaseUrl) || t("settings.enterCustomBaseUrl"),
          className: "h-8"
        }
      ),
      (() => {
        const e = (a == null ? void 0 : a.baseUrl) || (a == null ? void 0 : a.serverBaseUrl) || (d == null ? void 0 : d.defaultBaseUrl) || "";
        return e ? /* @__PURE__ */ l("p", { className: "text-xs text-muted-foreground break-all", children: [
          t("settings.requestUrl"),
          ": ",
          e
        ] }) : null;
      })()
    ] }),
    /* @__PURE__ */ l("div", { className: "space-y-3", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ s(v, { className: "text-base", children: t("settings.models") }),
        /* @__PURE__ */ l(m, { variant: "outline", size: "sm", onClick: I, className: "gap-1.5", children: [
          /* @__PURE__ */ s(le, { className: "h-3.5 w-3.5" }),
          t("settings.addNewModel")
        ] })
      ] }),
      /* @__PURE__ */ l("div", { className: "space-y-1.5", children: [
        E.map((e) => /* @__PURE__ */ s(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
            children: /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ s("div", { className: "font-mono text-sm font-medium", children: e.name }),
              /* @__PURE__ */ s("div", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: e.id })
            ] })
          },
          e.id
        )),
        f.map((e, n) => /* @__PURE__ */ l(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
            children: [
              /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ s("div", { className: "font-mono text-sm font-medium", children: e.name }),
                /* @__PURE__ */ s("div", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: e.id })
              ] }),
              /* @__PURE__ */ l("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ s(
                  m,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-8 px-2",
                    onClick: () => F(n),
                    title: t("settings.editModel"),
                    children: /* @__PURE__ */ s(ie, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ s(
                  m,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => R(n),
                    title: t("settings.deleteModel"),
                    children: /* @__PURE__ */ s(ne, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ]
          },
          `custom-${n}`
        ))
      ] })
    ] }),
    /* @__PURE__ */ s(X, { open: K, onOpenChange: p, children: /* @__PURE__ */ l(Z, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ s(H, { children: t(u !== null ? "settings.editModel" : "settings.addNewModel") }),
      /* @__PURE__ */ s(J, { className: "sr-only", children: t(u !== null ? "settings.editModel" : "settings.addNewModel") }),
      /* @__PURE__ */ l("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ l("div", { className: "space-y-2", children: [
          /* @__PURE__ */ s(v, { children: t("settings.modelId") }),
          /* @__PURE__ */ s(
            b,
            {
              value: o.id,
              onChange: (e) => x((n) => ({ ...n, id: e.target.value })),
              placeholder: "e.g. my-custom-model-v1",
              className: "h-8 font-mono text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "space-y-2", children: [
          /* @__PURE__ */ s(v, { children: t("settings.modelName") }),
          /* @__PURE__ */ s(
            b,
            {
              value: o.name,
              onChange: (e) => x((n) => ({ ...n, name: e.target.value })),
              placeholder: "e.g. My Custom Model",
              className: "h-8 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ s(m, { variant: "outline", size: "sm", onClick: () => p(!1), children: t("settings.cancelEdit") }),
          /* @__PURE__ */ s(m, { size: "sm", onClick: L, disabled: !o.id.trim(), children: t("settings.saveModel") })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  be as ImageSettings
};
//# sourceMappingURL=image-settings.js.map
