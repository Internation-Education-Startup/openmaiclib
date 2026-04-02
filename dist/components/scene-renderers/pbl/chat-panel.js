import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { useState as y, useRef as d, useEffect as k } from "react";
import { ArrowUp as R } from "lucide-react";
import { useI18n as j } from "../../../lib/hooks/use-i18n.js";
import { MessageResponse as E } from "../../ai-elements/message.js";
import { useDraftCache as I } from "../../../lib/hooks/use-draft-cache.js";
import { SpeechButton as K } from "../../audio/speech-button.js";
function H({
  messages: a,
  currentIssue: n,
  userRole: p,
  isLoading: s,
  onSendMessage: g
}) {
  const { t: c } = j(), [i, o] = y(""), u = d(null), N = d(null), m = d(!1), {
    cachedValue: l,
    updateCache: f,
    clearCache: v
  } = I({ key: "pblChatDraft" }), [C, D] = y(l);
  l !== C && (D(l), l && o(l)), k(() => {
    var t;
    (t = u.current) == null || t.scrollIntoView({ behavior: "smooth" });
  }, [a.length]);
  const w = (t) => {
    o(t), f(t);
  }, h = () => {
    !i.trim() || s || (g(i.trim()), o(""), v());
  }, S = (t) => {
    t.key === "Enter" && !t.shiftKey && !m.current && (t.preventDefault(), h());
  };
  return /* @__PURE__ */ r("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r("div", { className: "px-4 py-3 border-b", children: [
      /* @__PURE__ */ e("h2", { className: "font-semibold text-sm", children: c("pbl.chat.title") }),
      n && /* @__PURE__ */ r("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        c("pbl.chat.currentIssue"),
        ": ",
        n.title
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      a.map((t) => /* @__PURE__ */ e(_, { message: t, isUser: t.agent_name === p }, t.id)),
      s && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: /* @__PURE__ */ r("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ e("span", { className: "animate-bounce", style: { animationDelay: "0ms" }, children: "." }),
        /* @__PURE__ */ e("span", { className: "animate-bounce", style: { animationDelay: "150ms" }, children: "." }),
        /* @__PURE__ */ e("span", { className: "animate-bounce", style: { animationDelay: "300ms" }, children: "." })
      ] }) }),
      /* @__PURE__ */ e("div", { ref: u })
    ] }),
    /* @__PURE__ */ r("div", { className: "border-t p-3", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2 text-[10px] text-muted-foreground mb-2", children: /* @__PURE__ */ e("span", { children: c("pbl.chat.mentionHint") }) }),
      /* @__PURE__ */ r("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ e(
          "textarea",
          {
            ref: N,
            value: i,
            onChange: (t) => w(t.target.value),
            onKeyDown: S,
            onCompositionStart: () => {
              m.current = !0;
            },
            onCompositionEnd: () => {
              m.current = !1;
            },
            placeholder: c("pbl.chat.placeholder"),
            disabled: s,
            rows: 1,
            className: "flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          }
        ),
        /* @__PURE__ */ e(
          K,
          {
            size: "md",
            disabled: s,
            onTranscription: (t) => {
              o((x) => {
                const b = x + (x ? " " : "") + t;
                return f(b), b;
              });
            }
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: h,
            disabled: !i.trim() || s,
            className: "shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
            children: /* @__PURE__ */ e(R, { className: "w-4 h-4" })
          }
        )
      ] })
    ] })
  ] });
}
function _({ message: a, isUser: n }) {
  return a.agent_name === "System" ? /* @__PURE__ */ e("div", { className: "flex justify-center", children: /* @__PURE__ */ e("span", { className: "text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1", children: a.message }) }) : /* @__PURE__ */ r("div", { className: `flex flex-col ${n ? "items-end" : "items-start"}`, children: [
    /* @__PURE__ */ e("span", { className: "text-[10px] font-medium text-muted-foreground mb-0.5 px-1", children: a.agent_name }),
    /* @__PURE__ */ e(
      "div",
      {
        className: `rounded-xl px-3 py-2 text-sm max-w-[85%] ${n ? "bg-primary text-primary-foreground whitespace-pre-wrap" : "bg-muted"}`,
        children: n ? a.message : /* @__PURE__ */ e(E, { children: a.message })
      }
    )
  ] });
}
export {
  H as ChatPanel
};
//# sourceMappingURL=chat-panel.js.map
