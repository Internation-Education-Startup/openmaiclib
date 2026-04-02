import { createLogger as f } from "../logger.js";
const y = f("DirectorPrompt");
function _(o, e, s, n, a, t, c, r, l) {
  const u = o.map((i) => `- id: "${i.id}", name: "${i.name}", role: ${i.role}, priority: ${i.priority}`).join(`
`), p = s.length > 0 ? s.map((i) => {
    const h = k(i.whiteboardActions), $ = h ? ` | Whiteboard: ${h}` : "";
    return `- ${i.agentName} (${i.agentId}): "${i.contentPreview}" [${i.actionCount} actions${$}]`;
  }).join(`
`) : "None yet.", d = !!a, w = d ? `
# Discussion Mode
Topic: "${a.topic}"${a.prompt ? `
Prompt: "${a.prompt}"` : ""}${t ? `
Initiator: "${t}"` : ""}
This is a student-initiated discussion, not a Q&A session.
` : "", g = d ? `1. The discussion initiator${t ? ` ("${t}")` : ""} should speak first to kick off the topic. Then the teacher responds to guide the discussion. After that, other students may add their perspectives.` : "1. The teacher (role: teacher, highest priority) should usually speak first to address the user's question or topic.", b = E(c), m = r != null && r.nickname || r != null && r.bio ? `
# Student Profile
Student name: ${r.nickname || "Unknown"}
${r.bio ? `Background: ${r.bio}` : ""}
` : "";
  return `You are the Director of a multi-agent classroom. Your job is to decide which agent should speak next based on the conversation context.

# Available Agents
${u}

# Agents Who Already Spoke This Round
${p}

# Conversation Context
${e}
${w}${b}${m}
# Rules
${g}
2. After the teacher, consider whether a student agent would add value (ask a follow-up question, crack a joke, take notes, offer a different perspective).
3. Do NOT repeat an agent who already spoke this round unless absolutely necessary.
4. If the conversation seems complete (question answered, topic covered), output END.
5. Current turn: ${n + 1}. Consider conversation length — don't let discussions drag on unnecessarily.
6. Prefer brevity — 1-2 agents responding is usually enough. Don't force every agent to speak.
7. You can output {"next_agent":"USER"} to cue the user to speak. Use this when a student asks the user a direct question or when the topic naturally calls for user input.
8. Consider whiteboard state when routing: if the whiteboard is already crowded, avoid dispatching agents that are likely to add more whiteboard content unless they would clear or organize it.
9. Whiteboard is currently ${l ? "OPEN (slide canvas is hidden — spotlight/laser will not work)" : "CLOSED (slide canvas is visible)"}. When the whiteboard is open, do not expect spotlight or laser actions to have visible effect.

# Routing Quality (CRITICAL)
- ROLE DIVERSITY: Do NOT dispatch two agents of the same role consecutively. After a teacher speaks, the next should be a student or assistant — not another teacher-like response. After an assistant rephrases, dispatch a student who asks a question, not another assistant who also rephrases.
- CONTENT DEDUP: Read the "Agents Who Already Spoke" previews carefully. If an agent already explained a concept thoroughly, do NOT dispatch another agent to explain the same concept. Instead, dispatch an agent who will ASK a question, CHALLENGE an assumption, CONNECT to another topic, or TAKE NOTES.
- DISCUSSION PROGRESSION: Each new agent should advance the conversation. Good progression: explain → question → deeper explanation → different perspective → summary. Bad progression: explain → re-explain → rephrase → paraphrase.
- GREETING RULE: If any agent has already greeted the students, no subsequent agent should greet again. Check the previews for greetings.

# Output Format
You MUST output ONLY a JSON object, nothing else:
{"next_agent":"<agent_id>"}
or
{"next_agent":"USER"}
or
{"next_agent":"END"}`;
}
function k(o) {
  var s, n;
  if (!o || o.length === 0) return "";
  const e = [];
  for (const a of o)
    switch (a.actionName) {
      case "wb_draw_text": {
        const t = String(a.params.content || "").slice(0, 30);
        e.push(`drew text "${t}${t.length >= 30 ? "..." : ""}"`);
        break;
      }
      case "wb_draw_shape":
        e.push(`drew shape(${a.params.type || "rectangle"})`);
        break;
      case "wb_draw_chart": {
        const t = Array.isArray(a.params.labels) ? a.params.labels : (s = a.params.data) == null ? void 0 : s.labels, c = a.params.chartType || a.params.type || "bar";
        e.push(
          `drew chart(${c}${t ? `, labels: [${t.slice(0, 4).join(",")}]` : ""})`
        );
        break;
      }
      case "wb_draw_latex": {
        const t = String(a.params.latex || "").slice(0, 30);
        e.push(`drew formula "${t}${t.length >= 30 ? "..." : ""}"`);
        break;
      }
      case "wb_draw_table": {
        const t = a.params.data, c = (t == null ? void 0 : t.length) || 0, r = ((n = t == null ? void 0 : t[0]) == null ? void 0 : n.length) || 0;
        e.push(`drew table(${c}×${r})`);
        break;
      }
      case "wb_draw_line": {
        const t = a.params.points, c = t != null && t.includes("arrow") ? " arrow" : "";
        e.push(`drew${c} line`);
        break;
      }
      case "wb_clear":
        e.push("CLEARED whiteboard");
        break;
      case "wb_delete":
        e.push(`deleted element "${a.params.elementId}"`);
        break;
    }
  return e.join(", ");
}
function S(o) {
  let e = 0;
  const s = /* @__PURE__ */ new Set();
  for (const n of o)
    n.actionName === "wb_clear" ? e = 0 : n.actionName === "wb_delete" ? e = Math.max(0, e - 1) : n.actionName.startsWith("wb_draw_") && (e++, s.add(n.agentName));
  return {
    elementCount: e,
    contributors: Array.from(s)
  };
}
function E(o) {
  if (!o || o.length === 0) return "";
  const { elementCount: e, contributors: s } = S(o), n = e > 5 ? `
⚠ The whiteboard is getting crowded. Consider routing to an agent that will organize or clear it rather than adding more.` : "";
  return `
# Whiteboard State
Elements on whiteboard: ${e}
Contributors: ${s.length > 0 ? s.join(", ") : "none"}${n}
`;
}
function x(o) {
  try {
    const e = o.match(/\{[\s\S]*?"next_agent"[\s\S]*?\}/);
    if (e) {
      const n = JSON.parse(e[0]).next_agent;
      return !n || n === "END" ? { nextAgentId: null, shouldEnd: !0 } : { nextAgentId: n, shouldEnd: !1 };
    }
  } catch {
    y.warn("[Director] Failed to parse decision:", o.slice(0, 200));
  }
  return { nextAgentId: null, shouldEnd: !0 };
}
export {
  _ as buildDirectorPrompt,
  x as parseDirectorDecision,
  S as summarizeWhiteboardForDirector
};
//# sourceMappingURL=director-prompt.js.map
