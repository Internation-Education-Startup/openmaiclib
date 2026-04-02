import { jsxs as a, jsx as t, Fragment as W } from "react/jsx-runtime";
import { useState as B, useRef as V, useEffect as D, useCallback as _ } from "react";
import { AnimatePresence as ee, motion as te } from "motion/react";
import { Checkbox as re } from "../ui/checkbox.js";
import { Popover as q, PopoverTrigger as F, PopoverContent as X } from "../ui/popover.js";
import { cn as P } from "../../lib/utils/cn.js";
import { useI18n as ne } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as h } from "../../lib/store/settings.js";
import { useAgentRegistry as H } from "../../lib/orchestration/registry/store.js";
import { getAvailableProvidersWithVoices as oe, resolveAgentVoice as se } from "../../lib/audio/voice-resolver.js";
import { playBrowserTTSPreview as Q } from "../../lib/audio/browser-tts-preview.js";
import { Shuffle as J, Volume2 as U, VolumeX as K, ChevronUp as ie, ChevronDown as G, Sparkles as ae, MessageSquare as le, Minus as de, Plus as ce, Loader2 as Y } from "lucide-react";
import { Tooltip as ue, TooltipTrigger as me, TooltipContent as pe } from "../ui/tooltip.js";
function fe({
  agent: m,
  agentIndex: O,
  availableProviders: v,
  disabled: $
}) {
  const M = H((n) => n.updateAgent), I = h((n) => n.ttsProvidersConfig), b = se(m, O, v), [j, L] = B(!1), [A, c] = B(null), f = V(null), g = V(null), w = V(null), S = (() => {
    for (const n of v)
      if (n.providerId === b.providerId) {
        const r = n.voices.find((o) => o.id === b.voiceId);
        if (r) return r.name;
      }
    return b.voiceId;
  })(), T = _(() => {
    var n, r;
    (n = f.current) == null || n.call(f), f.current = null, (r = w.current) == null || r.abort(), w.current = null, g.current && (g.current.pause(), g.current.src = "", g.current = null), c(null);
  }, []), u = _(
    async (n, r, o) => {
      const p = `${n}::${r}`;
      if (A === p) {
        T();
        return;
      }
      T(), c(p);
      const N = (typeof localStorage < "u" && localStorage.getItem("generationLanguage") || "zh-CN") === "en-US" ? "Welcome to AI Classroom" : "欢迎来到AI课堂";
      if (n === "browser-native-tts") {
        const { promise: x, cancel: l } = Q({ text: N, voice: r });
        f.current = l;
        try {
          await x;
        } catch {
        }
        c(null);
        return;
      }
      try {
        const x = new AbortController();
        w.current = x;
        const l = I[n], s = await fetch("/api/generate/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: N,
            audioId: "voice-preview",
            ttsProviderId: n,
            ttsModelId: o || (l == null ? void 0 : l.modelId),
            ttsVoice: r,
            ttsSpeed: 1,
            ttsApiKey: l == null ? void 0 : l.apiKey,
            ttsBaseUrl: (l == null ? void 0 : l.serverBaseUrl) || (l == null ? void 0 : l.baseUrl)
          }),
          signal: x.signal
        });
        if (!s.ok) throw new Error("TTS error");
        const z = await s.json();
        if (!z.base64) throw new Error("No audio");
        const C = new Audio(`data:audio/${z.format || "mp3"};base64,${z.base64}`);
        g.current = C, C.addEventListener("ended", () => c(null)), C.addEventListener("error", () => c(null)), await C.play();
      } catch {
        c(null);
      }
    },
    [A, T, I]
  );
  return D(() => () => T(), [T]), $ ? /* @__PURE__ */ a(
    "div",
    {
      onClick: (n) => n.stopPropagation(),
      onPointerDown: (n) => n.stopPropagation(),
      className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-muted/40 px-2.5 text-[11px] text-muted-foreground/30 shrink-0 cursor-not-allowed",
      children: [
        /* @__PURE__ */ t(K, { className: "size-3 shrink-0" }),
        /* @__PURE__ */ t("span", { className: "truncate flex-1 text-left", children: S })
      ]
    }
  ) : /* @__PURE__ */ a(
    q,
    {
      open: j,
      onOpenChange: (n) => {
        L(n), n || T();
      },
      children: [
        /* @__PURE__ */ t(F, { asChild: !0, children: /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: (n) => n.stopPropagation(),
            onPointerDown: (n) => n.stopPropagation(),
            className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/25 dark:hover:bg-primary/35 px-2.5 text-[11px] text-primary/80 hover:text-primary dark:text-primary/90 transition-colors shrink-0 cursor-pointer",
            children: [
              /* @__PURE__ */ t(U, { className: "size-3 shrink-0" }),
              /* @__PURE__ */ t("span", { className: "truncate flex-1 text-left", children: S }),
              /* @__PURE__ */ t(G, { className: "size-3 shrink-0 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ t(
          X,
          {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: "w-56 px-1 pb-1 pt-0 max-h-64 overflow-y-auto",
            onClick: (n) => n.stopPropagation(),
            onPointerDown: (n) => n.stopPropagation(),
            children: v.map(
              (n) => n.modelGroups.map((r) => /* @__PURE__ */ a("div", { children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] text-muted-foreground/60 font-medium px-2 py-1 sticky top-0 bg-popover", children: r.modelId ? `${n.providerName} · ${r.modelName}` : n.providerName }),
                r.voices.map((o) => {
                  const p = b.providerId === n.providerId && b.voiceId === o.id && (b.modelId || "") === (r.modelId || ""), y = `${n.providerId}::${o.id}`, N = A === y;
                  return /* @__PURE__ */ a(
                    "div",
                    {
                      className: P(
                        "flex items-center gap-1.5 rounded-sm transition-colors",
                        p ? "bg-primary/10" : "hover:bg-muted"
                      ),
                      children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              M(m.id, {
                                voiceConfig: {
                                  providerId: n.providerId,
                                  modelId: r.modelId || void 0,
                                  voiceId: o.id
                                }
                              }), L(!1);
                            },
                            className: P(
                              "flex-1 text-left text-[13px] px-2 py-1.5 min-w-0 truncate",
                              p ? "text-primary font-medium" : "text-foreground"
                            ),
                            children: o.name
                          }
                        ),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            onClick: (x) => {
                              x.stopPropagation(), u(n.providerId, o.id, r.modelId);
                            },
                            className: P(
                              "shrink-0 size-6 flex items-center justify-center rounded-sm transition-colors",
                              N ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
                            ),
                            children: N ? /* @__PURE__ */ t(Y, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ t(U, { className: "size-3.5" })
                          }
                        )
                      ]
                    },
                    y
                  );
                })
              ] }, `${n.providerId}::${r.modelId}`))
            )
          }
        )
      ]
    }
  );
}
function ge({
  availableProviders: m,
  disabled: O
}) {
  const v = h((r) => r.ttsProviderId), $ = h((r) => r.ttsVoice), M = h((r) => r.setTTSProvider), I = h((r) => r.setTTSVoice), b = h((r) => r.setTTSProviderConfig), j = h((r) => r.ttsProvidersConfig), [L, A] = B(!1), [c, f] = B(null), g = V(null), w = V(null), S = V(null), T = (() => {
    for (const r of m)
      if (r.providerId === v) {
        const o = r.voices.find((p) => p.id === $);
        if (o) return o.name;
      }
    return $ || "default";
  })(), u = _(() => {
    var r, o;
    (r = g.current) == null || r.call(g), g.current = null, (o = S.current) == null || o.abort(), S.current = null, w.current && (w.current.pause(), w.current.src = "", w.current = null), f(null);
  }, []), n = _(
    async (r, o, p) => {
      const y = `${r}::${o}`;
      if (c === y) {
        u();
        return;
      }
      u(), f(y);
      const x = (typeof localStorage < "u" && localStorage.getItem("generationLanguage") || "zh-CN") === "en-US" ? "Welcome to AI Classroom" : "欢迎来到AI课堂";
      if (r === "browser-native-tts") {
        const { promise: l, cancel: s } = Q({ text: x, voice: o });
        g.current = s;
        try {
          await l;
        } catch {
        }
        f(null);
        return;
      }
      try {
        const l = new AbortController();
        S.current = l;
        const s = j[r], z = await fetch("/api/generate/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: x,
            audioId: "voice-preview",
            ttsProviderId: r,
            ttsModelId: p || (s == null ? void 0 : s.modelId),
            ttsVoice: o,
            ttsSpeed: 1,
            ttsApiKey: s == null ? void 0 : s.apiKey,
            ttsBaseUrl: (s == null ? void 0 : s.serverBaseUrl) || (s == null ? void 0 : s.baseUrl)
          }),
          signal: l.signal
        });
        if (!z.ok) throw new Error("TTS error");
        const C = await z.json();
        if (!C.base64) throw new Error("No audio");
        const E = new Audio(`data:audio/${C.format || "mp3"};base64,${C.base64}`);
        w.current = E, E.addEventListener("ended", () => f(null)), E.addEventListener("error", () => f(null)), await E.play();
      } catch {
        f(null);
      }
    },
    [c, u, j]
  );
  return D(() => () => u(), [u]), O ? /* @__PURE__ */ a(
    "div",
    {
      onClick: (r) => r.stopPropagation(),
      onPointerDown: (r) => r.stopPropagation(),
      className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-muted/40 px-2.5 text-[11px] text-muted-foreground/30 shrink-0 cursor-not-allowed",
      children: [
        /* @__PURE__ */ t(K, { className: "size-3 shrink-0" }),
        /* @__PURE__ */ t("span", { className: "truncate flex-1 text-left", children: T })
      ]
    }
  ) : /* @__PURE__ */ a(
    q,
    {
      open: L,
      onOpenChange: (r) => {
        A(r), r || u();
      },
      children: [
        /* @__PURE__ */ t(F, { asChild: !0, children: /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: (r) => r.stopPropagation(),
            onPointerDown: (r) => r.stopPropagation(),
            className: "flex items-center gap-1.5 h-6 w-[100px] rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/25 dark:hover:bg-primary/35 px-2.5 text-[11px] text-primary/80 hover:text-primary dark:text-primary/90 transition-colors shrink-0 cursor-pointer",
            children: [
              /* @__PURE__ */ t(U, { className: "size-3 shrink-0" }),
              /* @__PURE__ */ t("span", { className: "truncate flex-1 text-left", children: T }),
              /* @__PURE__ */ t(G, { className: "size-3 shrink-0 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ t(
          X,
          {
            side: "bottom",
            align: "end",
            sideOffset: 4,
            className: "w-56 px-1 pb-1 pt-0 max-h-64 overflow-y-auto",
            onClick: (r) => r.stopPropagation(),
            onPointerDown: (r) => r.stopPropagation(),
            children: m.map(
              (r) => r.modelGroups.map((o) => /* @__PURE__ */ a("div", { children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] text-muted-foreground/60 font-medium px-2 py-1 sticky top-0 bg-popover", children: o.modelId ? `${r.providerName} · ${o.modelName}` : r.providerName }),
                o.voices.map((p) => {
                  var s;
                  const y = ((s = j[v]) == null ? void 0 : s.modelId) || "", N = v === r.providerId && $ === p.id && y === (o.modelId || ""), x = `${r.providerId}::${p.id}`, l = c === x;
                  return /* @__PURE__ */ a(
                    "div",
                    {
                      className: P(
                        "flex items-center gap-1.5 rounded-sm transition-colors",
                        N ? "bg-primary/10" : "hover:bg-muted"
                      ),
                      children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              M(r.providerId), I(p.id), o.modelId && b(r.providerId, { modelId: o.modelId }), A(!1);
                            },
                            className: P(
                              "flex-1 text-left text-[13px] px-2 py-1.5 min-w-0 truncate",
                              N ? "text-primary font-medium" : "text-foreground"
                            ),
                            children: p.name
                          }
                        ),
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            onClick: (z) => {
                              z.stopPropagation(), n(r.providerId, p.id, o.modelId);
                            },
                            className: P(
                              "shrink-0 size-6 flex items-center justify-center rounded-sm transition-colors",
                              l ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
                            ),
                            children: l ? /* @__PURE__ */ t(Y, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ t(U, { className: "size-3.5" })
                          }
                        )
                      ]
                    },
                    x
                  );
                })
              ] }, `${r.providerId}::${o.modelId}`))
            )
          }
        )
      ]
    }
  );
}
function ze() {
  const { t: m } = ne(), { listAgents: O } = H(), v = h((e) => e.selectedAgentIds), $ = h((e) => e.setSelectedAgentIds), M = h((e) => e.maxTurns), I = h((e) => e.setMaxTurns), b = h((e) => e.agentMode), j = h((e) => e.setAgentMode), L = h((e) => e.ttsProvidersConfig), A = h((e) => e.ttsEnabled), [c, f] = B(!1), [g, w] = B([]), S = V(null);
  D(() => {
    if (typeof window > "u" || !window.speechSynthesis) return;
    const e = () => w(speechSynthesis.getVoices());
    return e(), speechSynthesis.addEventListener("voiceschanged", e), () => speechSynthesis.removeEventListener("voiceschanged", e);
  }, []);
  const u = O().filter((e) => !e.isGenerated), n = u.find((e) => e.role === "teacher"), o = u.filter((e) => v.includes(e.id)).filter((e) => e.role !== "teacher"), y = [
    ...oe(L),
    ...g.length > 0 ? [
      {
        providerId: "browser-native-tts",
        providerName: "Browser Native",
        voices: g.map((e) => ({ id: e.voiceURI, name: e.name })),
        modelGroups: [
          {
            modelId: "",
            modelName: "Browser Native",
            voices: g.map((e) => ({ id: e.voiceURI, name: e.name }))
          }
        ]
      }
    ] : []
  ], N = y.length > 0;
  D(() => {
    if (!c) return;
    const e = (i) => {
      var k;
      const d = i.target;
      S.current && S.current.contains(d) || (k = d.closest) != null && k.call(d, "[data-radix-popper-content-wrapper]") || f(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [c]);
  const x = (e) => {
    if (j(e), e === "preset") {
      const i = v.filter((k) => u.some((R) => R.id === k));
      !i.some((k) => {
        const R = u.find((Z) => Z.id === k);
        return (R == null ? void 0 : R.role) === "teacher";
      }) && n && i.unshift(n.id), $(
        i.length > 0 ? i : ["default-1", "default-2", "default-3"]
      );
    }
  }, l = (e) => {
    const i = u.find((d) => d.id === e);
    (i == null ? void 0 : i.role) !== "teacher" && (v.includes(e) ? $(v.filter((d) => d !== e)) : $([...v, e]));
  }, s = (e) => {
    const i = `settings.agentNames.${e.id}`, d = m(i);
    return d !== i ? d : e.name;
  }, z = (e) => {
    const i = `settings.agentRoles.${e.role}`, d = m(i);
    return d !== i ? d : e.role;
  }, C = /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5 shrink-0", children: [
    n && /* @__PURE__ */ t("div", { className: "size-8 rounded-full overflow-hidden ring-2 ring-blue-400/40 dark:ring-blue-500/30 shrink-0", children: /* @__PURE__ */ t(
      "img",
      {
        src: n.avatar,
        alt: s(n),
        className: "size-full object-cover"
      }
    ) }),
    b === "auto" ? /* @__PURE__ */ a(W, { children: [
      /* @__PURE__ */ t("div", { className: "flex -space-x-2", children: u.find((e) => e.role === "assistant") && /* @__PURE__ */ t("div", { className: "size-6 rounded-full overflow-hidden ring-[1.5px] ring-background", children: /* @__PURE__ */ t(
        "img",
        {
          src: u.find((e) => e.role === "assistant").avatar,
          alt: "",
          className: "size-full object-cover"
        }
      ) }) }),
      /* @__PURE__ */ t(J, { className: "size-4 text-violet-400 dark:text-violet-500" })
    ] }) : /* @__PURE__ */ t(W, { children: o.length > 0 && /* @__PURE__ */ a("div", { className: "flex -space-x-2", children: [
      o.slice(0, 4).map((e) => /* @__PURE__ */ t(
        "div",
        {
          className: "size-6 rounded-full overflow-hidden ring-[1.5px] ring-background",
          children: /* @__PURE__ */ t(
            "img",
            {
              src: e.avatar,
              alt: s(e),
              className: "size-full object-cover"
            }
          )
        },
        e.id
      )),
      o.length > 4 && /* @__PURE__ */ t("div", { className: "size-6 rounded-full bg-muted ring-[1.5px] ring-background flex items-center justify-center", children: /* @__PURE__ */ a("span", { className: "text-[9px] font-bold text-muted-foreground", children: [
        "+",
        o.length - 4
      ] }) })
    ] }) }),
    N && (A ? /* @__PURE__ */ t(U, { className: "size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" }) : /* @__PURE__ */ t(K, { className: "size-3.5 text-muted-foreground/30" }))
  ] }), E = (e, i, d) => {
    const k = v.includes(e.id);
    return /* @__PURE__ */ a(
      "div",
      {
        onClick: () => l(e.id),
        className: P(
          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors",
          "cursor-pointer",
          k && "bg-primary/5",
          !k && "hover:bg-muted/50"
        ),
        children: [
          /* @__PURE__ */ t(
            re,
            {
              checked: k,
              disabled: d,
              className: P("pointer-events-none", d)
            }
          ),
          /* @__PURE__ */ t(
            "div",
            {
              className: "size-7 rounded-full overflow-hidden shrink-0 ring-1 ring-border/40",
              style: { boxShadow: k ? `0 0 0 2px ${e.color}30` : void 0 },
              children: /* @__PURE__ */ t("img", { src: e.avatar, alt: s(e), className: "size-full object-cover" })
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[13px] font-medium truncate min-w-0 flex-1", children: s(e) }),
          /* @__PURE__ */ t("span", { className: "text-[10px] text-muted-foreground/50 shrink-0 w-[52px] text-right", children: z(e) }),
          N && /* @__PURE__ */ t(
            fe,
            {
              agent: e,
              agentIndex: i,
              availableProviders: y,
              disabled: !A
            }
          )
        ]
      },
      e.id
    );
  };
  return /* @__PURE__ */ a("div", { ref: S, className: "relative w-96", children: [
    /* @__PURE__ */ a(ue, { children: [
      /* @__PURE__ */ t(me, { asChild: !0, children: /* @__PURE__ */ a(
        "button",
        {
          className: P(
            "group flex items-center gap-2 cursor-pointer rounded-full px-2.5 py-2 transition-all w-full",
            "border border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60"
          ),
          onClick: () => f(!c),
          children: [
            /* @__PURE__ */ t("span", { className: "text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors hidden sm:block font-medium flex-1 text-left truncate", children: m(c ? "agentBar.expandedTitle" : "agentBar.readyToLearn") }),
            C,
            c ? /* @__PURE__ */ t(ie, { className: "size-3 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" }) : /* @__PURE__ */ t(G, { className: "size-3 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" })
          ]
        }
      ) }),
      !c && /* @__PURE__ */ t(pe, { side: "bottom", sideOffset: 4, children: m("agentBar.configTooltip") })
    ] }),
    /* @__PURE__ */ t(ee, { children: c && /* @__PURE__ */ t(
      te.div,
      {
        initial: { opacity: 0, y: -4, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -4, scale: 0.97 },
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        className: "absolute right-0 top-full mt-1 z-50 w-96",
        children: /* @__PURE__ */ a("div", { className: "rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_1px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_8px_-2px_rgba(0,0,0,0.3)] px-2 py-1.5", children: [
          n && /* @__PURE__ */ a("div", { className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary/5 mb-2", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "size-7 rounded-full overflow-hidden shrink-0 ring-1 ring-border/40",
                style: { boxShadow: `0 0 0 2px ${n.color}30` },
                children: /* @__PURE__ */ t(
                  "img",
                  {
                    src: n.avatar,
                    alt: s(n),
                    className: "size-full object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-[13px] font-medium truncate min-w-0 flex-1", children: s(n) }),
            N && /* @__PURE__ */ t(
              ge,
              {
                availableProviders: y,
                disabled: !A
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: "flex rounded-lg border bg-muted/30 p-0.5 mb-2", children: [
            /* @__PURE__ */ t(
              "button",
              {
                onClick: () => x("preset"),
                className: P(
                  "flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center",
                  b === "preset" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                ),
                children: m("settings.agentModePreset")
              }
            ),
            /* @__PURE__ */ a(
              "button",
              {
                onClick: () => x("auto"),
                className: P(
                  "flex-1 py-1.5 text-xs font-medium rounded-md transition-all text-center flex items-center justify-center gap-1",
                  b === "auto" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ t(ae, { className: "h-3 w-3" }),
                  m("settings.agentModeAuto")
                ]
              }
            )
          ] }),
          b === "preset" ? /* @__PURE__ */ t("div", { className: "max-h-56 overflow-y-auto -mx-0.5", children: u.filter((e) => e.role !== "teacher").map((e, i) => E(e, i + 1, !1)) }) : /* @__PURE__ */ a("div", { className: "flex flex-col items-center pt-6 pb-3 gap-4", children: [
            /* @__PURE__ */ a("div", { className: "relative flex items-center justify-center", children: [
              /* @__PURE__ */ t("div", { className: "absolute size-10 rounded-full bg-violet-400/10 dark:bg-violet-400/15 animate-ping [animation-duration:3s]" }),
              /* @__PURE__ */ t("div", { className: "absolute size-12 rounded-full bg-violet-400/5 dark:bg-violet-400/10 animate-pulse [animation-duration:2.5s]" }),
              /* @__PURE__ */ t(J, { className: "relative size-5 text-violet-400 dark:text-violet-500" })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex-1" }),
            /* @__PURE__ */ a("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ t("p", { className: "text-[11px] text-muted-foreground/60", children: m("settings.agentModeAutoDesc") }),
              /* @__PURE__ */ t("p", { className: "text-[10px] text-muted-foreground/40", children: m("agentBar.voiceAutoAssign") })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5 px-2 py-1 mt-1 border-t border-border/30", children: [
            /* @__PURE__ */ t(le, { className: "size-3 text-muted-foreground/40 shrink-0" }),
            /* @__PURE__ */ t("span", { className: "text-[11px] text-muted-foreground/50 flex-1", children: m("settings.maxTurns") }),
            /* @__PURE__ */ a("div", { className: "flex items-center rounded-full bg-muted/50 h-5 shrink-0", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    const i = Math.max(1, parseInt(M || "1") - 1);
                    I(String(i));
                  },
                  className: "size-5 flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors rounded-full hover:bg-muted",
                  children: /* @__PURE__ */ t(de, { className: "size-2.5" })
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  type: "text",
                  inputMode: "numeric",
                  value: M,
                  onChange: (e) => {
                    const i = e.target.value.replace(/\D/g, "");
                    if (!i) {
                      I("");
                      return;
                    }
                    const d = Math.min(20, Math.max(1, parseInt(i)));
                    I(String(d));
                  },
                  onBlur: () => {
                    (!M || parseInt(M) < 1) && I("1");
                  },
                  onClick: (e) => e.stopPropagation(),
                  className: "w-5 h-5 text-[11px] font-medium tabular-nums text-center bg-transparent outline-none border-none"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    const i = Math.min(20, parseInt(M || "1") + 1);
                    I(String(i));
                  },
                  className: "size-5 flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors rounded-full hover:bg-muted",
                  children: /* @__PURE__ */ t(ce, { className: "size-2.5" })
                }
              )
            ] })
          ] })
        ] })
      }
    ) })
  ] });
}
export {
  ze as AgentBar
};
//# sourceMappingURL=agent-bar.js.map
