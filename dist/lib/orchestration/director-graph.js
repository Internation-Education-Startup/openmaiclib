import { Annotation as a, StateGraph as M, START as L, END as D } from "@langchain/langgraph";
import { SystemMessage as N, HumanMessage as y, AIMessage as _ } from "@langchain/core/messages";
import { AISdkLangGraphAdapter as R } from "./ai-sdk-adapter.js";
import { useAgentRegistry as O } from "./registry/store.js";
import { convertMessagesToOpenAI as G, summarizeConversation as U, buildStructuredPrompt as W } from "./prompt-builder.js";
import { buildDirectorPrompt as z, parseDirectorDecision as j } from "./director-prompt.js";
import { getEffectiveActions as F } from "./tool-schemas.js";
import { parseStructuredChunk as H, finalizeParser as B, createParserState as J } from "./stateless-generate.js";
import { createLogger as K } from "../logger.js";
const s = K("DirectorGraph"), Q = a.Root({
  // Input (set once at graph entry)
  messages: a,
  storeState: a,
  availableAgentIds: a,
  maxTurns: a,
  languageModel: a,
  thinkingConfig: a,
  discussionContext: a,
  triggerAgentId: a,
  userProfile: a,
  /** Request-scoped agent configs for generated agents (not in the default registry) */
  agentConfigOverrides: a,
  // Mutable (updated by nodes)
  currentAgentId: a,
  turnCount: a,
  agentResponses: a({
    reducer: (e, n) => [...e, ...n],
    default: () => []
  }),
  whiteboardLedger: a({
    reducer: (e, n) => [...e, ...n],
    default: () => []
  }),
  shouldEnd: a,
  totalActions: a
});
function k(e, n) {
  return e.agentConfigOverrides[n] ?? O.getState().getAgent(n);
}
async function V(e, n) {
  var I;
  const g = n.writer, t = (r) => {
    try {
      g(r);
    } catch {
    }
  }, u = e.availableAgentIds.length <= 1;
  if (e.turnCount >= e.maxTurns)
    return s.info(`[Director] Turn limit reached (${e.turnCount}/${e.maxTurns}), ending`), { shouldEnd: !0 };
  if (u) {
    const r = e.availableAgentIds[0] || "default-1";
    return e.turnCount === 0 ? (s.info(`[Director] Single agent: dispatching "${r}"`), t({ type: "thinking", data: { stage: "agent_loading", agentId: r } }), { currentAgentId: r, shouldEnd: !1 }) : (s.info(`[Director] Single agent: cueing user after "${r}"`), t({ type: "cue_user", data: { fromAgentId: r } }), { shouldEnd: !0 });
  }
  if (e.turnCount === 0 && e.triggerAgentId) {
    const r = e.triggerAgentId;
    if (e.availableAgentIds.includes(r))
      return s.info(`[Director] First turn: dispatching trigger agent "${r}"`), t({
        type: "thinking",
        data: { stage: "agent_loading", agentId: r }
      }), { currentAgentId: r, shouldEnd: !1 };
    s.warn(
      `[Director] Trigger agent "${r}" not in available agents, falling through to LLM`
    );
  }
  const o = e.availableAgentIds.map((r) => k(e, r)).filter((r) => r != null);
  if (o.length === 0)
    return { shouldEnd: !0 };
  t({ type: "thinking", data: { stage: "director" } });
  const f = G(e.messages), h = U(f), x = z(
    o,
    h,
    e.agentResponses,
    e.turnCount,
    e.discussionContext,
    e.triggerAgentId,
    e.whiteboardLedger,
    e.userProfile || void 0,
    e.storeState.whiteboardOpen
  ), S = new R(e.languageModel, e.thinkingConfig ?? void 0);
  try {
    const E = ((I = (await S._generate(
      [new N(x), new y("Decide which agent should speak next.")],
      { signal: n.signal }
    )).generations[0]) == null ? void 0 : I.text) || "";
    s.info(`[Director] Raw decision: ${E}`);
    const p = j(E);
    return p.shouldEnd || !p.nextAgentId ? (s.info("[Director] Decision: END"), { shouldEnd: !0 }) : p.nextAgentId === "USER" ? (s.info("[Director] Decision: cue USER to speak"), t({
      type: "cue_user",
      data: { fromAgentId: e.currentAgentId || void 0 }
    }), { shouldEnd: !0 }) : o.some((b) => b.id === p.nextAgentId) ? (t({
      type: "thinking",
      data: { stage: "agent_loading", agentId: p.nextAgentId }
    }), s.info(`[Director] Decision: dispatch agent "${p.nextAgentId}"`), {
      currentAgentId: p.nextAgentId,
      shouldEnd: !1
    }) : (s.warn(`[Director] Unknown agent "${p.nextAgentId}", ending`), { shouldEnd: !0 });
  } catch (r) {
    return s.error("[Director] Error:", r), { shouldEnd: !0 };
  }
}
function X(e) {
  return e.shouldEnd ? D : "agent_generate";
}
async function Y(e, n, g) {
  const t = k(e, n);
  if (!t)
    throw new Error(`Agent not found: ${n}`);
  const u = g.writer, o = (i) => {
    try {
      u(i);
    } catch (A) {
      s.warn(`[AgentGenerate] write failed for ${n}:`, A);
    }
  }, f = `assistant-${n}-${Date.now()}`;
  o({
    type: "agent_start",
    data: {
      messageId: f,
      agentId: n,
      agentName: t.name,
      agentAvatar: t.avatar,
      agentColor: t.color
    }
  });
  const h = e.storeState.currentSceneId ? e.storeState.scenes.find((i) => i.id === e.storeState.currentSceneId) : void 0, x = h == null ? void 0 : h.type, S = F(t.allowedActions, x), I = e.discussionContext || void 0, r = W(
    t,
    e.storeState,
    I,
    e.whiteboardLedger,
    e.userProfile || void 0,
    e.agentResponses
  ), E = G(e.messages, n), p = new R(e.languageModel, e.thinkingConfig ?? void 0), m = [
    new N(r),
    ...E.map(
      (i) => i.role === "user" ? new y(i.content) : new _(i.content)
    )
  ], b = m[m.length - 1];
  m.some((i) => i instanceof y) ? b instanceof _ && m.push(new y("It's your turn to speak. Respond from your perspective.")) : m.push(new y("Please begin."));
  const $ = J();
  let v = "", P = 0;
  const T = [];
  try {
    for await (const A of p.streamGenerate(m, {
      signal: g.signal
    }))
      if (A.type === "delta") {
        const c = H(A.content, $);
        let C = 0;
        (c.ordered.length > 0 || c.textChunks.length > 0) && s.debug(
          `[AgentGenerate] Parse: ordered=${c.ordered.length} (${c.ordered.map((l) => l.type).join(",")}), textChunks=${c.textChunks.length}, actions=${c.actions.length}, done=${c.isDone}`
        );
        for (const l of c.ordered)
          if (l.type === "text") {
            const d = c.textChunks[l.index];
            if (!d) {
              s.warn(
                `[AgentGenerate] Ordered text entry index=${l.index} but textChunks[${l.index}] is empty`
              );
              continue;
            }
            const w = d.replace(/^>+\s?/gm, "");
            if (!w) continue;
            v += w, o({
              type: "text_delta",
              data: { content: w, messageId: f }
            }), C++;
          } else if (l.type === "action") {
            const d = c.actions[l.index];
            if (!d) continue;
            if (!S.includes(d.actionName)) {
              s.warn(
                `[AgentGenerate] Agent ${t.name} attempted disallowed action: ${d.actionName}, skipping`
              );
              continue;
            }
            P++, d.actionName.startsWith("wb_") && T.push({
              actionName: d.actionName,
              agentId: n,
              agentName: t.name,
              params: d.params
            }), o({
              type: "action",
              data: {
                actionId: d.actionId,
                actionName: d.actionName,
                params: d.params,
                agentId: n,
                messageId: f
              }
            });
          }
        for (let l = C; l < c.textChunks.length; l++) {
          const d = c.textChunks[l];
          if (!d) continue;
          const w = d.replace(/^>+\s?/gm, "");
          w && (v += w, o({
            type: "text_delta",
            data: { content: w, messageId: f }
          }));
        }
      }
    const i = B($);
    for (const A of i.ordered)
      if (A.type === "text") {
        const c = i.textChunks[A.index];
        if (!c) continue;
        const C = c.replace(/^>+\s?/gm, "");
        if (!C) continue;
        v += C, o({
          type: "text_delta",
          data: { content: C, messageId: f }
        });
      }
  } catch (i) {
    if (i instanceof Error && i.name === "AbortError")
      throw i;
    s.error(`[AgentGenerate] Error for ${t.name}:`, i), o({
      type: "error",
      data: { message: i instanceof Error ? i.message : String(i) }
    });
  }
  return o({
    type: "agent_end",
    data: { messageId: f, agentId: n }
  }), {
    contentPreview: v.slice(0, 300),
    actionCount: P,
    whiteboardActions: T
  };
}
async function Z(e, n) {
  const g = e.currentAgentId;
  if (!g)
    return { shouldEnd: !0 };
  const t = k(e, g), u = await Y(e, g, n);
  return !u.contentPreview && u.actionCount === 0 && s.warn(
    `[AgentGenerate] Agent "${(t == null ? void 0 : t.name) || g}" produced empty response (no text, no actions)`
  ), {
    turnCount: e.turnCount + 1,
    totalActions: e.totalActions + u.actionCount,
    agentResponses: [
      {
        agentId: g,
        agentName: (t == null ? void 0 : t.name) || g,
        contentPreview: u.contentPreview,
        actionCount: u.actionCount,
        whiteboardActions: u.whiteboardActions
      }
    ],
    whiteboardLedger: u.whiteboardActions,
    currentAgentId: null
  };
}
function ce() {
  return new M(Q).addNode("director", V).addNode("agent_generate", Z).addEdge(L, "director").addConditionalEdges("director", X, {
    agent_generate: "agent_generate",
    [D]: D
  }).addEdge("agent_generate", "director").compile();
}
function de(e, n, g) {
  var h;
  const t = {};
  if ((h = e.config.agentConfigs) != null && h.length)
    for (const x of e.config.agentConfigs)
      t[x.id] = {
        ...x,
        isDefault: !1,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
  const u = e.config.discussionTopic ? {
    topic: e.config.discussionTopic,
    prompt: e.config.discussionPrompt
  } : null, o = e.directorState, f = (o == null ? void 0 : o.turnCount) ?? 0;
  return {
    messages: e.messages,
    storeState: e.storeState,
    availableAgentIds: e.config.agentIds,
    maxTurns: f + 1,
    // Allow exactly one more director→agent cycle
    languageModel: n,
    thinkingConfig: g ?? null,
    discussionContext: u,
    triggerAgentId: e.config.triggerAgentId || null,
    userProfile: e.userProfile || null,
    agentConfigOverrides: t,
    currentAgentId: null,
    turnCount: f,
    agentResponses: (o == null ? void 0 : o.agentResponses) ?? [],
    whiteboardLedger: (o == null ? void 0 : o.whiteboardLedger) ?? [],
    shouldEnd: !1,
    totalActions: 0
  };
}
export {
  de as buildInitialState,
  ce as createOrchestrationGraph
};
//# sourceMappingURL=director-graph.js.map
