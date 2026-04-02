const i = (e, t) => {
  const n = e.indexOf(t);
  return n === -1 ? [e] : [e.slice(0, n), e.slice(n + t.length)];
}, o = (e) => {
  const t = e.charAt(0), n = e.length - 1;
  return (t === '"' || t === "'") && t === e.charAt(n) ? e.slice(1, n) : e;
}, a = (e) => e.map((t) => {
  const n = i(t.trim(), "="), r = n[0], c = typeof n[1] == "string" ? o(n[1]) : null;
  return { key: r, value: c };
}), s = (e) => e.map((t) => {
  if (t.type === "element") {
    const r = s(t.children);
    return {
      type: "element",
      tagName: t.tagName.toLowerCase(),
      attributes: a(t.attributes),
      children: r
    };
  }
  return {
    type: t.type,
    content: t.content
  };
});
export {
  s as format,
  i as splitHead
};
//# sourceMappingURL=format.js.map
