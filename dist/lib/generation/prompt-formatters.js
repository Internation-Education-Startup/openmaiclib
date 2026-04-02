function a(e) {
  if (!e) return "";
  const t = [];
  if (t.push("Course Outline:"), e.allTitles.forEach((s, o) => {
    const n = o === e.pageIndex - 1 ? " ← current" : "";
    t.push(`  ${o + 1}. ${s}${n}`);
  }), t.push(""), t.push(
    'IMPORTANT: All pages belong to the SAME class session. Do NOT greet again after the first page. When referencing content from earlier pages, say "we just covered" or "as mentioned on page N" — NEVER say "last class" or "previous session" because there is no previous session.'
  ), t.push(""), e.pageIndex === 1 ? t.push("Position: This is the FIRST page. Open with a greeting and course introduction.") : e.pageIndex === e.totalPages ? (t.push("Position: This is the LAST page. Conclude the course with a summary and closing."), t.push(
    "Transition: Continue naturally from the previous page. Do NOT greet or re-introduce."
  )) : (t.push(`Position: Page ${e.pageIndex} of ${e.totalPages} (middle of the course).`), t.push(
    "Transition: Continue naturally from the previous page. Do NOT greet or re-introduce."
  )), e.previousSpeeches.length > 0) {
    t.push(""), t.push("Previous page speech (for transition reference):");
    const s = e.previousSpeeches[e.previousSpeeches.length - 1];
    t.push(`  "...${s.slice(-150)}"`);
  }
  return t.join(`
`);
}
function h(e) {
  if (!e || e.length === 0) return "";
  const t = ["Classroom Agents:"];
  for (const s of e) {
    const o = s.persona ? ` — ${s.persona}` : "";
    t.push(`- id: "${s.id}", name: "${s.name}", role: ${s.role}${o}`);
  }
  return t.join(`
`);
}
function p(e) {
  if (!e || e.length === 0) return "";
  const t = e.find((s) => s.role === "teacher");
  return t != null && t.persona ? `Teacher Persona:
Name: ${t.name}
${t.persona}

Adapt the content style and tone to match this teacher's personality. IMPORTANT: The teacher's name and identity must NOT appear on the slides — no "Teacher ${t.name}'s tips", no "Teacher's message", etc. Slides should read as neutral, professional visual aids.` : "";
}
function u(e, t) {
  let s = "";
  if (e.width && e.height) {
    const n = (e.width / e.height).toFixed(2);
    s = ` | 尺寸: ${e.width}×${e.height} (宽高比${n})`;
  }
  const o = e.description ? ` | ${e.description}` : "";
  return t === "zh-CN" ? `- **${e.id}**: 来自PDF第${e.pageNumber}页${s}${o}` : `- **${e.id}**: from PDF page ${e.pageNumber}${s}${o}`;
}
function d(e, t) {
  let s = "";
  if (e.width && e.height) {
    const o = (e.width / e.height).toFixed(2);
    s = ` | 尺寸: ${e.width}×${e.height} (宽高比${o})`;
  }
  return t === "zh-CN" ? `- **${e.id}**: PDF第${e.pageNumber}页的图片${s} [参见附图]` : `- **${e.id}**: image from PDF page ${e.pageNumber}${s} [see attached]`;
}
function c(e, t) {
  const s = [{ type: "text", text: e }];
  if (t.length > 0) {
    s.push({ type: "text", text: `

--- Attached Images ---` });
    for (const o of t) {
      let n = "";
      if (o.width && o.height) {
        const i = (o.width / o.height).toFixed(2);
        n = ` (${o.width}×${o.height}, 宽高比${i})`;
      }
      s.push({ type: "text", text: `
**${o.id}**${n}:` });
      const r = o.src.match(/^data:([^;]+);base64,(.+)$/);
      r ? s.push({
        type: "image",
        image: r[2],
        mimeType: r[1]
      }) : s.push({ type: "image", image: o.src });
    }
  }
  return s;
}
export {
  a as buildCourseContext,
  c as buildVisionUserContent,
  h as formatAgentsForPrompt,
  u as formatImageDescription,
  d as formatImagePlaceholder,
  p as formatTeacherPersonaForPrompt
};
//# sourceMappingURL=prompt-formatters.js.map
