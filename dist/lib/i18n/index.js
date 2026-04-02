import { commonEnUS as i, commonZhCN as m } from "./common.js";
import { stageEnUS as e, stageZhCN as a } from "./stage.js";
import { chatEnUS as f, chatZhCN as c } from "./chat.js";
import { generationEnUS as h, generationZhCN as p } from "./generation.js";
import { settingsEnUS as g, settingsZhCN as C } from "./settings.js";
const N = {
  "zh-CN": {
    ...m,
    ...a,
    ...c,
    ...p,
    ...C
  },
  "en-US": {
    ...i,
    ...e,
    ...f,
    ...h,
    ...g
  }
};
function d(n, o) {
  const r = o.split(".");
  let t = N[n];
  for (const s of r)
    t = t == null ? void 0 : t[s];
  return (typeof t == "string" ? t : void 0) ?? o;
}
export {
  d as translate,
  N as translations
};
//# sourceMappingURL=index.js.map
