import { jsx as n } from "react/jsx-runtime";
import { useMemo as i } from "react";
import { SlideEditor as d } from "../slide-renderer/Editor/index.js";
import { QuizView as o } from "../scene-renderers/quiz-view.js";
import { InteractiveRenderer as c } from "../scene-renderers/interactive-renderer.js";
import { PBLRenderer as l } from "../scene-renderers/pbl-renderer.js";
function s({ scene: t, mode: e }) {
  const r = i(() => {
    switch (t.type) {
      case "slide":
        return t.content.type !== "slide" ? /* @__PURE__ */ n("div", { children: "Invalid slide content" }) : /* @__PURE__ */ n(d, { mode: e });
      case "quiz":
        return t.content.type !== "quiz" ? /* @__PURE__ */ n("div", { children: "Invalid quiz content" }) : /* @__PURE__ */ n(o, { questions: t.content.questions, sceneId: t.id }, t.id);
      case "interactive":
        return t.content.type !== "interactive" ? /* @__PURE__ */ n("div", { children: "Invalid interactive content" }) : /* @__PURE__ */ n(c, { content: t.content, mode: e, sceneId: t.id });
      case "pbl":
        return t.content.type !== "pbl" ? /* @__PURE__ */ n("div", { children: "Invalid PBL content" }) : /* @__PURE__ */ n(l, { content: t.content, mode: e, sceneId: t.id });
      default:
        return /* @__PURE__ */ n("div", { children: "Unknown scene type" });
    }
  }, [t, e]);
  return /* @__PURE__ */ n("div", { className: "w-full h-full", children: r });
}
export {
  s as SceneRenderer
};
//# sourceMappingURL=scene-renderer.js.map
