import { jsxs as r, jsx as t, Fragment as pe } from "react/jsx-runtime";
import { forwardRef as ge, useState as k, useRef as T, useMemo as u, useCallback as m, useImperativeHandle as he } from "react";
import { cn as A } from "../../lib/utils/cn.js";
import { useI18n as ve } from "../../lib/hooks/use-i18n.js";
import "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as xe } from "../../lib/store/stage.js";
import "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { BookOpen as ye, MessageSquare as L, PanelRightClose as be } from "lucide-react";
import { Tabs as we, TabsList as Ne, TabsTrigger as M, TabsContent as S } from "../ui/tabs.js";
import { useChatSessions as ke } from "./use-chat-sessions.js";
import { SessionList as Te } from "./session-list.js";
import { LectureNotesView as Ae } from "./lecture-notes-view.js";
const Le = 340, Me = 240, Se = 560, De = ge(
  ({
    className: D,
    width: n = Le,
    onWidthChange: l,
    collapsed: c = !1,
    onCollapseChange: f,
    activeBubbleId: I,
    onActiveBubble: E,
    onLiveSpeech: _,
    onSpeechProgress: j,
    onThinking: B,
    onCueUser: R,
    onLiveSessionError: z,
    onStopSession: a,
    onSegmentSealed: C,
    shouldHoldAfterReveal: H,
    currentSceneId: O
  }, X) => {
    const { t: o } = ve(), p = xe((e) => e.scenes), {
      sessions: g,
      activeSessionType: F,
      expandedSessionIds: P,
      isStreaming: h,
      createSession: U,
      endSession: d,
      endActiveSession: V,
      softPauseActiveSession: W,
      resumeActiveSession: q,
      sendMessage: G,
      startDiscussion: J,
      startLecture: K,
      addLectureMessage: Q,
      toggleSessionExpand: Y,
      getLectureMessageId: Z,
      pauseBuffer: $,
      resumeBuffer: ee,
      pauseActiveLiveBuffer: te,
      resumeActiveLiveBuffer: se
    } = ke({
      onLiveSpeech: _,
      onSpeechProgress: j,
      onThinking: B,
      onCueUser: R,
      onActiveBubble: E,
      onLiveSessionError: z,
      onStopSession: a,
      onSegmentSealed: C,
      shouldHoldAfterReveal: H
    }), [v, x] = k("lecture"), y = T(!1), [re, b] = k(!1), ae = T(null), le = u(
      () => p.filter((e) => e.actions && e.actions.length > 0).map((e) => ({
        sceneId: e.id,
        sceneTitle: e.title,
        sceneOrder: e.order,
        items: e.actions.filter(
          (s) => s.type === "speech" || s.type === "spotlight" || s.type === "laser" || s.type === "play_video" || s.type === "discussion"
        ).map((s) => s.type === "speech" ? {
          kind: "speech",
          text: s.text
        } : {
          kind: "action",
          type: s.type,
          label: s.type === "discussion" ? s.topic : void 0
        }),
        completedAt: e.updatedAt || e.createdAt || 0
      })).sort((e, s) => e.sceneOrder - s.sceneOrder),
      [p]
    ), i = u(() => g.filter((e) => e.type !== "lecture"), [g]), oe = u(
      () => i.some((e) => e.status === "active"),
      [i]
    ), ie = m(
      async (e) => {
        await d(e), a == null || a();
      },
      [d, a]
    ), ne = m((e) => {
      x(e);
    }, []);
    he(X, () => ({
      createSession: U,
      endSession: d,
      endActiveSession: V,
      softPauseActiveSession: W,
      resumeActiveSession: q,
      sendMessage: G,
      startDiscussion: J,
      startLecture: K,
      addLectureMessage: Q,
      getIsStreaming: () => h,
      getActiveSessionType: () => F,
      getLectureMessageId: Z,
      pauseBuffer: $,
      resumeBuffer: ee,
      pauseActiveLiveBuffer: te,
      resumeActiveLiveBuffer: se,
      switchToTab: ne
    }));
    const ce = m(
      (e) => {
        e.preventDefault(), y.current = !0, b(!0);
        const s = e.clientX, de = n, w = (ue) => {
          const me = s - ue.clientX, fe = Math.min(Se, Math.max(Me, de + me));
          l == null || l(fe);
        }, N = () => {
          y.current = !1, b(!1), document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", N), document.body.style.cursor = "", document.body.style.userSelect = "";
        };
        document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", document.addEventListener("mousemove", w), document.addEventListener("mouseup", N);
      },
      [n, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        style: {
          width: c ? 0 : n,
          transition: re ? "none" : "width 0.3s ease"
        },
        className: A(
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-l border-gray-100 dark:border-gray-800 shadow-[-2px_0_24px_rgba(0,0,0,0.02)] flex flex-col shrink-0 z-20 relative overflow-visible",
          D
        ),
        children: [
          !c && /* @__PURE__ */ t(
            "div",
            {
              onMouseDown: ce,
              className: "absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize z-50 group hover:bg-purple-400/30 dark:hover:bg-purple-600/30 active:bg-purple-500/40 dark:active:bg-purple-500/40 transition-colors",
              children: /* @__PURE__ */ t("div", { className: "absolute left-0.5 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-400 dark:group-hover:bg-purple-500 transition-colors" })
            }
          ),
          /* @__PURE__ */ t("div", { className: A("flex flex-col w-full h-full overflow-hidden", c && "hidden"), children: /* @__PURE__ */ r(
            we,
            {
              value: v,
              onValueChange: (e) => x(e),
              className: "flex flex-col h-full gap-0",
              children: [
                /* @__PURE__ */ r("div", { className: "h-10 flex items-center gap-1 shrink-0 mt-3 mb-1 px-3", children: [
                  /* @__PURE__ */ r(Ne, { variant: "line", className: "h-full flex-1 w-0", children: [
                    /* @__PURE__ */ r(M, { value: "lecture", className: "text-xs gap-1 flex-1", children: [
                      /* @__PURE__ */ t(ye, { className: "w-3.5 h-3.5" }),
                      o("chat.tabs.lecture")
                    ] }),
                    /* @__PURE__ */ r(M, { value: "chat", className: "text-xs gap-1 flex-1 relative", children: [
                      /* @__PURE__ */ t(L, { className: "w-3.5 h-3.5" }),
                      o("chat.tabs.chat"),
                      oe && v === "lecture" && /* @__PURE__ */ r("span", { className: "absolute -top-0.5 -right-0.5 flex h-2 w-2", children: [
                        /* @__PURE__ */ t("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }),
                        /* @__PURE__ */ t("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-amber-500" })
                      ] })
                    ] })
                  ] }),
                  f && /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => f(!0),
                      className: "w-7 h-7 shrink-0 rounded-lg flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-gray-200/90 dark:hover:bg-gray-700/90 hover:text-gray-700 dark:hover:text-gray-200 active:scale-90 transition-all duration-200",
                      children: /* @__PURE__ */ t(be, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ t(S, { value: "lecture", className: "flex-1 overflow-hidden flex flex-col", children: /* @__PURE__ */ t(Ae, { notes: le, currentSceneId: O }) }),
                /* @__PURE__ */ t(S, { value: "chat", className: "flex-1 overflow-hidden flex flex-col", children: /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 scrollbar-hide", children: i.length === 0 ? /* @__PURE__ */ r("div", { className: "h-full flex flex-col items-center justify-center text-center p-6 opacity-50", children: [
                  /* @__PURE__ */ t("div", { className: "w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 text-gray-300 dark:text-gray-600", children: /* @__PURE__ */ t(L, { className: "w-6 h-6" }) }),
                  /* @__PURE__ */ t("p", { className: "text-xs font-medium text-gray-500 dark:text-gray-400", children: o("chat.noConversations") }),
                  /* @__PURE__ */ t("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 mt-1", children: o("chat.startConversation") })
                ] }) : /* @__PURE__ */ r(pe, { children: [
                  /* @__PURE__ */ t(
                    Te,
                    {
                      sessions: i,
                      expandedSessionIds: P,
                      isStreaming: h,
                      activeBubbleId: I,
                      onToggleExpand: Y,
                      onEndSession: ie
                    }
                  ),
                  /* @__PURE__ */ t("div", { ref: ae })
                ] }) }) })
              ]
            }
          ) })
        ]
      }
    );
  }
);
De.displayName = "ChatArea";
export {
  De as ChatArea
};
//# sourceMappingURL=chat-area.js.map
