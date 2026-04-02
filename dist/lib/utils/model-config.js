import { useSettingsStore as y } from "../store/settings.js";
function a() {
  const { providerId: t, modelId: s, providersConfig: r } = y.getState(), u = `${t}:${s}`, e = r[t];
  return {
    providerId: t,
    modelId: s,
    modelString: u,
    apiKey: (e == null ? void 0 : e.apiKey) || "",
    baseUrl: (e == null ? void 0 : e.baseUrl) || "",
    providerType: e == null ? void 0 : e.type,
    requiresApiKey: e == null ? void 0 : e.requiresApiKey,
    isServerConfigured: e == null ? void 0 : e.isServerConfigured
  };
}
export {
  a as getCurrentModelConfig
};
//# sourceMappingURL=model-config.js.map
