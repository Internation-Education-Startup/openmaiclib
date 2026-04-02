import { nanoid as d } from "nanoid";
import "fs";
import "path";
import "jsonrepair";
import "katex";
import "../store/canvas.js";
import "ai";
import "../ai/llm.js";
import "zod";
import "partial-json";
function h(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    if (r.mediaGenerations) {
      for (const i of r.mediaGenerations)
        if (!t.has(i.elementId)) {
          const o = i.type === "video" ? "gen_vid_" : "gen_img_";
          t.set(i.elementId, `${o}${d(8)}`);
        }
    }
  return t.size === 0 ? e : e.map((r) => r.mediaGenerations ? {
    ...r,
    mediaGenerations: r.mediaGenerations.map((i) => ({
      ...i,
      elementId: t.get(i.elementId) || i.elementId
    }))
  } : r);
}
function v(e, t, r, i) {
  const o = d();
  if (e.type === "slide" && "elements" in t) {
    const n = {
      backgroundColor: "#ffffff",
      themeColors: ["#5b9bd5", "#ed7d31", "#a5a5a5", "#ffc000", "#4472c4"],
      fontColor: "#333333",
      fontName: "Microsoft YaHei",
      outline: { color: "#d14424", width: 2, style: "solid" },
      shadow: { h: 0, v: 0, blur: 10, color: "#000000" }
    }, a = {
      id: d(),
      viewportSize: 1e3,
      viewportRatio: 0.5625,
      theme: n,
      elements: t.elements,
      background: t.background
    };
    return {
      id: o,
      stageId: i,
      type: "slide",
      title: e.title,
      order: e.order,
      content: {
        type: "slide",
        canvas: a
      },
      actions: r,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }
  return e.type === "quiz" && "questions" in t ? {
    id: o,
    stageId: i,
    type: "quiz",
    title: e.title,
    order: e.order,
    content: {
      type: "quiz",
      questions: t.questions
    },
    actions: r,
    createdAt: Date.now(),
    updatedAt: Date.now()
  } : e.type === "interactive" && "html" in t ? {
    id: o,
    stageId: i,
    type: "interactive",
    title: e.title,
    order: e.order,
    content: {
      type: "interactive",
      url: "",
      html: t.html
    },
    actions: r,
    createdAt: Date.now(),
    updatedAt: Date.now()
  } : e.type === "pbl" && "projectConfig" in t ? {
    id: o,
    stageId: i,
    type: "pbl",
    title: e.title,
    order: e.order,
    content: {
      type: "pbl",
      projectConfig: t.projectConfig
    },
    actions: r,
    createdAt: Date.now(),
    updatedAt: Date.now()
  } : null;
}
export {
  v as buildCompleteScene,
  h as uniquifyMediaElementIds
};
//# sourceMappingURL=scene-builder.js.map
