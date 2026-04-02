import { createLogger as b } from "../../lib/logger.js";
const y = b("SSEStream");
async function x(p, v, a, r) {
  var c;
  const s = (c = p.body) == null ? void 0 : c.getReader();
  if (!s)
    throw new Error("No response body");
  const m = new TextDecoder();
  let n = "", o = null;
  try {
    for (; ; ) {
      const { done: h, value: I } = await s.read();
      if (h) break;
      const k = m.decode(I, { stream: !0 });
      n += k;
      const i = n.split(`

`);
      n = i.pop() || "";
      for (const l of i) {
        const g = l.trim();
        if (!g.startsWith("data: ")) continue;
        let d = null;
        try {
          const e = JSON.parse(g.slice(6));
          switch (e.type) {
            case "agent_start": {
              const { messageId: t, agentId: u, agentName: S, agentAvatar: w, agentColor: E } = e.data;
              o = t, a.pushAgentStart({
                messageId: t,
                agentId: u,
                agentName: S,
                avatar: w,
                color: E
              });
              break;
            }
            case "agent_end": {
              a.pushAgentEnd({
                messageId: e.data.messageId,
                agentId: e.data.agentId
              });
              break;
            }
            case "text_delta": {
              const t = e.data.messageId ?? o;
              if (!t) break;
              a.pushText(t, e.data.content);
              break;
            }
            case "action": {
              const t = e.data.messageId ?? o;
              if (!t || r != null && r.aborted) break;
              a.pushAction({
                messageId: t,
                actionId: e.data.actionId,
                actionName: e.data.actionName,
                params: e.data.params,
                agentId: e.data.agentId
              });
              break;
            }
            case "thinking": {
              a.pushThinking(e.data);
              break;
            }
            case "cue_user": {
              a.pushCueUser(e.data);
              break;
            }
            case "done": {
              a.pushDone(e.data);
              break;
            }
            case "error": {
              d = new Error(e.data.message), a.pushError(e.data.message);
              break;
            }
          }
        } catch (e) {
          y.warn("[SSE] Parse error:", e);
        }
        if (d) throw d;
      }
    }
  } finally {
    s.releaseLock();
  }
}
export {
  x as processSSEStream
};
//# sourceMappingURL=process-sse-stream.js.map
