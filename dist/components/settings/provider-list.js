import { jsxs as n, jsx as t } from "react/jsx-runtime";
import { Button as u } from "../ui/button.js";
import { Box as f, Plus as g } from "lucide-react";
import { cn as x } from "../../lib/utils/cn.js";
import { useI18n as p } from "../../lib/hooks/use-i18n.js";
function k({
  providers: l,
  selectedProviderId: i,
  onSelect: d,
  onAddProvider: m,
  width: c
}) {
  const { t: r } = p(), a = (e) => {
    const s = `settings.providerNames.${e.id}`, o = r(s);
    return o !== s ? o : e.name;
  };
  return /* @__PURE__ */ n("div", { className: "flex-shrink-0 bg-background flex flex-col", style: { width: c ?? 192 }, children: [
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-3 space-y-1.5", children: l.map((e) => /* @__PURE__ */ n(
      "button",
      {
        onClick: () => d(e.id),
        className: x(
          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all border text-left",
          i === e.id ? "bg-primary/5 border-primary/50 shadow-sm" : "border-transparent hover:bg-muted/50"
        ),
        children: [
          e.icon ? /* @__PURE__ */ t(
            "img",
            {
              src: e.icon,
              alt: a(e),
              className: "w-5 h-5 rounded",
              onError: (s) => {
                s.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ t(f, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ t("span", { className: "font-medium text-sm flex-1 truncate", children: a(e) }),
          e.isServerConfigured && /* @__PURE__ */ t("span", { className: "text-[10px] px-1 py-0 h-4 leading-4 rounded shrink-0 bg-muted text-muted-foreground", children: r("settings.serverConfigured") })
        ]
      },
      e.id
    )) }),
    /* @__PURE__ */ t("div", { className: "p-3 border-t", children: /* @__PURE__ */ n(u, { variant: "outline", size: "sm", className: "w-full gap-1.5", onClick: m, children: [
      /* @__PURE__ */ t(g, { className: "h-3.5 w-3.5" }),
      r("settings.addProviderButton")
    ] }) })
  ] });
}
export {
  k as ProviderList
};
//# sourceMappingURL=provider-list.js.map
