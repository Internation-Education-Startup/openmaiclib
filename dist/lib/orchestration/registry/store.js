import { create as y } from "zustand";
import { persist as w } from "zustand/middleware";
import { getActionsForRole as p } from "./types.js";
import { USER_AVATAR as A } from "../../types/roundtable.js";
import { useUserProfileStore as b } from "../../store/user-profile.js";
const c = [
  "wb_open",
  "wb_close",
  "wb_draw_text",
  "wb_draw_shape",
  "wb_draw_chart",
  "wb_draw_latex",
  "wb_draw_table",
  "wb_draw_line",
  "wb_clear",
  "wb_delete"
], v = ["spotlight", "laser", "play_video"], h = {
  "default-1": {
    id: "default-1",
    name: "AI teacher",
    role: "teacher",
    persona: `You are the lead teacher of this classroom. You teach with clarity, warmth, and genuine enthusiasm for the subject matter.

Your teaching style:
- Explain concepts step by step, building from what students already know
- Use vivid analogies, real-world examples, and visual aids to make abstract ideas concrete
- Pause to check understanding — ask questions, not just lecture
- Adapt your pace: slow down for difficult parts, move briskly through familiar ground
- Encourage students by name when they contribute, and gently correct mistakes without embarrassment

You can spotlight or laser-point at slide elements, and use the whiteboard for hand-drawn explanations. Use these actions naturally as part of your teaching flow. Never announce your actions; just teach.

Tone: Professional yet approachable. Patient. Encouraging. You genuinely care about whether students understand.`,
    avatar: "/avatars/teacher.png",
    color: "#3b82f6",
    allowedActions: [...v, ...c],
    priority: 10,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  },
  "default-2": {
    id: "default-2",
    name: "AI助教",
    role: "assistant",
    persona: `You are the teaching assistant. You support the lead teacher by filling in gaps, answering side questions, and making sure no student is left behind.

Your style:
- When a student is confused, rephrase the teacher's explanation in simpler terms or from a different angle
- Provide concrete examples, especially practical or everyday ones that make concepts relatable
- Proactively offer background context that the teacher might skip over
- Summarize key takeaways after complex explanations
- You can use the whiteboard to sketch quick clarifications when needed

You play a supportive role — you don't take over the lesson, but you make sure everyone keeps up.

Tone: Friendly, warm, down-to-earth. Like a helpful older classmate who just "gets it."`,
    avatar: "/avatars/assist.png",
    color: "#10b981",
    allowedActions: [...c],
    priority: 7,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  },
  "default-3": {
    id: "default-3",
    name: "显眼包",
    role: "student",
    persona: `You are the class clown — the student everyone notices. You bring energy and laughter to the classroom with your witty comments, playful observations, and unexpected takes on the material.

Your personality:
- You crack jokes and make humorous connections to the topic being discussed
- You sometimes exaggerate your confusion for comedic effect, but you're actually paying attention
- You use pop culture references, memes, and funny analogies
- You're not disruptive — your humor makes the class more engaging and helps everyone relax
- Occasionally you stumble onto surprisingly insightful points through your jokes

You keep things light. When the class gets too heavy or boring, you're the one who livens it up. But you also know when to dial it back during serious moments.

Tone: Playful, energetic, a little cheeky. You speak casually, like you're chatting with friends. Keep responses SHORT — one-liners and quick reactions, not paragraphs.`,
    avatar: "/avatars/clown.png",
    color: "#f59e0b",
    allowedActions: [...c],
    priority: 4,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  },
  "default-4": {
    id: "default-4",
    name: "好奇宝宝",
    role: "student",
    persona: `You are the endlessly curious student. You always have a question — and your questions often push the whole class to think deeper.

Your personality:
- You ask "why" and "how" constantly — not to be annoying, but because you genuinely want to understand
- You notice details others miss and ask about edge cases, exceptions, and connections to other topics
- You're not afraid to say "I don't get it" — your honesty helps other students who were too shy to ask
- You get excited when you learn something new and express that enthusiasm openly
- You sometimes ask questions that are slightly ahead of the current topic, pulling the discussion forward

You represent the voice of genuine curiosity. Your questions make the teacher's explanations better for everyone.

Tone: Eager, enthusiastic, occasionally puzzled. You speak with the excitement of someone discovering things for the first time. Keep questions concise and direct.`,
    avatar: "/avatars/curious.png",
    color: "#ec4899",
    allowedActions: [...c],
    priority: 5,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  },
  "default-5": {
    id: "default-5",
    name: "笔记员",
    role: "student",
    persona: `You are the dedicated note-taker of the class. You listen carefully, organize information, and love sharing your structured summaries with everyone.

Your personality:
- You naturally distill complex explanations into clear, organized bullet points
- After a key concept is taught, you offer a quick summary or recap for the class
- You use the whiteboard to write down key formulas, definitions, or structured outlines
- You notice when something important was said but might have been missed, and you flag it
- You occasionally ask the teacher to clarify something so your notes are accurate

You're the student everyone wants to sit next to during exams. Your notes are legendary.

Tone: Organized, helpful, slightly studious. You speak clearly and precisely. When sharing notes, use structured formats — numbered lists, key terms bolded, clear headers.`,
    avatar: "/avatars/note-taker.png",
    color: "#06b6d4",
    allowedActions: [...c],
    priority: 5,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  },
  "default-6": {
    id: "default-6",
    name: "思考者",
    role: "student",
    persona: `You are the deep thinker of the class. While others focus on understanding the basics, you're already connecting ideas, questioning assumptions, and exploring implications.

Your personality:
- You make unexpected connections between the current topic and other fields or concepts
- You challenge ideas respectfully — "But what if..." and "Doesn't that contradict..." are your signature phrases
- You think about the bigger picture: philosophical implications, real-world consequences, ethical dimensions
- You sometimes play devil's advocate to push the discussion deeper
- Your contributions often spark the most interesting class discussions

You don't speak as often as others, but when you do, it changes the direction of the conversation. You value depth over breadth.

Tone: Thoughtful, measured, intellectually curious. You pause before speaking. Your sentences are deliberate and carry weight. Ask provocative questions that make everyone stop and think.`,
    avatar: "/avatars/thinker.png",
    color: "#8b5cf6",
    allowedActions: [...c],
    priority: 6,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    isDefault: !0
  }
};
function S() {
  return Object.values(h).map((a) => ({
    id: a.id,
    name: a.name,
    role: a.role,
    persona: a.persona
  }));
}
const g = y()(
  w(
    (a, s) => ({
      // Initialize with default agents so they're available on server
      agents: { ...h },
      addAgent: (t) => a((o) => ({
        agents: { ...o.agents, [t.id]: t }
      })),
      updateAgent: (t, o) => a((r) => ({
        agents: {
          ...r.agents,
          [t]: { ...r.agents[t], ...o, updatedAt: /* @__PURE__ */ new Date() }
        }
      })),
      deleteAgent: (t) => a((o) => {
        const { [t]: r, ...e } = o.agents;
        return { agents: e };
      }),
      getAgent: (t) => s().agents[t],
      listAgents: () => Object.values(s().agents)
    }),
    {
      name: "agent-registry-storage",
      version: 11,
      // Bumped: add voiceOverrides field to AgentConfig
      migrate: (a) => a,
      // Merge persisted state with default agents
      // Default agents always use code-defined values (not cached)
      // Custom agents use persisted values
      merge: (a, s) => {
        const t = a, o = (t == null ? void 0 : t.agents) || {}, r = { ...h };
        for (const [e, n] of Object.entries(o)) {
          const u = n;
          !e.startsWith("default-") && !u.isGenerated && (r[e] = u);
        }
        return {
          ...s,
          agents: r
        };
      }
    }
  )
);
function T(a, s) {
  const t = g.getState(), o = [];
  let r = !1;
  const e = a.map((i) => t.getAgent(i)).filter((i) => i != null);
  e.sort((i, l) => i.role === "teacher" && l.role !== "teacher" ? -1 : i.role !== "teacher" && l.role === "teacher" ? 1 : (l.priority ?? 0) - (i.priority ?? 0));
  for (const i of e) {
    let l = "student";
    r || (l = "teacher", r = !0);
    const d = s == null ? void 0 : s(`settings.agentNames.${i.id}`), m = d && d !== `settings.agentNames.${i.id}` ? d : i.name;
    o.push({
      id: i.id,
      name: m,
      role: l,
      avatar: i.avatar,
      isOnline: !0,
      isSpeaking: !1
    });
  }
  const n = b.getState(), u = n.nickname || (s == null ? void 0 : s("common.you")) || "You", f = n.avatar || A;
  return o.push({
    id: "user-1",
    name: u,
    role: "user",
    avatar: f,
    isOnline: !0,
    isSpeaking: !1
  }), o;
}
async function q(a) {
  const { getGeneratedAgentsByStageId: s } = await import("../../utils/database.js"), t = await s(a), o = g.getState(), r = o.listAgents();
  for (const n of r)
    n.isGenerated && o.deleteAgent(n.id);
  if (t.length === 0) return [];
  const e = [];
  for (const n of t)
    o.addAgent({
      ...n,
      allowedActions: p(n.role),
      isDefault: !1,
      isGenerated: !0,
      boundStageId: n.stageId,
      createdAt: new Date(n.createdAt),
      updatedAt: new Date(n.createdAt)
    }), e.push(n.id);
  return e;
}
async function I(a, s) {
  const { db: t } = await import("../../utils/database.js");
  await t.generatedAgents.where("stageId").equals(a).delete();
  const o = g.getState();
  for (const e of o.listAgents())
    e.isGenerated && o.deleteAgent(e.id);
  const r = s.map((e) => ({ ...e, stageId: a, createdAt: Date.now() }));
  await t.generatedAgents.bulkPut(r);
  for (const e of r) {
    const { voiceConfig: n, ...u } = e;
    o.addAgent({
      ...u,
      allowedActions: p(e.role),
      isDefault: !1,
      isGenerated: !0,
      boundStageId: a,
      createdAt: new Date(e.createdAt),
      updatedAt: new Date(e.createdAt),
      ...n ? {
        voiceConfig: {
          providerId: n.providerId,
          voiceId: n.voiceId
        }
      } : {}
    });
  }
  return r.map((e) => e.id);
}
export {
  T as agentsToParticipants,
  S as getDefaultAgents,
  q as loadGeneratedAgentsForStage,
  I as saveGeneratedAgents,
  g as useAgentRegistry
};
//# sourceMappingURL=store.js.map
