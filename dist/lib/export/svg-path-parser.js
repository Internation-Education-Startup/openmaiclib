import { SVGPathData as c } from "svg-pathdata";
import r from "svg-arc-to-cubic-bezier";
const x = {
  1: "Z",
  2: "M",
  4: "H",
  8: "V",
  16: "L",
  32: "C",
  64: "S",
  128: "Q",
  256: "T",
  512: "A"
}, m = (o) => {
  const y = new c(o), e = [];
  for (const t of y.commands) {
    const n = x[t.type];
    if ((t.type === 2 || t.type === 16) && e.push({
      x: t.x,
      y: t.y,
      relative: t.relative,
      type: n
    }), t.type === 32)
      e.push({
        x: t.x,
        y: t.y,
        curve: {
          type: "cubic",
          x1: t.x1,
          y1: t.y1,
          x2: t.x2,
          y2: t.y2
        },
        relative: t.relative,
        type: n
      });
    else if (t.type === 128)
      e.push({
        x: t.x,
        y: t.y,
        curve: {
          type: "quadratic",
          x1: t.x1,
          y1: t.y1
        },
        relative: t.relative,
        type: n
      });
    else if (t.type === 512) {
      const i = e[e.length - 1];
      if (!["M", "L", "Q", "C"].includes(i.type)) continue;
      const s = r({
        px: i.x,
        py: i.y,
        cx: t.x,
        cy: t.y,
        rx: t.rX,
        ry: t.rY,
        xAxisRotation: t.xRot,
        largeArcFlag: t.lArcFlag,
        sweepFlag: t.sweepFlag
      });
      for (const a of s)
        e.push({
          x: a.x,
          y: a.y,
          curve: {
            type: "cubic",
            x1: a.x1,
            y1: a.y1,
            x2: a.x2,
            y2: a.y2
          },
          relative: !1,
          type: "C"
        });
    } else if (t.type === 1)
      e.push({ close: !0, type: n });
    else continue;
  }
  return e;
}, u = (o) => {
  try {
    const y = new c(o), e = [], t = [];
    for (const n of y.commands) {
      const i = "x" in n ? n.x : 0, s = "y" in n ? n.y : 0;
      e.push(i), t.push(s);
    }
    return {
      minX: Math.min(...e),
      minY: Math.min(...t),
      maxX: Math.max(...e),
      maxY: Math.max(...t)
    };
  } catch {
    return {
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    };
  }
};
export {
  u as getSvgPathRange,
  m as toPoints
};
//# sourceMappingURL=svg-path-parser.js.map
