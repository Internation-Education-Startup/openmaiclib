import "nanoid";
import { createSceneAPI as a } from "./stage-api-scene.js";
import { createElementAPI as t } from "./stage-api-element.js";
import { createCanvasAPI as r } from "./stage-api-canvas.js";
import { createNavigationAPI as m } from "./stage-api-navigation.js";
import { createWhiteboardAPI as o } from "./stage-api-whiteboard.js";
import { createStageMetaAPI as i, createModeAPI as c } from "./stage-api-mode.js";
function d(e) {
  return {
    scene: a(e),
    navigation: m(e),
    element: t(e),
    canvas: r(e),
    whiteboard: o(e),
    mode: c(e),
    stage: i(e)
  };
}
export {
  d as createStageAPI
};
//# sourceMappingURL=stage-api.js.map
