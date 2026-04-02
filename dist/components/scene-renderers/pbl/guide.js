import { jsxs as l, jsx as e } from "react/jsx-runtime";
import { HelpCircle as r } from "lucide-react";
import { useI18n as d } from "../../../lib/hooks/use-i18n.js";
import { HoverCard as s, HoverCardTrigger as i, HoverCardContent as n } from "../../ui/hover-card.js";
function u() {
  const { t } = d();
  return /* @__PURE__ */ l(s, { openDelay: 0, closeDelay: 150, children: [
    /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ e(i, { asChild: !0, children: /* @__PURE__ */ l("button", { className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ e(r, { className: "w-4 h-4" }),
      /* @__PURE__ */ e("span", { children: t("pbl.guide.howItWorks") })
    ] }) }) }),
    /* @__PURE__ */ e(
      n,
      {
        side: "top",
        collisionPadding: 16,
        className: "w-[380px] overflow-y-auto rounded-xl p-5",
        style: {
          maxHeight: "var(--radix-hover-card-content-available-height, 70vh)"
        },
        children: /* @__PURE__ */ e(o, {})
      }
    )
  ] });
}
function h() {
  const { t } = d();
  return /* @__PURE__ */ l(s, { openDelay: 0, closeDelay: 150, children: [
    /* @__PURE__ */ e(i, { asChild: !0, children: /* @__PURE__ */ e(
      "button",
      {
        className: "flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
        title: t("pbl.guide.help"),
        children: /* @__PURE__ */ e(r, { className: "w-4 h-4" })
      }
    ) }),
    /* @__PURE__ */ e(
      n,
      {
        side: "bottom",
        align: "end",
        collisionPadding: 16,
        className: "w-[380px] overflow-y-auto rounded-xl p-5",
        style: {
          maxHeight: "var(--radix-hover-card-content-available-height, 80vh)"
        },
        children: /* @__PURE__ */ e(o, {})
      }
    )
  ] });
}
function o() {
  const { t } = d();
  return /* @__PURE__ */ l("div", { className: "space-y-5 text-[13px] leading-relaxed text-foreground", children: [
    /* @__PURE__ */ l("section", { children: [
      /* @__PURE__ */ e("h4", { className: "font-semibold mb-1", children: t("pbl.guide.step1.title") }),
      /* @__PURE__ */ e("p", { className: "text-muted-foreground", children: t("pbl.guide.step1.desc") })
    ] }),
    /* @__PURE__ */ e("hr", { className: "border-border" }),
    /* @__PURE__ */ l("section", { children: [
      /* @__PURE__ */ e("h4", { className: "font-semibold mb-1", children: t("pbl.guide.step2.title") }),
      /* @__PURE__ */ e("p", { className: "text-muted-foreground mb-3", children: t("pbl.guide.step2.desc") }),
      /* @__PURE__ */ l("ol", { className: "list-decimal list-inside space-y-3 text-muted-foreground", children: [
        /* @__PURE__ */ l("li", { children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: t("pbl.guide.step2.s1.title") }),
          /* @__PURE__ */ e("p", { className: "mt-0.5 ml-[1.125rem]", children: t("pbl.guide.step2.s1.desc") })
        ] }),
        /* @__PURE__ */ l("li", { children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: t("pbl.guide.step2.s2.title") }),
          /* @__PURE__ */ e("code", { className: "ml-1.5 text-xs bg-muted rounded px-1.5 py-0.5 font-mono", children: "@question" }),
          /* @__PURE__ */ l("div", { className: "mt-1.5 ml-[1.125rem] space-y-1.5", children: [
            /* @__PURE__ */ e("pre", { className: "text-xs bg-muted/70 rounded-md px-3 py-2 font-mono leading-relaxed overflow-x-auto", children: t("pbl.guide.step2.s2.example") }),
            /* @__PURE__ */ e("p", { children: t("pbl.guide.step2.s2.desc") })
          ] })
        ] }),
        /* @__PURE__ */ l("li", { children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: t("pbl.guide.step2.s3.title") }),
          /* @__PURE__ */ e("code", { className: "ml-1.5 text-xs bg-muted rounded px-1.5 py-0.5 font-mono", children: "@judge" }),
          /* @__PURE__ */ l("div", { className: "mt-1.5 ml-[1.125rem] space-y-1.5", children: [
            /* @__PURE__ */ e("pre", { className: "text-xs bg-muted/70 rounded-md px-3 py-2 font-mono leading-relaxed overflow-x-auto", children: t("pbl.guide.step2.s3.example") }),
            /* @__PURE__ */ e("p", { children: t("pbl.guide.step2.s3.desc") }),
            /* @__PURE__ */ l("ul", { className: "space-y-0.5 mt-1", children: [
              /* @__PURE__ */ l("li", { children: [
                "✅ ",
                /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: "COMPLETE" }),
                " →",
                " ",
                t("pbl.guide.step2.s3.complete")
              ] }),
              /* @__PURE__ */ l("li", { children: [
                "🔄 ",
                /* @__PURE__ */ e("span", { className: "font-medium text-foreground", children: "NEEDS_REVISION" }),
                " →",
                " ",
                t("pbl.guide.step2.s3.revision")
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("hr", { className: "border-border" }),
    /* @__PURE__ */ l("section", { children: [
      /* @__PURE__ */ e("h4", { className: "font-semibold mb-1", children: t("pbl.guide.step3.title") }),
      /* @__PURE__ */ e("p", { className: "text-muted-foreground", children: t("pbl.guide.step3.desc") })
    ] })
  ] });
}
export {
  u as PBLGuideInline,
  h as PBLGuidePanel
};
//# sourceMappingURL=guide.js.map
