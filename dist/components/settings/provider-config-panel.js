import { jsxs as a, jsx as e, Fragment as _ } from "react/jsx-runtime";
import { useState as c, useEffect as G, useCallback as Q } from "react";
import { Button as u } from "../ui/button.js";
import { Input as W } from "../ui/input.js";
import { Label as D } from "../ui/label.js";
import { Checkbox as V } from "../ui/checkbox.js";
import { AlertDialog as Y, AlertDialogContent as R, AlertDialogHeader as ee, AlertDialogTitle as se, AlertDialogDescription as te, AlertDialogFooter as ae, AlertDialogCancel as le, AlertDialogAction as ie } from "../ui/alert-dialog.js";
import { EyeOff as ne, Eye as re, Loader2 as ce, Zap as $, CheckCircle2 as oe, XCircle as de, RotateCcw as me, Plus as he, Sparkles as pe, Wrench as ge, FileText as ue, Send as fe, Settings2 as xe, Trash2 as Ne } from "lucide-react";
import { useI18n as be } from "../../lib/hooks/use-i18n.js";
import { formatContextWindow as K } from "./utils.js";
import { cn as we } from "../../lib/utils/cn.js";
function Fe({
  provider: l,
  initialApiKey: w,
  initialBaseUrl: v,
  initialRequiresApiKey: C,
  providersConfig: f,
  onConfigChange: y,
  onSave: k,
  onEditModel: O,
  onDeleteModel: P,
  onAddModel: T,
  onResetToDefault: x,
  isBuiltIn: q
}) {
  var F, U;
  const { t } = be(), [o, M] = c(w), [d, z] = c(v), [n, j] = c(C), [A, E] = c(!1), [m, h] = c("idle"), [B, p] = c(""), [I, S] = c(!1);
  G(() => {
    M(w), z(v), j(C), h("idle"), p("");
  }, [l.id, w, v, C]);
  const H = (s) => {
    M(s), y(s, d, n);
  }, L = (s) => {
    z(s), y(o, s, n);
  }, J = (s) => {
    j(s), y(o, d, s);
  }, X = Q(async () => {
    var r;
    h("testing"), p("");
    const s = ((r = f[l.id]) == null ? void 0 : r.models) || [];
    if (s.length === 0) {
      h("error"), p(t("settings.noModelsAvailable") || "No models available for testing");
      return;
    }
    const i = s[0].id;
    try {
      const g = await (await fetch("/api/verify-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: o,
          baseUrl: d,
          model: `${l.id}:${i}`,
          providerType: l.type,
          requiresApiKey: n
        })
      })).json();
      g.success ? (h("success"), p(t("settings.connectionSuccess"))) : (h("error"), p(g.error || t("settings.connectionFailed")));
    } catch {
      h("error"), p(t("settings.connectionFailed"));
    }
  }, [o, d, l.id, l.type, n, f, t]), Z = ((F = f[l.id]) == null ? void 0 : F.models) || [], N = (U = f[l.id]) == null ? void 0 : U.isServerConfigured;
  return /* @__PURE__ */ a("div", { className: "space-y-6 max-w-3xl", children: [
    N && /* @__PURE__ */ e("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: t("settings.serverConfiguredNotice") }),
    /* @__PURE__ */ a("div", { className: "space-y-2", children: [
      /* @__PURE__ */ e(D, { children: t("settings.apiSecret") }),
      /* @__PURE__ */ a("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ a("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ e(
            W,
            {
              name: `llm-api-key-${l.id}`,
              type: A ? "text" : "password",
              autoComplete: "new-password",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: N ? t("settings.optionalOverride") : "sk-...",
              value: o,
              onChange: (s) => H(s.target.value),
              onBlur: k,
              disabled: !n && !N,
              className: "h-8 pr-8"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => E(!A),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              disabled: !n,
              children: A ? /* @__PURE__ */ e(ne, { className: "h-4 w-4" }) : /* @__PURE__ */ e(re, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e(
          u,
          {
            variant: "outline",
            size: "sm",
            onClick: X,
            disabled: m === "testing" || n && !o && !N,
            className: "gap-1.5",
            children: m === "testing" ? /* @__PURE__ */ e(ce, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ a(_, { children: [
              /* @__PURE__ */ e($, { className: "h-3.5 w-3.5" }),
              t("settings.testConnection")
            ] })
          }
        )
      ] }),
      B && /* @__PURE__ */ e(
        "div",
        {
          className: we(
            "rounded-lg p-3 text-sm overflow-hidden",
            m === "success" && "bg-green-50 text-green-700 border border-green-200",
            m === "error" && "bg-red-50 text-red-700 border border-red-200"
          ),
          children: /* @__PURE__ */ a("div", { className: "flex items-start gap-2 min-w-0", children: [
            m === "success" && /* @__PURE__ */ e(oe, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            m === "error" && /* @__PURE__ */ e(de, { className: "h-4 w-4 mt-0.5 shrink-0" }),
            /* @__PURE__ */ e("p", { className: "flex-1 min-w-0 break-all", children: B })
          ] })
        }
      ),
      /* @__PURE__ */ a("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ e(
          V,
          {
            id: `requires-api-key-${l.id}`,
            checked: n,
            onCheckedChange: (s) => {
              J(s), k();
            }
          }
        ),
        /* @__PURE__ */ e(
          "label",
          {
            htmlFor: `requires-api-key-${l.id}`,
            className: "text-sm cursor-pointer text-muted-foreground",
            children: t("settings.requiresApiKey")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "space-y-2", children: [
      /* @__PURE__ */ e(D, { children: t("settings.apiHost") }),
      /* @__PURE__ */ e(
        W,
        {
          name: `llm-base-url-${l.id}`,
          type: "url",
          autoComplete: "off",
          autoCapitalize: "none",
          autoCorrect: "off",
          spellCheck: !1,
          placeholder: l.defaultBaseUrl || "https://api.example.com/v1",
          value: d,
          onChange: (s) => L(s.target.value),
          onBlur: k,
          className: "h-8"
        }
      ),
      (() => {
        const s = d || l.defaultBaseUrl || "";
        if (!s) return null;
        let i = "";
        switch (l.type) {
          case "openai":
            i = "/chat/completions";
            break;
          case "anthropic":
            i = "/messages";
            break;
          case "google":
            i = "/models/[model]";
            break;
          default:
            i = "";
        }
        const r = s + i;
        return /* @__PURE__ */ a("p", { className: "text-xs text-muted-foreground break-all", children: [
          t("settings.requestUrl"),
          ": ",
          r
        ] });
      })()
    ] }),
    /* @__PURE__ */ a("div", { className: "space-y-3", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ e(D, { className: "text-base", children: t("settings.models") }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2 flex-wrap", children: [
          q && x && /* @__PURE__ */ a(
            u,
            {
              variant: "outline",
              size: "sm",
              onClick: () => S(!0),
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ e(me, { className: "h-3.5 w-3.5" }),
                t("settings.reset")
              ]
            }
          ),
          /* @__PURE__ */ a(u, { variant: "outline", size: "sm", onClick: T, className: "gap-1.5", children: [
            /* @__PURE__ */ e(he, { className: "h-3.5 w-3.5" }),
            t("settings.addNewModel")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-muted-foreground", children: t("settings.modelsManagementDescription") }),
      /* @__PURE__ */ e("div", { className: "space-y-1.5", children: Z.map((s, i) => {
        var r, b, g;
        return /* @__PURE__ */ a(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card",
            children: [
              /* @__PURE__ */ a("div", { className: "flex-1", children: [
                /* @__PURE__ */ e("div", { className: "font-mono text-sm font-medium mb-1.5", children: s.name }),
                /* @__PURE__ */ a("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                    ((r = s.capabilities) == null ? void 0 : r.vision) && /* @__PURE__ */ e("div", { title: t("settings.capabilities.vision"), children: /* @__PURE__ */ e(pe, { className: "h-3 w-3" }) }),
                    ((b = s.capabilities) == null ? void 0 : b.tools) && /* @__PURE__ */ e("div", { title: t("settings.capabilities.tools"), children: /* @__PURE__ */ e(ge, { className: "h-3 w-3" }) }),
                    ((g = s.capabilities) == null ? void 0 : g.streaming) && /* @__PURE__ */ e("div", { title: t("settings.capabilities.streaming"), children: /* @__PURE__ */ e($, { className: "h-3 w-3" }) })
                  ] }),
                  s.contextWindow && /* @__PURE__ */ a("span", { className: "flex items-center gap-0.5", children: [
                    /* @__PURE__ */ e(ue, { className: "h-3 w-3" }),
                    /* @__PURE__ */ e("span", { className: "text-[10px]", children: K(s.contextWindow) })
                  ] }),
                  s.outputWindow && /* @__PURE__ */ a("span", { className: "flex items-center gap-0.5", children: [
                    /* @__PURE__ */ e(fe, { className: "h-3 w-3" }),
                    /* @__PURE__ */ e("span", { className: "text-[10px]", children: K(s.outputWindow) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e(
                  u,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-8 px-2",
                    onClick: () => O(i),
                    title: t("settings.editModel"),
                    children: /* @__PURE__ */ e(xe, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ e(
                  u,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                    onClick: () => P(i),
                    title: t("settings.deleteModel"),
                    children: /* @__PURE__ */ e(Ne, { className: "h-3.5 w-3.5" })
                  }
                )
              ] })
            ]
          },
          s.id
        );
      }) })
    ] }),
    /* @__PURE__ */ e(Y, { open: I, onOpenChange: S, children: /* @__PURE__ */ a(R, { children: [
      /* @__PURE__ */ a(ee, { children: [
        /* @__PURE__ */ e(se, { children: t("settings.resetToDefault") }),
        /* @__PURE__ */ e(te, { children: t("settings.resetConfirmDescription") })
      ] }),
      /* @__PURE__ */ a(ae, { children: [
        /* @__PURE__ */ e(le, { children: t("settings.cancelEdit") }),
        /* @__PURE__ */ e(
          ie,
          {
            onClick: () => {
              S(!1), x == null || x();
            },
            children: t("settings.confirmReset")
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Fe as ProviderConfigPanel
};
//# sourceMappingURL=provider-config-panel.js.map
