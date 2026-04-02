import { jsxs as o, jsx as r, Fragment as p } from "react/jsx-runtime";
import { useState as v, useEffect as ge, useRef as or, useCallback as nr } from "react";
import { Dialog as dr, DialogContent as lr, DialogTitle as ar, DialogDescription as cr } from "../ui/dialog.js";
import { AlertDialog as mr, AlertDialogContent as gr, AlertDialogHeader as ur, AlertDialogTitle as pr, AlertDialogDescription as vr, AlertDialogFooter as fr, AlertDialogCancel as hr, AlertDialogAction as xr } from "../ui/alert-dialog.js";
import { Button as q } from "../ui/button.js";
import { Box as C, Image as br, Film as wr, Volume2 as ue, Mic as pe, FileText as yr, Search as Sr, Settings as Nr, Trash2 as Ir, X as Pr, CheckCircle2 as Cr, XCircle as Mr } from "lucide-react";
import { useI18n as Dr } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as m } from "../../lib/store/settings.js";
import { toast as K } from "sonner";
import { PROVIDERS as kr } from "../../lib/ai/providers.js";
import { cn as S } from "../../lib/utils/cn.js";
import { getProviderTypeLabel as Ar } from "./utils.js";
import { ProviderList as Rr } from "./provider-list.js";
import { ProviderConfigPanel as Er } from "./provider-config-panel.js";
import { PDFSettings as Tr } from "./pdf-settings.js";
import { PDF_PROVIDERS as ve } from "../../lib/pdf/constants.js";
import { ImageSettings as Or } from "./image-settings.js";
import { IMAGE_PROVIDERS as fe } from "../../lib/media/image-providers.js";
import { VideoSettings as jr } from "./video-settings.js";
import { VIDEO_PROVIDERS as he } from "../../lib/media/video-providers.js";
import { TTSSettings as Vr } from "./tts-settings.js";
import { TTS_PROVIDERS as xe, ASR_PROVIDERS as be } from "../../lib/audio/constants.js";
import { ASRSettings as zr } from "./asr-settings.js";
import { WebSearchSettings as Br } from "./web-search-settings.js";
import { WEB_SEARCH_PROVIDERS as we } from "../../lib/web-search/constants.js";
import { GeneralSettings as Lr } from "./general-settings.js";
import { ModelEditDialog as qr } from "./model-edit-dialog.js";
import { AddProviderDialog as Kr } from "./add-provider-dialog.js";
function k({
  providers: x,
  configs: g,
  selectedId: P,
  onSelect: i,
  width: T,
  t: d
}) {
  return /* @__PURE__ */ r("div", { className: "flex-shrink-0 bg-background flex flex-col", style: { width: T }, children: /* @__PURE__ */ r("div", { className: "flex-1 overflow-y-auto p-3 space-y-1.5", children: x.map((h) => {
    var O;
    return /* @__PURE__ */ o(
      "button",
      {
        onClick: () => i(h.id),
        className: S(
          "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all border text-left",
          P === h.id ? "bg-primary/5 border-primary/50 shadow-sm" : "border-transparent hover:bg-muted/50"
        ),
        children: [
          h.icon ? /* @__PURE__ */ r(
            "img",
            {
              src: h.icon,
              alt: h.name,
              className: "w-5 h-5 rounded",
              onError: (_) => {
                _.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ r("span", { className: "font-medium text-sm flex-1 truncate", children: h.name }),
          ((O = g[h.id]) == null ? void 0 : O.isServerConfigured) && /* @__PURE__ */ r("span", { className: "text-[10px] px-1 py-0 h-4 leading-4 rounded shrink-0 bg-muted text-muted-foreground", children: d("settings.serverConfigured") })
        ]
      },
      h.id
    );
  }) }) });
}
function ye(x, g) {
  return {
    "openai-tts": g("settings.providerOpenAITTS"),
    "azure-tts": g("settings.providerAzureTTS"),
    "glm-tts": g("settings.providerGLMTTS"),
    "qwen-tts": g("settings.providerQwenTTS"),
    "doubao-tts": g("settings.providerDoubaoTTS"),
    "elevenlabs-tts": g("settings.providerElevenLabsTTS"),
    "minimax-tts": g("settings.providerMiniMaxTTS"),
    "browser-native-tts": g("settings.providerBrowserNativeTTS")
  }[x];
}
function Se(x, g) {
  return {
    "openai-whisper": g("settings.providerOpenAIWhisper"),
    "browser-native": g("settings.providerBrowserNative"),
    "qwen-asr": g("settings.providerQwenASR")
  }[x];
}
const Ne = {
  seedream: "providerSeedream",
  "qwen-image": "providerQwenImage",
  "nano-banana": "providerNanoBanana",
  "minimax-image": "providerMiniMaxImage",
  "grok-image": "providerGrokImage"
}, Ie = {
  seedream: "/logos/doubao.svg",
  "qwen-image": "/logos/bailian.svg",
  "nano-banana": "/logos/gemini.svg",
  "minimax-image": "/logos/minimax.svg",
  "grok-image": "/logos/grok.svg"
}, Pe = {
  seedance: "providerSeedance",
  kling: "providerKling",
  veo: "providerVeo",
  sora: "providerSora",
  "minimax-video": "providerMiniMaxVideo",
  "grok-video": "providerGrokVideo"
}, Ce = {
  seedance: "/logos/doubao.svg",
  kling: "/logos/kling.svg",
  veo: "/logos/gemini.svg",
  sora: "/logos/openai.svg",
  "minimax-video": "/logos/minimax.svg",
  "grok-video": "/logos/grok.svg"
};
function fs({ open: x, onOpenChange: g, initialSection: P }) {
  var se, te, ie, oe, ne, de, le, ae, ce, me;
  const { t: i } = Dr(), T = m((e) => e.providerId);
  m((e) => e.modelId);
  const d = m((e) => e.providersConfig), h = m((e) => e.pdfProviderId), O = m((e) => e.pdfProvidersConfig), _ = m((e) => e.webSearchProviderId), Me = m((e) => e.webSearchProvidersConfig), De = m((e) => e.imageProviderId), ke = m((e) => e.imageProvidersConfig), Ae = m((e) => e.videoProviderId), Re = m((e) => e.videoProvidersConfig), j = m((e) => e.ttsProviderId), Ee = m((e) => e.ttsProvidersConfig), V = m((e) => e.asrProviderId), Te = m((e) => e.asrProvidersConfig), Q = m((e) => e.setModel), M = m((e) => e.setProviderConfig), J = m((e) => e.setProvidersConfig), Oe = m((e) => e.setTTSProvider), je = m((e) => e.setASRProvider), [a, b] = v("providers"), [l, U] = v(T), [W, Ve] = v(h), [F, ze] = v(_), [A, Be] = v(De), [R, Le] = v(Ae);
  ge(() => {
    x && P && b(P);
  }, [x, P]);
  const [D, E] = v(null), [qe, z] = v(!1), [G, X] = v(null), [Ke, $] = v(!1), [Y, Z] = v("idle"), [H, _e] = v(192), [w, Ue] = v(192), [ee, re] = v(!1), B = or(null), N = nr(
    (e, t) => {
      e.preventDefault();
      const s = t === "sidebar" ? H : w;
      B.current = { target: t, startX: e.clientX, startWidth: s }, re(!0);
    },
    [H, w]
  );
  ge(() => {
    if (!ee) return;
    const e = (s) => {
      if (!B.current) return;
      const { target: n, startX: c, startWidth: f } = B.current, y = s.clientX - c, u = Math.max(120, Math.min(360, f + y));
      n === "sidebar" ? _e(u) : Ue(u);
    }, t = () => {
      B.current = null, re(!1);
    };
    return document.addEventListener("mousemove", e), document.addEventListener("mouseup", t), document.body.style.userSelect = "none", document.body.style.cursor = "col-resize", () => {
      document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", t), document.body.style.userSelect = "", document.body.style.cursor = "";
    };
  }, [ee]);
  const We = () => {
    g(!1);
  }, Fe = (e) => {
    U(e);
  }, Ge = (e, t, s, n) => {
    M(e, {
      apiKey: t,
      baseUrl: s,
      requiresApiKey: n
    });
  }, Xe = () => {
    Z("saved"), setTimeout(() => Z("idle"), 2e3);
  }, I = d[l] ? {
    id: l,
    name: d[l].name,
    type: d[l].type,
    defaultBaseUrl: d[l].defaultBaseUrl,
    icon: d[l].icon,
    requiresApiKey: d[l].requiresApiKey,
    models: d[l].models
  } : void 0, $e = (e, t) => {
    var n;
    const s = ((n = d[e]) == null ? void 0 : n.models) || [];
    E({
      providerId: e,
      modelIndex: t,
      model: { ...s[t] }
    }), z(!0);
  }, He = () => {
    E({
      providerId: l,
      modelIndex: null,
      model: {
        id: "",
        name: "",
        capabilities: {
          streaming: !0,
          tools: !0,
          vision: !1
        }
      }
    }), z(!0);
  }, Qe = (e, t) => {
    var c;
    const n = (((c = d[e]) == null ? void 0 : c.models) || []).filter((f, y) => y !== t);
    M(e, { models: n });
  }, Je = () => {
    var y;
    if (!D) return;
    const { providerId: e, modelIndex: t, model: s } = D;
    if (!s.id.trim()) return;
    const n = ((y = d[e]) == null ? void 0 : y.models) || [];
    let c, f = t;
    if (t === null) {
      const u = n.findIndex((L) => L.id === s.id);
      u >= 0 ? (c = [...n], c[u] = s, f = u) : (c = [...n, s], f = c.length - 1), M(e, { models: c }), E({ ...D, modelIndex: f });
    } else
      c = [...n], c[t] = s, M(e, { models: c });
  }, Ye = () => {
    var f;
    if (!D) return;
    const { providerId: e, modelIndex: t, model: s } = D;
    if (!s.id.trim()) {
      K.error(i("settings.modelIdRequired"));
      return;
    }
    const n = ((f = d[e]) == null ? void 0 : f.models) || [];
    let c;
    t === null ? c = [...n, s] : (c = [...n], c[t] = s), M(e, { models: c }), z(!1), E(null);
  }, Ze = (e) => {
    if (!e.name.trim()) {
      K.error(i("settings.providerNameRequired"));
      return;
    }
    const t = `custom-${Date.now()}`, s = {
      ...d,
      [t]: {
        apiKey: "",
        baseUrl: "",
        models: [],
        name: e.name,
        type: e.type,
        defaultBaseUrl: e.baseUrl || void 0,
        icon: e.icon || void 0,
        requiresApiKey: e.requiresApiKey,
        isBuiltIn: !1
      }
    };
    J(s), $(!1), U(t);
  }, er = (e) => {
    var t;
    if ((t = d[e]) != null && t.isBuiltIn) {
      K.error(i("settings.cannotDeleteBuiltIn"));
      return;
    }
    X(e);
  }, rr = () => {
    var s, n, c, f, y;
    if (!G) return;
    const e = G, t = { ...d };
    if (delete t[e], J(t), l === e) {
      const u = Object.keys(t)[0];
      U(u || "openai");
    }
    if (T === e) {
      const u = Object.keys(t)[0], L = u ? ((n = (s = t[u]) == null ? void 0 : s.serverModels) == null ? void 0 : n[0]) || ((y = (f = (c = t[u]) == null ? void 0 : c.models) == null ? void 0 : f[0]) == null ? void 0 : y.id) : void 0;
      u && L ? Q(u, L) : Q("openai", "gpt-4o-mini");
    }
    X(null);
  }, sr = (e) => {
    const t = kr[e];
    t && (M(e, { models: [...t.models] }), K.success(i("settings.resetSuccess")));
  }, tr = Object.entries(d).map(([e, t]) => ({
    id: e,
    name: t.name,
    type: t.type,
    defaultBaseUrl: t.defaultBaseUrl,
    icon: t.icon,
    requiresApiKey: t.requiresApiKey,
    models: t.models,
    isServerConfigured: t.isServerConfigured
  })), ir = () => {
    var e, t;
    switch (a) {
      case "general":
        return /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: i("settings.systemSettings") });
      case "providers":
        return I ? /* @__PURE__ */ o(p, { children: [
          I.icon ? /* @__PURE__ */ r(
            "img",
            {
              src: I.icon,
              alt: I.name,
              className: "w-8 h-8 rounded",
              onError: (s) => {
                s.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: I.name }),
            /* @__PURE__ */ r("p", { className: "text-xs text-muted-foreground", children: Ar(I.type, i) })
          ] })
        ] }) : null;
      case "pdf": {
        const s = ve[W];
        return s ? /* @__PURE__ */ o(p, { children: [
          s.icon ? /* @__PURE__ */ r(
            "img",
            {
              src: s.icon,
              alt: s.name,
              className: "w-8 h-8 rounded",
              onError: (n) => {
                n.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: s.name })
        ] }) : null;
      }
      case "web-search": {
        const s = we[F];
        return s ? /* @__PURE__ */ o(p, { children: [
          s.icon ? /* @__PURE__ */ r(
            "img",
            {
              src: s.icon,
              alt: s.name,
              className: "w-8 h-8 rounded",
              onError: (n) => {
                n.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: s.name })
        ] }) : null;
      }
      case "image": {
        const s = fe[A], n = Ie[A];
        return /* @__PURE__ */ o(p, { children: [
          n ? /* @__PURE__ */ r(
            "img",
            {
              src: n,
              alt: s == null ? void 0 : s.name,
              className: "w-8 h-8 rounded",
              onError: (c) => {
                c.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: i(`settings.${Ne[A]}`) || (s == null ? void 0 : s.name) })
        ] });
      }
      case "video": {
        const s = he[R], n = Ce[R];
        return /* @__PURE__ */ o(p, { children: [
          n ? /* @__PURE__ */ r(
            "img",
            {
              src: n,
              alt: s == null ? void 0 : s.name,
              className: "w-8 h-8 rounded",
              onError: (c) => {
                c.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(C, { className: "h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: i(`settings.${Pe[R]}`) || (s == null ? void 0 : s.name) })
        ] });
      }
      case "tts": {
        const s = (e = xe[j]) == null ? void 0 : e.icon;
        return /* @__PURE__ */ o(p, { children: [
          s ? /* @__PURE__ */ r(
            "img",
            {
              src: s,
              alt: "",
              className: "w-8 h-8 rounded",
              onError: (n) => {
                n.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(ue, { className: "h-6 w-6 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: ye(j, i) })
        ] });
      }
      case "asr": {
        const s = (t = be[V]) == null ? void 0 : t.icon;
        return /* @__PURE__ */ o(p, { children: [
          s ? /* @__PURE__ */ r(
            "img",
            {
              src: s,
              alt: "",
              className: "w-8 h-8 rounded",
              onError: (n) => {
                n.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ r(pe, { className: "h-6 w-6 text-muted-foreground" }),
          /* @__PURE__ */ r("h2", { className: "text-lg font-semibold", children: Se(V, i) })
        ] });
      }
      default:
        return null;
    }
  };
  return /* @__PURE__ */ o(dr, { open: x, onOpenChange: g, children: [
    /* @__PURE__ */ o(lr, { className: "h-[85vh] p-0 gap-0 block", showCloseButton: !1, children: [
      /* @__PURE__ */ r(ar, { className: "sr-only", children: i("settings.title") }),
      /* @__PURE__ */ r(cr, { className: "sr-only", children: i("settings.description") }),
      /* @__PURE__ */ o("div", { className: "flex h-full overflow-hidden", children: [
        /* @__PURE__ */ o("div", { className: "flex-shrink-0 bg-muted/30 p-3 space-y-1", style: { width: H }, children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("providers"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "providers" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(C, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.providers") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("image"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "image" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(br, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.imageSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("video"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "video" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(wr, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.videoSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("tts"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "tts" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(ue, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.ttsSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("asr"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "asr" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(pe, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.asrSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("pdf"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "pdf" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(yr, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.pdfSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("web-search"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "web-search" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(Sr, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.webSearchSettings") })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => b("general"),
              className: S(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left min-w-0",
                a === "general" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              ),
              children: [
                /* @__PURE__ */ r(Nr, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ r("span", { className: "truncate", children: i("settings.systemSettings") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r(
          "div",
          {
            onMouseDown: (e) => N(e, "sidebar"),
            className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
            children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
          }
        ),
        a === "providers" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            Rr,
            {
              providers: tr,
              selectedProviderId: l,
              onSelect: Fe,
              onAddProvider: () => $(!0),
              width: w
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "pdf" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(ve),
              configs: O,
              selectedId: W,
              onSelect: Ve,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "web-search" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(we),
              configs: Me,
              selectedId: F,
              onSelect: ze,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "image" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(fe).map((e) => ({
                id: e.id,
                name: i(`settings.${Ne[e.id]}`) || e.name,
                icon: Ie[e.id]
              })),
              configs: ke,
              selectedId: A,
              onSelect: Be,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "video" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(he).map((e) => ({
                id: e.id,
                name: i(`settings.${Pe[e.id]}`) || e.name,
                icon: Ce[e.id]
              })),
              configs: Re,
              selectedId: R,
              onSelect: Le,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "tts" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(xe).map((e) => ({
                id: e.id,
                name: ye(e.id, i),
                icon: e.icon
              })),
              configs: Ee,
              selectedId: j,
              onSelect: Oe,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        a === "asr" && /* @__PURE__ */ o(p, { children: [
          /* @__PURE__ */ r(
            k,
            {
              providers: Object.values(be).map((e) => ({
                id: e.id,
                name: Se(e.id, i),
                icon: e.icon
              })),
              configs: Te,
              selectedId: V,
              onSelect: je,
              width: w,
              t: i
            }
          ),
          /* @__PURE__ */ r(
            "div",
            {
              onMouseDown: (e) => N(e, "providerList"),
              className: "flex-shrink-0 w-[5px] cursor-col-resize group flex justify-center",
              children: /* @__PURE__ */ r("div", { className: "w-px h-full bg-border group-hover:bg-primary/50 transition-colors" })
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col overflow-hidden min-w-0", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center justify-between p-5 border-b", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: ir() }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              a === "providers" && !((se = d[l]) != null && se.isBuiltIn) && /* @__PURE__ */ r(
                q,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 px-2 text-destructive hover:text-destructive",
                  onClick: () => er(l),
                  children: /* @__PURE__ */ r(Ir, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ r(q, { variant: "ghost", size: "icon", onClick: () => g(!1), children: /* @__PURE__ */ r(Pr, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
            a === "general" && /* @__PURE__ */ r(Lr, {}),
            a === "providers" && I && /* @__PURE__ */ r(
              Er,
              {
                provider: I,
                initialApiKey: ((te = d[l]) == null ? void 0 : te.apiKey) || "",
                initialBaseUrl: ((ie = d[l]) == null ? void 0 : ie.baseUrl) || "",
                initialRequiresApiKey: ((oe = d[l]) == null ? void 0 : oe.requiresApiKey) ?? !0,
                providersConfig: d,
                onConfigChange: (e, t, s) => Ge(l, e, t, s),
                onSave: Xe,
                onEditModel: (e) => $e(l, e),
                onDeleteModel: (e) => Qe(l, e),
                onAddModel: He,
                onResetToDefault: () => sr(l),
                isBuiltIn: ((ne = d[l]) == null ? void 0 : ne.isBuiltIn) ?? !0
              }
            ),
            a === "pdf" && /* @__PURE__ */ r(Tr, { selectedProviderId: W }),
            a === "web-search" && /* @__PURE__ */ r(Br, { selectedProviderId: F }),
            a === "image" && /* @__PURE__ */ r(Or, { selectedProviderId: A }),
            a === "video" && /* @__PURE__ */ r(jr, { selectedProviderId: R }),
            a === "tts" && /* @__PURE__ */ r(Vr, { selectedProviderId: j }),
            a === "asr" && /* @__PURE__ */ r(zr, { selectedProviderId: V })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-3 px-5 py-3 border-t bg-muted/30", children: [
            Y === "saved" && /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ r(Cr, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { children: i("settings.saveSuccess") })
            ] }),
            Y === "error" && /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ r(Mr, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { children: i("settings.saveFailed") })
            ] }),
            /* @__PURE__ */ r(q, { variant: "outline", size: "sm", onClick: () => g(!1), children: i("settings.close") }),
            /* @__PURE__ */ r(q, { size: "sm", onClick: We, children: i("settings.save") })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r(
      qr,
      {
        open: qe,
        onOpenChange: z,
        editingModel: D,
        setEditingModel: E,
        onSave: Ye,
        onAutoSave: Je,
        providerId: l,
        apiKey: ((de = d[l]) == null ? void 0 : de.apiKey) || "",
        baseUrl: (le = d[l]) == null ? void 0 : le.baseUrl,
        providerType: (ae = d[l]) == null ? void 0 : ae.type,
        requiresApiKey: (ce = d[l]) == null ? void 0 : ce.requiresApiKey,
        isServerConfigured: (me = d[l]) == null ? void 0 : me.isServerConfigured
      }
    ),
    /* @__PURE__ */ r(
      Kr,
      {
        open: Ke,
        onOpenChange: $,
        onAdd: Ze
      }
    ),
    /* @__PURE__ */ r(
      mr,
      {
        open: G !== null,
        onOpenChange: (e) => !e && X(null),
        children: /* @__PURE__ */ o(gr, { children: [
          /* @__PURE__ */ o(ur, { children: [
            /* @__PURE__ */ r(pr, { children: i("settings.deleteProvider") }),
            /* @__PURE__ */ r(vr, { children: i("settings.deleteProviderConfirm") })
          ] }),
          /* @__PURE__ */ o(fr, { children: [
            /* @__PURE__ */ r(hr, { children: i("settings.cancelEdit") }),
            /* @__PURE__ */ r(xr, { onClick: rr, children: i("settings.deleteProvider") })
          ] })
        ] })
      }
    )
  ] });
}
export {
  fs as SettingsDialog
};
//# sourceMappingURL=index.js.map
