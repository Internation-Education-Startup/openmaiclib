import { jsx as e, jsxs as l } from "react/jsx-runtime";
import { useI18n as a } from "../../../lib/hooks/use-i18n.js";
import { PBLGuideInline as d } from "./guide.js";
function p({ projectInfo: r, agents: i, onSelectRole: o }) {
  const { t: s } = a(), c = i.filter(
    (t) => !t.is_system_agent && t.role_division === "development"
  );
  return /* @__PURE__ */ e("div", { className: "flex flex-col items-center h-full overflow-y-auto p-8 bg-gradient-to-b from-background to-muted/30", children: /* @__PURE__ */ l("div", { className: "max-w-2xl w-full space-y-8 my-auto", children: [
    /* @__PURE__ */ l("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ e("h1", { className: "text-3xl font-bold tracking-tight", children: r.title }),
      /* @__PURE__ */ e("p", { className: "text-muted-foreground text-lg", children: r.description })
    ] }),
    /* @__PURE__ */ l("div", { className: "space-y-4", children: [
      /* @__PURE__ */ e("h2", { className: "text-xl font-semibold text-center", children: s("pbl.roleSelection.title") }),
      /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground text-center", children: s("pbl.roleSelection.description") }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: c.map((t) => /* @__PURE__ */ l(
        "button",
        {
          onClick: () => o(t.name),
          className: "group relative flex flex-col items-start gap-2 rounded-xl border-2 border-muted bg-card p-5 text-left transition-all hover:border-primary hover:shadow-md",
          children: [
            /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e("div", { className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm", children: t.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ e("h3", { className: "font-semibold text-base", children: t.name })
            ] }),
            t.actor_role && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground line-clamp-2", children: t.actor_role })
          ]
        },
        t.name
      )) })
    ] }),
    /* @__PURE__ */ e(d, {})
  ] }) });
}
export {
  p as PBLRoleSelection
};
//# sourceMappingURL=role-selection.js.map
