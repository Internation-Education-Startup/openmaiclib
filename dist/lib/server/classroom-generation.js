import { nanoid as j } from "nanoid";
import { callLLM as J } from "../ai/llm.js";
import { createStageAPI as Y } from "../api/stage-api.js";
import { generateSceneOutlinesFromRequirements as V, applyOutlineFallbacks as B } from "../generation/outline-generator.js";
import { generateSceneContent as H, generateSceneActions as Q, createSceneWithActions as X } from "../generation/scene-generator.js";
import { formatTeacherPersonaForPrompt as Z } from "../generation/prompt-formatters.js";
import { getDefaultAgents as U } from "../orchestration/registry/store.js";
import { createLogger as ee } from "../logger.js";
import { parseModelString as te } from "../ai/providers.js";
import { resolveApiKey as ne, resolveWebSearchApiKey as re } from "./provider-config.js";
import { resolveModel as ae } from "./resolve-model.js";
import { searchWithTavily as se, formatSearchResultsAsContext as oe } from "../web-search/tavily.js";
import { persistClassroom as ie } from "./classroom-storage.js";
import { generateMediaForClassroom as ce, replaceMediaPlaceholders as le, generateTTSForClassroom as ge } from "./classroom-media-generation.js";
const t = ee("Classroom");
function de(n) {
  let e = {
    stage: n,
    scenes: [],
    currentSceneId: null,
    mode: "playback"
  };
  const s = [];
  return {
    getState: () => e,
    setState: (i) => {
      const g = e;
      e = { ...e, ...i }, s.forEach((u) => u(e, g));
    },
    subscribe: (i) => (s.push(i), () => {
      const g = s.indexOf(i);
      g >= 0 && s.splice(g, 1);
    })
  };
}
function me(n) {
  return n === "en-US" ? "en-US" : "zh-CN";
}
function ue(n) {
  let e = n.trim();
  return e.startsWith("```") && (e = e.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "")), e.trim();
}
async function he(n, e, s) {
  var h;
  const i = "You are an expert instructional designer. Generate agent profiles for a multi-agent classroom simulation. Return ONLY valid JSON, no markdown or explanation.", g = `Generate agent profiles for a course with this requirement:
${n}

Requirements:
- Decide the appropriate number of agents based on the course content (typically 3-5)
- Exactly 1 agent must have role "teacher", the rest can be "assistant" or "student"
- Each agent needs: name, role, persona (2-3 sentences describing personality and teaching/learning style)
- Names and personas must be in language: ${e}

Return a JSON object with this exact structure:
{
  "agents": [
    {
      "name": "string",
      "role": "teacher" | "assistant" | "student",
      "persona": "string (2-3 sentences)"
    }
  ]
}`, u = await s(i, g), S = ue(u), c = JSON.parse(S);
  if (!c.agents || !Array.isArray(c.agents) || c.agents.length < 2)
    throw new Error(`Expected at least 2 agents, got ${((h = c.agents) == null ? void 0 : h.length) ?? 0}`);
  const v = c.agents.filter((l) => l.role === "teacher").length;
  if (v !== 1)
    throw new Error(`Expected exactly 1 teacher, got ${v}`);
  return c.agents.map((l, G) => ({
    id: `gen-server-${G}`,
    name: l.name,
    role: l.role,
    persona: l.persona
  }));
}
async function ke(n, e) {
  var A, C, T, E, k, I, O, R, W, _, F;
  const { requirement: s, pdfContent: i } = n;
  await ((A = e.onProgress) == null ? void 0 : A.call(e, {
    step: "initializing",
    progress: 5,
    message: "Initializing classroom generation",
    scenesGenerated: 0
  }));
  const { model: g, modelInfo: u, modelString: S } = ae({});
  t.info(`Using server-configured model: ${S}`);
  const { providerId: c } = te(S);
  if (!ne(c))
    throw new Error(
      `No API key configured for provider "${c}". Set the appropriate key in .env.local or server-providers.yml (e.g. ${c.toUpperCase()}_API_KEY).`
    );
  const h = async (r, d, m) => (await J(
    {
      model: g,
      messages: [
        { role: "system", content: r },
        { role: "user", content: d }
      ],
      maxOutputTokens: u == null ? void 0 : u.outputWindow
    },
    "generate-classroom"
  )).text, l = me(n.language), G = {
    requirement: s,
    language: l
  }, q = (i == null ? void 0 : i.text) || void 0;
  let f;
  if ((n.agentMode || "default") === "generate") {
    t.info("Generating custom agent profiles via LLM...");
    try {
      f = await he(s, l, h), t.info(`Generated ${f.length} agent profiles`);
    } catch (r) {
      t.warn("Agent profile generation failed, falling back to defaults:", r), f = U();
    }
  } else
    f = U();
  const K = Z(f);
  await ((C = e.onProgress) == null ? void 0 : C.call(e, {
    step: "researching",
    progress: 10,
    message: "Researching topic",
    scenesGenerated: 0
  }));
  let $;
  if (n.enableWebSearch) {
    const r = re();
    if (r)
      try {
        t.info("Running web search for requirement context...");
        const d = await se({ query: s, apiKey: r });
        $ = oe(d), $ && t.info(`Web search returned ${d.sources.length} sources`);
      } catch (d) {
        t.warn("Web search failed, continuing without search context:", d);
      }
    else
      t.warn("enableWebSearch is true but no Tavily API key configured, skipping web search");
  }
  await ((T = e.onProgress) == null ? void 0 : T.call(e, {
    step: "generating_outlines",
    progress: 15,
    message: "Generating scene outlines",
    scenesGenerated: 0
  }));
  const p = await V(
    G,
    q,
    void 0,
    h,
    void 0,
    {
      imageGenerationEnabled: n.enableImageGeneration,
      videoGenerationEnabled: n.enableVideoGeneration,
      researchContext: $,
      teacherContext: K
    }
  );
  if (!p.success || !p.data)
    throw t.error("Failed to generate outlines:", p.error), new Error(p.error || "Failed to generate scene outlines");
  const a = p.data;
  t.info(`Generated ${a.length} scene outlines`), await ((E = e.onProgress) == null ? void 0 : E.call(e, {
    step: "generating_outlines",
    progress: 30,
    message: `Generated ${a.length} scene outlines`,
    scenesGenerated: 0,
    totalScenes: a.length
  }));
  const y = j(10), x = {
    id: y,
    name: ((k = a[0]) == null ? void 0 : k.title) || s.slice(0, 50),
    description: void 0,
    language: l,
    style: "interactive",
    createdAt: Date.now(),
    updatedAt: Date.now()
  }, M = de(x), z = Y(M);
  t.info("Stage 2: Generating scene content and actions...");
  let b = 0;
  for (const [r, d] of a.entries()) {
    const m = B(d, !0), L = 30 + Math.floor(r / Math.max(a.length, 1) * 60);
    await ((I = e.onProgress) == null ? void 0 : I.call(e, {
      step: "generating_scenes",
      progress: Math.max(L, 31),
      message: `Generating scene ${r + 1}/${a.length}: ${m.title}`,
      scenesGenerated: b,
      totalScenes: a.length
    }));
    const P = await H(
      m,
      h,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      f
    );
    if (!P) {
      t.warn(`Skipping scene "${m.title}" — content generation failed`);
      continue;
    }
    const N = await Q(m, P, h, void 0, f);
    if (t.info(`Scene "${m.title}": ${N.length} actions`), !X(m, P, N, z)) {
      t.warn(`Skipping scene "${m.title}" — scene creation failed`);
      continue;
    }
    b += 1;
    const D = 30 + Math.floor((r + 1) / Math.max(a.length, 1) * 60);
    await ((O = e.onProgress) == null ? void 0 : O.call(e, {
      step: "generating_scenes",
      progress: Math.min(D, 90),
      message: `Generated ${b}/${a.length} scenes`,
      scenesGenerated: b,
      totalScenes: a.length
    }));
  }
  const o = M.getState().scenes;
  if (t.info(`Pipeline complete: ${o.length} scenes generated`), o.length === 0)
    throw new Error("No scenes were generated");
  if (n.enableImageGeneration || n.enableVideoGeneration) {
    await ((R = e.onProgress) == null ? void 0 : R.call(e, {
      step: "generating_media",
      progress: 90,
      message: "Generating media files",
      scenesGenerated: o.length,
      totalScenes: a.length
    }));
    try {
      const r = await ce(a, y, e.baseUrl);
      le(o, r), t.info(`Media generation complete: ${Object.keys(r).length} files`);
    } catch (r) {
      t.warn("Media generation phase failed, continuing:", r);
    }
  }
  if (n.enableTTS) {
    await ((W = e.onProgress) == null ? void 0 : W.call(e, {
      step: "generating_tts",
      progress: 94,
      message: "Generating TTS audio",
      scenesGenerated: o.length,
      totalScenes: a.length
    }));
    try {
      await ge(o, y, e.baseUrl), t.info("TTS generation complete");
    } catch (r) {
      t.warn("TTS generation phase failed, continuing:", r);
    }
  }
  await ((_ = e.onProgress) == null ? void 0 : _.call(e, {
    step: "persisting",
    progress: 98,
    message: "Persisting classroom data",
    scenesGenerated: o.length,
    totalScenes: a.length
  }));
  const w = await ie(
    {
      id: y,
      stage: x,
      scenes: o
    },
    e.baseUrl
  );
  return t.info(`Classroom persisted: ${w.id}, URL: ${w.url}`), await ((F = e.onProgress) == null ? void 0 : F.call(e, {
    step: "completed",
    progress: 100,
    message: "Classroom generation completed",
    scenesGenerated: o.length,
    totalScenes: a.length
  })), {
    id: w.id,
    url: w.url,
    stage: x,
    scenes: o,
    scenesCount: o.length,
    createdAt: w.createdAt
  };
}
export {
  ke as generateClassroom
};
//# sourceMappingURL=classroom-generation.js.map
