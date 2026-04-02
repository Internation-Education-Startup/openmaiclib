import { jsx as t, jsxs as s, Fragment as w } from "react/jsx-runtime";
import { useElementShadow as v } from "../hooks/useElementShadow.js";
import { useElementFlip as N } from "../hooks/useElementFlip.js";
import { useClipImage as k } from "./useClipImage.js";
import { useFilter as S } from "./useFilter.js";
import { ImageOutline as E } from "./ImageOutline/index.js";
import { isMediaPlaceholder as C, useMediaGenerationStore as D } from "../../../../../lib/store/media-generation.js";
import { useSettingsStore as P } from "../../../../../lib/store/settings.js";
import { useMediaStageId as j } from "../../../../../lib/contexts/media-stage-context.js";
import { retryMediaTask as G } from "../../../../../lib/media/media-orchestrator.js";
import { ImageOff as p, Paintbrush as M, ShieldAlert as $, RotateCcw as T } from "lucide-react";
import { useI18n as O } from "../../../../../lib/hooks/use-i18n.js";
function J({ elementInfo: r }) {
  const { t: i } = O(), { shadowStyle: n } = v(r.shadow), { flipStyle: g } = N(r.flipH, r.flipV), { clipShape: u, imgPosition: l } = k(r), { filter: f } = S(r.filters), c = j(), o = !!c && C(r.src), e = D((a) => {
    if (!o) return;
    const d = a.tasks[r.src];
    if (!(d && d.stageId !== c))
      return d;
  }), b = P((a) => a.imageGenerationEnabled), m = (e == null ? void 0 : e.status) === "done" && e.objectUrl ? e.objectUrl : r.src, h = o && !e && !b, x = o && !h && (!e || e.status === "pending" || e.status === "generating"), y = o && (e == null ? void 0 : e.status) === "failed";
  return /* @__PURE__ */ t(
    "div",
    {
      className: "absolute",
      style: {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`
      },
      children: /* @__PURE__ */ t("div", { className: "w-full h-full", style: { transform: `rotate(${r.rotate}deg)` }, children: /* @__PURE__ */ s(
        "div",
        {
          className: "w-full h-full relative",
          style: {
            filter: n ? `drop-shadow(${n})` : "",
            transform: g
          },
          children: [
            /* @__PURE__ */ t(E, { elementInfo: r }),
            /* @__PURE__ */ t(
              "div",
              {
                className: "w-full h-full overflow-hidden relative",
                style: { clipPath: u.style },
                children: h ? /* @__PURE__ */ t("div", { className: "w-full h-full bg-gray-50 dark:bg-gray-900/30 flex items-center justify-center", children: /* @__PURE__ */ s("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400", children: [
                  /* @__PURE__ */ t(p, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ t("span", { children: i("settings.mediaGenerationDisabled") })
                ] }) }) : x ? /* @__PURE__ */ s("div", { className: "w-full h-full bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20 flex items-center justify-center", children: [
                  /* @__PURE__ */ t("style", { children: `
                  @keyframes img-pulse-ring { 0%, 100% { opacity: 0.15; transform: scale(0.85); } 50% { opacity: 0.35; transform: scale(1.1); } }
                ` }),
                  /* @__PURE__ */ s("div", { className: "relative w-12 h-12", children: [
                    /* @__PURE__ */ t(
                      "div",
                      {
                        className: "absolute inset-0 rounded-full border-2 border-amber-300/40 dark:border-amber-500/30",
                        style: {
                          animation: "img-pulse-ring 2.4s ease-in-out infinite"
                        }
                      }
                    ),
                    /* @__PURE__ */ t(
                      M,
                      {
                        className: "absolute inset-0 m-auto w-5 h-5 text-amber-400/80 dark:text-amber-500/70",
                        strokeWidth: 1.5
                      }
                    )
                  ] })
                ] }) : y ? /* @__PURE__ */ t("div", { className: "w-full h-full bg-red-50 dark:bg-red-900/20 flex flex-col items-center justify-center gap-1.5", children: (e == null ? void 0 : e.errorCode) === "CONTENT_SENSITIVE" ? /* @__PURE__ */ s("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400", children: [
                  /* @__PURE__ */ t($, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ t("span", { children: i("settings.mediaContentSensitive") })
                ] }) : (e == null ? void 0 : e.errorCode) === "GENERATION_DISABLED" ? /* @__PURE__ */ s("div", { className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400", children: [
                  /* @__PURE__ */ t(p, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ t("span", { children: i("settings.mediaGenerationDisabled") })
                ] }) : /* @__PURE__ */ s(
                  "button",
                  {
                    onClick: (a) => {
                      a.stopPropagation(), G(r.src);
                    },
                    onPointerDown: (a) => a.stopPropagation(),
                    className: "flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 rounded hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors",
                    children: [
                      /* @__PURE__ */ t(T, { className: "w-3 h-3" }),
                      i("settings.mediaRetry")
                    ]
                  }
                ) }) : m ? /* @__PURE__ */ s(w, { children: [
                  /* @__PURE__ */ t(
                    "img",
                    {
                      src: m,
                      draggable: !1,
                      style: {
                        position: "absolute",
                        top: l.top,
                        left: l.left,
                        width: l.width,
                        height: l.height,
                        filter: f
                      },
                      alt: "",
                      onDragStart: (a) => a.preventDefault()
                    }
                  ),
                  r.colorMask && /* @__PURE__ */ t(
                    "div",
                    {
                      className: "absolute inset-0",
                      style: { backgroundColor: r.colorMask }
                    }
                  )
                ] }) : null
              }
            )
          ]
        }
      ) })
    }
  );
}
export {
  J as BaseImageElement
};
//# sourceMappingURL=BaseImageElement.js.map
