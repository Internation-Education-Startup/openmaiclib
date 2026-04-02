import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { useState as l, useEffect as M, useRef as L } from "react";
import { useRouter as ze } from "../shims/next-navigation.js";
import { motion as m, AnimatePresence as G } from "motion/react";
import { Sun as ie, Moon as ne, Monitor as se, Settings as le, ArrowUp as Oe, Clock as Pe, ChevronDown as Z, Pencil as Q, Check as Ee, ChevronUp as Re, ImagePlus as Te, BotOff as De, Trash2 as Ie, Copy as Ae } from "lucide-react";
import { useI18n as ee } from "../lib/hooks/use-i18n.js";
import { createLogger as _e } from "../lib/logger.js";
import { Button as de } from "../components/ui/button.js";
import { Textarea as qe } from "../components/ui/textarea.js";
import { cn as k } from "../lib/utils/cn.js";
import { SettingsDialog as Fe } from "../components/settings/index.js";
import { GenerationToolbar as je } from "../components/generation/generation-toolbar.js";
import { AgentBar as Le } from "../components/agent/agent-bar.js";
import { useTheme as Ue } from "../lib/hooks/use-theme.js";
import { nanoid as Be } from "nanoid";
import { storePdfBlob as Ke } from "../lib/utils/image-storage.js";
import { useSettingsStore as ce } from "../lib/store/settings.js";
import { useUserProfileStore as F, AVATAR_OPTIONS as Me } from "../lib/store/user-profile.js";
import { listStages as Ge, getFirstSlideByStages as We, renameStage as He, deleteStageData as Ve } from "../lib/utils/stage-storage.js";
import { ThumbnailSlide as Ye } from "../components/slide-renderer/components/ThumbnailSlide/index.js";
import { useMediaGenerationStore as me } from "../lib/store/media-generation.js";
import { toast as j } from "sonner";
import { Tooltip as he, TooltipTrigger as fe, TooltipContent as be } from "../components/ui/tooltip.js";
import { useDraftCache as $e } from "../lib/hooks/use-draft-cache.js";
import { SpeechButton as Je } from "../components/audio/speech-button.js";
const V = _e("Home"), ue = "webSearchEnabled", ge = "generationLanguage", pe = "recentClassroomsOpen", Xe = {
  pdfFile: null,
  requirement: "",
  language: "zh-CN",
  webSearch: !1
};
function Ze() {
  const { t: i, locale: u, setLocale: I } = ee(), { theme: b, setTheme: z } = Ue(), O = ze(), [d, p] = l(Xe), [A, g] = l(!1), [x, P] = l(void 0), { cachedValue: v, updateCache: h } = $e({ key: "requirementDraft" }), N = ce((t) => t.modelId), [w, E] = l(!0);
  M(() => {
    var t;
    try {
      const o = localStorage.getItem(pe);
      o !== null && E(o !== "false");
    } catch {
    }
    try {
      const o = localStorage.getItem(ue), s = localStorage.getItem(ge), c = {};
      if (o === "true" && (c.webSearch = !0), s === "zh-CN" || s === "en-US")
        c.language = s;
      else {
        const f = (t = navigator.language) != null && t.startsWith("zh") ? "zh-CN" : "en-US";
        c.language = f;
      }
      Object.keys(c).length > 0 && p((f) => ({ ...f, ...c }));
    } catch {
    }
  }, []);
  const [R, _] = l(v);
  v !== R && (_(v), v && p((t) => ({ ...t, requirement: v })));
  const [C, n] = l(!1), [T, r] = l(!1), [S, D] = l(null), [q, y] = l([]), [U, Y] = l({}), [W, B] = l(null), K = L(null), xe = L(null);
  M(() => {
    if (!C && !T) return;
    const t = (o) => {
      K.current && !K.current.contains(o.target) && (n(!1), r(!1));
    };
    return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
  }, [C, T]);
  const te = async () => {
    try {
      const t = await Ge();
      if (y(t), t.length > 0) {
        const o = await We(t.map((s) => s.id));
        Y(o);
      }
    } catch (t) {
      V.error("Failed to load classrooms:", t);
    }
  };
  M(() => {
    me.getState().revokeObjectUrls(), me.setState({ tasks: {} }), te();
  }, []);
  const ve = (t, o) => {
    o.stopPropagation(), B(t);
  }, ye = async (t) => {
    B(null);
    try {
      await Ve(t), await te();
    } catch (o) {
      V.error("Failed to delete classroom:", o), j.error("Failed to delete classroom");
    }
  }, ke = async (t, o) => {
    try {
      await He(t, o), y((s) => s.map((c) => c.id === t ? { ...c, name: o } : c));
    } catch (s) {
      V.error("Failed to rename classroom:", s), j.error(i("classroom.renameFailed"));
    }
  }, H = (t, o) => {
    p((s) => ({ ...s, [t]: o }));
    try {
      t === "webSearch" && localStorage.setItem(ue, String(o)), t === "language" && localStorage.setItem(ge, String(o)), t === "requirement" && h(o);
    } catch {
    }
  }, Ne = (t, o, s) => {
    j.custom(
      (c) => /* @__PURE__ */ a(
        "div",
        {
          className: "w-[356px] rounded-xl border border-amber-200/60 dark:border-amber-800/40 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-amber-950/60 dark:via-slate-900 dark:to-amber-950/60 shadow-lg shadow-amber-500/8 dark:shadow-amber-900/20 p-4 flex items-start gap-3 cursor-pointer",
          onClick: () => {
            j.dismiss(c), g(!0);
          },
          children: [
            /* @__PURE__ */ e("div", { className: "shrink-0 mt-0.5 size-9 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center ring-1 ring-amber-200/50 dark:ring-amber-800/30", children: t }),
            /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ e("p", { className: "text-sm font-semibold text-amber-900 dark:text-amber-200 leading-tight", children: o }),
              /* @__PURE__ */ e("p", { className: "text-xs text-amber-700/80 dark:text-amber-400/70 mt-0.5 leading-relaxed", children: s })
            ] }),
            /* @__PURE__ */ e("div", { className: "shrink-0 mt-1 text-[10px] font-medium text-amber-500 dark:text-amber-500/70 tracking-wide", children: /* @__PURE__ */ e(le, { className: "size-3.5 animate-[spin_3s_linear_infinite]" }) })
          ]
        }
      ),
      { duration: 4e3 }
    );
  }, re = async () => {
    var t;
    if (!N) {
      Ne(
        /* @__PURE__ */ e(De, { className: "size-4.5 text-amber-600 dark:text-amber-400" }),
        i("settings.modelNotConfigured"),
        i("settings.setupNeeded")
      ), g(!0);
      return;
    }
    if (!d.requirement.trim()) {
      D(i("upload.requirementRequired"));
      return;
    }
    D(null);
    try {
      const o = F.getState(), s = {
        requirement: d.requirement,
        language: d.language,
        userNickname: o.nickname || void 0,
        userBio: o.bio || void 0,
        webSearch: d.webSearch || void 0
      };
      let c, f, ae, oe;
      if (d.pdfFile) {
        c = await Ke(d.pdfFile), f = d.pdfFile.name;
        const J = ce.getState();
        ae = J.pdfProviderId;
        const X = (t = J.pdfProvidersConfig) == null ? void 0 : t[J.pdfProviderId];
        X && (oe = {
          apiKey: X.apiKey,
          baseUrl: X.baseUrl
        });
      }
      const Se = {
        sessionId: Be(),
        requirements: s,
        pdfText: "",
        pdfImages: [],
        imageStorageIds: [],
        pdfStorageKey: c,
        pdfFileName: f,
        pdfProviderId: ae,
        pdfProviderConfig: oe,
        sceneOutlines: null,
        currentStep: "generating"
      };
      sessionStorage.setItem("generationSession", JSON.stringify(Se)), O.push("/generation-preview");
    } catch (o) {
      V.error("Error preparing generation:", o), D(o instanceof Error ? o.message : i("upload.generateFailed"));
    }
  }, we = (t) => {
    const o = new Date(t), c = Math.abs((/* @__PURE__ */ new Date()).getTime() - o.getTime()), f = Math.floor(c / (1e3 * 60 * 60 * 24));
    return f === 0 ? i("classroom.today") : f === 1 ? i("classroom.yesterday") : f < 7 ? `${f} ${i("classroom.daysAgo")}` : o.toLocaleDateString();
  }, $ = !!d.requirement.trim(), Ce = (t) => {
    (t.metaKey || t.ctrlKey) && t.key === "Enter" && (t.preventDefault(), $ && re());
  };
  return /* @__PURE__ */ a("div", { className: "min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center p-4 pt-16 md:p-8 md:pt-16 overflow-x-hidden", children: [
    /* @__PURE__ */ a(
      "div",
      {
        ref: K,
        className: "fixed top-4 right-4 z-50 flex items-center gap-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-100/50 dark:border-gray-700/50 shadow-sm",
        children: [
          /* @__PURE__ */ a("div", { className: "relative", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  n(!C), r(!1);
                },
                className: "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all",
                children: u === "zh-CN" ? "CN" : "EN"
              }
            ),
            C && /* @__PURE__ */ a("div", { className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    I("zh-CN"), n(!1);
                  },
                  className: k(
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
                    I("en-US"), n(!1);
                  },
                  className: k(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                    u === "en-US" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  ),
                  children: "English"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700" }),
          /* @__PURE__ */ a("div", { className: "relative", children: [
            /* @__PURE__ */ a(
              "button",
              {
                onClick: () => {
                  r(!T), n(!1);
                },
                className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all",
                children: [
                  b === "light" && /* @__PURE__ */ e(ie, { className: "w-4 h-4" }),
                  b === "dark" && /* @__PURE__ */ e(ne, { className: "w-4 h-4" }),
                  b === "system" && /* @__PURE__ */ e(se, { className: "w-4 h-4" })
                ]
              }
            ),
            T && /* @__PURE__ */ a("div", { className: "absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]", children: [
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    z("light"), r(!1);
                  },
                  className: k(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                    b === "light" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  ),
                  children: [
                    /* @__PURE__ */ e(ie, { className: "w-4 h-4" }),
                    i("settings.themeOptions.light")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    z("dark"), r(!1);
                  },
                  className: k(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                    b === "dark" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  ),
                  children: [
                    /* @__PURE__ */ e(ne, { className: "w-4 h-4" }),
                    i("settings.themeOptions.dark")
                  ]
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    z("system"), r(!1);
                  },
                  className: k(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2",
                    b === "system" && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  ),
                  children: [
                    /* @__PURE__ */ e(se, { className: "w-4 h-4" }),
                    i("settings.themeOptions.system")
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700" }),
          /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
            "button",
            {
              onClick: () => g(!0),
              className: "p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 hover:shadow-sm transition-all group",
              children: /* @__PURE__ */ e(le, { className: "w-4 h-4 group-hover:rotate-90 transition-transform duration-500" })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ e(
      Fe,
      {
        open: A,
        onOpenChange: (t) => {
          g(t), t || P(void 0);
        },
        initialSection: x
      }
    ),
    /* @__PURE__ */ a("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDuration: "4s" }
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",
          style: { animationDuration: "6s" }
        }
      )
    ] }),
    /* @__PURE__ */ a(
      m.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: k(
          "relative z-20 w-full max-w-[800px] flex flex-col items-center",
          q.length === 0 ? "justify-center min-h-[calc(100dvh-8rem)]" : "mt-[10vh]"
        ),
        children: [
          /* @__PURE__ */ e(
            m.img,
            {
              src: "/logo-horizontal.png",
              alt: "OpenMAIC",
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              },
              className: "h-12 md:h-16 mb-2 -ml-2 md:-ml-3"
            }
          ),
          /* @__PURE__ */ e(
            m.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.25 },
              className: "text-sm text-muted-foreground/60 mb-8",
              children: i("home.slogan")
            }
          ),
          /* @__PURE__ */ e(
            m.div,
            {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.35 },
              className: "w-full",
              children: /* @__PURE__ */ a("div", { className: "w-full rounded-2xl border border-border/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-black/[0.03] dark:shadow-black/20 transition-shadow focus-within:shadow-2xl focus-within:shadow-violet-500/[0.06]", children: [
                /* @__PURE__ */ a("div", { className: "relative z-20 flex items-start justify-between", children: [
                  /* @__PURE__ */ e(tt, {}),
                  /* @__PURE__ */ e("div", { className: "pr-3 pt-3.5 shrink-0", children: /* @__PURE__ */ e(Le, {}) })
                ] }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    ref: xe,
                    placeholder: i("upload.requirementPlaceholder"),
                    className: "w-full resize-none border-0 bg-transparent px-4 pt-1 pb-2 text-[13px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none min-h-[140px] max-h-[300px]",
                    value: d.requirement,
                    onChange: (t) => H("requirement", t.target.value),
                    onKeyDown: Ce,
                    rows: 4
                  }
                ),
                /* @__PURE__ */ a("div", { className: "px-3 pb-3 flex items-end gap-2", children: [
                  /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ e(
                    je,
                    {
                      language: d.language,
                      onLanguageChange: (t) => H("language", t),
                      webSearch: d.webSearch,
                      onWebSearchChange: (t) => H("webSearch", t),
                      onSettingsOpen: (t) => {
                        P(t), g(!0);
                      },
                      pdfFile: d.pdfFile,
                      onPdfFileChange: (t) => H("pdfFile", t),
                      onPdfError: D
                    }
                  ) }),
                  /* @__PURE__ */ e(
                    Je,
                    {
                      size: "md",
                      onTranscription: (t) => {
                        p((o) => {
                          const s = o.requirement + (o.requirement ? " " : "") + t;
                          return h(s), { ...o, requirement: s };
                        });
                      }
                    }
                  ),
                  /* @__PURE__ */ a(
                    "button",
                    {
                      onClick: re,
                      disabled: !$,
                      className: k(
                        "shrink-0 h-8 rounded-lg flex items-center justify-center gap-1.5 transition-all px-3",
                        $ ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm cursor-pointer" : "bg-muted text-muted-foreground/40 cursor-not-allowed"
                      ),
                      children: [
                        /* @__PURE__ */ e("span", { className: "text-xs font-medium", children: i("toolbar.enterClassroom") }),
                        /* @__PURE__ */ e(Oe, { className: "size-3.5" })
                      ]
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ e(G, { children: S && /* @__PURE__ */ e(
            m.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "mt-3 w-full p-3 bg-destructive/10 border border-destructive/20 rounded-lg",
              children: /* @__PURE__ */ e("p", { className: "text-sm text-destructive", children: S })
            }
          ) })
        ]
      }
    ),
    q.length > 0 && /* @__PURE__ */ a(
      m.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5 },
        className: "relative z-10 mt-10 w-full max-w-6xl flex flex-col items-center",
        children: [
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                const t = !w;
                E(t);
                try {
                  localStorage.setItem(pe, String(t));
                } catch {
                }
              },
              className: "group w-full flex items-center gap-4 py-2 cursor-pointer",
              children: [
                /* @__PURE__ */ e("div", { className: "flex-1 h-px bg-border/40 group-hover:bg-border/70 transition-colors" }),
                /* @__PURE__ */ a("span", { className: "shrink-0 flex items-center gap-2 text-[13px] text-muted-foreground/60 group-hover:text-foreground/70 transition-colors select-none", children: [
                  /* @__PURE__ */ e(Pe, { className: "size-3.5" }),
                  i("classroom.recentClassrooms"),
                  /* @__PURE__ */ e("span", { className: "text-[11px] tabular-nums opacity-60", children: q.length }),
                  /* @__PURE__ */ e(
                    m.div,
                    {
                      animate: { rotate: w ? 180 : 0 },
                      transition: { duration: 0.3, ease: "easeInOut" },
                      children: /* @__PURE__ */ e(Z, { className: "size-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ e("div", { className: "flex-1 h-px bg-border/40 group-hover:bg-border/70 transition-colors" })
              ]
            }
          ),
          /* @__PURE__ */ e(G, { children: w && /* @__PURE__ */ e(
            m.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
              className: "w-full overflow-hidden",
              children: /* @__PURE__ */ e("div", { className: "pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8", children: q.map((t, o) => /* @__PURE__ */ e(
                m.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: o * 0.04,
                    duration: 0.35,
                    ease: "easeOut"
                  },
                  children: /* @__PURE__ */ e(
                    rt,
                    {
                      classroom: t,
                      slide: U[t.id],
                      formatDate: we,
                      onDelete: ve,
                      onRename: ke,
                      confirmingDelete: W === t.id,
                      onConfirmDelete: () => ye(t.id),
                      onCancelDelete: () => B(null),
                      onClick: () => O.push(`/classroom/${t.id}`)
                    }
                  )
                },
                t.id
              )) })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "mt-auto pt-12 pb-4 text-center text-xs text-muted-foreground/40", children: "OpenMAIC Open Source Project" })
  ] });
}
const Qe = 5 * 1024 * 1024;
function et(i) {
  return i.startsWith("data:");
}
function tt() {
  const { t: i } = ee(), u = F((r) => r.avatar), I = F((r) => r.nickname), b = F((r) => r.bio), z = F((r) => r.setAvatar), O = F((r) => r.setNickname), d = F((r) => r.setBio), [p, A] = l(!1), [g, x] = l(!1), [P, v] = l(""), [h, N] = l(!1), w = L(null), E = L(null), R = L(null), _ = I || i("profile.defaultNickname");
  M(() => {
    if (!p) return;
    const r = (S) => {
      R.current && !R.current.contains(S.target) && (A(!1), x(!1), N(!1));
    };
    return document.addEventListener("mousedown", r), () => document.removeEventListener("mousedown", r);
  }, [p]);
  const C = () => {
    v(I), x(!0), setTimeout(() => {
      var r;
      return (r = w.current) == null ? void 0 : r.focus();
    }, 50);
  }, n = () => {
    O(P.trim()), x(!1);
  };
  return /* @__PURE__ */ a("div", { ref: R, className: "relative pl-4 pr-2 pt-3.5 pb-1 w-auto", children: [
    /* @__PURE__ */ e(
      "input",
      {
        ref: E,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (r) => {
          var q;
          const S = (q = r.target.files) == null ? void 0 : q[0];
          if (!S) return;
          if (S.size > Qe) {
            j.error(i("profile.fileTooLarge"));
            return;
          }
          if (!S.type.startsWith("image/")) {
            j.error(i("profile.invalidFileType"));
            return;
          }
          const D = new FileReader();
          D.onload = () => {
            const y = new window.Image();
            y.onload = () => {
              const U = document.createElement("canvas");
              U.width = 128, U.height = 128;
              const Y = U.getContext("2d"), W = Math.max(128 / y.width, 128 / y.height), B = y.width * W, K = y.height * W;
              Y.drawImage(y, (128 - B) / 2, (128 - K) / 2, B, K), z(U.toDataURL("image/jpeg", 0.85));
            }, y.src = D.result;
          }, D.readAsDataURL(S), r.target.value = "";
        }
      }
    ),
    !p && /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center gap-2.5 cursor-pointer transition-all duration-200 group rounded-full px-2.5 py-1.5 border border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 active:scale-[0.97]",
        onClick: () => A(!0),
        children: [
          /* @__PURE__ */ a("div", { className: "shrink-0 relative", children: [
            /* @__PURE__ */ e("div", { className: "size-8 rounded-full overflow-hidden ring-[1.5px] ring-border/30 group-hover:ring-violet-400/60 dark:group-hover:ring-violet-400/40 transition-all duration-300", children: /* @__PURE__ */ e("img", { src: u, alt: "", className: "size-full object-cover" }) }),
            /* @__PURE__ */ e("div", { className: "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-white dark:bg-slate-800 border border-border/40 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ e(Q, { className: "size-[7px] text-muted-foreground/70" }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ a(he, { children: [
            /* @__PURE__ */ e(fe, { asChild: !0, children: /* @__PURE__ */ a("span", { className: "leading-none select-none flex items-center gap-1", children: [
              /* @__PURE__ */ a("span", { children: [
                /* @__PURE__ */ e("span", { className: "text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors", children: i("home.greeting") }),
                /* @__PURE__ */ e("span", { className: "text-[13px] font-semibold text-foreground/85 group-hover:text-foreground transition-colors", children: _ })
              ] }),
              /* @__PURE__ */ e(Z, { className: "size-3 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors shrink-0" })
            ] }) }),
            /* @__PURE__ */ e(be, { side: "bottom", sideOffset: 4, children: i("profile.editTooltip") })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ e(G, { children: p && /* @__PURE__ */ e(
      m.div,
      {
        initial: { opacity: 0, y: -4, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -4, scale: 0.97 },
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        className: "absolute left-4 top-3.5 z-50 w-64",
        children: /* @__PURE__ */ a("div", { className: "rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] shadow-[0_1px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_8px_-2px_rgba(0,0,0,0.3)] px-2.5 py-2", children: [
          /* @__PURE__ */ a(
            "div",
            {
              className: "flex items-center gap-2.5 cursor-pointer transition-all duration-200",
              onClick: () => {
                A(!1), x(!1), N(!1);
              },
              children: [
                /* @__PURE__ */ a(
                  "div",
                  {
                    className: "shrink-0 relative cursor-pointer",
                    onClick: (r) => {
                      r.stopPropagation(), N(!h);
                    },
                    children: [
                      /* @__PURE__ */ e("div", { className: "size-8 rounded-full overflow-hidden ring-[1.5px] ring-violet-300/70 dark:ring-violet-500/40 transition-all duration-300", children: /* @__PURE__ */ e("img", { src: u, alt: "", className: "size-full object-cover" }) }),
                      /* @__PURE__ */ e(
                        m.div,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          className: "absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-white dark:bg-slate-800 border border-border/60 flex items-center justify-center",
                          children: /* @__PURE__ */ e(
                            Z,
                            {
                              className: k(
                                "size-2 text-muted-foreground/70 transition-transform duration-200",
                                h && "rotate-180"
                              )
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: g ? /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", onClick: (r) => r.stopPropagation(), children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      ref: w,
                      value: P,
                      onChange: (r) => v(r.target.value),
                      onKeyDown: (r) => {
                        r.key === "Enter" && n(), r.key === "Escape" && x(!1);
                      },
                      onBlur: n,
                      maxLength: 20,
                      placeholder: i("profile.defaultNickname"),
                      className: "flex-1 min-w-0 h-6 bg-transparent border-b border-border/80 text-[13px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: n,
                      className: "shrink-0 size-5 rounded flex items-center justify-center text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30",
                      children: /* @__PURE__ */ e(Ee, { className: "size-3" })
                    }
                  )
                ] }) : /* @__PURE__ */ a(
                  "span",
                  {
                    onClick: (r) => {
                      r.stopPropagation(), C();
                    },
                    className: "group/name inline-flex items-center gap-1 cursor-pointer",
                    children: [
                      /* @__PURE__ */ e("span", { className: "text-[13px] font-semibold text-foreground/85 group-hover/name:text-foreground transition-colors", children: _ }),
                      /* @__PURE__ */ e(Q, { className: "size-2.5 text-muted-foreground/30 opacity-0 group-hover/name:opacity-100 transition-opacity" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ e(
                  m.div,
                  {
                    initial: { opacity: 0, y: -2 },
                    animate: { opacity: 1, y: 0 },
                    className: "shrink-0 size-6 rounded-full flex items-center justify-center hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors",
                    children: /* @__PURE__ */ e(Re, { className: "size-3.5 text-muted-foreground/50" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ a("div", { className: "pt-2", onClick: (r) => r.stopPropagation(), children: [
            /* @__PURE__ */ e(G, { children: h && /* @__PURE__ */ e(
              m.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.15, ease: "easeInOut" },
                className: "overflow-hidden",
                children: /* @__PURE__ */ a("div", { className: "p-1 pb-2.5 flex items-center gap-1.5 flex-wrap", children: [
                  Me.map((r) => /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => z(r),
                      className: k(
                        "size-7 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-800 cursor-pointer transition-all duration-150",
                        "hover:scale-110 active:scale-95",
                        u === r ? "ring-2 ring-violet-400 dark:ring-violet-500 ring-offset-0" : "hover:ring-1 hover:ring-muted-foreground/30"
                      ),
                      children: /* @__PURE__ */ e("img", { src: r, alt: "", className: "size-full" })
                    },
                    r
                  )),
                  /* @__PURE__ */ e(
                    "label",
                    {
                      className: k(
                        "size-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 border border-dashed",
                        "hover:scale-110 active:scale-95",
                        et(u) ? "ring-2 ring-violet-400 dark:ring-violet-500 ring-offset-0 border-violet-300 dark:border-violet-600 bg-violet-50 dark:bg-violet-900/30" : "border-muted-foreground/30 text-muted-foreground/50 hover:border-muted-foreground/50"
                      ),
                      onClick: () => {
                        var r;
                        return (r = E.current) == null ? void 0 : r.click();
                      },
                      title: i("profile.uploadAvatar"),
                      children: /* @__PURE__ */ e(Te, { className: "size-3" })
                    }
                  )
                ] })
              }
            ) }),
            /* @__PURE__ */ e(
              qe,
              {
                value: b,
                onChange: (r) => d(r.target.value),
                placeholder: i("profile.bioPlaceholder"),
                maxLength: 200,
                rows: 2,
                className: "resize-none border-border/40 bg-transparent min-h-[72px] !text-[13px] !leading-relaxed placeholder:!text-[11px] placeholder:!leading-relaxed focus-visible:ring-1 focus-visible:ring-border/60"
              }
            )
          ] })
        ] })
      }
    ) })
  ] });
}
function rt({
  classroom: i,
  slide: u,
  formatDate: I,
  onDelete: b,
  onRename: z,
  confirmingDelete: O,
  onConfirmDelete: d,
  onCancelDelete: p,
  onClick: A
}) {
  const { t: g } = ee(), x = L(null), [P, v] = l(0), [h, N] = l(!1), [w, E] = l(""), R = L(null);
  M(() => {
    const n = x.current;
    if (!n) return;
    const T = new ResizeObserver(([r]) => {
      v(Math.round(r.contentRect.width));
    });
    return T.observe(n), () => T.disconnect();
  }, []), M(() => {
    var n;
    h && ((n = R.current) == null || n.focus());
  }, [h]);
  const _ = (n) => {
    n.stopPropagation(), E(i.name), N(!0);
  }, C = () => {
    if (!h) return;
    const n = w.trim();
    n && n !== i.name && z(i.id, n), N(!1);
  };
  return /* @__PURE__ */ a("div", { className: "group cursor-pointer", onClick: O ? void 0 : A, children: [
    /* @__PURE__ */ a(
      "div",
      {
        ref: x,
        className: "relative w-full aspect-[16/9] rounded-2xl bg-slate-100 dark:bg-slate-800/80 overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]",
        children: [
          u && P > 0 ? /* @__PURE__ */ e(
            Ye,
            {
              slide: u,
              size: P,
              viewportSize: u.viewportSize ?? 1e3,
              viewportRatio: u.viewportRatio ?? 0.5625
            }
          ) : u ? null : /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "text-xl opacity-50", children: "📄" }) }) }),
          /* @__PURE__ */ e(G, { children: !O && /* @__PURE__ */ a(
            m.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              children: [
                /* @__PURE__ */ e(
                  de,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "absolute top-2 right-2 size-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-destructive/80 text-white hover:text-white backdrop-blur-sm rounded-full",
                    onClick: (n) => {
                      n.stopPropagation(), b(i.id, n);
                    },
                    children: /* @__PURE__ */ e(Ie, { className: "size-3.5" })
                  }
                ),
                /* @__PURE__ */ e(
                  de,
                  {
                    size: "icon",
                    variant: "ghost",
                    className: "absolute top-2 right-11 size-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-black/50 text-white hover:text-white backdrop-blur-sm rounded-full",
                    onClick: _,
                    children: /* @__PURE__ */ e(Q, { className: "size-3.5" })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ e(G, { children: O && /* @__PURE__ */ a(
            m.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-[6px]",
              onClick: (n) => n.stopPropagation(),
              children: [
                /* @__PURE__ */ a("span", { className: "text-[13px] font-medium text-white/90", children: [
                  g("classroom.deleteConfirmTitle"),
                  "?"
                ] }),
                /* @__PURE__ */ a("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "px-3.5 py-1 rounded-lg text-[12px] font-medium bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur-sm transition-colors",
                      onClick: p,
                      children: g("common.cancel")
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "px-3.5 py-1 rounded-lg text-[12px] font-medium bg-red-500/90 text-white hover:bg-red-500 transition-colors",
                      onClick: d,
                      children: g("classroom.delete")
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "mt-2.5 px-1 flex items-center gap-2", children: [
      /* @__PURE__ */ a("span", { className: "shrink-0 inline-flex items-center rounded-full bg-violet-100 dark:bg-violet-900/30 px-2 py-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-400", children: [
        i.sceneCount,
        " ",
        g("classroom.slides"),
        " · ",
        I(i.updatedAt)
      ] }),
      h ? /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", onClick: (n) => n.stopPropagation(), children: /* @__PURE__ */ e(
        "input",
        {
          ref: R,
          value: w,
          onChange: (n) => E(n.target.value),
          onKeyDown: (n) => {
            n.key === "Enter" && C(), n.key === "Escape" && N(!1);
          },
          onBlur: C,
          maxLength: 100,
          placeholder: g("classroom.renamePlaceholder"),
          className: "w-full bg-transparent border-b border-violet-400/60 text-[15px] font-medium text-foreground/90 outline-none placeholder:text-muted-foreground/40"
        }
      ) }) : /* @__PURE__ */ a(he, { children: [
        /* @__PURE__ */ e(fe, { asChild: !0, children: /* @__PURE__ */ e(
          "p",
          {
            className: "font-medium text-[15px] truncate text-foreground/90 min-w-0 cursor-text",
            onDoubleClick: _,
            children: i.name
          }
        ) }),
        /* @__PURE__ */ e(
          be,
          {
            side: "bottom",
            sideOffset: 4,
            className: "!max-w-[min(90vw,32rem)] break-words whitespace-normal",
            children: /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e("span", { className: "break-all", children: i.name }),
              /* @__PURE__ */ e(
                "button",
                {
                  className: "shrink-0 p-0.5 rounded hover:bg-foreground/10 transition-colors",
                  onClick: (n) => {
                    n.stopPropagation(), navigator.clipboard.writeText(i.name), j.success(g("classroom.nameCopied"));
                  },
                  children: /* @__PURE__ */ e(Ae, { className: "size-3 opacity-60" })
                }
              )
            ] })
          }
        )
      ] })
    ] })
  ] });
}
function Pt() {
  return /* @__PURE__ */ e(Ze, {});
}
export {
  Pt as default
};
//# sourceMappingURL=home.js.map
