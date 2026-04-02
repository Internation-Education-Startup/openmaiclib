import { SLIDE_ONLY_ACTIONS as O } from "../types/action.js";
import { nanoid as u } from "nanoid";
import { parse as N, Allow as o } from "partial-json";
import { jsonrepair as S } from "jsonrepair";
import { createLogger as h } from "../logger.js";
const i = h("ActionParser");
function g(p) {
  return p.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?\s*```\s*$/i, "");
}
function L(p, d, x) {
  const a = g(p.trim()), c = a.indexOf("["), m = a.lastIndexOf("]");
  if (c === -1)
    return i.warn("No JSON array found in response"), [];
  const f = m > c ? a.slice(c, m + 1) : a.slice(c);
  let s;
  try {
    s = JSON.parse(f);
  } catch {
    try {
      s = JSON.parse(S(f)), i.info("Recovered malformed JSON via jsonrepair");
    } catch {
      try {
        s = N(
          f,
          o.ARR | o.OBJ | o.STR | o.NUM | o.BOOL | o.NULL
        );
      } catch (e) {
        return i.warn("Failed to parse JSON array:", e.message), [];
      }
    }
  }
  if (!Array.isArray(s))
    return i.warn("Parsed result is not an array"), [];
  const r = [];
  for (const e of s) {
    if (!e || typeof e != "object" || !("type" in e)) continue;
    const t = e;
    if (t.type === "text") {
      const n = (t.content || "").trim();
      n && r.push({
        id: `action_${u(8)}`,
        type: "speech",
        text: n
      });
    } else if (t.type === "action")
      try {
        const n = t.name || t.tool_name, y = t.params || t.parameters || {};
        r.push({
          id: t.action_id || t.tool_id || `action_${u(8)}`,
          type: n,
          ...y
        });
      } catch {
        i.warn("Invalid action item, skipping:", JSON.stringify(t).slice(0, 100));
      }
  }
  const l = r.findIndex((e) => e.type === "discussion");
  if (l !== -1 && l < r.length - 1 && r.splice(l + 1), d && d !== "slide") {
    const e = r.length, t = r.filter((n) => !O.includes(n.type));
    return t.length < e && i.info(`Stripped ${e - t.length} slide-only action(s) from ${d} scene`), t;
  }
  return r;
}
export {
  L as parseActionsFromStructuredOutput
};
//# sourceMappingURL=action-parser.js.map
