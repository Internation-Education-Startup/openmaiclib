import { generateText as v, streamText as k } from "ai";
import { createLogger as m } from "../logger.js";
import { PROVIDERS as b } from "./providers.js";
import { thinkingContext as c } from "./thinking-context.js";
const a = m("LLM");
function L(n) {
  const e = n.model;
  return typeof e == "string" ? e : e && typeof e == "object" && "modelId" in e ? e.modelId : "unknown";
}
const M = (() => {
  var e;
  const n = /* @__PURE__ */ new Map();
  for (const t of Object.values(b))
    for (const i of t.models)
      n.set(i.id, {
        providerType: t.type,
        thinking: (e = i.capabilities) == null ? void 0 : e.thinking
      });
  return n;
})();
function h() {
  if (process.env.LLM_THINKING_DISABLED === "true")
    return { enabled: !1 };
}
function T(n, e, t) {
  switch (e) {
    case "openai": {
      let i;
      if (n.startsWith("gpt-5."))
        i = "none";
      else if (n.startsWith("gpt-5"))
        i = "minimal";
      else if (n.startsWith("o"))
        i = "low";
      else
        return;
      return !t.toggleable && i !== "none" && a.info(
        `[thinking-adapter] Model ${n} cannot fully disable thinking, using effort=${i}`
      ), { openai: { reasoningEffort: i } };
    }
    case "anthropic":
      return { anthropic: { thinking: { type: "disabled" } } };
    case "google": {
      if (n.startsWith("gemini-3")) {
        const i = n.includes("flash") ? "minimal" : "low";
        return a.info(
          `[thinking-adapter] Model ${n} cannot fully disable thinking, using thinkingLevel=${i}`
        ), { google: { thinkingConfig: { thinkingLevel: i } } };
      }
      return n === "gemini-2.5-pro" ? (a.info(
        `[thinking-adapter] Model ${n} cannot fully disable thinking, using thinkingBudget=128`
      ), { google: { thinkingConfig: { thinkingBudget: 128 } } }) : { google: { thinkingConfig: { thinkingBudget: 0 } } };
    }
    default:
      return;
  }
}
function $(n, e, t, i) {
  switch (e) {
    case "openai":
      return;
    case "anthropic":
      return n.includes("4-6") ? i !== void 0 ? { anthropic: { thinking: { type: "enabled", budgetTokens: i } } } : { anthropic: { thinking: { type: "adaptive" } } } : {
        anthropic: {
          thinking: { type: "enabled", budgetTokens: Math.max(1024, i ?? 10240) }
        }
      };
    case "google":
      return n.startsWith("gemini-3") ? { google: { thinkingConfig: { thinkingLevel: "high" } } } : i !== void 0 ? {
        google: {
          thinkingConfig: {
            thinkingBudget: Math.max(n === "gemini-2.5-pro" ? 128 : 0, Math.min(24576, i))
          }
        }
      } : void 0;
    default:
      return;
  }
}
function w(n, e) {
  const t = M.get(n);
  if (t != null && t.thinking && e.enabled !== void 0)
    return e.enabled === !1 ? T(n, t.providerType, t.thinking) : $(n, t.providerType, t.thinking, e.budgetTokens);
}
function C(n) {
  if (n === "gemini-3.1-pro-preview")
    return { google: { thinkingConfig: { thinkingLevel: "high" } } };
}
function d(n, e) {
  if (n.providerOptions) return n;
  const t = L(n);
  if (e) {
    const r = w(t, e);
    if (r) return { ...n, providerOptions: r };
  }
  const i = C(t);
  return i ? { ...n, providerOptions: i } : n;
}
const x = (n) => n.trim().length > 0;
async function A(n, e, t, i) {
  const r = ((t == null ? void 0 : t.retries) ?? 0) + 1, l = (t == null ? void 0 : t.validate) ?? (r > 1 ? x : void 0);
  let u, s;
  for (let o = 1; o <= r; o++)
    try {
      const g = i ?? h(), p = d(n, g), f = await c.run(
        g,
        () => v(p)
      );
      if (l && !l(f.text)) {
        a.warn(
          `[${e}] Validation failed (attempt ${o}/${r}), ${o < r ? "retrying..." : "giving up"}`
        ), u = f;
        continue;
      }
      return f;
    } catch (g) {
      if (s = g, o < r) {
        a.warn(`[${e}] Call failed (attempt ${o}/${r}), retrying...`, g);
        continue;
      }
    }
  if (u) return u;
  throw s;
}
function _(n, e, t) {
  const i = t ?? h(), r = d(n, i);
  return c.run(i, () => k(r));
}
export {
  A as callLLM,
  _ as streamLLM
};
//# sourceMappingURL=llm.js.map
