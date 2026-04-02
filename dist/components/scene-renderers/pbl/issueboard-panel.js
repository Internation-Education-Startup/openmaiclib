import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { useI18n as l } from "../../../lib/hooks/use-i18n.js";
function g({ issueboard: e }) {
  const { t: s } = l(), n = [...e.issues].sort((d, c) => d.index - c.index), o = n.filter((d) => d.is_done).length, a = n.length, i = a > 0 ? Math.round(o / a * 100) : 0;
  return /* @__PURE__ */ r("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r("div", { className: "px-4 py-3 border-b", children: [
      /* @__PURE__ */ t("h2", { className: "font-semibold text-sm", children: s("pbl.issueboard.title") }),
      /* @__PURE__ */ r("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ t("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-500",
            style: { width: `${i}%` }
          }
        ) }),
        /* @__PURE__ */ r("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
          o,
          "/",
          a
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "flex-1 overflow-y-auto p-3 space-y-2", children: [
      n.map((d) => /* @__PURE__ */ t(m, { issue: d }, d.id)),
      n.length === 0 && /* @__PURE__ */ t("p", { className: "text-sm text-muted-foreground text-center py-4", children: s("pbl.issueboard.noIssues") })
    ] })
  ] });
}
function m({ issue: e }) {
  const { t: s } = l(), n = e.is_done ? "border-green-500/50 bg-green-50 dark:bg-green-950/20" : e.is_active ? "border-primary bg-primary/5" : "border-muted", o = e.is_done ? s("pbl.issueboard.statusDone") : e.is_active ? s("pbl.issueboard.statusActive") : s("pbl.issueboard.statusPending"), a = e.is_done ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : e.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ r("div", { className: `border rounded-lg p-3 ${n} transition-colors`, children: [
    /* @__PURE__ */ r("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ t("h3", { className: "font-medium text-sm leading-tight", children: e.title }),
      /* @__PURE__ */ t(
        "span",
        {
          className: `text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${a}`,
          children: o
        }
      )
    ] }),
    /* @__PURE__ */ t("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: e.description }),
    /* @__PURE__ */ t("div", { className: "text-[10px] text-muted-foreground mt-1.5", children: e.person_in_charge })
  ] });
}
export {
  g as IssueboardPanel
};
//# sourceMappingURL=issueboard-panel.js.map
