import { useCallback as r } from "react";
import { useSnapshotStore as n } from "../store/snapshot.js";
function u() {
  const t = n((o) => o.addSnapshot), a = n((o) => o.undo), s = n((o) => o.redo), d = n((o) => o.canUndo), c = n((o) => o.canRedo);
  return {
    addHistorySnapshot: r(async () => {
      await t();
    }, [t]),
    undo: a,
    redo: s,
    canUndo: d(),
    canRedo: c()
  };
}
export {
  u as useHistorySnapshot
};
//# sourceMappingURL=use-history-snapshot.js.map
