const h = (n, p) => {
  const { state: r } = n, { schema: o, doc: e } = r;
  let c = [], s = o.nodes.paragraph;
  if (e.content.size > 2) {
    const t = e.resolve(1);
    c = [...t.marks()], s = t.parent.type;
  }
  const i = p.split(`
`).map((t) => {
    if (t.trim() === "") return s.create();
    const l = o.text(t, c);
    return s.create(null, l);
  }), a = r.tr;
  a.replaceWith(0, e.content.size, i), n.dispatch(a);
};
export {
  h as replaceText
};
//# sourceMappingURL=replaceText.js.map
