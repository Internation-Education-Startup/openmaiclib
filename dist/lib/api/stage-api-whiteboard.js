import { generateId as h } from "./stage-api-defaults.js";
function f(n) {
  const u = {
    /**
     * Create a whiteboard
     *
     * @returns Whether successful
     */
    create() {
      var r;
      try {
        const t = n.getState(), e = {
          id: h("whiteboard"),
          viewportSize: 1e3,
          viewportRatio: 16 / 9,
          elements: [],
          background: {
            type: "solid",
            color: "#ffffff"
          },
          animations: []
        }, s = (r = t.stage) != null && r.whiteboard ? [...t.stage.whiteboard, e] : [e];
        return n.setState({
          stage: { ...t.stage, whiteboard: s }
        }), { success: !0, data: e };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Get a whiteboard
     *
     * @returns The most recently created whiteboard object
     */
    get() {
      var r;
      try {
        const t = n.getState();
        return !((r = t.stage) != null && r.whiteboard) || t.stage.whiteboard.length === 0 ? u.create() : { success: !0, data: t.stage.whiteboard.at(-1) };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Update a whiteboard
     *
     * @param updates - Fields to update
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    update(r, t) {
      var e, s;
      try {
        const o = n.getState(), c = (s = (e = o.stage) == null ? void 0 : e.whiteboard) == null ? void 0 : s.find((d) => d.id === t);
        if (!c) return { success: !1, error: "Whiteboard not found" };
        const a = { ...c, ...r }, i = o.stage.whiteboard.map(
          (d) => d.id === t ? a : d
        );
        return n.setState({
          stage: { ...o.stage, whiteboard: i }
        }), { success: !0, data: !0 };
      } catch (o) {
        return { success: !1, error: String(o) };
      }
    },
    /**
     * Delete a whiteboard
     *
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    delete(r) {
      try {
        const t = n.getState(), e = t.stage.whiteboard.filter((s) => s.id !== r);
        return n.setState({
          stage: { ...t.stage, whiteboard: e }
        }), { success: !0, data: !0 };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Get all whiteboards
     *
     * @returns List of all whiteboards
     */
    list() {
      try {
        return { success: !0, data: n.getState().stage.whiteboard };
      } catch (r) {
        return { success: !1, error: String(r) };
      }
    },
    /**
     * Get a whiteboard element
     *
     * @param elementId - Element ID
     * @param whiteboardId - Whiteboard ID
     * @returns Element object
     */
    getElement(r, t) {
      try {
        const s = n.getState().stage.whiteboard.find((o) => o.id === t);
        return s ? {
          success: !0,
          data: s.elements.find((o) => o.id === r)
        } : { success: !1, error: "Whiteboard not found" };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Add a whiteboard element
     *
     * @param element - Element object
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    addElement(r, t) {
      try {
        const e = n.getState(), s = e.stage.whiteboard.find((i) => i.id === t);
        if (!s) return { success: !1, error: "Whiteboard not found" };
        const o = {
          ...r,
          id: r.id || h(r.type)
        }, c = {
          ...s,
          elements: [...s.elements, o]
        }, a = e.stage.whiteboard.map(
          (i) => i.id === t ? c : i
        );
        return n.setState({
          stage: { ...e.stage, whiteboard: a }
        }), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Delete a whiteboard element
     *
     * @param elementId - Element ID
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    deleteElement(r, t) {
      try {
        const e = n.getState(), s = e.stage.whiteboard.find((a) => a.id === t);
        if (!s) return { success: !1, error: "Whiteboard not found" };
        const o = {
          ...s,
          elements: s.elements.filter((a) => a.id !== r)
        }, c = e.stage.whiteboard.map(
          (a) => a.id === t ? o : a
        );
        return n.setState({
          stage: { ...e.stage, whiteboard: c }
        }), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Update a whiteboard element
     *
     * @param element - Element object
     * @param whiteboardId - Whiteboard ID
     * @returns Whether successful
     */
    updateElement(r, t) {
      try {
        const e = n.getState(), s = e.stage.whiteboard.find((a) => a.id === t);
        if (!s) return { success: !1, error: "Whiteboard not found" };
        const o = {
          ...s,
          elements: s.elements.map((a) => a.id === r.id ? r : a)
        }, c = e.stage.whiteboard.map(
          (a) => a.id === t ? o : a
        );
        return n.setState({
          stage: { ...e.stage, whiteboard: c }
        }), { success: !0, data: !0 };
      } catch (e) {
        return { success: !1, error: String(e) };
      }
    },
    /**
     * Get whiteboard element list
     *
     * @param whiteboardId - Whiteboard ID
     * @returns Element list
     */
    listElements(r) {
      try {
        const e = n.getState().stage.whiteboard.find((s) => s.id === r);
        return e ? { success: !0, data: e.elements } : { success: !1, error: "Whiteboard not found" };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    }
  };
  return u;
}
export {
  f as createWhiteboardAPI
};
//# sourceMappingURL=stage-api-whiteboard.js.map
