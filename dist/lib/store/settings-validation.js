function t(i) {
  return i ? !!i.isServerConfigured || !!i.apiKey : !1;
}
function o(i, r, e, f) {
  if (!i || t(r[i])) return i;
  for (const n of e)
    if (t(r[n])) return n;
  return f ?? "";
}
function u(i, r) {
  var e;
  return !i || r.some((f) => f.id === i) ? i : ((e = r[0]) == null ? void 0 : e.id) ?? "";
}
export {
  t as isProviderUsable,
  u as validateModel,
  o as validateProvider
};
//# sourceMappingURL=settings-validation.js.map
