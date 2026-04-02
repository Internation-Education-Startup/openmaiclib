import { parseModelString as y, getModel as c } from "../ai/providers.js";
import { resolveApiKey as u, resolveBaseUrl as g, resolveProxy as a } from "./provider-config.js";
import { validateUrlForSSRF as f } from "./ssrf-guard.js";
function m(e) {
  const i = e.modelString || process.env.DEFAULT_MODEL || "gpt-4o-mini", { providerId: o, modelId: s } = y(i), r = e.baseUrl || void 0;
  if (r && process.env.NODE_ENV === "production") {
    const d = f(r);
    if (d)
      throw new Error(d);
  }
  const t = r ? e.apiKey || "" : u(o, e.apiKey || ""), l = r || g(o, e.baseUrl), n = a(o), { model: p, modelInfo: v } = c({
    providerId: o,
    modelId: s,
    apiKey: t,
    baseUrl: l,
    proxy: n,
    providerType: e.providerType,
    requiresApiKey: e.requiresApiKey
  });
  return { model: p, modelInfo: v, modelString: i, apiKey: t };
}
function h(e) {
  return m({
    modelString: e.headers.get("x-model") || void 0,
    apiKey: e.headers.get("x-api-key") || void 0,
    baseUrl: e.headers.get("x-base-url") || void 0,
    providerType: e.headers.get("x-provider-type") || void 0,
    requiresApiKey: e.headers.get("x-requires-api-key") === "true" ? !0 : void 0
  });
}
export {
  m as resolveModel,
  h as resolveModelFromHeaders
};
//# sourceMappingURL=resolve-model.js.map
