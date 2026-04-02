import { jsx as e, jsxs as r, Fragment as c } from "react/jsx-runtime";
import { useState as h, useEffect as N } from "react";
import { Card as v, CardHeader as f, CardTitle as C, CardContent as b } from "../ui/card.js";
import { XCircle as d, CheckCircle2 as o, Loader2 as g, Circle as z } from "lucide-react";
import { useI18n as I } from "../../lib/hooks/use-i18n.js";
function m({
  completed: s,
  inProgress: n,
  hasError: a,
  label: t
}) {
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: a ? /* @__PURE__ */ e(d, { className: "size-6 text-destructive" }) : s ? /* @__PURE__ */ e(o, { className: "size-6 text-green-500" }) : n ? /* @__PURE__ */ e(g, { className: "size-6 text-primary animate-spin" }) : /* @__PURE__ */ e(z, { className: "size-6 text-muted-foreground" }) }),
    /* @__PURE__ */ e(
      "span",
      {
        className: `text-base ${a ? "text-destructive" : s ? "text-green-600 font-medium" : n ? "text-primary font-medium" : "text-muted-foreground"}`,
        children: t
      }
    )
  ] });
}
function D({
  outlineReady: s,
  firstPageReady: n,
  statusMessage: a,
  error: t
}) {
  const { t: i } = I(), [p, u] = h("");
  return N(() => {
    if (!t && !n) {
      const x = setInterval(() => {
        u((l) => l.length >= 3 ? "" : l + ".");
      }, 500);
      return () => clearInterval(x);
    }
  }, [t, n]), /* @__PURE__ */ e("div", { className: "space-y-6", children: /* @__PURE__ */ r(v, { children: [
    /* @__PURE__ */ e(f, { children: /* @__PURE__ */ e(C, { className: "flex items-center gap-2", children: t ? /* @__PURE__ */ r(c, { children: [
      /* @__PURE__ */ e(d, { className: "size-5 text-destructive" }),
      i("generation.generationFailed")
    ] }) : n ? /* @__PURE__ */ r(c, { children: [
      /* @__PURE__ */ e(o, { className: "size-5 text-green-500" }),
      i("generation.openingClassroom")
    ] }) : /* @__PURE__ */ r(c, { children: [
      /* @__PURE__ */ e(g, { className: "size-5 animate-spin" }),
      i("generation.generatingCourse"),
      p
    ] }) }) }),
    /* @__PURE__ */ r(b, { className: "space-y-4", children: [
      /* @__PURE__ */ r("div", { className: "divide-y", children: [
        /* @__PURE__ */ e(
          m,
          {
            completed: s,
            inProgress: !s && !t,
            hasError: !s && !!t,
            label: i(s ? "generation.outlineReady" : "generation.generatingOutlines")
          }
        ),
        /* @__PURE__ */ e(
          m,
          {
            completed: n,
            inProgress: s && !n && !t,
            hasError: s && !n && !!t,
            label: i(n ? "generation.firstPageReady" : "generation.generatingFirstPage")
          }
        )
      ] }),
      a && !t && /* @__PURE__ */ e("div", { className: "pt-2 border-t", children: /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: a }) }),
      t && /* @__PURE__ */ e("div", { className: "p-4 bg-destructive/10 border border-destructive/20 rounded-lg", children: /* @__PURE__ */ e("p", { className: "text-sm text-destructive", children: t }) })
    ] })
  ] }) });
}
export {
  D as GeneratingProgress
};
//# sourceMappingURL=generating-progress.js.map
