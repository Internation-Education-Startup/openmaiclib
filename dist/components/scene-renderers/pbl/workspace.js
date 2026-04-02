import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useState as p } from "react";
import { ArrowLeft as u } from "lucide-react";
import { IssueboardPanel as h } from "./issueboard-panel.js";
import { ChatPanel as x } from "./chat-panel.js";
import { usePBLChat as v } from "./use-pbl-chat.js";
import { PBLGuidePanel as b } from "./guide.js";
import { useI18n as g } from "../../../lib/hooks/use-i18n.js";
function I({
  projectConfig: t,
  userRole: l,
  onConfigUpdate: n,
  onReset: a
}) {
  const { t: s } = g(), [i, o] = p(!1), { messages: d, isLoading: c, sendMessage: m, currentIssue: f } = v({
    projectConfig: t,
    userRole: l,
    onConfigUpdate: n
  });
  return /* @__PURE__ */ r("div", { className: "flex h-full w-full", children: [
    /* @__PURE__ */ r("div", { className: "w-[35%] min-w-[280px] border-r overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ e("div", { className: "px-3 pt-2 flex items-center gap-1.5", children: i ? /* @__PURE__ */ r("div", { className: "flex items-center gap-1.5 text-xs", children: [
        /* @__PURE__ */ e("span", { className: "text-muted-foreground", children: s("pbl.workspace.confirmRestart") }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              o(!1), a();
            },
            className: "px-2 py-0.5 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors",
            children: s("pbl.workspace.confirm")
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => o(!1),
            className: "px-2 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors",
            children: s("pbl.workspace.cancel")
          }
        )
      ] }) : /* @__PURE__ */ r("div", { className: "flex items-center gap-1 flex-1", children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => o(!0),
            className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-1 rounded-md hover:bg-muted",
            children: [
              /* @__PURE__ */ e(u, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ e("span", { children: s("pbl.workspace.restart") })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "ml-auto", children: /* @__PURE__ */ e(b, {}) })
      ] }) }),
      /* @__PURE__ */ e("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ e(h, { issueboard: t.issueboard }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ e(
      x,
      {
        messages: d,
        currentIssue: f,
        userRole: l,
        isLoading: c,
        onSendMessage: m
      }
    ) })
  ] });
}
export {
  I as PBLWorkspace
};
//# sourceMappingURL=workspace.js.map
