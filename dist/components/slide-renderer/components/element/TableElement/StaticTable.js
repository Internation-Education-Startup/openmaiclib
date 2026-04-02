import { jsxs as S, jsx as a } from "react/jsx-runtime";
import { useMemo as c } from "react";
import { getTableSubThemeColor as $ } from "../../../../../lib/utils/element.js";
import { getHiddenCells as k, getTextStyle as x, formatText as F } from "./tableUtils.js";
function A({ elementInfo: m }) {
  const { width: g, data: n, colWidths: b, cellMinHeight: y, outline: i, theme: e } = m, C = c(() => k(n), [n]), [f, w] = c(() => e ? $(e.color) : ["", ""], [e]), T = c(() => {
    if (!i) return "none";
    const r = i.width ?? 1, o = i.color ?? "#000", t = i.style === "dashed" ? "dashed" : "solid";
    return `${r}px ${t} ${o}`;
  }, [i]), v = (r, o, t) => {
    var s;
    if (t) return t;
    if (!e) return;
    const d = n.length, u = ((s = n[0]) == null ? void 0 : s.length) ?? 0;
    if (e.rowHeader && r === 0 || e.rowFooter && r === d - 1) return e.color;
    if (e.colHeader && o === 0 || e.colFooter && o === u - 1) return f;
    const l = e.rowHeader ? r - 1 : r;
    if (l >= 0 && l % 2 === 0) return w;
  }, H = (r) => {
    if (!e) return;
    const o = n.length;
    if (e.rowHeader && r === 0 || e.rowFooter && r === o - 1) return "#fff";
  };
  return /* @__PURE__ */ S(
    "table",
    {
      className: "w-full h-full",
      style: {
        borderCollapse: "collapse",
        tableLayout: "fixed"
      },
      children: [
        /* @__PURE__ */ a("colgroup", { children: b.map((r, o) => /* @__PURE__ */ a("col", { style: { width: `${r * g}px` } }, o)) }),
        /* @__PURE__ */ a("tbody", { children: n.map((r, o) => /* @__PURE__ */ a("tr", { style: { height: `${y}px` }, children: r.map((t, d) => {
          var h, p;
          if (C.has(`${o}_${d}`)) return null;
          const u = v(o, d, (h = t.style) == null ? void 0 : h.backcolor), l = H(o), s = x(t.style);
          return l && !((p = t.style) != null && p.color) && (s.color = l), /* @__PURE__ */ a(
            "td",
            {
              colSpan: t.colspan > 1 ? t.colspan : void 0,
              rowSpan: t.rowspan > 1 ? t.rowspan : void 0,
              style: {
                border: T,
                backgroundColor: u,
                padding: "5px",
                verticalAlign: "middle",
                wordBreak: "break-word",
                ...s
              },
              dangerouslySetInnerHTML: { __html: F(t.text) }
            },
            t.id
          );
        }) }, o)) })
      ]
    }
  );
}
export {
  A as StaticTable
};
//# sourceMappingURL=StaticTable.js.map
