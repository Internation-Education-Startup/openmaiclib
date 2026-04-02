const r = (o) => {
  const e = o;
  e.use = {};
  for (const t of Object.keys(e.getState()))
    e.use[t] = () => e((s) => s[t]);
  return e;
};
export {
  r as createSelectors
};
//# sourceMappingURL=create-selectors.js.map
