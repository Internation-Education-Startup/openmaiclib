const t = [
  "wb_open",
  "wb_close",
  "wb_draw_text",
  "wb_draw_shape",
  "wb_draw_chart",
  "wb_draw_latex",
  "wb_draw_table",
  "wb_draw_line",
  "wb_clear",
  "wb_delete"
], _ = ["spotlight", "laser", "play_video"], a = {
  teacher: [..._, ...t],
  assistant: [...t],
  student: [...t]
};
function w(e) {
  return a[e] || [...t];
}
export {
  a as ROLE_ACTIONS,
  _ as SLIDE_ACTIONS,
  t as WHITEBOARD_ACTIONS,
  w as getActionsForRole
};
//# sourceMappingURL=types.js.map
