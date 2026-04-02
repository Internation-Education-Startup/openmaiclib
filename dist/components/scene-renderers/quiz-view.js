import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { useState as j, useMemo as S, useCallback as I, useEffect as G, useRef as V } from "react";
import { AnimatePresence as X, motion as f } from "motion/react";
import { PieChart as M, Loader2 as F, CheckCircle2 as z, RotateCcw as Y, BookOpenText as B, ChevronRight as Z, XCircle as P, Check as q, Sparkles as ee } from "lucide-react";
import { cn as b } from "../../lib/utils/cn.js";
import { useI18n as k } from "../../lib/hooks/use-i18n.js";
import { getCurrentModelConfig as te } from "../../lib/utils/model-config.js";
import { createLogger as re } from "../../lib/logger.js";
import { useDraftCache as ae } from "../../lib/hooks/use-draft-cache.js";
import { SpeechButton as ie } from "../audio/speech-button.js";
const se = re("QuizView");
function ne(r, m) {
  if (r.length !== m.length) return !1;
  const s = [...r].sort(), l = [...m].sort();
  return s.every((n, o) => n === l[o]);
}
function D(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
function H(r) {
  return r.type === "short_answer" || !r.hasAnswer && (!r.answer || r.answer.length === 0);
}
function oe(r, m) {
  return r.filter((s) => !H(s)).map((s) => {
    const l = s.points ?? 1, n = D(m[s.id]), o = D(s.answer), t = ne(n, o);
    return {
      questionId: s.id,
      correct: t,
      status: t ? "correct" : "incorrect",
      earned: t ? l : 0
    };
  });
}
async function le(r, m, s) {
  const l = r.points ?? 1;
  try {
    const n = te(), o = {
      "Content-Type": "application/json",
      "x-model": n.modelString,
      "x-api-key": n.apiKey
    };
    n.baseUrl && (o["x-base-url"] = n.baseUrl), n.providerType && (o["x-provider-type"] = n.providerType), n.requiresApiKey && (o["x-requires-api-key"] = "true");
    const t = await fetch("/api/quiz-grade", {
      method: "POST",
      headers: o,
      body: JSON.stringify({
        question: r.question,
        userAnswer: m,
        points: l,
        commentPrompt: r.commentPrompt,
        language: s
      })
    });
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    const g = await t.json(), h = Math.max(0, Math.min(l, g.score));
    return {
      questionId: r.id,
      correct: h >= l * 0.8,
      status: h >= l * 0.8 ? "correct" : "incorrect",
      earned: h,
      aiComment: g.comment
    };
  } catch (n) {
    return se.error("[quiz-view] AI grading failed for", r.id, n), {
      questionId: r.id,
      correct: null,
      status: "incorrect",
      earned: Math.round(l * 0.5),
      aiComment: s === "zh-CN" ? "评分服务暂时不可用，已给予基础分。" : "Grading service unavailable. Base score given."
    };
  }
}
function de({
  questionCount: r,
  totalPoints: m,
  onStart: s
}) {
  const { t: l } = k();
  return /* @__PURE__ */ a("div", { className: "w-full h-full flex flex-col items-center justify-center gap-4 relative overflow-hidden", children: [
    /* @__PURE__ */ e("div", { className: "absolute top-0 right-0 p-6 opacity-[0.03]", children: /* @__PURE__ */ e(M, { className: "w-52 h-52 text-violet-500" }) }),
    /* @__PURE__ */ e("div", { className: "absolute bottom-0 left-0 p-6 opacity-[0.02]", children: /* @__PURE__ */ e(B, { className: "w-40 h-40 text-violet-500 rotate-12" }) }),
    /* @__PURE__ */ e(
      f.div,
      {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 200, damping: 20 },
        className: "w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-50 dark:from-violet-900/50 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-100 dark:shadow-violet-900/30 ring-1 ring-violet-200/50 dark:ring-violet-700/50",
        children: /* @__PURE__ */ e(M, { className: "w-8 h-8 text-violet-500" })
      }
    ),
    /* @__PURE__ */ a(
      f.div,
      {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.1 },
        className: "text-center z-10",
        children: [
          /* @__PURE__ */ e("h3", { className: "text-xl font-bold text-gray-800 dark:text-gray-100", children: l("quiz.title") }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: l("quiz.subtitle") })
        ]
      }
    ),
    /* @__PURE__ */ a(
      f.div,
      {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.2 },
        className: "flex gap-5 text-sm z-10",
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-center gap-2 text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ e("div", { className: "w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center", children: /* @__PURE__ */ e(B, { className: "w-3.5 h-3.5 text-violet-500" }) }),
            /* @__PURE__ */ a("span", { children: [
              r,
              " ",
              l("quiz.questionsCount")
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-2 text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ e("div", { className: "w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center", children: /* @__PURE__ */ e(M, { className: "w-3.5 h-3.5 text-violet-500" }) }),
            /* @__PURE__ */ a("span", { children: [
              l("quiz.totalPrefix"),
              " ",
              m,
              " ",
              l("quiz.pointsSuffix")
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ a(
      f.button,
      {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.3 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: s,
        className: "mt-1 px-8 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium shadow-lg shadow-violet-200/50 dark:shadow-violet-900/50 hover:shadow-violet-300/50 transition-shadow z-10 flex items-center gap-2",
        children: [
          l("quiz.startQuiz"),
          /* @__PURE__ */ e(Z, { className: "w-4 h-4" })
        ]
      }
    )
  ] });
}
function W({
  question: r,
  index: m,
  value: s,
  onChange: l,
  disabled: n,
  result: o
}) {
  var g;
  const t = !!o;
  return /* @__PURE__ */ e(Q, { question: r, index: m, result: o, children: /* @__PURE__ */ e("div", { className: "grid gap-2", children: (g = r.options) == null ? void 0 : g.map((h) => {
    var u;
    const x = s === h.value, c = t && ((u = r.answer) == null ? void 0 : u.includes(h.value)), y = t && x && (o == null ? void 0 : o.status) === "incorrect";
    return /* @__PURE__ */ a(
      "button",
      {
        disabled: n,
        onClick: () => !n && l(h.value),
        className: b(
          "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm",
          // Default state
          !t && !x && "border-gray-200 dark:border-gray-600 hover:border-violet-200 dark:hover:border-violet-700 hover:bg-violet-50/50 dark:hover:bg-violet-900/30",
          !t && x && "border-violet-400 bg-violet-50 dark:bg-violet-900/30 ring-1 ring-violet-200 dark:ring-violet-700",
          // Review states
          t && c && "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
          t && y && !c && "border-red-300 bg-red-50 dark:bg-red-900/30",
          t && !c && !x && "border-gray-100 dark:border-gray-700 opacity-60",
          n && !t && "cursor-default"
        ),
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: b(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                !t && !x && "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                !t && x && "bg-violet-500 text-white",
                t && c && "bg-emerald-500 text-white",
                t && y && !c && "bg-red-400 text-white",
                t && !c && !x && "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
              ),
              children: h.value
            }
          ),
          /* @__PURE__ */ e(
            "span",
            {
              className: b(
                "flex-1",
                t && !c && !x && "text-gray-400 dark:text-gray-500"
              ),
              children: h.label
            }
          ),
          t && c && /* @__PURE__ */ e(z, { className: "w-5 h-5 text-emerald-500 shrink-0" }),
          t && y && !c && /* @__PURE__ */ e(P, { className: "w-5 h-5 text-red-400 shrink-0" })
        ]
      },
      h.value
    );
  }) }) });
}
function _({
  question: r,
  index: m,
  value: s,
  onChange: l,
  disabled: n,
  result: o
}) {
  var c;
  const t = !!o, g = s ?? [], h = (y) => {
    n || (g.includes(y) ? l(g.filter((u) => u !== y)) : l([...g, y]));
  }, { t: x } = k();
  return /* @__PURE__ */ a(Q, { question: r, index: m, result: o, children: [
    !t && /* @__PURE__ */ e("p", { className: "text-xs text-gray-400 dark:text-gray-500 mb-2", children: x("quiz.multipleChoiceHint") }),
    /* @__PURE__ */ e("div", { className: "grid gap-2", children: (c = r.options) == null ? void 0 : c.map((y) => {
      var C;
      const u = g.includes(y.value), v = t && ((C = r.answer) == null ? void 0 : C.includes(y.value)), N = t && u && !v;
      return /* @__PURE__ */ a(
        "button",
        {
          disabled: n,
          onClick: () => h(y.value),
          className: b(
            "flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm",
            !t && !u && "border-gray-200 dark:border-gray-600 hover:border-violet-200 dark:hover:border-violet-700 hover:bg-violet-50/50 dark:hover:bg-violet-900/30",
            !t && u && "border-violet-400 bg-violet-50 dark:bg-violet-900/30 ring-1 ring-violet-200 dark:ring-violet-700",
            t && v && "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
            t && N && "border-red-300 bg-red-50 dark:bg-red-900/30",
            t && !v && !u && "border-gray-100 dark:border-gray-700 opacity-60",
            n && !t && "cursor-default"
          ),
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: b(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                  !t && !u && "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                  !t && u && "bg-violet-500 text-white",
                  t && v && "bg-emerald-500 text-white",
                  t && N && "bg-red-400 text-white",
                  t && !v && !u && "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                ),
                children: !t && u ? /* @__PURE__ */ e(q, { className: "w-3.5 h-3.5" }) : y.value
              }
            ),
            /* @__PURE__ */ e(
              "span",
              {
                className: b(
                  "flex-1",
                  t && !v && !u && "text-gray-400 dark:text-gray-500"
                ),
                children: y.label
              }
            ),
            t && v && /* @__PURE__ */ e(z, { className: "w-5 h-5 text-emerald-500 shrink-0" }),
            t && N && /* @__PURE__ */ e(P, { className: "w-5 h-5 text-red-400 shrink-0" })
          ]
        },
        y.value
      );
    }) })
  ] });
}
function E({
  question: r,
  index: m,
  value: s,
  onChange: l,
  disabled: n,
  result: o
}) {
  const t = !!o, { t: g } = k(), h = V(s);
  return G(() => {
    h.current = s;
  }, [s]), /* @__PURE__ */ e(Q, { question: r, index: m, result: o, children: t ? /* @__PURE__ */ a("div", { className: "space-y-3", children: [
    /* @__PURE__ */ a("div", { className: "p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300", children: [
      /* @__PURE__ */ e("p", { className: "text-xs text-gray-400 dark:text-gray-500 mb-1", children: g("quiz.yourAnswer") }),
      s || /* @__PURE__ */ e("span", { className: "text-gray-400 dark:text-gray-500 italic", children: g("quiz.notAnswered") })
    ] }),
    o.aiComment && /* @__PURE__ */ a("div", { className: "flex items-start gap-2 px-3 py-2 rounded-lg bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800", children: [
      /* @__PURE__ */ e(ee, { className: "w-4 h-4 text-violet-500 shrink-0 mt-0.5" }),
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ e("p", { className: "text-xs font-medium text-violet-600 dark:text-violet-400 mb-0.5", children: g("quiz.aiComment") }),
        /* @__PURE__ */ e("p", { className: "text-xs text-violet-600/80 dark:text-violet-400/80", children: o.aiComment })
      ] }),
      /* @__PURE__ */ a("span", { className: "ml-auto text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0", children: [
        o.earned,
        "/",
        r.points ?? 1,
        g("quiz.pointsSuffix")
      ] })
    ] })
  ] }) : /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        value: s ?? "",
        onChange: (x) => l(x.target.value),
        disabled: n,
        placeholder: g("quiz.inputPlaceholder"),
        className: "w-full min-h-[100px] p-3 pb-10 rounded-xl border border-gray-200 dark:border-gray-600 text-sm resize-none focus:outline-none focus:border-violet-300 dark:focus:border-violet-600 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/50 transition-all disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder:text-gray-500"
      }
    ),
    /* @__PURE__ */ e(
      ie,
      {
        size: "sm",
        disabled: n,
        className: "absolute bottom-3 left-3",
        onTranscription: (x) => {
          const c = h.current ?? "";
          l(c + (c ? " " : "") + x);
        }
      }
    ),
    /* @__PURE__ */ a("span", { className: "absolute bottom-3 right-3 text-xs text-gray-300 dark:text-gray-600", children: [
      (s ?? "").length,
      " ",
      g("quiz.charCount")
    ] })
  ] }) });
}
function Q({
  question: r,
  index: m,
  result: s,
  children: l
}) {
  const { t: n } = k(), o = !!s, t = r.points ?? 1;
  return /* @__PURE__ */ a(
    f.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: m * 0.05 },
      className: b(
        "bg-white dark:bg-gray-800 rounded-2xl border p-5 relative overflow-hidden",
        !o && "border-gray-150 dark:border-gray-700 shadow-sm",
        o && s.status === "correct" && "border-emerald-200 dark:border-emerald-800 shadow-sm shadow-emerald-50 dark:shadow-emerald-900/20",
        o && s.status === "incorrect" && "border-red-200 dark:border-red-800 shadow-sm shadow-red-50 dark:shadow-red-900/20"
      ),
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: b(
              "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl",
              !o && "bg-violet-400",
              o && s.status === "correct" && "bg-emerald-400",
              o && s.status === "incorrect" && "bg-red-400"
            )
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ a("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: b(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                  !o && "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
                  o && s.status === "correct" && "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
                  o && s.status === "incorrect" && "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                ),
                children: m + 1
              }
            ),
            /* @__PURE__ */ a("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed", children: r.question }),
              /* @__PURE__ */ a("p", { className: "text-xs text-gray-400 mt-0.5", children: [
                r.type === "single" ? n("quiz.singleChoice") : r.type === "multiple" ? n("quiz.multipleChoice") : n("quiz.shortAnswer"),
                " · ",
                t,
                " ",
                n("quiz.pointsSuffix")
              ] })
            ] })
          ] }),
          o && /* @__PURE__ */ a("div", { className: "shrink-0 ml-2", children: [
            s.status === "correct" && /* @__PURE__ */ e(z, { className: "w-6 h-6 text-emerald-500" }),
            s.status === "incorrect" && /* @__PURE__ */ e(P, { className: "w-6 h-6 text-red-400" })
          ] })
        ] }),
        l,
        o && r.analysis && /* @__PURE__ */ a("div", { className: "mt-3 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 leading-relaxed", children: [
          /* @__PURE__ */ e("span", { className: "font-medium", children: n("quiz.analysis") }),
          r.analysis
        ] })
      ]
    }
  );
}
function ce({
  score: r,
  total: m,
  results: s
}) {
  const { t: l } = k(), n = m > 0 ? Math.round(r / m * 100) : 0, o = s.filter((c) => c.status === "correct").length, t = s.filter((c) => c.status === "incorrect").length, g = n >= 80 ? "emerald" : n >= 60 ? "amber" : "red", x = {
    emerald: {
      bg: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-200/50 dark:shadow-emerald-900/50",
      ring: "bg-emerald-400/30",
      text: l("quiz.excellent")
    },
    amber: {
      bg: "from-amber-500 to-yellow-500",
      shadow: "shadow-amber-200/50 dark:shadow-amber-900/50",
      ring: "bg-amber-400/30",
      text: l("quiz.keepGoing")
    },
    red: {
      bg: "from-red-500 to-rose-500",
      shadow: "shadow-red-200/50 dark:shadow-red-900/50",
      ring: "bg-red-400/30",
      text: l("quiz.needsReview")
    }
  }[g];
  return /* @__PURE__ */ e(
    f.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: b("rounded-2xl p-6 bg-gradient-to-r text-white shadow-lg", x.bg, x.shadow),
      children: /* @__PURE__ */ a("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ e("p", { className: "text-white/80 text-sm font-medium", children: x.text }),
          /* @__PURE__ */ a("div", { className: "flex items-baseline gap-1 mt-1", children: [
            /* @__PURE__ */ e("span", { className: "text-4xl font-black", children: r }),
            /* @__PURE__ */ a("span", { className: "text-white/60 text-lg", children: [
              "/ ",
              m
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex gap-3 mt-3 text-xs", children: [
            /* @__PURE__ */ a("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e(z, { className: "w-3.5 h-3.5" }),
              " ",
              o,
              " ",
              l("quiz.correct")
            ] }),
            /* @__PURE__ */ a("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e(P, { className: "w-3.5 h-3.5" }),
              " ",
              t,
              " ",
              l("quiz.incorrect")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "relative w-20 h-20", children: [
          /* @__PURE__ */ a("svg", { className: "w-20 h-20 -rotate-90", viewBox: "0 0 80 80", children: [
            /* @__PURE__ */ e(
              "circle",
              {
                cx: "40",
                cy: "40",
                r: "34",
                fill: "none",
                stroke: "rgba(255,255,255,0.2)",
                strokeWidth: "6"
              }
            ),
            /* @__PURE__ */ e(
              f.circle,
              {
                cx: "40",
                cy: "40",
                r: "34",
                fill: "none",
                stroke: "white",
                strokeWidth: "6",
                strokeLinecap: "round",
                strokeDasharray: `${2 * Math.PI * 34}`,
                initial: { strokeDashoffset: 2 * Math.PI * 34 },
                animate: { strokeDashoffset: 2 * Math.PI * 34 * (1 - n / 100) },
                transition: { duration: 1, ease: "easeOut", delay: 0.3 }
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ a("span", { className: "text-lg font-black", children: [
            n,
            "%"
          ] }) })
        ] })
      ] })
    }
  );
}
function we({ questions: r, sceneId: m }) {
  const { t: s, locale: l } = k(), [n, o] = j("not_started"), [t, g] = j({}), [h, x] = j([]), {
    cachedValue: c,
    updateCache: y,
    clearCache: u
  } = ae({
    key: `quizDraft:${m}`
  }), [v, N] = j(c);
  c !== v && (N(c), c && Object.keys(c).length > 0 && n === "not_started" && (g(c), o("answering")));
  const C = S(
    () => r.reduce((i, d) => i + (d.points ?? 1), 0),
    [r]
  ), T = S(() => r.every((i) => {
    const d = t[i.id];
    return d ? Array.isArray(d) ? d.length > 0 : d.trim().length > 0 : !1;
  }), [r, t]), R = I(
    (i, d) => {
      g((p) => {
        const A = { ...p, [i]: d };
        return y(A), A;
      });
    },
    [y]
  ), L = I(() => {
    o("grading"), u();
  }, [u]);
  G(() => {
    if (n !== "grading") return;
    let i = !1;
    return (async () => {
      const d = oe(r, t), p = r.filter(H), A = await Promise.all(
        p.map(
          (w) => le(w, t[w.id] ?? "", l)
        )
      );
      if (i) return;
      const O = /* @__PURE__ */ new Map();
      for (const w of [...d, ...A])
        O.set(w.questionId, w);
      const J = r.map((w) => O.get(w.id)).filter(Boolean);
      x(J), o("reviewing");
    })(), () => {
      i = !0;
    };
  }, [n, r, t, l]);
  const $ = I(() => {
    o("not_started"), g({}), x([]), u();
  }, [u]), K = S(() => h.reduce((i, d) => i + d.earned, 0), [h]), U = S(() => {
    const i = {};
    return h.forEach((d) => {
      i[d.questionId] = d;
    }), i;
  }, [h]);
  return /* @__PURE__ */ e("div", { className: "w-full h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 overflow-hidden flex flex-col", children: /* @__PURE__ */ a(X, { mode: "wait", children: [
    n === "not_started" && /* @__PURE__ */ e(
      f.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, x: -20 },
        className: "flex-1",
        children: /* @__PURE__ */ e(
          de,
          {
            questionCount: r.length,
            totalPoints: C,
            onStart: () => o("answering")
          }
        )
      },
      "cover"
    ),
    n === "answering" && /* @__PURE__ */ a(
      f.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        className: "flex-1 flex flex-col min-h-0",
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur shrink-0", children: [
            /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(M, { className: "w-4 h-4 text-violet-500" }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-gray-700 dark:text-gray-200", children: s("quiz.answering") }),
              /* @__PURE__ */ a("span", { className: "text-xs text-gray-400 ml-1", children: [
                Object.keys(t).filter((i) => {
                  const d = t[i];
                  return Array.isArray(d) ? d.length > 0 : typeof d == "string" && d.trim().length > 0;
                }).length,
                " ",
                "/ ",
                r.length
              ] })
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: L,
                disabled: !T,
                className: b(
                  "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                  T ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm hover:shadow-md hover:shadow-violet-200/50 dark:hover:shadow-violet-900/50 active:scale-[0.97]" : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                ),
                children: s("quiz.submitAnswers")
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "flex-1 overflow-y-auto px-6 py-4 space-y-4", children: r.map((i, d) => i.type === "single" ? /* @__PURE__ */ e(
            W,
            {
              question: i,
              index: d,
              value: t[i.id],
              onChange: (p) => R(i.id, p)
            },
            i.id
          ) : i.type === "multiple" ? /* @__PURE__ */ e(
            _,
            {
              question: i,
              index: d,
              value: t[i.id],
              onChange: (p) => R(i.id, p)
            },
            i.id
          ) : /* @__PURE__ */ e(
            E,
            {
              question: i,
              index: d,
              value: t[i.id],
              onChange: (p) => R(i.id, p)
            },
            i.id
          )) })
        ]
      },
      "answering"
    ),
    n === "grading" && /* @__PURE__ */ a(
      f.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "flex-1 flex flex-col items-center justify-center gap-5",
        children: [
          /* @__PURE__ */ e(
            f.div,
            {
              animate: { rotate: 360 },
              transition: { repeat: 1 / 0, duration: 1.5, ease: "linear" },
              children: /* @__PURE__ */ e(F, { className: "w-10 h-10 text-violet-500" })
            }
          ),
          /* @__PURE__ */ a("div", { className: "text-center", children: [
            /* @__PURE__ */ e("p", { className: "text-base font-semibold text-gray-700 dark:text-gray-200", children: s("quiz.aiGrading") }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-400 mt-1", children: s("quiz.aiGradingWait") })
          ] }),
          /* @__PURE__ */ e("div", { className: "flex gap-1 mt-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ e(
            f.div,
            {
              className: "w-2 h-2 rounded-full bg-violet-400",
              animate: { opacity: [0.3, 1, 0.3] },
              transition: {
                repeat: 1 / 0,
                duration: 1.2,
                delay: i * 0.2
              }
            },
            i
          )) })
        ]
      },
      "grading"
    ),
    n === "reviewing" && /* @__PURE__ */ a(
      f.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        className: "flex-1 flex flex-col min-h-0",
        children: [
          /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur shrink-0", children: [
            /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(z, { className: "w-4 h-4 text-emerald-500" }),
              /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-gray-700 dark:text-gray-200", children: s("quiz.quizReport") })
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                onClick: $,
                className: "flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                children: [
                  /* @__PURE__ */ e(Y, { className: "w-3.5 h-3.5" }),
                  s("quiz.retry")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto px-6 py-4 space-y-4", children: [
            /* @__PURE__ */ e(ce, { score: K, total: C, results: h }),
            r.map((i, d) => {
              const p = U[i.id];
              return i.type === "single" ? /* @__PURE__ */ e(
                W,
                {
                  question: i,
                  index: d,
                  value: t[i.id],
                  onChange: () => {
                  },
                  disabled: !0,
                  result: p
                },
                i.id
              ) : i.type === "multiple" ? /* @__PURE__ */ e(
                _,
                {
                  question: i,
                  index: d,
                  value: t[i.id],
                  onChange: () => {
                  },
                  disabled: !0,
                  result: p
                },
                i.id
              ) : /* @__PURE__ */ e(
                E,
                {
                  question: i,
                  index: d,
                  value: t[i.id],
                  onChange: () => {
                  },
                  disabled: !0,
                  result: p
                },
                i.id
              );
            })
          ] })
        ]
      },
      "reviewing"
    )
  ] }) });
}
export {
  we as QuizView
};
//# sourceMappingURL=quiz-view.js.map
