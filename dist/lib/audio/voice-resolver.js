import { TTS_PROVIDERS as l } from "./constants.js";
function a(e, i, d) {
  if (e.voiceConfig) {
    if (e.voiceConfig.providerId === "browser-native-tts")
      return {
        providerId: e.voiceConfig.providerId,
        modelId: e.voiceConfig.modelId,
        voiceId: e.voiceConfig.voiceId
      };
    if (p(e.voiceConfig.providerId).includes(e.voiceConfig.voiceId))
      return {
        providerId: e.voiceConfig.providerId,
        modelId: e.voiceConfig.modelId,
        voiceId: e.voiceConfig.voiceId
      };
  }
  if (d.length > 0) {
    const o = d[0];
    return {
      providerId: o.providerId,
      voiceId: o.voices[i % o.voices.length].id
    };
  }
  return { providerId: "browser-native-tts", voiceId: "default" };
}
function p(e) {
  if (e === "browser-native-tts") return [];
  const i = l[e];
  return i ? i.voices.map((d) => d.id) : [];
}
function h(e) {
  const i = [];
  for (const [d, o] of Object.entries(l)) {
    const t = d;
    if (t === "browser-native-tts" || o.voices.length === 0) continue;
    const r = e[t], f = (r == null ? void 0 : r.apiKey) && r.apiKey.trim().length > 0, m = (r == null ? void 0 : r.isServerConfigured) === !0;
    if (f || m) {
      const v = o.voices.map((c) => ({ id: c.id, name: c.name })), n = [];
      if (o.models.length > 0)
        for (const c of o.models) {
          const u = o.voices.filter((s) => !s.compatibleModels || s.compatibleModels.includes(c.id)).map((s) => ({ id: s.id, name: s.name }));
          n.push({
            modelId: c.id,
            modelName: c.name,
            voices: u
          });
        }
      else
        n.push({
          modelId: "",
          modelName: o.name,
          voices: v
        });
      i.push({
        providerId: t,
        providerName: o.name,
        voices: v,
        modelGroups: n
      });
    }
  }
  return i;
}
export {
  h as getAvailableProvidersWithVoices,
  p as getServerVoiceList,
  a as resolveAgentVoice
};
//# sourceMappingURL=voice-resolver.js.map
