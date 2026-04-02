import { nanoid as I } from "nanoid";
import V from "katex";
import { MAX_VISION_IMAGES as N } from "../constants/generation.js";
import "../store/canvas.js";
import { generatePBLContent as U } from "../pbl/generate-pbl.js";
import { PROMPT_IDS as v } from "./prompts/index.js";
import { postProcessInteractiveHtml as Y } from "./interactive-post-processor.js";
import { parseActionsFromStructuredOutput as P } from "./action-parser.js";
import { parseJsonResponse as E } from "./json-repair.js";
import { formatAgentsForPrompt as _, buildCourseContext as j, formatImagePlaceholder as Z, formatImageDescription as R, formatTeacherPersonaForPrompt as K } from "./prompt-formatters.js";
import { createLogger as X } from "../logger.js";
import { buildPrompt as x } from "./prompts/loader.js";
const c = X("Generation");
async function ve(e, r, n, t, i, a, l, s) {
  if (e.type === "interactive" && !e.interactiveConfig) {
    c.warn(
      `Interactive outline "${e.title}" missing interactiveConfig, falling back to slide`
    );
    const o = { ...e };
    return q(
      o,
      r,
      n,
      t,
      a,
      l,
      s
    );
  }
  switch (e.type) {
    case "slide":
      return q(
        e,
        r,
        n,
        t,
        a,
        l,
        s
      );
    case "quiz":
      return ne(e, r);
    case "interactive":
      return se(e, r, e.language);
    case "pbl":
      return oe(e, i);
    default:
      return null;
  }
}
function J(e) {
  return !e || e.startsWith("data:") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? !1 : /^img_\d+$/i.test(e);
}
function O(e) {
  return e ? /^gen_(img|vid)_[\w-]+$/i.test(e) : !1;
}
function M(e, r, n) {
  return e.map((t) => {
    if (t.type === "image") {
      if (!("src" in t))
        return c.warn("Image element missing src, removing element"), null;
      const i = t.src;
      if (J(i))
        return !r || !r[i] ? (c.warn(`No mapping for image ID: ${i}, removing element`), null) : (c.debug(`Resolved image ID "${i}" to base64 URL`), { ...t, src: r[i] });
      if (O(i))
        return n && n[i] ? (c.debug(`Resolved generated image ID "${i}" to URL`), { ...t, src: n[i] }) : (c.debug(`Keeping generated image placeholder: ${i}`), t);
    }
    if (t.type === "video") {
      if (!("src" in t))
        return c.warn("Video element missing src, removing element"), null;
      const i = t.src;
      if (O(i))
        return n && n[i] ? (c.debug(`Resolved generated video ID "${i}" to URL`), { ...t, src: n[i] }) : (c.debug(`Keeping generated video placeholder: ${i}`), t);
    }
    return t;
  }).filter((t) => t !== null);
}
function ee(e, r) {
  return e.map((n) => {
    if (n.type === "line") {
      const t = n;
      return (!t.points || !Array.isArray(t.points) || t.points.length !== 2) && (c.warn("Line element missing points, adding defaults"), t.points = ["", ""]), (!t.start || !Array.isArray(t.start)) && (t.start = [n.left ?? 0, n.top ?? 0]), (!t.end || !Array.isArray(t.end)) && (t.end = [(n.left ?? 0) + (n.width ?? 100), (n.top ?? 0) + (n.height ?? 0)]), t.style || (t.style = "solid"), t.color || (t.color = "#333333"), t;
    }
    if (n.type === "text") {
      const t = n;
      return t.defaultFontName || (t.defaultFontName = "Microsoft YaHei"), t.defaultColor || (t.defaultColor = "#333333"), t.content || (t.content = ""), t;
    }
    if (n.type === "image") {
      const t = n;
      if (t.fixedRatio === void 0 && (t.fixedRatio = !0), r && typeof t.src == "string") {
        const i = r.find((a) => a.id === t.src);
        if (i != null && i.width && (i != null && i.height)) {
          const a = i.width / i.height, l = n.width || 400, s = n.height || 300;
          if (Math.abs(l / s - a) / a > 0.1) {
            const o = Math.round(l / a);
            if (o > 462) {
              const f = Math.round(462 * a);
              t.width = f, t.height = 462;
            } else
              t.height = o;
          }
        }
      }
      return t;
    }
    if (n.type === "shape") {
      const t = n;
      if (t.viewBox || (t.viewBox = `0 0 ${n.width ?? 100} ${n.height ?? 100}`), !t.path) {
        const i = n.width ?? 100, a = n.height ?? 100;
        t.path = `M0 0 L${i} 0 L${i} ${a} L0 ${a} Z`;
      }
      return t.fill || (t.fill = "#5b9bd5"), t.fixedRatio === void 0 && (t.fixedRatio = !1), t;
    }
    return n;
  });
}
function te(e) {
  return e.map((r) => {
    if (r.type !== "latex") return r;
    const n = r.latex;
    if (!n)
      return c.warn("Latex element missing latex string, removing"), null;
    try {
      const t = V.renderToString(n, {
        throwOnError: !1,
        displayMode: !0,
        output: "html"
      });
      return {
        ...r,
        html: t,
        fixedRatio: !0
      };
    } catch (t) {
      return c.warn(`Failed to render latex "${n}":`, t), null;
    }
  }).filter((r) => r !== null);
}
async function q(e, r, n, t, i, a, l) {
  const s = e.language || "zh-CN";
  let o = "无可用图片，禁止插入任何 image 元素", f;
  if (n && n.length > 0)
    if (i && t) {
      const u = n.filter((y) => t[y.id]), C = u.slice(0, N), T = u.slice(N), m = n.filter((y) => !t[y.id]), W = C.map((y) => Z(y, s)), Q = [...T, ...m].map(
        (y) => R(y, s)
      );
      o = [...W, ...Q].join(`
`), f = C.map((y) => ({
        id: y.id,
        src: t[y.id],
        width: y.width,
        height: y.height
      }));
    } else
      o = n.map((u) => R(u, s)).join(`
`);
  if (e.mediaGenerations && e.mediaGenerations.length > 0) {
    const u = e.mediaGenerations.filter((m) => m.type === "image").map((m) => `- ${m.elementId}: "${m.prompt}" (aspect ratio: ${m.aspectRatio || "16:9"})`).join(`
`), C = e.mediaGenerations.filter((m) => m.type === "video").map((m) => `- ${m.elementId}: "${m.prompt}" (aspect ratio: ${m.aspectRatio || "16:9"})`).join(`
`), T = [];
    if (u && T.push(`AI-Generated Images (use these IDs as image element src):
${u}`), C && T.push(`AI-Generated Videos (use these IDs as video element src):
${C}`), T.length > 0) {
      const m = T.join(`

`);
      o.includes("禁止插入") || o.includes("No images") ? o = m : o += `

${m}`;
    }
  }
  const p = 1e3, h = 562.5, g = K(l), $ = x(v.SLIDE_CONTENT, {
    title: e.title,
    description: e.description,
    keyPoints: (e.keyPoints || []).map((u, C) => `${C + 1}. ${u}`).join(`
`),
    elements: "（根据要点自动生成）",
    assignedImages: o,
    canvas_width: p,
    canvas_height: h,
    teacherContext: g
  });
  if (!$)
    return null;
  c.debug(`Generating slide content for: ${e.title}`), n && n.length > 0 && c.debug(`Assigned images: ${n.map((u) => u.id).join(", ")}`), f && f.length > 0 && c.debug(`Vision images: ${f.map((u) => u.id).join(", ")}`);
  const A = await r($.system, $.user, f), d = E(A);
  if (!d || !d.elements || !Array.isArray(d.elements))
    return c.error(`Failed to parse AI response for: ${e.title}`), null;
  c.debug(`Got ${d.elements.length} elements for: ${e.title}`);
  const w = d.elements.filter((u) => u.type === "image");
  w.length > 0 && (c.debug(
    "Image elements before resolution:",
    w.map((u) => ({
      type: u.type,
      src: u.src && String(u.src).substring(0, 50)
    }))
  ), c.debug("imageMapping keys:", t ? Object.keys(t).length : "0 keys"));
  const b = ee(d.elements, n);
  c.debug(`After element fixing: ${b.length} elements`);
  const L = te(b);
  c.debug(`After LaTeX processing: ${L.length} elements`);
  const D = M(
    L,
    t,
    a
  );
  c.debug(`After image resolution: ${D.length} elements`);
  const B = D.map((u) => ({
    ...u,
    id: `${u.type}_${I(8)}`,
    rotate: 0
  }));
  let S;
  return d.background && (d.background.type === "solid" && d.background.color ? S = { type: "solid", color: d.background.color } : d.background.type === "gradient" && d.background.gradient && (S = {
    type: "gradient",
    gradient: d.background.gradient
  })), {
    elements: B,
    background: S,
    remark: d.remark || e.description
  };
}
async function ne(e, r) {
  const n = e.quizConfig || {
    questionCount: 3,
    difficulty: "medium",
    questionTypes: ["single"]
  }, t = x(v.QUIZ_CONTENT, {
    title: e.title,
    description: e.description,
    keyPoints: (e.keyPoints || []).map((s, o) => `${o + 1}. ${s}`).join(`
`),
    questionCount: n.questionCount,
    difficulty: n.difficulty,
    questionTypes: n.questionTypes.join(", ")
  });
  if (!t)
    return null;
  c.debug(`Generating quiz content for: ${e.title}`);
  const i = await r(t.system, t.user), a = E(i);
  return !a || !Array.isArray(a) ? (c.error(`Failed to parse AI response for: ${e.title}`), null) : (c.debug(`Got ${a.length} questions for: ${e.title}`), { questions: a.map((s) => {
    const o = s.type === "short_answer";
    return {
      ...s,
      id: s.id || `q_${I(8)}`,
      options: o ? void 0 : re(s.options),
      answer: o ? void 0 : ie(s),
      hasAnswer: !o
    };
  }) });
}
function re(e) {
  if (!(!e || !Array.isArray(e)))
    return e.map((r, n) => {
      const t = String.fromCharCode(65 + n);
      if (typeof r == "string")
        return { value: t, label: r };
      if (typeof r == "object" && r !== null) {
        const i = r;
        return {
          value: typeof i.value == "string" ? i.value : t,
          label: typeof i.label == "string" ? i.label : String(i.value || i.text || t)
        };
      }
      return { value: t, label: String(r) };
    });
}
function ie(e) {
  const r = e.answer ?? e.correctAnswer ?? e.correct_answer;
  if (r)
    return Array.isArray(r) ? r.map(String) : [String(r)];
}
async function se(e, r, n = "zh-CN") {
  var p, h, g, $, A;
  const t = e.interactiveConfig;
  let i;
  try {
    const d = x(v.INTERACTIVE_SCIENTIFIC_MODEL, {
      subject: t.subject || "",
      conceptName: t.conceptName,
      conceptOverview: t.conceptOverview,
      keyPoints: (e.keyPoints || []).map((w, b) => `${b + 1}. ${w}`).join(`
`),
      designIdea: t.designIdea
    });
    if (d) {
      c.info(`Step 1: Scientific modeling for: ${e.title}`);
      const w = await r(d.system, d.user), b = E(w);
      b && b.core_formulas && (i = b, c.info(
        `Scientific model: ${b.core_formulas.length} formulas, ${((p = b.constraints) == null ? void 0 : p.length) || 0} constraints`
      ));
    }
  } catch (d) {
    c.warn(`Scientific modeling failed, continuing without: ${d}`);
  }
  let a = "No specific scientific constraints available.";
  if (i) {
    const d = [];
    (h = i.core_formulas) != null && h.length && d.push(`Core Formulas: ${i.core_formulas.join("; ")}`), (g = i.mechanism) != null && g.length && d.push(`Mechanisms: ${i.mechanism.join("; ")}`), ($ = i.constraints) != null && $.length && d.push(`Must Obey: ${i.constraints.join("; ")}`), (A = i.forbidden_errors) != null && A.length && d.push(`Forbidden Errors: ${i.forbidden_errors.join("; ")}`), a = d.join(`
`);
  }
  const l = x(v.INTERACTIVE_HTML, {
    conceptName: t.conceptName,
    subject: t.subject || "",
    conceptOverview: t.conceptOverview,
    keyPoints: (e.keyPoints || []).map((d, w) => `${w + 1}. ${d}`).join(`
`),
    scientificConstraints: a,
    designIdea: t.designIdea,
    language: n
  });
  if (!l)
    return c.error(`Failed to build HTML prompt for: ${e.title}`), null;
  c.info(`Step 2: Generating HTML for: ${e.title}`);
  const s = await r(l.system, l.user), o = ce(s);
  if (!o)
    return c.error(`Failed to extract HTML from response for: ${e.title}`), null;
  const f = Y(o);
  return c.info(`Post-processed HTML (${f.length} chars) for: ${e.title}`), {
    html: f,
    scientificModel: i
  };
}
async function oe(e, r) {
  if (!r)
    return c.error("LanguageModel required for PBL generation"), null;
  const n = e.pblConfig;
  if (!n)
    return c.error(`PBL outline "${e.title}" missing pblConfig`), null;
  c.info(`Generating PBL content for: ${e.title}`);
  try {
    const t = await U(
      {
        projectTopic: n.projectTopic,
        projectDescription: n.projectDescription,
        targetSkills: n.targetSkills,
        issueCount: n.issueCount,
        language: n.language
      },
      r,
      {
        onProgress: (i) => c.info(`${i}`)
      }
    );
    return c.info(
      `PBL generated: ${t.agents.length} agents, ${t.issueboard.issues.length} issues`
    ), { projectConfig: t };
  } catch (t) {
    return c.error("Failed:", t), null;
  }
}
function ce(e) {
  const r = e.indexOf("<!DOCTYPE html>"), n = e.indexOf("<html"), t = r !== -1 ? r : n;
  if (t !== -1) {
    const l = e.lastIndexOf("</html>");
    if (l !== -1)
      return e.substring(t, l + 7);
  }
  const i = e.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (i) {
    const l = i[1].trim();
    if (l.includes("<html") || l.includes("<!DOCTYPE"))
      return l;
  }
  const a = e.trim();
  return a.startsWith("<!DOCTYPE") || a.startsWith("<html") ? a : (c.error("Could not extract HTML from response"), c.error("Response preview:", e.substring(0, 200)), null);
}
async function xe(e, r, n, t, i, a) {
  const l = _(i);
  if (e.type === "slide" && "elements" in r) {
    const s = ae(r.elements), o = x(v.SLIDE_ACTIONS, {
      title: e.title,
      keyPoints: (e.keyPoints || []).map((h, g) => `${g + 1}. ${h}`).join(`
`),
      description: e.description,
      elements: s,
      courseContext: j(t),
      agents: l,
      userProfile: a || ""
    });
    if (!o)
      return F(e, r.elements);
    const f = await n(o.system, o.user), p = P(f, e.type);
    return p.length > 0 ? k(p, r.elements, i) : F(e, r.elements);
  }
  if (e.type === "quiz" && "questions" in r) {
    const s = fe(r.questions), o = x(v.QUIZ_ACTIONS, {
      title: e.title,
      keyPoints: (e.keyPoints || []).map((h, g) => `${g + 1}. ${h}`).join(`
`),
      description: e.description,
      questions: s,
      courseContext: j(t),
      agents: l
    });
    if (!o)
      return G();
    const f = await n(o.system, o.user), p = P(f, e.type);
    return p.length > 0 ? k(p, [], i) : G();
  }
  if (e.type === "interactive" && "html" in r) {
    const s = e.interactiveConfig, o = _(i), f = x(v.INTERACTIVE_ACTIONS, {
      title: e.title,
      keyPoints: (e.keyPoints || []).map((g, $) => `${$ + 1}. ${g}`).join(`
`),
      description: e.description,
      conceptName: (s == null ? void 0 : s.conceptName) || e.title,
      designIdea: (s == null ? void 0 : s.designIdea) || "",
      courseContext: j(t),
      agents: o
    });
    if (!f)
      return H();
    const p = await n(f.system, f.user), h = P(p, e.type);
    return h.length > 0 ? k(h, [], i) : H();
  }
  if (e.type === "pbl" && "projectConfig" in r) {
    const s = e.pblConfig, o = _(i), f = x(v.PBL_ACTIONS, {
      title: e.title,
      keyPoints: (e.keyPoints || []).map((g, $) => `${$ + 1}. ${g}`).join(`
`),
      description: e.description,
      projectTopic: (s == null ? void 0 : s.projectTopic) || e.title,
      projectDescription: (s == null ? void 0 : s.projectDescription) || e.description,
      courseContext: j(t),
      agents: o
    });
    if (!f)
      return z();
    const p = await n(f.system, f.user), h = P(p, e.type);
    return h.length > 0 ? k(h, [], i) : z();
  }
  return [];
}
function z(e) {
  return [
    {
      id: `action_${I(8)}`,
      type: "speech",
      title: "PBL 项目介绍",
      text: "现在让我们开始一个项目式学习活动。请选择你的角色，查看任务看板，开始协作完成项目。"
    }
  ];
}
function ae(e) {
  return e.map((r) => {
    let n = "";
    if (r.type === "text" && "content" in r) {
      const t = (r.content || "").replace(/<[^>]*>/g, "").substring(0, 50);
      n = `Content summary: "${t}${t.length >= 50 ? "..." : ""}"`;
    } else r.type === "chart" && "chartType" in r ? n = `Chart type: ${r.chartType}` : r.type === "image" ? n = "Image element" : r.type === "shape" && "shapeName" in r ? n = `Shape: ${r.shapeName || "unknown"}` : r.type === "latex" && "latex" in r ? n = `Formula: ${(r.latex || "").substring(0, 30)}` : n = `${r.type} element`;
    return `- id: "${r.id}", type: "${r.type}", ${n}`;
  }).join(`
`);
}
function fe(e) {
  return e.map((r, n) => {
    const t = r.options ? `Options: ${r.options.join(", ")}` : "";
    return `Q${n + 1} (${r.type}): ${r.question}
${t}`;
  }).join(`

`);
}
function k(e, r, n) {
  const t = new Set(r.map((s) => s.id)), i = new Set((n == null ? void 0 : n.map((s) => s.id)) || []), a = (n == null ? void 0 : n.filter((s) => s.role === "student")) || [], l = (n == null ? void 0 : n.filter((s) => s.role !== "teacher")) || [];
  return e.map((s) => {
    const o = {
      ...s,
      id: s.id || `action_${I(8)}`
    };
    if (o.type === "spotlight") {
      const f = o;
      (!f.elementId || !t.has(f.elementId)) && r.length > 0 && (f.elementId = r[0].id, c.warn(
        `Invalid elementId, falling back to first element: ${f.elementId}`
      ));
    }
    if (o.type === "discussion" && n && n.length > 0 && !(o.agentId && i.has(o.agentId))) {
      const f = a.length > 0 ? a : l;
      if (f.length > 0) {
        const p = f[Math.floor(Math.random() * f.length)];
        c.warn(
          `Discussion agentId "${o.agentId || "(none)"}" invalid, assigned: ${p.id} (${p.name})`
        ), o.agentId = p.id;
      }
    }
    return o;
  });
}
function F(e, r) {
  var a;
  const n = [], t = r.filter((l) => l.type === "text");
  t.length > 0 && n.push({
    id: `action_${I(8)}`,
    type: "spotlight",
    title: "聚焦重点",
    elementId: t[0].id
  });
  const i = (a = e.keyPoints) != null && a.length ? e.keyPoints.join("。") + "。" : e.description || e.title;
  return n.push({
    id: `action_${I(8)}`,
    type: "speech",
    title: "场景讲解",
    text: i
  }), n;
}
function G(e) {
  return [
    {
      id: `action_${I(8)}`,
      type: "speech",
      title: "测验引导",
      text: "现在让我们来做一个小测验，检验一下学习成果。"
    }
  ];
}
function H(e) {
  return [
    {
      id: `action_${I(8)}`,
      type: "speech",
      title: "交互引导",
      text: "现在让我们通过交互式可视化来探索这个概念。请尝试操作页面中的元素，观察变化。"
    }
  ];
}
function Ce(e, r, n, t) {
  if (e.type === "slide" && "elements" in r) {
    const i = {
      backgroundColor: "#ffffff",
      themeColors: ["#5b9bd5", "#ed7d31", "#a5a5a5", "#ffc000", "#4472c4"],
      fontColor: "#333333",
      fontName: "Microsoft YaHei",
      outline: { color: "#d14424", width: 2, style: "solid" },
      shadow: { h: 0, v: 0, blur: 10, color: "#000000" }
    }, a = {
      id: I(),
      viewportSize: 1e3,
      viewportRatio: 0.5625,
      theme: i,
      elements: r.elements,
      background: r.background
    }, l = t.scene.create({
      type: "slide",
      title: e.title,
      order: e.order,
      content: {
        type: "slide",
        canvas: a
      },
      actions: n
    });
    return l.success ? l.data ?? null : null;
  }
  if (e.type === "quiz" && "questions" in r) {
    const i = t.scene.create({
      type: "quiz",
      title: e.title,
      order: e.order,
      content: {
        type: "quiz",
        questions: r.questions
      },
      actions: n
    });
    return i.success ? i.data ?? null : null;
  }
  if (e.type === "interactive" && "html" in r) {
    const i = t.scene.create({
      type: "interactive",
      title: e.title,
      order: e.order,
      content: {
        type: "interactive",
        url: "",
        html: r.html
      },
      actions: n
    });
    return i.success ? i.data ?? null : null;
  }
  if (e.type === "pbl" && "projectConfig" in r) {
    const i = t.scene.create({
      type: "pbl",
      title: e.title,
      order: e.order,
      content: {
        type: "pbl",
        projectConfig: r.projectConfig
      },
      actions: n
    });
    return i.success ? i.data ?? null : null;
  }
  return null;
}
export {
  Ce as createSceneWithActions,
  xe as generateSceneActions,
  ve as generateSceneContent
};
//# sourceMappingURL=scene-generator.js.map
