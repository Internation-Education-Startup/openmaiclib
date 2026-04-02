import { liftListItem as k, wrapInList as I } from "prosemirror-schema-list";
import { findParentNode as N, isList as a } from "../utils.js";
const h = (r, L, o, i = {}) => (t, e) => {
  const { schema: d, selection: c } = t, { $from: g, $to: p } = c, s = g.blockRange(p);
  if (!s) return !1;
  const n = N((f) => a(f, d))(c);
  if (s.depth >= 1 && n && s.depth - n.depth <= 1) {
    if (n.node.type === r && !o)
      return k(L)(t, e);
    if (a(n.node, d) && r.validContent(n.node.content)) {
      const { tr: f } = t, u = {
        ...n.node.attrs,
        ...i
      };
      return o && (u.listStyleType = o), f.setNodeMarkup(n.pos, r, u), e && e(f), !1;
    }
  }
  const m = {
    ...i
  };
  return o && (m.listStyleType = o), I(r, m)(t, e);
};
export {
  h as toggleList
};
//# sourceMappingURL=toggleList.js.map
