import { generateWithSeedream as r } from "./adapters/seedream-adapter.js";
import { generateWithQwenImage as n } from "./adapters/qwen-image-adapter.js";
import { generateWithNanoBanana as t } from "./adapters/nano-banana-adapter.js";
import { generateWithMiniMaxImage as o } from "./adapters/minimax-image-adapter.js";
import { generateWithGrokImage as s } from "./adapters/grok-image-adapter.js";
const I = {
  seedream: {
    id: "seedream",
    name: "Seedream",
    requiresApiKey: !0,
    defaultBaseUrl: "https://ark.cn-beijing.volces.com",
    models: [
      { id: "doubao-seedream-5-0-260128", name: "Seedream 5.0 Lite" },
      { id: "doubao-seedream-4-5-251128", name: "Seedream 4.5" },
      { id: "doubao-seedream-4-0-250828", name: "Seedream 4.0" },
      { id: "doubao-seedream-3-0-t2i-250415", name: "Seedream 3.0" }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16"]
  },
  "qwen-image": {
    id: "qwen-image",
    name: "Qwen Image",
    requiresApiKey: !0,
    defaultBaseUrl: "https://dashscope.aliyuncs.com",
    models: [
      { id: "qwen-image-max", name: "Qwen Image Max" },
      { id: "qwen-image-max-2025-12-30", name: "Qwen Image Max (2025-12-30)" },
      { id: "qwen-image-plus", name: "Qwen Image Plus" },
      {
        id: "qwen-image-plus-2026-01-09",
        name: "Qwen Image Plus (2026-01-09)"
      },
      { id: "qwen-image", name: "Qwen Image" },
      { id: "z-image-turbo", name: "Z-Image Turbo" }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16"]
  },
  "nano-banana": {
    id: "nano-banana",
    name: "Nano Banana (Gemini)",
    requiresApiKey: !0,
    defaultBaseUrl: "https://generativelanguage.googleapis.com",
    models: [
      {
        id: "gemini-3.1-flash-image-preview",
        name: "Gemini 3.1 Flash Image (Nano Banana 2)"
      },
      {
        id: "gemini-3-pro-image-preview",
        name: "Gemini 3 Pro Image (Nano Banana Pro)"
      },
      {
        id: "gemini-2.5-flash-image",
        name: "Gemini 2.5 Flash Image (Nano Banana)"
      }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1"]
  },
  "minimax-image": {
    id: "minimax-image",
    name: "MiniMax Image",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api.minimaxi.com",
    models: [
      { id: "image-01", name: "Image 01" },
      { id: "image-01-live", name: "Image 01 Live" }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16"]
  },
  "grok-image": {
    id: "grok-image",
    name: "Grok Image (xAI)",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api.x.ai/v1",
    models: [
      { id: "grok-imagine-image", name: "Grok Imagine Image" },
      { id: "grok-imagine-image-pro", name: "Grok Imagine Image Pro" }
    ],
    supportedAspectRatios: ["16:9", "4:3", "1:1", "9:16"]
  }
};
async function h(a, e) {
  switch (a.providerId) {
    case "seedream":
      return r(a, e);
    case "qwen-image":
      return n(a, e);
    case "nano-banana":
      return t(a, e);
    case "minimax-image":
      return o(a, e);
    case "grok-image":
      return s(a, e);
    default:
      throw new Error(`Unsupported image provider: ${a.providerId}`);
  }
}
function w(a, e = 1024) {
  const [i, m] = a.split(":").map(Number);
  return !i || !m ? { width: e, height: Math.round(e * 9 / 16) } : { width: e, height: Math.round(e * m / i) };
}
export {
  I as IMAGE_PROVIDERS,
  w as aspectRatioToDimensions,
  h as generateImage
};
//# sourceMappingURL=image-providers.js.map
