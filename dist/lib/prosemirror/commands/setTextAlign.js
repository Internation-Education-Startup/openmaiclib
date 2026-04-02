const y = (t, r, s) => {
  const { selection: n, doc: c } = t;
  if (!n || !c) return t;
  const { from: i, to: h } = n, { nodes: p } = r, f = p.blockquote, g = p.list_item, k = p.paragraph, u = [];
  s = s || "";
  const m = /* @__PURE__ */ new Set([f, g, k]);
  return c.nodesBetween(i, h, (e, a) => {
    const l = e.type;
    return (e.attrs.align || "") !== s && m.has(l) && u.push({
      node: e,
      pos: a,
      nodeType: l
    }), !0;
  }), u.length && u.forEach((e) => {
    const { node: a, pos: l, nodeType: d } = e;
    let { attrs: o } = a;
    s ? o = { ...o, align: s } : o = { ...o, align: null }, t = t.setNodeMarkup(l, d, o, a.marks);
  }), t;
}, T = (t, r) => {
  const { state: s } = t, { schema: n, selection: c } = s, i = y(s.tr.setSelection(c), n, r);
  t.dispatch(i);
};
export {
  T as alignmentCommand,
  y as setTextAlign
};
//# sourceMappingURL=setTextAlign.js.map
