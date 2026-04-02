import { splitListItem as s, liftListItem as p, sinkListItem as e } from "prosemirror-schema-list";
import { undo as l, redo as m } from "prosemirror-history";
import { undoInputRule as k } from "prosemirror-inputrules";
import { toggleMark as r, chainCommands as M, newlineInCode as a, createParagraphNear as u, liftEmptyBlock as f, splitBlockKeepMarks as b, joinUp as g, joinDown as w, selectParentNode as I } from "prosemirror-commands";
const B = (t) => {
  const i = {}, o = (n, d) => i[n] = d;
  return o("Alt-ArrowUp", g), o("Alt-ArrowDown", w), o("Mod-z", l), o("Mod-y", m), o("Backspace", k), o("Escape", I), o("Mod-b", r(t.marks.strong)), o("Mod-i", r(t.marks.em)), o("Mod-u", r(t.marks.underline)), o("Mod-d", r(t.marks.strikethrough)), o("Mod-e", r(t.marks.code)), o("Mod-;", r(t.marks.superscript)), o("Mod-'", r(t.marks.subscript)), o(
    "Enter",
    M(
      s(t.nodes.list_item),
      a,
      u,
      f,
      b
    )
  ), o("Mod-[", p(t.nodes.list_item)), o("Mod-]", e(t.nodes.list_item)), o("Tab", e(t.nodes.list_item)), i;
};
export {
  B as buildKeymap
};
//# sourceMappingURL=keymap.js.map
