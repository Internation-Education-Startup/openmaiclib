import { jsxs as r, Fragment as F, jsx as e } from "react/jsx-runtime";
import { ArrowLeft as U, Sun as O, Moon as S, Monitor as E, Settings as X, Loader2 as A, Download as G, FileDown as I, Package as W } from "lucide-react";
import { useI18n as q } from "../lib/hooks/use-i18n.js";
import { useTheme as B } from "../lib/hooks/use-theme.js";
import { useState as m, useRef as v, useCallback as J, useEffect as K } from "react";
import { useRouter as Q } from "../shims/next-navigation.js";
import { SettingsDialog as V } from "./settings/index.js";
import { cn as g } from "../lib/utils/cn.js";
import { useStageStore as w } from "../lib/store/stage.js";
import { useMediaGenerationStore as Y } from "../lib/store/media-generation.js";
import { useExportPPTX as Z } from "../lib/export/use-export-pptx.js";
function ge({ currentSceneTitle: P }) {
  const { t: a, locale: u, setLocale: N } = q(), { theme: s, setTheme: x } = B(), z = Q(), [R, C] = m(!1), [o, d] = m(!1), [l, n] = m(!1), { exporting: c, exportPPTX: T, exportResourcePack: L } = Z(), [i, p] = m(!1), f = v(null), M = w((t) => t.scenes), j = w((t) => t.generatingOutlines), D = w((t) => t.failedOutlines), H = Y((t) => t.tasks), h = M.length > 0 && j.length === 0 && D.length === 0 && Object.values(H).every((t) => t.status === "done" || t.status === "failed"), b = v(null), y = v(null), k = J(
    (t) => {
      o && b.current && !b.current.contains(t.target) && d(!1), l && y.current && !y.current.contains(t.target) && n(!1), i && f.current && !f.current.contains(t.target) && p(!1);
    },
    [o, l, i]
  );
  return K(() => {
    if (o || l || i)
      return document.addEventListener("mousedown", k), () => document.removeEventListener("mousedown", k);
  }, [o, l, i, k]), /* @__PURE__ */ r(F, { children: [
    /* @__PURE__ */ r("header", { className: "h-20 px-8 flex items-center justify-between z-10 bg-transparent gap-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => z.push("/"),
            className: "shrink-0 p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
            title: a("generation.backToHome"),
            children: /* @__PURE__ */ e(U, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ r("div", { className: "flex flex-col min-w-0", children: [
          /* @__PURE__ */ e("span", { className: "text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-0.5", children: a("stage.currentScene") }),
          /* @__PURE__ */ e(
            "h1",
            {
              className: "text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tight truncate",
              suppressHydrationWarning: !0,
              children: P || a("common.loading")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-100/50 dark:border-gray-700/50 shadow-sm shrink-0", children: [
        /* @__PURE__ */ r("div", { className: "relative", ref: b, children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => {
                d(!o), n(!1);
              },
              className: "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all",
              children: u === "zh-CN" ? "CN" : "EN"
            }
          ),
          o && /* @__PURE__ */ r("div", { className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  N("zh-CN"), d(!1);
                },
                className: g(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  u === "zh-CN" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                ),
                children: "简体中文"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  N("en-US"), d(!1);
                },
                className: g(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  u === "en-US" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                ),
                children: "English"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700" }),
        /* @__PURE__ */ r("div", { className: "relative", ref: y, children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                n(!l), d(!1);
              },
              className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group",
              children: [
                s === "light" && /* @__PURE__ */ e(O, { className: "w-4 h-4" }),
                s === "dark" && /* @__PURE__ */ e(S, { className: "w-4 h-4" }),
                s === "system" && /* @__PURE__ */ e(E, { className: "w-4 h-4" })
              ]
            }
          ),
          l && /* @__PURE__ */ r("div", { className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]", children: [
            /* @__PURE__ */ r(
              "button",
              {
                onClick: () => {
                  x("light"), n(!1);
                },
                className: g(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                  s === "light" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                ),
                children: [
                  /* @__PURE__ */ e(O, { className: "w-4 h-4" }),
                  a("settings.themeOptions.light")
                ]
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                onClick: () => {
                  x("dark"), n(!1);
                },
                className: g(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                  s === "dark" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                ),
                children: [
                  /* @__PURE__ */ e(S, { className: "w-4 h-4" }),
                  a("settings.themeOptions.dark")
                ]
              }
            ),
            /* @__PURE__ */ r(
              "button",
              {
                onClick: () => {
                  x("system"), n(!1);
                },
                className: g(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                  s === "system" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                ),
                children: [
                  /* @__PURE__ */ e(E, { className: "w-4 h-4" }),
                  a("settings.themeOptions.system")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700" }),
        /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
          "button",
          {
            onClick: () => C(!0),
            className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group",
            children: /* @__PURE__ */ e(X, { className: "w-4 h-4 group-hover:rotate-90 transition-transform duration-500" })
          }
        ) })
      ] }),
      /* @__PURE__ */ r("div", { className: "relative", ref: f, children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              h && !c && p(!i);
            },
            disabled: !h || c,
            title: a(h ? c ? "export.exporting" : "export.pptx" : "share.notReady"),
            className: g(
              "shrink-0 p-2 rounded-full transition-all",
              h && !c ? "text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm" : "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50"
            ),
            children: c ? /* @__PURE__ */ e(A, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ e(G, { className: "w-4 h-4" })
          }
        ),
        i && /* @__PURE__ */ r("div", { className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[200px]", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                p(!1), T();
              },
              className: "w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5",
              children: [
                /* @__PURE__ */ e(I, { className: "w-4 h-4 text-gray-400 shrink-0" }),
                /* @__PURE__ */ e("span", { children: a("export.pptx") })
              ]
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                p(!1), L();
              },
              className: "w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2.5",
              children: [
                /* @__PURE__ */ e(W, { className: "w-4 h-4 text-gray-400 shrink-0" }),
                /* @__PURE__ */ r("div", { children: [
                  /* @__PURE__ */ e("div", { children: a("export.resourcePack") }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-gray-400 dark:text-gray-500", children: a("export.resourcePackDesc") })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(V, { open: R, onOpenChange: C })
  ] });
}
export {
  ge as Header
};
//# sourceMappingURL=header.js.map
