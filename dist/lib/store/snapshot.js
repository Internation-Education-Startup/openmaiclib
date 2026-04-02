import { create as u } from "zustand";
import { db as h } from "../utils/database.js";
import { useStageStore as d } from "./stage.js";
const y = u((c, p) => ({
  // Initial state
  snapshotCursor: -1,
  snapshotLength: 0,
  // Computed properties
  canUndo: () => p().snapshotCursor > 0,
  canRedo: () => p().snapshotCursor < p().snapshotLength - 1,
  // Actions
  setSnapshotCursor: (s) => c({ snapshotCursor: s }),
  setSnapshotLength: (s) => c({ snapshotLength: s }),
  /**
   * Initialize snapshot database with current state
   */
  initSnapshotDatabase: async () => {
    const s = d.getState(), e = {
      index: s.getSceneIndex(s.currentSceneId || ""),
      slides: JSON.parse(JSON.stringify(s.scenes))
    };
    await h.snapshots.add(e), c({
      snapshotCursor: 0,
      snapshotLength: 1
    });
  },
  /**
   * Add a new snapshot to the history
   * Handles snapshot length limit and cursor position
   */
  addSnapshot: async () => {
    const s = d.getState(), { snapshotCursor: e } = p(), t = await h.snapshots.orderBy("id").keys();
    let r = [];
    e >= 0 && e < t.length - 1 && (r = t.slice(e + 1));
    const i = {
      index: s.getSceneIndex(s.currentSceneId || ""),
      slides: JSON.parse(JSON.stringify(s.scenes))
    };
    await h.snapshots.add(i);
    let n = t.length - r.length + 1;
    if (n > 20 && (r.push(t[0]), n--), n >= 2) {
      const o = s.getSceneIndex(s.currentSceneId || "");
      await h.snapshots.update(t[n - 2], {
        index: o
      });
    }
    await h.snapshots.bulkDelete(r), c({
      snapshotCursor: n - 1,
      snapshotLength: n
    });
  },
  /**
   * Undo: restore previous snapshot
   */
  undo: async () => {
    const { snapshotCursor: s } = p();
    if (s <= 0) return;
    const e = d.getState(), t = s - 1, i = (await h.snapshots.orderBy("id").toArray())[t], { index: n, slides: a } = i, o = n > a.length - 1 ? a.length - 1 : n;
    e.setScenes(a), a[o] && e.setCurrentSceneId(a[o].id), c({ snapshotCursor: t });
  },
  /**
   * Redo: restore next snapshot
   */
  redo: async () => {
    const { snapshotCursor: s, snapshotLength: e } = p();
    if (s >= e - 1) return;
    const t = d.getState(), r = s + 1, n = (await h.snapshots.orderBy("id").toArray())[r], { index: a, slides: o } = n, S = a > o.length - 1 ? o.length - 1 : a;
    t.setScenes(o), o[S] && t.setCurrentSceneId(o[S].id), c({ snapshotCursor: r });
  }
}));
export {
  y as useSnapshotStore
};
//# sourceMappingURL=snapshot.js.map
