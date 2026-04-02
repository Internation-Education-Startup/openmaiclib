import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { useState as j, useEffect as O, useCallback as X } from "react";
import { Dialog as Z, DialogContent as _, DialogTitle as G, DialogDescription as H } from "../ui/dialog.js";
import { Button as f } from "../ui/button.js";
import { Input as h } from "../ui/input.js";
import { Label as m } from "../ui/label.js";
import { Checkbox as g } from "../ui/checkbox.js";
import { Sparkles as Q, Wrench as R, Zap as V, Loader2 as Y, CheckCircle as v, XCircle as B } from "lucide-react";
import { useI18n as U } from "../../lib/hooks/use-i18n.js";
import { cn as F } from "../../lib/utils/cn.js";
function ce({
  open: p,
  onOpenChange: w,
  editingModel: e,
  setEditingModel: i,
  onSave: P,
  onAutoSave: a,
  providerId: u,
  apiKey: N,
  baseUrl: C,
  providerType: k,
  requiresApiKey: b,
  isServerConfigured: T
}) {
  var I, W, D;
  const { t: l } = U(), [t, n] = j("idle"), [y, d] = j("");
  O(() => {
    p || (n("idle"), d(""));
  }, [p]);
  const L = () => {
    w(!1), i(null);
  }, z = X(async () => {
    if (e) {
      n("testing"), d("");
      try {
        const o = await (await fetch("/api/verify-model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: N,
            baseUrl: C,
            model: `${u}:${e.model.id}`,
            providerType: k,
            requiresApiKey: b
          })
        })).json();
        o.success ? (n("success"), d(l("settings.connectionSuccess"))) : (n("error"), d(o.error || l("settings.connectionFailed")));
      } catch {
        n("error"), d(l("settings.connectionFailed"));
      }
    }
  }, [e, N, C, u, k, b, l]);
  return e ? /* @__PURE__ */ s(Z, { open: p, onOpenChange: w, children: /* @__PURE__ */ c(_, { className: "sm:max-w-[500px]", children: [
    /* @__PURE__ */ s(G, { className: "sr-only", children: e.modelIndex === null ? l("settings.addNewModel") : l("settings.editModel") }),
    /* @__PURE__ */ s(H, { className: "sr-only", children: e.modelIndex === null ? l("settings.addNewModelDescription") : l("settings.editModelDescription") }),
    /* @__PURE__ */ c("div", { className: "space-y-4", children: [
      /* @__PURE__ */ s("div", { className: "pb-3 border-b", children: /* @__PURE__ */ s("h2", { className: "text-lg font-semibold", children: e.modelIndex === null ? l("settings.addNewModel") : l("settings.editModel") }) }),
      /* @__PURE__ */ c("div", { className: "space-y-2", children: [
        /* @__PURE__ */ s(m, { children: l("settings.modelId") }),
        /* @__PURE__ */ s(
          h,
          {
            placeholder: l("settings.modelIdPlaceholder"),
            value: e.model.id,
            onChange: (r) => {
              const o = r.target.value, x = e.model.name, $ = e.model.id, J = !x || x === $;
              i({
                ...e,
                model: {
                  ...e.model,
                  id: o,
                  name: J ? o : x
                }
              }), n("idle"), d("");
            },
            onBlur: () => a == null ? void 0 : a()
          }
        )
      ] }),
      /* @__PURE__ */ c("div", { className: "space-y-2", children: [
        /* @__PURE__ */ s(m, { children: l("settings.modelName") }),
        /* @__PURE__ */ s(
          h,
          {
            placeholder: l("settings.modelNamePlaceholder"),
            value: e.model.name,
            onChange: (r) => i({
              ...e,
              model: { ...e.model, name: r.target.value }
            }),
            onBlur: () => a == null ? void 0 : a()
          }
        )
      ] }),
      /* @__PURE__ */ c("div", { className: "space-y-2", children: [
        /* @__PURE__ */ s(m, { children: l("settings.modelCapabilities") }),
        /* @__PURE__ */ c("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ c("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ s(
              g,
              {
                id: "cap-vision",
                checked: ((I = e.model.capabilities) == null ? void 0 : I.vision) || !1,
                onCheckedChange: (r) => {
                  i({
                    ...e,
                    model: {
                      ...e.model,
                      capabilities: {
                        ...e.model.capabilities,
                        vision: r
                      }
                    }
                  }), a == null || a();
                }
              }
            ),
            /* @__PURE__ */ c(
              "label",
              {
                htmlFor: "cap-vision",
                className: "text-sm flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ s(Q, { className: "h-3.5 w-3.5" }),
                  l("settings.capabilities.vision")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ c("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ s(
              g,
              {
                id: "cap-tools",
                checked: ((W = e.model.capabilities) == null ? void 0 : W.tools) || !1,
                onCheckedChange: (r) => {
                  i({
                    ...e,
                    model: {
                      ...e.model,
                      capabilities: {
                        ...e.model.capabilities,
                        tools: r
                      }
                    }
                  }), a == null || a();
                }
              }
            ),
            /* @__PURE__ */ c(
              "label",
              {
                htmlFor: "cap-tools",
                className: "text-sm flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ s(R, { className: "h-3.5 w-3.5" }),
                  l("settings.capabilities.tools")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ c("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ s(
              g,
              {
                id: "cap-streaming",
                checked: ((D = e.model.capabilities) == null ? void 0 : D.streaming) || !1,
                onCheckedChange: (r) => {
                  i({
                    ...e,
                    model: {
                      ...e.model,
                      capabilities: {
                        ...e.model.capabilities,
                        streaming: r
                      }
                    }
                  }), a == null || a();
                }
              }
            ),
            /* @__PURE__ */ c(
              "label",
              {
                htmlFor: "cap-streaming",
                className: "text-sm flex items-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ s(V, { className: "h-3.5 w-3.5" }),
                  l("settings.capabilities.streaming")
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c("div", { className: "space-y-3 pt-3 border-t", children: [
        /* @__PURE__ */ s(m, { className: "text-base", children: l("settings.advancedSettings") }),
        /* @__PURE__ */ c("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ c("div", { className: "space-y-2", children: [
            /* @__PURE__ */ s(m, { className: "text-sm", children: l("settings.contextWindowLabel") }),
            /* @__PURE__ */ s(
              h,
              {
                type: "number",
                placeholder: l("settings.contextWindowPlaceholder"),
                value: e.model.contextWindow || "",
                onChange: (r) => i({
                  ...e,
                  model: {
                    ...e.model,
                    contextWindow: r.target.value ? parseInt(r.target.value) : void 0
                  }
                }),
                onBlur: () => a == null ? void 0 : a()
              }
            )
          ] }),
          /* @__PURE__ */ c("div", { className: "space-y-2", children: [
            /* @__PURE__ */ s(m, { className: "text-sm", children: l("settings.outputWindowLabel") }),
            /* @__PURE__ */ s(
              h,
              {
                type: "number",
                placeholder: l("settings.outputWindowPlaceholder"),
                value: e.model.outputWindow || "",
                onChange: (r) => i({
                  ...e,
                  model: {
                    ...e.model,
                    outputWindow: r.target.value ? parseInt(r.target.value) : void 0
                  }
                }),
                onBlur: () => a == null ? void 0 : a()
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c("div", { className: "space-y-3 pt-3 border-t", children: [
        /* @__PURE__ */ c("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s(m, { className: "text-base", children: l("settings.testModel") }),
          /* @__PURE__ */ c(
            f,
            {
              variant: "outline",
              size: "sm",
              onClick: z,
              disabled: !e.model.id || t === "testing" || b && !N && !T,
              className: F(
                t === "success" && "border-green-600 text-green-600 hover:bg-green-50",
                t === "error" && "border-red-600 text-red-600 hover:bg-red-50"
              ),
              children: [
                t === "testing" && /* @__PURE__ */ s(Y, { className: "mr-2 h-4 w-4 animate-spin" }),
                t === "success" && /* @__PURE__ */ s(v, { className: "mr-2 h-4 w-4" }),
                t === "error" && /* @__PURE__ */ s(B, { className: "mr-2 h-4 w-4" }),
                l(t === "testing" ? "settings.testing" : "settings.testConnection")
              ]
            }
          )
        ] }),
        y && /* @__PURE__ */ s(
          "div",
          {
            className: F(
              "rounded-lg p-3 text-sm",
              t === "success" && "bg-green-50 text-green-700 border border-green-200",
              t === "error" && "bg-red-50 text-red-700 border border-red-200"
            ),
            children: /* @__PURE__ */ c("div", { className: "flex items-start gap-2 flex-wrap", children: [
              t === "success" && /* @__PURE__ */ s(v, { className: "h-4 w-4 mt-0.5 shrink-0" }),
              t === "error" && /* @__PURE__ */ s(B, { className: "h-4 w-4 mt-0.5 shrink-0" }),
              /* @__PURE__ */ s("p", { className: "flex-1 break-words", children: y })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ c("div", { className: "flex items-center justify-end gap-2 pt-3 border-t", children: [
        /* @__PURE__ */ s(f, { variant: "outline", size: "sm", onClick: L, children: l("settings.cancelEdit") }),
        /* @__PURE__ */ s(f, { size: "sm", onClick: P, children: l("settings.saveModel") })
      ] })
    ] })
  ] }) }) : null;
}
export {
  ce as ModelEditDialog
};
//# sourceMappingURL=model-edit-dialog.js.map
