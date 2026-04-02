import { isList as u } from "../utils.js";
const A = (o, e) => {
  const { state: r } = o, { schema: d, selection: n } = r, t = r.tr.setSelection(n), { doc: c } = t;
  if (!c) return t;
  const { from: i, to: f } = n;
  c.nodesBetween(i, f, (a, s) => {
    if (u(a, d) && i - 3 <= s && f + 3 >= s + a.nodeSize) {
      const m = Array.isArray(e) ? e : [e];
      for (const l of m)
        t.setNodeAttribute(s, l.key, l.value);
    }
    return !1;
  }), o.dispatch(t);
};
export {
  A as setListStyle
};
//# sourceMappingURL=setListStyle.js.map
