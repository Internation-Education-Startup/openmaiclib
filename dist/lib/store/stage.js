import { create as f } from "zustand";
import { createSelectors as h } from "../utils/create-selectors.js";
import { createLogger as m } from "../logger.js";
const c = m("StageStore"), p = "__pending__";
function I(t, r) {
  let e = null;
  return (...n) => {
    e && clearTimeout(e), e = setTimeout(() => {
      t(...n), e = null;
    }, r);
  };
}
const O = f()((t, r) => ({
  // Initial state
  stage: null,
  scenes: [],
  currentSceneId: null,
  chats: [],
  mode: "playback",
  toolbarState: "ai",
  generatingOutlines: [],
  outlines: [],
  generationEpoch: 0,
  generationStatus: "idle",
  currentGeneratingOrder: -1,
  failedOutlines: [],
  // Actions
  setStage: (e) => {
    t((n) => ({
      stage: e,
      scenes: [],
      currentSceneId: null,
      chats: [],
      generationEpoch: n.generationEpoch + 1
    })), s();
  },
  setScenes: (e) => {
    t({ scenes: e }), !r().currentSceneId && e.length > 0 && t({ currentSceneId: e[0].id }), s();
  },
  addScene: (e) => {
    const n = r().stage;
    if (!n || e.stageId !== n.id) {
      c.warn(
        `Ignoring scene "${e.title}" - stageId mismatch (scene: ${e.stageId}, current: ${n == null ? void 0 : n.id})`
      );
      return;
    }
    const a = [...r().scenes, e], o = r().generatingOutlines.filter((d) => d.order !== e.order), i = r().currentSceneId === p;
    t({
      scenes: a,
      generatingOutlines: o,
      ...i ? { currentSceneId: e.id } : {}
    }), s();
  },
  updateScene: (e, n) => {
    const a = r().scenes.map(
      (o) => o.id === e ? { ...o, ...n } : o
    );
    t({ scenes: a }), s();
  },
  deleteScene: (e) => {
    var o;
    const n = r().scenes.filter((i) => i.id !== e);
    if (r().currentSceneId === e) {
      const i = r().getSceneIndex(e), d = i < n.length ? i : n.length - 1;
      t({
        scenes: n,
        currentSceneId: ((o = n[d]) == null ? void 0 : o.id) || null
      });
    } else
      t({ scenes: n });
    s();
  },
  setCurrentSceneId: (e) => {
    t({ currentSceneId: e }), s();
  },
  setChats: (e) => {
    t({ chats: e }), s();
  },
  setMode: (e) => t({ mode: e }),
  setToolbarState: (e) => t({ toolbarState: e }),
  setGeneratingOutlines: (e) => t({ generatingOutlines: e }),
  setOutlines: (e) => {
    var a;
    t({ outlines: e });
    const n = (a = r().stage) == null ? void 0 : a.id;
    n && import("../utils/database.js").then(({ db: o }) => {
      o.stageOutlines.put({
        stageId: n,
        outlines: e,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    });
  },
  setGenerationStatus: (e) => t({ generationStatus: e }),
  setCurrentGeneratingOrder: (e) => t({ currentGeneratingOrder: e }),
  bumpGenerationEpoch: () => t((e) => ({ generationEpoch: e.generationEpoch + 1 })),
  addFailedOutline: (e) => {
    r().failedOutlines.some((a) => a.id === e.id) || t({ failedOutlines: [...r().failedOutlines, e] });
  },
  clearFailedOutlines: () => t({ failedOutlines: [] }),
  retryFailedOutline: (e) => {
    t({
      failedOutlines: r().failedOutlines.filter((n) => n.id !== e)
    });
  },
  // Getters
  getCurrentScene: () => {
    const { scenes: e, currentSceneId: n } = r();
    return n && e.find((a) => a.id === n) || null;
  },
  getSceneById: (e) => r().scenes.find((n) => n.id === e) || null,
  getSceneIndex: (e) => r().scenes.findIndex((n) => n.id === e),
  // Storage methods
  saveToStorage: async () => {
    const { stage: e, scenes: n, currentSceneId: a, chats: o } = r();
    if (!(e != null && e.id)) {
      c.warn("Cannot save: stage.id is required");
      return;
    }
    try {
      const { saveStageData: i } = await import("../utils/stage-storage.js");
      await i(e.id, {
        stage: e,
        scenes: n,
        currentSceneId: a,
        chats: o
      });
    } catch (i) {
      c.error("Failed to save to storage:", i);
    }
  },
  loadFromStorage: async (e) => {
    var n;
    try {
      const a = r();
      if (((n = a.stage) == null ? void 0 : n.id) === e && a.scenes.length > 0) {
        c.info("Stage already loaded in memory, skipping IndexedDB load:", e);
        return;
      }
      const { loadStageData: o } = await import("../utils/stage-storage.js"), i = await o(e), { db: d } = await import("../utils/database.js"), l = await d.stageOutlines.get(e), u = (l == null ? void 0 : l.outlines) || [];
      i ? (t({
        stage: i.stage,
        scenes: i.scenes,
        currentSceneId: i.currentSceneId,
        chats: i.chats,
        outlines: u,
        // Compute generatingOutlines from persisted outlines minus completed scenes
        generatingOutlines: u.filter((S) => !i.scenes.some((g) => g.order === S.order))
      }), c.info("Loaded from storage:", e)) : c.warn("No data found for stage:", e);
    } catch (a) {
      throw c.error("Failed to load from storage:", a), a;
    }
  },
  clearStore: () => {
    t((e) => ({
      stage: null,
      scenes: [],
      currentSceneId: null,
      chats: [],
      outlines: [],
      generationEpoch: e.generationEpoch + 1,
      generationStatus: "idle",
      currentGeneratingOrder: -1,
      failedOutlines: [],
      generatingOutlines: []
    })), c.info("Store cleared");
  }
})), w = h(O), s = I(() => {
  w.getState().saveToStorage();
}, 500);
export {
  p as PENDING_SCENE_ID,
  w as useStageStore
};
//# sourceMappingURL=stage.js.map
