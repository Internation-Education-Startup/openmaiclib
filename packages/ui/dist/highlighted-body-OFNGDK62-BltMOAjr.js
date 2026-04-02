import { R as c, L as f, A as d } from "./index-Bpe9iTto.js";
import { useContext as p, useState as L, useEffect as N } from "react";
import { jsx as x } from "react/jsx-runtime";
var A = ({ code: s, language: e, raw: a, className: o, startLine: m, lineNumbers: u, ...g }) => {
  let { shikiTheme: i } = p(c), t = f(), [n, r] = L(a);
  return N(() => {
    if (!t) {
      r(a);
      return;
    }
    let l = t.highlight({ code: s, language: e, themes: i }, (h) => {
      r(h);
    });
    l && r(l);
  }, [s, e, i, t, a]), x(d, { className: o, language: e, lineNumbers: u, result: n, startLine: m, ...g });
};
export {
  A as HighlightedCodeBlockBody
};
//# sourceMappingURL=highlighted-body-OFNGDK62-BltMOAjr.js.map
