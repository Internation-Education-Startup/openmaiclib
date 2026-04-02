import { createOpenAI as h } from "@ai-sdk/openai";
import { createAnthropic as x } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI as k } from "@ai-sdk/google";
import { createLogger as M } from "../logger.js";
const y = M("AIProviders"), w = {
  openai: {
    id: "openai",
    name: "OpenAI",
    type: "openai",
    defaultBaseUrl: "https://api.openai.com/v1",
    requiresApiKey: !0,
    icon: "/logos/openai.svg",
    models: [
      {
        id: "gpt-5.2",
        name: "GPT-5.2",
        contextWindow: 4e5,
        outputWindow: 128e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "gpt-5.1",
        name: "GPT-5.1",
        contextWindow: 4e5,
        outputWindow: 128e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "gpt-5",
        name: "GPT-5",
        contextWindow: 4e5,
        outputWindow: 128e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gpt-5-mini",
        name: "GPT-5-mini",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gpt-5-nano",
        name: "GPT-5-nano",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gpt-4o",
        name: "GPT-4o",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "gpt-4o-mini",
        name: "GPT-4o-mini",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "gpt-4-turbo",
        name: "GPT-4-turbo",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "o4-mini",
        name: "o4-mini",
        contextWindow: 2e5,
        outputWindow: 1e5,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "o3",
        name: "o3",
        contextWindow: 2e5,
        outputWindow: 1e5,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "o3-mini",
        name: "o3-mini",
        contextWindow: 2e5,
        outputWindow: 1e5,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "o1",
        name: "o1",
        contextWindow: 2e5,
        outputWindow: 1e5,
        capabilities: {
          streaming: !0,
          tools: !1,
          vision: !1,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      }
    ]
  },
  anthropic: {
    id: "anthropic",
    name: "Claude",
    type: "anthropic",
    requiresApiKey: !0,
    defaultBaseUrl: "https://api.anthropic.com/v1",
    icon: "/logos/claude.svg",
    models: [
      {
        id: "claude-opus-4-6",
        name: "Claude Opus 4.6",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "claude-sonnet-4-6",
        name: "Claude Sonnet 4.6",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "claude-sonnet-4-5",
        name: "Claude Sonnet 4.5",
        contextWindow: 2e5,
        outputWindow: 64e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "claude-haiku-4-5",
        name: "Claude Haiku 4.5",
        contextWindow: 2e5,
        outputWindow: 64e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      }
    ]
  },
  google: {
    id: "google",
    name: "Gemini",
    type: "google",
    requiresApiKey: !0,
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
    icon: "/logos/gemini.svg",
    models: [
      {
        id: "gemini-3.1-pro-preview",
        name: "Gemini 3.1 Pro Preview",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gemini-3-pro-preview",
        name: "Gemini 3 Pro Preview",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gemini-3-flash-preview",
        name: "Gemini 3 Flash Preview",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gemini-2.5-flash",
        name: "Gemini 2.5 Flash",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "gemini-2.5-flash-lite",
        name: "Gemini 2.5 Flash Lite",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !0,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "gemini-2.5-pro",
        name: "Gemini 2.5 Pro",
        contextWindow: 1048576,
        outputWindow: 65536,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !0,
            defaultEnabled: !0
          }
        }
      }
    ]
  },
  glm: {
    id: "glm",
    name: "GLM",
    type: "openai",
    defaultBaseUrl: "https://open.bigmodel.cn/api/paas/v4",
    requiresApiKey: !0,
    icon: "/logos/glm.svg",
    models: [
      // GLM-5 Series - Latest flagship model
      {
        id: "glm-5",
        name: "GLM-5",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      // GLM-4.7 Series
      {
        id: "glm-4.7",
        name: "GLM-4.7",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4.7-flashx",
        name: "GLM-4.7-FlashX",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4.7-flash",
        name: "GLM-4.7-Flash",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      // GLM-4.6 Series - Advanced coding & reasoning
      {
        id: "glm-4.6",
        name: "GLM-4.6",
        contextWindow: 2e5,
        outputWindow: 128e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4.6v",
        name: "GLM-4.6V",
        contextWindow: 128e3,
        outputWindow: 32e3,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "glm-4.6v-flash",
        name: "GLM-4.6V-Flash",
        contextWindow: 128e3,
        outputWindow: 32e3,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      // GLM-4.5 Series - Cost-effective models
      {
        id: "glm-4.5-air",
        name: "GLM-4.5-Air",
        contextWindow: 128e3,
        outputWindow: 96e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4.5-airx",
        name: "GLM-4.5-AirX",
        contextWindow: 128e3,
        outputWindow: 96e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4.5-flash",
        name: "GLM-4.5-Flash",
        contextWindow: 128e3,
        outputWindow: 96e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "glm-4-long",
        name: "GLM-4-Long",
        contextWindow: 1e6,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      }
    ]
  },
  qwen: {
    id: "qwen",
    name: "Qwen",
    type: "openai",
    defaultBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    requiresApiKey: !0,
    icon: "/logos/qwen.svg",
    models: [
      {
        id: "qwen3.5-flash",
        name: "Qwen3.5 Flash",
        contextWindow: 1e6,
        outputWindow: 65536,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "qwen3.5-plus",
        name: "Qwen3.5 Plus",
        contextWindow: 1e6,
        outputWindow: 65536,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "qwen3-max",
        name: "Qwen3 Max",
        contextWindow: 262144,
        outputWindow: 65536,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "qwen3-vl-plus",
        name: "Qwen3 VL Plus",
        contextWindow: 262144,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      }
    ]
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    type: "openai",
    defaultBaseUrl: "https://api.deepseek.com/v1",
    requiresApiKey: !0,
    icon: "/logos/deepseek.svg",
    models: [
      {
        id: "deepseek-chat",
        name: "DeepSeek-Chat",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !1,
            defaultEnabled: !1
          }
        }
      },
      {
        id: "deepseek-reasoner",
        name: "DeepSeek-Reasoner",
        contextWindow: 128e3,
        outputWindow: 32e3,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      }
    ]
  },
  kimi: {
    id: "kimi",
    name: "Kimi",
    type: "openai",
    defaultBaseUrl: "https://api.moonshot.cn/v1",
    requiresApiKey: !0,
    icon: "/logos/kimi.png",
    models: [
      // K2.5 Series (2026) - 1T MoE, 32B active parameters
      {
        id: "kimi-k2.5",
        name: "Kimi K2.5",
        contextWindow: 256e3,
        outputWindow: 8192,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "kimi-k2-0905-preview",
        name: "Kimi K2 0905 Preview",
        contextWindow: 256e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "kimi-k2-thinking",
        name: "Kimi K2 Thinking",
        contextWindow: 256e3,
        outputWindow: 8192,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1,
          thinking: {
            toggleable: !0,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "kimi-k2-turbo-preview",
        name: "Kimi K2 Turbo Preview",
        contextWindow: 256e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "moonshot-v1-128k",
        name: "Moonshot V1 128K",
        contextWindow: 128e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "moonshot-v1-32k",
        name: "Moonshot V1 32K",
        contextWindow: 32e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "moonshot-v1-8k",
        name: "Moonshot V1 8K",
        contextWindow: 8e3,
        outputWindow: 4096,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      }
    ]
  },
  minimax: {
    id: "minimax",
    name: "MiniMax",
    type: "anthropic",
    defaultBaseUrl: "https://api.minimaxi.com/anthropic/v1",
    requiresApiKey: !0,
    icon: "/logos/minimax.svg",
    models: [
      {
        id: "MiniMax-M2",
        name: "MiniMax M2",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.1",
        name: "MiniMax M2.1",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.1-highspeed",
        name: "MiniMax M2.1 Highspeed",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.5",
        name: "MiniMax M2.5",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.5-highspeed",
        name: "MiniMax M2.5 Highspeed",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.7",
        name: "MiniMax M2.7",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "MiniMax-M2.7-highspeed",
        name: "MiniMax M2.7 Highspeed",
        contextWindow: 204800,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      }
    ]
  },
  siliconflow: {
    id: "siliconflow",
    name: "硅基流动",
    type: "openai",
    defaultBaseUrl: "https://api.siliconflow.cn/v1",
    requiresApiKey: !0,
    icon: "/logos/siliconflow.svg",
    models: [
      // DeepSeek Series
      {
        id: "deepseek-ai/DeepSeek-V3.2",
        name: "DeepSeek-V3.2",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "deepseek-ai/DeepSeek-V3",
        name: "DeepSeek-V3",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "deepseek-ai/DeepSeek-R1",
        name: "DeepSeek-R1",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
        name: "DeepSeek-R1-Distill-Qwen-7B",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      // Qwen Series
      {
        id: "Qwen/Qwen2.5-72B-Instruct",
        name: "Qwen2.5-72B-Instruct",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "Qwen/Qwen2.5-Coder-7B-Instruct",
        name: "Qwen2.5-Coder-7B-Instruct",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "Qwen/Qwen2.5-7B-Instruct",
        name: "Qwen2.5-7B-Instruct",
        contextWindow: 128e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "Qwen/Qwen3-VL-32B-Instruct",
        name: "Qwen3-VL-32B-Instruct",
        contextWindow: 256e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      // MiniMax Series
      {
        id: "MiniMaxAI/MiniMax-M2",
        name: "MiniMax-M2",
        contextWindow: 204800,
        outputWindow: 131072,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      // Kimi Series
      {
        id: "Pro/moonshotai/Kimi-K2.5",
        name: "Kimi-K2.5",
        contextWindow: 256e3,
        outputWindow: 96e3,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      // GLM Series
      {
        id: "THUDM/GLM-Z1-Rumination-32B-0414",
        name: "GLM-Z1-Rumination-32B",
        contextWindow: 32e3,
        outputWindow: 16384,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "THUDM/GLM-4.1V-9B-Thinking",
        name: "GLM-4.1V-9B-Thinking",
        contextWindow: 64e3,
        outputWindow: 8192,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      }
    ]
  },
  doubao: {
    id: "doubao",
    name: "豆包",
    type: "openai",
    defaultBaseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    requiresApiKey: !0,
    icon: "/logos/doubao.svg",
    models: [
      {
        id: "doubao-seed-2-0-pro-260215",
        name: "Doubao Seed 2.0 Pro",
        contextWindow: 128e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "doubao-seed-2-0-lite-260215",
        name: "Doubao Seed 2.0 Lite",
        contextWindow: 128e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "doubao-seed-2-0-mini-260215",
        name: "Doubao Seed 2.0 Mini",
        contextWindow: 128e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "doubao-seed-1-8-251228",
        name: "Doubao Seed 1.8",
        contextWindow: 128e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      }
    ]
  },
  grok: {
    id: "grok",
    name: "Grok",
    type: "openai",
    defaultBaseUrl: "https://api.x.ai/v1",
    requiresApiKey: !0,
    icon: "/logos/grok.svg",
    models: [
      {
        id: "grok-4.20-beta-0309-reasoning",
        name: "Grok 4.20 Reasoning",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "grok-4.20-beta-0309-non-reasoning",
        name: "Grok 4.20",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "grok-code-fast-1",
        name: "Grok Code Fast",
        contextWindow: 256e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "grok-4-fast-reasoning",
        name: "Grok 4 Fast Reasoning",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "grok-4-fast-non-reasoning",
        name: "Grok 4 Fast",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "grok-4-1-fast-reasoning",
        name: "Grok 4.1 Fast Reasoning",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !0,
          thinking: {
            toggleable: !1,
            budgetAdjustable: !1,
            defaultEnabled: !0
          }
        }
      },
      {
        id: "grok-4-1-fast-non-reasoning",
        name: "Grok 4.1 Fast",
        contextWindow: 2e6,
        outputWindow: 131072,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "grok-4-0709",
        name: "Grok 4",
        contextWindow: 256e3,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !0 }
      },
      {
        id: "grok-3",
        name: "Grok 3",
        contextWindow: 131072,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      },
      {
        id: "grok-3-mini",
        name: "Grok 3 Mini",
        contextWindow: 131072,
        outputWindow: 32768,
        capabilities: { streaming: !0, tools: !0, vision: !1 }
      }
    ]
  }
};
function f(e) {
  if (w[e])
    return w[e];
  if (typeof window < "u")
    try {
      const t = localStorage.getItem("providersConfig");
      if (t) {
        const o = JSON.parse(t)[e];
        if (o)
          return {
            id: e,
            name: o.name,
            type: o.type,
            defaultBaseUrl: o.defaultBaseUrl,
            icon: o.icon,
            requiresApiKey: o.requiresApiKey,
            models: o.models
          };
      }
    } catch (t) {
      y.error("Failed to load provider config:", t);
    }
  return null;
}
function A(e, t) {
  if (t.enabled === !1)
    switch (e) {
      // Kimi / DeepSeek / GLM use { thinking: { type: "disabled" } }
      case "kimi":
      case "deepseek":
      case "glm":
        return { thinking: { type: "disabled" } };
      // Qwen / SiliconFlow use { enable_thinking: false }
      case "qwen":
      case "siliconflow":
        return { enable_thinking: !1 };
      default:
        return;
    }
  if (t.enabled === !0)
    switch (e) {
      case "kimi":
      case "deepseek":
      case "glm":
        return { thinking: { type: "enabled" } };
      case "qwen":
      case "siliconflow":
        return { enable_thinking: !0 };
      default:
        return;
    }
}
function G(e, t) {
  if (e !== "minimax" || !t)
    return t;
  const a = t.replace(/\/$/, "");
  return a.endsWith("/anthropic/v1") ? a : a.endsWith("/anthropic") ? `${a}/v1` : `${a}/anthropic/v1`;
}
function j(e) {
  let t = e.providerType, a = e.requiresApiKey ?? !0;
  if (!t) {
    const i = f(e.providerId);
    if (i)
      t = i.type, a = i.requiresApiKey;
    else
      throw new Error(`Unknown provider: ${e.providerId}. Please provide providerType.`);
  }
  if (a && !e.apiKey)
    throw new Error(`API key required for provider: ${e.providerId}`);
  const o = e.apiKey || "", u = f(e.providerId), p = G(
    e.providerId,
    e.baseUrl || (u == null ? void 0 : u.defaultBaseUrl) || void 0
  );
  let r;
  switch (t) {
    case "openai": {
      const i = {
        apiKey: o,
        baseURL: p
      };
      if (e.providerId !== "openai") {
        const g = e.providerId;
        i.fetch = async (m, n) => {
          var d;
          const s = globalThis.__thinkingContext, l = (d = s == null ? void 0 : s.getStore) == null ? void 0 : d.call(s);
          if (l && (n != null && n.body) && typeof n.body == "string") {
            const c = A(g, l);
            if (c)
              try {
                const b = JSON.parse(n.body);
                Object.assign(b, c), n = { ...n, body: JSON.stringify(b) };
              } catch {
              }
          }
          return globalThis.fetch(m, n);
        };
      }
      r = h(i).chat(e.modelId);
      break;
    }
    case "anthropic": {
      r = x({
        apiKey: o,
        baseURL: p
      }).chat(e.modelId);
      break;
    }
    case "google": {
      const i = {
        apiKey: o,
        baseURL: p
      };
      if (e.proxy) {
        const { ProxyAgent: g, fetch: m } = require("undici"), n = new g(e.proxy);
        i.fetch = ((s, l) => m(s, {
          ...l,
          dispatcher: n
        }).then((d) => d));
      }
      r = k(i).chat(e.modelId);
      break;
    }
    default:
      throw new Error(`Unsupported provider type: ${t}`);
  }
  const W = (u == null ? void 0 : u.models.find((i) => i.id === e.modelId)) || null;
  return { model: r, modelInfo: W };
}
function q(e) {
  const t = e.indexOf(":");
  return t > 0 ? {
    providerId: e.slice(0, t),
    modelId: e.slice(t + 1)
  } : {
    providerId: "openai",
    modelId: e
  };
}
export {
  w as PROVIDERS,
  j as getModel,
  q as parseModelString
};
//# sourceMappingURL=providers.js.map
