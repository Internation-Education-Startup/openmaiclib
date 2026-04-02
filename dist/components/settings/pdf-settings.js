import { jsxs as n, jsx as t, Fragment as y } from "react/jsx-runtime";
import { useState as u } from "react";
import { Label as g } from "../ui/label.js";
import { Input as k } from "../ui/input.js";
import { Badge as $ } from "../ui/badge.js";
import { Button as A } from "../ui/button.js";
import { useI18n as B } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as w } from "../../lib/store/settings.js";
import { PDF_PROVIDERS as D } from "../../lib/pdf/constants.js";
import { Loader2 as O, Zap as j, EyeOff as E, Eye as L, CheckCircle2 as S, XCircle as z } from "lucide-react";
import { cn as M } from "../../lib/utils/cn.js";
function P(r, e) {
  return {
    text: e("settings.featureText"),
    images: e("settings.featureImages"),
    tables: e("settings.featureTables"),
    formulas: e("settings.featureFormulas"),
    "layout-analysis": e("settings.featureLayoutAnalysis"),
    metadata: e("settings.featureMetadata")
  }[r] || r;
}
function Y({ selectedProviderId: r }) {
  var N;
  const { t: e } = B(), [m, f] = u(!1), [l, i] = u("idle"), [h, c] = u(""), b = w((a) => a.pdfProvidersConfig), x = w((a) => a.setPDFProviderConfig), C = D[r], p = !!((N = b[r]) != null && N.isServerConfigured), s = b[r], v = !!(s != null && s.baseUrl), U = r === "mineru", [F, K] = u(r);
  r !== F && (K(r), f(!1), i("idle"), c(""));
  const T = async () => {
    const a = s == null ? void 0 : s.baseUrl;
    if (a) {
      i("testing"), c("");
      try {
        const d = await (await fetch("/api/verify-pdf-provider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerId: r,
            apiKey: (s == null ? void 0 : s.apiKey) || "",
            baseUrl: a
          })
        })).json();
        d.success ? (i("success"), c(e("settings.connectionSuccess"))) : (i("error"), c(`${e("settings.connectionFailed")}: ${d.error}`));
      } catch (o) {
        i("error");
        const d = o instanceof Error ? o.message : String(o);
        c(`${e("settings.connectionFailed")}: ${d}`);
      }
    }
  };
  return /* @__PURE__ */ n("div", { className: "space-y-6 max-w-3xl", children: [
    p && /* @__PURE__ */ t("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: e("settings.serverConfiguredNotice") }),
    (U || p) && /* @__PURE__ */ n(y, { children: [
      /* @__PURE__ */ n("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ n("div", { className: "space-y-2", children: [
          /* @__PURE__ */ t(g, { className: "text-sm", children: e("settings.pdfBaseUrl") }),
          /* @__PURE__ */ n("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ t(
              k,
              {
                name: `pdf-base-url-${r}`,
                autoComplete: "off",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: !1,
                placeholder: "http://localhost:8080",
                value: (s == null ? void 0 : s.baseUrl) || "",
                onChange: (a) => x(r, { baseUrl: a.target.value }),
                className: "text-sm"
              }
            ),
            /* @__PURE__ */ t(
              A,
              {
                variant: "outline",
                size: "sm",
                onClick: T,
                disabled: l === "testing" || !v,
                className: "gap-1.5 shrink-0",
                children: l === "testing" ? /* @__PURE__ */ t(O, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ n(y, { children: [
                  /* @__PURE__ */ t(j, { className: "h-3.5 w-3.5" }),
                  e("settings.testConnection")
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "space-y-2", children: [
          /* @__PURE__ */ n(g, { className: "text-sm", children: [
            e("settings.pdfApiKey"),
            /* @__PURE__ */ n("span", { className: "text-muted-foreground ml-1 font-normal", children: [
              "(",
              e("settings.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ n("div", { className: "relative", children: [
            /* @__PURE__ */ t(
              k,
              {
                name: `pdf-api-key-${r}`,
                type: m ? "text" : "password",
                autoComplete: "new-password",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: !1,
                placeholder: e(p ? "settings.optionalOverride" : "settings.enterApiKey"),
                value: (s == null ? void 0 : s.apiKey) || "",
                onChange: (a) => x(r, {
                  apiKey: a.target.value
                }),
                className: "font-mono text-sm pr-10"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => f(!m),
                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: m ? /* @__PURE__ */ t(E, { className: "h-4 w-4" }) : /* @__PURE__ */ t(L, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ] }),
      h && /* @__PURE__ */ t(
        "div",
        {
          className: M(
            "rounded-lg p-3 text-sm",
            l === "success" && "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
            l === "error" && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800"
          ),
          children: /* @__PURE__ */ n("div", { className: "flex items-center gap-2", children: [
            l === "success" && /* @__PURE__ */ t(S, { className: "h-4 w-4 shrink-0" }),
            l === "error" && /* @__PURE__ */ t(z, { className: "h-4 w-4 shrink-0" }),
            /* @__PURE__ */ t("span", { className: "break-all", children: h })
          ] })
        }
      ),
      (() => {
        const a = (s == null ? void 0 : s.baseUrl) || "";
        if (!a) return null;
        const o = a + "/file_parse";
        return /* @__PURE__ */ n("p", { className: "text-xs text-muted-foreground break-all", children: [
          e("settings.requestUrl"),
          ": ",
          o
        ] });
      })()
    ] }),
    /* @__PURE__ */ n("div", { className: "space-y-2", children: [
      /* @__PURE__ */ t(g, { className: "text-sm", children: e("settings.pdfFeatures") }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: C.features.map((a) => /* @__PURE__ */ n($, { variant: "secondary", className: "font-normal", children: [
        /* @__PURE__ */ t(S, { className: "h-3 w-3 mr-1" }),
        P(a, e)
      ] }, a)) })
    ] })
  ] });
}
export {
  Y as PDFSettings
};
//# sourceMappingURL=pdf-settings.js.map
