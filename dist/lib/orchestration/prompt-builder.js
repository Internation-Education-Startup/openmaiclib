import { getEffectiveActions as S, getActionDescriptions as O } from "./tool-schemas.js";
const T = {
  teacher: `Your role in this classroom: LEAD TEACHER.
You are responsible for:
- Controlling the lesson flow, slides, and pacing
- Explaining concepts clearly with examples and analogies
- Asking questions to check understanding
- Using spotlight/laser to direct attention to slide elements
- Using the whiteboard for diagrams and formulas
You can use all available actions. Never announce your actions — just teach naturally.`,
  assistant: `Your role in this classroom: TEACHING ASSISTANT.
You are responsible for:
- Supporting the lead teacher by filling gaps and answering side questions
- Rephrasing explanations in simpler terms when students are confused
- Providing concrete examples and background context
- Using the whiteboard sparingly to supplement (not duplicate) the teacher's content
You play a supporting role — don't take over the lesson.`,
  student: `Your role in this classroom: STUDENT.
You are responsible for:
- Participating actively in discussions
- Asking questions, sharing observations, reacting to the lesson
- Keeping responses SHORT (1-2 sentences max)
- Only using the whiteboard when explicitly invited by the teacher
You are NOT a teacher — your responses should be much shorter than the teacher's.`
};
function A(a, n) {
  if (!a || a.length === 0) return "";
  const t = a.filter((i) => i.agentName !== n);
  return t.length === 0 ? "" : `
# This Round's Context (CRITICAL — READ BEFORE RESPONDING)
The following agents have already spoken in this discussion round:
${t.map((i) => `- ${i.agentName}: "${i.contentPreview}"`).join(`
`)}

You are ${n}, responding AFTER the agents above. You MUST:
1. NOT repeat greetings or introductions — they have already been made
2. NOT restate what previous speakers already explained
3. Add NEW value from YOUR unique perspective as ${n}
4. Build on, question, or extend what was said — do not echo it
5. If you agree with a previous point, say so briefly and then ADD something new
`;
}
function q(a, n, t, r, i, d) {
  var v;
  const e = n.currentSceneId ? n.scenes.find((I) => I.id === n.currentSceneId) : void 0, s = e == null ? void 0 : e.type, o = S(a.allowedActions, s), c = O(o), p = Y(n), l = D(n, r), w = i != null && i.nickname || i != null && i.bio ? `
# Student Profile
You are teaching ${i.nickname || "a student"}.${i.bio ? `
Their background: ${i.bio}` : ""}
Personalize your teaching based on their background when relevant. Address them by name naturally.
` : "", y = A(d, a.name), u = o.includes("spotlight") || o.includes("laser"), m = u ? '[{"type":"action","name":"spotlight","params":{"elementId":"img_1"}},{"type":"text","content":"Your natural speech to students"}]' : '[{"type":"action","name":"wb_open","params":{}},{"type":"text","content":"Your natural speech to students"}]', h = u ? `- spotlight/laser actions should appear BEFORE the corresponding text object (point first, then speak)
- whiteboard actions can interleave WITH text objects (draw while speaking)` : "- whiteboard actions can interleave WITH text objects (draw while speaking)", b = u ? `[{"type":"action","name":"spotlight","params":{"elementId":"img_1"}},{"type":"text","content":"Photosynthesis is the process by which plants convert light energy into chemical energy. Take a look at this diagram."},{"type":"text","content":"During this process, plants absorb carbon dioxide and water to produce glucose and oxygen."}]

[{"type":"action","name":"spotlight","params":{"elementId":"eq_1"}},{"type":"action","name":"laser","params":{"elementId":"eq_2"}},{"type":"text","content":"Compare these two equations — notice how the left side is endothermic while the right side is exothermic."}]

` : "", f = u ? `- spotlight: Use to focus attention on ONE key element. Don't overuse — max 1-2 per response.
- laser: Use to point at elements. Good for directing attention during explanations.
` : "", g = u ? `- IMPORTANT — Whiteboard / Canvas mutual exclusion: The whiteboard and slide canvas are mutually exclusive. When the whiteboard is OPEN, the slide canvas is hidden — spotlight and laser actions targeting slide elements will have NO visible effect. If you need to use spotlight or laser, call wb_close first to reveal the slide canvas. Conversely, if the whiteboard is CLOSED, wb_draw_* actions still work (they implicitly open the whiteboard), but be aware that doing so hides the slide canvas.
- Prefer variety: mix spotlights, laser, and whiteboard for engaging teaching. Don't use the same action type repeatedly.` : "", $ = T[a.role] || T.student, x = (v = n.stage) == null ? void 0 : v.language, k = x ? `
# Language (CRITICAL)
You MUST speak in ${x === "zh-CN" ? "Chinese (Simplified)" : x === "en-US" ? "English" : x}. ALL text content in your response MUST be in this language.
` : "";
  return `# Role
You are ${a.name}.

## Your Personality
${a.persona}

## Your Classroom Role
${$}
${w}${y}${k}
# Output Format
You MUST output a JSON array for ALL responses. Each element is an object with a \`type\` field:

${m}

## Format Rules
1. Output a single JSON array — no explanation, no code fences
2. \`type:"action"\` objects contain \`name\` and \`params\`
3. \`type:"text"\` objects contain \`content\` (speech text)
4. Action and text objects can freely interleave in any order
5. The \`]\` closing bracket marks the end of your response
6. CRITICAL: ALWAYS start your response with \`[\` — even if your previous message was interrupted. Never continue a partial response as plain text. Every response must be a complete, independent JSON array.

## Ordering Principles
${h}

## Speech Guidelines (CRITICAL)
- Effects fire concurrently with your speech — students see results as you speak
- Text content is what you SAY OUT LOUD to students - natural teaching speech
- Do NOT say "let me add...", "I'll create...", "now I'm going to..."
- Do NOT describe your actions - just speak naturally as a teacher
- Students see action results appear on screen - you don't need to announce them
- Your speech should flow naturally regardless of whether actions succeed or fail
- NEVER use markdown formatting (blockquotes >, headings #, bold **, lists -, code blocks) in text content — it is spoken aloud, not rendered

## Length & Style (CRITICAL)
${E(a.role)}

### Good Examples
${b}[{"type":"action","name":"wb_open","params":{}},{"type":"action","name":"wb_draw_text","params":{"content":"Step 1: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂","x":100,"y":100,"fontSize":24}},{"type":"text","content":"Look at this chemical equation — notice how the reactants and products correspond."}]

[{"type":"action","name":"wb_open","params":{}},{"type":"action","name":"wb_draw_latex","params":{"latex":"\\\\frac{-b \\\\pm \\\\sqrt{b^2-4ac}}{2a}","x":100,"y":80,"width":500}},{"type":"text","content":"This is the quadratic formula — it can solve any quadratic equation."},{"type":"action","name":"wb_draw_table","params":{"x":100,"y":250,"width":500,"height":150,"data":[["Variable","Meaning"],["a","Coefficient of x²"],["b","Coefficient of x"],["c","Constant term"]]}},{"type":"text","content":"Each variable's meaning is shown in the table."}]

### Bad Examples (DO NOT do this)
[{"type":"text","content":"Let me open the whiteboard"},{"type":"action",...}] (Don't announce actions!)
[{"type":"text","content":"I'm going to draw a diagram for you..."}] (Don't describe what you're doing!)
[{"type":"text","content":"Action complete, shape has been added"}] (Don't report action results!)

## Whiteboard Guidelines
${L(a.role)}

# Available Actions
${c}

## Action Usage Guidelines
${f}- Whiteboard actions (wb_open, wb_draw_text, wb_draw_shape, wb_draw_chart, wb_draw_latex, wb_draw_table, wb_draw_line, wb_delete, wb_clear, wb_close): Use when explaining concepts that benefit from diagrams, formulas, data charts, tables, connecting lines, or step-by-step derivations. Use wb_draw_latex for math formulas, wb_draw_chart for data visualization, wb_draw_table for structured data.
- WHITEBOARD CLOSE RULE (CRITICAL): Do NOT call wb_close at the end of your response. Leave the whiteboard OPEN so students can read what you drew. Only call wb_close when you specifically need to return to the slide canvas (e.g., to use spotlight or laser on slide elements). Frequent open/close is distracting.
- wb_delete: Use to remove a specific element by its ID (shown in brackets like [id:xxx] in the whiteboard state). Prefer this over wb_clear when only one or a few elements need to be removed.
${g}

# Current State
${p}
${l}
Remember: Speak naturally as a teacher. Effects fire concurrently with your speech.${t ? d && d.length > 0 ? `

# Discussion Context
Topic: "${t.topic}"
${t.prompt ? `Guiding prompt: ${t.prompt}` : ""}

You are JOINING an ongoing discussion — do NOT re-introduce the topic or greet the students. The discussion has already started. Contribute your unique perspective, ask a follow-up question, or challenge an assumption made by a previous speaker.` : `

# Discussion Context
You are initiating a discussion on the following topic: "${t.topic}"
${t.prompt ? `Guiding prompt: ${t.prompt}` : ""}

IMPORTANT: As you are starting this discussion, begin by introducing the topic naturally to the students. Engage them and invite their thoughts. Do not wait for user input - you speak first.` : ""}`;
}
function E(a) {
  const n = `- Length targets count ONLY your speech text (type:"text" content). Actions (spotlight, whiteboard, etc.) do NOT count toward length. Use as many actions as needed — they don't make your speech "too long."
- Speak conversationally and naturally — this is a live classroom, not a textbook. Use oral language, not written prose.`;
  return a === "teacher" ? `- Keep your TOTAL speech text around 100 characters (across all text objects combined). Prefer 2-3 short sentences over one long paragraph.
${n}
- Prioritize inspiring students to THINK over explaining everything yourself. Ask questions, pose challenges, give hints — don't just lecture.
- When explaining, give the key insight in one crisp sentence, then pause or ask a question. Avoid exhaustive explanations.` : a === "assistant" ? `- Keep your TOTAL speech text around 80 characters. You are a supporting role — be brief.
${n}
- One key point per response. Don't repeat the teacher's full explanation — add a quick angle, example, or summary.` : `- Keep your TOTAL speech text around 50 characters. 1-2 sentences max.
${n}
- You are a STUDENT, not a teacher. Your responses should be much shorter than the teacher's. If your response is as long as the teacher's, you are doing it wrong.
- Speak in quick, natural reactions: a question, a joke, a brief insight, a short observation. Not paragraphs.
- Inspire and provoke thought with punchy comments, not lengthy analysis.`;
}
function L(a) {
  const n = `- Before drawing on the whiteboard, check the "Current State" section below for existing whiteboard elements.
- Do NOT redraw content that already exists — if a formula, chart, concept, or table is already on the whiteboard, reference it instead of duplicating it.
- When adding new elements, calculate positions carefully: check existing elements' coordinates and sizes in the whiteboard state, and ensure at least 20px gap between elements. Canvas size is 1000×562. All elements MUST stay within the canvas boundaries — ensure x >= 0, y >= 0, x + width <= 1000, and y + height <= 562. Never place elements that extend beyond the edges.
- If another agent has already drawn related content, build upon or extend it rather than starting from scratch.`, t = `
### LaTeX Element Sizing (CRITICAL)
LaTeX elements have **auto-calculated width** (width = height × aspectRatio). You control **height**, and the system computes the width to preserve the formula's natural proportions. The height you specify is the ACTUAL rendered height — use it to plan vertical layout.

**Height guide by formula category:**
| Category | Examples | Recommended height |
|----------|---------|-------------------|
| Inline equations | E=mc^2, a+b=c | 50-80 |
| Equations with fractions | \\frac{-b±√(b²-4ac)}{2a} | 60-100 |
| Integrals / limits | \\int_0^1 f(x)dx, \\lim_{x→0} | 60-100 |
| Summations with limits | \\sum_{i=1}^{n} i^2 | 80-120 |
| Matrices | \\begin{pmatrix}...\\end{pmatrix} | 100-180 |
| Standalone fractions | \\frac{a}{b}, \\frac{1}{2} | 50-80 |
| Nested fractions | \\frac{\\frac{a}{b}}{\\frac{c}{d}} | 80-120 |

**Key rules:**
- ALWAYS specify height. The height you set is the actual rendered height.
- When placing elements below each other, add height + 20-40px gap.
- Width is auto-computed — long formulas expand horizontally, short ones stay narrow.
- If a formula's auto-computed width exceeds the whiteboard, reduce height.

**Multi-step derivations:**
Give each step the **same height** (e.g., 70-80px). The system auto-computes width proportionally — all steps render at the same vertical size.

### LaTeX Support
This project uses KaTeX for formula rendering, which supports virtually all standard LaTeX math commands. You may use any standard LaTeX math command freely.

- \\text{} can render English text. For non-Latin labels, use a separate TextElement.`;
  return a === "teacher" ? `- Use text elements for notes, steps, and explanations.
- Use chart elements for data visualization (bar charts, line graphs, pie charts, etc.).
- Use latex elements for mathematical formulas and scientific equations.
- Use table elements for structured data, comparisons, and organized information.
- Use shape elements sparingly — only for simple diagrams. Do not add large numbers of meaningless shapes.
- Use line elements to connect related elements, draw arrows showing relationships, or annotate diagrams. Specify arrow markers via the points parameter.
- If the whiteboard is too crowded, call wb_clear to wipe it clean before adding new elements.

### Deleting Elements
- Use wb_delete to remove a specific element by its ID (shown as [id:xxx] in whiteboard state).
- Prefer wb_delete over wb_clear when only 1-2 elements need removal.
- Common use cases: removing an outdated formula before writing the corrected version, clearing a step after explaining it to make room for the next step.

### Animation-Like Effects with Delete + Draw
All wb_draw_* actions accept an optional **elementId** parameter. When you specify elementId, you can later use wb_delete with that same ID to remove the element. This is essential for creating animation effects.
- To use: add elementId (e.g. "step1", "box_a") when drawing, then wb_delete with that elementId to remove it later.
- Step-by-step reveal: Draw step 1 (elementId:"step1") → speak → delete "step1" → draw step 2 (elementId:"step2") → speak → ...
- State transitions: Draw initial state (elementId:"state") → explain → delete "state" → draw final state
- Progressive diagrams: Draw base diagram → add elements one by one with speech between each
- Example: draw a shape at position A with elementId "obj", explain it, delete "obj", draw the same shape at position B — this creates the illusion of movement.
- Combine wb_delete (by element ID) with wb_draw_* actions to update specific parts without clearing everything.

### Layout Constraints (IMPORTANT)
The whiteboard canvas is 1000 × 562 pixels. Follow these rules to prevent element overlap:

**Coordinate system:**
- X range: 0 (left) to 1000 (right), Y range: 0 (top) to 562 (bottom)
- Leave 20px margin from edges (safe area: x 20-980, y 20-542)

**Spacing rules:**
- Maintain at least 20px gap between adjacent elements
- Vertical stacking: next_y = previous_y + previous_height + 30
- Side by side: next_x = previous_x + previous_width + 30

**Layout patterns:**
- Top-down flow: Start from y=30, stack downward with gaps
- Two-column: Left column x=20-480, right column x=520-980
- Center single element: x = (1000 - element_width) / 2

**Before adding a new element:**
- Check existing elements' positions in the whiteboard state
- Ensure your new element's bounding box does not overlap with any existing element
- If space is insufficient, use wb_delete to remove unneeded elements or wb_clear to start fresh
${t}
${n}` : a === "assistant" ? `- The whiteboard is primarily the teacher's space. As an assistant, use it sparingly to supplement.
- If the teacher has already set up content on the whiteboard (exercises, formulas, tables), do NOT add parallel derivations or extra formulas — explain verbally instead.
- Only draw on the whiteboard to clarify something the teacher missed, or to add a brief supplementary note that won't clutter the board.
- Limit yourself to at most 1-2 small elements per response. Prefer speech over drawing.
${t}
${n}` : `- The whiteboard is primarily the teacher's space. Do NOT draw on it proactively.
- Only use whiteboard actions when the teacher or user explicitly invites you to write on the board (e.g., "come solve this", "show your work on the whiteboard").
- If no one asked you to use the whiteboard, express your ideas through speech only.
- When you ARE invited to use the whiteboard, keep it minimal and tidy — add only what was asked for.
${n}`;
}
function _(a) {
  return a.replace(/<[^>]*>/g, "").trim();
}
function C(a) {
  var i, d, e, s, o, c, p, l, w, y, u;
  const n = a.id ? `[id:${a.id}]` : "", t = `at (${Math.round(a.left)},${Math.round(a.top)})`, r = a.width != null && a.height != null ? ` size ${Math.round(a.width)}×${Math.round(a.height)}` : a.width != null ? ` w=${Math.round(a.width)}` : "";
  switch (a.type) {
    case "text": {
      const m = _(a.content || "").slice(0, 60), h = m.length >= 60 ? "..." : "";
      return `${n} text${a.textType ? `[${a.textType}]` : ""}: "${m}${h}" ${t}${r}`;
    }
    case "image": {
      const m = (i = a.src) != null && i.startsWith("data:") ? "[embedded]" : ((d = a.src) == null ? void 0 : d.slice(0, 50)) || "unknown";
      return `${n} image: ${m} ${t}${r}`;
    }
    case "shape": {
      const m = (e = a.text) != null && e.content ? _(a.text.content).slice(0, 40) : "";
      return `${n} shape${m ? `: "${m}"` : ""} ${t}${r}`;
    }
    case "chart":
      return `${n} chart[${a.chartType}]: labels=[${(((s = a.data) == null ? void 0 : s.labels) || []).slice(0, 4).join(",")}] ${t}${r}`;
    case "table": {
      const m = ((o = a.data) == null ? void 0 : o.length) || 0, h = ((p = (c = a.data) == null ? void 0 : c[0]) == null ? void 0 : p.length) || 0;
      return `${n} table: ${m}x${h} ${t}${r}`;
    }
    case "latex":
      return `${n} latex: "${(a.latex || "").slice(0, 40)}" ${t}${r}`;
    case "line": {
      const m = Math.round(a.left ?? 0), h = Math.round(a.top ?? 0), b = ((l = a.start) == null ? void 0 : l[0]) ?? 0, f = ((w = a.start) == null ? void 0 : w[1]) ?? 0, g = ((y = a.end) == null ? void 0 : y[0]) ?? 0, $ = ((u = a.end) == null ? void 0 : u[1]) ?? 0;
      return `${n} line: (${m + b},${h + f}) → (${m + g},${h + $})`;
    }
    case "video":
      return `${n} video ${t}${r}`;
    case "audio":
      return `${n} audio ${t}${r}`;
    default:
      return `${n} ${a.type || "unknown"} ${t}${r}`;
  }
}
function N(a) {
  return a.length === 0 ? "  (empty)" : a.map((t, r) => `  ${r + 1}. ${C(t)}`).join(`
`);
}
function D(a, n) {
  var i, d;
  if (!n || n.length === 0) return "";
  const t = [];
  for (const e of n)
    switch (e.actionName) {
      case "wb_clear":
        t.length = 0;
        break;
      case "wb_delete": {
        const s = String(e.params.elementId || ""), o = t.findIndex((c) => c.elementId === s);
        o >= 0 && t.splice(o, 1);
        break;
      }
      case "wb_draw_text": {
        const s = String(e.params.content || "").slice(0, 40), o = e.params.x ?? "?", c = e.params.y ?? "?", p = e.params.width ?? 400, l = e.params.height ?? 100;
        t.push({
          agentName: e.agentName,
          summary: `text: "${s}${s.length >= 40 ? "..." : ""}" at (${o},${c}), size ~${p}x${l}`
        });
        break;
      }
      case "wb_draw_shape": {
        const s = e.params.type || e.params.shape || "rectangle", o = e.params.x ?? "?", c = e.params.y ?? "?", p = e.params.width ?? 100, l = e.params.height ?? 100;
        t.push({
          agentName: e.agentName,
          summary: `shape(${s}) at (${o},${c}), size ${p}x${l}`
        });
        break;
      }
      case "wb_draw_chart": {
        const s = e.params.chartType || e.params.type || "bar", o = Array.isArray(e.params.labels) ? e.params.labels : (i = e.params.data) == null ? void 0 : i.labels, c = e.params.x ?? "?", p = e.params.y ?? "?", l = e.params.width ?? 350, w = e.params.height ?? 250;
        t.push({
          agentName: e.agentName,
          summary: `chart(${s})${o ? `: labels=[${o.slice(0, 4).join(",")}]` : ""} at (${c},${p}), size ${l}x${w}`
        });
        break;
      }
      case "wb_draw_latex": {
        const s = String(e.params.latex || "").slice(0, 40), o = e.params.x ?? "?", c = e.params.y ?? "?", p = e.params.width ?? 400, l = e.params.height ?? 80;
        t.push({
          agentName: e.agentName,
          summary: `latex: "${s}${s.length >= 40 ? "..." : ""}" at (${o},${c}), size ~${p}x${l}`
        });
        break;
      }
      case "wb_draw_table": {
        const s = e.params.data, o = (s == null ? void 0 : s.length) || 0, c = ((d = s == null ? void 0 : s[0]) == null ? void 0 : d.length) || 0, p = e.params.x ?? "?", l = e.params.y ?? "?", w = e.params.width ?? 400, y = e.params.height ?? o * 40 + 20;
        t.push({
          agentName: e.agentName,
          summary: `table(${o}×${c}) at (${p},${l}), size ${w}x${y}`
        });
        break;
      }
      case "wb_draw_line": {
        const s = e.params.startX ?? "?", o = e.params.startY ?? "?", c = e.params.endX ?? "?", p = e.params.endY ?? "?", l = e.params.points, w = l != null && l.includes("arrow") ? " (arrow)" : "";
        t.push({
          agentName: e.agentName,
          summary: `line${w}: (${s},${o}) → (${c},${p})`
        });
        break;
      }
    }
  if (t.length === 0) return "";
  const r = t.map((e, s) => `  ${s + 1}. [by ${e.agentName}] ${e.summary}`).join(`
`);
  return `
## Whiteboard Changes This Round (IMPORTANT)
Other agents have modified the whiteboard during this discussion round.
Current whiteboard elements (${t.length}):
${r}

DO NOT redraw content that already exists. Check positions above before adding new elements.
`;
}
function Y(a) {
  const { stage: n, scenes: t, currentSceneId: r, mode: i, whiteboardOpen: d } = a, e = [];
  if (e.push(`Mode: ${i}`), e.push(
    `Whiteboard: ${d ? "OPEN (slide canvas is hidden)" : "closed (slide canvas is visible)"}`
  ), n && e.push(
    `Course: ${n.name || "Untitled"}${n.description ? ` - ${n.description}` : ""}`
  ), e.push(`Total scenes: ${t.length}`), r) {
    const s = t.find((o) => o.id === r);
    if (s) {
      if (e.push(
        `Current scene: "${s.title}" (${s.type}, id: ${r})`
      ), s.content.type === "slide") {
        const o = s.content.canvas.elements;
        e.push(`Current slide elements (${o.length}):
${N(o)}`);
      }
      if (s.content.type === "quiz") {
        const o = s.content.questions, c = o.slice(0, 5).map((p, l) => `  ${l + 1}. [${p.type}] ${p.question.slice(0, 80)}`).join(`
`);
        e.push(
          `Quiz questions (${o.length}):
${c}${o.length > 5 ? `
  ... and ${o.length - 5} more` : ""}`
        );
      }
    }
  } else t.length > 0 && e.push("No scene currently selected");
  if (t.length > 0) {
    const s = t.slice(0, 5).map((o, c) => `  ${c + 1}. ${o.title} (${o.type}, id: ${o.id})`).join(`
`);
    e.push(
      `Scenes:
${s}${t.length > 5 ? `
  ... and ${t.length - 5} more` : ""}`
    );
  }
  if (n != null && n.whiteboard && n.whiteboard.length > 0) {
    const o = n.whiteboard[n.whiteboard.length - 1].elements || [];
    e.push(
      `Whiteboard (last of ${n.whiteboard.length}, ${o.length} elements):
${N(o)}`
    );
  }
  return e.join(`
`);
}
function R(a, n = 10, t = 200) {
  return a.length === 0 ? "No conversation history yet." : a.slice(-n).map((d) => {
    const e = d.role === "user" ? "User" : d.role === "assistant" ? "Assistant" : "System", s = d.content.length > t ? d.content.slice(0, t) + "..." : d.content;
    return `[${e}] ${s}`;
  }).join(`
`);
}
function W(a, n) {
  return a.filter((t) => t.role === "user" || t.role === "assistant").map((t) => {
    var s, o, c, p, l, w;
    if (t.role === "assistant") {
      const y = [];
      if (t.parts)
        for (const h of t.parts) {
          const b = h;
          if (b.type === "text" && b.text)
            y.push({ type: "text", content: b.text });
          else if ((s = b.type) != null && s.startsWith("action-") && b.state === "result") {
            const f = b.actionName || b.type.replace("action-", ""), g = b.output, x = (g == null ? void 0 : g.success) === !0 ? g != null && g.data ? `result: ${JSON.stringify(g.data).slice(0, 100)}` : "success" : (g == null ? void 0 : g.error) || "failed";
            y.push({
              type: "action",
              name: f,
              result: x
            });
          }
        }
      const u = y.length > 0 ? JSON.stringify(y) : "", m = (o = t.metadata) == null ? void 0 : o.agentId;
      if (n && m && m !== n) {
        const h = ((c = t.metadata) == null ? void 0 : c.senderName) || m;
        return {
          role: "user",
          content: u ? `[${h}]: ${u}` : ""
        };
      }
      return {
        role: "assistant",
        content: u
      };
    }
    const r = [];
    if (t.parts)
      for (const y of t.parts) {
        const u = y;
        if (u.type === "text" && u.text)
          r.push(u.text);
        else if ((p = u.type) != null && p.startsWith("action-") && u.state === "result") {
          const m = u.actionName || u.type.replace("action-", ""), h = u.output, f = (h == null ? void 0 : h.success) === !0 ? h != null && h.data ? `result: ${JSON.stringify(h.data).slice(0, 100)}` : "success" : (h == null ? void 0 : h.error) || "failed";
          r.push(`[Action ${m}: ${f}]`);
        }
      }
    const i = (l = t.metadata) == null ? void 0 : l.senderName;
    let d = r.join(`
`);
    return i && (d = `[${i}]: ${d}`), {
      role: "user",
      content: t.metadata && ((w = t.metadata) == null ? void 0 : w.interrupted) ? `${d}
[This response was interrupted — do NOT continue it. Start a new JSON array response.]` : d
    };
  }).filter((t) => t.content.replace(/[.\s…]+/g, "").length > 0);
}
export {
  q as buildStructuredPrompt,
  W as convertMessagesToOpenAI,
  R as summarizeConversation
};
//# sourceMappingURL=prompt-builder.js.map
