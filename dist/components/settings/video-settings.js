import { jsxs as l, jsx as s, Fragment as q } from "react/jsx-runtime";
import { useState as r, useMemo as X, useCallback as Z } from "react";
import { Label as f } from "../ui/label.js";
import { Input as b } from "../ui/input.js";
import { Button as m } from "../ui/button.js";
import { Dialog as G, DialogContent as H, DialogTitle as I, DialogDescription as J } from "../ui/dialog.js";
import { useI18n as Q } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as M } from "../../lib/store/settings.js";
import { VIDEO_PROVIDERS as W } from "../../lib/media/video-providers.js";
import { EyeOff as Y, Eye as P, Loader2 as ee, Zap as se, CheckCircle2 as te, XCircle as ae, Plus as le, Settings2 as ie, Trash2 as oe } from "lucide-react";
import { cn as de } from "../../lib/utils/cn.js";
function be({ selectedProviderId: i }) {
  const { t: a } = Q(), D = M((e) => e.videoModelId), K = M((e) => e.videoProvidersConfig), c = M((e) => e.setVideoProviderConfig), [y, B] = r(!1), [k, C] = r(!1), [N, h] = r("idle"), [S, p] = r(""), [z, u] = r(!1), [g, U] = r(null), [d, x] = r({ id: "", name: "" }), [O, j] = r(i);
  i !== O && (j(i), h("idle"), p(""));
  const t = K[i], n = W[i], E = (n == null ? void 0 : n.models) || [], v = X(
    () => (t == null ? void 0 : t.customModels) || [],
    [t == null ? void 0 : t.customModels]
  ), w = !!(t != null && t.isServerConfigured), T = (e) => {
    c(i, { apiKey: e });
  }, $ = (e) => {
    c(i, { baseUrl: e });
  }, A = async () => {
    C(!0), h("idle"), p("");
    try {
      const o = await (await fetch("/api/verify-video-provider", {
        method: "POST",
        headers: {
          "x-video-provider": i,
          "x-video-model": D || "",
          "x-api-key": (t == null ? void 0 : t.apiKey) || "",
          "x-base-url": (t == null ? void 0 : t.baseUrl) || ""
        }
      })).json();
      o.success ? (h("success"), p(a("settings.videoConnectivitySuccess"))) : (h("error"), p(`${a("settings.videoConnectivityFailed")}: ${o.message}`));
    } catch (e) {
      h("error"), p(`${a("settings.videoConnectivityFailed")}: ${e}`);
    } finally {
      C(!1);
    }
  }, F = () => {
    U(null), x({ id: "", name: "" }), u(!0);
  }, L = (e) => {
    U(e), x({ ...v[e] }), u(!0);
  }, V = Z(() => {
    if (!d.id.trim()) return;
    const e = [...v];
    g !== null ? e[g] = {
      id: d.id.trim(),
      name: d.name.trim() || d.id.trim()
    } : e.push({
      id: d.id.trim(),
      name: d.name.trim() || d.id.trim()
    }), c(i, {
      customModels: e
    }), u(!1);
  }, [d, g, v, i, c]), R = (e) => {
    const o = v.filter((ne, _) => _ !== e);
    c(i, {
      customModels: o
    });
  };
  return /* @__PURE__ */ l("div", { className: "space-y-6 max-w-3xl", children: [
    w && /* @__PURE__ */ s("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: a("settings.serverConfiguredNotice") }),
    /* @__PURE__ */ l("div", { className: "space-y-2", children: [
      /* @__PURE__ */ s(f, { children: "API Key" }),
      /* @__PURE__ */ l("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ l("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ s(
            b,
            {
              name: `video-api-key-${i}`,
              type: y ? "text" : "password",
              autoComplete: "new-password",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: w ? a("settings.optionalOverride") : i === "kling" ? "accessKey:secretKey" : a("settings.enterApiKey"),
              value: (t == null ? void 0 : t.apiKey) || "",
              onChange: (e) => T(e.target.value),
              className: "h-8 pr-8"
            }
          ),
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              onClick: () => B(!y),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: y ? /* @__PURE__ */ s(Y, { className: "h-4 w-4" }) : /* @__PURE__ */ s(P, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ s(
          m,
          {
            variant: "outline",
            size: "sm",
            onClick: A,
            disabled: k || !(t != null && t.apiKey) && !w,
            className: "gap-1.5",
            children: k ? /* @__PURE__ */ s(ee, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ l(q, { children: [
              /* @__PURE__ */ s(se, { className: "h-3.5 w-3.5" }),
              a("settings.testConnection")
            ] })
          }
        )
      ] }),
      S && /* @__PURE__ */ s(
        "div",
        {
          className: de(
            "rounded-lg p-3 text-sm overflow-hidden",
            N === "success" && "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
            N === "error" && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
          ),
          children: /* @__PURE__ */ l("div", { className: "flex items-start gap-2 min-w-0", children: [
            N === "success" && /* @__PURE__ */ s(te, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            N === "error" && /* @__PURE__ */ s(ae, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            /* @__PURE__ */ s("p", { className: "flex-1 min-w-0 break-all", children: S })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "space-y-2", children: [
      /* @__PURE__ */ s(f, { children: "Base URL" }),
      /* @__PURE__ */ s(
        b,
        {
          name: `video-base-url-${i}`,
          type: "url",
          autoComplete: "off",
          autoCapitalize: "none",
          autoCorrect: "off",
          spellCheck: !1,
          value: (t == null ? void 0 : t.baseUrl) || "",
          onChange: (e) => $(e.target.value),
          placeholder: (t == null ? void 0 : t.serverBaseUrl) || (n == null ? void 0 : n.defaultBaseUrl) || a("settings.enterCustomBaseUrl"),
          className: "h-8"
        }
      ),
      (() => {
        const e = (t == null ? void 0 : t.baseUrl) || (t == null ? void 0 : t.serverBaseUrl) || (n == null ? void 0 : n.defaultBaseUrl) || "";
        return e ? /* @__PURE__ */ l("p", { className: "text-xs text-muted-foreground break-all", children: [
          a("settings.requestUrl"),
          ": ",
          e
        ] }) : null;
      })()
    ] }),
    /* @__PURE__ */ l("div", { className: "space-y-3", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ s(f, { className: "text-base", children: a("settings.models") }),
        /* @__PURE__ */ l(m, { variant: "outline", size: "sm", onClick: F, className: "gap-1.5", children: [
          /* @__PURE__ */ s(le, { className: "h-3.5 w-3.5" }),
          a("settings.addNewModel")
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
        v.map((e, o) => /* @__PURE__ */ l(
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
                    onClick: () => L(o),
                    title: a("settings.editModel"),
                    children: /* @__PURE__ */ s(ie, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ s(
                  m,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => R(o),
                    title: a("settings.deleteModel"),
                    children: /* @__PURE__ */ s(oe, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ]
          },
          `custom-${o}`
        ))
      ] })
    ] }),
    /* @__PURE__ */ s(G, { open: z, onOpenChange: u, children: /* @__PURE__ */ l(H, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ s(I, { children: a(g !== null ? "settings.editModel" : "settings.addNewModel") }),
      /* @__PURE__ */ s(J, { className: "sr-only", children: a(g !== null ? "settings.editModel" : "settings.addNewModel") }),
      /* @__PURE__ */ l("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ l("div", { className: "space-y-2", children: [
          /* @__PURE__ */ s(f, { children: a("settings.modelId") }),
          /* @__PURE__ */ s(
            b,
            {
              value: d.id,
              onChange: (e) => x((o) => ({ ...o, id: e.target.value })),
              placeholder: "e.g. my-custom-model-v1",
              className: "h-8 font-mono text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "space-y-2", children: [
          /* @__PURE__ */ s(f, { children: a("settings.modelName") }),
          /* @__PURE__ */ s(
            b,
            {
              value: d.name,
              onChange: (e) => x((o) => ({ ...o, name: e.target.value })),
              placeholder: "e.g. My Custom Model",
              className: "h-8 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ s(m, { variant: "outline", size: "sm", onClick: () => u(!1), children: a("settings.cancelEdit") }),
          /* @__PURE__ */ s(m, { size: "sm", onClick: V, disabled: !d.id.trim(), children: a("settings.saveModel") })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  be as VideoSettings
};
//# sourceMappingURL=video-settings.js.map
