import i from "fs";
import c from "path";
import { createLogger as g } from "../../logger.js";
const f = g("PromptLoader"), p = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
function y() {
  return c.join(process.cwd(), "lib", "generation", "prompts");
}
function h(t) {
  const e = a.get(t);
  if (e) return e;
  const r = c.join(y(), "snippets", `${t}.md`);
  try {
    const n = i.readFileSync(r, "utf-8").trim();
    return a.set(t, n), n;
  } catch {
    return f.warn(`Snippet not found: ${t}`), `{{snippet:${t}}}`;
  }
}
function m(t) {
  return t.replace(/\{\{snippet:(\w[\w-]*)\}\}/g, (e, r) => h(r));
}
function P(t) {
  const e = p.get(t);
  if (e) return e;
  const r = c.join(y(), "templates", t);
  try {
    const n = c.join(r, "system.md");
    let o = i.readFileSync(n, "utf-8").trim();
    o = m(o);
    const d = c.join(r, "user.md");
    let s = "";
    try {
      s = i.readFileSync(d, "utf-8").trim(), s = m(s);
    } catch {
    }
    const u = {
      id: t,
      systemPrompt: o,
      userPromptTemplate: s
    };
    return p.set(t, u), u;
  } catch (n) {
    return f.error(`Failed to load prompt ${t}:`, n), null;
  }
}
function l(t, e) {
  return t.replace(/\{\{(\w+)\}\}/g, (r, n) => {
    const o = e[n];
    return o === void 0 ? r : typeof o == "object" ? JSON.stringify(o, null, 2) : String(o);
  });
}
function F(t, e) {
  const r = P(t);
  return r ? {
    system: l(r.systemPrompt, e),
    user: l(r.userPromptTemplate, e)
  } : null;
}
export {
  F as buildPrompt,
  l as interpolateVariables,
  P as loadPrompt,
  h as loadSnippet
};
//# sourceMappingURL=loader.js.map
