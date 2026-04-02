import { db as t } from "./database.js";
async function c(a) {
  await t.playbackState.delete(a);
}
export {
  c as clearPlaybackState
};
//# sourceMappingURL=playback-storage.js.map
