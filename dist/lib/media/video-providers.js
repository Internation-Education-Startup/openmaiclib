import { generateWithSeedance as a } from "./adapters/seedance-adapter.js";
import { generateWithKling as r } from "./adapters/kling-adapter.js";
import { generateWithVeo as s } from "./adapters/veo-adapter.js";
import { generateWithMiniMaxVideo as n } from "./adapters/minimax-video-adapter.js";
import { generateWithGrokVideo as d } from "./adapters/grok-video-adapter.js";
const p = {
  seedance: {
    id: "seedance",
    name: "Seedance",
    requiresApiKey: !0,
    defaultBaseUrl: "https://ark.cn-beijing.volces.com",
    models: [
      { id: "doubao-seedance-1-5-pro-251215", name: "Seedance 1.5 Pro" },
      { id: "doubao-seedance-1-0-pro-250528", name: "Seedance 1.0 Pro" },
      {
        id: "doubao-seedance-1-0-pro-fast-251015",
        name: "Seedance 1.0 Pro Fast"
      },
      {
        id: "doubao-seedance-1-0-lite-t2v-250428",
        name: "Seedance 1.0 Lite T2V"
      }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16", "3:4", "21:9"],
    supportedDurations: [5, 10],
    supportedResolutions: ["480p", "720p", "1080p"],
    maxDuration: 10
  },
  kling: {
    id: "kling",
    name: "Kling",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api-beijing.klingai.com",
    models: [
      { id: "kling-v2-6", name: "Kling V2.6" },
      { id: "kling-v1-6", name: "Kling V1.6" }
    ],
    supportedAspectRatios: ["16:9", "1:1", "9:16"],
    supportedDurations: [5, 10],
    maxDuration: 10
  },
  veo: {
    id: "veo",
    name: "Veo",
    requiresApiKey: !0,
    defaultBaseUrl: "https://generativelanguage.googleapis.com",
    models: [
      { id: "veo-3.1-fast-generate-001", name: "Veo 3.1 Fast" },
      { id: "veo-3.1-generate-001", name: "Veo 3.1" },
      { id: "veo-3.0-fast-generate-001", name: "Veo 3.0 Fast" },
      { id: "veo-3.0-generate-001", name: "Veo 3.0" },
      { id: "veo-2.0-generate-001", name: "Veo 2.0" }
    ],
    supportedAspectRatios: ["16:9", "1:1", "9:16"],
    supportedDurations: [8],
    supportedResolutions: ["720p"],
    maxDuration: 8
  },
  sora: {
    id: "sora",
    name: "Sora",
    requiresApiKey: !0,
    models: [],
    supportedAspectRatios: ["16:9", "1:1", "9:16"],
    maxDuration: 20
  },
  "minimax-video": {
    id: "minimax-video",
    name: "MiniMax Video",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api.minimaxi.com",
    models: [
      { id: "MiniMax-Hailuo-2.3", name: "Hailuo 2.3" },
      { id: "MiniMax-Hailuo-2.3-Fast", name: "Hailuo 2.3 Fast" },
      { id: "MiniMax-Hailuo-02", name: "Hailuo 02" },
      { id: "T2V-01-Director", name: "T2V-01 Director" },
      { id: "T2V-01", name: "T2V-01" }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16"],
    supportedDurations: [6, 10],
    supportedResolutions: ["720p", "1080p"],
    maxDuration: 10
  },
  "grok-video": {
    id: "grok-video",
    name: "Grok Video (xAI)",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api.x.ai/v1",
    models: [{ id: "grok-imagine-video", name: "Grok Imagine Video" }],
    supportedAspectRatios: ["16:9", "1:1", "9:16"],
    supportedDurations: [6],
    maxDuration: 6
  }
};
function v(o, t) {
  const e = p[o];
  if (!e) return t;
  const i = { ...t };
  return e.supportedDurations && e.supportedDurations.length > 0 && (!i.duration || !e.supportedDurations.includes(i.duration)) && (i.duration = e.supportedDurations[0]), e.supportedAspectRatios && e.supportedAspectRatios.length > 0 && (!i.aspectRatio || !e.supportedAspectRatios.includes(i.aspectRatio)) && (i.aspectRatio = i.aspectRatio && e.supportedAspectRatios.includes(i.aspectRatio) ? i.aspectRatio : e.supportedAspectRatios[0]), e.supportedResolutions && e.supportedResolutions.length > 0 && (!i.resolution || !e.supportedResolutions.includes(i.resolution)) && (i.resolution = e.supportedResolutions[0]), i;
}
async function R(o, t) {
  switch (o.providerId) {
    case "seedance":
      return a(o, t);
    case "kling":
      return r(o, t);
    case "veo":
      return s(o, t);
    case "minimax-video":
      return n(o, t);
    case "grok-video":
      return d(o, t);
    default:
      throw new Error(`Unsupported video provider: ${o.providerId}`);
  }
}
export {
  p as VIDEO_PROVIDERS,
  R as generateVideo,
  v as normalizeVideoOptions
};
//# sourceMappingURL=video-providers.js.map
