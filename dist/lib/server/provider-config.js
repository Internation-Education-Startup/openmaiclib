import l from "fs";
import A from "path";
import g from "js-yaml";
import { createLogger as _ } from "../logger.js";
const b = _("ServerProviderConfig"), S = {
  OPENAI: "openai",
  ANTHROPIC: "anthropic",
  GOOGLE: "google",
  DEEPSEEK: "deepseek",
  QWEN: "qwen",
  KIMI: "kimi",
  MINIMAX: "minimax",
  GLM: "glm",
  SILICONFLOW: "siliconflow",
  DOUBAO: "doubao",
  GROK: "grok"
}, I = {
  TTS_OPENAI: "openai-tts",
  TTS_AZURE: "azure-tts",
  TTS_GLM: "glm-tts",
  TTS_QWEN: "qwen-tts",
  TTS_DOUBAO: "doubao-tts",
  TTS_ELEVENLABS: "elevenlabs-tts",
  TTS_MINIMAX: "minimax-tts"
}, O = {
  ASR_OPENAI: "openai-whisper",
  ASR_QWEN: "qwen-asr"
}, m = {
  PDF_UNPDF: "unpdf",
  PDF_MINERU: "mineru"
}, M = {
  IMAGE_SEEDREAM: "seedream",
  IMAGE_QWEN_IMAGE: "qwen-image",
  IMAGE_NANO_BANANA: "nano-banana",
  IMAGE_MINIMAX: "minimax-image",
  IMAGE_GROK: "grok-image"
}, P = {
  VIDEO_SEEDANCE: "seedance",
  VIDEO_KLING: "kling",
  VIDEO_VEO: "veo",
  VIDEO_SORA: "sora",
  VIDEO_MINIMAX: "minimax-video",
  VIDEO_GROK: "grok-video"
}, U = {
  TAVILY: "tavily"
};
function y(o) {
  try {
    const e = A.join(process.cwd(), o);
    if (!l.existsSync(e)) return {};
    const r = l.readFileSync(e, "utf-8"), t = g.load(r);
    return !t || typeof t != "object" ? {} : t;
  } catch (e) {
    return b.warn(`[ServerProviderConfig] Failed to load ${o}:`, e), {};
  }
}
function i(o, e, { requiresBaseUrl: r = !1 } = {}) {
  const t = {};
  if (e)
    for (const [a, n] of Object.entries(e)) {
      const c = !!(n != null && n.apiKey), f = !!(n != null && n.baseUrl);
      (r ? f : c) && (t[a] = {
        apiKey: n.apiKey || "",
        baseUrl: n.baseUrl,
        models: n.models,
        proxy: n.proxy
      });
    }
  for (const [a, n] of Object.entries(o)) {
    const c = process.env[`${a}_API_KEY`] || void 0, f = process.env[`${a}_BASE_URL`] || void 0, d = process.env[`${a}_MODELS`], u = d ? d.split(",").map((E) => E.trim()).filter(Boolean) : void 0;
    if (t[n]) {
      c && (t[n].apiKey = c), f && (t[n].baseUrl = f), u && (t[n].models = u);
      continue;
    }
    (r ? !f : !c) || (t[n] = {
      apiKey: c || "",
      baseUrl: f,
      models: u
    });
  }
  return t;
}
const v = "server-providers.yml", p = /* @__PURE__ */ new Map();
function N(o) {
  return {
    providers: i(S, o.providers),
    tts: i(I, o.tts),
    asr: i(O, o.asr),
    pdf: i(m, o.pdf, { requiresBaseUrl: !0 }),
    image: i(M, o.image),
    video: i(P, o.video),
    webSearch: i(U, o["web-search"])
  };
}
function T(o, e) {
  const r = [
    Object.keys(o.providers).length,
    Object.keys(o.tts).length,
    Object.keys(o.asr).length,
    Object.keys(o.pdf).length,
    Object.keys(o.image).length,
    Object.keys(o.video).length,
    Object.keys(o.webSearch).length
  ];
  r.some((t) => t > 0) && b.info(
    `[ServerProviderConfig] Loaded (${e}): ${r[0]} LLM, ${r[1]} TTS, ${r[2]} ASR, ${r[3]} PDF, ${r[4]} Image, ${r[5]} Video, ${r[6]} WebSearch providers`
  );
}
function s() {
  const o = p.get("");
  if (o) return o;
  const e = y(v), r = N(e);
  return T(r, v), p.set("", r), r;
}
function j() {
  const o = s(), e = {};
  for (const [r, t] of Object.entries(o.providers))
    e[r] = {}, t.models && t.models.length > 0 && (e[r].models = t.models), t.baseUrl && (e[r].baseUrl = t.baseUrl);
  return e;
}
function D(o, e) {
  var r;
  return e || ((r = s().providers[o]) == null ? void 0 : r.apiKey) || "";
}
function k(o, e) {
  var r;
  return e || ((r = s().providers[o]) == null ? void 0 : r.baseUrl);
}
function w(o) {
  var e;
  return (e = s().providers[o]) == null ? void 0 : e.proxy;
}
function G() {
  const o = s(), e = {};
  for (const [r, t] of Object.entries(o.tts))
    e[r] = {}, t.baseUrl && (e[r].baseUrl = t.baseUrl);
  return e;
}
function R(o, e) {
  var r;
  return e || ((r = s().tts[o]) == null ? void 0 : r.apiKey) || "";
}
function F(o, e) {
  var r;
  return e || ((r = s().tts[o]) == null ? void 0 : r.baseUrl);
}
function $() {
  const o = s(), e = {};
  for (const [r, t] of Object.entries(o.asr))
    e[r] = {}, t.baseUrl && (e[r].baseUrl = t.baseUrl);
  return e;
}
function x() {
  const o = s(), e = {};
  for (const [r, t] of Object.entries(o.pdf))
    e[r] = {}, t.baseUrl && (e[r].baseUrl = t.baseUrl);
  return e;
}
function C(o, e) {
  var r;
  return e || ((r = s().pdf[o]) == null ? void 0 : r.apiKey) || "";
}
function W(o, e) {
  var r;
  return e || ((r = s().pdf[o]) == null ? void 0 : r.baseUrl);
}
function B() {
  const o = s(), e = {};
  for (const r of Object.keys(o.image))
    e[r] = {};
  return e;
}
function Y(o, e) {
  var r;
  return e || ((r = s().image[o]) == null ? void 0 : r.apiKey) || "";
}
function q(o, e) {
  var r;
  return e || ((r = s().image[o]) == null ? void 0 : r.baseUrl);
}
function Q() {
  const o = s(), e = {};
  for (const r of Object.keys(o.video))
    e[r] = {};
  return e;
}
function X(o, e) {
  var r;
  return e || ((r = s().video[o]) == null ? void 0 : r.apiKey) || "";
}
function H(o, e) {
  var r;
  return e || ((r = s().video[o]) == null ? void 0 : r.baseUrl);
}
function z() {
  const o = s(), e = {};
  for (const [r, t] of Object.entries(o.webSearch))
    e[r] = {}, t.baseUrl && (e[r].baseUrl = t.baseUrl);
  return e;
}
function Z(o) {
  var r;
  if (o) return o;
  const e = (r = s().webSearch.tavily) == null ? void 0 : r.apiKey;
  return e || process.env.TAVILY_API_KEY || "";
}
export {
  $ as getServerASRProviders,
  B as getServerImageProviders,
  x as getServerPDFProviders,
  j as getServerProviders,
  G as getServerTTSProviders,
  Q as getServerVideoProviders,
  z as getServerWebSearchProviders,
  D as resolveApiKey,
  k as resolveBaseUrl,
  Y as resolveImageApiKey,
  q as resolveImageBaseUrl,
  C as resolvePDFApiKey,
  W as resolvePDFBaseUrl,
  w as resolveProxy,
  R as resolveTTSApiKey,
  F as resolveTTSBaseUrl,
  X as resolveVideoApiKey,
  H as resolveVideoBaseUrl,
  Z as resolveWebSearchApiKey
};
//# sourceMappingURL=provider-config.js.map
