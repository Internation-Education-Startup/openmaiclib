import { db as r } from "./database.js";
import { deleteChatSessions as w, loadChatSessions as h, saveChatSessions as m } from "./chat-storage.js";
import { clearPlaybackState as f } from "./playback-storage.js";
import { createLogger as p } from "../logger.js";
const s = p("StageStorage");
async function F(t, a) {
  try {
    const e = Date.now();
    await r.stages.put({
      id: t,
      name: a.stage.name || "Untitled Stage",
      description: a.stage.description,
      createdAt: a.stage.createdAt || e,
      updatedAt: e,
      language: a.stage.language,
      style: a.stage.style,
      currentSceneId: a.currentSceneId || void 0,
      agentIds: a.stage.agentIds
    }), await r.scenes.where("stageId").equals(t).delete(), a.scenes && a.scenes.length > 0 && await r.scenes.bulkPut(
      a.scenes.map((n, o) => ({
        ...n,
        stageId: t,
        order: n.order ?? o,
        createdAt: n.createdAt || e,
        updatedAt: n.updatedAt || e
      }))
    ), a.chats && await m(t, a.chats), s.info(`Saved stage: ${t}`);
  } catch (e) {
    throw s.error("Failed to save stage:", e), e;
  }
}
async function $(t) {
  var a;
  try {
    const e = await r.stages.get(t);
    if (!e)
      return s.info(`Stage not found: ${t}`), null;
    const n = await r.scenes.where("stageId").equals(t).sortBy("order"), o = await h(t);
    return s.info(`Loaded stage: ${t}, scenes: ${n.length}, chats: ${o.length}`), {
      stage: e,
      scenes: n,
      currentSceneId: e.currentSceneId || ((a = n[0]) == null ? void 0 : a.id) || null,
      chats: o
    };
  } catch (e) {
    return s.error("Failed to load stage:", e), null;
  }
}
async function v(t) {
  try {
    await r.stages.delete(t), await r.scenes.where("stageId").equals(t).delete(), await w(t), await f(t), s.info(`Deleted stage: ${t}`);
  } catch (a) {
    throw s.error("Failed to delete stage:", a), a;
  }
}
async function q() {
  try {
    const t = await r.stages.orderBy("updatedAt").reverse().toArray();
    return await Promise.all(
      t.map(async (e) => {
        const n = await r.scenes.where("stageId").equals(e.id).count();
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          sceneCount: n,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt
        };
      })
    );
  } catch (t) {
    return s.error("Failed to list stages:", t), [];
  }
}
async function D(t) {
  const a = {};
  try {
    await Promise.all(
      t.map(async (e) => {
        const o = (await r.scenes.where("stageId").equals(e).sortBy("order")).find((l) => {
          var i;
          return ((i = l.content) == null ? void 0 : i.type) === "slide";
        });
        if (o && o.content.type === "slide") {
          const l = structuredClone(o.content.canvas), i = l.elements.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (d) => d.type === "image" && /^gen_(img|vid)_[\w-]+$/i.test(d.src)
          );
          if (i.length > 0) {
            const d = await r.mediaFiles.where("stageId").equals(e).toArray(), g = new Map(
              d.map((c) => [c.id.includes(":") ? c.id.split(":").slice(1).join(":") : c.id, c.blob])
            );
            for (const c of i) {
              const u = g.get(c.src);
              u ? c.src = URL.createObjectURL(u) : c.src = "";
            }
          }
          a[e] = l;
        }
      })
    );
  } catch (e) {
    s.error("Failed to load thumbnails:", e);
  }
  return a;
}
async function L(t, a) {
  try {
    await r.stages.update(t, { name: a, updatedAt: Date.now() }), s.info(`Renamed stage ${t} to "${a}"`);
  } catch (e) {
    throw s.error("Failed to rename stage:", e), e;
  }
}
async function C(t) {
  try {
    return !!await r.stages.get(t);
  } catch (a) {
    return s.error("Failed to check stage existence:", a), !1;
  }
}
export {
  v as deleteStageData,
  D as getFirstSlideByStages,
  q as listStages,
  $ as loadStageData,
  L as renameStage,
  F as saveStageData,
  C as stageExists
};
//# sourceMappingURL=stage-storage.js.map
