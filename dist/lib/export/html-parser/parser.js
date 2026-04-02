import { voidTags as w, closingTagAncestorBreakers as T, closingTags as b } from "./tags.js";
const I = (s) => {
  const e = { tagName: null, children: [] };
  return p({ tokens: s, cursor: 0, stack: [e] }), e.children;
}, N = (s, e) => {
  const o = T[s];
  if (o) {
    let t = e.length - 1;
    for (; t >= 0; ) {
      const r = e[t].tagName;
      if (r === s) break;
      if (r && o.includes(r)) return !0;
      t--;
    }
  }
  return !1;
}, k = (s, e) => {
  s.splice(e);
}, p = (s) => {
  const { stack: e, tokens: o } = s;
  let { cursor: t } = s, r = e[e.length - 1].children;
  const c = o.length;
  for (; t < c; ) {
    const l = o[t];
    if (l.type !== "tag-start") {
      r.push(l), t++;
      continue;
    }
    const u = o[++t];
    t++;
    const i = u.content.toLowerCase();
    if (l.close) {
      let n = e.length, a = !1;
      for (; --n > -1; )
        if (e[n].tagName === i) {
          a = !0;
          break;
        }
      for (; t < c && o[t].type === "tag-end"; )
        t++;
      if (a) {
        k(e, n);
        break;
      } else continue;
    }
    let h = b.includes(i);
    if (h && (h = !N(i, e)), h) {
      let n = e.length - 1;
      for (; n > 0; ) {
        if (i === e[n].tagName) {
          k(e, n);
          const a = n - 1;
          r = e[a].children;
          break;
        }
        n = n - 1;
      }
    }
    const d = [];
    let g;
    for (; t < c; ) {
      const n = o[t];
      if (n.type === "tag-end") {
        g = n;
        break;
      }
      d.push(n.content), t++;
    }
    if (!g) break;
    t++;
    const f = [], m = {
      type: "element",
      tagName: u.content,
      attributes: d,
      children: f
    };
    if (r.push(m), !(g.close || w.includes(i))) {
      e.push({ tagName: i, children: f });
      const n = { tokens: o, cursor: t, stack: e };
      p(n), t = n.cursor;
    }
  }
  s.cursor = t;
};
export {
  N as hasTerminalParent,
  p as parse,
  I as parser,
  k as rewindStack
};
//# sourceMappingURL=parser.js.map
