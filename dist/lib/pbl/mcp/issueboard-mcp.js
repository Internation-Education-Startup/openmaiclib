import { getQuestionAgentPrompt as l, getJudgeAgentPrompt as _ } from "./agent-templates.js";
class p {
  constructor(s, e, i = "en-US") {
    this.config = s, this.agentMCP = e, this.language = i, this.nextIssueId = 1;
  }
  createIssueboard() {
    return this.config.issueboard = {
      agent_ids: [],
      issues: [],
      current_issue_id: null
    }, this.nextIssueId = 1, { success: !0, message: "Issueboard created successfully." };
  }
  getIssueboard() {
    return {
      success: !0,
      agent_ids: [...this.config.issueboard.agent_ids],
      issues: this.config.issueboard.issues.map((s) => ({ ...s }))
    };
  }
  updateIssueboardAgents(s) {
    return this.config.issueboard.agent_ids = [...s], {
      success: !0,
      message: "Issueboard agents updated successfully."
    };
  }
  createIssue(s) {
    const {
      title: e,
      description: i,
      person_in_charge: t,
      participants: r = [],
      notes: d = "",
      parent_issue: u = null,
      index: a = 0
    } = s;
    if (!(e != null && e.trim()))
      return { success: !1, error: "Title cannot be empty." };
    if (!(t != null && t.trim()))
      return { success: !1, error: "Person in charge cannot be empty." };
    if (u && !this.config.issueboard.issues.find((g) => g.id === u))
      return {
        success: !1,
        error: `Parent issue "${u}" not found.`
      };
    const n = `issue_${this.nextIssueId++}`, o = `Question Agent - ${n}`, c = `Judge Agent - ${n}`, f = {
      id: n,
      title: e,
      description: i,
      person_in_charge: t,
      participants: [...r],
      notes: d,
      parent_issue: u,
      index: a,
      is_done: !1,
      is_active: !1,
      generated_questions: "",
      question_agent_name: o,
      judge_agent_name: c
    };
    return this.config.issueboard.issues.push(f), this.agentMCP.createAgent({
      name: o,
      system_prompt: l(this.language),
      default_mode: "chat",
      actor_role: "Question Assistant for Issue",
      role_division: "development",
      is_system_agent: !0
    }), this.agentMCP.createAgent({
      name: c,
      system_prompt: _(this.language),
      default_mode: "chat",
      actor_role: "Judge for Issue Completion",
      role_division: "management",
      is_system_agent: !0
    }), {
      success: !0,
      issue_id: n,
      message: "Issue created with question and judge agents."
    };
  }
  listIssues() {
    return {
      success: !0,
      issues: this.config.issueboard.issues.map((s) => ({ ...s }))
    };
  }
  getIssue(s) {
    const e = this.config.issueboard.issues.find((i) => i.id === s);
    return e ? { success: !0, issues: [{ ...e }] } : { success: !1, error: `Issue "${s}" not found.` };
  }
  updateIssue(s) {
    const e = this.config.issueboard.issues.find((i) => i.id === s.issue_id);
    return e ? s.parent_issue !== void 0 && s.parent_issue !== null && !this.config.issueboard.issues.find((i) => i.id === s.parent_issue) ? {
      success: !1,
      error: `Parent issue "${s.parent_issue}" not found.`
    } : (s.title !== void 0 && (e.title = s.title), s.description !== void 0 && (e.description = s.description), s.person_in_charge !== void 0 && (e.person_in_charge = s.person_in_charge), s.participants !== void 0 && (e.participants = [...s.participants]), s.notes !== void 0 && (e.notes = s.notes), s.parent_issue !== void 0 && (e.parent_issue = s.parent_issue), s.index !== void 0 && (e.index = s.index), { success: !0, message: "Issue updated successfully." }) : { success: !1, error: `Issue "${s.issue_id}" not found.` };
  }
  deleteIssue(s) {
    const e = this.config.issueboard.issues.findIndex((i) => i.id === s);
    return e === -1 ? { success: !1, error: `Issue "${s}" not found.` } : (this.config.issueboard.issues.splice(e, 1), this.config.issueboard.issues = this.config.issueboard.issues.filter(
      (i) => i.parent_issue !== s
    ), { success: !0, message: "Issue deleted successfully." });
  }
  reorderIssues(s) {
    for (const i of s)
      if (!this.config.issueboard.issues.find((t) => t.id === i))
        return { success: !1, error: `Issue "${i}" not found.` };
    const e = [];
    for (let i = 0; i < s.length; i++) {
      const t = this.config.issueboard.issues.find((r) => r.id === s[i]);
      t.index = i, e.push(t);
    }
    for (const i of this.config.issueboard.issues)
      s.includes(i.id) || e.push(i);
    return this.config.issueboard.issues = e, { success: !0, message: "Issues reordered successfully." };
  }
  activateNextIssue() {
    const s = this.config.issueboard.issues.find((i) => i.is_active);
    s && (s.is_active = !1, this.config.issueboard.current_issue_id = null);
    const e = this.config.issueboard.issues.filter((i) => !i.is_done).sort((i, t) => i.index - t.index)[0];
    return e ? (e.is_active = !0, this.config.issueboard.current_issue_id = e.id, {
      success: !0,
      issue_id: e.id,
      message: `Activated issue: ${e.title}`
    }) : { success: !1, error: "No more issues to activate." };
  }
  completeCurrentIssue() {
    const s = this.config.issueboard.issues.find((e) => e.is_active);
    return s ? (s.is_done = !0, s.is_active = !1, this.config.issueboard.current_issue_id = null, {
      success: !0,
      message: `Issue "${s.id}" marked as complete.`
    }) : { success: !1, error: "No active issue to complete." };
  }
}
export {
  p as IssueboardMCP
};
//# sourceMappingURL=issueboard-mcp.js.map
