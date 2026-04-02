function o(t) {
  return t ? t >= 1e6 ? t % 1e6 === 0 ? `${t / 1e6}M` : `${(t / 1e6).toFixed(1)}M` : t >= 1e3 ? t % 1e3 === 0 ? `${t / 1e3}K` : `${Math.floor(t / 1024)}K` : t.toString() : "-";
}
function f(t, e) {
  const r = `settings.providerTypes.${t}`, n = e(r);
  return n !== r ? n : t;
}
export {
  o as formatContextWindow,
  f as getProviderTypeLabel
};
//# sourceMappingURL=utils.js.map
