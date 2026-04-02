import { useSceneData as ie, useSceneSelector as re } from "../contexts/scene-context.js";
import { useCanvasStore as o } from "../store/canvas.js";
import { useMemo as y, useCallback as c } from "react";
import { useHistorySnapshot as ce } from "./use-history-snapshot.js";
import { toast as O } from "sonner";
import { ElementOrderCommands as v, ElementAlignCommands as S } from "../types/edit.js";
import { getElementListRange as me } from "../utils/element.js";
import { useOrderElement as ae } from "./use-order-element.js";
import { nanoid as fe } from "nanoid";
function Le() {
  const { updateSceneData: a } = ie(), l = re((e) => e.canvas), E = o.use.activeElementIdList(), g = y(
    () => l.elements.filter((e) => E.includes(e.id)),
    [l.elements, E]
  ), w = o.use.activeGroupElementId(), d = o.use.setActiveElementIdList(), L = o.use.handleElementId(), A = o.use.hiddenElementIdList(), N = o.use.viewportSize(), k = o.use.viewportRatio();
  o.use.setEditorAreaFocus();
  const { addHistorySnapshot: h } = ce(), { moveUpElement: T, moveDownElement: b, moveTopElement: J, moveBottomElement: H } = ae(), C = c(
    (e, t = !0) => {
      const n = Array.isArray(e) ? e : [e];
      if (a((s) => {
        s.canvas.elements.push(...n);
      }), t) {
        const s = n.map((p) => p.id);
        d(s);
      }
    },
    [a, d]
  ), G = (e) => {
    let t = [];
    if (e)
      t = l.elements.filter((n) => n.id !== e), d(E.filter((n) => n !== e));
    else {
      if (!E.length) return;
      w ? t = l.elements.filter((n) => n.id !== w) : t = l.elements.filter((n) => !E.includes(n.id)), d([]);
    }
    u({ elements: t }), h();
  }, R = () => {
    l.elements.length && (d([]), u({ elements: [] }), h());
  }, X = c(
    (e) => {
      const { id: t, props: n } = e, s = Array.isArray(t) ? t : [t];
      a((p) => {
        p.canvas.elements.forEach((f) => {
          s.includes(f.id) && Object.assign(f, n);
        });
      });
    },
    [a]
  ), u = c(
    (e) => {
      a((t) => {
        Object.assign(t.canvas, e);
      });
    },
    [a]
  ), Y = c(
    (e) => {
      const { id: t, propName: n } = e, s = Array.isArray(t) ? t : [t], p = Array.isArray(n) ? n : [n];
      a((f) => {
        f.canvas.elements.forEach((r) => {
          s.includes(r.id) && p.forEach((I) => {
            delete r[I];
          });
        });
      });
    },
    [a]
  ), x = () => {
    O.warning("Not implemented");
  }, Z = () => {
    O.warning("Not implemented");
  }, B = () => {
    O.warning("Not implemented");
  }, D = () => {
    const e = JSON.parse(JSON.stringify(l.elements));
    for (const t of e)
      E.includes(t.id) && (t.lock = !0);
    u({ elements: e }), d([]), h();
  }, M = (e) => {
    const t = JSON.parse(JSON.stringify(l.elements));
    if (e.groupId) {
      const n = [];
      for (const s of t)
        s.groupId === e.groupId && (s.lock = !1, n.push(s.id));
      u({ elements: t }), d(n);
    } else {
      for (const n of t)
        if (n.id === e.id) {
          n.lock = !1;
          break;
        }
      u({ elements: t }), d([e.id]);
    }
    h();
  }, P = () => {
    const t = l.elements.filter(
      (n) => !n.lock && !A.includes(n.id)
    ).map((n) => n.id);
    d(t);
  }, z = (e) => {
    L === e || A.includes(e) || l.elements.filter((n) => n.lock).some((n) => n.id === e) || d([e]);
  }, j = (e) => {
    const t = N, n = N * k, { minX: s, maxX: p, minY: f, maxY: r } = me(g), I = JSON.parse(JSON.stringify(l.elements));
    for (const i of I)
      if (E.includes(i.id)) {
        if (e === S.CENTER) {
          const m = f + (r - f) / 2 - n / 2, le = s + (p - s) / 2 - t / 2;
          i.top = i.top - m, i.left = i.left - le;
        }
        if (e === S.TOP) {
          const m = f - 0;
          i.top = i.top - m;
        } else if (e === S.VERTICAL) {
          const m = f + (r - f) / 2 - n / 2;
          i.top = i.top - m;
        } else if (e === S.BOTTOM) {
          const m = r - n;
          i.top = i.top - m;
        } else if (e === S.LEFT) {
          const m = s - 0;
          i.left = i.left - m;
        } else if (e === S.HORIZONTAL) {
          const m = s + (p - s) / 2 - t / 2;
          i.left = i.left - m;
        } else if (e === S.RIGHT) {
          const m = p - t;
          i.left = i.left - m;
        }
      }
    u({ elements: I }), h();
  }, F = (e, t) => {
    let n;
    t === v.UP ? n = T(l.elements, e) : t === v.DOWN ? n = b(l.elements, e) : t === v.TOP ? n = J(l.elements, e) : t === v.BOTTOM && (n = H(l.elements, e)), n && (u({ elements: n }), h());
  };
  y(() => {
    if (g.length < 2) return !1;
    const e = g[0].groupId;
    return e ? !g.every(
      (n) => (n.groupId && n.groupId) === e
    ) : !0;
  }, [g]);
  const U = () => {
    if (!g.length) return;
    let e = JSON.parse(JSON.stringify(l.elements));
    const t = fe(10), n = [];
    for (const r of e)
      E.includes(r.id) && (r.groupId = t, n.push(r));
    const s = e.findIndex(
      (r) => r.id === n[n.length - 1].id
    ), p = n.map((r) => r.id);
    e = e.filter(
      (r) => !p.includes(r.id)
    );
    const f = s - n.length + 1;
    e.splice(f, 0, ...n), u({ elements: e }), h();
  }, W = () => {
    if (!g.length || !g.some((s) => s.groupId)) return;
    const t = JSON.parse(JSON.stringify(l.elements));
    for (const s of t)
      E.includes(s.id) && s.groupId && delete s.groupId;
    u({ elements: t }), d(L ? [L] : []), h();
  }, V = c(
    (e) => {
      a((t) => {
        t.canvas.background = e;
      });
    },
    [a]
  ), q = c(
    (e) => {
      a((t) => {
        t.canvas.theme = {
          ...t.canvas.theme,
          ...e
        };
      });
    },
    [a]
  ), K = c((e, t) => {
    o.getState().setSpotlight(e, t);
  }, []), Q = c(() => {
    o.getState().clearSpotlight();
  }, []), _ = c(
    (e, t) => {
      o.getState().setHighlight(e, t);
    },
    []
  ), $ = c(() => {
    o.getState().clearHighlight();
  }, []), ee = c(
    (e, t) => {
      o.getState().setLaser(e, t);
    },
    []
  ), te = c(() => {
    o.getState().clearLaser();
  }, []), ne = c((e, t) => {
    o.getState().setZoom(e, t);
  }, []), se = c(() => {
    o.getState().clearZoom();
  }, []), oe = c(() => {
    o.getState().clearSpotlight(), o.getState().clearHighlight(), o.getState().clearLaser(), o.getState().clearZoom();
  }, []);
  return {
    // Basic operations
    addElement: C,
    deleteElement: G,
    deleteAllElements: R,
    updateElement: X,
    updateSlide: u,
    removeElementProps: Y,
    copyElement: x,
    pasteElement: B,
    cutElement: Z,
    // Advanced operations
    lockElement: D,
    unlockElement: M,
    selectAllElements: P,
    selectElement: z,
    alignElementToCanvas: j,
    orderElement: F,
    combineElements: U,
    uncombineElements: W,
    // Canvas operations
    updateBackground: V,
    updateTheme: q,
    // Teaching features
    spotlightElement: K,
    clearSpotlight: Q,
    highlightElements: _,
    clearHighlight: $,
    laserElement: ee,
    clearLaser: te,
    zoomElement: ne,
    clearZoom: se,
    clearAllEffects: oe
  };
}
export {
  Le as useCanvasOperations
};
//# sourceMappingURL=use-canvas-operations.js.map
