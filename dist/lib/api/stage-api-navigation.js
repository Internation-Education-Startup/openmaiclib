import { getScene as n, validateSceneId as u } from "./stage-api-defaults.js";
function o(t) {
  return {
    /**
     * Navigate to a specific scene
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    goTo(e) {
      try {
        const r = t.getState();
        return u(r.scenes, e) ? (t.setState({ currentSceneId: e }), { success: !0, data: !0 }) : { success: !1, error: `Scene not found: ${e}` };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Next scene
     *
     * @returns Whether successful
     */
    next() {
      try {
        const e = t.getState();
        if (!e.currentSceneId || e.scenes.length === 0)
          return { success: !1, error: "No current scene" };
        const r = e.scenes.findIndex((s) => s.id === e.currentSceneId);
        if (r === -1 || r === e.scenes.length - 1)
          return { success: !1, error: "Already at last scene" };
        const c = e.scenes[r + 1];
        return t.setState({ currentSceneId: c.id }), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Previous scene
     *
     * @returns Whether successful
     */
    previous() {
      try {
        const e = t.getState();
        if (!e.currentSceneId || e.scenes.length === 0)
          return { success: !1, error: "No current scene" };
        const r = e.scenes.findIndex((s) => s.id === e.currentSceneId);
        if (r === -1 || r === 0)
          return { success: !1, error: "Already at first scene" };
        const c = e.scenes[r - 1];
        return t.setState({ currentSceneId: c.id }), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Get the current scene
     *
     * @returns Current scene
     */
    current() {
      try {
        const e = t.getState();
        if (!e.currentSceneId)
          return { success: !1, error: "No current scene" };
        const r = n(e.scenes, e.currentSceneId);
        return r ? { success: !0, data: r } : { success: !1, error: "Current scene not found" };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    }
  };
}
export {
  o as createNavigationAPI
};
//# sourceMappingURL=stage-api-navigation.js.map
