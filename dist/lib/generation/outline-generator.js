import { nanoid as p } from "nanoid";
import { MAX_VISION_IMAGES as S, MAX_PDF_CONTENT_CHARS as O } from "../constants/generation.js";
import { PROMPT_IDS as E } from "./prompts/index.js";
import { formatImagePlaceholder as A, formatImageDescription as M } from "./prompt-formatters.js";
import { parseJsonResponse as G } from "./json-repair.js";
import { uniquifyMediaElementIds as w } from "./scene-builder.js";
import { createLogger as x } from "../logger.js";
import { buildPrompt as R } from "./prompts/loader.js";
const T = x("Generation");
async function U(e, o, g, C, a, n) {
  var N, v;
  let u = e.language === "zh-CN" ? "无可用图片" : "No images available", h;
  if (g && g.length > 0)
    if (n != null && n.visionEnabled && (n != null && n.imageMapping)) {
      const i = g.filter((r) => n.imageMapping[r.id]), t = i.slice(0, S), c = i.slice(S), s = g.filter((r) => !n.imageMapping[r.id]), l = t.map(
        (r) => A(r, e.language)
      ), f = [...c, ...s].map(
        (r) => M(r, e.language)
      );
      u = [...l, ...f].join(`
`), h = t.map((r) => ({
        id: r.id,
        src: n.imageMapping[r.id],
        width: r.width,
        height: r.height
      }));
    } else
      u = g.map((i) => M(i, e.language)).join(`
`);
  const I = e.userNickname || e.userBio ? `## Student Profile

Student: ${e.userNickname || "Unknown"}${e.userBio ? ` — ${e.userBio}` : ""}

Consider this student's background when designing the course. Adapt difficulty, examples, and teaching approach accordingly.

---` : "", y = (n == null ? void 0 : n.imageGenerationEnabled) ?? !1, P = (n == null ? void 0 : n.videoGenerationEnabled) ?? !1;
  let d = "";
  !y && !P ? d = "**IMPORTANT: Do NOT include any mediaGenerations in the outlines. Both image and video generation are disabled.**" : y ? P || (d = '**IMPORTANT: Do NOT include any video mediaGenerations (type: "video") in the outlines. Video generation is disabled. Image generation is allowed.**') : d = '**IMPORTANT: Do NOT include any image mediaGenerations (type: "image") in the outlines. Image generation is disabled. Video generation is allowed.**';
  const m = R(E.REQUIREMENTS_TO_OUTLINES, {
    // New simplified variables
    requirement: e.requirement,
    language: e.language,
    pdfContent: o ? o.substring(0, O) : e.language === "zh-CN" ? "无" : "None",
    availableImages: u,
    userProfile: I,
    mediaGenerationPolicy: d,
    researchContext: (n == null ? void 0 : n.researchContext) || (e.language === "zh-CN" ? "无" : "None"),
    // Server-side generation populates this via options; client-side populates via formatTeacherPersonaForPrompt
    teacherContext: (n == null ? void 0 : n.teacherContext) || ""
  });
  if (!m)
    return { success: !1, error: "Prompt template not found" };
  try {
    (N = a == null ? void 0 : a.onProgress) == null || N.call(a, {
      currentStage: 1,
      overallProgress: 20,
      stageProgress: 50,
      statusMessage: "正在分析需求，生成场景大纲...",
      scenesGenerated: 0,
      totalScenes: 0
    });
    const i = await C(m.system, m.user, h), t = G(i);
    if (!t || !Array.isArray(t))
      return {
        success: !1,
        error: "Failed to parse scene outlines response"
      };
    const c = t.map((l, f) => ({
      ...l,
      id: l.id || p(),
      order: f + 1,
      language: e.language
    })), s = w(c);
    return (v = a == null ? void 0 : a.onProgress) == null || v.call(a, {
      currentStage: 1,
      overallProgress: 50,
      stageProgress: 100,
      statusMessage: `已生成 ${s.length} 个场景大纲`,
      scenesGenerated: 0,
      totalScenes: s.length
    }), { success: !0, data: s };
  } catch (i) {
    return { success: !1, error: String(i) };
  }
}
function V(e, o) {
  return e.type === "interactive" && !e.interactiveConfig ? (T.warn(
    `Interactive outline "${e.title}" missing interactiveConfig, falling back to slide`
  ), { ...e, type: "slide" }) : e.type === "pbl" && (!e.pblConfig || !o) ? (T.warn(
    `PBL outline "${e.title}" missing pblConfig or languageModel, falling back to slide`
  ), { ...e, type: "slide" }) : e;
}
export {
  V as applyOutlineFallbacks,
  U as generateSceneOutlinesFromRequirements
};
//# sourceMappingURL=outline-generator.js.map
