import { nanoid as r } from "nanoid";
function o(e) {
  return e ? `${e}_${r(10)}` : r(10);
}
function l(e, t) {
  return e.some((n) => n.id === t);
}
function f(e, t) {
  return e.find((n) => n.id === t) || null;
}
function i() {
  return {
    type: "slide",
    canvas: {
      id: o("slide"),
      viewportSize: 1e3,
      viewportRatio: 0.5625,
      // 16:9
      theme: {
        backgroundColor: "#ffffff",
        themeColors: ["#5b9bd5", "#ed7d31", "#a5a5a5", "#ffc000", "#4472c4"],
        fontColor: "#333333",
        fontName: "Microsoft YaHei",
        outline: {
          color: "#d14424",
          width: 2,
          style: "solid"
        },
        shadow: {
          h: 0,
          v: 0,
          blur: 10,
          color: "#000000"
        }
      },
      elements: []
    }
  };
}
function u() {
  return {
    type: "quiz",
    questions: []
  };
}
function a() {
  return {
    type: "interactive",
    url: ""
  };
}
function c() {
  return {
    type: "pbl",
    projectConfig: {
      projectInfo: { title: "", description: "" },
      agents: [],
      issueboard: { agent_ids: [], issues: [], current_issue_id: null },
      chat: { messages: [] }
    }
  };
}
function d(e) {
  switch (e) {
    case "slide":
      return i();
    case "quiz":
      return u();
    case "interactive":
      return a();
    case "pbl":
      return c();
    default:
      throw new Error(`Unknown scene type: ${e}`);
  }
}
export {
  d as createDefaultContent,
  a as createDefaultInteractiveContent,
  c as createDefaultPBLContent,
  u as createDefaultQuizContent,
  i as createDefaultSlideContent,
  o as generateId,
  f as getScene,
  l as validateSceneId
};
//# sourceMappingURL=stage-api-defaults.js.map
