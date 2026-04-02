import { jsx as a, jsxs as N } from "react/jsx-runtime";
import { Stage as M } from "../components/stage.js";
import { ThemeProvider as R } from "../lib/hooks/use-theme.js";
import "../lib/store/canvas.js";
import "../lib/store/snapshot.js";
import "../lib/store/keyboard.js";
import { useStageStore as l } from "../lib/store/stage.js";
import "../lib/store/settings.js";
import "../lib/contexts/scene-context.js";
import { loadImageMapping as F } from "../lib/utils/image-storage.js";
import { useState as A, useRef as O, useCallback as E, useEffect as j } from "react";
import { useParams as G } from "../shims/next-navigation.js";
import { useSceneGenerator as L } from "../lib/hooks/use-scene-generator.js";
import { useMediaGenerationStore as v } from "../lib/store/media-generation.js";
import { useWhiteboardHistoryStore as B } from "../lib/store/whiteboard-history.js";
import { createLogger as D } from "../lib/logger.js";
import { MediaStageProvider as H } from "../lib/contexts/media-stage-context.js";
import { generateMediaForOutlines as U } from "../lib/media/media-orchestrator.js";
const d = D("Classroom");
function ae() {
  const p = G(), r = p == null ? void 0 : p.id, { loadFromStorage: b } = l(), [S, h] = A(!0), [f, y] = A(null), u = O(!1), { generateRemaining: w, retrySingleOutline: k, stop: P } = L({
    onComplete: () => {
      d.info("[Classroom] All scenes generated");
    }
  }), x = E(async () => {
    var g;
    try {
      if (await b(r), !l.getState().stage) {
        d.info("No IndexedDB data, trying server-side storage for:", r);
        try {
          const s = await fetch(`/api/classroom?id=${encodeURIComponent(r)}`);
          if (s.ok) {
            const e = await s.json();
            if (e.success && e.classroom) {
              const { stage: n, scenes: i } = e.classroom;
              l.getState().setStage(n), l.setState({
                scenes: i,
                currentSceneId: ((g = i[0]) == null ? void 0 : g.id) ?? null
              }), d.info("Loaded from server-side storage:", r);
            }
          }
        } catch (s) {
          d.warn("Server-side storage fetch failed:", s);
        }
      }
      await v.getState().restoreFromDB(r);
      const { loadGeneratedAgentsForStage: o, useAgentRegistry: I } = await import("../lib/orchestration/registry/store.js"), t = await o(r), { useSettingsStore: c } = await import("../lib/store/settings.js");
      if (t.length > 0)
        c.getState().setAgentMode("auto"), c.getState().setSelectedAgentIds(t);
      else {
        const s = l.getState().stage, e = s == null ? void 0 : s.agentIds, n = I.getState(), i = e == null ? void 0 : e.filter((m) => {
          const C = n.getAgent(m);
          return C && !C.isGenerated;
        });
        c.getState().setAgentMode("preset"), c.getState().setSelectedAgentIds(
          i && i.length > 0 ? i : ["default-1", "default-2", "default-3"]
        );
      }
    } catch (o) {
      d.error("Failed to load classroom:", o), y(o instanceof Error ? o.message : "Failed to load classroom");
    } finally {
      h(!1);
    }
  }, [r, b]);
  return j(() => (h(!0), y(null), u.current = !1, v.getState().revokeObjectUrls(), v.setState({ tasks: {} }), B.getState().clearHistory(), x(), () => {
    P();
  }), [r, x, P]), j(() => {
    if (S || f || u.current) return;
    const g = l.getState(), { outlines: o, scenes: I, stage: t } = g, c = new Set(I.map((e) => e.order));
    if (o.some((e) => !c.has(e.order)) && t) {
      u.current = !0;
      const e = sessionStorage.getItem("generationParams"), n = e ? JSON.parse(e) : {}, i = (n.pdfImages || []).map((m) => m.storageId).filter(Boolean);
      F(i).then((m) => {
        w({
          pdfImages: n.pdfImages,
          imageMapping: m,
          stageInfo: {
            name: t.name || "",
            description: t.description,
            language: t.language,
            style: t.style
          },
          agents: n.agents,
          userProfile: n.userProfile
        });
      });
    } else o.length > 0 && t && (u.current = !0, U(o, t.id).catch((e) => {
      d.warn("[Classroom] Media generation resume error:", e);
    }));
  }, [S, f, w]), /* @__PURE__ */ a(R, { children: /* @__PURE__ */ a(H, { value: r, children: /* @__PURE__ */ a("div", { className: "h-screen flex flex-col overflow-hidden", children: S ? /* @__PURE__ */ a("div", { className: "flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ a("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ a("p", { children: "Loading classroom..." }) }) }) : f ? /* @__PURE__ */ a("div", { className: "flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ N("div", { className: "text-center", children: [
    /* @__PURE__ */ N("p", { className: "text-destructive mb-4", children: [
      "Error: ",
      f
    ] }),
    /* @__PURE__ */ a(
      "button",
      {
        onClick: () => {
          y(null), h(!0), x();
        },
        className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90",
        children: "Retry"
      }
    )
  ] }) }) : /* @__PURE__ */ a(M, { onRetryOutline: k }) }) }) });
}
export {
  ae as default
};
//# sourceMappingURL=classroom.js.map
