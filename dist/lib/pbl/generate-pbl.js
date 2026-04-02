import { tool as o, stepCountIs as w } from "ai";
import { callLLM as C } from "../ai/llm.js";
import { z as e } from "zod";
import { ModeMCP as I } from "./mcp/mode-mcp.js";
import { ProjectMCP as x } from "./mcp/project-mcp.js";
import { AgentMCP as b } from "./mcp/agent-mcp.js";
import { IssueboardMCP as S } from "./mcp/issueboard-mcp.js";
import { buildPBLSystemPrompt as $ } from "./pbl-system-prompt.js";
async function U(m, _, t) {
  var a, f, c, u;
  const { language: r } = m, p = {
    projectInfo: { title: "", description: "" },
    agents: [],
    issueboard: { agent_ids: [], issues: [], current_issue_id: null },
    chat: { messages: [] }
  }, n = new I(
    ["project_info", "agent", "issueboard", "idle"],
    "project_info"
  ), h = new x(p), s = new b(p), d = new S(p, s, r);
  (a = t == null ? void 0 : t.onProgress) == null || a.call(t, "Starting PBL project generation...");
  const j = {
    set_mode: o({
      description: "Switch the current working mode. Available modes: project_info, agent, issueboard, idle.",
      inputSchema: e.object({
        mode: e.enum(["project_info", "agent", "issueboard", "idle"])
      }),
      execute: async ({ mode: i }) => n.setMode(i)
    }),
    // Project info tools
    get_project_info: o({
      description: "Get the current project information (title and description). Requires project_info mode.",
      inputSchema: e.object({}),
      execute: async () => n.getCurrentMode() !== "project_info" ? { success: !1, error: "Must be in project_info mode." } : h.getProjectInfo()
    }),
    update_title: o({
      description: "Update the project title. Requires project_info mode.",
      inputSchema: e.object({
        title: e.string().describe("The new project title")
      }),
      execute: async ({ title: i }) => n.getCurrentMode() !== "project_info" ? { success: !1, error: "Must be in project_info mode." } : h.updateTitle(i)
    }),
    update_description: o({
      description: "Update the project description. Requires project_info mode.",
      inputSchema: e.object({
        description: e.string().describe("The new project description")
      }),
      execute: async ({ description: i }) => n.getCurrentMode() !== "project_info" ? { success: !1, error: "Must be in project_info mode." } : h.updateDescription(i)
    }),
    // Agent tools
    list_project_agents: o({
      description: "List all agent roles defined for the project. Requires agent mode.",
      inputSchema: e.object({}),
      execute: async () => n.getCurrentMode() !== "agent" ? { success: !1, error: "Must be in agent mode." } : s.listAgents()
    }),
    create_agent: o({
      description: "Create a new agent role for the project. Requires agent mode.",
      inputSchema: e.object({
        name: e.string().describe('Agent name (e.g., "Data Analyst", "Project Manager")'),
        system_prompt: e.string().describe("System prompt describing the agent's responsibilities"),
        default_mode: e.string().describe('Default environment mode (e.g., "chat")'),
        actor_role: e.string().optional().describe("Role description"),
        role_division: e.enum(["management", "development"]).optional().describe("Role division (default: development)")
      }),
      execute: async (i) => n.getCurrentMode() !== "agent" ? { success: !1, error: "Must be in agent mode." } : s.createAgent(i)
    }),
    update_agent: o({
      description: "Update an agent role's properties. Requires agent mode.",
      inputSchema: e.object({
        name: e.string().describe("The agent name to update"),
        new_name: e.string().optional().describe("New agent name"),
        system_prompt: e.string().optional().describe("New system prompt"),
        default_mode: e.string().optional().describe("New default mode"),
        actor_role: e.string().optional().describe("New role description"),
        role_division: e.enum(["management", "development"]).optional()
      }),
      execute: async (i) => n.getCurrentMode() !== "agent" ? { success: !1, error: "Must be in agent mode." } : s.updateAgent(i)
    }),
    delete_agent: o({
      description: "Delete an agent role. Requires agent mode.",
      inputSchema: e.object({
        name: e.string().describe("The agent name to delete")
      }),
      execute: async ({ name: i }) => n.getCurrentMode() !== "agent" ? { success: !1, error: "Must be in agent mode." } : s.deleteAgent(i)
    }),
    // Issueboard tools
    create_issueboard: o({
      description: "Create/reset the issueboard. Requires issueboard mode.",
      inputSchema: e.object({}),
      execute: async () => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.createIssueboard()
    }),
    get_issueboard: o({
      description: "Get the current issueboard configuration. Requires issueboard mode.",
      inputSchema: e.object({}),
      execute: async () => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.getIssueboard()
    }),
    update_issueboard_agents: o({
      description: "Update the agent list for the issueboard. Requires issueboard mode.",
      inputSchema: e.object({
        agent_ids: e.array(e.string()).describe("List of agent names to assign")
      }),
      execute: async ({ agent_ids: i }) => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.updateIssueboardAgents(i)
    }),
    create_issue: o({
      description: "Create a new issue in the issueboard. Automatically creates Question and Judge agents. Requires issueboard mode.",
      inputSchema: e.object({
        title: e.string().describe("Issue title"),
        description: e.string().describe("Issue description"),
        person_in_charge: e.string().describe("Person responsible (use an agent role name)"),
        participants: e.array(e.string()).optional().describe("Participant names"),
        notes: e.string().optional().describe("Additional notes"),
        parent_issue: e.string().nullable().optional().describe("Parent issue ID for sub-issues"),
        index: e.number().optional().describe("Order index")
      }),
      execute: async (i) => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.createIssue(i)
    }),
    list_issues: o({
      description: "List all issues in the issueboard. Requires issueboard mode.",
      inputSchema: e.object({}),
      execute: async () => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.listIssues()
    }),
    update_issue: o({
      description: "Update an existing issue. Requires issueboard mode.",
      inputSchema: e.object({
        issue_id: e.string().describe("The issue ID to update"),
        title: e.string().optional(),
        description: e.string().optional(),
        person_in_charge: e.string().optional(),
        participants: e.array(e.string()).optional(),
        notes: e.string().optional(),
        parent_issue: e.string().nullable().optional(),
        index: e.number().optional()
      }),
      execute: async (i) => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.updateIssue(i)
    }),
    delete_issue: o({
      description: "Delete an issue and its sub-issues. Requires issueboard mode.",
      inputSchema: e.object({
        issue_id: e.string().describe("The issue ID to delete")
      }),
      execute: async ({ issue_id: i }) => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.deleteIssue(i)
    }),
    reorder_issues: o({
      description: "Reorder issues. Requires issueboard mode.",
      inputSchema: e.object({
        issue_ids: e.array(e.string()).describe("Issue IDs in desired order")
      }),
      execute: async ({ issue_ids: i }) => n.getCurrentMode() !== "issueboard" ? { success: !1, error: "Must be in issueboard mode." } : d.reorderIssues(i)
    })
  }, y = $(m);
  return await C(
    {
      model: _,
      system: y,
      prompt: r === "zh-CN" ? "请设计一个PBL项目。现在从 project_info 模式开始，先设置项目标题和描述。" : "Design a PBL project. Start in project_info mode by setting the project title and description.",
      tools: j,
      stopWhen: w(30),
      onStepFinish: ({ toolCalls: i, text: g }) => {
        var M, P;
        if (g && ((M = t == null ? void 0 : t.onProgress) == null || M.call(t, `Thinking: ${g.slice(0, 100)}...`)), i)
          for (const q of i)
            (P = t == null ? void 0 : t.onProgress) == null || P.call(t, `Tool: ${q.toolName}`);
      }
    },
    "pbl-generate"
  ), n.getCurrentMode() !== "idle" && ((f = t == null ? void 0 : t.onProgress) == null || f.call(
    t,
    "Warning: Generation did not reach idle mode. Project may be incomplete."
  )), (c = t == null ? void 0 : t.onProgress) == null || c.call(t, "PBL structure generated. Running post-processing..."), await R(p, _, r, t), (u = t == null ? void 0 : t.onProgress) == null || u.call(t, "PBL project generation complete!"), p;
}
async function R(m, _, t, r) {
  var j, y, a, f, c;
  const { issueboard: p, agents: n } = m;
  if (p.issues.length === 0)
    return;
  const s = [...p.issues].sort((u, i) => u.index - i.index)[0];
  s.is_active = !0, p.current_issue_id = s.id, (j = r == null ? void 0 : r.onProgress) == null || j.call(r, `Activating first issue: ${s.title}`);
  const d = n.find((u) => u.name === s.question_agent_name);
  if (!d) {
    (y = r == null ? void 0 : r.onProgress) == null || y.call(r, "Warning: Question agent not found for first issue.");
    return;
  }
  try {
    (a = r == null ? void 0 : r.onProgress) == null || a.call(r, "Generating initial questions for first issue...");
    const u = t === "zh-CN" ? `## 任务信息

**标题**: ${s.title}
**描述**: ${s.description}
**负责人**: ${s.person_in_charge}
${s.participants.length > 0 ? `**参与者**: ${s.participants.join("、")}` : ""}
${s.notes ? `**备注**: ${s.notes}` : ""}

## 你的任务

根据以上任务信息，生成1-3个具体、可操作的引导问题，帮助学生理解和完成这个任务。每个问题应：
- 引导学生达成关键学习目标
- 具体且可操作
- 帮助分解问题
- 鼓励批判性思考

请以编号列表格式回答。` : `## Issue Information

**Title**: ${s.title}
**Description**: ${s.description}
**Person in Charge**: ${s.person_in_charge}
${s.participants.length > 0 ? `**Participants**: ${s.participants.join(", ")}` : ""}
${s.notes ? `**Notes**: ${s.notes}` : ""}

## Your Task

Based on the issue information above, generate 1-3 specific, actionable questions that will help students understand and complete this issue. Each question should:
- Guide students toward key learning objectives
- Be specific and actionable
- Help break down the problem
- Encourage critical thinking

Format your response as a numbered list.`, g = (await C(
      {
        model: _,
        system: d.system_prompt,
        prompt: u
      },
      "pbl-post-process"
    )).text;
    s.generated_questions = g;
    const M = t === "zh-CN" ? `你好！我是这个任务的提问助手："${s.title}"

为了引导你的学习，我准备了一些问题：

${g}

随时 @question 我来获取帮助或澄清！` : `Hello! I'm your Question Agent for this issue: "${s.title}"

To help guide your work, I've prepared some questions for you:

${g}

Feel free to @question me anytime if you need help or clarification!`;
    m.chat.messages.push({
      id: `msg_welcome_${Date.now()}`,
      agent_name: s.question_agent_name,
      message: M,
      timestamp: Date.now(),
      read_by: []
    }), (f = r == null ? void 0 : r.onProgress) == null || f.call(r, "Initial questions generated and welcome message added.");
  } catch (u) {
    (c = r == null ? void 0 : r.onProgress) == null || c.call(
      r,
      `Warning: Failed to generate initial questions: ${u instanceof Error ? u.message : String(u)}`
    );
  }
}
export {
  U as generatePBLContent
};
//# sourceMappingURL=generate-pbl.js.map
