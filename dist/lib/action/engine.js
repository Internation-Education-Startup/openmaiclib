import { createStageAPI as b } from "../api/stage-api.js";
import { useCanvasStore as d } from "../store/canvas.js";
import { useWhiteboardHistoryStore as g } from "../store/whiteboard-history.js";
import { useMediaGenerationStore as o, isMediaPlaceholder as m } from "../store/media-generation.js";
import p from "katex";
import { createLogger as y } from "../logger.js";
const x = y("ActionEngine"), f = {
  rectangle: "M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z",
  circle: "M 500 0 A 500 500 0 1 1 499 0 Z",
  triangle: "M 500 0 L 1000 1000 L 0 1000 Z"
};
function n(u) {
  return new Promise((e) => setTimeout(e, u));
}
const I = 5e3;
class E {
  constructor(e, t) {
    this.effectTimer = null, this.stageStore = e, this.stageAPI = b(e), this.audioPlayer = t ?? null;
  }
  /** Clean up timers when the engine is no longer needed */
  dispose() {
    this.effectTimer && (clearTimeout(this.effectTimer), this.effectTimer = null);
  }
  /**
   * Execute a single action.
   * Fire-and-forget actions return immediately.
   * Synchronous actions return a Promise that resolves when the action is complete.
   */
  async execute(e) {
    switch (e.type.startsWith("wb_") && e.type !== "wb_open" && e.type !== "wb_close" && await this.ensureWhiteboardOpen(), e.type) {
      // Fire-and-forget
      case "spotlight":
        this.executeSpotlight(e);
        return;
      case "laser":
        this.executeLaser(e);
        return;
      // Synchronous — Video
      case "play_video":
        return this.executePlayVideo(e);
      // Synchronous
      case "speech":
        return this.executeSpeech(e);
      case "wb_open":
        return this.executeWbOpen();
      case "wb_draw_text":
        return this.executeWbDrawText(e);
      case "wb_draw_shape":
        return this.executeWbDrawShape(e);
      case "wb_draw_chart":
        return this.executeWbDrawChart(e);
      case "wb_draw_latex":
        return this.executeWbDrawLatex(e);
      case "wb_draw_table":
        return this.executeWbDrawTable(e);
      case "wb_draw_line":
        return this.executeWbDrawLine(e);
      case "wb_clear":
        return this.executeWbClear();
      case "wb_delete":
        return this.executeWbDelete(e);
      case "wb_close":
        return this.executeWbClose();
      case "discussion":
        return;
    }
  }
  /** Clear all active visual effects */
  clearEffects() {
    this.effectTimer && (clearTimeout(this.effectTimer), this.effectTimer = null), d.getState().clearAllEffects();
  }
  /** Schedule auto-clear for fire-and-forget effects */
  scheduleEffectClear() {
    this.effectTimer && clearTimeout(this.effectTimer), this.effectTimer = setTimeout(() => {
      d.getState().clearAllEffects(), this.effectTimer = null;
    }, I);
  }
  // ==================== Fire-and-forget ====================
  executeSpotlight(e) {
    d.getState().setSpotlight(e.elementId, {
      dimness: e.dimOpacity ?? 0.5
    }), this.scheduleEffectClear();
  }
  executeLaser(e) {
    d.getState().setLaser(e.elementId, {
      color: e.color ?? "#ff0000"
    }), this.scheduleEffectClear();
  }
  // ==================== Synchronous — Speech ====================
  async executeSpeech(e) {
    if (this.audioPlayer)
      return new Promise((t) => {
        this.audioPlayer.onEnded(() => t()), this.audioPlayer.play(e.audioId || "", e.audioUrl).then((a) => {
          a || t();
        }).catch(() => t());
      });
  }
  // ==================== Synchronous — Video ====================
  async executePlayVideo(e) {
    var a;
    const t = this.resolveMediaPlaceholderId(e.elementId);
    if (t) {
      const s = o.getState().getTask(t);
      if (s && s.status !== "done" && (await new Promise((i) => {
        const l = o.subscribe((c) => {
          const h = c.tasks[t];
          (!h || h.status === "done" || h.status === "failed") && (l(), i());
        }), r = o.getState().tasks[t];
        (!r || r.status === "done" || r.status === "failed") && (l(), i());
      }), ((a = o.getState().tasks[t]) == null ? void 0 : a.status) === "failed"))
        return;
    }
    return d.getState().playVideo(e.elementId), new Promise((s) => {
      const i = d.subscribe((l) => {
        l.playingVideoElementId !== e.elementId && (i(), s());
      });
      d.getState().playingVideoElementId !== e.elementId && (i(), s());
    });
  }
  // ==================== Helpers — Media Resolution ====================
  /**
   * Look up a video/image element's src in the current stage's scenes.
   * Returns the src if it's a media placeholder ID (gen_vid_*, gen_img_*), null otherwise.
   */
  resolveMediaPlaceholderId(e) {
    var i, l;
    const { scenes: t, currentSceneId: a } = this.stageStore.getState(), s = a ? [
      t.find((r) => r.id === a),
      ...t.filter((r) => r.id !== a)
    ] : t;
    for (const r of s) {
      if (!r || r.type !== "slide") continue;
      const c = (l = (i = r.content) == null ? void 0 : i.canvas) == null ? void 0 : l.elements;
      if (!Array.isArray(c)) continue;
      const h = c.find((w) => w.id === e);
      if (h && "src" in h && typeof h.src == "string" && m(h.src))
        return h.src;
    }
    return null;
  }
  // ==================== Synchronous — Whiteboard ====================
  /** Auto-open the whiteboard if it's not already open */
  async ensureWhiteboardOpen() {
    d.getState().whiteboardOpen || await this.executeWbOpen();
  }
  async executeWbOpen() {
    this.stageAPI.whiteboard.get(), d.getState().setWhiteboardOpen(!0), await n(2e3);
  }
  async executeWbDrawText(e) {
    const t = this.stageAPI.whiteboard.get();
    if (!t.success || !t.data) return;
    const a = e.fontSize ?? 18;
    let s = e.content ?? "";
    s && (s.startsWith("<") || (s = `<p style="font-size: ${a}px;">${s}</p>`), this.stageAPI.whiteboard.addElement(
      {
        id: e.elementId || "",
        type: "text",
        content: s,
        left: e.x,
        top: e.y,
        width: e.width ?? 400,
        height: e.height ?? 100,
        rotate: 0,
        defaultFontName: "Microsoft YaHei",
        defaultColor: e.color ?? "#333333"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      t.data.id
    ), await n(800));
  }
  async executeWbDrawShape(e) {
    const t = this.stageAPI.whiteboard.get();
    !t.success || !t.data || (this.stageAPI.whiteboard.addElement(
      {
        id: e.elementId || "",
        type: "shape",
        viewBox: [1e3, 1e3],
        path: f[e.shape] ?? f.rectangle,
        left: e.x,
        top: e.y,
        width: e.width,
        height: e.height,
        rotate: 0,
        fill: e.fillColor ?? "#5b9bd5",
        fixedRatio: !1
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      t.data.id
    ), await n(800));
  }
  async executeWbDrawChart(e) {
    const t = this.stageAPI.whiteboard.get();
    !t.success || !t.data || (this.stageAPI.whiteboard.addElement(
      {
        id: e.elementId || "",
        type: "chart",
        left: e.x,
        top: e.y,
        width: e.width,
        height: e.height,
        rotate: 0,
        chartType: e.chartType,
        data: e.data,
        themeColors: e.themeColors ?? ["#5b9bd5", "#ed7d31", "#a5a5a5", "#ffc000", "#4472c4"]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      t.data.id
    ), await n(800));
  }
  async executeWbDrawLatex(e) {
    const t = this.stageAPI.whiteboard.get();
    if (!(!t.success || !t.data)) {
      try {
        const a = p.renderToString(e.latex, {
          throwOnError: !1,
          displayMode: !0,
          output: "html"
        });
        this.stageAPI.whiteboard.addElement(
          {
            id: e.elementId || "",
            type: "latex",
            left: e.x,
            top: e.y,
            width: e.width ?? 400,
            height: e.height ?? 80,
            rotate: 0,
            latex: e.latex,
            html: a,
            color: e.color ?? "#000000",
            fixedRatio: !0
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          },
          t.data.id
        );
      } catch (a) {
        x.warn(`Failed to render latex "${e.latex}":`, a);
        return;
      }
      await n(800);
    }
  }
  async executeWbDrawTable(e) {
    const t = this.stageAPI.whiteboard.get();
    if (!t.success || !t.data) return;
    const a = e.data.length, s = a > 0 ? e.data[0].length : 0;
    if (a === 0 || s === 0) return;
    const i = Array(s).fill(1 / s);
    let l = 0;
    const r = e.data.map(
      (c) => c.map((h) => ({
        id: `cell_${l++}`,
        colspan: 1,
        rowspan: 1,
        text: h
      }))
    );
    this.stageAPI.whiteboard.addElement(
      {
        id: e.elementId || "",
        type: "table",
        left: e.x,
        top: e.y,
        width: e.width,
        height: e.height,
        rotate: 0,
        colWidths: i,
        cellMinHeight: 36,
        data: r,
        outline: e.outline ?? {
          width: 2,
          style: "solid",
          color: "#eeece1"
        },
        theme: e.theme ? {
          color: e.theme.color,
          rowHeader: !0,
          rowFooter: !1,
          colHeader: !1,
          colFooter: !1
        } : void 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      t.data.id
    ), await n(800);
  }
  async executeWbDrawLine(e) {
    const t = this.stageAPI.whiteboard.get();
    if (!t.success || !t.data) return;
    const a = Math.min(e.startX, e.endX), s = Math.min(e.startY, e.endY), i = [e.startX - a, e.startY - s], l = [e.endX - a, e.endY - s];
    this.stageAPI.whiteboard.addElement(
      {
        id: e.elementId || "",
        type: "line",
        left: a,
        top: s,
        width: e.width ?? 2,
        start: i,
        end: l,
        style: e.style ?? "solid",
        color: e.color ?? "#333333",
        points: e.points ?? ["", ""]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      t.data.id
    ), await n(800);
  }
  async executeWbDelete(e) {
    const t = this.stageAPI.whiteboard.get();
    !t.success || !t.data || (this.stageAPI.whiteboard.deleteElement(e.elementId, t.data.id), await n(300));
  }
  async executeWbClear() {
    var s;
    const e = this.stageAPI.whiteboard.get();
    if (!e.success || !e.data) return;
    const t = ((s = e.data.elements) == null ? void 0 : s.length) || 0;
    if (t === 0) return;
    g.getState().pushSnapshot(e.data.elements), d.getState().setWhiteboardClearing(!0);
    const a = Math.min(380 + t * 55, 1400);
    await n(a), this.stageAPI.whiteboard.update({ elements: [] }, e.data.id), d.getState().setWhiteboardClearing(!1);
  }
  async executeWbClose() {
    d.getState().setWhiteboardOpen(!1), await n(700);
  }
}
export {
  E as ActionEngine
};
//# sourceMappingURL=engine.js.map
