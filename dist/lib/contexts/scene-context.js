import { jsx as w } from "react/jsx-runtime";
import { createContext as j, useContext as b, useRef as a, useEffect as y, useSyncExternalStore as x, useCallback as l, useMemo as v } from "react";
import { useStageStore as h } from "../store/stage.js";
import { produce as E } from "immer";
const d = j(null);
function D({ children: t }) {
  const e = h((r) => r.currentSceneId && r.scenes.find((f) => f.id === r.currentSceneId) || null), u = h((r) => r.updateScene), s = (e == null ? void 0 : e.id) || "", c = (e == null ? void 0 : e.type) || "slide", n = (e == null ? void 0 : e.content) || null, o = a(/* @__PURE__ */ new Set()), i = l((r) => (o.current.add(r), () => {
    o.current.delete(r);
  }), []), p = l(() => n, [n]);
  y(() => {
    o.current.forEach((r) => r());
  }, [n]);
  const S = l(
    (r) => {
      if (!e) return;
      const f = E(e.content, r);
      u(e.id, {
        content: f
      });
    },
    [e, u]
  ), m = v(
    () => ({
      sceneId: s,
      sceneType: c,
      sceneData: n,
      updateSceneData: S,
      subscribe: i,
      getSnapshot: p
    }),
    [s, c, n, S, i, p]
  );
  return e ? /* @__PURE__ */ w(d.Provider, { value: m, children: t }) : null;
}
function R() {
  const t = b(d);
  if (!t)
    throw new Error("useSceneData must be used within SceneProvider");
  return t;
}
function I(t) {
  const e = b(d);
  if (!e)
    throw new Error("useSceneSelector must be used within SceneProvider");
  const { subscribe: u, getSnapshot: s } = e, c = a(t), n = a(void 0);
  return y(() => {
    c.current = t;
  }, [t]), x(
    u,
    () => {
      const o = s(), i = c.current(o);
      return n.current !== void 0 && O(n.current, i) ? n.current : (n.current = i, i);
    },
    () => {
      const o = s();
      return c.current(o);
    }
  );
}
function O(t, e) {
  if (Object.is(t, e))
    return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  const u = t, s = e, c = Object.keys(u), n = Object.keys(s);
  if (c.length !== n.length)
    return !1;
  for (const o of c)
    if (!Object.prototype.hasOwnProperty.call(s, o) || !Object.is(u[o], s[o]))
      return !1;
  return !0;
}
export {
  D as SceneProvider,
  R as useSceneData,
  I as useSceneSelector
};
//# sourceMappingURL=scene-context.js.map
