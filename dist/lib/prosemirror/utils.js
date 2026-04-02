import { selectAll as S } from "prosemirror-commands";
const O = (t, e) => t.type === e.nodes.bullet_list || t.type === e.nodes.ordered_list, I = (t) => {
  const { empty: e } = t.state.selection;
  e && S(t.state, t.dispatch);
}, j = (t, e, s) => {
  if (s)
    t.dispatch(t.state.tr.addMark(s.from, s.to, e));
  else {
    const { $from: o, $to: n } = t.state.selection;
    t.dispatch(t.state.tr.addMark(o.pos, n.pos, e));
  }
}, E = (t, e, s, o) => {
  let n = e;
  const i = (r) => r.type === o;
  let l = null, a = null, f = null;
  for (; n <= s; ) {
    const r = t.nodeAt(n);
    if (!r || !r.marks) return null;
    const c = r.marks.find(i);
    if (!c || l && c !== l) return null;
    a = a || r, l = l || c, f = r, n++;
  }
  let m = e, p = s, k = 0;
  for (n = e - 1; n > k; ) {
    const r = t.nodeAt(n), c = r && r.marks.find(i);
    if (!c || c !== l) break;
    m = n, a = r, n--;
  }
  for (n = s + 1, k = t.nodeSize - 2; n < k; ) {
    const r = t.nodeAt(n), c = r && r.marks.find(i);
    if (!c || c !== l) break;
    p = n, f = r, n++;
  }
  return {
    mark: l,
    from: {
      node: a,
      pos: m
    },
    to: {
      node: f,
      pos: p
    }
  };
}, P = (t, e) => Array.isArray(t) && t.indexOf(e.type) > -1 || e.type === t, q = (t, e) => {
  for (let s = t.depth; s > 0; s--) {
    const o = t.node(s);
    if (e(o))
      return {
        pos: s > 0 ? t.before(s) : 0,
        start: t.start(s),
        depth: s,
        node: o
      };
  }
}, C = (t) => (e) => q(e.$from, t), T = (t) => (e) => C((s) => P(t, s))(e), b = (t, e) => {
  const s = e.schema.nodes[t];
  return !!T(s)(e.selection);
}, h = (t) => t ? t.type.name === "text" ? t : t.lastChild ? h(t.lastChild) : null : null, A = (t) => {
  const { selection: e, doc: s } = t.state, { from: o } = e;
  let n = s.nodeAt(o) || s.nodeAt(o - 1);
  return n = h(n), (n == null ? void 0 : n.marks) || [];
}, d = (t, e, s) => {
  for (const o of t)
    if (o.type.name === e && o.attrs[s]) return o.attrs[s];
  return null;
}, u = (t, e) => {
  for (const s of t)
    if (s.type.name === e) return !0;
  return !1;
}, F = (t, e) => {
  const { from: s, $from: o, to: n, empty: i } = t.selection;
  return i ? e.isInSet(t.storedMarks || o.marks()) : t.doc.rangeHasMark(s, n, e);
}, _ = (t, e) => {
  const { selection: s, doc: o } = t.state, { from: n, to: i } = s;
  let l = !0, a = "";
  return o.nodesBetween(n, i, (f) => (l && f.attrs[e] && (l = !1, a = f.attrs[e]), l)), a;
}, g = {
  color: "#000000",
  backcolor: "",
  fontsize: "16px",
  fontname: "",
  align: "left"
}, H = (t, e = {}) => {
  const s = { ...g, ...e }, o = A(t), n = u(o, "strong"), i = u(o, "em"), l = u(o, "underline"), a = u(o, "strikethrough"), f = u(o, "superscript"), m = u(o, "subscript"), p = u(o, "code"), k = d(o, "forecolor", "color") || s.color, r = d(o, "backcolor", "backcolor") || s.backcolor, c = d(o, "fontsize", "fontsize") || s.fontsize, y = d(o, "fontname", "fontname") || s.fontname, z = d(o, "link", "href") || "", M = _(t, "align") || s.align, N = b("bullet_list", t.state), x = b("ordered_list", t.state), L = b("blockquote", t.state);
  return {
    bold: n,
    em: i,
    underline: l,
    strikethrough: a,
    superscript: f,
    subscript: m,
    code: p,
    color: k,
    backcolor: r,
    fontsize: c,
    fontname: y,
    link: z,
    align: M,
    bulletList: N,
    orderedList: x,
    blockquote: L
  };
}, R = (t) => {
  const e = A(t), s = d(e, "fontsize", "fontsize") || g.fontsize;
  return parseInt(s);
}, U = {
  bold: !1,
  em: !1,
  underline: !1,
  strikethrough: !1,
  superscript: !1,
  subscript: !1,
  code: !1,
  color: "#000000",
  backcolor: "",
  fontsize: "16px",
  fontname: "",
  link: "",
  align: "left",
  bulletList: !1,
  orderedList: !1,
  blockquote: !1
};
export {
  j as addMark,
  I as autoSelectAll,
  U as defaultRichTextAttrs,
  E as findNodesWithSameMark,
  C as findParentNode,
  T as findParentNodeOfType,
  d as getAttrValue,
  _ as getAttrValueInSelection,
  R as getFontsize,
  h as getLastTextNode,
  A as getMarkAttrs,
  H as getTextAttrs,
  u as isActiveMark,
  b as isActiveOfParentNodeType,
  O as isList,
  F as markActive
};
//# sourceMappingURL=utils.js.map
