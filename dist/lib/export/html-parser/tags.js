const t = ["style", "script", "template"], e = [
  "html",
  "head",
  "body",
  "p",
  "dt",
  "dd",
  "li",
  "option",
  "thead",
  "th",
  "tbody",
  "tr",
  "td",
  "tfoot",
  "colgroup"
], o = {
  li: ["ul", "ol", "menu"],
  dt: ["dl"],
  dd: ["dl"],
  tbody: ["table"],
  thead: ["table"],
  tfoot: ["table"],
  tr: ["table"],
  td: ["table"]
}, a = [
  "!doctype",
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
export {
  t as childlessTags,
  o as closingTagAncestorBreakers,
  e as closingTags,
  a as voidTags
};
//# sourceMappingURL=tags.js.map
