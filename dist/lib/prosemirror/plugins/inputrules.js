import { smartQuotes as i, ellipsis as p, emDash as R, inputRules as k, wrappingInputRule as c, InputRule as d } from "prosemirror-inputrules";
const h = (s) => c(/^\s*>\s$/, s), $ = (s) => c(
  /^(\d+)\.\s$/,
  s,
  (e) => ({ order: +e[1] }),
  (e, t) => t.childCount + t.attrs.order === +e[1]
), b = (s) => c(/^\s*([-+*])\s$/, s), g = () => {
  const s = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/;
  return new d(s, (e, t, n, r) => {
    const { schema: u } = e, o = e.tr.insertText(`${t[2]} `, n, r), l = u.marks.code.create();
    return o.addMark(n, n + t[2].length, l);
  });
}, w = () => {
  const s = /(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+\.?(?:\d+)?(?:\/\S*)?$/;
  return new d(s, (e, t, n, r) => {
    const { schema: u } = e, o = e.tr.insertText(t[0], n, r), l = u.marks.link.create({ href: t[0], title: t[0] });
    return o.addMark(n, n + t[0].length, l);
  });
}, a = (s) => {
  const e = [...i, p, R];
  return e.push(h(s.nodes.blockquote)), e.push($(s.nodes.ordered_list)), e.push(b(s.nodes.bullet_list)), e.push(g()), e.push(w()), k({ rules: e });
};
export {
  a as buildInputRules
};
//# sourceMappingURL=inputrules.js.map
