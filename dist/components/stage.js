import { jsxs as se, jsx as f } from "react/jsx-runtime";
import { useState as c, useMemo as oe, useCallback as u, useRef as v, useEffect as T } from "react";
import { useCanvasStore as et } from "../lib/store/canvas.js";
import "../lib/store/snapshot.js";
import "../lib/store/keyboard.js";
import { useStageStore as we, PENDING_SCENE_ID as _e } from "../lib/store/stage.js";
import { useSettingsStore as p } from "../lib/store/settings.js";
import "../lib/contexts/scene-context.js";
import { useI18n as Lt } from "../lib/hooks/use-i18n.js";
import { SceneSidebar as Mt } from "./stage/scene-sidebar.js";
import { Header as Rt } from "./header.js";
import { CanvasArea as Nt } from "./canvas/canvas-area.js";
import { Roundtable as qt } from "./roundtable/index.js";
import { PlaybackEngine as Ft } from "../lib/playback/engine.js";
import { computePlaybackView as _t } from "../lib/playback/derived-state.js";
import { ActionEngine as Ht } from "../lib/action/engine.js";
import { createAudioPlayer as Vt } from "../lib/utils/audio-player.js";
import { useDiscussionTTS as Wt } from "../lib/hooks/use-discussion-tts.js";
import { cn as tt } from "../lib/utils/cn.js";
import { ChatArea as Bt } from "./chat/chat-area.js";
import { agentsToParticipants as Ot, useAgentRegistry as He } from "../lib/orchestration/registry/store.js";
import { AlertDialog as Ut, AlertDialogContent as jt, AlertDialogTitle as $t, AlertDialogFooter as zt, AlertDialogCancel as Gt, AlertDialogAction as Kt } from "./ui/alert-dialog.js";
import { AlertTriangle as Jt } from "lucide-react";
import { VisuallyHidden as Qt } from "radix-ui";
function kn({
  onRetryOutline: ye
}) {
  var Ze;
  const { t: I } = Lt(), { mode: G, getCurrentScene: nt, scenes: m, currentSceneId: w, setCurrentSceneId: _, generatingOutlines: ie } = we(), rt = we.use.failedOutlines(), a = nt(), P = p((e) => e.sidebarCollapsed), E = p((e) => e.setSidebarCollapsed), st = p((e) => e.chatAreaWidth), ot = p((e) => e.setChatAreaWidth), D = p((e) => e.chatAreaCollapsed), L = p((e) => e.setChatAreaCollapsed), Ve = p((e) => e.setTTSMuted), ke = p((e) => e.setTTSVolume), [S, We] = c("idle"), [K, ce] = c(!1), [Ae, Be] = c(null), [Te, ae] = c(null), [it, Ce] = c(null), [M, le] = c(null), [H, ue] = c(null), [xe, J] = c(null), [Ie, Pe] = c(!1), [ct, Q] = c(!1), [at, Oe] = c("discussion"), [X, V] = c(!1), [g, de] = c(null), [Y, fe] = c(!1), [lt, Z] = c(null), [pe, Ee] = c(null), [l, ut] = c(!1), [De, W] = c(!0), [B, dt] = c(!1), Le = et.use.whiteboardOpen(), ft = et.use.setWhiteboardOpen(), O = p((e) => e.selectedAgentIds), R = p((e) => e.ttsMuted), pt = p((e) => e.ttsEnabled), gt = oe(
    () => Ot(O, I),
    [O, I]
  ), Ue = He((e) => e.agents), ht = oe(
    () => O.map((e) => Ue[e]).filter((e) => e != null),
    [Ue, O]
  ), [mt, St] = c("idle"), [bt, vt] = c(null), b = Wt({
    enabled: pt && !R,
    agents: ht,
    onAudioStateChange: (e, t) => {
      vt(e), St(t);
    }
  }), wt = u(() => {
    var r;
    const e = He.getState(), t = O.map((i) => e.getAgent(i)).filter((i) => i != null), o = t.filter((i) => i.role === "student");
    if (o.length > 0)
      return o[Math.floor(Math.random() * o.length)].id;
    const n = t.filter((i) => i.role !== "teacher");
    return n.length > 0 ? n[Math.floor(Math.random() * n.length)].id : ((r = t[0]) == null ? void 0 : r.id) || "default-1";
  }, [O]), d = v(null), U = v(Vt()), s = v(null), h = v(null), ge = v(0), C = v(null), he = v(null), ee = v(null), Me = v(!1), N = v(0), me = v(!1), [yt, te] = c(!1), kt = u(async () => {
    var e, t;
    fe(!1), ae(null), ue(null), J({ stage: "director" }), V(!0), (e = d.current) == null || e.resume(), await ((t = s.current) == null ? void 0 : t.resumeActiveSession());
  }, []), q = u(() => {
    ae(null), ue(null), Ce(null), J(null), Pe(!1), fe(!1), V(!1), de(null), te(!1);
  }, []), At = u(() => {
    q(), ce(!1), Be(null), Ce(null), Q(!1), Z(null), le(null);
  }, [q]), Tt = u(() => {
    var e;
    (e = d.current) == null || e.handleDiscussionError(), q(), Z(null);
  }, [q]), ne = u(() => {
    var t;
    const e = g;
    Me.current = !0, (t = d.current) == null || t.handleEndDiscussion(), Me.current = !1, (e === "qa" || e === "discussion") && (Oe(e), Q(!0), setTimeout(() => Q(!1), 1800)), b.cleanup(), q();
  }, [g, q, b]), je = u(async () => {
    var e;
    await ((e = s.current) == null ? void 0 : e.endActiveSession()), ne();
  }, [ne]), y = u(() => {
    he.current && (clearTimeout(he.current), he.current = null);
  }, []), j = u(() => {
    W(!0), y(), l && !B && (he.current = setTimeout(() => {
      W(!1);
    }, 3e3));
  }, [y, l, B]), $ = u(async () => {
    var t, o, n, r;
    const e = ee.current;
    if (e)
      try {
        if (document.fullscreenElement === e) {
          (o = (t = navigator.keyboard) == null ? void 0 : t.unlock) == null || o.call(t), await document.exitFullscreen();
          return;
        }
        W(!0), await e.requestFullscreen(), await ((r = (n = navigator.keyboard) == null ? void 0 : n.lock) == null ? void 0 : r.call(n, ["Escape"]).catch(() => {
        })), E(!0), L(!0);
      } catch {
        console.warn("[Presentation] Fullscreen request denied — browser policy");
      }
  }, [L, E]);
  T(() => {
    const e = () => {
      var o, n;
      const t = document.fullscreenElement === ee.current;
      ut(t), t || ((n = (o = navigator.keyboard) == null ? void 0 : o.unlock) == null || n.call(o), W(!0), y());
    };
    return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
  }, [y]), T(() => {
    if (!l) {
      W(!0), y();
      return;
    }
    const e = () => {
      j();
    };
    return window.addEventListener("mousemove", e), window.addEventListener("mousedown", e), window.addEventListener("touchstart", e), B ? (W(!0), y()) : j(), () => {
      window.removeEventListener("mousemove", e), window.removeEventListener("mousedown", e), window.removeEventListener("touchstart", e), y();
    };
  }, [
    y,
    l,
    B,
    j
  ]), T(() => {
    var o;
    if (N.current++, (o = s.current) == null || o.endActiveSession(), C.current && (C.current.abort(), C.current = null), b.cleanup(), At(), !a || !a.actions || a.actions.length === 0) {
      d.current = null, We("idle");
      return;
    }
    d.current && d.current.stop();
    const e = new Ht(we, U.current), t = new Ft([a], e, U.current, {
      onModeChange: (n) => {
        We(n);
      },
      onSceneChange: (n) => {
      },
      onSpeechStart: (n) => {
        var r, i;
        if (Be(n), h.current) {
          const x = ge.current++, Fe = `speech-${Date.now()}`;
          (r = s.current) == null || r.addLectureMessage(
            h.current,
            { id: Fe, type: "speech", text: n },
            x
          );
          const k = (i = s.current) == null ? void 0 : i.getLectureMessageId(h.current);
          k && Z(k);
        }
      },
      onSpeechEnd: () => {
        Z(null);
      },
      onEffectFire: (n) => {
        var r;
        if (h.current && (n.kind === "spotlight" || n.kind === "laser")) {
          const i = ge.current++;
          (r = s.current) == null || r.addLectureMessage(
            h.current,
            {
              id: `${n.kind}-${Date.now()}`,
              type: n.kind,
              elementId: n.targetId
            },
            i
          );
        }
      },
      onProactiveShow: (n) => {
        n.agentId || (n.agentId = wt()), le(n);
      },
      onProactiveHide: () => {
        le(null);
      },
      onDiscussionConfirmed: (n, r, i) => {
        Ct(n, r, i);
      },
      onDiscussionEnd: () => {
        var n;
        C.current && (C.current.abort(), C.current = null), le(null), b.cleanup(), q(), Me.current || (Oe("discussion"), Q(!0), setTimeout(() => Q(!1), 1800)), (n = d.current) != null && n.isExhausted() && ce(!0);
      },
      onUserInterrupt: (n) => {
        var r;
        (r = s.current) == null || r.sendMessage(n);
      },
      isAgentSelected: (n) => p.getState().selectedAgentIds.includes(n),
      getPlaybackSpeed: () => p.getState().playbackSpeed || 1,
      onComplete: () => {
        var r;
        ce(!0), h.current && ((r = s.current) == null || r.endSession(h.current), h.current = null);
        const { autoPlayLecture: n } = p.getState();
        n && setTimeout(() => {
          const i = we.getState();
          if (!p.getState().autoPlayLecture) return;
          const x = i.scenes, Fe = i.currentSceneId, k = x.findIndex((A) => A.id === Fe);
          if (k >= 0 && k < x.length - 1) {
            const A = x[k];
            if (A.type === "quiz" || A.type === "interactive" || A.type === "pbl")
              return;
            me.current = !0, i.setCurrentSceneId(x[k + 1].id);
          } else if (k === x.length - 1 && i.generatingOutlines.length > 0) {
            const A = x[k];
            if (A.type === "quiz" || A.type === "interactive" || A.type === "pbl")
              return;
            me.current = !0, i.setCurrentSceneId(_e);
          }
        }, 1500);
      }
    });
    d.current = t, me.current && (me.current = !1, (async () => {
      if (a && s.current) {
        const n = await s.current.startLecture(a.id);
        h.current = n, ge.current = 0;
      }
      t.start();
    })());
  }, [a]), T(() => {
    const e = U.current, t = s.current;
    return () => {
      d.current && d.current.stop(), e.destroy(), C.current && C.current.abort(), b.cleanup(), t == null || t.endActiveSession(), y();
    };
  }, []), T(() => {
    U.current.setMuted(R);
  }, [R]);
  const re = p((e) => e.ttsVolume);
  T(() => {
    R || U.current.setVolume(re);
  }, [re, R]);
  const $e = p((e) => e.playbackSpeed);
  T(() => {
    U.current.setPlaybackRate($e);
  }, [$e]);
  const Ct = u(
    async (e, t, o) => {
      var n, r;
      (n = s.current) == null || n.startDiscussion({
        topic: e,
        prompt: t,
        agentId: o || "default-1"
      }), (r = s.current) == null || r.switchToTab("chat"), V(!0), de("discussion"), J({ stage: "director" });
    },
    []
  ), Re = oe(
    () => {
      var e, t;
      return ((t = (e = a == null ? void 0 : a.actions) == null ? void 0 : e.find((o) => o.type === "speech")) == null ? void 0 : t.text) ?? null;
    },
    [a]
  ), ze = oe(() => {
    if (!H) return !1;
    const e = He.getState().getAgent(H);
    return (e == null ? void 0 : e.role) !== "teacher";
  }, [H]), Ge = oe(
    () => _t({
      engineMode: S,
      lectureSpeech: Ae,
      liveSpeech: Te,
      speakingAgentId: H,
      thinkingState: xe,
      isCueUser: Ie,
      isTopicPending: Y,
      chatIsStreaming: X,
      discussionTrigger: M,
      playbackCompleted: K,
      idleText: Re,
      speakingStudent: ze,
      sessionType: g
    }),
    [
      S,
      Ae,
      Te,
      H,
      xe,
      Ie,
      Y,
      X,
      M,
      K,
      Re,
      ze,
      g
    ]
  ), Ke = Ge.isTopicActive, z = u(
    (e) => e === w ? !1 : Ke ? (Ee(e), !1) : (_(e), !0),
    [w, Ke, _]
  ), xt = u(() => {
    var e;
    pe && ((e = s.current) == null || e.endActiveSession(), ne(), _(pe), Ee(null));
  }, [pe, _, ne]), Je = u(() => {
    Ee(null);
  }, []), Se = u(async () => {
    var o, n;
    const e = d.current;
    if (!e) return;
    const t = e.getMode();
    if (t === "playing" || t === "live")
      e.pause(), h.current && ((o = s.current) == null || o.pauseBuffer(h.current));
    else if (t === "paused")
      e.resume(), h.current && ((n = s.current) == null || n.resumeBuffer(h.current));
    else {
      const r = K;
      if (ce(!1), a && s.current) {
        const i = await s.current.startLecture(a.id);
        h.current = i;
      }
      r ? (ge.current = 0, e.start()) : e.continuePlayback();
    }
  }, [K, a]), F = w === _e, Ne = ie.length > 0, be = u(() => {
    if (F) {
      m.length > 0 && z(m[m.length - 1].id);
      return;
    }
    const e = m.findIndex((t) => t.id === w);
    e > 0 && z(m[e - 1].id);
  }, [w, z, F, m]), ve = u(() => {
    if (F) return;
    const e = m.findIndex((t) => t.id === w);
    e < m.length - 1 ? z(m[e + 1].id) : Ne && _(_e);
  }, [w, z, Ne, F, m, _]), Qe = F ? m.length : m.findIndex((e) => e.id === w), Xe = m.length + (Ne ? 1 : 0), It = ((Ze = a == null ? void 0 : a.actions) == null ? void 0 : Ze.length) || 0, Ye = () => {
    ft(!Le);
  }, qe = u((e) => e instanceof HTMLElement ? e.isContentEditable || e.closest('[contenteditable="true"]') ? !0 : e.closest(
    ["input", "textarea", "select", '[role="slider"]', 'input[type="range"]'].join(", ")
  ) !== null : !1, []);
  T(() => {
    const e = (t) => {
      if (!t.defaultPrevented && !(qe(t.target) || qe(document.activeElement)))
        switch (t.key) {
          case "ArrowLeft":
            if (!l) return;
            t.preventDefault(), be(), j();
            break;
          case "ArrowRight":
            if (!l) return;
            t.preventDefault(), ve(), j();
            break;
          case " ":
          case "Spacebar":
            if (g === "qa" || g === "discussion") break;
            t.preventDefault(), Se();
            break;
          case "Escape":
            l && !B && (t.preventDefault(), $());
            break;
          case "ArrowUp":
            t.preventDefault(), ke(re + 0.1);
            break;
          case "ArrowDown":
            t.preventDefault(), ke(re - 0.1);
            break;
          case "m":
          case "M":
            t.preventDefault(), Ve(!R);
            break;
          case "s":
          case "S":
            t.preventDefault(), E(!P);
            break;
          case "c":
          case "C":
            t.preventDefault(), L(!D);
            break;
        }
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [
    g,
    D,
    ve,
    Se,
    be,
    l,
    B,
    qe,
    j,
    L,
    E,
    Ve,
    ke,
    P,
    $,
    R,
    re
  ]), T(() => {
    const e = (t) => {
      t.key === "F11" && (t.preventDefault(), $());
    };
    return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
  }, [$]);
  const Pt = (() => {
    switch (S) {
      case "playing":
      case "live":
        return "playing";
      case "paused":
        return "paused";
      default:
        return "idle";
    }
  })(), Et = M ? {
    type: "discussion",
    id: M.id,
    topic: M.question,
    prompt: M.prompt,
    agentId: M.agentId || "default-1"
  } : null, Dt = `calc(100% - ${(l ? 0 : 80) + (G === "playback" && !l ? 192 : 0)}px)`;
  return /* @__PURE__ */ se(
    "div",
    {
      ref: ee,
      className: tt(
        "flex-1 flex overflow-hidden bg-gray-50 dark:bg-gray-900",
        l && !De && "cursor-none"
      ),
      children: [
        /* @__PURE__ */ f(
          Mt,
          {
            collapsed: P,
            onCollapseChange: E,
            onSceneSelect: z,
            onRetryOutline: ye
          }
        ),
        /* @__PURE__ */ se("div", { className: "flex-1 flex flex-col overflow-hidden min-w-0 relative", children: [
          !l && /* @__PURE__ */ f(Rt, { currentSceneTitle: (a == null ? void 0 : a.title) || "" }),
          /* @__PURE__ */ f(
            "div",
            {
              className: "overflow-hidden relative flex-1 min-h-0 isolate",
              style: {
                height: Dt
              },
              suppressHydrationWarning: !0,
              children: /* @__PURE__ */ f(
                Nt,
                {
                  currentScene: a,
                  currentSceneIndex: Qe,
                  scenesCount: Xe,
                  mode: G,
                  engineState: Pt,
                  isLiveSession: X || Y || S === "live" || !!g,
                  whiteboardOpen: Le,
                  sidebarCollapsed: P,
                  chatCollapsed: D,
                  onToggleSidebar: () => E(!P),
                  onToggleChat: () => L(!D),
                  onPrevSlide: be,
                  onNextSlide: ve,
                  onPlayPause: Se,
                  onWhiteboardClose: Ye,
                  isPresenting: l,
                  onTogglePresentation: $,
                  showStopDiscussion: S === "live" || X && (g === "qa" || g === "discussion"),
                  onStopDiscussion: je,
                  hideToolbar: G === "playback" || l && !De,
                  isPendingScene: F,
                  isGenerationFailed: F && rt.some((e) => {
                    var t;
                    return e.id === ((t = ie[0]) == null ? void 0 : t.id);
                  }),
                  onRetryGeneration: ye && ie[0] ? () => ye(ie[0].id) : void 0
                }
              )
            }
          ),
          G === "playback" && /* @__PURE__ */ f(
            "div",
            {
              className: tt(
                "transition-opacity duration-300",
                !l && "shrink-0",
                l && "absolute inset-x-0 bottom-0 z-20"
              ),
              children: /* @__PURE__ */ f(
                qt,
                {
                  mode: G,
                  initialParticipants: gt,
                  playbackView: Ge,
                  currentSpeech: Te,
                  lectureSpeech: Ae,
                  idleText: Re,
                  playbackCompleted: K,
                  discussionRequest: Et,
                  engineMode: S,
                  isStreaming: X,
                  audioIndicatorState: mt,
                  audioAgentId: bt,
                  sessionType: g === "qa" ? "qa" : g === "discussion" ? "discussion" : void 0,
                  speakingAgentId: H,
                  speechProgress: it,
                  showEndFlash: ct,
                  endFlashSessionType: at,
                  thinkingState: xe,
                  isCueUser: Ie,
                  isTopicPending: Y,
                  onMessageSend: async (e) => {
                    var t, o, n;
                    te(!1), (t = s.current) == null || t.resumeActiveLiveBuffer(), b.cleanup(), Y && (fe(!1), ae(null), ue(null)), d.current && (S === "playing" || S === "live" || S === "paused") ? d.current.handleUserInterrupt(e) : (o = s.current) == null || o.sendMessage(e), (n = s.current) == null || n.switchToTab("chat"), Pe(!1), V(!0), de(g || "qa"), J({ stage: "director" });
                  },
                  onDiscussionStart: () => {
                    var e;
                    (e = d.current) == null || e.confirmDiscussion();
                  },
                  onDiscussionSkip: () => {
                    var e;
                    (e = d.current) == null || e.skipDiscussion();
                  },
                  onStopDiscussion: je,
                  onInputActivate: () => {
                    var e;
                    (g === "qa" || g === "discussion") && ((e = s.current) != null && e.pauseActiveLiveBuffer()) && (b.pause(), te(!0)), d.current && (S === "playing" || S === "live") && d.current.pause();
                  },
                  onResumeTopic: kt,
                  onPlayPause: Se,
                  isDiscussionPaused: yt,
                  onDiscussionPause: () => {
                    var t;
                    ((t = s.current) == null ? void 0 : t.pauseActiveLiveBuffer()) && (b.pause(), te(!0));
                  },
                  onDiscussionResume: () => {
                    var e;
                    (e = s.current) == null || e.resumeActiveLiveBuffer(), b.resume(), te(!1);
                  },
                  totalActions: It,
                  currentActionIndex: 0,
                  currentSceneIndex: Qe,
                  scenesCount: Xe,
                  whiteboardOpen: Le,
                  sidebarCollapsed: P,
                  chatCollapsed: D,
                  onToggleSidebar: () => E(!P),
                  onToggleChat: () => L(!D),
                  onPrevSlide: be,
                  onNextSlide: ve,
                  onWhiteboardClose: Ye,
                  isPresenting: l,
                  controlsVisible: De,
                  onTogglePresentation: $,
                  onPresentationInteractionChange: dt,
                  fullscreenContainerRef: ee
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ f(
          Bt,
          {
            ref: s,
            width: st,
            onWidthChange: ot,
            collapsed: D,
            onCollapseChange: L,
            activeBubbleId: lt,
            onActiveBubble: (e) => Z(e),
            currentSceneId: w,
            onLiveSpeech: (e, t) => {
              const o = N.current;
              queueMicrotask(() => {
                var n, r;
                N.current === o && (ae(e), t !== void 0 && ue(t), e !== null || t ? (V(!0), de(((r = (n = s.current) == null ? void 0 : n.getActiveSessionType) == null ? void 0 : r.call(n)) ?? null), fe(!1)) : e === null && t === null && V(!1));
              });
            },
            onSpeechProgress: (e) => {
              const t = N.current;
              queueMicrotask(() => {
                N.current === t && Ce(e);
              });
            },
            onThinking: (e) => {
              const t = N.current;
              queueMicrotask(() => {
                N.current === t && J(e);
              });
            },
            onCueUser: (e, t) => {
              Pe(!0);
            },
            onLiveSessionError: Tt,
            onStopSession: ne,
            onSegmentSealed: b.handleSegmentSealed,
            shouldHoldAfterReveal: b.shouldHold
          }
        ),
        /* @__PURE__ */ f(
          Ut,
          {
            open: !!pe,
            onOpenChange: (e) => {
              e || Je();
            },
            children: /* @__PURE__ */ se(
              jt,
              {
                container: l ? ee.current : void 0,
                className: "max-w-sm rounded-2xl p-0 overflow-hidden border-0 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)]",
                children: [
                  /* @__PURE__ */ f(Qt.Root, { children: /* @__PURE__ */ f($t, { children: I("stage.confirmSwitchTitle") }) }),
                  /* @__PURE__ */ f("div", { className: "h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" }),
                  /* @__PURE__ */ se("div", { className: "px-6 pt-5 pb-2 flex flex-col items-center text-center", children: [
                    /* @__PURE__ */ f("div", { className: "w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4 ring-1 ring-amber-200/50 dark:ring-amber-700/30", children: /* @__PURE__ */ f(Jt, { className: "w-6 h-6 text-amber-500 dark:text-amber-400" }) }),
                    /* @__PURE__ */ f("h3", { className: "text-base font-bold text-gray-900 dark:text-gray-100 mb-1.5", children: I("stage.confirmSwitchTitle") }),
                    /* @__PURE__ */ f("p", { className: "text-sm text-gray-500 dark:text-gray-400 leading-relaxed", children: I("stage.confirmSwitchMessage") })
                  ] }),
                  /* @__PURE__ */ se(zt, { className: "px-6 pb-5 pt-3 flex-row gap-3", children: [
                    /* @__PURE__ */ f(Gt, { onClick: Je, className: "flex-1 rounded-xl", children: I("common.cancel") }),
                    /* @__PURE__ */ f(
                      Kt,
                      {
                        onClick: xt,
                        className: "flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-md shadow-amber-200/50 dark:shadow-amber-900/30",
                        children: I("common.confirm")
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  kn as Stage
};
//# sourceMappingURL=stage.js.map
