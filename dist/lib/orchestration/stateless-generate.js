import { createOrchestrationGraph as L, buildInitialState as A } from "./director-graph.js";
import { parse as w, Allow as p } from "partial-json";
import { jsonrepair as N } from "jsonrepair";
import { createLogger as T } from "../logger.js";
const C = T("StatelessGenerate");
function v() {
  return {
    buffer: "",
    jsonStarted: !1,
    lastParsedItemCount: 0,
    lastPartialTextLength: 0,
    isDone: !1
  };
}
function D(r, t, a, i) {
  if (r.type === "text") {
    const s = r.content || "";
    if (s)
      return t.textChunks.push(s), t.ordered.push({
        type: "text",
        index: t.textChunks.length - 1
      }), { textSegmentIndex: a + 1, actionSegmentIndex: i };
  } else if (r.type === "action") {
    const s = {
      actionId: r.action_id || `action-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      actionName: r.name || r.tool_name,
      params: r.params || r.parameters || {}
    };
    return t.actions.push(s), t.ordered.push({ type: "action", index: t.actions.length - 1 }), { textSegmentIndex: a, actionSegmentIndex: i + 1 };
  }
  return { textSegmentIndex: a, actionSegmentIndex: i };
}
function $(r, t) {
  const a = {
    textChunks: [],
    actions: [],
    isDone: !1,
    ordered: []
  };
  if (t.isDone)
    return a;
  if (t.buffer += r, !t.jsonStarted) {
    const n = t.buffer.indexOf("[");
    if (n === -1)
      return a;
    t.buffer = t.buffer.slice(n), t.jsonStarted = !0;
  }
  const i = t.buffer.trimEnd(), s = i.endsWith("]") && i.length > 1;
  let e;
  try {
    const n = N(t.buffer);
    e = JSON.parse(n);
  } catch {
    try {
      e = w(
        t.buffer,
        p.ARR | p.OBJ | p.STR | p.NUM | p.BOOL | p.NULL
      );
    } catch {
      return a;
    }
  }
  if (!Array.isArray(e))
    return a;
  const g = s ? e.length : Math.max(0, e.length - 1);
  let f = 0, d = 0;
  for (let n = 0; n < t.lastParsedItemCount && n < e.length; n++) {
    const o = e[n];
    (o == null ? void 0 : o.type) === "text" ? f++ : (o == null ? void 0 : o.type) === "action" && d++;
  }
  for (let n = t.lastParsedItemCount; n < g; n++) {
    const o = e[n];
    if (!o || typeof o != "object") continue;
    if (n === t.lastParsedItemCount && t.lastPartialTextLength > 0 && o.type === "text") {
      const u = (o.content || "").slice(t.lastPartialTextLength);
      u && a.textChunks.push(u), a.ordered.push({
        type: "text",
        index: a.textChunks.length - 1
      }), f++, t.lastPartialTextLength = 0;
      continue;
    }
    const h = D(o, a, f, d);
    f = h.textSegmentIndex, d = h.actionSegmentIndex;
  }
  if (t.lastParsedItemCount = g, !s && e.length > g) {
    const n = e[e.length - 1];
    if (n && typeof n == "object" && n.type === "text") {
      const o = n.content || "";
      o.length > t.lastPartialTextLength && (a.textChunks.push(o.slice(t.lastPartialTextLength)), t.lastPartialTextLength = o.length);
    }
  }
  return s && (t.isDone = !0, a.isDone = !0, t.lastParsedItemCount = e.length, t.lastPartialTextLength = 0), a;
}
function E(r) {
  const t = {
    textChunks: [],
    actions: [],
    isDone: !0,
    ordered: []
  };
  if (r.isDone)
    return t;
  const a = r.buffer.trim();
  if (!a)
    return t;
  if (!r.jsonStarted)
    t.textChunks.push(a), t.ordered.push({ type: "text", index: 0 });
  else {
    const i = $("", r);
    if (t.textChunks.push(...i.textChunks), t.actions.push(...i.actions), t.ordered.push(...i.ordered), t.textChunks.length === 0 && t.actions.length === 0) {
      const s = a.indexOf("["), e = a.slice(s + 1).trim();
      e && (t.textChunks.push(e), t.ordered.push({ type: "text", index: 0 }));
    }
  }
  return r.isDone = !0, t;
}
async function* M(r, t, a, i) {
  var s;
  C.info(
    `[StatelessGenerate] Starting orchestration for agents: ${r.config.agentIds.join(", ")}`
  ), C.info(
    `[StatelessGenerate] Message count: ${r.messages.length}, turnCount: ${((s = r.directorState) == null ? void 0 : s.turnCount) ?? 0}`
  );
  try {
    const e = L(), g = A(r, a, i), f = await e.stream(g, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      streamMode: "custom",
      signal: t
    });
    let d = 0, n = 0, o = !1, h = null, x = null, u = "", y = 0;
    const m = [];
    for await (const P of f) {
      const c = P;
      c.type === "agent_start" && (n++, h = c.data.agentId, x = c.data.agentName, u = "", y = 0, m.length = 0), c.type === "text_delta" && u.length < 100 && (u = (u + c.data.content).slice(0, 100), o = !0), c.type === "action" && (d++, y++, o = !0, c.data.actionName.startsWith("wb_") && m.push({
        actionName: c.data.actionName,
        agentId: c.data.agentId,
        agentName: x || c.data.agentId,
        params: c.data.params
      })), yield c;
    }
    const l = r.directorState, S = (l == null ? void 0 : l.agentResponses) ?? [], b = (l == null ? void 0 : l.whiteboardLedger) ?? [], I = (l == null ? void 0 : l.turnCount) ?? 0, k = n > 0 ? {
      turnCount: I + 1,
      agentResponses: [
        ...S,
        {
          agentId: h,
          agentName: x || h,
          contentPreview: u,
          actionCount: y,
          whiteboardActions: [...m]
        }
      ],
      whiteboardLedger: [...b, ...m]
    } : {
      turnCount: I,
      agentResponses: S,
      whiteboardLedger: b
    };
    yield {
      type: "done",
      data: { totalActions: d, totalAgents: n, agentHadContent: o, directorState: k }
    }, C.info(
      `[StatelessGenerate] Completed. Agents: ${n}, Actions: ${d}, hadContent: ${o}, turnCount: ${k.turnCount}`
    );
  } catch (e) {
    e instanceof Error && e.name === "AbortError" ? yield { type: "error", data: { message: "Request interrupted" } } : (C.error("[StatelessGenerate] Error:", e), yield {
      type: "error",
      data: {
        message: e instanceof Error ? e.message : String(e)
      }
    });
  }
}
export {
  v as createParserState,
  E as finalizeParser,
  $ as parseStructuredChunk,
  M as statelessGenerate
};
//# sourceMappingURL=stateless-generate.js.map
