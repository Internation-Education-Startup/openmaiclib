import d from "tinycolor2";
import "nanoid";
const f = (t) => {
  const { left: n, top: s, width: o, height: a, rotate: i = 0 } = t, r = Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2)) / 2, h = Math.atan(a / o) * 180 / Math.PI, c = (180 - i - h) * Math.PI / 180, g = (h - i) * Math.PI / 180, M = n + o / 2, u = s + a / 2, x = [
    M + r * Math.cos(c),
    M + r * Math.cos(g),
    M - r * Math.cos(c),
    M - r * Math.cos(g)
  ], $ = [
    u - r * Math.sin(c),
    u - r * Math.sin(g),
    u + r * Math.sin(c),
    u + r * Math.sin(g)
  ];
  return {
    xRange: [Math.min(...x), Math.max(...x)],
    yRange: [Math.min(...$), Math.max(...$)]
  };
}, p = (t) => {
  let n, s, o, a;
  if (t.type === "line")
    n = t.left, s = t.left + Math.max(t.start[0], t.end[0]), o = t.top, a = t.top + Math.max(t.start[1], t.end[1]);
  else if ("rotate" in t && t.rotate) {
    const { left: i, top: r, width: h, height: c, rotate: g } = t, { xRange: M, yRange: u } = f({
      left: i,
      top: r,
      width: h,
      height: c,
      rotate: g
    });
    n = M[0], s = M[1], o = u[0], a = u[1];
  } else
    n = t.left, s = t.left + t.width, o = t.top, a = t.top + t.height;
  return { minX: n, maxX: s, minY: o, maxY: a };
}, R = (t) => {
  const n = [], s = [], o = [], a = [];
  t.forEach((g) => {
    const { minX: M, maxX: u, minY: x, maxY: $ } = p(g);
    n.push(M), s.push(x), o.push(u), a.push($);
  });
  const i = Math.min(...n), r = Math.max(...o), h = Math.min(...s), c = Math.max(...a);
  return { minX: i, maxX: r, minY: h, maxY: c };
}, m = (t) => {
  const n = [];
  return t.forEach((s) => {
    const o = n.findIndex((a) => a.value === s.value);
    if (o === -1) n.push(s);
    else {
      const a = n[o], i = Math.min(a.range[0], s.range[0]), r = Math.max(a.range[1], s.range[1]), h = [i, r], c = { value: s.value, range: h };
      n[o] = c;
    }
  }), n;
}, A = (t) => {
  const n = d(t);
  return [n.setAlpha(0.3).toRgbString(), n.setAlpha(0.1).toRgbString()];
}, y = (t) => {
  const n = Array.isArray(t.start) ? t.start : [0, 0], s = Array.isArray(t.end) ? t.end : [100, 100], o = n.join(","), a = s.join(",");
  if (t.broken) {
    const i = t.broken.join(",");
    return `M${o} L${i} L${a}`;
  } else if (t.broken2) {
    const { minX: i, maxX: r, minY: h, maxY: c } = p(t);
    return r - i >= c - h ? `M${o} L${t.broken2[0]},${n[1]} L${t.broken2[0]},${s[1]} ${a}` : `M${o} L${n[0]},${t.broken2[1]} L${s[0]},${t.broken2[1]} ${a}`;
  } else if (t.curve) {
    const i = t.curve.join(",");
    return `M${o} Q${i} ${a}`;
  } else if (t.cubic) {
    const [i, r] = t.cubic, h = i.join(","), c = r.join(",");
    return `M${o} C${h} ${c} ${a}`;
  }
  return `M${o} L${a}`;
};
export {
  R as getElementListRange,
  p as getElementRange,
  y as getLineElementPath,
  f as getRectRotatedRange,
  A as getTableSubThemeColor,
  m as uniqAlignLines
};
//# sourceMappingURL=element.js.map
