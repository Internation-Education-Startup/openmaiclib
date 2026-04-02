import { SLIDE_ONLY_ACTIONS as a } from "../types/action.js";
function s(e, t) {
  return !t || t === "slide" ? e : e.filter(
    (n) => !a.includes(n)
  );
}
function o(e) {
  const t = {
    spotlight: "Focus attention on a single key element by dimming everything else. Use sparingly — max 1-2 per response. Parameters: { elementId: string, dimOpacity?: number }",
    laser: "Point at an element with a laser pointer effect. Parameters: { elementId: string, color?: string }",
    wb_open: "Open the whiteboard for hand-drawn explanations, formulas, diagrams, or step-by-step derivations. Creates a new whiteboard if none exists. Call this before adding elements. Parameters: {}",
    wb_draw_text: "Add text to the whiteboard. Use for writing formulas, steps, or key points. Parameters: { content: string, x: number, y: number, width?: number, height?: number, fontSize?: number, color?: string, elementId?: string }",
    wb_draw_shape: 'Add a shape to the whiteboard. Use for diagrams and visual explanations. Parameters: { shape: "rectangle"|"circle"|"triangle", x: number, y: number, width: number, height: number, fillColor?: string, elementId?: string }',
    wb_draw_chart: 'Add a chart to the whiteboard. Use for data visualization (bar charts, line graphs, pie charts, etc.). Parameters: { chartType: "bar"|"column"|"line"|"pie"|"ring"|"area"|"radar"|"scatter", x: number, y: number, width: number, height: number, data: { labels: string[], legends: string[], series: number[][] }, themeColors?: string[], elementId?: string }',
    wb_draw_latex: "Add a LaTeX formula to the whiteboard. Use for mathematical equations and scientific notation. Parameters: { latex: string, x: number, y: number, width?: number, height?: number, color?: string, elementId?: string }",
    wb_draw_table: "Add a table to the whiteboard. Use for structured data display and comparisons. Parameters: { x: number, y: number, width: number, height: number, data: string[][] (first row is header), outline?: { width: number, style: string, color: string }, theme?: { color: string }, elementId?: string }",
    wb_draw_line: 'Add a line or arrow to the whiteboard. Use for connecting elements, drawing relationships, flow diagrams, or annotations. Parameters: { startX: number, startY: number, endX: number, endY: number, color?: string (default "#333333"), width?: number (line thickness, default 2), style?: "solid"|"dashed" (default "solid"), points?: [startMarker, endMarker] where marker is ""|"arrow" (default ["",""]), elementId?: string }',
    wb_clear: "Clear all elements from the whiteboard. Use when whiteboard is too crowded before adding new elements. Parameters: {}",
    wb_delete: "Delete a specific element from the whiteboard by its ID. Use to remove an outdated, incorrect, or overlapping element without clearing the entire board. Parameters: { elementId: string }",
    wb_close: "Close the whiteboard and return to the slide view. Always close after you finish drawing. Parameters: {}",
    play_video: "Start playback of a video element on the current slide. Synchronous — blocks until the video finishes playing. Use a speech action before this to introduce the video. Parameters: { elementId: string }"
  };
  return e.length === 0 ? "You have no actions available. You can only speak to students." : e.filter((r) => t[r]).map((r) => `- ${r}: ${t[r]}`).join(`
`);
}
export {
  o as getActionDescriptions,
  s as getEffectiveActions
};
//# sourceMappingURL=tool-schemas.js.map
