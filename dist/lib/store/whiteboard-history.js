import { create as e } from "zustand";
import { elementFingerprint as h } from "../utils/element-fingerprint.js";
const S = e((r, p) => ({
  snapshots: [],
  maxSnapshots: 20,
  pushSnapshot: (s) => {
    if (!s || s.length === 0) return;
    const { snapshots: t } = p(), a = h(s);
    if (t.some((n) => n.fingerprint === a))
      return;
    const i = {
      elements: JSON.parse(JSON.stringify(s)),
      // Deep copy
      timestamp: Date.now(),
      fingerprint: a
    };
    r((n) => {
      const o = [...n.snapshots, i];
      return o.length > n.maxSnapshots ? { snapshots: o.slice(-n.maxSnapshots) } : { snapshots: o };
    });
  },
  getSnapshot: (s) => {
    const { snapshots: t } = p();
    return t[s] ?? null;
  },
  clearHistory: () => r({ snapshots: [] })
}));
export {
  S as useWhiteboardHistoryStore
};
//# sourceMappingURL=whiteboard-history.js.map
