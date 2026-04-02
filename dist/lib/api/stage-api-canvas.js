import { useCanvasStore as n } from "../store/canvas.js";
import { getScene as i } from "./stage-api-defaults.js";
function S(o) {
  return {
    /**
     * Set background
     *
     * @param sceneId - Scene ID
     * @param background - Background settings
     * @returns Whether successful
     */
    setBackground(c, e) {
      try {
        const s = o.getState(), t = i(s.scenes, c);
        if (!t || t.type !== "slide")
          return { success: !1, error: "Invalid scene" };
        const r = t.content, u = s.scenes.map((a) => a.id === c ? {
          ...a,
          content: {
            ...r,
            canvas: {
              ...r.canvas,
              background: e
            }
          },
          updatedAt: Date.now()
        } : a);
        return o.setState({ scenes: u }), { success: !0, data: !0 };
      } catch (s) {
        return { success: !1, error: String(s) };
      }
    },
    /**
     * Set theme
     *
     * @param sceneId - Scene ID
     * @param theme - Theme settings
     * @returns Whether successful
     */
    setTheme(c, e) {
      try {
        const s = o.getState(), t = i(s.scenes, c);
        if (!t || t.type !== "slide")
          return { success: !1, error: "Invalid scene" };
        const r = t.content, u = s.scenes.map((a) => a.id === c ? {
          ...a,
          content: {
            ...r,
            canvas: {
              ...r.canvas,
              theme: {
                ...r.canvas.theme,
                ...e
              }
            }
          },
          updatedAt: Date.now()
        } : a);
        return o.setState({ scenes: u }), { success: !0, data: !0 };
      } catch (s) {
        return { success: !1, error: String(s) };
      }
    },
    /**
     * Highlight an element (teaching feature)
     *
     * Emphasize an element by adding a highlight border or shadow
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Highlight options
     * @returns Whether successful
     */
    highlight(c, e, s = {}) {
      const { duration: t, color: r = "#ff6b6b", style: u = "outline" } = s;
      try {
        const a = n.getState();
        return a.setHighlight([e], {
          color: r,
          opacity: u === "fill" ? 0.3 : 0.5,
          borderWidth: 3,
          animated: !0
        }), t && setTimeout(() => {
          a.clearHighlight();
        }, t), { success: !0, data: !0 };
      } catch (a) {
        return { success: !1, error: String(a) };
      }
    },
    /**
     * Spotlight effect (teaching feature)
     *
     * Highlight a specific element while dimming everything else
     * Note: this requires a mask layer in the frontend rendering layer
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param options - Spotlight options
     * @returns Whether successful
     */
    spotlight(c, e, s = {}) {
      try {
        const t = n.getState();
        return t.setSpotlight(e, s), s.duration && setTimeout(() => {
          t.clearSpotlight();
        }, s.duration), { success: !0, data: !0 };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Clear all highlight and spotlight effects
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearHighlights(c) {
      try {
        const e = n.getState();
        return e.clearHighlight(), e.clearSpotlight(), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Clear spotlight effect
     *
     * @returns Whether successful
     */
    clearSpotlight(c) {
      try {
        return n.getState().clearSpotlight(), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Set percentage-mode spotlight
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Spotlight options
     * @returns Whether successful
     */
    setSpotlightPercentage(c, e, s, t = {}) {
      try {
        const r = n.getState();
        return r.setSpotlightPercentage(e, s, t), t.duration && setTimeout(() => {
          r.clearSpotlight();
        }, t.duration), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Set laser pointer effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param options - Laser pointer options
     * @returns Whether successful
     */
    setLaser(c, e, s, t = {}) {
      try {
        const r = n.getState();
        return r.setLaser(e, t), t.duration && setTimeout(() => {
          r.clearLaser();
        }, t.duration), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Clear laser pointer effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearLaser(c) {
      try {
        return n.getState().clearLaser(), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Set zoom effect
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param geometry - Percentage geometry info
     * @param scale - Zoom scale
     * @returns Whether successful
     */
    setZoom(c, e, s, t) {
      try {
        return n.getState().setZoom(e, t), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Clear zoom effect
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearZoom(c) {
      try {
        return n.getState().clearZoom(), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Clear all visual effects (spotlight, laser, zoom, etc.)
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    clearAllEffects(c) {
      try {
        return n.getState().clearAllEffects(), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Highlight multiple elements in batch
     *
     * @param sceneId - Scene ID
     * @param elementIds - Element ID list
     * @param options - Highlight options
     * @returns Whether successful
     */
    highlightMultiple(c, e, s = {}) {
      const { duration: t, color: r = "#ff6b6b" } = s;
      try {
        const u = n.getState();
        return u.setHighlight(e, {
          color: r,
          opacity: 0.3,
          borderWidth: 3,
          animated: !0
        }), t && setTimeout(() => {
          u.clearHighlight();
        }, t), { success: !0, data: !0 };
      } catch (u) {
        return { success: !1, error: String(u) };
      }
    }
  };
}
export {
  S as createCanvasAPI
};
//# sourceMappingURL=stage-api-canvas.js.map
