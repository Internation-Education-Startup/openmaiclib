import { nodes as n } from "prosemirror-schema-basic";
import { listItem as a } from "prosemirror-schema-list";
const f = {
  attrs: {
    order: {
      default: 1
    },
    listStyleType: {
      default: ""
    },
    fontsize: {
      default: ""
    },
    color: {
      default: ""
    }
  },
  content: "list_item+",
  group: "block",
  parseDOM: [
    {
      tag: "ol",
      getAttrs: (o) => {
        const e = { order: +((o.hasAttribute("start") ? o.getAttribute("start") : 1) || 1) }, { listStyleType: l, fontSize: t, color: r } = o.style;
        return l && (e.listStyleType = l), t && (e.fontsize = t), r && (e.color = r), e;
      }
    }
  ],
  toDOM: (o) => {
    const { order: s, listStyleType: e, fontsize: l, color: t } = o.attrs;
    let r = "";
    e && (r += `list-style-type: ${e};`), l && (r += `font-size: ${l};`), t && (r += `color: ${t};`);
    const i = { style: r };
    return s !== 1 && (i.start = s), ["ol", i, 0];
  }
}, c = {
  attrs: {
    listStyleType: {
      default: ""
    },
    fontsize: {
      default: ""
    },
    color: {
      default: ""
    }
  },
  content: "list_item+",
  group: "block",
  parseDOM: [
    {
      tag: "ul",
      getAttrs: (o) => {
        const s = {}, { listStyleType: e, fontSize: l, color: t } = o.style;
        return e && (s.listStyleType = e), l && (s.fontsize = l), t && (s.color = t), s;
      }
    }
  ],
  toDOM: (o) => {
    const { listStyleType: s, fontsize: e, color: l } = o.attrs;
    let t = "";
    return s && (t += `list-style-type: ${s};`), e && (t += `font-size: ${e};`), l && (t += `color: ${l};`), ["ul", { style: t }, 0];
  }
}, u = {
  ...a,
  content: "paragraph block*",
  group: "block"
}, d = {
  attrs: {
    align: {
      default: ""
    },
    indent: {
      default: 0
    },
    textIndent: {
      default: 0
    }
  },
  content: "inline*",
  group: "block",
  parseDOM: [
    {
      tag: "p",
      getAttrs: (o) => {
        const { textAlign: s, textIndent: e } = o.style;
        let l = o.getAttribute("align") || s || "";
        l = /(left|right|center|justify)/.test(l) ? l : "";
        let t = 0;
        e && (/em/.test(e) ? t = parseInt(e) : /px/.test(e) && (t = Math.floor(parseInt(e) / 16), t || (t = 1)));
        const r = +(o.getAttribute("data-indent") || 0);
        return { align: l, indent: r, textIndent: t };
      }
    },
    {
      tag: "img",
      ignore: !0
    },
    {
      tag: "pre",
      skip: !0
    }
  ],
  toDOM: (o) => {
    const { align: s, indent: e, textIndent: l } = o.attrs;
    let t = "";
    s && s !== "left" && (t += `text-align: ${s};`), l && (t += `text-indent: ${l}em;`);
    const r = { style: t };
    return e && (r["data-indent"] = e), ["p", r, 0];
  }
}, { doc: p, blockquote: y, text: g } = n, m = {
  doc: p,
  paragraph: d,
  blockquote: y,
  text: g,
  ordered_list: f,
  bullet_list: c,
  list_item: u
};
export {
  m as default
};
//# sourceMappingURL=nodes.js.map
