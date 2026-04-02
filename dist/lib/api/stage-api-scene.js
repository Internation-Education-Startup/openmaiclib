import { getScene as l, validateSceneId as u, generateId as f, createDefaultContent as a } from "./stage-api-defaults.js";
function w(n) {
  return {
    /**
     * Create a new scene
     *
     * @param params - Scene parameters
     * @returns Scene ID
     *
     * @example
     * const sceneId = api.scene.create({
     *   type: 'slide',
     *   title: 'Introduction',
     *   // speech is now in actions
     * });
     */
    create(e) {
      try {
        const t = n.getState();
        if (!t.stage)
          return {
            success: !1,
            error: "No stage set - cannot create scene without a stage"
          };
        const r = f("scene"), c = e.order ?? t.scenes.length;
        let s;
        e.content ? s = {
          ...a(e.type),
          ...e.content
        } : s = a(e.type);
        const o = {
          id: r,
          stageId: t.stage.id,
          type: e.type,
          title: e.title,
          order: c,
          content: s,
          actions: e.actions,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }, d = [...t.scenes, o].sort((S, i) => S.order - i.order);
        return n.setState({ scenes: d }), { success: !0, data: r };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Delete a scene
     *
     * @param sceneId - Scene ID
     * @returns Whether successful
     */
    delete(e) {
      try {
        const t = n.getState();
        if (!u(t.scenes, e))
          return { success: !1, error: `Scene not found: ${e}` };
        const r = t.scenes.filter((s) => s.id !== e);
        let c = t.currentSceneId;
        return t.currentSceneId === e && (c = r.length > 0 ? r[0].id : null), n.setState({
          scenes: r,
          currentSceneId: c
        }), { success: !0, data: !0 };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Update a scene
     *
     * @param sceneId - Scene ID
     * @param updates - Fields to update
     * @returns Whether successful
     */
    update(e, t) {
      try {
        const r = n.getState();
        if (!u(r.scenes, e))
          return { success: !1, error: `Scene not found: ${e}` };
        const c = r.scenes.map(
          (s) => s.id === e ? { ...s, ...t, updatedAt: Date.now() } : s
        );
        return n.setState({ scenes: c }), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Get all scenes
     *
     * @returns Scene list
     */
    list() {
      try {
        return { success: !0, data: [...n.getState().scenes] };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Get a specific scene
     *
     * @param sceneId - Scene ID
     * @returns Scene object
     */
    get(e) {
      try {
        const t = n.getState(), r = l(t.scenes, e);
        return r ? { success: !0, data: r } : { success: !1, error: `Scene not found: ${e}` };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    }
  };
}
export {
  w as createSceneAPI
};
//# sourceMappingURL=stage-api-scene.js.map
