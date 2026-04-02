import { marks as s } from "prosemirror-schema-basic";
const n = {
  excludes: "subscript",
  parseDOM: [
    { tag: "sub" },
    {
      style: "vertical-align",
      getAttrs: (t) => t === "sub" && null
    }
  ],
  toDOM: () => ["sub", 0]
}, o = {
  excludes: "superscript",
  parseDOM: [
    { tag: "sup" },
    {
      style: "vertical-align",
      getAttrs: (t) => t === "super" && null
    }
  ],
  toDOM: () => ["sup", 0]
}, l = {
  parseDOM: [
    { tag: "strike" },
    {
      style: "text-decoration",
      getAttrs: (t) => t === "line-through" && null
    },
    {
      style: "text-decoration-line",
      getAttrs: (t) => t === "line-through" && null
    }
  ],
  toDOM: () => ["span", { style: "text-decoration-line: line-through;" }, 0]
}, a = {
  parseDOM: [
    { tag: "u" },
    {
      style: "text-decoration",
      getAttrs: (t) => t === "underline" && null
    },
    {
      style: "text-decoration-line",
      getAttrs: (t) => t === "underline" && null
    }
  ],
  toDOM: () => ["span", { style: "text-decoration: underline;" }, 0]
}, i = {
  attrs: {
    color: {}
  },
  inline: !0,
  group: "inline",
  parseDOM: [
    {
      style: "color",
      getAttrs: (t) => t ? { color: t } : {}
    }
  ],
  toDOM: (t) => {
    const { color: e } = t.attrs;
    let r = "";
    return e && (r += `color: ${e};`), ["span", { style: r }, 0];
  }
}, c = {
  attrs: {
    backcolor: {}
  },
  inline: !0,
  group: "inline",
  parseDOM: [
    {
      style: "background-color",
      getAttrs: (t) => t ? { backcolor: t } : {}
    }
  ],
  toDOM: (t) => {
    const { backcolor: e } = t.attrs;
    let r = "";
    return e && (r += `background-color: ${e};`), ["span", { style: r }, 0];
  }
}, u = {
  attrs: {
    fontsize: {}
  },
  inline: !0,
  group: "inline",
  parseDOM: [
    {
      style: "font-size",
      getAttrs: (t) => t ? { fontsize: t } : {}
    }
  ],
  toDOM: (t) => {
    const { fontsize: e } = t.attrs;
    let r = "";
    return e && (r += `font-size: ${e};`), ["span", { style: r }, 0];
  }
}, g = {
  attrs: {
    fontname: {}
  },
  inline: !0,
  group: "inline",
  parseDOM: [
    {
      style: "font-family",
      getAttrs: (t) => ({
        fontname: t && typeof t == "string" ? t.replace(/[\"\']/g, "") : ""
      })
    }
  ],
  toDOM: (t) => {
    const { fontname: e } = t.attrs;
    let r = "";
    return e && (r += `font-family: ${e};`), ["span", { style: r }, 0];
  }
}, p = {
  attrs: {
    href: {},
    title: { default: null },
    target: { default: "_blank" }
  },
  inclusive: !1,
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: (t) => {
        const e = t.getAttribute("href"), r = t.getAttribute("title");
        return { href: e, title: r };
      }
    }
  ],
  toDOM: (t) => ["a", t.attrs, 0]
}, f = {
  attrs: {
    index: { default: null }
  },
  parseDOM: [
    {
      tag: "mark",
      getAttrs: (t) => ({ index: t.dataset.index })
    }
  ],
  toDOM: (t) => ["mark", { "data-index": t.attrs.index }, 0]
}, { em: d, strong: M, code: D } = s, y = {
  em: d,
  strong: M,
  fontsize: u,
  fontname: g,
  code: D,
  forecolor: i,
  backcolor: c,
  subscript: n,
  superscript: o,
  strikethrough: l,
  underline: a,
  link: p,
  mark: f
};
export {
  y as default
};
//# sourceMappingURL=marks.js.map
