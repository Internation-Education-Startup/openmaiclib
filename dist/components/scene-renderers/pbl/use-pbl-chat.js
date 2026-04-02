import { useState as D, useCallback as M } from "react";
import { getCurrentModelConfig as C } from "../../../lib/utils/model-config.js";
import { useI18n as T } from "../../../lib/hooks/use-i18n.js";
import { createLogger as $ } from "../../../lib/logger.js";
const b = $("PBLChat");
function I({ projectConfig: s, userRole: i, onConfigUpdate: o }) {
  const { t: m } = T(), [n, e] = D(!1), t = s.chat.messages, a = s.issueboard.issues.find((r) => r.is_active) || null, _ = M(
    async (r) => {
      if (!r.trim() || n) return;
      const c = {
        ...s,
        chat: {
          ...s.chat,
          messages: [...s.chat.messages]
        }
      }, w = {
        id: `msg_${Date.now()}_user`,
        agent_name: i,
        message: r,
        timestamp: Date.now(),
        read_by: [i]
      };
      c.chat.messages.push(w), o(c);
      const l = L(r, a, s.agents);
      if (l) {
        e(!0);
        try {
          const u = C(), g = {
            "Content-Type": "application/json",
            "x-model": u.modelString,
            "x-api-key": u.apiKey
          };
          u.baseUrl && (g["x-base-url"] = u.baseUrl), u.providerType && (g["x-provider-type"] = u.providerType), u.requiresApiKey && (g["x-requires-api-key"] = "true");
          const q = r.replace(/^@\w+\s*/i, "").trim() || r, h = a && l.name === a.judge_agent_name, p = await (await fetch("/api/pbl/chat", {
            method: "POST",
            headers: g,
            body: JSON.stringify({
              message: q,
              agent: l,
              currentIssue: a,
              recentMessages: c.chat.messages.slice(-10).map((d) => ({
                agent_name: d.agent_name,
                message: d.message
              })),
              userRole: i,
              agentType: h ? "judge" : "question"
            })
          })).json();
          if (p.success) {
            const d = {
              id: `msg_${Date.now()}_agent`,
              agent_name: l.name,
              message: p.message,
              timestamp: Date.now(),
              read_by: []
            }, f = {
              ...c,
              chat: { messages: [...c.chat.messages, d] }
            }, y = p.message.toUpperCase();
            a && h && y.includes("COMPLETE") && !y.includes("NEEDS_REVISION") && await P(f, a, g, m), o(f);
          }
        } catch (u) {
          b.error("[usePBLChat] Error:", u);
        } finally {
          e(!1);
        }
      }
    },
    [s, i, a, n, o, m]
  );
  return { messages: t, isLoading: n, sendMessage: _, currentIssue: a };
}
function L(s, i, o) {
  if (!i) return null;
  const m = s.match(/^@(\w+)/i);
  if (m) {
    const n = m[1].toLowerCase();
    if (n === "question")
      return o.find((t) => t.name === i.question_agent_name) || null;
    if (n === "judge")
      return o.find((t) => t.name === i.judge_agent_name) || null;
    const e = o.find((t) => t.name.toLowerCase().includes(n));
    if (e) return e;
  }
  return o.find((n) => n.name === i.question_agent_name) || null;
}
async function P(s, i, o, m) {
  const n = s.issueboard.issues.find((t) => t.id === i.id);
  n && (n.is_done = !0, n.is_active = !1), s.issueboard.current_issue_id = null;
  const e = s.issueboard.issues.filter((t) => !t.is_done).sort((t, a) => t.index - a.index)[0];
  if (e) {
    e.is_active = !0, s.issueboard.current_issue_id = e.id;
    const t = s.agents.find((a) => a.name === e.question_agent_name);
    if (t && !e.generated_questions)
      try {
        const a = [
          "## Issue Information",
          "",
          `**Title**: ${e.title}`,
          `**Description**: ${e.description}`,
          `**Person in Charge**: ${e.person_in_charge}`,
          e.participants.length > 0 ? `**Participants**: ${e.participants.join(", ")}` : "",
          e.notes ? `**Notes**: ${e.notes}` : "",
          "",
          "## Your Task",
          "",
          "Based on the issue information above, generate 1-3 specific, actionable questions that will help students understand and complete this issue. Format your response as a numbered list."
        ].filter(Boolean).join(`
`), r = await (await fetch("/api/pbl/chat", {
          method: "POST",
          headers: o,
          body: JSON.stringify({
            message: a,
            agent: t,
            currentIssue: e,
            recentMessages: [],
            userRole: ""
          })
        })).json();
        r.success && r.message && (e.generated_questions = r.message, s.chat.messages.push({
          id: `msg_${Date.now()}_welcome`,
          agent_name: e.question_agent_name,
          message: m("pbl.chat.welcomeMessage").replace("{title}", e.title).replace("{questions}", r.message),
          timestamp: Date.now(),
          read_by: []
        }));
      } catch (a) {
        b.error("[usePBLChat] Failed to generate questions for next issue:", a);
      }
    else t && e.generated_questions && s.chat.messages.push({
      id: `msg_${Date.now()}_welcome`,
      agent_name: e.question_agent_name,
      message: m("pbl.chat.welcomeMessage").replace("{title}", e.title).replace("{questions}", e.generated_questions),
      timestamp: Date.now(),
      read_by: []
    });
    s.chat.messages.push({
      id: `msg_${Date.now()}_system`,
      agent_name: "System",
      message: m("pbl.chat.issueCompleteMessage").replace("{completed}", i.title).replace("{next}", e.title),
      timestamp: Date.now(),
      read_by: []
    });
  } else
    s.chat.messages.push({
      id: `msg_${Date.now()}_system`,
      agent_name: "System",
      message: m("pbl.chat.allCompleteMessage"),
      timestamp: Date.now(),
      read_by: []
    });
}
export {
  I as usePBLChat
};
//# sourceMappingURL=use-pbl-chat.js.map
