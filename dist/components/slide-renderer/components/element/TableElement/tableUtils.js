function g(o) {
  if (!o) return {};
  const n = {};
  return o.bold && (n.fontWeight = "bold"), o.em && (n.fontStyle = "italic"), o.underline && (n.textDecoration = "underline"), o.strikethrough && (n.textDecoration = n.textDecoration ? `${n.textDecoration} line-through` : "line-through"), o.color && (n.color = o.color), o.backcolor && (n.backgroundColor = o.backcolor), o.fontsize && (n.fontSize = o.fontsize), o.fontname && (n.fontFamily = o.fontname), o.align && (n.textAlign = o.align), n;
}
function u(o) {
  return o.replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;");
}
function d(o) {
  const n = /* @__PURE__ */ new Set();
  for (let t = 0; t < o.length; t++) {
    let e = 0;
    for (let c = 0; c < o[t].length; c++) {
      for (; n.has(`${t}_${e}`); )
        e++;
      const l = o[t][c], f = l.colspan ?? 1, a = l.rowspan ?? 1;
      if (f > 1 || a > 1)
        for (let r = 0; r < a; r++)
          for (let i = 0; i < f; i++)
            r === 0 && i === 0 || n.add(`${t + r}_${e + i}`);
      e += f;
    }
  }
  return n;
}
export {
  u as formatText,
  d as getHiddenCells,
  g as getTextStyle
};
//# sourceMappingURL=tableUtils.js.map
