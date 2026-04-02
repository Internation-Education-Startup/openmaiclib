import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useRef as re, useState as j, useMemo as se } from "react";
import { Bot as C, Paperclip as T, X as le, FileText as ae, Globe2 as A, Globe as ie, ChevronLeft as oe, Check as ne } from "lucide-react";
import { Popover as I, PopoverTrigger as K, PopoverContent as M } from "../ui/popover.js";
import { Select as L, SelectTrigger as $, SelectValue as G, SelectContent as H, SelectItem as W } from "../ui/select.js";
import { Tooltip as y, TooltipTrigger as w, TooltipContent as z } from "../ui/tooltip.js";
import { cn as n } from "../../lib/utils/cn.js";
import { useI18n as de } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as m } from "../../lib/store/settings.js";
import { PDF_PROVIDERS as ce } from "../../lib/pdf/constants.js";
import { WEB_SEARCH_PROVIDERS as O } from "../../lib/web-search/constants.js";
import { MediaPopover as me } from "./media-popover.js";
const ue = 50, he = ue * 1024 * 1024;
function Pe({
  language: p,
  onLanguageChange: v,
  webSearch: i,
  onWebSearchChange: d,
  onSettingsOpen: N,
  pdfFile: c,
  onPdfFileChange: f,
  onPdfError: g
}) {
  var q;
  const { t: a } = de(), x = m((t) => t.providerId), u = m((t) => t.modelId), l = m((t) => t.providersConfig), h = m((t) => t.setModel), X = m((t) => t.pdfProviderId), F = m((t) => t.pdfProvidersConfig), Z = m((t) => t.setPDFProvider), k = m((t) => t.webSearchProviderId), _ = m((t) => t.webSearchProvidersConfig), Y = m((t) => t.setWebSearchProvider), B = re(null), [J, P] = j(!1), E = O[k], b = _[k], Q = E ? !E.requiresApiKey || !!(b != null && b.apiKey) || !!(b != null && b.isServerConfigured) : !1, R = l ? Object.entries(l).filter(
    ([, t]) => (!t.requiresApiKey || t.apiKey || t.isServerConfigured) && t.models.length >= 1 && (t.baseUrl || t.defaultBaseUrl || t.serverBaseUrl)
  ).map(([t, s]) => {
    var o;
    return {
      id: t,
      name: s.name,
      icon: s.icon,
      isServerConfigured: s.isServerConfigured,
      models: s.isServerConfigured && !s.apiKey && ((o = s.serverModels) != null && o.length) ? s.models.filter((te) => new Set(s.serverModels).has(te.id)) : s.models
    };
  }) : [], ee = l == null ? void 0 : l[x], U = (t) => {
    if (t.type === "application/pdf") {
      if (t.size > he) {
        g(a("upload.fileTooLarge"));
        return;
      }
      g(null), f(t);
    }
  }, S = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border", D = `${S} border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60`, V = `${S} border-violet-200/60 dark:border-violet-700/50 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300`;
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-1 flex-wrap", children: [
    R.length > 0 ? /* @__PURE__ */ e(
      pe,
      {
        configuredProviders: R,
        currentProviderId: x,
        currentModelId: u,
        currentProviderConfig: ee,
        setModel: h,
        t: a
      }
    ) : /* @__PURE__ */ r(y, { children: [
      /* @__PURE__ */ e(w, { asChild: !0, children: /* @__PURE__ */ r(
        "button",
        {
          onClick: () => N("providers"),
          className: n(
            S,
            "text-amber-600 dark:text-amber-400 animate-pulse",
            "bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50"
          ),
          children: [
            /* @__PURE__ */ e(C, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: a("toolbar.configureProvider") })
          ]
        }
      ) }),
      /* @__PURE__ */ e(z, { children: a("toolbar.configureProviderHint") })
    ] }),
    /* @__PURE__ */ e("div", { className: "w-px h-4 bg-border/60 mx-1" }),
    /* @__PURE__ */ r(I, { children: [
      /* @__PURE__ */ e(K, { asChild: !0, children: c ? /* @__PURE__ */ r("button", { className: V, children: [
        /* @__PURE__ */ e(T, { className: "size-3.5" }),
        /* @__PURE__ */ e("span", { className: "max-w-[100px] truncate", children: c.name }),
        /* @__PURE__ */ e(
          "span",
          {
            role: "button",
            className: "size-4 rounded-full inline-flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors",
            onClick: (t) => {
              t.stopPropagation(), f(null);
            },
            children: /* @__PURE__ */ e(le, { className: "size-2.5" })
          }
        )
      ] }) : /* @__PURE__ */ e("button", { className: D, children: /* @__PURE__ */ e(T, { className: "size-3.5" }) }) }),
      /* @__PURE__ */ r(M, { align: "start", className: "w-72 p-0", children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 px-3 pt-3 pb-2", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-medium text-muted-foreground shrink-0", children: a("toolbar.pdfParser") }),
          /* @__PURE__ */ r(L, { value: X, onValueChange: (t) => Z(t), children: [
            /* @__PURE__ */ e($, { className: "h-7 text-xs flex-1 min-w-0", children: /* @__PURE__ */ e(G, {}) }),
            /* @__PURE__ */ e(H, { children: Object.values(ce).map((t) => {
              const s = F[t.id], o = !t.requiresApiKey || !!(s != null && s.apiKey) || !!(s != null && s.isServerConfigured);
              return /* @__PURE__ */ e(W, { value: t.id, disabled: !o, children: /* @__PURE__ */ r("div", { className: n("flex items-center gap-1.5", !o && "opacity-50"), children: [
                t.icon && /* @__PURE__ */ e("img", { src: t.icon, alt: t.name, className: "w-3.5 h-3.5" }),
                t.name,
                (s == null ? void 0 : s.isServerConfigured) && /* @__PURE__ */ e("span", { className: "text-[9px] px-1 py-0 rounded border text-muted-foreground", children: a("settings.serverConfigured") })
              ] }) }, t.id);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "px-3 pb-3", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "file",
              ref: B,
              className: "hidden",
              accept: ".pdf",
              onChange: (t) => {
                var o;
                const s = (o = t.target.files) == null ? void 0 : o[0];
                s && U(s), t.target.value = "";
              }
            }
          ),
          c ? /* @__PURE__ */ r("div", { className: "space-y-2", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e("div", { className: "size-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(ae, { className: "size-4 text-violet-600 dark:text-violet-400" }) }),
              /* @__PURE__ */ r("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ e("p", { className: "text-sm font-medium truncate", children: c.name }),
                /* @__PURE__ */ r("p", { className: "text-xs text-muted-foreground", children: [
                  (c.size / 1024 / 1024).toFixed(2),
                  " MB"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => f(null),
                className: "w-full text-xs text-destructive hover:underline text-left",
                children: a("toolbar.removePdf")
              }
            )
          ] }) : /* @__PURE__ */ r(
            "div",
            {
              className: n(
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors cursor-pointer",
                J ? "border-violet-400 bg-violet-50 dark:bg-violet-950/20" : "border-muted-foreground/20 hover:border-violet-300"
              ),
              onClick: () => {
                var t;
                return (t = B.current) == null ? void 0 : t.click();
              },
              onDragOver: (t) => {
                t.preventDefault(), P(!0);
              },
              onDragLeave: () => P(!1),
              onDrop: (t) => {
                var o;
                t.preventDefault(), P(!1);
                const s = (o = t.dataTransfer.files) == null ? void 0 : o[0];
                s && U(s);
              },
              children: [
                /* @__PURE__ */ e(T, { className: "size-5 text-muted-foreground/50 mb-1.5" }),
                /* @__PURE__ */ e("p", { className: "text-xs font-medium", children: a("toolbar.pdfUpload") }),
                /* @__PURE__ */ e("p", { className: "text-[10px] text-muted-foreground/60 mt-0.5", children: a("upload.pdfSizeLimit") })
              ]
            }
          )
        ] })
      ] })
    ] }),
    Q ? /* @__PURE__ */ r(I, { children: [
      /* @__PURE__ */ e(K, { asChild: !0, children: /* @__PURE__ */ r("button", { className: i ? V : D, children: [
        /* @__PURE__ */ e(A, { className: n("size-3.5", i && "animate-pulse") }),
        i && /* @__PURE__ */ e("span", { children: ((q = O[k]) == null ? void 0 : q.name) || "Search" })
      ] }) }),
      /* @__PURE__ */ r(M, { align: "start", className: "w-64 p-3 space-y-3", children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => d(!i),
            className: n(
              "w-full flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all",
              i ? "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800" : "border-border hover:bg-muted/50"
            ),
            children: [
              /* @__PURE__ */ e(
                A,
                {
                  className: n(
                    "size-4 shrink-0",
                    i ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
                  )
                }
              ),
              /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ e("p", { className: "text-xs font-medium", children: a(i ? "toolbar.webSearchOn" : "toolbar.webSearchOff") }),
                /* @__PURE__ */ e("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: a("toolbar.webSearchDesc") })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-medium text-muted-foreground shrink-0", children: a("toolbar.webSearchProvider") }),
          /* @__PURE__ */ r(
            L,
            {
              value: k,
              onValueChange: (t) => Y(t),
              children: [
                /* @__PURE__ */ e($, { className: "h-7 text-xs flex-1 min-w-0", children: /* @__PURE__ */ e(G, {}) }),
                /* @__PURE__ */ e(H, { children: Object.values(O).map((t) => {
                  const s = _[t.id], o = !t.requiresApiKey || !!(s != null && s.apiKey) || !!(s != null && s.isServerConfigured);
                  return /* @__PURE__ */ e(W, { value: t.id, disabled: !o, children: /* @__PURE__ */ r(
                    "div",
                    {
                      className: n("flex items-center gap-1.5", !o && "opacity-50"),
                      children: [
                        t.name,
                        (s == null ? void 0 : s.isServerConfigured) && /* @__PURE__ */ e("span", { className: "text-[9px] px-1 py-0 rounded border text-muted-foreground", children: a("settings.serverConfigured") })
                      ]
                    }
                  ) }, t.id);
                }) })
              ]
            }
          )
        ] })
      ] })
    ] }) : /* @__PURE__ */ r(y, { children: [
      /* @__PURE__ */ e(w, { asChild: !0, children: /* @__PURE__ */ e("button", { className: n(S, "text-muted-foreground/40 cursor-not-allowed"), disabled: !0, children: /* @__PURE__ */ e(A, { className: "size-3.5" }) }) }),
      /* @__PURE__ */ e(z, { children: a("toolbar.webSearchNoProvider") })
    ] }),
    /* @__PURE__ */ r(y, { children: [
      /* @__PURE__ */ e(w, { asChild: !0, children: /* @__PURE__ */ r(
        "button",
        {
          onClick: () => v(p === "zh-CN" ? "en-US" : "zh-CN"),
          className: D,
          children: [
            /* @__PURE__ */ e(ie, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: p === "zh-CN" ? "中文" : "EN" })
          ]
        }
      ) }),
      /* @__PURE__ */ e(z, { children: a("toolbar.languageHint") })
    ] }),
    /* @__PURE__ */ e("div", { className: "w-px h-4 bg-border/60 mx-1" }),
    /* @__PURE__ */ e(me, { onSettingsOpen: N })
  ] });
}
function pe({
  configuredProviders: p,
  currentProviderId: v,
  currentModelId: i,
  currentProviderConfig: d,
  setModel: N,
  t: c
}) {
  const [f, g] = j(!1), [a, x] = j(null), u = se(
    () => p.find((l) => l.id === a),
    [p, a]
  );
  return /* @__PURE__ */ r(
    I,
    {
      open: f,
      onOpenChange: (l) => {
        g(l), l && x(null);
      },
      children: [
        /* @__PURE__ */ r(y, { children: [
          /* @__PURE__ */ e(w, { asChild: !0, children: /* @__PURE__ */ e(K, { asChild: !0, children: /* @__PURE__ */ e(
            "button",
            {
              className: n(
                "inline-flex items-center justify-center size-7 rounded-full transition-all cursor-pointer select-none",
                "ring-1 ring-border/60 hover:ring-border hover:bg-muted/60",
                i && "ring-violet-300 dark:ring-violet-700 bg-violet-50 dark:bg-violet-950/20"
              ),
              children: d != null && d.icon ? /* @__PURE__ */ e(
                "img",
                {
                  src: d.icon,
                  alt: d.name,
                  className: "size-4 rounded-sm"
                }
              ) : /* @__PURE__ */ e(C, { className: "size-3.5 text-muted-foreground" })
            }
          ) }) }),
          /* @__PURE__ */ e(z, { children: i ? `${(d == null ? void 0 : d.name) || v} / ${i}` : c("settings.selectModel") })
        ] }),
        /* @__PURE__ */ r(M, { align: "start", className: "w-64 p-0", children: [
          !a && /* @__PURE__ */ r("div", { className: "max-h-72 overflow-y-auto", children: [
            /* @__PURE__ */ e("div", { className: "px-3 py-2 border-b", children: /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-muted-foreground", children: c("toolbar.selectProvider") }) }),
            p.map((l) => {
              const h = v === l.id;
              return /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => x(l.id),
                  className: n(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors border-b border-border/30",
                    h ? "bg-violet-50/50 dark:bg-violet-950/10" : "hover:bg-muted/50"
                  ),
                  children: [
                    l.icon ? /* @__PURE__ */ e(
                      "img",
                      {
                        src: l.icon,
                        alt: l.name,
                        className: "size-5 rounded-sm shrink-0"
                      }
                    ) : /* @__PURE__ */ e(C, { className: "size-5 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ r("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("span", { className: "text-sm font-medium", children: l.name }),
                      l.isServerConfigured && /* @__PURE__ */ e("span", { className: "text-[9px] px-1 py-0 rounded border text-muted-foreground ml-1.5", children: c("settings.serverConfigured") })
                    ] }),
                    h && i && /* @__PURE__ */ e("span", { className: "text-[10px] text-muted-foreground truncate max-w-[80px]", children: i })
                  ]
                },
                l.id
              );
            })
          ] }),
          a && u && /* @__PURE__ */ r("div", { className: "max-h-72 overflow-y-auto", children: [
            /* @__PURE__ */ r(
              "button",
              {
                onClick: () => x(null),
                className: "w-full flex items-center gap-2 px-3 py-2 border-b bg-muted/40 hover:bg-muted/60 transition-colors",
                children: [
                  /* @__PURE__ */ e(oe, { className: "size-3.5 text-muted-foreground" }),
                  u.icon ? /* @__PURE__ */ e(
                    "img",
                    {
                      src: u.icon,
                      alt: u.name,
                      className: "size-4 rounded-sm"
                    }
                  ) : /* @__PURE__ */ e(C, { className: "size-4 text-muted-foreground" }),
                  /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: u.name }),
                  /* @__PURE__ */ r("span", { className: "text-[10px] text-muted-foreground ml-auto", children: [
                    u.models.length,
                    " ",
                    c("settings.modelCount")
                  ] })
                ]
              }
            ),
            u.models.map((l) => {
              const h = v === a && i === l.id;
              return /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    N(a, l.id), g(!1);
                  },
                  className: n(
                    "w-full flex items-center gap-2 px-3 py-2 text-left transition-colors border-b border-border/30",
                    h ? "bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300" : "hover:bg-muted/50"
                  ),
                  children: [
                    /* @__PURE__ */ e("span", { className: "flex-1 truncate font-mono text-xs", children: l.name }),
                    h && /* @__PURE__ */ e(ne, { className: "size-3.5 shrink-0 text-violet-600 dark:text-violet-400" })
                  ]
                },
                l.id
              );
            })
          ] })
        ] })
      ]
    }
  );
}
export {
  Pe as GenerationToolbar
};
//# sourceMappingURL=generation-toolbar.js.map
