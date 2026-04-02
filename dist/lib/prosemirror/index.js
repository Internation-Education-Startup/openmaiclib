import { EditorState as i } from "prosemirror-state";
import { EditorView as m } from "prosemirror-view";
import { Schema as n, DOMParser as a } from "prosemirror-model";
import { buildPlugins as c } from "./plugins/index.js";
import { schemaMarks as p, schemaNodes as d } from "./schema/index.js";
const s = new n({
  nodes: d,
  marks: p
}), l = (r) => {
  const t = `<div>${r}</div>`, o = new window.DOMParser().parseFromString(t, "text/html").body.firstElementChild;
  return a.fromSchema(s).parse(o);
}, S = (r, t, e, o) => new m(r, {
  state: i.create({
    doc: l(t),
    plugins: c(s)
  }),
  ...e
});
export {
  l as createDocument,
  S as initProsemirrorEditor
};
//# sourceMappingURL=index.js.map
