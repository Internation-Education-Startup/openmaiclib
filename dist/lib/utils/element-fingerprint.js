function n(t) {
  var r;
  switch (t.type) {
    case "text":
      return { content: t.content };
    case "image":
      return { src: t.src };
    case "shape":
      return {
        path: t.path,
        fill: t.fill,
        text: ((r = t.text) == null ? void 0 : r.content) ?? "",
        gradient: t.gradient ?? null,
        pattern: t.pattern ?? null
      };
    case "line":
      return {
        start: t.start,
        end: t.end,
        color: t.color,
        style: t.style,
        points: t.points
      };
    case "chart":
      return {
        chartType: t.chartType,
        data: t.data,
        themeColors: t.themeColors
      };
    case "table":
      return {
        data: t.data.map((e) => e.map((a) => a.text)),
        colWidths: t.colWidths,
        theme: t.theme ?? null
      };
    case "latex":
      return { latex: t.latex };
    case "video":
      return { src: t.src, poster: t.poster ?? "" };
    case "audio":
      return { src: t.src };
    default:
      return t;
  }
}
function s(t) {
  return JSON.stringify(
    t.map((r) => ({
      id: r.id,
      left: r.left ?? 0,
      top: r.top ?? 0,
      width: "width" in r ? r.width : 0,
      height: "height" in r && r.height != null ? r.height : 0,
      sem: n(r)
    }))
  );
}
export {
  s as elementFingerprint
};
//# sourceMappingURL=element-fingerprint.js.map
