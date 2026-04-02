import { jsonrepair as p } from "jsonrepair";
import { createLogger as g } from "../logger.js";
const i = g("Generation");
function O(e) {
  const t = e.matchAll(/```(?:json)?\s*([\s\S]*?)```/g);
  for (const u of t) {
    const a = u[1].trim();
    if (a.startsWith("{") || a.startsWith("[")) {
      const o = h(a);
      if (o !== null)
        return i.debug("Successfully parsed JSON from code block"), o;
    }
  }
  const n = e.indexOf("["), r = e.indexOf("{");
  if (n !== -1 || r !== -1) {
    const u = n === -1 ? r : r === -1 ? n : Math.min(n, r);
    let a = 0, o = -1, f = !1, d = !1;
    for (let l = u; l < e.length; l++) {
      const c = e[l];
      if (d) {
        d = !1;
        continue;
      }
      if (c === "\\" && f) {
        d = !0;
        continue;
      }
      if (c === '"' && !d) {
        f = !f;
        continue;
      }
      if (!f) {
        if (c === "[" || c === "{") a++;
        else if ((c === "]" || c === "}") && (a--, a === 0)) {
          o = l;
          break;
        }
      }
    }
    if (o !== -1) {
      const l = e.substring(u, o + 1), c = h(l);
      if (c !== null)
        return i.debug("Successfully parsed JSON from response body"), c;
    }
  }
  const s = h(e.trim());
  return s !== null ? (i.debug("Successfully parsed raw response as JSON"), s) : (i.error("Failed to parse JSON from response"), i.error("Raw response (first 500 chars):", e.substring(0, 500)), null);
}
function h(e) {
  try {
    return JSON.parse(e);
  } catch {
  }
  try {
    let t = e;
    t = t.replace(/"([^"]*?)"/g, (r, s) => `"${s.replace(/\\([a-zA-Z])/g, "\\\\$1")}"`), t = t.replace(/\\([^"\\\/bfnrtu\n\r])/g, (r, s) => /[a-zA-Z]/.test(s) ? "\\\\" + s : r);
    const n = t.trim();
    if (n.startsWith("[") && !n.endsWith("]")) {
      const r = t.lastIndexOf("}");
      r > 0 && (t = t.substring(0, r + 1) + "]", i.warn("Fixed truncated JSON array"));
    } else if (n.startsWith("{") && !n.endsWith("}")) {
      const r = (t.match(/{/g) || []).length, s = (t.match(/}/g) || []).length;
      r > s && (t += "}".repeat(r - s), i.warn("Fixed truncated JSON object"));
    }
    return JSON.parse(t);
  } catch {
  }
  try {
    const t = p(e);
    return JSON.parse(t);
  } catch {
  }
  try {
    let t = e;
    return t = t.replace(/[\x00-\x1F\x7F]/g, (n) => {
      switch (n) {
        case `
`:
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        default:
          return "";
      }
    }), JSON.parse(t);
  } catch {
    return null;
  }
}
export {
  O as parseJsonResponse,
  h as tryParseJson
};
//# sourceMappingURL=json-repair.js.map
