import { jsxs as s, jsx as r, Fragment as v } from "react/jsx-runtime";
import { useState as g } from "react";
import { Label as b } from "../ui/label.js";
import { Input as d } from "../ui/input.js";
import { useI18n as N } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as x } from "../../lib/store/settings.js";
import { WEB_SEARCH_PROVIDERS as w } from "../../lib/web-search/constants.js";
import { EyeOff as U, Eye as k } from "lucide-react";
function q({ selectedProviderId: e }) {
  var p, u, f;
  const { t: a } = N(), [l, c] = g(!1), o = x((t) => t.webSearchProvidersConfig), m = x((t) => t.setWebSearchProviderConfig), n = w[e], i = !!((p = o[e]) != null && p.isServerConfigured), [C, S] = g(e);
  return e !== C && (S(e), c(!1)), /* @__PURE__ */ s("div", { className: "space-y-6 max-w-3xl", children: [
    i && /* @__PURE__ */ r("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: a("settings.serverConfiguredNotice") }),
    (n.requiresApiKey || i) && /* @__PURE__ */ s(v, { children: [
      /* @__PURE__ */ s("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ s("div", { className: "space-y-2", children: [
          /* @__PURE__ */ r(b, { className: "text-sm", children: a("settings.webSearchApiKey") }),
          /* @__PURE__ */ s("div", { className: "relative", children: [
            /* @__PURE__ */ r(
              d,
              {
                name: `web-search-api-key-${e}`,
                type: l ? "text" : "password",
                autoComplete: "new-password",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: !1,
                placeholder: a(i ? "settings.optionalOverride" : "settings.enterApiKey"),
                value: ((u = o[e]) == null ? void 0 : u.apiKey) || "",
                onChange: (t) => m(e, {
                  apiKey: t.target.value
                }),
                className: "font-mono text-sm pr-10"
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => c(!l),
                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: l ? /* @__PURE__ */ r(U, { className: "h-4 w-4" }) : /* @__PURE__ */ r(k, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("p", { className: "text-xs text-muted-foreground", children: a("settings.webSearchApiKeyHint") })
        ] }),
        /* @__PURE__ */ s("div", { className: "space-y-2", children: [
          /* @__PURE__ */ r(b, { className: "text-sm", children: a("settings.webSearchBaseUrl") }),
          /* @__PURE__ */ r(
            d,
            {
              name: `web-search-base-url-${e}`,
              autoComplete: "off",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: n.defaultBaseUrl || "https://api.tavily.com",
              value: ((f = o[e]) == null ? void 0 : f.baseUrl) || "",
              onChange: (t) => m(e, {
                baseUrl: t.target.value
              }),
              className: "text-sm"
            }
          )
        ] })
      ] }),
      (() => {
        var h;
        const t = ((h = o[e]) == null ? void 0 : h.baseUrl) || n.defaultBaseUrl || "";
        if (!t) return null;
        const y = t + "/search";
        return /* @__PURE__ */ s("p", { className: "text-xs text-muted-foreground break-all", children: [
          a("settings.requestUrl"),
          ": ",
          y
        ] });
      })()
    ] })
  ] });
}
export {
  q as WebSearchSettings
};
//# sourceMappingURL=web-search-settings.js.map
