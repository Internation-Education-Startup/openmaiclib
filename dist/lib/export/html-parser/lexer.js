import { childlessTags as w } from "./tags.js";
const d = (n, o) => {
  const s = o - n.position;
  g(n, s);
}, g = (n, o) => {
  n.position = n.position + o;
}, C = (n, o) => {
  for (; ; ) {
    const s = n.indexOf("<", o);
    if (s === -1)
      return s;
    const t = n.charAt(s + 1);
    if (t === "/" || t === "!" || /[A-Za-z0-9]/.test(t))
      return s;
    o = s + 1;
  }
  return -1;
}, x = (n) => {
  const { str: o } = n;
  let s = C(o, n.position);
  if (s === n.position) return;
  s === -1 && (s = o.length);
  const t = o.slice(n.position, s);
  d(n, s), n.tokens.push({
    type: "text",
    content: t
  });
}, T = (n) => {
  const { str: o } = n;
  g(n, 4);
  let s = o.indexOf("-->", n.position), t = s + 3;
  s === -1 && (s = t = o.length);
  const c = o.slice(n.position, s);
  d(n, t), n.tokens.push({
    type: "comment",
    content: c
  });
}, E = (n) => {
  const { str: o } = n, s = o.length;
  let t = n.position;
  for (; t < s; ) {
    const i = o.charAt(t);
    if (!(/\s/.test(i) || i === "/" || i === ">")) break;
    t++;
  }
  let c = t + 1;
  for (; c < s; ) {
    const i = o.charAt(c);
    if (!!(/\s/.test(i) || i === "/" || i === ">")) break;
    c++;
  }
  d(n, c);
  const r = o.slice(t, c);
  return n.tokens.push({
    type: "tag",
    content: r
  }), r;
}, W = (n) => {
  const { str: o, tokens: s } = n;
  let t = n.position, c = null, r = t;
  const i = [], p = o.length;
  for (; t < p; ) {
    const e = o.charAt(t);
    if (c) {
      e === c && (c = null), t++;
      continue;
    }
    if (e === "/" || e === ">") {
      t !== r && i.push(o.slice(r, t));
      break;
    }
    if (/\s/.test(e)) {
      t !== r && i.push(o.slice(r, t)), r = t + 1, t++;
      continue;
    }
    if (e === "'" || e === '"') {
      c = e, t++;
      continue;
    }
    t++;
  }
  d(n, t);
  const l = "attribute";
  for (let e = 0; e < i.length; e++) {
    const h = i[e];
    if (h.indexOf("=") === -1) {
      const u = i[e + 1];
      if (u && u.startsWith("=")) {
        if (u.length > 1) {
          const a = h + u;
          s.push({ type: l, content: a }), e += 1;
          continue;
        }
        const f = i[e + 2];
        if (e += 1, f) {
          const a = h + "=" + f;
          s.push({ type: l, content: a }), e += 1;
          continue;
        }
      }
    }
    if (h.endsWith("=")) {
      const u = i[e + 1];
      if (u && u.indexOf("=") === -1) {
        const a = h + u;
        s.push({ type: l, content: a }), e += 1;
        continue;
      }
      const f = h.slice(0, -1);
      s.push({ type: l, content: f });
      continue;
    }
    s.push({ type: l, content: h });
  }
}, A = (n, o) => {
  const { str: s, tokens: t } = o, c = n.toLowerCase(), r = s.length;
  let i = o.position;
  for (; i < r; ) {
    const p = s.indexOf("</", i);
    if (p === -1) {
      x(o);
      break;
    }
    const l = {
      str: s,
      position: o.position,
      tokens: []
    };
    d(l, p);
    const e = m(l);
    if (c !== e.toLowerCase()) {
      i = l.position;
      continue;
    }
    if (p !== o.position) {
      const h = o.position;
      d(o, p), t.push({
        type: "text",
        content: s.slice(h, p)
      });
    }
    t.push(...l.tokens), d(o, l.position);
    break;
  }
}, m = (n) => {
  const { str: o } = n, t = o.charAt(n.position + 1) === "/";
  g(n, t ? 2 : 1), n.tokens.push({
    type: "tag-start",
    close: t
  });
  const c = E(n);
  W(n);
  const i = o.charAt(n.position) === "/";
  return g(n, i ? 2 : 1), n.tokens.push({
    type: "tag-end",
    close: i
  }), c;
}, b = (n) => {
  const o = n.str, s = o.length;
  for (; n.position < s; ) {
    const t = n.position;
    if (x(n), n.position === t)
      if (o.startsWith("!--", t + 1)) T(n);
      else {
        const r = m(n), i = r.toLowerCase();
        w.includes(i) && A(r, n);
      }
  }
}, N = (n) => {
  const o = {
    str: n,
    position: 0,
    tokens: []
  };
  return b(o), o.tokens;
};
export {
  N as lexer
};
//# sourceMappingURL=lexer.js.map
