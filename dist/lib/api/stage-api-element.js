import { getScene as l, generateId as d } from "./stage-api-defaults.js";
function m(i) {
  return {
    /**
     * Add an element to a Slide
     *
     * @param sceneId - Scene ID
     * @param element - Element parameters (must include type, left, top, width, height)
     * @returns Element ID
     */
    add(e, c) {
      try {
        const t = i.getState(), n = l(t.scenes, e);
        if (!n)
          return { success: !1, error: `Scene not found: ${e}` };
        if (n.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const s = n.content, a = d(c.type), o = {
          ...c,
          id: a,
          rotate: c.rotate ?? 0
        }, u = t.scenes.map((r) => r.id === e ? {
          ...r,
          content: {
            ...s,
            canvas: {
              ...s.canvas,
              elements: [...s.canvas.elements, o]
            }
          },
          updatedAt: Date.now()
        } : r);
        return i.setState({ scenes: u }), { success: !0, data: a };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Add elements in batch
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elements - Element array
     * @returns Element ID array
     */
    addBatch(e, c) {
      try {
        const t = i.getState(), n = l(t.scenes, e);
        if (!n)
          return { success: !1, error: `Scene not found: ${e}` };
        if (n.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const s = n.content, a = [], o = c.map((r) => {
          const f = d(r.type);
          return a.push(f), {
            ...r,
            id: f,
            rotate: r.rotate ?? 0
          };
        }), u = t.scenes.map((r) => r.id === e ? {
          ...r,
          content: {
            ...s,
            canvas: {
              ...s.canvas,
              elements: [...s.canvas.elements, ...o]
            }
          },
          updatedAt: Date.now()
        } : r);
        return i.setState({ scenes: u }), { success: !0, data: a };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Delete an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @returns Whether successful
     */
    delete(e, c) {
      try {
        const t = i.getState(), n = l(t.scenes, e);
        if (!n)
          return { success: !1, error: `Scene not found: ${e}` };
        if (n.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const s = n.content, a = t.scenes.map((o) => o.id === e ? {
          ...o,
          content: {
            ...s,
            canvas: {
              ...s.canvas,
              elements: s.canvas.elements.filter((u) => u.id !== c)
            }
          },
          updatedAt: Date.now()
        } : o);
        return i.setState({ scenes: a }), { success: !0, data: !0 };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Delete elements in batch
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elementIds - Element ID array
     * @returns Whether successful
     */
    deleteBatch(e, c) {
      try {
        const t = i.getState(), n = l(t.scenes, e);
        if (!n)
          return { success: !1, error: `Scene not found: ${e}` };
        if (n.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const s = n.content, a = new Set(c), o = t.scenes.map((u) => u.id === e ? {
          ...u,
          content: {
            ...s,
            canvas: {
              ...s.canvas,
              elements: s.canvas.elements.filter((r) => !a.has(r.id))
            }
          },
          updatedAt: Date.now()
        } : u);
        return i.setState({ scenes: o }), { success: !0, data: !0 };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Update an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param updates - Properties to update
     * @returns Whether successful
     */
    update(e, c, t) {
      try {
        const n = i.getState(), s = l(n.scenes, e);
        if (!s)
          return { success: !1, error: `Scene not found: ${e}` };
        if (s.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const a = s.content, o = n.scenes.map((u) => u.id === e ? {
          ...u,
          content: {
            ...a,
            canvas: {
              ...a.canvas,
              elements: a.canvas.elements.map(
                (r) => r.id === c ? { ...r, ...t } : r
              )
            }
          },
          updatedAt: Date.now()
        } : u);
        return i.setState({ scenes: o }), { success: !0, data: !0 };
      } catch (n) {
        return { success: !1, error: String(n) };
      }
    },
    /**
     * Get an element
     *
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @returns Element object
     */
    get(e, c) {
      try {
        const t = i.getState(), n = l(t.scenes, e);
        if (!n)
          return { success: !1, error: `Scene not found: ${e}` };
        if (n.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const a = n.content.canvas.elements.find((o) => o.id === c);
        return a ? { success: !0, data: a } : { success: !1, error: `Element not found: ${c}` };
      } catch (t) {
        return { success: !1, error: String(t) };
      }
    },
    /**
     * Get all elements of a scene
     *
     * @param sceneId - Scene ID
     * @returns Element list
     */
    list(e) {
      try {
        const c = i.getState(), t = l(c.scenes, e);
        return t ? t.type !== "slide" ? { success: !1, error: `Scene is not a slide: ${e}` } : { success: !0, data: [...t.content.canvas.elements] } : { success: !1, error: `Scene not found: ${e}` };
      } catch (c) {
        return { success: !1, error: String(c) };
      }
    },
    /**
     * Move an element (relative movement)
     *
     * @deprecated will be removed in the future
     * @param sceneId - Scene ID
     * @param elementId - Element ID
     * @param deltaX - X-axis movement distance
     * @param deltaY - Y-axis movement distance
     * @returns Whether successful
     */
    move(e, c, t, n) {
      try {
        const s = i.getState(), a = l(s.scenes, e);
        if (!a)
          return { success: !1, error: `Scene not found: ${e}` };
        if (a.type !== "slide")
          return { success: !1, error: `Scene is not a slide: ${e}` };
        const o = a.content, u = s.scenes.map((r) => r.id === e ? {
          ...r,
          content: {
            ...o,
            canvas: {
              ...o.canvas,
              elements: o.canvas.elements.map((f) => f.id === c ? {
                ...f,
                left: f.left + t,
                top: f.top + n
              } : f)
            }
          },
          updatedAt: Date.now()
        } : r);
        return i.setState({ scenes: u }), { success: !0, data: !0 };
      } catch (s) {
        return { success: !1, error: String(s) };
      }
    }
  };
}
export {
  m as createElementAPI
};
//# sourceMappingURL=stage-api-element.js.map
