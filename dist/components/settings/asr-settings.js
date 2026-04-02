import { jsxs as n, jsx as t, Fragment as v } from "react/jsx-runtime";
import { useState as p, useRef as Q } from "react";
import { Label as C } from "../ui/label.js";
import { Input as A } from "../ui/input.js";
import { Button as W } from "../ui/button.js";
import { Select as Y, SelectTrigger as Z, SelectValue as I, SelectContent as P, SelectItem as ee } from "../ui/select.js";
import { useI18n as te } from "../../lib/hooks/use-i18n.js";
import { useSettingsStore as T } from "../../lib/store/settings.js";
import { ASR_PROVIDERS as V } from "../../lib/audio/constants.js";
import { EyeOff as re, Eye as se, MicOff as ae, Mic as ne, CheckCircle2 as oe, XCircle as ie } from "lucide-react";
import { cn as le } from "../../lib/utils/cn.js";
import { createLogger as ce } from "../../lib/logger.js";
const X = ce("ASRSettings");
function ye({ selectedProviderId: r }) {
  var F, O, D, j, q, E;
  const { t: s } = te(), U = T((e) => e.asrLanguage), o = T((e) => e.asrProvidersConfig), R = T((e) => e.setASRProviderConfig), d = V[r] ?? V["openai-whisper"], h = !!((F = o[r]) != null && F.isServerConfigured), [k, K] = p(!1), [M, f] = p(!1), [_, b] = p(""), [w, i] = p("idle"), [B, l] = p(""), x = Q(null), [G, H] = p(r);
  r !== G && (H(r), K(!1), i("idle"), l(""), b(""));
  const J = async () => {
    if (M)
      x.current && x.current.state === "recording" && x.current.stop(), f(!1);
    else if (b(""), i("testing"), l(""), r === "browser-native") {
      const e = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!e) {
        i("error"), l(s("settings.asrNotSupported"));
        return;
      }
      const a = new e();
      a.lang = U || "zh-CN", a.onresult = (c) => {
        const u = c.results[0][0].transcript;
        b(u), i("success"), l(s("settings.asrTestSuccess"));
      }, a.onerror = (c) => {
        i("error"), l(s("settings.asrTestFailed") + ": " + c.error);
      }, a.onend = () => {
        f(!1);
      }, a.start(), f(!0);
    } else
      try {
        const e = await navigator.mediaDevices.getUserMedia({
          audio: !0
        }), a = new MediaRecorder(e);
        x.current = a;
        const c = [];
        a.ondataavailable = (u) => {
          c.push(u.data);
        }, a.onstop = async () => {
          var L, z, $;
          e.getTracks().forEach((m) => m.stop());
          const u = new Blob(c, { type: "audio/webm" }), g = new FormData();
          g.append("audio", u, "recording.webm"), g.append("providerId", r), g.append(
            "modelId",
            ((L = o[r]) == null ? void 0 : L.modelId) || d.defaultModelId
          ), g.append("language", U);
          const S = (z = o[r]) == null ? void 0 : z.apiKey;
          S != null && S.trim() && g.append("apiKey", S);
          const N = ($ = o[r]) == null ? void 0 : $.baseUrl;
          N != null && N.trim() && g.append("baseUrl", N);
          try {
            const m = await fetch("/api/transcription", {
              method: "POST",
              body: g
            });
            if (m.ok) {
              const y = await m.json();
              b(y.text), i("success"), l(s("settings.asrTestSuccess"));
            } else {
              i("error");
              const y = await m.json().catch(() => ({ error: m.statusText }));
              l(y.details || y.error || s("settings.asrTestFailed"));
            }
          } catch (m) {
            X.error("ASR test failed:", m), i("error"), l(s("settings.asrTestFailed"));
          }
        }, a.start(), f(!0);
      } catch (e) {
        X.error("Failed to access microphone:", e), i("error"), l(s("settings.microphoneAccessFailed"));
      }
  };
  return /* @__PURE__ */ n("div", { className: "space-y-6 max-w-3xl", children: [
    h && /* @__PURE__ */ t("div", { className: "rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300", children: s("settings.serverConfiguredNotice") }),
    (d.requiresApiKey || h) && /* @__PURE__ */ n(v, { children: [
      /* @__PURE__ */ n("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ n("div", { className: "space-y-2", children: [
          /* @__PURE__ */ t(C, { className: "text-sm", children: s("settings.asrApiKey") }),
          /* @__PURE__ */ n("div", { className: "relative", children: [
            /* @__PURE__ */ t(
              A,
              {
                name: `asr-api-key-${r}`,
                type: k ? "text" : "password",
                autoComplete: "new-password",
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: !1,
                placeholder: s(h ? "settings.optionalOverride" : "settings.enterApiKey"),
                value: ((O = o[r]) == null ? void 0 : O.apiKey) || "",
                onChange: (e) => R(r, {
                  apiKey: e.target.value
                }),
                className: "font-mono text-sm pr-10"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => K(!k),
                className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: k ? /* @__PURE__ */ t(re, { className: "h-4 w-4" }) : /* @__PURE__ */ t(se, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "space-y-2", children: [
          /* @__PURE__ */ t(C, { className: "text-sm", children: s("settings.asrBaseUrl") }),
          /* @__PURE__ */ t(
            A,
            {
              name: `asr-base-url-${r}`,
              autoComplete: "off",
              autoCapitalize: "none",
              autoCorrect: "off",
              spellCheck: !1,
              placeholder: d.defaultBaseUrl || s("settings.enterCustomBaseUrl"),
              value: ((D = o[r]) == null ? void 0 : D.baseUrl) || "",
              onChange: (e) => R(r, {
                baseUrl: e.target.value
              }),
              className: "text-sm"
            }
          )
        ] })
      ] }),
      (() => {
        var c;
        const e = ((c = o[r]) == null ? void 0 : c.baseUrl) || d.defaultBaseUrl || "";
        if (!e) return null;
        let a = "";
        switch (r) {
          case "openai-whisper":
            a = "/audio/transcriptions";
            break;
          case "qwen-asr":
            a = "/services/aigc/multimodal-generation/generation";
            break;
        }
        return a ? /* @__PURE__ */ n("p", { className: "text-xs text-muted-foreground break-all", children: [
          s("settings.requestUrl"),
          ": ",
          e + a
        ] }) : null;
      })()
    ] }),
    /* @__PURE__ */ n("div", { className: "space-y-2", children: [
      /* @__PURE__ */ t(C, { className: "text-sm", children: s("settings.testASR") }),
      /* @__PURE__ */ n("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ t(
          A,
          {
            value: _,
            readOnly: !0,
            placeholder: s("settings.asrResultPlaceholder"),
            className: "flex-1 bg-muted/50"
          }
        ),
        /* @__PURE__ */ t(
          W,
          {
            onClick: J,
            disabled: d.requiresApiKey && !((q = (j = o[r]) == null ? void 0 : j.apiKey) != null && q.trim()) && !h,
            className: "gap-2 w-[140px]",
            children: M ? /* @__PURE__ */ n(v, { children: [
              /* @__PURE__ */ t(ae, { className: "h-4 w-4" }),
              s("settings.stopRecording")
            ] }) : /* @__PURE__ */ n(v, { children: [
              /* @__PURE__ */ t(ne, { className: "h-4 w-4" }),
              s("settings.startRecording")
            ] })
          }
        )
      ] })
    ] }),
    B && /* @__PURE__ */ t(
      "div",
      {
        className: le(
          "rounded-lg p-3 text-sm overflow-hidden",
          w === "success" && "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
          w === "error" && "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
        ),
        children: /* @__PURE__ */ n("div", { className: "flex items-start gap-2 min-w-0", children: [
          w === "success" && /* @__PURE__ */ t(oe, { className: "h-4 w-4 mt-0.5 shrink-0" }),
          w === "error" && /* @__PURE__ */ t(ie, { className: "h-4 w-4 mt-0.5 shrink-0" }),
          /* @__PURE__ */ t("p", { className: "flex-1 min-w-0 break-all", children: B })
        ] })
      }
    ),
    d.models.length > 0 && /* @__PURE__ */ n("div", { className: "space-y-2", children: [
      /* @__PURE__ */ t(C, { className: "text-sm", children: s("settings.ttsModel") }),
      /* @__PURE__ */ n(
        Y,
        {
          value: ((E = o[r]) == null ? void 0 : E.modelId) || d.defaultModelId,
          onValueChange: (e) => R(r, { modelId: e }),
          children: [
            /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ t(I, {}) }),
            /* @__PURE__ */ t(P, { children: d.models.map((e) => /* @__PURE__ */ t(ee, { value: e.id, children: e.name }, e.id)) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ye as ASRSettings
};
//# sourceMappingURL=asr-settings.js.map
