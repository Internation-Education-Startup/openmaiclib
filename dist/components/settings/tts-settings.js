import { jsxs as r, jsx as t, Fragment as M } from "react/jsx-runtime";
import { useState as C, useEffect as _ } from "react";
import { Label as d } from "../ui/label.js";
import { Input as p } from "../ui/input.js";
import { Button as Y } from "../ui/button.js";
import { useI18n as Z } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as g } from "../../lib/store/settings.js";
import { TTS_PROVIDERS as j, DEFAULT_TTS_VOICES as P } from "../../lib/audio/constants.js";
import { EyeOff as k, Eye as S, Loader2 as I, Volume2 as ee, CheckCircle2 as te, XCircle as se } from "lucide-react";
import { cn as R } from "../../lib/utils/cn.js";
import { createLogger as ae } from "../../lib/logger.js";
import { useTTSPreview as re } from "../../lib/audio/use-tts-preview.js";
const oe = ae("TTSSettings");
function xe({ selectedProviderId: a }) {
  var O, B, D, q, F, L;
  const { t: s } = Z(), X = g((e) => e.ttsVoice), G = g((e) => e.ttsSpeed), n = g((e) => e.ttsProvidersConfig), w = g((e) => e.setTTSProviderConfig), H = g((e) => e.ttsProviderId), J = a === H ? X : P[a] || "default", l = j[a] ?? j["openai-tts"], m = !!((O = n[a]) != null && O.isServerConfigured), [i, f] = C(!1), [h, K] = C(s("settings.ttsTestTextDefault")), [b, x] = C("idle"), [A, N] = C(""), { previewing: U, startPreview: Q, stopPreview: V } = re(), u = a === "doubao-tts", v = ((B = n[a]) == null ? void 0 : B.apiKey) || "", y = v.indexOf(":"), $ = u && y > 0 ? v.slice(0, y) : "", z = u && y > 0 ? v.slice(y + 1) : u ? v : "", E = (e, o) => {
    const c = e && o ? `${e}:${o}` : e || o;
    w(a, { apiKey: c });
  };
  _(() => {
    K(s("settings.ttsTestTextDefault"));
  }, [s]), _(() => {
    V(), f(!1), x("idle"), N("");
  }, [a, V]);
  const W = async () => {
    var e, o, c;
    if (h.trim()) {
      x("testing"), N("");
      try {
        await Q({
          text: h,
          providerId: a,
          modelId: ((e = n[a]) == null ? void 0 : e.modelId) || l.defaultModelId,
          voice: J,
          speed: G,
          apiKey: (o = n[a]) == null ? void 0 : o.apiKey,
          baseUrl: (c = n[a]) == null ? void 0 : c.baseUrl
        }), x("success"), N(s("settings.ttsTestSuccess"));
      } catch (T) {
        oe.error("TTS test failed:", T), x("error"), N(
          T instanceof Error && T.message ? `${s("settings.ttsTestFailed")}: ${T.message}` : s("settings.ttsTestFailed")
        );
      }
    }
  };
  return /* @__PURE__ */ r("div", { className: "space-y-6 max-w-3xl", children: [
    m && /* @__PURE__ */ t("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: s("settings.serverConfiguredNotice") }),
    (l.requiresApiKey || m) && /* @__PURE__ */ r(M, { children: [
      /* @__PURE__ */ r("div", { className: R("grid gap-4", u ? "grid-cols-3" : "grid-cols-2"), children: [
        u ? /* @__PURE__ */ r(M, { children: [
          /* @__PURE__ */ r("div", { className: "space-y-2", children: [
            /* @__PURE__ */ t(d, { className: "text-sm", children: s("settings.doubaoAppId") }),
            /* @__PURE__ */ r("div", { className: "relative", children: [
              /* @__PURE__ */ t(
                p,
                {
                  name: `tts-app-id-${a}`,
                  type: i ? "text" : "password",
                  autoComplete: "new-password",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  spellCheck: !1,
                  placeholder: s(m ? "settings.optionalOverride" : "settings.enterApiKey"),
                  value: $,
                  onChange: (e) => E(e.target.value, z),
                  className: "font-mono text-sm pr-10"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => f(!i),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                  children: i ? /* @__PURE__ */ t(k, { className: "h-4 w-4" }) : /* @__PURE__ */ t(S, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "space-y-2", children: [
            /* @__PURE__ */ t(d, { className: "text-sm", children: s("settings.doubaoAccessKey") }),
            /* @__PURE__ */ r("div", { className: "relative", children: [
              /* @__PURE__ */ t(
                p,
                {
                  name: `tts-access-key-${a}`,
                  type: i ? "text" : "password",
                  autoComplete: "new-password",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  spellCheck: !1,
                  placeholder: s(m ? "settings.optionalOverride" : "settings.enterApiKey"),
                  value: z,
                  onChange: (e) => E($, e.target.value),
                  className: "font-mono text-sm pr-10"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => f(!i),
                  className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                  children: i ? /* @__PURE__ */ t(k, { className: "h-4 w-4" }) : /* @__PURE__ */ t(S, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ r("div", { className: "space-y-2", children: [
          /* @__PURE__ */ t(d, { className: "text-sm", children: s("settings.ttsApiKey") }),
          /* @__PURE__ */ r("div", { className: "relative", children: [
            /* @__PURE__ */ t(
              p,
              {
                name: `tts-api-key-${a}`,
                type: i ? "text" : "password",
                autoComplete: "new-password",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: !1,
                placeholder: s(m ? "settings.optionalOverride" : "settings.enterApiKey"),
                value: ((D = n[a]) == null ? void 0 : D.apiKey) || "",
                onChange: (e) => w(a, {
                  apiKey: e.target.value
                }),
                className: "font-mono text-sm pr-10"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => f(!i),
                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: i ? /* @__PURE__ */ t(k, { className: "h-4 w-4" }) : /* @__PURE__ */ t(S, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "space-y-2", children: [
          /* @__PURE__ */ t(d, { className: "text-sm", children: s("settings.ttsBaseUrl") }),
          /* @__PURE__ */ t(
            p,
            {
              name: `tts-base-url-${a}`,
              autoComplete: "off",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: l.defaultBaseUrl || s("settings.enterCustomBaseUrl"),
              value: ((q = n[a]) == null ? void 0 : q.baseUrl) || "",
              onChange: (e) => w(a, {
                baseUrl: e.target.value
              }),
              className: "text-sm"
            }
          )
        ] })
      ] }),
      (() => {
        var c;
        const e = ((c = n[a]) == null ? void 0 : c.baseUrl) || l.defaultBaseUrl || "";
        if (!e) return null;
        let o = "";
        switch (a) {
          case "openai-tts":
          case "glm-tts":
            o = "/audio/speech";
            break;
          case "azure-tts":
            o = "/cognitiveservices/v1";
            break;
          case "qwen-tts":
            o = "/services/aigc/multimodal-generation/generation";
            break;
          case "elevenlabs-tts":
            o = "/text-to-speech";
            break;
          case "doubao-tts":
            o = "/unidirectional";
            break;
        }
        return o ? /* @__PURE__ */ r("p", { className: "text-xs text-muted-foreground break-all", children: [
          s("settings.requestUrl"),
          ": ",
          e + o
        ] }) : null;
      })()
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2", children: [
      /* @__PURE__ */ t(d, { className: "text-sm", children: s("settings.testTTS") }),
      /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ t(
          p,
          {
            placeholder: s("settings.ttsTestTextPlaceholder"),
            value: h,
            onChange: (e) => K(e.target.value),
            className: "flex-1"
          }
        ),
        /* @__PURE__ */ r(
          Y,
          {
            onClick: W,
            disabled: U || !h.trim() || l.requiresApiKey && !((L = (F = n[a]) == null ? void 0 : F.apiKey) != null && L.trim()) && !m,
            size: "default",
            className: "gap-2 w-32",
            children: [
              U ? /* @__PURE__ */ t(I, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ t(ee, { className: "h-4 w-4" }),
              s("settings.testTTS")
            ]
          }
        )
      ] })
    ] }),
    A && /* @__PURE__ */ t(
      "div",
      {
        className: R(
          "rounded-lg p-3 text-sm overflow-hidden",
          b === "success" && "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
          b === "error" && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
        ),
        children: /* @__PURE__ */ r("div", { className: "flex items-start gap-2 min-w-0", children: [
          b === "success" && /* @__PURE__ */ t(te, { className: "h-4 w-4 mt-0.5 shrink-0" }),
          b === "error" && /* @__PURE__ */ t(se, { className: "h-4 w-4 mt-0.5 shrink-0" }),
          /* @__PURE__ */ t("p", { className: "flex-1 min-w-0 break-all", children: A })
        ] })
      }
    ),
    l.models.length > 0 && /* @__PURE__ */ r("div", { className: "space-y-2", children: [
      /* @__PURE__ */ t(d, { className: "text-sm text-muted-foreground", children: s("settings.availableModels") }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", children: l.models.map((e) => /* @__PURE__ */ r(
        "div",
        {
          className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border/40 text-xs font-mono text-muted-foreground",
          children: [
            /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-emerald-500/70" }),
            e.name
          ]
        },
        e.id
      )) }),
      /* @__PURE__ */ t("p", { className: "text-[11px] text-muted-foreground/60", children: s("settings.modelSelectedViaVoice") })
    ] })
  ] });
}
export {
  xe as TTSSettings
};
//# sourceMappingURL=tts-settings.js.map
