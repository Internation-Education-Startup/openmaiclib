import { create as We } from "zustand";
import { persist as _e } from "zustand/middleware";
import { PROVIDERS as V } from "../ai/providers.js";
import { DEFAULT_TTS_VOICES as Y, ASR_PROVIDERS as Ke, TTS_PROVIDERS as qe } from "../audio/constants.js";
import { PDF_PROVIDERS as ze } from "../pdf/constants.js";
import { IMAGE_PROVIDERS as k } from "../media/image-providers.js";
import { VIDEO_PROVIDERS as O } from "../media/video-providers.js";
import { WEB_SEARCH_PROVIDERS as Je } from "../web-search/constants.js";
import { createLogger as Ne } from "../logger.js";
import { validateProvider as E, validateModel as Q } from "./settings-validation.js";
const X = Ne("Settings"), no = [1, 1.25, 1.5, 2], ee = () => {
  const r = {};
  return Object.keys(V).forEach((f) => {
    const e = V[f];
    r[f] = {
      apiKey: "",
      baseUrl: "",
      models: e.models,
      name: e.name,
      type: e.type,
      defaultBaseUrl: e.defaultBaseUrl,
      icon: e.icon,
      requiresApiKey: e.requiresApiKey,
      isBuiltIn: !0
    };
  }), r;
}, Z = () => ({
  ttsProviderId: "browser-native-tts",
  ttsVoice: "default",
  ttsSpeed: 1,
  asrProviderId: "browser-native",
  asrLanguage: "zh",
  ttsProvidersConfig: {
    "openai-tts": { apiKey: "", baseUrl: "", enabled: !0 },
    "azure-tts": { apiKey: "", baseUrl: "", enabled: !1 },
    "glm-tts": { apiKey: "", baseUrl: "", enabled: !1 },
    "qwen-tts": { apiKey: "", baseUrl: "", enabled: !1 },
    "doubao-tts": { apiKey: "", baseUrl: "", enabled: !1 },
    "elevenlabs-tts": { apiKey: "", baseUrl: "", enabled: !1 },
    "minimax-tts": { apiKey: "", baseUrl: "", modelId: "speech-2.8-hd", enabled: !1 },
    "browser-native-tts": { apiKey: "", baseUrl: "", enabled: !0 }
  },
  asrProvidersConfig: {
    "openai-whisper": { apiKey: "", baseUrl: "", enabled: !0 },
    "browser-native": { apiKey: "", baseUrl: "", enabled: !0 },
    "qwen-asr": { apiKey: "", baseUrl: "", enabled: !1 }
  }
}), $ = () => ({
  pdfProviderId: "unpdf",
  pdfProvidersConfig: {
    unpdf: { apiKey: "", baseUrl: "", enabled: !0 },
    mineru: { apiKey: "", baseUrl: "", enabled: !1 }
  }
}), F = () => ({
  imageProviderId: "seedream",
  imageModelId: "doubao-seedream-5-0-260128",
  imageProvidersConfig: {
    seedream: { apiKey: "", baseUrl: "", enabled: !1 },
    "qwen-image": { apiKey: "", baseUrl: "", enabled: !1 },
    "nano-banana": { apiKey: "", baseUrl: "", enabled: !1 },
    "minimax-image": { apiKey: "", baseUrl: "", enabled: !1 },
    "grok-image": { apiKey: "", baseUrl: "", enabled: !1 }
  }
}), G = () => ({
  videoProviderId: "seedance",
  videoModelId: "doubao-seedance-1-5-pro-251215",
  videoProvidersConfig: {
    seedance: { apiKey: "", baseUrl: "", enabled: !1 },
    kling: { apiKey: "", baseUrl: "", enabled: !1 },
    veo: { apiKey: "", baseUrl: "", enabled: !1 },
    sora: { apiKey: "", baseUrl: "", enabled: !1 },
    "minimax-video": { apiKey: "", baseUrl: "", enabled: !1 },
    "grok-video": { apiKey: "", baseUrl: "", enabled: !1 }
  }
}), Te = () => ({
  webSearchProviderId: "tavily",
  webSearchProvidersConfig: {
    tavily: { apiKey: "", baseUrl: "", enabled: !0 }
  }
});
function w(r, f) {
  return typeof f == "string" && f in r;
}
function we(r) {
  const f = Z(), e = $(), v = F(), u = G(), t = Te();
  w(ze, r.pdfProviderId) || (r.pdfProviderId = e.pdfProviderId), w(Je, r.webSearchProviderId) || (r.webSearchProviderId = t.webSearchProviderId), w(k, r.imageProviderId) || (r.imageProviderId = v.imageProviderId), w(O, r.videoProviderId) || (r.videoProviderId = u.videoProviderId), w(qe, r.ttsProviderId) || (r.ttsProviderId = f.ttsProviderId), w(Ke, r.asrProviderId) || (r.asrProviderId = f.asrProviderId);
}
function ke(r) {
  if (!r.providersConfig) return;
  const f = ee();
  Object.keys(V).forEach((e) => {
    var u;
    const v = e;
    if (!r.providersConfig[v])
      r.providersConfig[v] = f[v];
    else {
      const t = V[v], g = r.providersConfig[v], y = new Set(((u = g.models) == null ? void 0 : u.map((n) => n.id)) || []), m = t.models.filter((n) => !y.has(n.id)), o = m.length > 0 ? [...m, ...g.models || []] : g.models;
      r.providersConfig[v] = {
        ...g,
        models: o,
        name: g.name || t.name,
        type: g.type || t.type,
        defaultBaseUrl: g.defaultBaseUrl || t.defaultBaseUrl,
        icon: t.icon || g.icon,
        requiresApiKey: g.requiresApiKey ?? t.requiresApiKey,
        isBuiltIn: g.isBuiltIn ?? !0
      };
    }
  });
}
function Oe(r) {
  if (!r.imageProvidersConfig) return;
  const f = F().imageProvidersConfig;
  Object.keys(k).forEach((e) => {
    const v = e;
    r.imageProvidersConfig[v] || (r.imageProvidersConfig[v] = f[v]);
  });
}
function Ve(r) {
  if (!r.videoProvidersConfig) return;
  const f = G().videoProvidersConfig;
  Object.keys(O).forEach((e) => {
    const v = e;
    r.videoProvidersConfig[v] || (r.videoProvidersConfig[v] = f[v]);
  });
}
const He = () => {
  if (typeof window > "u" || localStorage.getItem("settings-storage")) return null;
  const f = localStorage.getItem("llmModel"), e = localStorage.getItem("providersConfig"), v = localStorage.getItem("ttsModel"), u = localStorage.getItem("selectedAgentIds"), t = localStorage.getItem("maxTurns");
  if (!f && !e) return null;
  let g = "openai", y = "gpt-4o-mini";
  if (f) {
    const [l, c] = f.split(":");
    l && c && (g = l, y = c);
  }
  let m = ee();
  if (e)
    try {
      const l = JSON.parse(e);
      m = { ...m, ...l };
    } catch (l) {
      X.error("Failed to parse old providersConfig:", l);
    }
  let o = "openai-tts";
  v && (o = v);
  let n = ["default-1", "default-2", "default-3"];
  if (u)
    try {
      const l = JSON.parse(u);
      Array.isArray(l) && l.length > 0 && (n = l);
    } catch (l) {
      X.error("Failed to parse old selectedAgentIds:", l);
    }
  let i = "10";
  return t && (i = t), {
    providerId: g,
    modelId: y,
    providersConfig: m,
    ttsModel: o,
    selectedAgentIds: n,
    maxTurns: i
  };
}, to = We()(
  _e(
    (r, f) => {
      var m;
      const e = He(), v = Z(), u = $(), t = F(), g = G(), y = Te();
      return {
        // Initial state (use migrated data if available)
        providerId: (e == null ? void 0 : e.providerId) || "openai",
        modelId: (e == null ? void 0 : e.modelId) || "",
        providersConfig: (e == null ? void 0 : e.providersConfig) || ee(),
        ttsModel: (e == null ? void 0 : e.ttsModel) || "openai-tts",
        selectedAgentIds: (e == null ? void 0 : e.selectedAgentIds) || ["default-1", "default-2", "default-3"],
        maxTurns: ((m = e == null ? void 0 : e.maxTurns) == null ? void 0 : m.toString()) || "10",
        agentMode: "auto",
        autoAgentCount: 3,
        // Playback controls
        ttsMuted: !1,
        ttsVolume: 1,
        autoPlayLecture: !1,
        playbackSpeed: 1,
        // Layout preferences
        sidebarCollapsed: !0,
        chatAreaCollapsed: !0,
        chatAreaWidth: 320,
        // Audio settings (use defaults)
        ...v,
        // PDF settings (use defaults)
        ...u,
        // Image settings (use defaults)
        ...t,
        // Video settings (use defaults)
        ...g,
        // Media generation toggles (off by default)
        imageGenerationEnabled: !1,
        videoGenerationEnabled: !1,
        // Audio feature toggles (on by default)
        ttsEnabled: !0,
        asrEnabled: !0,
        autoConfigApplied: !1,
        // Web Search settings (use defaults)
        ...y,
        // Actions
        setModel: (o, n) => r({ providerId: o, modelId: n }),
        setProviderConfig: (o, n) => r((i) => ({
          providersConfig: {
            ...i.providersConfig,
            [o]: {
              ...i.providersConfig[o],
              ...n
            }
          }
        })),
        setProvidersConfig: (o) => r({ providersConfig: o }),
        setTtsModel: (o) => r({ ttsModel: o }),
        setTTSMuted: (o) => r({ ttsMuted: o }),
        setTTSVolume: (o) => r({ ttsVolume: Math.max(0, Math.min(1, o)) }),
        setAutoPlayLecture: (o) => r({ autoPlayLecture: o }),
        setPlaybackSpeed: (o) => r({ playbackSpeed: o }),
        setSelectedAgentIds: (o) => r({ selectedAgentIds: o }),
        setMaxTurns: (o) => r({ maxTurns: o }),
        setAgentMode: (o) => r({ agentMode: o }),
        setAutoAgentCount: (o) => r({ autoAgentCount: o }),
        // Layout actions
        setSidebarCollapsed: (o) => r({ sidebarCollapsed: o }),
        setChatAreaCollapsed: (o) => r({ chatAreaCollapsed: o }),
        setChatAreaWidth: (o) => r({ chatAreaWidth: o }),
        // Audio actions
        setTTSProvider: (o) => r((n) => {
          const i = n.ttsProviderId !== o;
          return {
            ttsProviderId: o,
            ...i && { ttsVoice: Y[o] }
          };
        }),
        setTTSVoice: (o) => r({ ttsVoice: o }),
        setTTSSpeed: (o) => r({ ttsSpeed: o }),
        // Reset language when switching providers, since language code formats differ
        // (e.g. browser-native uses BCP-47 "en-US", OpenAI Whisper uses ISO 639-1 "en")
        setASRProvider: (o) => r((n) => {
          var c;
          const i = ((c = Ke[o]) == null ? void 0 : c.supportedLanguages) || [], l = i.includes(n.asrLanguage);
          return {
            asrProviderId: o,
            ...l ? {} : { asrLanguage: i[0] || "auto" }
          };
        }),
        setASRLanguage: (o) => r({ asrLanguage: o }),
        setTTSProviderConfig: (o, n) => r((i) => ({
          ttsProvidersConfig: {
            ...i.ttsProvidersConfig,
            [o]: {
              ...i.ttsProvidersConfig[o],
              ...n
            }
          }
        })),
        setASRProviderConfig: (o, n) => r((i) => ({
          asrProvidersConfig: {
            ...i.asrProvidersConfig,
            [o]: {
              ...i.asrProvidersConfig[o],
              ...n
            }
          }
        })),
        // PDF actions
        setPDFProvider: (o) => r({ pdfProviderId: o }),
        setPDFProviderConfig: (o, n) => r((i) => ({
          pdfProvidersConfig: {
            ...i.pdfProvidersConfig,
            [o]: {
              ...i.pdfProvidersConfig[o],
              ...n
            }
          }
        })),
        // Image Generation actions
        setImageProvider: (o) => r({ imageProviderId: o }),
        setImageModelId: (o) => r({ imageModelId: o }),
        setImageProviderConfig: (o, n) => r((i) => ({
          imageProvidersConfig: {
            ...i.imageProvidersConfig,
            [o]: {
              ...i.imageProvidersConfig[o],
              ...n
            }
          }
        })),
        // Video Generation actions
        setVideoProvider: (o) => r({ videoProviderId: o }),
        setVideoModelId: (o) => r({ videoModelId: o }),
        setVideoProviderConfig: (o, n) => r((i) => ({
          videoProvidersConfig: {
            ...i.videoProvidersConfig,
            [o]: {
              ...i.videoProvidersConfig[o],
              ...n
            }
          }
        })),
        // Media generation toggle actions
        setImageGenerationEnabled: (o) => {
          if (o) {
            const n = f().imageProvidersConfig;
            if (!Object.values(n).some((l) => l.isServerConfigured || l.apiKey)) return;
          }
          r({ imageGenerationEnabled: o });
        },
        setVideoGenerationEnabled: (o) => {
          if (o) {
            const n = f().videoProvidersConfig;
            if (!Object.values(n).some((l) => l.isServerConfigured || l.apiKey)) return;
          }
          r({ videoGenerationEnabled: o });
        },
        setTTSEnabled: (o) => r({ ttsEnabled: o }),
        setASREnabled: (o) => r({ asrEnabled: o }),
        // Web Search actions
        setWebSearchProvider: (o) => r({ webSearchProviderId: o }),
        setWebSearchProviderConfig: (o, n) => r((i) => ({
          webSearchProvidersConfig: {
            ...i.webSearchProvidersConfig,
            [o]: {
              ...i.webSearchProvidersConfig[o],
              ...n
            }
          }
        })),
        // Fetch server-configured providers and merge into local state
        fetchServerProviders: async () => {
          try {
            const o = await fetch("/api/server-providers");
            if (!o.ok) return;
            const n = await o.json();
            r((i) => {
              var ve, ge, ce, ue, Pe, be, pe, Ce, Ie, me, Se, ye, he, Me, Ue, Ae, Ee;
              const l = { ...i.providersConfig };
              for (const s of Object.keys(l)) {
                const d = s;
                l[d] && (l[d] = {
                  ...l[d],
                  isServerConfigured: !1,
                  serverModels: void 0,
                  serverBaseUrl: void 0
                });
              }
              for (const [s, d] of Object.entries(n.providers)) {
                const a = s;
                if (l[a]) {
                  const S = l[a].models, I = (ve = d.models) != null && ve.length ? S.filter((xe) => d.models.includes(xe.id)) : S;
                  l[a] = {
                    ...l[a],
                    isServerConfigured: !0,
                    serverModels: d.models,
                    serverBaseUrl: d.baseUrl,
                    models: I
                  };
                }
              }
              const c = { ...i.ttsProvidersConfig };
              for (const s of Object.keys(c)) {
                const d = s;
                c[d] && (c[d] = {
                  ...c[d],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                });
              }
              for (const [s, d] of Object.entries(n.tts)) {
                const a = s;
                c[a] && (c[a] = {
                  ...c[a],
                  isServerConfigured: !0,
                  serverBaseUrl: d.baseUrl
                });
              }
              const P = { ...i.asrProvidersConfig };
              for (const s of Object.keys(P)) {
                const d = s;
                P[d] && (P[d] = {
                  ...P[d],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                });
              }
              for (const [s, d] of Object.entries(n.asr)) {
                const a = s;
                P[a] && (P[a] = {
                  ...P[a],
                  isServerConfigured: !0,
                  serverBaseUrl: d.baseUrl
                });
              }
              const b = { ...i.pdfProvidersConfig };
              for (const s of Object.keys(b)) {
                const d = s;
                b[d] && (b[d] = {
                  ...b[d],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                });
              }
              for (const [s, d] of Object.entries(n.pdf)) {
                const a = s;
                b[a] && (b[a] = {
                  ...b[a],
                  isServerConfigured: !0,
                  serverBaseUrl: d.baseUrl
                });
              }
              const p = { ...i.imageProvidersConfig };
              for (const s of Object.keys(p)) {
                const d = s;
                p[d] && (p[d] = {
                  ...p[d],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                });
              }
              for (const [s, d] of Object.entries(n.image)) {
                const a = s;
                p[a] && (p[a] = {
                  ...p[a],
                  isServerConfigured: !0,
                  serverBaseUrl: d.baseUrl
                });
              }
              const C = { ...i.videoProvidersConfig };
              for (const s of Object.keys(C)) {
                const d = s;
                C[d] && (C[d] = {
                  ...C[d],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                });
              }
              if (n.video)
                for (const [s, d] of Object.entries(n.video)) {
                  const a = s;
                  C[a] && (C[a] = {
                    ...C[a],
                    isServerConfigured: !0,
                    serverBaseUrl: d.baseUrl
                  });
                }
              const U = { ...i.webSearchProvidersConfig };
              for (const s of Object.keys(U))
                U[s] = {
                  ...U[s],
                  isServerConfigured: !1,
                  serverBaseUrl: void 0
                };
              if (n.webSearch)
                for (const [s, d] of Object.entries(n.webSearch)) {
                  const a = s;
                  U[a] && (U[a] = {
                    ...U[a],
                    isServerConfigured: !0,
                    serverBaseUrl: d.baseUrl
                  });
                }
              const A = (s) => [
                ...Object.entries(s).filter(([, d]) => d.isServerConfigured).map(([d]) => d),
                ...Object.entries(s).filter(([, d]) => !d.isServerConfigured && !!d.apiKey).map(([d]) => d)
              ], je = A(l), Be = A(c), Re = A(P), Fe = A(b), L = A(p), D = A(C), K = E(
                i.providerId,
                l,
                je
              ), T = E(
                i.ttsProviderId,
                c,
                Be,
                "browser-native-tts"
              ), oe = E(
                i.asrProviderId,
                P,
                Re,
                "browser-native"
              ), re = E(
                i.pdfProviderId,
                b,
                Fe,
                "unpdf"
              );
              let h = E(
                i.imageProviderId,
                p,
                L
              ), M = E(
                i.videoProviderId,
                C,
                D
              ), ie = "";
              if (!h && L.length > 0) {
                h = L[0];
                const s = (ge = k[h]) == null ? void 0 : ge.models;
                s != null && s.length && (ie = s[0].id);
              }
              let de = "";
              if (!M && D.length > 0) {
                M = D[0];
                const s = (ce = O[M]) == null ? void 0 : ce.models;
                s != null && s.length && (de = s[0].id);
              }
              const se = K ? Q(
                i.modelId,
                ((ue = l[K]) == null ? void 0 : ue.models) ?? []
              ) : "", ne = ((Pe = k[h]) == null ? void 0 : Pe.models) ?? [], te = h && (ie || Q(i.imageModelId, ne) || // validateModel('', ...) returns '' — fallback to first model when modelId is empty
              ((be = ne[0]) == null ? void 0 : be.id)) || "", ae = ((pe = O[M]) == null ? void 0 : pe.models) ?? [], le = M && (de || Q(i.videoModelId, ae) || ((Ce = ae[0]) == null ? void 0 : Ce.id)) || "", Ge = T !== i.ttsProviderId ? Y[T] || "default" : i.ttsVoice, Le = !h && i.imageGenerationEnabled, De = !M && i.videoGenerationEnabled;
              let j, fe, x, W, B, _, R, q, z, J;
              if (!i.autoConfigApplied) {
                (Ie = b.mineru) != null && Ie.isServerConfigured && i.pdfProviderId === "unpdf" && (W = "mineru");
                const s = Object.keys(n.tts);
                s.length > 0 && !((me = c[i.ttsProviderId]) != null && me.isServerConfigured) && (j = s[0], fe = Y[j] || "default");
                const d = Object.keys(n.asr);
                d.length > 0 && !((Se = P[i.asrProviderId]) != null && Se.isServerConfigured) && (x = d[0]);
                const a = Object.keys(n.image);
                if (a.length > 0 && !((ye = p[i.imageProviderId]) != null && ye.isServerConfigured)) {
                  B = a[0];
                  const I = (he = k[B]) == null ? void 0 : he.models;
                  I != null && I.length && (_ = I[0].id);
                }
                a.length > 0 && !i.imageGenerationEnabled && (z = !0);
                const S = Object.keys(n.video || {});
                if (S.length > 0 && !((Me = C[i.videoProviderId]) != null && Me.isServerConfigured)) {
                  R = S[0];
                  const I = (Ue = O[R]) == null ? void 0 : Ue.models;
                  I != null && I.length && (q = I[0].id);
                }
                S.length > 0 && !i.videoGenerationEnabled && (J = !0);
              }
              let N, H;
              if (!i.providerId && !i.modelId) {
                for (const [s, d] of Object.entries(l))
                  if (d.isServerConfigured) {
                    const a = d.serverModels, S = a != null && a.length ? a[0] : (Ee = (Ae = V[s]) == null ? void 0 : Ae.models[0]) == null ? void 0 : Ee.id;
                    if (S) {
                      N = s, H = S;
                      break;
                    }
                  }
              }
              return {
                providersConfig: l,
                ttsProvidersConfig: c,
                asrProvidersConfig: P,
                pdfProvidersConfig: b,
                imageProvidersConfig: p,
                videoProvidersConfig: C,
                webSearchProvidersConfig: U,
                autoConfigApplied: !0,
                // Validated selections
                ...K !== i.providerId && {
                  providerId: K
                },
                ...se !== i.modelId && { modelId: se },
                ...T !== i.ttsProviderId && {
                  ttsProviderId: T,
                  ttsVoice: Ge
                },
                ...oe !== i.asrProviderId && {
                  asrProviderId: oe
                },
                ...re !== i.pdfProviderId && {
                  pdfProviderId: re
                },
                ...h !== i.imageProviderId && {
                  imageProviderId: h
                },
                ...te !== i.imageModelId && {
                  imageModelId: te
                },
                ...M !== i.videoProviderId && {
                  videoProviderId: M
                },
                ...le !== i.videoModelId && {
                  videoModelId: le
                },
                ...Le && { imageGenerationEnabled: !1 },
                ...De && { videoGenerationEnabled: !1 },
                // First-run auto-select overrides validation (autoConfigApplied guard).
                // On first sync, auto-select picks the best provider. On subsequent syncs,
                // auto* variables stay undefined so only validation spreads take effect.
                ...W && { pdfProviderId: W },
                ...j && {
                  ttsProviderId: j,
                  ttsVoice: fe
                },
                ...x && { asrProviderId: x },
                ...B && {
                  imageProviderId: B
                },
                ..._ && { imageModelId: _ },
                ...R && {
                  videoProviderId: R
                },
                ...q && { videoModelId: q },
                ...z !== void 0 && {
                  imageGenerationEnabled: z
                },
                ...J !== void 0 && {
                  videoGenerationEnabled: J
                },
                ...N && { providerId: N },
                ...H && { modelId: H }
              };
            });
          } catch (o) {
            X.warn("Failed to fetch server providers:", o);
          }
        }
      };
    },
    {
      name: "settings-storage",
      version: 2,
      // Migrate persisted state
      migrate: (r, f) => {
        var v, u;
        const e = r;
        if (f === 0 && e.providerId === "openai" && e.modelId === "gpt-4o-mini" && (e.modelId = ""), ke(e), Oe(e), Ve(e), e.ttsModel && !e.ttsProviderId && (e.ttsModel === "openai-tts" ? e.ttsProviderId = "openai-tts" : e.ttsModel === "azure-tts" ? e.ttsProviderId = "azure-tts" : e.ttsProviderId = "openai-tts"), !e.ttsProvidersConfig || !e.asrProvidersConfig) {
          const t = Z();
          Object.assign(e, t);
        }
        if (e.ttsModelId) {
          const t = e.ttsProviderId;
          t && ((v = e.ttsProvidersConfig) != null && v[t]) && (e.ttsProvidersConfig[t].modelId = e.ttsModelId), delete e.ttsModelId;
        }
        if (e.asrModelId) {
          const t = e.asrProviderId;
          t && ((u = e.asrProvidersConfig) != null && u[t]) && (e.asrProvidersConfig[t].modelId = e.asrModelId), delete e.asrModelId;
        }
        for (const [, t] of Object.entries(
          e.ttsProvidersConfig || {}
        ))
          t.model && !t.modelId && (t.modelId = t.model, delete t.model);
        if (!e.pdfProvidersConfig) {
          const t = $();
          Object.assign(e, t);
        }
        if (!e.imageProvidersConfig) {
          const t = F();
          Object.assign(e, t);
        }
        if (!e.videoProvidersConfig) {
          const t = G();
          Object.assign(e, t);
        }
        if (f < 2 && (delete e.deepResearchProviderId, delete e.deepResearchProvidersConfig), e.imageGenerationEnabled === void 0 && (e.imageGenerationEnabled = !1), e.videoGenerationEnabled === void 0 && (e.videoGenerationEnabled = !1), e.ttsEnabled === void 0 && (e.ttsEnabled = !0), e.asrEnabled === void 0 && (e.asrEnabled = !0), e.autoConfigApplied === void 0 && (e.autoConfigApplied = !0), e.agentMode === void 0 && (e.agentMode = "preset"), e.autoAgentCount === void 0 && (e.autoAgentCount = 3), !e.webSearchProvidersConfig) {
          const t = e, g = t.webSearchApiKey || "", y = t.webSearchIsServerConfigured || !1;
          e.webSearchProviderId = "tavily", e.webSearchProvidersConfig = {
            tavily: {
              apiKey: g,
              baseUrl: "",
              enabled: !0,
              isServerConfigured: y
            }
          }, delete t.webSearchApiKey, delete t.webSearchIsServerConfigured;
        }
        return we(e), e;
      },
      // Custom merge: always sync built-in providers on every rehydrate,
      // so newly added providers/models appear without clearing cache.
      merge: (r, f) => {
        const e = { ...f, ...r };
        return ke(e), Oe(e), Ve(e), we(e), e;
      }
    }
  )
);
export {
  no as PLAYBACK_SPEEDS,
  to as useSettingsStore
};
//# sourceMappingURL=settings.js.map
