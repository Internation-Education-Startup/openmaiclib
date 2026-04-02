import { TextSelection as l, AllSelection as m } from "prosemirror-state";
import { isList as p } from "../utils.js";
function h(t, r, o, s) {
  if (!t.doc) return t;
  const e = t.doc.nodeAt(r);
  if (!e) return t;
  const n = 0, a = 8;
  let c = (e.attrs[s] || 0) + o;
  if (c < n && (c = n), c > a && (c = a), c === e.attrs[s]) return t;
  const i = {
    ...e.attrs,
    [s]: c
  };
  return t.setNodeMarkup(r, e.type, i, e.marks);
}
const f = (t, r, o, s) => {
  const { selection: e, doc: n } = t;
  if (!e || !n || !(e instanceof l || e instanceof m)) return t;
  const { from: a, to: c } = e;
  return n.nodesBetween(a, c, (i, u) => {
    const d = i.type;
    return d.name === "paragraph" || d.name === "blockquote" ? (t = h(t, u, o, s), !1) : !p(i, r);
  }), t;
}, k = (t, r) => {
  const { state: o } = t, { schema: s, selection: e } = o, n = f(o.tr.setSelection(e), s, r, "indent");
  return n.docChanged ? (t.dispatch(n), !0) : !1;
}, C = (t, r) => {
  const { state: o } = t, { schema: s, selection: e } = o, n = f(o.tr.setSelection(e), s, r, "textIndent");
  return n.docChanged ? (t.dispatch(n), !0) : !1;
};
export {
  k as indentCommand,
  C as textIndentCommand
};
//# sourceMappingURL=setTextIndent.js.map
