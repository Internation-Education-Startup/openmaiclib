function a(t) {
  return {
    /**
     * Set mode
     *
     * @param newMode - New mode
     */
    set(e) {
      try {
        return t.setState({ mode: e }), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Get current mode
     *
     * @returns Current mode
     */
    get() {
      try {
        return { success: !0, data: t.getState().mode };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    }
  };
}
function c(t) {
  return {
    /**
     * Get Stage info
     *
     * @returns Stage object
     */
    get() {
      try {
        const e = t.getState();
        return e.stage ? { success: !0, data: e.stage } : { success: !1, error: "No stage" };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Update Stage info
     *
     * @param updates - Fields to update
     * @returns Whether successful
     */
    update(e) {
      try {
        const r = t.getState();
        if (!r.stage)
          return { success: !1, error: "No stage" };
        const s = {
          ...r.stage,
          ...e,
          updatedAt: Date.now()
        };
        return t.setState({ stage: s }), { success: !0, data: !0 };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    }
  };
}
export {
  a as createModeAPI,
  c as createStageMetaAPI
};
//# sourceMappingURL=stage-api-mode.js.map
