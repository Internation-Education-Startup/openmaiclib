import { jsx as t, jsxs as h } from "react/jsx-runtime";
import { Suspense as Je, useRef as te, useState as x, useEffect as re } from "react";
import { useRouter as Ue } from "../../shims/next-navigation.js";
import { motion as I, AnimatePresence as $ } from "motion/react";
import { AlertCircle as Pe, ArrowLeft as Oe, CheckCircle2 as Le, AlertTriangle as We, Sparkles as _e, Bot as $e } from "lucide-react";
import { Button as ae } from "../../components/ui/button.js";
import { Card as Te } from "../../components/ui/card.js";
import { Tooltip as Ve, TooltipTrigger as He, TooltipContent as Xe } from "../../components/ui/tooltip.js";
import { cn as Ye } from "../../lib/utils/cn.js";
import { useStageStore as Qe } from "../../lib/store/stage.js";
import { useSettingsStore as ne } from "../../lib/store/settings.js";
import { useAgentRegistry as ie } from "../../lib/orchestration/registry/store.js";
import { getAvailableProvidersWithVoices as Ze } from "../../lib/audio/voice-resolver.js";
import { useI18n as et } from "../../lib/hooks/use-i18n.js";
import { cleanupOldImages as tt, loadPdfBlob as rt, storeImages as at, loadImageMapping as nt } from "../../lib/utils/image-storage.js";
import { getCurrentModelConfig as it } from "../../lib/utils/model-config.js";
import { db as st } from "../../lib/utils/database.js";
import { MAX_PDF_CONTENT_CHARS as V, MAX_VISION_IMAGES as Ee } from "../../lib/constants/generation.js";
import { nanoid as ot } from "nanoid";
import { AgentRevealModal as lt } from "../../components/agent/agent-reveal-modal.js";
import { createLogger as dt } from "../../lib/logger.js";
import { getActiveSteps as H, ALL_STEPS as ct } from "./types.js";
import { StepVisualizer as pt } from "./components/visualizers.js";
const S = dt("GenerationPreview");
function gt() {
  const X = Ue(), { t: s } = et(), se = te(!1), K = te(null), [z, J] = x(null), [Ce, Fe] = x(!1), [P, oe] = x(null), [U, O] = x(0), [G] = x(!1), [je, le] = x(""), [ze, Y] = x(null), [de, Ge] = x([]), [qe, ce] = x(
    []
  ), [pe, Q] = x(!1), [ge, De] = x([]), q = te(null), L = H(z);
  re(() => {
    tt(24).catch((n) => S.error(n));
    const d = sessionStorage.getItem("generationSession");
    if (d)
      try {
        const n = JSON.parse(d);
        J(n);
      } catch (n) {
        S.error("Failed to parse generation session:", n);
      }
    Fe(!0);
  }, []), re(() => () => {
    var d;
    (d = K.current) == null || d.abort();
  }, []);
  const W = () => {
    var M, R;
    const d = it(), n = ne.getState(), e = (M = n.imageProvidersConfig) == null ? void 0 : M[n.imageProviderId], N = (R = n.videoProvidersConfig) == null ? void 0 : R[n.videoProviderId];
    return {
      "Content-Type": "application/json",
      "x-model": d.modelString,
      "x-api-key": d.apiKey,
      "x-base-url": d.baseUrl,
      "x-provider-type": d.providerType || "",
      "x-requires-api-key": d.requiresApiKey ? "true" : "false",
      // Image generation provider
      "x-image-provider": n.imageProviderId || "",
      "x-image-model": n.imageModelId || "",
      "x-image-api-key": (e == null ? void 0 : e.apiKey) || "",
      "x-image-base-url": (e == null ? void 0 : e.baseUrl) || "",
      // Video generation provider
      "x-video-provider": n.videoProviderId || "",
      "x-video-model": n.videoModelId || "",
      "x-video-api-key": (N == null ? void 0 : N.apiKey) || "",
      "x-video-base-url": (N == null ? void 0 : N.baseUrl) || "",
      // Media generation toggles
      "x-image-generation-enabled": String(n.imageGenerationEnabled ?? !1),
      "x-video-generation-enabled": String(n.videoGenerationEnabled ?? !1)
    };
  };
  re(() => {
    z && !se.current && (se.current = !0, Me());
  }, [z]);
  const Me = async () => {
    var N, M, R, ue, fe, he, be, ye, we;
    if (!z) return;
    (N = K.current) == null || N.abort();
    const d = new AbortController();
    K.current = d;
    const n = d.signal;
    let e = z;
    oe(null), O(0);
    try {
      let u = H(e);
      const ve = !!e.pdfStorageKey && !e.pdfText;
      if (!ve) {
        const r = u.findIndex((c) => c.id !== "pdf-analysis");
        O(Math.max(0, r));
      }
      if (ve) {
        S.debug("=== Generation Preview: Parsing PDF ===");
        const r = await rt(e.pdfStorageKey);
        if (!r)
          throw new Error(s("generation.pdfLoadFailed"));
        if (!(r instanceof Blob) || r.size === 0)
          throw S.error("Invalid PDF blob:", {
            type: typeof r,
            size: r instanceof Blob ? r.size : "N/A"
          }), new Error(s("generation.pdfLoadFailed"));
        const c = new File([r], e.pdfFileName || "document.pdf", {
          type: "application/pdf"
        }), a = new FormData();
        a.append("pdf", c), e.pdfProviderId && a.append("providerId", e.pdfProviderId), (R = (M = e.pdfProviderConfig) == null ? void 0 : M.apiKey) != null && R.trim() && a.append("apiKey", e.pdfProviderConfig.apiKey), (fe = (ue = e.pdfProviderConfig) == null ? void 0 : ue.baseUrl) != null && fe.trim() && a.append("baseUrl", e.pdfProviderConfig.baseUrl);
        const o = await fetch("/api/parse-pdf", {
          method: "POST",
          body: a,
          signal: n
        });
        if (!o.ok) {
          const g = await o.json();
          throw new Error(g.error || s("generation.pdfParseFailed"));
        }
        const i = await o.json();
        if (!i.success || !i.data)
          throw new Error(s("generation.pdfParseFailed"));
        let p = i.data.text;
        p.length > V && (p = p.substring(0, V));
        const m = (he = i.data.metadata) == null ? void 0 : he.pdfImages, l = m ? m.map(
          (g) => ({
            id: g.id,
            src: g.src || "",
            pageNumber: g.pageNumber || 1,
            description: g.description,
            width: g.width,
            height: g.height
          })
        ) : i.data.images.map((g, j) => ({
          id: `img_${j + 1}`,
          src: g,
          pageNumber: 1
        })), v = await at(l), k = l.map(
          (g, j) => ({
            id: g.id,
            src: "",
            pageNumber: g.pageNumber,
            description: g.description,
            width: g.width,
            height: g.height,
            storageId: v[j]
          })
        ), b = {
          ...e,
          pdfText: p,
          pdfImages: k,
          imageStorageIds: v,
          pdfStorageKey: void 0
          // Clear so we don't re-parse
        };
        J(b), sessionStorage.setItem("generationSession", JSON.stringify(b));
        const F = [];
        i.data.text.length > V && F.push(
          s("generation.textTruncated").replace("{n}", String(V))
        ), l.length > Ee && F.push(
          s("generation.imageTruncated").replace("{total}", String(l.length)).replace("{max}", String(Ee))
        ), F.length > 0 && Ge(F), e = b, u = H(e);
      }
      const xe = u.findIndex((r) => r.id === "web-search");
      if (e.requirements.webSearch && xe >= 0) {
        O(xe), ce([]);
        const r = ne.getState(), c = (ye = (be = r.webSearchProvidersConfig) == null ? void 0 : be[r.webSearchProviderId]) == null ? void 0 : ye.apiKey, a = await fetch("/api/web-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: e.requirements.requirement,
            apiKey: c || void 0
          }),
          signal: n
        });
        if (!a.ok) {
          const m = await a.json().catch(() => ({ error: "Web search failed" }));
          throw new Error(m.error || s("generation.webSearchFailed"));
        }
        const o = await a.json(), i = (o.sources || []).map((m) => ({
          title: m.title,
          url: m.url
        }));
        ce(i);
        const p = {
          ...e,
          researchContext: o.context || "",
          researchSources: i
        };
        J(p), sessionStorage.setItem("generationSession", JSON.stringify(p)), e = p, u = H(e);
      }
      let _ = {};
      e.imageStorageIds && e.imageStorageIds.length > 0 ? (S.debug("Loading images from IndexedDB"), _ = await nt(e.imageStorageIds)) : e.imageMapping && Object.keys(e.imageMapping).length > 0 && (S.debug("Using imageMapping from session (old format)"), _ = e.imageMapping);
      const y = ne.getState();
      let T = [];
      const f = {
        id: ot(10),
        name: Re(e.requirements.requirement),
        description: "",
        language: e.requirements.language || "zh-CN",
        style: "professional",
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      if (y.agentMode === "auto") {
        const r = u.findIndex((c) => c.id === "agent-generation");
        r >= 0 && O(r);
        try {
          const c = [
            {
              path: "/avatars/teacher.png",
              desc: "Male teacher with glasses, holding a book, green background"
            },
            {
              path: "/avatars/teacher-2.png",
              desc: "Female teacher with long dark hair, blue traditional outfit, gentle expression"
            },
            {
              path: "/avatars/assist.png",
              desc: "Young female assistant with glasses, pink background, friendly smile"
            },
            {
              path: "/avatars/assist-2.png",
              desc: "Young female in orange top and purple overalls, cheerful and approachable"
            },
            {
              path: "/avatars/clown.png",
              desc: "Energetic girl with glasses pointing up, green shirt, lively and fun"
            },
            {
              path: "/avatars/clown-2.png",
              desc: "Playful girl with curly hair doing rock gesture, blue shirt, humorous vibe"
            },
            {
              path: "/avatars/curious.png",
              desc: "Surprised boy with glasses, hand on cheek, curious expression"
            },
            {
              path: "/avatars/curious-2.png",
              desc: "Boy with backpack holding a book and question mark bubble, inquisitive"
            },
            {
              path: "/avatars/note-taker.png",
              desc: "Studious boy with glasses, blue shirt, calm and organized"
            },
            {
              path: "/avatars/note-taker-2.png",
              desc: "Active boy with yellow backpack waving, blue outfit, enthusiastic learner"
            },
            {
              path: "/avatars/thinker.png",
              desc: "Thoughtful girl with hand on chin, purple background, contemplative"
            },
            {
              path: "/avatars/thinker-2.png",
              desc: "Girl reading a book intently, long dark hair, intellectual and focused"
            }
          ], a = () => Ze(y.ttsProvidersConfig).flatMap(
            (v) => v.voices.map((k) => ({
              providerId: v.providerId,
              voiceId: k.id,
              voiceName: k.name
            }))
          ), o = await fetch("/api/generate/agent-profiles", {
            method: "POST",
            headers: W(),
            body: JSON.stringify({
              stageInfo: { name: f.name, description: f.description },
              language: e.requirements.language || "zh-CN",
              availableAvatars: c.map((l) => l.path),
              avatarDescriptions: c.map((l) => ({ path: l.path, desc: l.desc })),
              availableVoices: a()
            }),
            signal: n
          });
          if (!o.ok) throw new Error("Agent generation failed");
          const i = await o.json();
          if (!i.success) throw new Error(i.error || "Agent generation failed");
          const { saveGeneratedAgents: p } = await import("../../lib/orchestration/registry/store.js"), m = await p(f.id, i.agents);
          y.setSelectedAgentIds(m), f.agentIds = m, De(i.agents), Q(!0), await new Promise((l) => {
            q.current = l;
          }), T = m.map((l) => ie.getState().getAgent(l)).filter(Boolean).map((l) => ({
            id: l.id,
            name: l.name,
            role: l.role,
            persona: l.persona
          }));
        } catch (c) {
          S.warn("[Generation] Agent generation failed, falling back to presets:", c);
          const a = ie.getState(), o = y.selectedAgentIds.filter((i) => {
            const p = a.getAgent(i);
            return p && !p.isGenerated;
          });
          T = o.map((i) => a.getAgent(i)).filter(Boolean).map((i) => ({
            id: i.id,
            name: i.name,
            role: i.role,
            persona: i.persona
          })), f.agentIds = o;
        }
      } else {
        const r = ie.getState(), c = y.selectedAgentIds.filter((a) => {
          const o = r.getAgent(a);
          return o && !o.isGenerated;
        });
        T = c.map((a) => r.getAgent(a)).filter(Boolean).map((a) => ({
          id: a.id,
          name: a.name,
          role: a.role,
          persona: a.persona
        })), f.agentIds = c;
      }
      let w = e.sceneOutlines;
      const Se = u.findIndex((r) => r.id === "outline");
      if (O(Se >= 0 ? Se : 0), !w || w.length === 0) {
        S.debug("=== Generating outlines (SSE) ==="), Y([]), w = await new Promise((c, a) => {
          const o = [];
          fetch("/api/generate/scene-outlines-stream", {
            method: "POST",
            headers: W(),
            body: JSON.stringify({
              requirements: e.requirements,
              pdfText: e.pdfText,
              pdfImages: e.pdfImages,
              imageMapping: _,
              researchContext: e.researchContext,
              agents: T
            }),
            signal: n
          }).then((i) => {
            var k;
            if (!i.ok)
              return i.json().then((b) => {
                a(new Error(b.error || s("generation.outlineGenerateFailed")));
              });
            const p = (k = i.body) == null ? void 0 : k.getReader();
            if (!p) {
              a(new Error(s("generation.streamNotReadable")));
              return;
            }
            const m = new TextDecoder();
            let l = "";
            const v = () => p.read().then(({ done: b, value: F }) => {
              if (F) {
                l += m.decode(F, { stream: !b });
                const g = l.split(`
`);
                l = g.pop() || "";
                for (const j of g)
                  if (j.startsWith("data: "))
                    try {
                      const A = JSON.parse(j.slice(6));
                      if (A.type === "outline")
                        o.push(A.data), Y([...o]);
                      else if (A.type === "retry")
                        o.length = 0, Y([]), le(s("generation.outlineRetrying"));
                      else if (A.type === "done") {
                        c(A.outlines || o);
                        return;
                      } else if (A.type === "error") {
                        a(new Error(A.error));
                        return;
                      }
                    } catch (A) {
                      S.error("Failed to parse outline SSE:", j, A);
                    }
              }
              if (b) {
                o.length > 0 ? c(o) : a(new Error(s("generation.outlineEmptyResponse")));
                return;
              }
              return v();
            });
            v().catch(a);
          }).catch(a);
        });
        const r = { ...e, sceneOutlines: w };
        J(r), sessionStorage.setItem("generationSession", JSON.stringify(r));
        try {
          localStorage.removeItem("requirementDraft");
        } catch {
        }
        await new Promise((c) => setTimeout(c, 800));
      }
      if (le(""), !w || w.length === 0)
        throw new Error(s("generation.outlineEmptyResponse"));
      const E = Qe.getState();
      E.setStage(f), E.setOutlines(w);
      const Ie = u.findIndex((r) => r.id === "slide-content");
      Ie >= 0 && O(Ie);
      const Be = {
        name: f.name,
        description: f.description,
        language: f.language,
        style: f.style
      }, Ne = e.requirements.userNickname || e.requirements.userBio ? `Student: ${e.requirements.userNickname || "Unknown"}${e.requirements.userBio ? ` — ${e.requirements.userBio}` : ""}` : void 0;
      E.setGeneratingOutlines(w);
      const ke = w[0], Z = await fetch("/api/generate/scene-content", {
        method: "POST",
        headers: W(),
        body: JSON.stringify({
          outline: ke,
          allOutlines: w,
          pdfImages: e.pdfImages,
          imageMapping: _,
          stageInfo: Be,
          stageId: f.id,
          agents: T
        }),
        signal: n
      });
      if (!Z.ok) {
        const r = await Z.json().catch(() => ({ error: "Request failed" }));
        throw new Error(r.error || s("generation.sceneGenerateFailed"));
      }
      const B = await Z.json();
      if (!B.success || !B.content)
        throw new Error(B.error || s("generation.sceneGenerateFailed"));
      const Ae = u.findIndex((r) => r.id === "actions");
      O(Ae >= 0 ? Ae : U + 1);
      const ee = await fetch("/api/generate/scene-actions", {
        method: "POST",
        headers: W(),
        body: JSON.stringify({
          outline: B.effectiveOutline || ke,
          allOutlines: w,
          content: B.content,
          stageId: f.id,
          agents: T,
          previousSpeeches: [],
          userProfile: Ne
        }),
        signal: n
      });
      if (!ee.ok) {
        const r = await ee.json().catch(() => ({ error: "Request failed" }));
        throw new Error(r.error || s("generation.sceneGenerateFailed"));
      }
      const C = await ee.json();
      if (!C.success || !C.scene)
        throw new Error(C.error || s("generation.sceneGenerateFailed"));
      if (y.ttsEnabled && y.ttsProviderId !== "browser-native-tts") {
        const r = (we = y.ttsProvidersConfig) == null ? void 0 : we[y.ttsProviderId], c = (C.scene.actions || []).filter(
          (o) => o.type === "speech" && o.text
        );
        let a = 0;
        for (const o of c) {
          const i = `tts_${o.id}`;
          o.audioId = i;
          try {
            const p = await fetch("/api/generate/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: o.text,
                audioId: i,
                ttsProviderId: y.ttsProviderId,
                ttsModelId: r == null ? void 0 : r.modelId,
                ttsVoice: y.ttsVoice,
                ttsSpeed: y.ttsSpeed,
                ttsApiKey: (r == null ? void 0 : r.apiKey) || void 0,
                ttsBaseUrl: (r == null ? void 0 : r.baseUrl) || void 0
              }),
              signal: n
            });
            if (!p.ok) {
              a++;
              continue;
            }
            const m = await p.json();
            if (!m.success) {
              a++;
              continue;
            }
            const l = atob(m.base64), v = new Uint8Array(l.length);
            for (let b = 0; b < l.length; b++) v[b] = l.charCodeAt(b);
            const k = new Blob([v], { type: `audio/${m.format}` });
            await st.audioFiles.put({
              id: i,
              blob: k,
              format: m.format,
              createdAt: Date.now()
            });
          } catch (p) {
            S.warn(`[TTS] Failed for ${i}:`, p), a++;
          }
        }
        if (a > 0 && c.length > 0)
          throw new Error(s("generation.speechFailed"));
      }
      E.addScene(C.scene), E.setCurrentSceneId(C.scene.id);
      const Ke = w.filter((r) => r.order !== C.scene.order);
      E.setGeneratingOutlines(Ke), sessionStorage.setItem(
        "generationParams",
        JSON.stringify({
          pdfImages: e.pdfImages,
          agents: T,
          userProfile: Ne
        })
      ), sessionStorage.removeItem("generationSession"), await E.saveToStorage(), X.push(`/classroom/${f.id}`);
    } catch (u) {
      if (u instanceof DOMException && u.name === "AbortError") {
        S.info("[GenerationPreview] Generation aborted");
        return;
      }
      sessionStorage.removeItem("generationSession"), oe(u instanceof Error ? u.message : String(u));
    }
  }, Re = (d) => {
    const n = d.trim();
    return n.length <= 500 ? n : n.substring(0, 500).trim() + "...";
  }, me = () => {
    var d;
    (d = K.current) == null || d.abort(), sessionStorage.removeItem("generationSession"), X.push("/");
  };
  if (!Ce)
    return /* @__PURE__ */ t("div", { className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ t("div", { className: "size-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" }) }) });
  if (!z)
    return /* @__PURE__ */ t("div", { className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4", children: /* @__PURE__ */ t(Te, { className: "p-8 max-w-md w-full", children: /* @__PURE__ */ h("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ t(Pe, { className: "size-12 text-muted-foreground mx-auto" }),
      /* @__PURE__ */ t("h2", { className: "text-xl font-semibold", children: s("generation.sessionNotFound") }),
      /* @__PURE__ */ t("p", { className: "text-sm text-muted-foreground", children: s("generation.sessionNotFoundDesc") }),
      /* @__PURE__ */ h(ae, { onClick: () => X.push("/"), className: "w-full", children: [
        /* @__PURE__ */ t(Oe, { className: "size-4 mr-2" }),
        s("generation.backToHome")
      ] })
    ] }) }) });
  const D = L.length > 0 ? L[Math.min(U, L.length - 1)] : ct[0];
  return /* @__PURE__ */ h("div", { className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden text-center", children: [
    /* @__PURE__ */ h("div", { className: "fixed inset-0 overflow-hidden pointer-events-none z-0", children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDuration: "4s" }
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDuration: "6s" }
        }
      )
    ] }),
    /* @__PURE__ */ t(
      I.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        className: "absolute top-4 left-4 z-20",
        children: /* @__PURE__ */ h(ae, { variant: "ghost", size: "sm", onClick: me, children: [
          /* @__PURE__ */ t(Oe, { className: "size-4 mr-2" }),
          s("generation.backToHome")
        ] })
      }
    ),
    /* @__PURE__ */ h("div", { className: "z-10 w-full max-w-lg space-y-8 flex flex-col items-center", children: [
      /* @__PURE__ */ t(
        I.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "w-full",
          children: /* @__PURE__ */ h(Te, { className: "relative overflow-hidden border-muted/40 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl min-h-[400px] flex flex-col items-center justify-center p-8 md:p-12", children: [
            /* @__PURE__ */ t("div", { className: "absolute top-6 left-0 right-0 flex justify-center gap-2", children: L.map((d, n) => /* @__PURE__ */ t(
              "div",
              {
                className: Ye(
                  "h-1.5 rounded-full transition-all duration-500",
                  n < U ? "w-1.5 bg-blue-500/30" : n === U ? "w-8 bg-blue-500" : "w-1.5 bg-muted/50"
                )
              },
              d.id
            )) }),
            /* @__PURE__ */ h("div", { className: "flex-1 flex flex-col items-center justify-center w-full space-y-8 mt-4", children: [
              /* @__PURE__ */ t("div", { className: "relative size-48 flex items-center justify-center", children: /* @__PURE__ */ t($, { mode: "popLayout", children: P ? /* @__PURE__ */ t(
                I.div,
                {
                  initial: { scale: 0.5, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  className: "size-32 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500/20",
                  children: /* @__PURE__ */ t(Pe, { className: "size-16 text-red-500" })
                },
                "error"
              ) : G ? /* @__PURE__ */ t(
                I.div,
                {
                  initial: { scale: 0.5, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  className: "size-32 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20",
                  children: /* @__PURE__ */ t(Le, { className: "size-16 text-green-500" })
                },
                "complete"
              ) : /* @__PURE__ */ t(
                I.div,
                {
                  initial: { scale: 0.8, opacity: 0, filter: "blur(10px)" },
                  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
                  exit: { scale: 1.2, opacity: 0, filter: "blur(10px)" },
                  transition: { duration: 0.4 },
                  className: "absolute inset-0 flex items-center justify-center",
                  children: /* @__PURE__ */ t(
                    pt,
                    {
                      stepId: D.id,
                      outlines: ze,
                      webSearchSources: qe
                    }
                  )
                },
                D.id
              ) }) }),
              /* @__PURE__ */ h("div", { className: "space-y-3 max-w-sm mx-auto", children: [
                /* @__PURE__ */ t($, { mode: "wait", children: /* @__PURE__ */ h(
                  I.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 },
                    className: "space-y-2",
                    children: [
                      /* @__PURE__ */ t("h2", { className: "text-2xl font-bold tracking-tight", children: s(P ? "generation.generationFailed" : G ? "generation.generationComplete" : D.title) }),
                      /* @__PURE__ */ t("p", { className: "text-muted-foreground text-base", children: P || (G ? s("generation.classroomReady") : je || s(D.description)) })
                    ]
                  },
                  P ? "error" : G ? "done" : D.id
                ) }),
                /* @__PURE__ */ t($, { children: de.length > 0 && !P && !G && /* @__PURE__ */ t(
                  I.div,
                  {
                    initial: { opacity: 0, scale: 0 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0 },
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    },
                    className: "flex justify-center",
                    children: /* @__PURE__ */ h(Ve, { children: [
                      /* @__PURE__ */ t(He, { asChild: !0, children: /* @__PURE__ */ t(
                        I.button,
                        {
                          type: "button",
                          animate: {
                            boxShadow: [
                              "0 0 0 0 rgba(251, 191, 36, 0), 0 0 0 0 rgba(251, 191, 36, 0)",
                              "0 0 16px 4px rgba(251, 191, 36, 0.12), 0 0 4px 1px rgba(251, 191, 36, 0.08)",
                              "0 0 0 0 rgba(251, 191, 36, 0), 0 0 0 0 rgba(251, 191, 36, 0)"
                            ]
                          },
                          transition: {
                            duration: 3,
                            repeat: 1 / 0,
                            ease: "easeInOut"
                          },
                          className: `relative size-7 rounded-full flex items-center justify-center cursor-default\r
                                       bg-gradient-to-br from-amber-400/15 to-orange-400/10\r
                                       border border-amber-400/25 hover:border-amber-400/40\r
                                       hover:from-amber-400/20 hover:to-orange-400/15\r
                                       transition-colors duration-300\r
                                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30`,
                          children: /* @__PURE__ */ t(
                            We,
                            {
                              className: "size-3.5 text-amber-500 dark:text-amber-400",
                              strokeWidth: 2.5
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ t(Xe, { side: "bottom", sideOffset: 6, children: /* @__PURE__ */ t("div", { className: "space-y-1 py-0.5", children: de.map((d, n) => /* @__PURE__ */ t("p", { className: "text-xs leading-relaxed", children: d }, n)) }) })
                    ] })
                  }
                ) })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ t("div", { className: "h-16 flex items-center justify-center w-full", children: /* @__PURE__ */ t($, { children: P ? /* @__PURE__ */ t(
        I.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "w-full max-w-xs",
          children: /* @__PURE__ */ t(ae, { size: "lg", variant: "outline", className: "w-full h-12", onClick: me, children: s("generation.goBackAndRetry") })
        }
      ) : G ? null : /* @__PURE__ */ h(
        I.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex items-center gap-3 text-sm text-muted-foreground/50 font-medium uppercase tracking-widest",
          children: [
            /* @__PURE__ */ t(_e, { className: "size-3 animate-pulse" }),
            s("generation.aiWorking"),
            ge.length > 0 && !pe && /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Q(!0),
                className: "ml-2 flex items-center gap-1.5 rounded-full border border-purple-300/30 bg-purple-500/10 px-3 py-1 text-xs font-medium normal-case tracking-normal text-purple-400 transition-colors hover:bg-purple-500/20 hover:text-purple-300",
                children: [
                  /* @__PURE__ */ t($e, { className: "size-3" }),
                  s("generation.viewAgents")
                ]
              }
            )
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ t(
      lt,
      {
        agents: ge,
        open: pe,
        onClose: () => Q(!1),
        onAllRevealed: () => {
          var d;
          (d = q.current) == null || d.call(q), q.current = null;
        }
      }
    )
  ] });
}
function Dt() {
  return /* @__PURE__ */ t(
    Je,
    {
      fallback: /* @__PURE__ */ t("div", { className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ h("div", { className: "animate-pulse space-y-4 text-center", children: [
        /* @__PURE__ */ t("div", { className: "h-8 w-48 bg-muted rounded mx-auto" }),
        /* @__PURE__ */ t("div", { className: "h-4 w-64 bg-muted rounded mx-auto" })
      ] }) }),
      children: /* @__PURE__ */ t(gt, {})
    }
  );
}
export {
  Dt as default
};
//# sourceMappingURL=page.js.map
