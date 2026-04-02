import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { useState as k, useEffect as ue, useMemo as E, useCallback as pe, Fragment as ve } from "react";
import { SlidersHorizontal as fe, Image as O, Video as z, Volume2 as G, Mic as L, ChevronRight as be } from "lucide-react";
import { toast as he } from "sonner";
import { Popover as Ie, PopoverTrigger as Se, PopoverContent as xe } from "../ui/popover.js";
import { Select as Te, SelectTrigger as Ne, SelectValue as Pe, SelectContent as we, SelectSeparator as Ee, SelectGroup as ye, SelectLabel as Ve, SelectItem as Ce } from "../ui/select.js";
import { Switch as Re } from "../ui/switch.js";
import { cn as h } from "../../lib/utils/cn.js";
import { useI18n as Ae } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as s } from "../../lib/store/settings.js";
import { useTTSPreview as ke } from "../../lib/audio/use-tts-preview.js";
import { IMAGE_PROVIDERS as Me } from "../../lib/media/image-providers.js";
import { VIDEO_PROVIDERS as Oe } from "../../lib/media/video-providers.js";
import { TTS_PROVIDERS as B, getTTSVoices as ze, ASR_PROVIDERS as Ge, getASRSupportedLanguages as Le } from "../../lib/audio/constants.js";
const De = {
  seedream: "/logos/doubao.svg",
  "qwen-image": "/logos/bailian.svg",
  "nano-banana": "/logos/gemini.svg",
  "grok-image": "/logos/grok.svg"
}, Ke = {
  seedance: "/logos/doubao.svg",
  kling: "/logos/kling.svg",
  veo: "/logos/gemini.svg",
  sora: "/logos/openai.svg",
  "grok-video": "/logos/grok.svg"
}, $e = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  it: "Italiano",
  ar: "العربية",
  hi: "हिन्दी"
}, je = [
  { id: "image", icon: O, label: "Image" },
  { id: "video", icon: z, label: "Video" },
  { id: "tts", icon: G, label: "TTS" },
  { id: "asr", icon: L, label: "ASR" }
];
function _e(r, i) {
  return {
    "openai-tts": i("settings.providerOpenAITTS"),
    "azure-tts": i("settings.providerAzureTTS"),
    "glm-tts": i("settings.providerGLMTTS"),
    "qwen-tts": i("settings.providerQwenTTS"),
    "doubao-tts": i("settings.providerDoubaoTTS"),
    "elevenlabs-tts": i("settings.providerElevenLabsTTS"),
    "minimax-tts": i("settings.providerMiniMaxTTS"),
    "browser-native-tts": i("settings.providerBrowserNativeTTS")
  }[r] || r;
}
function qe(r, i) {
  if (i === "en-US") {
    const a = r.match(/\(([^)]+)\)/);
    return a ? a[1] : r;
  }
  return r;
}
function no({ onSettingsOpen: r }) {
  var _;
  const { t: i, locale: a } = Ae(), [f, p] = k(!1), [d, n] = k("image"), { previewing: g, startPreview: v, stopPreview: V } = ke(), I = s((e) => e.imageGenerationEnabled), S = s((e) => e.videoGenerationEnabled), x = s((e) => e.ttsEnabled), T = s((e) => e.asrEnabled), U = s((e) => e.setImageGenerationEnabled), F = s((e) => e.setVideoGenerationEnabled), H = s((e) => e.setTTSEnabled), Q = s((e) => e.setASREnabled), J = s((e) => e.imageProviderId), W = s((e) => e.imageModelId), C = s((e) => e.imageProvidersConfig), X = s((e) => e.setImageProvider), Y = s((e) => e.setImageModelId), Z = s((e) => e.videoProviderId), ee = s((e) => e.videoModelId), R = s((e) => e.videoProvidersConfig), oe = s((e) => e.setVideoProvider), te = s((e) => e.setVideoModelId), N = s((e) => e.ttsProviderId), D = s((e) => e.ttsVoice), K = s((e) => e.ttsSpeed), P = s((e) => e.ttsProvidersConfig);
  s((e) => e.setTTSProvider), s((e) => e.setTTSVoice), s((e) => e.setTTSSpeed);
  const se = s((e) => e.asrProviderId), ie = s((e) => e.asrLanguage), $ = s((e) => e.asrProvidersConfig), ne = s((e) => e.setASRProvider), re = s((e) => e.setASRLanguage), j = {
    image: I,
    video: S,
    tts: x,
    asr: T
  }, ae = [
    I,
    S,
    x,
    T
  ].filter(Boolean).length, w = (e, o, l) => {
    var m, u;
    return !l || !!((m = e[o]) != null && m.apiKey) || !!((u = e[o]) != null && u.isServerConfigured);
  };
  (_ = B[N]) == null || _.speedRange;
  const [A, de] = k([]);
  ue(() => {
    if (typeof window > "u" || !window.speechSynthesis) return;
    const e = () => de(window.speechSynthesis.getVoices());
    return e(), window.speechSynthesis.addEventListener("voiceschanged", e), () => window.speechSynthesis.removeEventListener("voiceschanged", e);
  }, []);
  const le = E(
    () => Object.values(Me).filter((e) => w(C, e.id, e.requiresApiKey)).map((e) => {
      var o;
      return {
        groupId: e.id,
        groupName: e.name,
        groupIcon: De[e.id],
        available: !0,
        items: [...e.models, ...((o = C[e.id]) == null ? void 0 : o.customModels) || []].map((l) => ({
          id: l.id,
          name: l.name
        }))
      };
    }),
    [C]
  ), ce = E(
    () => Object.values(Oe).filter((e) => w(R, e.id, e.requiresApiKey)).map((e) => {
      var o;
      return {
        groupId: e.id,
        groupName: e.name,
        groupIcon: Ke[e.id],
        available: !0,
        items: [...e.models, ...((o = R[e.id]) == null ? void 0 : o.customModels) || []].map((l) => ({
          id: l.id,
          name: l.name
        }))
      };
    }),
    [R]
  );
  E(() => {
    const e = [];
    for (const o of Object.values(B)) {
      if (o.requiresApiKey && !w(P, o.id, o.requiresApiKey)) continue;
      const l = _e(o.id, i);
      if (o.id === "browser-native-tts" && A.length > 0) {
        const m = /* @__PURE__ */ new Map();
        for (const u of A) {
          const b = u.lang.split("-")[0];
          m.has(b) || m.set(b, []), m.get(b).push(u);
        }
        for (const [u, b] of m) {
          const ge = $e[u] || u;
          e.push({
            groupId: o.id,
            groupName: `${l} · ${ge}`,
            groupIcon: o.icon,
            available: !0,
            items: b.map((q) => ({ id: q.voiceURI, name: q.name }))
          });
        }
        continue;
      }
      e.push({
        groupId: o.id,
        groupName: l,
        groupIcon: o.icon,
        available: !0,
        items: ze(o.id).map((m) => ({
          id: m.id,
          name: qe(m.name, a)
        }))
      });
    }
    return e;
  }, [P, a, A, i]), pe(async () => {
    if (g) {
      V();
      return;
    }
    try {
      const e = P[N];
      await v({
        text: i("settings.ttsTestTextDefault"),
        providerId: N,
        modelId: e == null ? void 0 : e.modelId,
        voice: D,
        speed: K,
        apiKey: e == null ? void 0 : e.apiKey,
        baseUrl: e == null ? void 0 : e.baseUrl
      });
    } catch (e) {
      const o = e instanceof Error && e.message ? e.message : i("settings.ttsTestFailed");
      he.error(o);
    }
  }, [
    g,
    v,
    V,
    i,
    N,
    P,
    K,
    D
  ]);
  const me = E(
    () => Object.values(Ge).filter((e) => w($, e.id, e.requiresApiKey)).map((e) => ({
      groupId: e.id,
      groupName: e.name,
      groupIcon: e.icon,
      available: !0,
      items: Le(e.id).map((o) => ({
        id: o,
        name: o
      }))
    })),
    [$]
  );
  return /* @__PURE__ */ c(Ie, { open: f, onOpenChange: (e) => {
    if (e || V(), p(e), e) {
      const o = ["image", "video", "tts", "asr"].find((l) => j[l]);
      n(o || "image");
    }
  }, children: [
    /* @__PURE__ */ t(Se, { asChild: !0, children: /* @__PURE__ */ c(
      "button",
      {
        className: h(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap border",
          ae > 0 ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-700/50" : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 border-border/50"
        ),
        children: [
          /* @__PURE__ */ t(fe, { className: "size-3.5" }),
          I && /* @__PURE__ */ t(O, { className: "size-3.5" }),
          S && /* @__PURE__ */ t(z, { className: "size-3.5" }),
          x && /* @__PURE__ */ t(G, { className: "size-3.5" }),
          T && /* @__PURE__ */ t(L, { className: "size-3.5" })
        ]
      }
    ) }),
    /* @__PURE__ */ c(xe, { align: "start", side: "bottom", avoidCollisions: !1, className: "w-80 p-0", children: [
      /* @__PURE__ */ t("div", { className: "p-2 pb-0", children: /* @__PURE__ */ t("div", { className: "flex gap-0.5 p-0.5 bg-muted/60 rounded-lg", children: je.map((e) => {
        const o = d === e.id, l = j[e.id], m = e.icon;
        return /* @__PURE__ */ c(
          "button",
          {
            onClick: () => n(e.id),
            className: h(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] font-medium transition-all relative",
              o ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground/80"
            ),
            children: [
              /* @__PURE__ */ t(m, { className: "size-3.5" }),
              /* @__PURE__ */ t("span", { className: "hidden sm:inline", children: e.label }),
              l && !o && /* @__PURE__ */ t("span", { className: "absolute top-1 right-1 size-1.5 rounded-full bg-violet-500" })
            ]
          },
          e.id
        );
      }) }) }),
      /* @__PURE__ */ c("div", { className: "p-3 pt-2.5", children: [
        d === "image" && /* @__PURE__ */ t(
          y,
          {
            icon: O,
            label: i("media.imageCapability"),
            enabled: I,
            onToggle: U,
            children: /* @__PURE__ */ t(
              M,
              {
                groups: le,
                selectedGroupId: J,
                selectedItemId: W,
                onSelect: (e, o) => {
                  X(e), Y(o);
                }
              }
            )
          }
        ),
        d === "video" && /* @__PURE__ */ t(
          y,
          {
            icon: z,
            label: i("media.videoCapability"),
            enabled: S,
            onToggle: F,
            children: /* @__PURE__ */ t(
              M,
              {
                groups: ce,
                selectedGroupId: Z,
                selectedItemId: ee,
                onSelect: (e, o) => {
                  oe(e), te(o);
                }
              }
            )
          }
        ),
        d === "tts" && /* @__PURE__ */ t(
          y,
          {
            icon: G,
            label: i("media.ttsCapability"),
            enabled: x,
            onToggle: H,
            children: /* @__PURE__ */ t("p", { className: "text-[11px] text-muted-foreground/60", children: i("settings.ttsVoiceConfigHint") })
          }
        ),
        d === "asr" && /* @__PURE__ */ t(
          y,
          {
            icon: L,
            label: i("media.asrCapability"),
            enabled: T,
            onToggle: Q,
            children: /* @__PURE__ */ t(
              M,
              {
                groups: me,
                selectedGroupId: se,
                selectedItemId: ie,
                onSelect: (e, o) => {
                  ne(e), re(o);
                }
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "border-t border-border/40", children: /* @__PURE__ */ c(
        "button",
        {
          onClick: () => {
            p(!1), r(d);
          },
          className: "w-full flex items-center justify-between px-3.5 py-2.5 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors",
          children: [
            /* @__PURE__ */ t("span", { children: i("toolbar.advancedSettings") }),
            /* @__PURE__ */ t(be, { className: "size-3" })
          ]
        }
      ) })
    ] })
  ] });
}
function y({
  icon: r,
  label: i,
  enabled: a,
  onToggle: f,
  children: p
}) {
  return /* @__PURE__ */ c("div", { className: "space-y-2.5", children: [
    /* @__PURE__ */ c("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t(
        r,
        {
          className: h(
            "size-4 shrink-0 transition-colors",
            a ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground/50"
          )
        }
      ),
      /* @__PURE__ */ t(
        "span",
        {
          className: h(
            "flex-1 text-sm font-medium transition-colors",
            !a && "text-muted-foreground"
          ),
          children: i
        }
      ),
      /* @__PURE__ */ t(
        Re,
        {
          checked: a,
          onCheckedChange: f,
          className: "scale-[0.85] origin-right"
        }
      )
    ] }),
    a && p
  ] });
}
function M({
  groups: r,
  selectedGroupId: i,
  selectedItemId: a,
  onSelect: f
}) {
  const p = `${i}::${a}`, d = r.find(
    (n) => n.groupId === i && n.items.some((g) => g.id === a)
  ) || r.find((n) => n.groupId === i);
  return /* @__PURE__ */ c(
    Te,
    {
      value: p,
      onValueChange: (n) => {
        const g = n.indexOf("::");
        g !== -1 && f(n.slice(0, g), n.slice(g + 2));
      },
      children: [
        /* @__PURE__ */ t(Ne, { className: "h-8 w-full rounded-lg border-border/40 bg-background/80 hover:bg-muted/40 shadow-none text-xs focus:ring-1 focus:ring-ring/30 px-2.5", children: /* @__PURE__ */ c("span", { className: "flex items-center gap-2 min-w-0 flex-1 overflow-hidden", children: [
          (d == null ? void 0 : d.groupIcon) && /* @__PURE__ */ t("img", { src: d.groupIcon, alt: "", className: "size-4 rounded-sm shrink-0" }),
          /* @__PURE__ */ t("span", { className: "font-medium truncate", children: d == null ? void 0 : d.groupName }),
          /* @__PURE__ */ t("span", { className: "text-muted-foreground/40", children: "/" }),
          /* @__PURE__ */ t("span", { className: "text-muted-foreground truncate", children: /* @__PURE__ */ t(Pe, {}) })
        ] }) }),
        /* @__PURE__ */ t(we, { children: r.map((n, g) => /* @__PURE__ */ c(ve, { children: [
          g > 0 && /* @__PURE__ */ t(Ee, {}),
          /* @__PURE__ */ c(ye, { children: [
            /* @__PURE__ */ c(Ve, { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider", children: [
              n.groupIcon && /* @__PURE__ */ t(
                "img",
                {
                  src: n.groupIcon,
                  alt: "",
                  className: h("size-3.5 rounded-sm", !n.available && "opacity-40")
                }
              ),
              n.groupName
            ] }),
            n.items.map((v) => /* @__PURE__ */ t(
              Ce,
              {
                value: `${n.groupId}::${v.id}`,
                disabled: !n.available,
                className: "text-xs",
                children: v.name
              },
              `${n.groupId}::${v.id}`
            ))
          ] })
        ] }, `${n.groupId}-${g}`)) })
      ]
    }
  );
}
export {
  no as MediaPopover
};
//# sourceMappingURL=media-popover.js.map
