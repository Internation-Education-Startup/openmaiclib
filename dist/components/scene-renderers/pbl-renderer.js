import { jsx as r } from "react/jsx-runtime";
import { useCallback as c } from "react";
import { useStageStore as d } from "../../lib/store/stage.js";
import { PBLRoleSelection as g } from "./pbl/role-selection.js";
import { PBLWorkspace as h } from "./pbl/workspace.js";
import { useI18n as _ } from "../../lib/hooks/use-i18n.js";
function q({ content: m, mode: R, sceneId: a }) {
  const { t: l } = _(), { projectConfig: e } = m, u = (e == null ? void 0 : e.selectedRole) ?? null, i = c(
    (s) => {
      const t = d.getState().scenes.map(
        (o) => o.id === a ? {
          ...o,
          content: { type: "pbl", projectConfig: s }
        } : o
      );
      d.setState({ scenes: t });
    },
    [a]
  ), f = c(
    (s) => {
      if (!e) return;
      const n = { ...e, selectedRole: s }, t = n.issueboard.issues.find((o) => o.is_active);
      if (t != null && t.generated_questions && n.chat.messages.length === 0) {
        const o = l("pbl.chat.welcomeMessage").replace("{title}", t.title).replace("{questions}", t.generated_questions);
        n.chat = {
          messages: [
            {
              id: `msg_welcome_${Date.now()}`,
              agent_name: t.question_agent_name,
              message: o,
              timestamp: Date.now(),
              read_by: []
            }
          ]
        };
      }
      i(n);
    },
    [e, i, l]
  ), p = c(() => {
    if (!e) return;
    const s = e.issueboard.issues.map((n) => ({ ...n, is_done: !1, is_active: !1 })).sort((n, t) => n.index - t.index);
    s.length > 0 && (s[0].is_active = !0), i({
      ...e,
      selectedRole: null,
      chat: { messages: [] },
      issueboard: {
        ...e.issueboard,
        issues: s,
        current_issue_id: s.length > 0 ? s[0].id : null
      }
    });
  }, [e, i]);
  return e ? e.agents.length === 0 && e.projectInfo.title === "" ? /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-full text-muted-foreground", children: /* @__PURE__ */ r("p", { children: l("pbl.emptyProject") }) }) : u ? /* @__PURE__ */ r(
    h,
    {
      projectConfig: e,
      userRole: u,
      onConfigUpdate: i,
      onReset: p
    }
  ) : /* @__PURE__ */ r(
    g,
    {
      projectInfo: e.projectInfo,
      agents: e.agents,
      onSelectRole: f
    }
  ) : /* @__PURE__ */ r("div", { className: "flex items-center justify-center h-full text-muted-foreground", children: /* @__PURE__ */ r("p", { children: l("pbl.legacyFormat") }) });
}
export {
  q as PBLRenderer
};
//# sourceMappingURL=pbl-renderer.js.map
