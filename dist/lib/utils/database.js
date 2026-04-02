import o from "dexie";
import { createLogger as c } from "../logger.js";
const d = c("Database");
function p(t, a) {
  return `${t}:${a}`;
}
const g = "MAIC-Database";
class l extends o {
  constructor() {
    super(g), this.version(1).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id"
      // Previously had: messages, participants, discussions, sceneSnapshots
    }), this.version(2).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      // Delete removed tables
      messages: null,
      participants: null,
      discussions: null,
      sceneSnapshots: null
    }), this.version(3).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId"
    }), this.version(4).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId",
      stageOutlines: "stageId"
    }), this.version(5).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId",
      stageOutlines: "stageId",
      mediaFiles: "id, stageId, [stageId+type]"
    }), this.version(6).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId",
      stageOutlines: "stageId",
      mediaFiles: "id, stageId, [stageId+type]"
    }).upgrade(async (a) => {
      const s = a.table("mediaFiles"), n = await s.toArray();
      for (const i of n) {
        const r = `${i.stageId}:${i.id}`;
        i.id.includes(":") || (await s.delete(i.id), await s.put({ ...i, id: r }));
      }
    }), this.version(7).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId",
      stageOutlines: "stageId",
      mediaFiles: "id, stageId, [stageId+type]"
    }), this.version(8).stores({
      stages: "id, updatedAt",
      scenes: "id, stageId, order, [stageId+order]",
      audioFiles: "id, createdAt",
      imageFiles: "id, createdAt",
      snapshots: "++id",
      chatSessions: "id, stageId, [stageId+createdAt]",
      playbackState: "stageId",
      stageOutlines: "stageId",
      mediaFiles: "id, stageId, [stageId+type]",
      generatedAgents: "id, stageId"
    });
  }
}
const e = new l();
async function A() {
  var t, a;
  try {
    await e.open(), (a = (t = navigator.storage) == null ? void 0 : t.persist) == null || a.call(t), d.info("Database initialized successfully");
  } catch (s) {
    throw d.error("Failed to initialize database:", s), s;
  }
}
async function y() {
  await e.delete(), d.info("Database cleared");
}
async function h() {
  return {
    stages: await e.stages.toArray(),
    scenes: await e.scenes.toArray(),
    chatSessions: await e.chatSessions.toArray(),
    playbackState: await e.playbackState.toArray()
  };
}
async function w(t) {
  await e.transaction(
    "rw",
    [e.stages, e.scenes, e.chatSessions, e.playbackState],
    async () => {
      t.stages && await e.stages.bulkPut(t.stages), t.scenes && await e.scenes.bulkPut(t.scenes), t.chatSessions && await e.chatSessions.bulkPut(t.chatSessions), t.playbackState && await e.playbackState.bulkPut(t.playbackState);
    }
  ), d.info("Database imported successfully");
}
async function S(t) {
  return e.scenes.where("stageId").equals(t).sortBy("order");
}
async function b(t) {
  await e.transaction(
    "rw",
    [
      e.stages,
      e.scenes,
      e.chatSessions,
      e.playbackState,
      e.stageOutlines,
      e.mediaFiles,
      e.generatedAgents
    ],
    async () => {
      await e.stages.delete(t), await e.scenes.where("stageId").equals(t).delete(), await e.chatSessions.where("stageId").equals(t).delete(), await e.playbackState.delete(t), await e.stageOutlines.delete(t), await e.mediaFiles.where("stageId").equals(t).delete(), await e.generatedAgents.where("stageId").equals(t).delete();
    }
  );
}
async function F(t) {
  return e.generatedAgents.where("stageId").equals(t).toArray();
}
async function m() {
  return {
    stages: await e.stages.count(),
    scenes: await e.scenes.count(),
    audioFiles: await e.audioFiles.count(),
    imageFiles: await e.imageFiles.count(),
    snapshots: await e.snapshots.count(),
    chatSessions: await e.chatSessions.count(),
    playbackState: await e.playbackState.count(),
    stageOutlines: await e.stageOutlines.count(),
    mediaFiles: await e.mediaFiles.count(),
    generatedAgents: await e.generatedAgents.count()
  };
}
export {
  y as clearDatabase,
  e as db,
  b as deleteStageWithRelatedData,
  h as exportDatabase,
  m as getDatabaseStats,
  F as getGeneratedAgentsByStageId,
  S as getScenesByStageId,
  w as importDatabase,
  A as initDatabase,
  p as mediaFileKey
};
//# sourceMappingURL=database.js.map
