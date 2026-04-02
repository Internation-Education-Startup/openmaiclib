import { lexer as e } from "./lexer.js";
import { parser as m } from "./parser.js";
import { format as n } from "./format.js";
const c = (o) => {
  const r = e(o), t = m(r);
  return n(t);
};
export {
  c as toAST
};
//# sourceMappingURL=index.js.map
