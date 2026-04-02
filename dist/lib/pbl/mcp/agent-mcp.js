class d {
  constructor(e) {
    this.config = e;
  }
  listAgents() {
    return {
      success: !0,
      agents: this.config.agents.map((e) => ({ ...e })),
      message: this.config.agents.length === 0 ? "No agents found." : void 0
    };
  }
  getAgentInfo(e) {
    const t = this.config.agents.find((n) => n.name === e);
    return t ? { success: !0, agent: { ...t } } : { success: !1, error: `Agent "${e}" not found.` };
  }
  createAgent(e) {
    const {
      name: t,
      system_prompt: n,
      default_mode: s,
      delay_time: i = 0,
      actor_role: o = "",
      role_division: c = "development",
      is_system_agent: r = !1
    } = e;
    if (!(t != null && t.trim()))
      return { success: !1, error: "Agent name cannot be empty." };
    if (!(n != null && n.trim()))
      return { success: !1, error: "System prompt cannot be empty." };
    if (this.config.agents.find((u) => u.name === t))
      return { success: !1, error: `Agent "${t}" already exists.` };
    const f = {
      name: t,
      actor_role: o,
      role_division: c,
      system_prompt: n,
      default_mode: s,
      delay_time: i,
      env: {
        chat: {
          max_tokens: 4096,
          system_prompt: n
        }
      },
      is_user_role: !1,
      is_active: !1,
      is_system_agent: r
    };
    return this.config.agents.push(f), { success: !0, message: `Agent "${t}" created successfully.` };
  }
  updateAgent(e) {
    const t = this.config.agents.find((n) => n.name === e.name);
    return t ? e.new_name && e.new_name !== e.name && this.config.agents.find((n) => n.name === e.new_name) ? {
      success: !1,
      error: `Agent "${e.new_name}" already exists.`
    } : (e.new_name !== void 0 && (t.name = e.new_name), e.system_prompt !== void 0 && (t.system_prompt = e.system_prompt, t.env.chat && typeof t.env.chat == "object" && (t.env.chat.system_prompt = e.system_prompt)), e.default_mode !== void 0 && (t.default_mode = e.default_mode), e.delay_time !== void 0 && (t.delay_time = e.delay_time), e.actor_role !== void 0 && (t.actor_role = e.actor_role), e.role_division !== void 0 && (t.role_division = e.role_division), { success: !0, message: "Agent updated successfully." }) : { success: !1, error: `Agent "${e.name}" not found.` };
  }
  deleteAgent(e) {
    const t = this.config.agents.findIndex((n) => n.name === e);
    return t === -1 ? { success: !1, error: `Agent "${e}" not found.` } : (this.config.agents.splice(t, 1), { success: !0, message: "Agent deleted successfully." });
  }
}
export {
  d as AgentMCP
};
//# sourceMappingURL=agent-mcp.js.map
