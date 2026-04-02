import { keymap as r } from "prosemirror-keymap";
import { history as p } from "prosemirror-history";
import { baseKeymap as m } from "prosemirror-commands";
import { dropCursor as i } from "prosemirror-dropcursor";
import { gapCursor as t } from "prosemirror-gapcursor";
import { buildKeymap as u } from "./keymap.js";
import { buildInputRules as s } from "./inputrules.js";
import "prosemirror-state";
import "prosemirror-view";
const c = (o, n) => [
  s(o),
  r(u(o)),
  r(m),
  i(),
  t(),
  p()
];
export {
  c as buildPlugins
};
//# sourceMappingURL=index.js.map
