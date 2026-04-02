import { db as s } from "./database.js";
async function i(a, l) {
  if (!l || l.length === 0) {
    await s.chatSessions.where("stageId").equals(a).delete();
    return;
  }
  const t = l.map((e) => ({
    id: e.id,
    stageId: a,
    type: e.type,
    title: e.title,
    // Mark active sessions as interrupted (streaming context lost on refresh)
    status: e.status === "active" ? "interrupted" : e.status,
    // Truncate messages and strip non-serializable data
    messages: e.messages.slice(-200),
    config: e.config,
    toolCalls: e.toolCalls,
    pendingToolCalls: [],
    // Clear runtime state
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
    sceneId: e.sceneId,
    lastActionIndex: e.lastActionIndex
  }));
  await s.transaction("rw", s.chatSessions, async () => {
    await s.chatSessions.where("stageId").equals(a).delete(), await s.chatSessions.bulkPut(t);
  });
}
async function d(a) {
  return (await s.chatSessions.where("stageId").equals(a).sortBy("createdAt")).map((t) => ({
    id: t.id,
    type: t.type,
    title: t.title,
    status: t.status,
    messages: t.messages,
    config: t.config,
    toolCalls: t.toolCalls,
    pendingToolCalls: t.pendingToolCalls,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    sceneId: t.sceneId,
    lastActionIndex: t.lastActionIndex
  }));
}
async function c(a) {
  await s.chatSessions.where("stageId").equals(a).delete();
}
export {
  c as deleteChatSessions,
  d as loadChatSessions,
  i as saveChatSessions
};
//# sourceMappingURL=chat-storage.js.map
