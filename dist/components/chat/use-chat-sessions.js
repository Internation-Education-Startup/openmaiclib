import { useRef as b, useEffect as W, useState as ae, useCallback as w } from "react";
import { useCanvasStore as oe } from "../../lib/store/canvas.js";
import "../../lib/store/snapshot.js";
import "../../lib/store/keyboard.js";
import { useStageStore as T } from "../../lib/store/stage.js";
import { useSettingsStore as z } from "../../lib/store/settings.js";
import "../../lib/contexts/scene-context.js";
import { useUserProfileStore as fe } from "../../lib/store/user-profile.js";
import { useAgentRegistry as ge } from "../../lib/orchestration/registry/store.js";
import { useI18n as Ke } from "../../lib/hooks/use-i18n.js";
import { getCurrentModelConfig as G } from "../../lib/utils/model-config.js";
import { USER_AVATAR as Ne } from "../../lib/types/roundtable.js";
import { processSSEStream as Oe } from "./process-sse-stream.js";
import { StreamBuffer as Pe } from "../../lib/buffer/stream-buffer.js";
import { ActionEngine as Le } from "../../lib/action/engine.js";
import { toast as ce } from "sonner";
import { createLogger as qe } from "../../lib/logger.js";
const v = qe("ChatSessions");
function rt(p = {}) {
  const $ = b(p.onLiveSpeech), P = b(p.onSpeechProgress), M = b(p.onThinking), X = b(p.onCueUser), L = b(p.onActiveBubble), ie = b(p.onLiveSessionError), Y = b(p.onStopSession), Z = b(p.onSegmentSealed), ee = b(p.shouldHoldAfterReveal);
  W(() => {
    $.current = p.onLiveSpeech, P.current = p.onSpeechProgress, M.current = p.onThinking, X.current = p.onCueUser, L.current = p.onActiveBubble, ie.current = p.onLiveSessionError, Y.current = p.onStopSession, Z.current = p.onSegmentSealed, ee.current = p.shouldHoldAfterReveal;
  }, [
    p.onLiveSpeech,
    p.onSpeechProgress,
    p.onThinking,
    p.onCueUser,
    p.onActiveBubble,
    p.onLiveSessionError,
    p.onStopSession,
    p.onSegmentSealed,
    p.shouldHoldAfterReveal
  ]);
  const { t: D } = Ke(), te = T((t) => {
    var e;
    return (e = t.stage) == null ? void 0 : e.id;
  }), re = b(te), [U, x] = ae(() => T.getState().chats.map(
    (e) => e.status === "active" ? { ...e, status: "interrupted" } : e
  )), [B, _] = ae(null), [Se, H] = ae(/* @__PURE__ */ new Set()), [ue, k] = ae(!1), m = b(null), E = b(null), C = b(U);
  W(() => {
    C.current = U;
  }, [U]);
  const O = b(null);
  W(() => {
    if (te === re.current) return;
    re.current = te;
    const t = T.getState().chats;
    x(
      t.map(
        (e) => e.status === "active" ? { ...e, status: "interrupted" } : e
      )
    ), _(null), H(/* @__PURE__ */ new Set());
  }, [te]), W(() => {
    var t;
    re.current && re.current === ((t = T.getState().stage) == null ? void 0 : t.id) && T.getState().setChats(U);
  }, [U]);
  const I = b(/* @__PURE__ */ new Map());
  W(() => {
    const t = I.current;
    return () => {
      m.current && (m.current.abort(), m.current = null), t.forEach((e) => e.shutdown()), t.clear();
    };
  }, []);
  const j = b(!1), Q = w((t, e) => {
    var r, n, s, i;
    const a = Date.now(), u = `error-${a}`, g = I.current.get(t);
    g && (g.shutdown(), I.current.delete(t)), x(
      (c) => c.map(
        (d) => d.id === t ? {
          ...d,
          updatedAt: a,
          messages: [
            ...d.messages,
            {
              id: u,
              role: "assistant",
              parts: [{ type: "text", text: e }],
              metadata: {
                senderName: "System",
                originalRole: "agent",
                createdAt: a
              }
            }
          ]
        } : d
      )
    ), (r = L.current) == null || r.call(L, null), ie.current ? ie.current() : ((n = P.current) == null || n.call(P, null), (s = M.current) == null || s.call(M, null), (i = $.current) == null || i.call($, null, null));
  }, []), J = b(/* @__PURE__ */ new Map()), ne = b(/* @__PURE__ */ new Map()), ye = w((t) => {
    H((e) => {
      const a = new Set(e);
      return a.has(t) ? a.delete(t) : a.add(t), a;
    });
  }, []), se = w(
    (t, e) => {
      const a = I.current.get(t);
      a && a.shutdown();
      const u = e === "lecture" ? {} : { postTextDelayMs: 1200, actionDelayMs: 800 }, g = new Pe(
        {
          onAgentStart(r) {
            var c;
            const n = Date.now(), s = ge.getState().getAgent(r.agentId), i = {
              id: r.messageId,
              role: "assistant",
              parts: [],
              metadata: {
                senderName: (s == null ? void 0 : s.name) || r.agentName,
                senderAvatar: r.avatar || (s == null ? void 0 : s.avatar),
                originalRole: "agent",
                agentId: r.agentId,
                createdAt: n
              }
            };
            x(
              (d) => d.map(
                (o) => o.id === t ? { ...o, messages: [...o.messages, i], updatedAt: n } : o
              )
            ), (c = L.current) == null || c.call(L, r.messageId);
          },
          onAgentEnd() {
            x(
              (r) => r.map((n) => {
                if (n.id !== t) return n;
                const s = n.messages.filter(
                  (i) => !(i.role === "assistant" && i.parts.length === 0)
                );
                return s.length !== n.messages.length ? { ...n, messages: s } : n;
              })
            );
          },
          onTextReveal(r, n, s, i) {
            x(
              (c) => c.map((d) => d.id !== t ? d : {
                ...d,
                messages: d.messages.map((o) => {
                  if (o.id !== r) return o;
                  const l = [...o.parts], S = l.findIndex(
                    (A) => A._partId === n
                  );
                  return S >= 0 ? l[S] = {
                    type: "text",
                    text: s,
                    _partId: n
                  } : l.push({
                    type: "text",
                    text: s,
                    _partId: n
                  }), { ...o, parts: l };
                })
                // Don't update updatedAt on every tick — avoids thrashing persistence sync
              })
            );
          },
          onActionReady(r, n) {
            const s = {
              type: `action-${n.actionName}`,
              actionId: n.actionId,
              actionName: n.actionName,
              input: n.params,
              state: "result",
              output: { success: !0 }
            };
            x(
              (i) => i.map((c) => c.id !== t ? c : {
                ...c,
                messages: c.messages.map(
                  (d) => d.id === r ? { ...d, parts: [...d.parts, s] } : d
                ),
                updatedAt: Date.now()
              })
            );
            try {
              const i = new Le(T), c = {
                id: n.actionId,
                type: n.actionName,
                ...n.params
              };
              i.execute(c);
            } catch (i) {
              v.warn("[Buffer] Action execution error:", i);
            }
          },
          onLiveSpeech(r, n) {
            var s;
            e !== "lecture" && ((s = $.current) == null || s.call($, r, n));
          },
          onSpeechProgress(r) {
            var n;
            (n = P.current) == null || n.call(P, r);
          },
          onThinking(r) {
            var n;
            (n = M.current) == null || n.call(M, r);
          },
          onCueUser(r, n) {
            var s;
            O.current ? O.current.cueUserReceived = !0 : O.current = {
              totalAgents: 0,
              cueUserReceived: !0
            }, (s = X.current) == null || s.call(X, r, n);
          },
          onDone(r) {
            var n;
            O.current = {
              directorState: r.directorState,
              totalAgents: r.totalAgents,
              agentHadContent: r.agentHadContent ?? !0,
              cueUserReceived: ((n = O.current) == null ? void 0 : n.cueUserReceived) ?? !1
            };
          },
          onError(r) {
            v.error("[Buffer] Stream error:", r);
          },
          onSegmentSealed(r, n, s, i) {
            var c;
            (c = Z.current) == null || c.call(Z, r, n, s, i);
          },
          shouldHoldAfterReveal() {
            var r;
            return ((r = ee.current) == null ? void 0 : r.call(ee)) ?? !1;
          }
        },
        u
      );
      return I.current.set(t, g), g.start(), e !== "lecture" && j.current && g.pause(), g;
    },
    []
  ), F = w(
    async (t, e, a, u) => {
      var S;
      const g = z.getState(), r = e.config.agentIds.filter((A) => !A.startsWith("default-")).map((A) => ge.getState().getAgent(A)).filter((A) => !!A).map(({ createdAt: A, updatedAt: R, isDefault: f, ...y }) => y);
      r.length > 0 && (e.config.agentConfigs = r);
      const n = e.config.agentIds.length <= 1 ? 1 : 10, s = g.maxTurns && parseInt(g.maxTurns, 10) || n;
      let i, c = 0, d = e.messages, o = 0;
      for (; c < s && !a.signal.aborted; ) {
        O.current = null;
        const A = T.getState(), R = {
          stage: A.stage,
          scenes: A.scenes,
          currentSceneId: A.currentSceneId,
          mode: A.mode,
          whiteboardOpen: oe.getState().whiteboardOpen
        }, f = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...e,
            messages: d,
            storeState: R,
            directorState: i
          }),
          signal: a.signal
        });
        if (!f.ok) {
          const N = await f.text();
          throw new Error(`API error: ${f.status} - ${N}`);
        }
        const y = se(t, u);
        await Oe(f, t, y, a.signal);
        try {
          await y.waitUntilDrained();
        } catch {
          break;
        }
        if (a.signal.aborted) break;
        const h = O.current;
        if (!h || (i = h.directorState, c = (i == null ? void 0 : i.turnCount) ?? c + 1, h.cueUserReceived) || h.totalAgents === 0)
          break;
        if (h.agentHadContent === !1) {
          if (o++, o >= 2) {
            v.warn(
              `[AgentLoop] ${o} consecutive empty agent responses, stopping loop`
            );
            break;
          }
        } else
          o = 0;
        const K = C.current.find((N) => N.id === t);
        K && (d = K.messages);
      }
      const l = O.current;
      a.signal.aborted || (((l == null ? void 0 : l.cueUserReceived) ?? !1) || (x(
        (R) => R.map(
          (f) => f.id === t ? {
            ...f,
            status: "completed",
            updatedAt: Date.now()
          } : f
        )
      ), (S = Y.current) == null || S.call(Y)), c >= s && l && l.totalAgents > 0 && v.info(`[AgentLoop] Max turns (${s}) reached for session ${t}`));
    },
    [se]
  ), de = w(async (t, e) => {
    const a = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`, u = Date.now(), g = {
      id: a,
      type: t,
      title: e,
      status: "active",
      messages: [],
      config: {
        agentIds: ["default-1"],
        maxTurns: 0,
        // Not used for runtime — frontend loop manages maxTurns
        currentTurn: 0,
        defaultAgentId: "default-1"
      },
      toolCalls: [],
      pendingToolCalls: [],
      createdAt: u,
      updatedAt: u
    };
    return x((r) => [...r, g]), _(a), H((r) => /* @__PURE__ */ new Set([...r, a])), v.info(`[ChatArea] Created session: ${a} (${t})`), a;
  }, []), q = w(
    async (t) => {
      var r, n;
      v.info(`[ChatArea] Ending session: ${t}`), j.current = !1;
      const e = C.current.find((s) => s.id === t), a = e && (e.type === "qa" || e.type === "discussion"), u = !!(m.current && E.current === t);
      u && (m.current.abort(), m.current = null, E.current = null, k(!1));
      const g = I.current.get(t);
      g && (g.shutdown(), I.current.delete(t)), J.current.delete(t), ne.current.delete(t), a && u ? (x(
        (s) => s.map((i) => {
          if (i.id !== t) return i;
          const c = [...i.messages];
          for (let d = c.length - 1; d >= 0; d--)
            if (c[d].role === "assistant") {
              const o = [...c[d].parts];
              let l = !1;
              for (let S = o.length - 1; S >= 0; S--)
                if (o[S].type === "text") {
                  const A = o[S];
                  o[S] = {
                    type: "text",
                    text: (A.text || "") + "..."
                  }, l = !0;
                  break;
                }
              l || o.push({
                type: "text",
                text: "..."
              }), c[d] = {
                ...c[d],
                parts: o,
                metadata: { ...c[d].metadata, interrupted: !0 }
              };
              break;
            }
          return { ...i, messages: c, status: "completed" };
        })
      ), (r = $.current) == null || r.call($, null, null), (n = M.current) == null || n.call(M, null)) : x(
        (s) => s.map(
          (i) => i.id === t ? { ...i, status: "completed" } : i
        )
      ), B === t && _(null);
    },
    [B]
  ), Ae = w(async () => {
    const t = C.current.find(
      (e) => (e.type === "qa" || e.type === "discussion") && e.status === "active"
    );
    t && await q(t.id);
  }, [q]), pe = w(async (t) => {
    j.current = !1;
    const e = C.current.find((r) => r.id === t);
    if (!e || !(e.type === "qa" || e.type === "discussion") || e.status !== "active") return;
    const u = !!(m.current && E.current === t), g = I.current.get(t);
    g && (g.shutdown(), I.current.delete(t)), u && (m.current.abort(), m.current = null, E.current = null, k(!1)), u && x(
      (r) => r.map((n) => {
        if (n.id !== t) return n;
        const s = [...n.messages];
        for (let i = s.length - 1; i >= 0; i--)
          if (s[i].role === "assistant") {
            const c = [...s[i].parts];
            let d = !1;
            for (let o = c.length - 1; o >= 0; o--)
              if (c[o].type === "text") {
                const l = c[o];
                c[o] = {
                  type: "text",
                  text: (l.text || "") + "..."
                }, d = !0;
                break;
              }
            d || c.push({
              type: "text",
              text: "..."
            }), s[i] = {
              ...s[i],
              parts: c,
              metadata: { ...s[i].metadata, interrupted: !0 }
            };
            break;
          }
        return { ...n, messages: s, updatedAt: Date.now() };
      })
    ), v.info(`[ChatArea] Soft-paused session: ${t}`);
  }, []), he = w(async () => {
    const t = C.current.find(
      (e) => (e.type === "qa" || e.type === "discussion") && e.status === "active"
    );
    t && await pe(t.id);
  }, [pe]), me = w(
    async (t) => {
      var g;
      const e = C.current.find((r) => r.id === t);
      if (!e || e.status !== "active") return;
      const a = new AbortController();
      m.current = a, E.current = t, k(!0);
      const u = T.getState();
      try {
        v.info(`[ChatArea] Resuming session: ${t}`);
        const r = fe.getState(), n = G(), s = ((g = z.getState().selectedAgentIds) == null ? void 0 : g.length) > 0 ? z.getState().selectedAgentIds : e.config.agentIds;
        await F(
          t,
          {
            messages: e.messages,
            storeState: {
              stage: u.stage,
              scenes: u.scenes,
              currentSceneId: u.currentSceneId,
              mode: u.mode,
              whiteboardOpen: oe.getState().whiteboardOpen
            },
            config: {
              agentIds: s,
              sessionType: e.type
            },
            userProfile: {
              nickname: r.nickname || void 0,
              bio: r.bio || void 0
            },
            apiKey: n.apiKey,
            baseUrl: n.baseUrl,
            model: n.modelString,
            providerType: n.providerType,
            requiresApiKey: n.requiresApiKey
          },
          a,
          e.type
        );
      } catch (r) {
        if (r instanceof DOMException && r.name === "AbortError") {
          v.info("[ChatArea] Resume aborted");
          return;
        }
        v.error("[ChatArea] Resume error:", r), Q(
          t,
          `Error: ${r instanceof Error ? r.message : String(r)}`
        );
      } finally {
        m.current === a && (m.current = null, E.current = null, k(!1));
      }
    },
    [Q, F]
  ), we = w(async () => {
    const t = C.current.find(
      (e) => (e.type === "qa" || e.type === "discussion") && e.status === "active"
    );
    t && await me(t.id);
  }, [me]), ve = w(
    async (t) => {
      var R;
      let e = B;
      ue && m.current && (m.current.abort(), m.current = null, e && x(
        (f) => f.map((y) => {
          if (y.id !== e) return y;
          const h = [...y.messages];
          for (let K = h.length - 1; K >= 0; K--)
            if (h[K].role === "assistant") {
              const N = [...h[K].parts];
              for (let V = N.length - 1; V >= 0; V--)
                if (N[V].type === "text") {
                  const ke = N[V];
                  return N[V] = {
                    type: "text",
                    text: (ke.text || "") + "..."
                  }, h[K] = { ...h[K], parts: N }, { ...y, messages: h, updatedAt: Date.now() };
                }
              break;
            }
          return y;
        })
      ));
      const a = G();
      if (!a.modelId) {
        ce.error(D("settings.modelNotConfigured"));
        return;
      }
      if (a.requiresApiKey && !a.apiKey && !a.isServerConfigured) {
        ce.error(D("settings.setupNeeded"), {
          description: D("settings.apiKeyDesc")
        });
        return;
      }
      const u = C.current.find((f) => f.id === e);
      if (!e || (u == null ? void 0 : u.type) === "lecture" || (u == null ? void 0 : u.status) === "completed") {
        const f = C.current.filter(
          (y) => (y.type === "qa" || y.type === "discussion") && y.status === "active"
        );
        for (const y of f)
          await q(y.id);
        e = await de("qa", "Q&A");
      }
      const r = new AbortController();
      m.current = r, E.current = e, k(!0);
      const n = Date.now(), s = `user-${n}`, i = z.getState(), c = ((R = i.selectedAgentIds) == null ? void 0 : R.length) > 0 ? i.selectedAgentIds : ["default-1"], d = {
        id: s,
        role: "user",
        parts: [{ type: "text", text: t }],
        metadata: {
          senderName: D("common.you"),
          senderAvatar: Ne,
          originalRole: "user",
          createdAt: n
        }
      }, o = C.current.find((f) => f.id === e), l = o ? [...o.messages, d] : [d], S = (o == null ? void 0 : o.type) || "qa";
      x((f) => {
        if (f.some((h) => h.id === e))
          return f.map(
            (h) => h.id === e ? {
              ...h,
              messages: [...h.messages, d],
              status: "active",
              updatedAt: n
            } : h
          );
        {
          const h = {
            id: e,
            type: "qa",
            title: "Q&A",
            status: "active",
            messages: [d],
            config: {
              agentIds: c,
              maxTurns: 0,
              // Not used for runtime — frontend loop manages maxTurns
              currentTurn: 0,
              defaultAgentId: c[0]
            },
            toolCalls: [],
            pendingToolCalls: [],
            createdAt: n,
            updatedAt: n
          };
          return [...f, h];
        }
      });
      const A = T.getState();
      try {
        v.info(
          `[ChatArea] Sending message: "${t.slice(0, 50)}..." agents: ${c.join(", ")}`
        );
        const f = fe.getState(), y = G();
        await F(
          e,
          {
            messages: l,
            storeState: {
              stage: A.stage,
              scenes: A.scenes,
              currentSceneId: A.currentSceneId,
              mode: A.mode,
              whiteboardOpen: oe.getState().whiteboardOpen
            },
            config: {
              agentIds: c,
              sessionType: S
            },
            userProfile: {
              nickname: f.nickname || void 0,
              bio: f.bio || void 0
            },
            apiKey: y.apiKey,
            baseUrl: y.baseUrl,
            model: y.modelString,
            providerType: y.providerType,
            requiresApiKey: y.requiresApiKey
          },
          r,
          S
        );
      } catch (f) {
        if (f instanceof DOMException && f.name === "AbortError") {
          v.info("[ChatArea] Request aborted by user");
          return;
        }
        v.error("[ChatArea] Error:", f), Q(
          e,
          `Error: ${f instanceof Error ? f.message : String(f)}`
        );
      } finally {
        m.current === r && (m.current = null, E.current = null, k(!1));
      }
    },
    [
      B,
      Q,
      ue,
      de,
      q,
      F,
      D
    ]
  ), be = w(
    async (t) => {
      var o;
      v.info(`[ChatArea] Starting discussion: "${t.topic}"`), j.current = !1;
      const e = G();
      if (!e.modelId) {
        ce.error(D("settings.modelNotConfigured"));
        return;
      }
      if (e.requiresApiKey && !e.apiKey && !e.isServerConfigured) {
        ce.error(D("settings.setupNeeded"), {
          description: D("settings.apiKeyDesc")
        });
        return;
      }
      const a = C.current.filter(
        (l) => (l.type === "qa" || l.type === "discussion") && l.status === "active"
      );
      for (const l of a)
        await q(l.id);
      const u = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`, g = Date.now(), r = t.agentId || "default-1", n = z.getState(), s = ((o = n.selectedAgentIds) == null ? void 0 : o.length) > 0 ? [...n.selectedAgentIds] : [r];
      s.includes(r) || s.unshift(r);
      const i = {
        id: u,
        type: "discussion",
        title: t.topic,
        status: "active",
        messages: [],
        config: {
          agentIds: s,
          maxTurns: 0,
          // Not used for runtime — frontend loop manages maxTurns
          currentTurn: 0,
          triggerAgentId: r
        },
        toolCalls: [],
        pendingToolCalls: [],
        createdAt: g,
        updatedAt: g
      };
      x((l) => [...l, i]), _(u), H((l) => /* @__PURE__ */ new Set([...l, u]));
      const c = new AbortController();
      m.current = c, E.current = u, k(!0);
      const d = T.getState();
      try {
        const l = fe.getState(), S = G();
        await F(
          u,
          {
            messages: [],
            storeState: {
              stage: d.stage,
              scenes: d.scenes,
              currentSceneId: d.currentSceneId,
              mode: d.mode,
              whiteboardOpen: oe.getState().whiteboardOpen
            },
            config: {
              agentIds: s,
              sessionType: "discussion",
              discussionTopic: t.topic,
              discussionPrompt: t.prompt,
              triggerAgentId: r
            },
            userProfile: {
              nickname: l.nickname || void 0,
              bio: l.bio || void 0
            },
            apiKey: S.apiKey,
            baseUrl: S.baseUrl,
            model: S.modelString,
            providerType: S.providerType,
            requiresApiKey: S.requiresApiKey
          },
          c,
          "discussion"
        );
      } catch (l) {
        if (l instanceof DOMException && l.name === "AbortError") {
          v.info("[ChatArea] Discussion aborted by user");
          return;
        }
        v.error("[ChatArea] Discussion error:", l), Q(
          u,
          `Error starting discussion: ${l instanceof Error ? l.message : String(l)}`
        );
      } finally {
        m.current === c && (m.current = null, E.current = null, k(!1));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- t is stable from i18n context
    [Q, q, F]
  ), xe = w(() => {
    m.current && (v.info("[ChatArea] Interrupting active request"), m.current.abort(), m.current = null, k(!1), E.current = null);
  }, []), Ce = w(
    async (t) => {
      var d;
      const e = U.find(
        (o) => o.type === "lecture" && o.sceneId === t && (o.status === "active" || o.status === "completed")
      );
      if (e) {
        if (e.status === "completed") {
          x(
            (l) => l.map(
              (S) => S.id === e.id ? { ...S, status: "active" } : S
            )
          );
          const o = (d = e.messages[0]) == null ? void 0 : d.id;
          o && J.current.set(e.id, o), e.lastActionIndex !== void 0 && ne.current.set(e.id, e.lastActionIndex);
        }
        return _(e.id), H((o) => /* @__PURE__ */ new Set([...o, e.id])), e.id;
      }
      const a = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`, u = Date.now(), g = `lecture-msg-${u}`, r = T.getState().scenes.find((o) => o.id === t), n = (r == null ? void 0 : r.title) || D("chat.lecture"), s = ge.getState().getAgent("default-1"), i = {
        id: g,
        role: "assistant",
        parts: [],
        metadata: {
          senderName: (s == null ? void 0 : s.name) || D("settings.agentNames.default-1"),
          senderAvatar: s == null ? void 0 : s.avatar,
          originalRole: "teacher",
          agentId: "default-1",
          createdAt: u
        }
      }, c = {
        id: a,
        type: "lecture",
        title: n,
        status: "active",
        messages: [i],
        config: {
          agentIds: ["default-1"],
          maxTurns: 0,
          currentTurn: 0
        },
        toolCalls: [],
        pendingToolCalls: [],
        sceneId: t,
        lastActionIndex: -1,
        createdAt: u,
        updatedAt: u
      };
      return J.current.set(a, g), x((o) => [...o, c]), _(a), H((o) => /* @__PURE__ */ new Set([...o, a])), v.info(`[ChatArea] Created lecture session: ${a} for scene ${t}`), a;
    },
    [U, D]
  ), Ie = w(
    (t, e, a) => {
      const u = J.current.get(t);
      if (!u) return;
      const g = ne.current.get(t) ?? -1;
      if (a <= g) return;
      ne.current.set(t, a), x(
        (n) => n.map(
          (s) => s.id === t ? { ...s, lastActionIndex: a, updatedAt: Date.now() } : s
        )
      );
      let r = I.current.get(t);
      if ((!r || r.disposed) && (r = se(t, "lecture")), e.type === "speech")
        r.pushText(u, e.text, "default-1"), r.sealText(u);
      else if (e.type === "spotlight" || e.type === "laser" || e.type === "discussion") {
        const n = Date.now();
        r.pushAction({
          messageId: u,
          actionId: `${e.type}-${n}`,
          actionName: e.type,
          params: e.type === "spotlight" ? {
            elementId: e.elementId,
            dimOpacity: e.dimOpacity
          } : e.type === "laser" ? { elementId: e.elementId } : {
            topic: e.topic,
            prompt: e.prompt
          },
          agentId: "default-1"
        });
      }
    },
    [se]
  ), le = U.find((t) => t.id === B), De = (le == null ? void 0 : le.type) ?? null, Ee = w((t) => J.current.get(t) ?? null, []), Te = w((t) => {
    const e = I.current.get(t);
    e && e.pause();
  }, []), $e = w((t) => {
    const e = I.current.get(t);
    e && e.resume();
  }, []), Me = w(() => {
    const t = C.current.find(
      (a) => (a.type === "qa" || a.type === "discussion") && a.status === "active"
    );
    if (!t) return !1;
    const e = I.current.get(t.id);
    return !e || e.disposed ? !1 : (j.current = !0, e.pause(), v.info("[ChatArea] Buffer-paused discussion:", t.id), !0);
  }, []), Ue = w(() => {
    const t = C.current.find(
      (a) => (a.type === "qa" || a.type === "discussion") && a.status === "active"
    );
    if (!t) return;
    j.current = !1;
    const e = I.current.get(t.id);
    e && e.resume(), v.info("[ChatArea] Buffer-resumed discussion:", t.id);
  }, []);
  return {
    sessions: U,
    activeSessionId: B,
    activeSessionType: De,
    expandedSessionIds: Se,
    isStreaming: ue,
    createSession: de,
    endSession: q,
    endActiveSession: Ae,
    softPauseActiveSession: he,
    resumeActiveSession: we,
    sendMessage: ve,
    startDiscussion: be,
    startLecture: Ce,
    addLectureMessage: Ie,
    toggleSessionExpand: ye,
    handleInterrupt: xe,
    getLectureMessageId: Ee,
    pauseBuffer: Te,
    resumeBuffer: $e,
    pauseActiveLiveBuffer: Me,
    resumeActiveLiveBuffer: Ue
  };
}
export {
  rt as useChatSessions
};
//# sourceMappingURL=use-chat-sessions.js.map
