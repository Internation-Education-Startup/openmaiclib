import { create as d } from "zustand";
import { db as l } from "../utils/database.js";
import { createLogger as u } from "../logger.js";
const f = u("MediaGenerationStore");
function U(a) {
  return /^gen_(img|vid)_[\w-]+$/i.test(a);
}
const j = d()((a, n) => ({
  tasks: {},
  enqueueTasks: (r, e) => {
    const s = {};
    for (const t of e)
      n().tasks[t.elementId] || (s[t.elementId] = {
        elementId: t.elementId,
        type: t.type,
        status: "pending",
        prompt: t.prompt,
        params: {
          aspectRatio: t.aspectRatio,
          style: t.style
        },
        retryCount: 0,
        stageId: r
      });
    Object.keys(s).length > 0 && a((t) => ({ tasks: { ...t.tasks, ...s } }));
  },
  markGenerating: (r) => a((e) => {
    const s = e.tasks[r];
    return s ? {
      tasks: { ...e.tasks, [r]: { ...s, status: "generating" } }
    } : e;
  }),
  markDone: (r, e, s) => a((t) => {
    const o = t.tasks[r];
    return o ? {
      tasks: {
        ...t.tasks,
        [r]: {
          ...o,
          status: "done",
          objectUrl: e,
          poster: s,
          error: void 0
        }
      }
    } : t;
  }),
  markFailed: (r, e, s) => a((t) => {
    const o = t.tasks[r];
    return o ? {
      tasks: {
        ...t.tasks,
        [r]: { ...o, status: "failed", error: e, errorCode: s }
      }
    } : t;
  }),
  markPendingForRetry: (r) => a((e) => {
    const s = e.tasks[r];
    return s ? {
      tasks: {
        ...e.tasks,
        [r]: {
          ...s,
          status: "pending",
          error: void 0,
          errorCode: void 0,
          retryCount: s.retryCount + 1
        }
      }
    } : e;
  }),
  getTask: (r) => n().tasks[r],
  isReady: (r) => {
    var e;
    return ((e = n().tasks[r]) == null ? void 0 : e.status) === "done";
  },
  restoreFromDB: async (r) => {
    try {
      const e = await l.mediaFiles.where("stageId").equals(r).toArray(), s = {};
      for (const t of e) {
        const o = t.id.includes(":") ? t.id.split(":").slice(1).join(":") : t.id, i = JSON.parse(t.params || "{}");
        if (t.error)
          s[o] = {
            elementId: o,
            type: t.type,
            status: "failed",
            prompt: t.prompt,
            params: i,
            error: t.error,
            errorCode: t.errorCode,
            retryCount: 0,
            stageId: r
          };
        else {
          const c = t.blob.type ? t.blob : new Blob([t.blob], { type: t.mimeType }), k = URL.createObjectURL(c), p = t.poster ? URL.createObjectURL(t.poster) : void 0;
          s[o] = {
            elementId: o,
            type: t.type,
            status: "done",
            prompt: t.prompt,
            params: i,
            objectUrl: k,
            poster: p,
            retryCount: 0,
            stageId: r
          };
        }
      }
      Object.keys(s).length > 0 && a((t) => ({ tasks: { ...t.tasks, ...s } }));
    } catch (e) {
      f.error("Failed to restore from DB:", e);
    }
  },
  clearStage: (r) => a((e) => {
    const s = {};
    for (const [t, o] of Object.entries(e.tasks))
      o.stageId !== r ? s[t] = o : o.objectUrl && (URL.revokeObjectURL(o.objectUrl), o.poster && URL.revokeObjectURL(o.poster));
    return { tasks: s };
  }),
  revokeObjectUrls: () => {
    const r = n().tasks;
    for (const e of Object.values(r))
      e.objectUrl && URL.revokeObjectURL(e.objectUrl), e.poster && URL.revokeObjectURL(e.poster);
  }
}));
export {
  U as isMediaPlaceholder,
  j as useMediaGenerationStore
};
//# sourceMappingURL=media-generation.js.map
