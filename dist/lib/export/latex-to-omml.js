import o from "temml";
import { mml2omml as a } from "mathml2omml";
import { createLogger as l } from "../logger.js";
const s = l("LatexToOmml");
function p(t) {
  const n = ["mpadded"];
  let r = t;
  for (const e of n)
    r = r.replace(new RegExp(`<${e}[^>]*>`, "g"), ""), r = r.replace(new RegExp(`</${e}>`, "g"), "");
  return r;
}
function u(t) {
  return `<a:rPr lang="en-US" i="1"${t ? ` sz="${t}"` : ""}><a:latin typeface="Cambria Math" panose="02040503050406030204" charset="0"/><a:cs typeface="Cambria Math" panose="02040503050406030204" charset="0"/></a:rPr>`;
}
function g(t, n) {
  let r = t;
  const e = u(n);
  return r = r.replace(/ xmlns:w="[^"]*"/g, ""), r = r.replace(/ xmlns:m="[^"]*"/g, ""), r = r.replace(/<m:r>(\s*)<m:t/g, `<m:r>$1${e}$1<m:t`), r = r.replace(/<m:ctrlPr\/>/g, `<m:ctrlPr>${e}</m:ctrlPr>`), r = r.replace(/<m:ctrlPr><\/m:ctrlPr>/g, `<m:ctrlPr>${e}</m:ctrlPr>`), r;
}
function f(t, n) {
  try {
    const r = o.renderToString(t), e = p(r), m = String(a(e)), c = n ? Math.round(n * 100) : void 0;
    return g(m, c);
  } catch {
    return s.warn(`Failed to convert: "${t}"`), null;
  }
}
export {
  f as latexToOmml
};
//# sourceMappingURL=latex-to-omml.js.map
