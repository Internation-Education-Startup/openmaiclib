import { jsxs as a, jsx as e, Fragment as Ne } from "react/jsx-runtime";
import { useState as re, useRef as z, useEffect as K, useCallback as ce } from "react";
import { AnimatePresence as h, motion as o } from "motion/react";
import { Loader2 as Ge, Send as gr, Mic as ae, MessageSquare as _e, MicOff as mr, BookOpen as qr, Volume2 as Sr, Play as hr, Repeat as Dr, Pause as Pr, ChevronLeft as ea, ChevronRight as ra } from "lucide-react";
import { cn as l } from "../../lib/utils/cn.js";
import { CanvasToolbar as aa } from "../canvas/canvas-toolbar.js";
import { useAudioRecorder as ta } from "../../lib/hooks/use-audio-recorder.js";
import { useI18n as la } from "../../lib/hooks/use-i18n.js";
import { toast as fr } from "sonner";
import { useSettingsStore as I, PLAYBACK_SPEEDS as Je } from "../../lib/store/settings.js";
import { ProactiveCard as Me } from "../chat/proactive-card.js";
import { PresentationSpeechOverlay as xr } from "./presentation-speech-overlay.js";
import { AvatarDisplay as je } from "../ui/avatar-display.js";
import { HoverCard as vr, HoverCardTrigger as yr, HoverCardContent as wr } from "../ui/hover-card.js";
import { useAgentRegistry as oa } from "../../lib/orchestration/registry/store.js";
import { DEFAULT_TEACHER_AVATAR as da, DEFAULT_USER_AVATAR as ia } from "./constants.js";
const na = [
  { peak: 18, duration: 0.55 },
  { peak: 24, duration: 0.72 },
  { peak: 15, duration: 0.63 },
  { peak: 22, duration: 0.68 },
  { peak: 27, duration: 0.78 },
  { peak: 19, duration: 0.61 },
  { peak: 26, duration: 0.74 },
  { peak: 17, duration: 0.58 },
  { peak: 23, duration: 0.7 },
  { peak: 16, duration: 0.57 },
  { peak: 21, duration: 0.66 },
  { peak: 14, duration: 0.53 }
];
function kr({ barClassName: Qe }) {
  return na.map(($, p) => /* @__PURE__ */ e(
    o.div,
    {
      animate: {
        height: [4, $.peak, 4],
        opacity: [0.3, 1, 0.3]
      },
      transition: {
        repeat: 1 / 0,
        duration: $.duration,
        delay: p * 0.05,
        ease: "easeInOut"
      },
      className: l("w-1 rounded-full", Qe)
    },
    p
  ));
}
function za({
  mode: Qe = "autonomous",
  initialParticipants: $ = [],
  playbackView: p,
  currentSpeech: f,
  lectureSpeech: ze,
  idleText: Ze,
  playbackCompleted: Nr,
  discussionRequest: n,
  engineMode: E = "idle",
  isStreaming: te,
  sessionType: Ie,
  speakingAgentId: w,
  audioIndicatorState: Ee,
  audioAgentId: _r,
  speechProgress: sa,
  showEndFlash: Ue,
  endFlashSessionType: Re = "discussion",
  thinkingState: b,
  isCueUser: k,
  isTopicPending: W,
  onMessageSend: U,
  onDiscussionStart: C,
  onDiscussionSkip: B,
  onStopDiscussion: jr,
  onInputActivate: R,
  onResumeTopic: G,
  onPlayPause: g,
  isDiscussionPaused: Y,
  onDiscussionPause: N,
  onDiscussionResume: _,
  currentSceneIndex: zr = 0,
  scenesCount: Ir = 1,
  whiteboardOpen: Er = !1,
  sidebarCollapsed: Ar,
  chatCollapsed: le,
  onToggleSidebar: Lr,
  onToggleChat: Tr,
  onPrevSlide: Or,
  onNextSlide: Cr,
  onWhiteboardClose: Br,
  isPresenting: V,
  controlsVisible: q,
  onTogglePresentation: Fr,
  onPresentationInteractionChange: J,
  fullscreenContainerRef: Ae
}) {
  var ir, nr, sr, pr;
  const { t: d } = la(), Ve = I((r) => r.ttsMuted), Hr = I((r) => r.setTTSMuted), qe = I((r) => r.ttsEnabled), c = I((r) => r.asrEnabled), ue = I((r) => r.chatAreaWidth), Kr = I((r) => r.ttsVolume), $r = I((r) => r.setTTSVolume), Se = I((r) => r.autoPlayLecture), Wr = I((r) => r.setAutoPlayLecture), Le = I((r) => r.playbackSpeed), De = I((r) => r.setPlaybackSpeed), [u, S] = re(!1), [m, A] = re(!1), [oe, Te] = re(""), [L, Oe] = re(null), Ce = z(null), Pe = z(null), Be = z(null), Fe = z(/* @__PURE__ */ new Map()), de = z(null), [er, He] = re(!1), [x, be] = re(!1), ie = z(!1), i = $.find((r) => r.role === "teacher"), ge = $.filter(
    (r) => r.role !== "teacher" && r.role !== "user"
  ), me = z(null), Yr = z(null), rr = z(null);
  K(() => {
    if (!n) {
      me.current = null;
      return;
    }
    n.agentId === (i == null ? void 0 : i.id) ? me.current = Be.current : me.current = Fe.current.get(n.agentId || "") || null;
  }, [n, i == null ? void 0 : i.id]);
  const T = (p == null ? void 0 : p.isInLiveFlow) ?? !!(w || b || te || Ie), he = L || ((p == null ? void 0 : p.sourceText) ?? (f || (T ? "" : ze || (Nr ? "" : Ze) || ""))), fe = !!(p != null && p.sourceText || b), Ke = z(fe), D = ce(() => {
    de.current && (clearTimeout(de.current), de.current = null);
  }, []), ar = ce(() => {
    D(), de.current = setTimeout(() => {
      Oe(null), de.current = null;
    }, 3e3);
  }, [D]), tr = ce(
    (r) => {
      Oe(r), Ke.current = !0, ar();
    },
    [ar]
  );
  K(() => {
    if (!T) return;
    const r = Pe.current;
    if (!r) return;
    const t = r.scrollHeight - r.clientHeight;
    t <= 0 || r.scrollTo({ top: t, behavior: "smooth" });
  }, [he, T]), K(() => {
    const r = fe && !Ke.current;
    L && r && (D(), Oe(null)), Ke.current = fe;
  }, [D, fe, L]), K(() => () => D(), [D]), K(() => {
    if (Ue) {
      He(!0);
      const r = setTimeout(() => He(!1), 1800);
      return () => clearTimeout(r);
    } else
      He(!1);
  }, [Ue]), K(() => {
    x && w && (be(!1), ie.current = !1);
  }, [x, w]);
  const lr = z(!1);
  K(() => {
    lr.current && !te && x && (be(!1), ie.current = !1), lr.current = !!te;
  }, [te, x]);
  const $e = $.find((r) => r.role === "user"), xe = (i == null ? void 0 : i.avatar) || da, P = (i == null ? void 0 : i.name) || d("roundtable.teacher"), ne = ($e == null ? void 0 : $e.avatar) || ia, { isRecording: M, isProcessing: F, startRecording: Xr, stopRecording: Gr, cancelRecording: ve } = ta({
    onTranscription: (r) => {
      if (!r.trim()) {
        fr.info(d("roundtable.noSpeechDetected")), A(!1);
        return;
      }
      if (ie.current) {
        A(!1);
        return;
      }
      tr(r), U == null || U(r), be(!0), ie.current = !0, A(!1);
    },
    onError: (r) => {
      fr.error(r), A(!1);
    }
  }), ye = () => {
    !oe.trim() || x || (tr(oe), U == null || U(oe), be(!0), ie.current = !0, Te(""), S(!1));
  }, Q = () => {
    x || (u || R == null || R(), S(!u), (m || F) && (ve(), A(!1)));
  }, Z = () => {
    if (m)
      M && Gr(), A(!1);
    else {
      if (x || F) return;
      R == null || R(), A(!0), S(!1), Xr();
    }
  };
  K(() => {
    const r = (t) => {
      if (t.key === "Escape") {
        (u || m) && (t.preventDefault(), t.stopPropagation(), S(!1), A(!1), (M || F) && ve());
        return;
      }
      const ee = t.target.tagName;
      if (!(ee === "INPUT" || ee === "TEXTAREA" || t.target.isContentEditable))
        switch (t.key) {
          case " ":
          case "Spacebar":
            if (!T) return;
            t.preventDefault(), Y ? _ == null || _() : !b && f && (N == null || N());
            break;
          case "t":
          case "T":
            t.preventDefault(), Q();
            break;
          case "v":
          case "V":
            t.preventDefault(), c && Z();
            break;
        }
    };
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [
    T,
    Y,
    b,
    f,
    N,
    _,
    c,
    u,
    m,
    M,
    F
  ]);
  const We = u || m || M || F;
  K(() => (J == null || J(We), () => {
    We && (J == null || J(!1));
  }), [We, J]);
  const v = w ? ge.find((r) => r.id === w) : null, we = !!(w && !f && !L), se = !!(v && !f && !L), j = L ? "user" : (p == null ? void 0 : p.activeRole) ?? (f && v ? "agent" : f ? "teacher" : se ? "agent" : we ? "teacher" : k ? null : ze ? "teacher" : null), s = L ? "user" : (p == null ? void 0 : p.bubbleRole) ?? (f && v ? "agent" : f ? "teacher" : se ? "agent" : we ? "teacher" : T || k ? null : ze || Ze ? "teacher" : null), ke = s === "agent" ? (v == null ? void 0 : v.name) || d("settings.agentRoles.student") : s === "teacher" ? P : s === "user" ? d("roundtable.you") : "", Jr = s === "user" ? "user" : s === "agent" ? `agent-${w}` : s === "teacher" ? "teacher" : "idle", X = p ? { ...p, bubbleRole: s, sourceText: he, activeRole: j ?? p.activeRole } : {
    phase: "idle",
    sourceText: he,
    bubbleRole: s,
    activeRole: j,
    buttonState: "none",
    isInLiveFlow: !1,
    isTopicActive: !1
  }, Mr = E === "live" || Ie === "qa" || Ie === "discussion", Qr = ce(() => {
    const t = (Je.indexOf(Le) + 1) % Je.length;
    De(Je[t]);
  }, [Le, De]), Zr = oa.getState(), pe = (r) => Zr.getAgent(r), O = n ? n.agentId === (i == null ? void 0 : i.id) ? i || null : ge.find((r) => r.id === n.agentId) || null : null, H = n ? pe(n.agentId || "") : null, or = ce(() => {
    if (W) {
      G == null || G();
      return;
    }
    if (T) {
      Y ? _ == null || _() : !b && f && (N == null || N());
      return;
    }
    g == null || g();
  }, [
    W,
    T,
    Y,
    b,
    f,
    G,
    _,
    N,
    g
  ]), Ur = !!q || !!n || k || u || m || M || F, dr = /* @__PURE__ */ e(
    aa,
    {
      className: "shrink-0 h-8 px-3 border-b border-gray-100/40 dark:border-gray-700/30",
      currentSceneIndex: zr,
      scenesCount: Ir,
      engineState: E === "playing" || E === "live" ? "playing" : E === "paused" ? "paused" : "idle",
      isLiveSession: te || W || E === "live",
      whiteboardOpen: Er,
      sidebarCollapsed: Ar,
      chatCollapsed: le,
      onToggleSidebar: Lr,
      onToggleChat: Tr,
      onPrevSlide: Or ?? (() => {
      }),
      onNextSlide: Cr ?? (() => {
      }),
      onPlayPause: g ?? (() => {
      }),
      onWhiteboardClose: Br ?? (() => {
      }),
      isPresenting: V,
      onTogglePresentation: Fr,
      showStopDiscussion: Mr,
      onStopDiscussion: jr,
      ttsEnabled: qe,
      ttsMuted: Ve,
      ttsVolume: Kr,
      onToggleMute: () => qe && Hr(!Ve),
      onVolumeChange: (r) => $r(r),
      autoPlayLecture: Se,
      onToggleAutoPlay: () => Wr(!Se),
      playbackSpeed: Le,
      onCycleSpeed: Qr
    }
  );
  return V ? /* @__PURE__ */ a("div", { className: "h-0 w-full relative z-10 overflow-visible", children: [
    /* @__PURE__ */ e(
      xr,
      {
        playbackView: X,
        participants: $,
        speakingAgentId: w ?? null,
        isTopicPending: !!W,
        side: "left",
        onBubbleClick: or,
        audioIndicatorState: Ee ?? "idle",
        buttonState: X == null ? void 0 : X.buttonState,
        isPaused: Y || E === "paused"
      }
    ),
    (u || m) && /* @__PURE__ */ e(
      "div",
      {
        className: "fixed top-0 left-0 right-0 bottom-14 z-[45] pointer-events-auto",
        onClick: () => {
          S(!1), A(!1), ve();
        }
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: l(
          "fixed bottom-0 left-0 z-[40] pointer-events-none flex items-center justify-center transition-all duration-300",
          q ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        ),
        style: { right: le === !1 ? ue ?? 320 : 0 },
        children: /* @__PURE__ */ e("div", { className: "mb-3 px-2 py-1 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto", children: dr })
      }
    ),
    /* @__PURE__ */ e(h, { children: er && /* @__PURE__ */ a(
      o.div,
      {
        initial: { opacity: 0, y: 10, scale: 0.9 },
        animate: {
          opacity: [0, 1, 1, 0],
          y: [10, 0, 0, 6],
          scale: [0.9, 1, 1, 0.95]
        },
        transition: {
          duration: 1.8,
          times: [0, 0.15, 0.7, 1],
          ease: "easeOut"
        },
        className: "fixed bottom-20 -translate-x-1/2 z-[50] bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-white px-3.5 py-1.5 rounded-full text-xs font-medium pointer-events-none",
        style: {
          left: `calc((100vw - ${le === !1 ? ue ?? 320 : 0}px) / 2)`
        },
        children: [
          /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-400 inline-block mr-1.5" }),
          d(Re === "discussion" ? "roundtable.discussionEnded" : "roundtable.qaEnded")
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "fixed bottom-14 left-0 z-[50] flex flex-col items-center justify-center gap-3 pointer-events-none transition-[right] duration-300",
        style: { right: le === !1 ? ue ?? 320 : 0 },
        children: [
          /* @__PURE__ */ e(h, { children: u && /* @__PURE__ */ e(
            o.div,
            {
              initial: { opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" },
              animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" },
              className: "w-[min(480px,calc(100vw-3rem))] pointer-events-auto",
              children: /* @__PURE__ */ a("div", { className: "flex items-center gap-3 bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-gray-200/60 dark:border-white/10", children: [
                /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ e(
                  "textarea",
                  {
                    value: oe,
                    onChange: (r) => Te(r.target.value),
                    onKeyDown: (r) => {
                      r.key === "Enter" && !r.shiftKey && !r.nativeEvent.isComposing && (r.preventDefault(), ye());
                    },
                    placeholder: d("roundtable.inputPlaceholder"),
                    autoFocus: !0,
                    rows: 1,
                    className: "w-full resize-none bg-transparent border-none focus:ring-0 focus:outline-none outline-none shadow-none ring-0 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-400 py-0 leading-[40px] max-h-[80px]",
                    style: { fieldSizing: "content" }
                  }
                ) }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: ye,
                    disabled: x,
                    className: l(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0",
                      x ? "bg-gray-500/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 shadow-[0_4px_16px_rgba(147,51,234,0.3)]"
                    ),
                    children: x ? /* @__PURE__ */ e(Ge, { className: "w-4 h-4 text-white animate-spin" }) : /* @__PURE__ */ e(gr, { className: "w-4 h-4 text-white" })
                  }
                )
              ] })
            },
            "presentation-input-stage"
          ) }),
          /* @__PURE__ */ e(h, { children: m && /* @__PURE__ */ e(
            o.div,
            {
              initial: { opacity: 0, scale: 0.9, y: 20, filter: "blur(4px)" },
              animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, scale: 0.9, y: 20, filter: "blur(4px)" },
              className: "pointer-events-auto",
              children: /* @__PURE__ */ a("div", { className: "flex items-center gap-4 bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-full px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-gray-200/60 dark:border-white/10", children: [
                /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5 h-8", children: /* @__PURE__ */ e(kr, { barClassName: "bg-gradient-to-t from-purple-400 to-indigo-400" }) }),
                /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold tracking-wider text-purple-600 dark:text-purple-300 uppercase", children: d(F ? "roundtable.processing" : "roundtable.listening") }),
                /* @__PURE__ */ a(
                  "button",
                  {
                    type: "button",
                    "aria-label": d(M ? "roundtable.stopRecording" : "roundtable.startRecording"),
                    className: "relative group cursor-pointer bg-transparent border-none p-0",
                    onClick: Z,
                    children: [
                      /* @__PURE__ */ e("div", { className: "relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-[0_4px_20px_rgba(147,51,234,0.3)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-white/20", children: /* @__PURE__ */ e(ae, { className: "w-5 h-5 text-white" }) }),
                      /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full border-2 border-purple-500 opacity-40 animate-[ping_2s_ease-in-out_infinite]" })
                    ]
                  }
                )
              ] })
            },
            "presentation-voice-stage"
          ) }),
          /* @__PURE__ */ e(h, { children: k && !s && !b && !u && !m && /* @__PURE__ */ e(
            o.div,
            {
              initial: { opacity: 0, scale: 0.92, y: 8 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.92, y: 8 },
              transition: { duration: 0.22, ease: [0.21, 1, 0.36, 1] },
              className: "pointer-events-auto",
              children: /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => c ? Z() : Q(),
                  className: "flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-amber-400/50 dark:border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.2),0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_0_16px_rgba(245,158,11,0.25),0_8px_32px_rgba(0,0,0,0.4)] text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-wide hover:bg-gray-100/80 dark:hover:bg-black/60 hover:border-amber-500/70 dark:hover:border-amber-400/70 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] dark:hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all active:scale-95 animate-pulse",
                  children: [
                    c ? /* @__PURE__ */ e(ae, { className: "w-4 h-4" }) : /* @__PURE__ */ e(_e, { className: "w-4 h-4" }),
                    d("roundtable.yourTurn")
                  ]
                }
              )
            },
            "presentation-cue-user"
          ) }),
          /* @__PURE__ */ e(h, { children: (b == null ? void 0 : b.stage) === "director" && !f && !L && /* @__PURE__ */ a(
            o.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              className: "flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-full border border-gray-200/60 dark:border-white/10",
              children: [
                /* @__PURE__ */ e("div", { className: "flex gap-1", children: [0, 0.2, 0.4].map((r) => /* @__PURE__ */ e(
                  o.div,
                  {
                    animate: { opacity: [0.3, 1, 0.3] },
                    transition: { repeat: 1 / 0, duration: 1.2, delay: r },
                    className: "w-1.5 h-1.5 rounded-full bg-purple-400"
                  },
                  r
                )) }),
                /* @__PURE__ */ e("span", { className: "text-[10px] text-gray-500 dark:text-gray-400 font-medium", children: d("roundtable.thinking") })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ a(
      "div",
      {
        className: "fixed bottom-5 z-[48] flex flex-col items-end gap-3 pointer-events-none transition-[right] duration-300",
        style: { right: le ? 20 : 20 + (ue ?? 320) },
        children: [
          /* @__PURE__ */ e(
            xr,
            {
              playbackView: X,
              participants: $,
              speakingAgentId: w ?? null,
              isTopicPending: !!W,
              userAvatar: ne,
              side: "right",
              onBubbleClick: or,
              audioIndicatorState: Ee ?? "idle",
              buttonState: X == null ? void 0 : X.buttonState,
              isPaused: Y || E === "paused"
            }
          ),
          /* @__PURE__ */ e(h, { children: Ur && /* @__PURE__ */ a(
            o.div,
            {
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.92 },
              transition: { duration: 0.2, ease: "easeOut" },
              className: "pointer-events-auto",
              children: [
                /* @__PURE__ */ a(
                  "div",
                  {
                    ref: Yr,
                    className: "flex items-center gap-2.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-2.5 py-2",
                    children: [
                      /* @__PURE__ */ e(h, { children: (j === "agent" && v || O) && /* @__PURE__ */ e(
                        o.div,
                        {
                          ref: rr,
                          initial: { opacity: 0, scale: 0.8, width: 0 },
                          animate: { opacity: 1, scale: 1, width: "auto" },
                          exit: { opacity: 0, scale: 0.8, width: 0 },
                          transition: { duration: 0.2, ease: "easeOut" },
                          className: "shrink-0 overflow-hidden",
                          children: /* @__PURE__ */ a("div", { className: "relative w-10 h-10 rounded-full flex items-center justify-center", children: [
                            /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full border-2 border-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.3)] transition-all duration-300" }),
                            /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative z-10 text-lg", children: /* @__PURE__ */ e(
                              je,
                              {
                                src: ((ir = v || O) == null ? void 0 : ir.avatar) || "/avatars/user.png",
                                alt: ((nr = v || O) == null ? void 0 : nr.name) || ""
                              }
                            ) })
                          ] })
                        },
                        `dock-agent-${(sr = v || O) == null ? void 0 : sr.id}`
                      ) }),
                      x ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-[3px]", children: [0, 1, 2].map((r) => /* @__PURE__ */ e(
                        o.div,
                        {
                          animate: { y: [0, -3, 0], opacity: [0.35, 0.9, 0.35] },
                          transition: {
                            repeat: 1 / 0,
                            duration: 0.9,
                            delay: r * 0.12,
                            ease: "easeInOut"
                          },
                          className: "w-[3px] h-[3px] rounded-full bg-purple-400"
                        },
                        r
                      )) }) }) : /* @__PURE__ */ a(Ne, { children: [
                        /* @__PURE__ */ e(
                          "button",
                          {
                            "aria-label": d(c ? "roundtable.voiceInput" : "roundtable.voiceInputDisabled"),
                            onClick: (r) => {
                              r.stopPropagation(), c && Z();
                            },
                            disabled: !c,
                            className: l(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95",
                              c ? m ? "bg-purple-600 text-white" : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10" : "text-gray-500 cursor-not-allowed"
                            ),
                            children: c ? /* @__PURE__ */ e(ae, { className: "w-4 h-4" }) : /* @__PURE__ */ e(mr, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            "aria-label": d("roundtable.textInput"),
                            onClick: (r) => {
                              r.stopPropagation(), Q();
                            },
                            className: l(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95",
                              u ? "bg-purple-600 text-white" : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
                            ),
                            children: /* @__PURE__ */ e(_e, { className: "w-4 h-4" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e(
                        "button",
                        {
                          type: "button",
                          "aria-label": d("roundtable.you"),
                          className: "relative group cursor-pointer shrink-0 bg-transparent border-none p-0",
                          onClick: (r) => {
                            r.stopPropagation(), Q();
                          },
                          children: /* @__PURE__ */ a(
                            "div",
                            {
                              className: l(
                                "relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center",
                                j === "user" || u || k ? "scale-105" : "opacity-70 group-hover:opacity-100 group-hover:scale-100"
                              ),
                              children: [
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: l(
                                      "absolute inset-0 rounded-full border-2 transition-all duration-300",
                                      k ? "border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)] animate-pulse" : j === "user" || u ? "border-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.3)]" : "border-gray-300/40 dark:border-white/20 group-hover:border-purple-400/50"
                                    )
                                  }
                                ),
                                /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative z-10 text-lg", children: /* @__PURE__ */ e(je, { src: ne, alt: d("roundtable.you") }) })
                              ]
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ e(h, { children: n && /* @__PURE__ */ e(
                  Me,
                  {
                    action: n,
                    mode: E === "paused" ? "paused" : "playback",
                    anchorRef: rr,
                    portalContainer: Ae == null ? void 0 : Ae.current,
                    align: "left",
                    agentName: (O == null ? void 0 : O.name) || (H == null ? void 0 : H.name),
                    agentAvatar: (O == null ? void 0 : O.avatar) || (H == null ? void 0 : H.avatar),
                    agentColor: H == null ? void 0 : H.color,
                    onSkip: () => B == null ? void 0 : B(),
                    onListen: () => C == null ? void 0 : C(n),
                    onTogglePause: () => g == null ? void 0 : g()
                  }
                ) })
              ]
            }
          ) })
        ]
      }
    )
  ] }) : /* @__PURE__ */ a(
    "div",
    {
      className: l(
        "h-[192px] w-full flex flex-col relative z-10 transition-all duration-300",
        V && !q ? "border-t border-transparent bg-transparent backdrop-blur-none" : "border-t border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md"
      ),
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: l(
              "transition-opacity duration-300",
              V && !q && "opacity-0 pointer-events-none"
            ),
            children: dr
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex-1 flex items-stretch min-h-0", children: [
          /* @__PURE__ */ a(
            "div",
            {
              className: l(
                "w-[90px] shrink-0 flex flex-col border-r border-gray-100/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 overflow-visible relative transition-opacity duration-300",
                V && !q && "opacity-0 pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ e("div", { className: "absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-purple-50/50 dark:from-purple-900/10 to-transparent pointer-events-none" }),
                /* @__PURE__ */ a("div", { className: "absolute top-3 inset-x-0 flex flex-col items-center justify-center gap-1 opacity-10 pointer-events-none", children: [
                  /* @__PURE__ */ e(qr, { size: 20, className: "text-purple-900 dark:text-purple-100" }),
                  /* @__PURE__ */ e("div", { className: "w-8 h-0.5 bg-purple-900 dark:bg-purple-100 rounded-full" })
                ] }),
                /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center gap-3 px-2 min-h-0 pb-1 pt-8", children: /* @__PURE__ */ a(
                  "div",
                  {
                    ref: Be,
                    className: "relative group cursor-pointer flex flex-col items-center justify-center gap-1",
                    children: [
                      /* @__PURE__ */ a(vr, { openDelay: 300, closeDelay: 100, children: [
                        /* @__PURE__ */ e(yr, { asChild: !0, children: /* @__PURE__ */ a("div", { className: "flex flex-col items-center gap-1", children: [
                          /* @__PURE__ */ a(
                            "div",
                            {
                              className: l(
                                "relative w-12 h-12 rounded-full transition-all duration-500 flex items-center justify-center",
                                j === "teacher" ? "scale-105" : "opacity-90 scale-95"
                              ),
                              children: [
                                /* @__PURE__ */ e(
                                  "div",
                                  {
                                    className: l(
                                      "absolute inset-0 rounded-full border-2 transition-all duration-500",
                                      j === "teacher" ? "border-purple-500 dark:border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600"
                                    )
                                  }
                                ),
                                /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-white dark:bg-gray-800 overflow-hidden relative z-10 shadow-sm border border-gray-50 dark:border-gray-700", children: /* @__PURE__ */ e(
                                  "img",
                                  {
                                    src: xe,
                                    alt: P,
                                    className: "w-full h-full object-cover"
                                  }
                                ) }),
                                j === "teacher" && /* @__PURE__ */ e("div", { className: "absolute -right-0.5 top-0.5 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center z-20", children: /* @__PURE__ */ e("div", { className: "w-1 h-1 bg-white rounded-full animate-pulse" }) })
                              ]
                            }
                          ),
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: l(
                                "max-w-[80px] truncate px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm transition-all duration-300 bg-white/90 dark:bg-gray-800/90",
                                j === "teacher" && !v ? "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700" : "text-gray-400 dark:text-gray-500 border-gray-100 dark:border-gray-700 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:border-purple-200 dark:group-hover:border-purple-600"
                              ),
                              children: P
                            }
                          )
                        ] }) }),
                        /* @__PURE__ */ e(
                          wr,
                          {
                            side: "bottom",
                            align: "center",
                            className: "w-64 p-3 max-h-[300px] overflow-y-auto",
                            children: (() => {
                              const r = pe((i == null ? void 0 : i.id) || "");
                              return /* @__PURE__ */ a(Ne, { children: [
                                /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ e(
                                    "img",
                                    {
                                      src: xe,
                                      alt: P,
                                      className: "w-full h-full object-cover"
                                    }
                                  ) }),
                                  /* @__PURE__ */ a("div", { className: "min-w-0", children: [
                                    /* @__PURE__ */ e("p", { className: "text-sm font-medium truncate", children: P }),
                                    /* @__PURE__ */ e(
                                      "span",
                                      {
                                        className: "inline-block text-[10px] leading-tight px-1.5 py-0.5 rounded-full text-white mt-0.5",
                                        style: {
                                          backgroundColor: (r == null ? void 0 : r.color) || "#8b5cf6"
                                        },
                                        children: d("settings.agentRoles.teacher")
                                      }
                                    )
                                  ] })
                                ] }),
                                (r == null ? void 0 : r.persona) && /* @__PURE__ */ e("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed whitespace-pre-line", children: r.persona })
                              ] });
                            })()
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e(h, { children: n && n.agentId === (i == null ? void 0 : i.id) && /* @__PURE__ */ e(
                        Me,
                        {
                          action: n,
                          mode: E === "paused" ? "paused" : "playback",
                          anchorRef: Be,
                          align: "left",
                          agentName: P,
                          agentAvatar: xe,
                          agentColor: (pr = pe((i == null ? void 0 : i.id) || "")) == null ? void 0 : pr.color,
                          onSkip: () => B == null ? void 0 : B(),
                          onListen: () => C == null ? void 0 : C(n),
                          onTogglePause: () => g == null ? void 0 : g()
                        }
                      ) })
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ a("div", { className: "flex-1 relative mx-3 mb-2", children: [
            /* @__PURE__ */ e(h, { children: er && /* @__PURE__ */ a(
              o.div,
              {
                initial: { opacity: 0, y: -10, scale: 0.9 },
                animate: {
                  opacity: [0, 1, 1, 0],
                  y: [-10, 0, 0, -6],
                  scale: [0.9, 1, 1, 0.95]
                },
                transition: {
                  duration: 1.8,
                  times: [0, 0.15, 0.7, 1],
                  ease: "easeOut"
                },
                className: "absolute top-1 left-1/2 -translate-x-1/2 z-50 bg-gray-800/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium pointer-events-none",
                children: [
                  /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-gray-400 inline-block mr-1.5" }),
                  d(Re === "discussion" ? "roundtable.discussionEnded" : "roundtable.qaEnded")
                ]
              }
            ) }),
            /* @__PURE__ */ a(
              "div",
              {
                onClick: () => {
                  (u || m) && (S(!1), A(!1), (M || F) && ve());
                },
                className: "relative w-full h-full rounded-[2.5rem] bg-gradient-to-b from-white/40 to-white/80 dark:from-gray-800/40 dark:to-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col justify-center px-6 overflow-hidden group transition-all duration-700 cursor-default",
                children: [
                  /* @__PURE__ */ a(h, { children: [
                    u && /* @__PURE__ */ e(
                      o.div,
                      {
                        initial: {
                          opacity: 0,
                          scale: 0.95,
                          y: 15,
                          filter: "blur(4px)"
                        },
                        animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
                        exit: { opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" },
                        onClick: (r) => r.stopPropagation(),
                        className: "absolute inset-x-6 bottom-4 z-20 flex items-center justify-end",
                        children: /* @__PURE__ */ a("div", { className: "relative w-fit max-w-[85%] sm:max-w-[65%] min-w-[200px] sm:min-w-[300px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 pr-2 rounded-2xl rounded-br-none shadow-2xl border border-purple-200 dark:border-purple-700 flex items-end gap-2 ring-1 ring-purple-100/50 dark:ring-purple-800/50", children: [
                          /* @__PURE__ */ e("div", { className: "pl-4 flex-1 py-1 min-w-0", children: /* @__PURE__ */ e(
                            "textarea",
                            {
                              value: oe,
                              onChange: (r) => Te(r.target.value),
                              onKeyDown: (r) => {
                                r.key === "Enter" && !r.shiftKey && !r.nativeEvent.isComposing && (r.preventDefault(), ye());
                              },
                              placeholder: d("roundtable.inputPlaceholder"),
                              autoFocus: !0,
                              rows: 1,
                              className: "w-full resize-none bg-transparent border-none focus:ring-0 focus:outline-none outline-none shadow-none ring-0 text-gray-700 dark:text-gray-200 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[40px] max-h-[120px]",
                              style: { fieldSizing: "content" }
                            }
                          ) }),
                          /* @__PURE__ */ e(
                            "button",
                            {
                              onClick: ye,
                              disabled: x,
                              className: l(
                                "p-2.5 text-white rounded-xl transition shadow-md mb-0.5 shrink-0",
                                x ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed shadow-gray-200 dark:shadow-gray-900/50" : "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 shadow-purple-200 dark:shadow-purple-900/50"
                              ),
                              children: x ? /* @__PURE__ */ e(Ge, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ e(gr, { className: "w-4 h-4" })
                            }
                          )
                        ] })
                      },
                      "input-stage"
                    ),
                    m && /* @__PURE__ */ a(
                      o.div,
                      {
                        initial: {
                          opacity: 0,
                          scale: 0.9,
                          x: 20,
                          filter: "blur(4px)"
                        },
                        animate: { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" },
                        exit: { opacity: 0, scale: 0.9, x: 20, filter: "blur(4px)" },
                        onClick: (r) => r.stopPropagation(),
                        className: "absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center gap-4 pr-2 pointer-events-none",
                        children: [
                          /* @__PURE__ */ a("div", { className: "flex flex-col-reverse items-end gap-1 mr-[-10px] relative z-20", children: [
                            /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5 h-8 px-2 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl border border-purple-100 dark:border-purple-800 shadow-sm", children: /* @__PURE__ */ e(kr, { barClassName: "bg-gradient-to-t from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500" }) }),
                            /* @__PURE__ */ e(
                              o.div,
                              {
                                initial: { opacity: 0, x: 10 },
                                animate: { opacity: 1, x: 0 },
                                className: "text-[10px] font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-purple-100/50 dark:border-purple-800/50 mr-1",
                                children: d(F ? "roundtable.processing" : "roundtable.listening")
                              }
                            )
                          ] }),
                          /* @__PURE__ */ a(
                            "div",
                            {
                              className: "pointer-events-auto relative group cursor-pointer",
                              onClick: Z,
                              children: [
                                /* @__PURE__ */ e("div", { className: "relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-500 dark:to-indigo-600 shadow-[0_4px_20px_rgba(147,51,234,0.3)] flex items-center justify-center z-20 group-hover:scale-105 transition-transform duration-300 border border-white/20 dark:border-white/10", children: /* @__PURE__ */ e(ae, { className: "w-6 h-6 text-white" }) }),
                                /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full border-2 border-purple-500 dark:border-purple-400 opacity-40 animate-[ping_2s_ease-in-out_infinite] z-10" }),
                                /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full border border-indigo-400 dark:border-indigo-300 opacity-20 animate-[ping_3s_ease-in-out_infinite_0.5s] z-10" }),
                                /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-purple-600 dark:bg-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity z-0" })
                              ]
                            }
                          )
                        ]
                      },
                      "voice-stage"
                    )
                  ] }),
                  /* @__PURE__ */ e(h, { children: (b == null ? void 0 : b.stage) === "director" && !f && !L && /* @__PURE__ */ a(
                    o.div,
                    {
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.9 },
                      className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-sm border border-gray-100 dark:border-gray-700",
                      children: [
                        /* @__PURE__ */ a("div", { className: "flex gap-1", children: [
                          /* @__PURE__ */ e(
                            o.div,
                            {
                              animate: { opacity: [0.3, 1, 0.3] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 1.2,
                                delay: 0
                              },
                              className: "w-1.5 h-1.5 rounded-full bg-purple-500"
                            }
                          ),
                          /* @__PURE__ */ e(
                            o.div,
                            {
                              animate: { opacity: [0.3, 1, 0.3] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 1.2,
                                delay: 0.2
                              },
                              className: "w-1.5 h-1.5 rounded-full bg-purple-500"
                            }
                          ),
                          /* @__PURE__ */ e(
                            o.div,
                            {
                              animate: { opacity: [0.3, 1, 0.3] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 1.2,
                                delay: 0.4
                              },
                              className: "w-1.5 h-1.5 rounded-full bg-purple-500"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ e("span", { className: "text-[10px] text-gray-400 dark:text-gray-500 font-medium", children: d("roundtable.thinking") })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ e(h, { children: k && !s && !b && !u && !m && /* @__PURE__ */ a(
                    o.div,
                    {
                      initial: { opacity: 0, scale: 0.85 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.85 },
                      transition: { duration: 0.35, ease: [0.21, 1, 0.36, 1] },
                      className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5",
                      children: [
                        /* @__PURE__ */ a("div", { className: "relative flex items-center justify-center", children: [
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: l(
                                "absolute w-24 h-24 rounded-full blur-2xl",
                                c ? "bg-amber-400/[0.08] dark:bg-amber-500/[0.06]" : "bg-purple-400/[0.08] dark:bg-purple-500/[0.06]"
                              )
                            }
                          ),
                          /* @__PURE__ */ e(
                            o.div,
                            {
                              animate: { scale: [1, 2.2], opacity: [0.25, 0] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 2.2,
                                ease: "easeOut"
                              },
                              className: l(
                                "absolute w-11 h-11 rounded-full border",
                                c ? "border-amber-400/50 dark:border-amber-500/35" : "border-purple-400/50 dark:border-purple-500/35"
                              )
                            }
                          ),
                          /* @__PURE__ */ e(
                            o.div,
                            {
                              animate: { scale: [1, 2.2], opacity: [0.25, 0] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 2.2,
                                ease: "easeOut",
                                delay: 0.7
                              },
                              className: l(
                                "absolute w-11 h-11 rounded-full border",
                                c ? "border-amber-300/40 dark:border-amber-400/25" : "border-purple-300/40 dark:border-purple-400/25"
                              )
                            }
                          ),
                          /* @__PURE__ */ e(
                            o.button,
                            {
                              onClick: (r) => {
                                r.stopPropagation(), c ? Z() : Q();
                              },
                              animate: { scale: [1, 1.05, 1] },
                              transition: {
                                repeat: 1 / 0,
                                duration: 2,
                                ease: "easeInOut"
                              },
                              className: l(
                                "relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl active:scale-95 z-10 bg-gradient-to-br",
                                c ? "from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 shadow-amber-400/30 dark:shadow-amber-600/20 hover:shadow-amber-400/40 dark:hover:shadow-amber-600/30" : "from-purple-400 to-indigo-500 dark:from-purple-500 dark:to-indigo-600 shadow-purple-400/30 dark:shadow-purple-600/20 hover:shadow-purple-400/40 dark:hover:shadow-purple-600/30"
                              ),
                              children: c ? /* @__PURE__ */ e(ae, { className: "w-[18px] h-[18px] text-white drop-shadow-sm" }) : /* @__PURE__ */ e(_e, { className: "w-[18px] h-[18px] text-white drop-shadow-sm" })
                            }
                          )
                        ] }),
                        c ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center gap-[3px] h-3", children: [0, 1, 2, 3, 4, 3, 2, 1, 0].map((r, t) => /* @__PURE__ */ e(
                          o.div,
                          {
                            animate: {
                              scaleY: [0.3, 0.5 + r * 0.15, 0.3],
                              opacity: [0.3, 0.7, 0.3]
                            },
                            transition: {
                              repeat: 1 / 0,
                              duration: 0.8 + t % 3 * 0.1,
                              delay: t * 0.08,
                              ease: "easeInOut"
                            },
                            className: "w-[2.5px] h-full origin-center rounded-full bg-amber-400/70 dark:bg-amber-500/60"
                          },
                          t
                        )) }) : /* @__PURE__ */ e("div", { className: "flex items-center justify-center gap-[3px] h-3", children: [0, 1, 2, 3, 2, 1, 0].map((r, t) => /* @__PURE__ */ e(
                          o.div,
                          {
                            animate: {
                              scaleY: [0.3, 0.45 + r * 0.15, 0.3],
                              opacity: [0.25, 0.6, 0.25]
                            },
                            transition: {
                              repeat: 1 / 0,
                              duration: 1 + t % 3 * 0.15,
                              delay: t * 0.12,
                              ease: "easeInOut"
                            },
                            className: "w-[2.5px] h-full origin-center rounded-full bg-purple-400/60 dark:bg-purple-500/50"
                          },
                          t
                        )) }),
                        /* @__PURE__ */ e(
                          o.span,
                          {
                            animate: { opacity: [0.5, 0.9, 0.5] },
                            transition: {
                              repeat: 1 / 0,
                              duration: 2.5,
                              ease: "easeInOut"
                            },
                            className: l(
                              "text-[10px] font-medium tracking-wider",
                              c ? "text-amber-600/70 dark:text-amber-400/60" : "text-purple-600/70 dark:text-purple-400/60"
                            ),
                            children: d("roundtable.yourTurn")
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ e(h, { mode: "wait", children: s && /* @__PURE__ */ e(
                    o.div,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: {
                        opacity: u || m ? 0.4 : 1,
                        y: 0,
                        filter: u || m ? "blur(1px) grayscale(0.2)" : "none"
                      },
                      exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
                      transition: { duration: 0.2, ease: [0.21, 1, 0.36, 1] },
                      className: "w-full flex items-center relative z-10",
                      children: /* @__PURE__ */ e(
                        "div",
                        {
                          className: l(
                            "flex w-full transition-all duration-500",
                            s === "teacher" ? "justify-start" : "justify-end"
                          ),
                          children: /* @__PURE__ */ a(
                            "div",
                            {
                              onClick: (r) => {
                                if (r.stopPropagation(), s !== "user") {
                                  if (W) {
                                    G == null || G();
                                    return;
                                  }
                                  if (T) {
                                    Y ? _ == null || _() : !b && f && (N == null || N());
                                    return;
                                  }
                                  g == null || g();
                                }
                              },
                              className: l(
                                "relative px-4 pt-2 pb-3 rounded-2xl text-[15px] leading-relaxed transition-all border w-[min(420px,calc(100%-3rem))] group/bubble flex flex-col max-h-[110px]",
                                "pl-4 pr-10",
                                s === "user" ? "bg-purple-600/95 dark:bg-purple-500/95 backdrop-blur-sm border-purple-400/40 dark:border-purple-300/40 text-white rounded-br-sm shadow-md shadow-purple-300/30 dark:shadow-purple-800/30" : s === "agent" ? l(
                                  "bg-blue-50/95 dark:bg-blue-950/60 backdrop-blur-sm border-blue-200/60 dark:border-blue-800/60 text-gray-700 dark:text-gray-200 rounded-br-sm shadow-sm",
                                  (T || W) && "hover:shadow-md cursor-pointer"
                                ) : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-sm shadow-sm hover:shadow-md cursor-pointer"
                              ),
                              children: [
                                s && (() => {
                                  const r = s === "user" ? ne : s === "agent" ? (v == null ? void 0 : v.avatar) || ne : xe;
                                  return /* @__PURE__ */ e(
                                    "div",
                                    {
                                      className: l(
                                        "absolute -top-2.5 z-20 pointer-events-none select-none",
                                        s === "teacher" ? "-left-2.5" : "-right-2.5"
                                      ),
                                      title: ke,
                                      children: /* @__PURE__ */ e(
                                        "div",
                                        {
                                          className: l(
                                            "w-6 h-6 rounded-full overflow-hidden border-2 shadow-sm",
                                            s === "user" ? "border-purple-400 dark:border-purple-500" : s === "agent" ? "border-blue-300 dark:border-blue-600" : "border-purple-200 dark:border-purple-700"
                                          ),
                                          children: /* @__PURE__ */ e(je, { src: r, alt: ke })
                                        }
                                      )
                                    }
                                  );
                                })(),
                                /* @__PURE__ */ a("div", { ref: Pe, className: "overflow-y-auto scrollbar-hide", children: [
                                  s !== "user" && ke && /* @__PURE__ */ a("div", { className: "flex items-center gap-1 mb-0.5", children: [
                                    /* @__PURE__ */ e("span", { className: "text-[10px] font-semibold text-gray-400 dark:text-gray-500 truncate", children: ke }),
                                    /* @__PURE__ */ (() => {
                                      const r = w === _r ? Ee ?? "idle" : "idle";
                                      return r === "generating" ? /* @__PURE__ */ e(Ge, { className: "w-3 h-3 text-amber-500 dark:text-amber-400 animate-spin" }) : r === "playing" ? /* @__PURE__ */ e(Sr, { className: "w-3 h-3 text-gray-400 dark:text-gray-500" }) : null;
                                    })()
                                  ] }),
                                  we ? /* @__PURE__ */ a("div", { className: "flex gap-1 items-center py-1", children: [
                                    /* @__PURE__ */ e(
                                      o.div,
                                      {
                                        animate: { opacity: [0.3, 1, 0.3] },
                                        transition: {
                                          repeat: 1 / 0,
                                          duration: 1,
                                          delay: 0
                                        },
                                        className: l(
                                          "w-1.5 h-1.5 rounded-full",
                                          se ? "bg-blue-400 dark:bg-blue-500" : "bg-purple-400 dark:bg-purple-500"
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ e(
                                      o.div,
                                      {
                                        animate: { opacity: [0.3, 1, 0.3] },
                                        transition: {
                                          repeat: 1 / 0,
                                          duration: 1,
                                          delay: 0.2
                                        },
                                        className: l(
                                          "w-1.5 h-1.5 rounded-full",
                                          se ? "bg-blue-400 dark:bg-blue-500" : "bg-purple-400 dark:bg-purple-500"
                                        )
                                      }
                                    ),
                                    /* @__PURE__ */ e(
                                      o.div,
                                      {
                                        animate: { opacity: [0.3, 1, 0.3] },
                                        transition: {
                                          repeat: 1 / 0,
                                          duration: 1,
                                          delay: 0.4
                                        },
                                        className: l(
                                          "w-1.5 h-1.5 rounded-full",
                                          se ? "bg-blue-400 dark:bg-blue-500" : "bg-purple-400 dark:bg-purple-500"
                                        )
                                      }
                                    )
                                  ] }) : /* @__PURE__ */ a("p", { className: "whitespace-pre-wrap break-words", suppressHydrationWarning: !0, children: [
                                    he,
                                    W && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-red-500 ml-1 align-middle" })
                                  ] })
                                ] }),
                                s !== "user" && !we && (() => {
                                  const r = (p == null ? void 0 : p.buttonState) ?? "none", t = s === "agent" ? "bg-blue-500" : "bg-purple-500";
                                  return r === "none" ? null : r === "play" ? /* @__PURE__ */ e("div", { className: "absolute right-2.5 bottom-2.5 p-1.5 rounded-full bg-gray-50/80 dark:bg-gray-700/80 hover:bg-purple-100 dark:hover:bg-purple-900/50 group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300 cursor-pointer", children: /* @__PURE__ */ e(hr, { className: "w-3.5 h-3.5 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400 ml-0.5" }) }) : r === "restart" ? /* @__PURE__ */ e("div", { className: "absolute right-2.5 bottom-2.5 p-1.5 rounded-full bg-gray-50/80 dark:bg-gray-700/80 hover:bg-purple-100 dark:hover:bg-purple-900/50 group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300 cursor-pointer", children: /* @__PURE__ */ e(Dr, { className: "w-3.5 h-3.5 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400" }) }) : /* @__PURE__ */ e("div", { className: "absolute right-2.5 bottom-2.5 p-1.5 rounded-full bg-gray-50/80 dark:bg-gray-700/80 group-hover/bubble:bg-purple-100 dark:group-hover/bubble:bg-purple-900/50 transition-all duration-300", children: Y ? (
                                    /* Paused: static Play icon */
                                    /* @__PURE__ */ e(hr, { className: "w-3.5 h-3.5 text-amber-500 dark:text-amber-400 group-hover/bubble:text-purple-600 dark:group-hover/bubble:text-purple-400 ml-0.5" })
                                  ) : /* @__PURE__ */ a(Ne, { children: [
                                    /* @__PURE__ */ a("div", { className: "flex gap-0.5 items-end justify-center h-3.5 w-3.5 group-hover/bubble:hidden", children: [
                                      /* @__PURE__ */ e(
                                        o.div,
                                        {
                                          animate: { height: ["20%", "100%", "20%"] },
                                          transition: {
                                            repeat: 1 / 0,
                                            duration: 0.6
                                          },
                                          className: l("w-1 rounded-full", t)
                                        }
                                      ),
                                      /* @__PURE__ */ e(
                                        o.div,
                                        {
                                          animate: { height: ["40%", "100%", "40%"] },
                                          transition: {
                                            repeat: 1 / 0,
                                            duration: 0.4
                                          },
                                          className: l("w-1 rounded-full", t)
                                        }
                                      ),
                                      /* @__PURE__ */ e(
                                        o.div,
                                        {
                                          animate: { height: ["20%", "80%", "20%"] },
                                          transition: {
                                            repeat: 1 / 0,
                                            duration: 0.5
                                          },
                                          className: l("w-1 rounded-full", t)
                                        }
                                      )
                                    ] }),
                                    /* @__PURE__ */ e(Pr, { className: "w-3.5 h-3.5 text-purple-600 dark:text-purple-400 hidden group-hover/bubble:block" })
                                  ] }) });
                                })()
                              ]
                            }
                          )
                        }
                      )
                    },
                    Jr
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a(
            "div",
            {
              className: l(
                "w-[140px] shrink-0 flex flex-col py-3 border-l border-gray-100/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-900/30 overflow-visible transition-opacity duration-300",
                V && !q && "opacity-0 pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ a("div", { className: "flex-none relative group/scroll", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        var r;
                        (r = Ce.current) == null || r.scrollBy({
                          left: -80,
                          behavior: "smooth"
                        });
                      },
                      className: "absolute left-0 top-0 bottom-0 w-5 z-10 flex items-center justify-center bg-gradient-to-r from-gray-50/90 dark:from-gray-900/90 to-transparent opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer",
                      children: /* @__PURE__ */ e(ea, { className: "w-3.5 h-3.5 text-gray-400" })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "div",
                    {
                      ref: Ce,
                      className: "overflow-x-auto overflow-y-hidden px-2 scrollbar-hide",
                      onWheel: (r) => {
                        Math.abs(r.deltaY) > Math.abs(r.deltaX) && (r.currentTarget.scrollLeft += r.deltaY, r.preventDefault());
                      },
                      children: /* @__PURE__ */ e("div", { className: "flex gap-1 w-max py-1", children: ge.map((r) => {
                        const t = w === r.id, ee = (b == null ? void 0 : b.stage) === "agent_loading" && b.agentId === r.id, y = pe(r.id), Ye = y == null ? void 0 : y.role, Xe = Ye ? d(`settings.agentRoles.${Ye}`) : "", cr = d(`settings.agentDescriptions.${r.id}`), ur = cr !== `settings.agentDescriptions.${r.id}` ? cr : (y == null ? void 0 : y.persona) || "", Rr = !!ur, Vr = !!n && n.agentId === r.id;
                        return /* @__PURE__ */ a(
                          "div",
                          {
                            "data-agent-id": r.id,
                            ref: (br) => {
                              br ? Fe.current.set(r.id, br) : Fe.current.delete(r.id);
                            },
                            className: "relative group/student shrink-0",
                            children: [
                              Vr && /* @__PURE__ */ e(
                                o.div,
                                {
                                  animate: {
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 0, 0.7]
                                  },
                                  transition: {
                                    repeat: 1 / 0,
                                    duration: 2,
                                    ease: "easeInOut"
                                  },
                                  className: "absolute inset-0 rounded-full pointer-events-none",
                                  style: {
                                    border: `2px solid ${(y == null ? void 0 : y.color) || "#d97706"}`
                                  }
                                }
                              ),
                              /* @__PURE__ */ a(vr, { openDelay: 300, closeDelay: 100, children: [
                                /* @__PURE__ */ e(yr, { asChild: !0, children: /* @__PURE__ */ a(
                                  "div",
                                  {
                                    className: l(
                                      "relative w-9 h-9 rounded-full transition-all duration-300 cursor-pointer",
                                      t ? "opacity-100 grayscale-0 scale-110" : "opacity-50 grayscale-[0.2] scale-95 hover:opacity-100 hover:grayscale-0 hover:scale-100"
                                    ),
                                    children: [
                                      /* @__PURE__ */ e(
                                        "div",
                                        {
                                          className: l(
                                            "absolute inset-0 rounded-full border-2 transition-all duration-300",
                                            t ? "border-purple-500 dark:border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]" : "border-white dark:border-gray-700"
                                          )
                                        }
                                      ),
                                      /* @__PURE__ */ e("div", { className: "absolute inset-0.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden", children: /* @__PURE__ */ e(
                                        "img",
                                        {
                                          src: r.avatar,
                                          alt: r.name,
                                          className: "w-full h-full"
                                        }
                                      ) }),
                                      t && /* @__PURE__ */ e("div", { className: "absolute -right-0.5 -top-0.5 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800 z-20 flex items-center justify-center", children: /* @__PURE__ */ e("div", { className: "w-1 h-1 bg-white rounded-full animate-pulse" }) }),
                                      ee && /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-full border-2 border-purple-400 border-t-transparent animate-spin z-20" })
                                    ]
                                  }
                                ) }),
                                /* @__PURE__ */ a(
                                  wr,
                                  {
                                    side: "bottom",
                                    align: "center",
                                    className: "w-64 p-3 max-h-[300px] overflow-y-auto",
                                    children: [
                                      /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                                        /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800", children: /* @__PURE__ */ e(
                                          "img",
                                          {
                                            src: r.avatar,
                                            alt: r.name,
                                            className: "w-full h-full"
                                          }
                                        ) }),
                                        /* @__PURE__ */ a("div", { className: "min-w-0", children: [
                                          /* @__PURE__ */ e("p", { className: "text-sm font-medium truncate", children: r.name }),
                                          Xe && Xe !== `settings.agentRoles.${Ye}` && /* @__PURE__ */ e(
                                            "span",
                                            {
                                              className: "inline-block text-[10px] leading-tight px-1.5 py-0.5 rounded-full text-white mt-0.5",
                                              style: {
                                                backgroundColor: (y == null ? void 0 : y.color) || "#6b7280"
                                              },
                                              children: Xe
                                            }
                                          )
                                        ] })
                                      ] }),
                                      Rr && /* @__PURE__ */ e("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed whitespace-pre-line", children: ur })
                                    ]
                                  }
                                )
                              ] })
                            ]
                          },
                          r.id
                        );
                      }) })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        var r;
                        (r = Ce.current) == null || r.scrollBy({
                          left: 80,
                          behavior: "smooth"
                        });
                      },
                      className: "absolute right-0 top-0 bottom-0 w-5 z-10 flex items-center justify-center bg-gradient-to-l from-gray-50/90 dark:from-gray-900/90 to-transparent opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer",
                      children: /* @__PURE__ */ e(ra, { className: "w-3.5 h-3.5 text-gray-400" })
                    }
                  ),
                  /* @__PURE__ */ e(h, { children: n && n.agentId !== (i == null ? void 0 : i.id) && (() => {
                    const r = ge.find(
                      (ee) => ee.id === n.agentId
                    ), t = pe(n.agentId || "");
                    return /* @__PURE__ */ e(
                      Me,
                      {
                        action: n,
                        mode: E === "paused" ? "paused" : "playback",
                        anchorRef: me,
                        align: "left",
                        agentName: (r == null ? void 0 : r.name) || (t == null ? void 0 : t.name),
                        agentAvatar: (r == null ? void 0 : r.avatar) || (t == null ? void 0 : t.avatar),
                        agentColor: t == null ? void 0 : t.color,
                        onSkip: () => B == null ? void 0 : B(),
                        onListen: () => C == null ? void 0 : C(n),
                        onTogglePause: () => g == null ? void 0 : g()
                      }
                    );
                  })() })
                ] }),
                /* @__PURE__ */ e("div", { className: "mx-auto my-1.5 w-8 h-px bg-gray-200 dark:bg-gray-700 opacity-50 shrink-0" }),
                /* @__PURE__ */ a("div", { className: "flex-1 flex items-center justify-center gap-3 px-2 min-h-0", children: [
                  /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5 shrink-0", children: x ? (
                    /* Unified cooldown indicator — replaces both buttons with a single dot wave */
                    /* @__PURE__ */ e("div", { className: "flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-[3px]", children: [0, 1, 2].map((r) => /* @__PURE__ */ e(
                      o.div,
                      {
                        animate: {
                          y: [0, -3, 0],
                          opacity: [0.35, 0.9, 0.35]
                        },
                        transition: {
                          repeat: 1 / 0,
                          duration: 0.9,
                          delay: r * 0.12,
                          ease: "easeInOut"
                        },
                        className: "w-[4px] h-[4px] rounded-full bg-purple-400 dark:bg-purple-400"
                      },
                      r
                    )) }) })
                  ) : /* @__PURE__ */ a(Ne, { children: [
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: (r) => {
                          r.stopPropagation(), c && Z();
                        },
                        disabled: !c,
                        className: l(
                          "w-8 h-8 rounded-full border flex items-center justify-center transition-all active:scale-95 shadow-sm",
                          c ? m ? "bg-purple-600 dark:bg-purple-500 border-purple-600 dark:border-purple-500 text-white shadow-purple-200 dark:shadow-purple-800" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-700" : "bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                        ),
                        children: c ? /* @__PURE__ */ e(ae, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ e(mr, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: (r) => {
                          r.stopPropagation(), Q();
                        },
                        className: l(
                          "w-8 h-8 rounded-full border flex items-center justify-center transition-all active:scale-95 shadow-sm",
                          u ? "bg-purple-600 dark:bg-purple-500 border-purple-600 dark:border-purple-500 text-white shadow-purple-200 dark:shadow-purple-800" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-700"
                        ),
                        children: /* @__PURE__ */ e(_e, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ a(
                    "div",
                    {
                      className: "relative group cursor-pointer shrink-0",
                      onClick: (r) => {
                        r.stopPropagation(), Q();
                      },
                      children: [
                        /* @__PURE__ */ a(
                          "div",
                          {
                            className: l(
                              "relative w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center",
                              j === "user" || u || k ? "scale-105" : "opacity-50 grayscale-[0.2] scale-95 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-100"
                            ),
                            children: [
                              /* @__PURE__ */ e(
                                "div",
                                {
                                  className: l(
                                    "absolute inset-0 rounded-full border-2 transition-all duration-300",
                                    k ? "border-amber-500 dark:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)] animate-pulse" : j === "user" || u ? "border-purple-600 dark:border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.3)]" : "border-white dark:border-gray-700 group-hover:border-purple-200 dark:group-hover:border-purple-600"
                                  )
                                }
                              ),
                              /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-800 overflow-hidden relative z-10 shadow-sm border border-gray-50 dark:border-gray-700 text-2xl", children: /* @__PURE__ */ e(je, { src: ne, alt: d("roundtable.you") }) }),
                              /* @__PURE__ */ e("div", { className: "absolute top-0 right-0 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 z-20", children: /* @__PURE__ */ e(
                                "div",
                                {
                                  className: l(
                                    "w-1.5 h-1.5 rounded-full",
                                    u || k ? "bg-purple-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"
                                  )
                                }
                              ) })
                            ]
                          }
                        ),
                        /* @__PURE__ */ e(h, { children: k && /* @__PURE__ */ e(
                          o.div,
                          {
                            initial: { opacity: 0, y: 4, scale: 0.9 },
                            animate: { opacity: 1, y: 0, scale: 1 },
                            exit: { opacity: 0, y: 4, scale: 0.9 },
                            className: "absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full shadow-sm z-30",
                            children: d("roundtable.yourTurn")
                          }
                        ) })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  za as Roundtable
};
//# sourceMappingURL=index.js.map
