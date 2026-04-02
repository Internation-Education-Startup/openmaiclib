function d(t, n = 1e3) {
  if (!("left" in t) || !("top" in t) || !("width" in t) || !("height" in t))
    return null;
  const { left: r, top: e, width: i, height: o } = t, l = r / n * 100, c = e / (n * 0.5625) * 100, s = i / n * 100, f = o / (n * 0.5625) * 100, u = l + s / 2, h = c + f / 2;
  return {
    x: l,
    y: c,
    w: s,
    h: f,
    centerX: u,
    centerY: h
  };
}
function m(t, n, r = 1e3) {
  var o, l;
  let e;
  if (t.type === "slide" && (t.elements ? e = t.elements : (l = (o = t.content) == null ? void 0 : o.canvas) != null && l.elements && (e = t.content.canvas.elements)), !e)
    return null;
  const i = e.find((c) => c.id === n);
  return i ? d(i, r) : null;
}
export {
  m as findElementGeometry,
  d as getElementPercentageGeometry
};
//# sourceMappingURL=geometry.js.map
