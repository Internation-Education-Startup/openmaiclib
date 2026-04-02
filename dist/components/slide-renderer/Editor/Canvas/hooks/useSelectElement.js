import { useCallback as M } from "react";
import { uniq as S } from "lodash";
import { useCanvasStore as r } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import { useKeyboardStore as X } from "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
function C(a, p) {
  const n = r.use.activeElementIdList(), f = r.use.activeGroupElementId(), g = r.use.handleElementId(), l = r.use.editorAreaFocus(), c = r.use.setActiveElementIdList(), u = r.use.setHandleElementId(), E = r.use.setActiveGroupElementId(), v = r.use.setEditorAreaFocus(), d = X((e) => e.ctrlOrShiftKeyActive());
  return {
    selectElement: M(
      (e, t, h = !0) => {
        if (l || v(!0), n.includes(t.id)) {
          if (d) {
            let s = [];
            if (t.groupId) {
              const o = [];
              a.current.forEach((i) => {
                i.groupId === t.groupId && o.push(i.id);
              }), s = n.filter((i) => !o.includes(i));
            } else
              s = n.filter((o) => o !== t.id);
            s.length > 0 && c(s);
          } else if (g !== t.id)
            u(t.id);
          else if (f !== t.id) {
            const s = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.pageX : "changedTouches" in e ? e.changedTouches[0].pageX : 0, o = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.pageY : "changedTouches" in e ? e.changedTouches[0].pageY : 0, i = e.target, m = (I) => {
              const A = I.pageX, L = I.pageY;
              s === A && o === L && (E(t.id), i.onmouseup = null);
            };
            i.onmouseup = m;
          }
        } else {
          let s = [];
          if (d ? s = [...n, t.id] : s = [t.id], t.groupId) {
            const o = [];
            a.current.forEach((i) => {
              i.groupId === t.groupId && o.push(i.id);
            }), s = [...s, ...o];
          }
          c(S(s)), u(t.id);
        }
        h && p(e, t);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally excludes elementListRef (stable ref) to avoid infinite re-creation
      [
        l,
        n,
        d,
        g,
        f,
        v,
        c,
        u,
        E,
        p
      ]
    )
  };
}
export {
  C as useSelectElement
};
//# sourceMappingURL=useSelectElement.js.map
