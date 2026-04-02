import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { Button as h } from "../ui/button.js";
import { Input as w } from "../ui/input.js";
import { Textarea as k } from "../ui/textarea.js";
import { Label as f } from "../ui/label.js";
import { Card as T, CardHeader as V, CardTitle as E, CardContent as B } from "../ui/card.js";
import { Select as g, SelectTrigger as y, SelectValue as N, SelectContent as q, SelectItem as o } from "../ui/select.js";
import { Plus as O, ChevronUp as D, ChevronDown as H, Trash2 as K } from "lucide-react";
import { nanoid as U } from "nanoid";
function X({
  outlines: n,
  onChange: p,
  onConfirm: j,
  onBack: P,
  isLoading: t = !1
}) {
  const z = () => {
    const l = {
      id: U(8),
      type: "slide",
      title: "",
      description: "",
      keyPoints: [],
      order: n.length + 1
    };
    p([...n, l]);
  }, u = (l, s) => {
    const a = [...n];
    a[l] = { ...a[l], ...s }, p(a);
  }, S = (l) => {
    const s = n.filter((a, c) => c !== l);
    s.forEach((a, c) => {
      a.order = c + 1;
    }), p(s);
  }, b = (l, s) => {
    const a = s === "up" ? l - 1 : l + 1;
    if (a < 0 || a >= n.length) return;
    const c = [...n];
    [c[l], c[a]] = [c[a], c[l]], c.forEach((v, C) => {
      v.order = C + 1;
    }), p(c);
  }, I = (l, s) => {
    const a = s.split(`
`).map((c) => c.trim()).filter(Boolean);
    u(l, { keyPoints: a });
  };
  return /* @__PURE__ */ i("div", { className: "space-y-6", children: [
    /* @__PURE__ */ i("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-lg font-semibold", children: "场景大纲" }),
        /* @__PURE__ */ i("p", { className: "text-sm text-muted-foreground", children: [
          "共 ",
          n.length,
          " 个场景，可编辑、添加、删除或重排序"
        ] })
      ] }),
      /* @__PURE__ */ i(h, { variant: "outline", onClick: z, disabled: t, children: [
        /* @__PURE__ */ e(O, { className: "size-4 mr-1" }),
        "添加场景"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "space-y-4", children: n.map((l, s) => {
      var a, c, v, C, x;
      return /* @__PURE__ */ i(T, { className: "relative", children: [
        /* @__PURE__ */ e(V, { className: "pb-3", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ e(
              h,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => b(s, "up"),
                disabled: s === 0 || t,
                className: "size-6",
                children: /* @__PURE__ */ e(D, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ e(
              h,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => b(s, "down"),
                disabled: s === n.length - 1 || t,
                className: "size-6",
                children: /* @__PURE__ */ e(H, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ i(E, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { className: "bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm", children: s + 1 }),
            /* @__PURE__ */ e(
              w,
              {
                value: l.title,
                onChange: (r) => u(s, { title: r.target.value }),
                placeholder: "场景标题",
                className: "flex-1",
                disabled: t
              }
            )
          ] }) }),
          /* @__PURE__ */ i(
            g,
            {
              value: l.type,
              onValueChange: (r) => u(s, {
                type: r
              }),
              disabled: t,
              children: [
                /* @__PURE__ */ e(y, { className: "w-28", children: /* @__PURE__ */ e(N, {}) }),
                /* @__PURE__ */ i(q, { children: [
                  /* @__PURE__ */ e(o, { value: "slide", children: "幻灯片" }),
                  /* @__PURE__ */ e(o, { value: "quiz", children: "测验" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e(
            h,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => S(s),
              disabled: t,
              children: /* @__PURE__ */ e(K, { className: "size-4 text-destructive" })
            }
          )
        ] }) }),
        /* @__PURE__ */ i(B, { className: "space-y-4", children: [
          /* @__PURE__ */ i("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e(f, { children: "场景描述" }),
            /* @__PURE__ */ e(
              k,
              {
                value: l.description,
                onChange: (r) => u(s, { description: r.target.value }),
                placeholder: "简短描述这个场景的目的和内容",
                rows: 2,
                disabled: t
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "space-y-2", children: [
            /* @__PURE__ */ e(f, { children: "关键要点（每行一个）" }),
            /* @__PURE__ */ e(
              k,
              {
                value: ((a = l.keyPoints) == null ? void 0 : a.join(`
`)) || "",
                onChange: (r) => I(s, r.target.value),
                placeholder: "输入关键要点，每行一个",
                rows: 3,
                disabled: t
              }
            )
          ] }),
          l.type === "quiz" && /* @__PURE__ */ i("div", { className: "p-3 bg-muted/50 rounded-lg space-y-3", children: [
            /* @__PURE__ */ e(f, { className: "text-sm font-medium", children: "测验配置" }),
            /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ i("div", { className: "space-y-1", children: [
                /* @__PURE__ */ e(f, { className: "text-xs", children: "题目数量" }),
                /* @__PURE__ */ e(
                  w,
                  {
                    type: "number",
                    value: ((c = l.quizConfig) == null ? void 0 : c.questionCount) || 3,
                    onChange: (r) => {
                      var d, m;
                      return u(s, {
                        quizConfig: {
                          ...l.quizConfig,
                          questionCount: parseInt(r.target.value) || 3,
                          difficulty: ((d = l.quizConfig) == null ? void 0 : d.difficulty) || "medium",
                          questionTypes: ((m = l.quizConfig) == null ? void 0 : m.questionTypes) || ["single"]
                        }
                      });
                    },
                    min: 1,
                    max: 10,
                    disabled: t
                  }
                )
              ] }),
              /* @__PURE__ */ i("div", { className: "space-y-1", children: [
                /* @__PURE__ */ e(f, { className: "text-xs", children: "难度" }),
                /* @__PURE__ */ i(
                  g,
                  {
                    value: ((v = l.quizConfig) == null ? void 0 : v.difficulty) || "medium",
                    onValueChange: (r) => {
                      var d, m;
                      return u(s, {
                        quizConfig: {
                          ...l.quizConfig,
                          difficulty: r,
                          questionCount: ((d = l.quizConfig) == null ? void 0 : d.questionCount) || 3,
                          questionTypes: ((m = l.quizConfig) == null ? void 0 : m.questionTypes) || ["single"]
                        }
                      });
                    },
                    disabled: t,
                    children: [
                      /* @__PURE__ */ e(y, { children: /* @__PURE__ */ e(N, {}) }),
                      /* @__PURE__ */ i(q, { children: [
                        /* @__PURE__ */ e(o, { value: "easy", children: "简单" }),
                        /* @__PURE__ */ e(o, { value: "medium", children: "中等" }),
                        /* @__PURE__ */ e(o, { value: "hard", children: "困难" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ i("div", { className: "space-y-1", children: [
                /* @__PURE__ */ e(f, { className: "text-xs", children: "题型" }),
                /* @__PURE__ */ i(
                  g,
                  {
                    value: ((x = (C = l.quizConfig) == null ? void 0 : C.questionTypes) == null ? void 0 : x[0]) || "single",
                    onValueChange: (r) => {
                      var d, m;
                      return u(s, {
                        quizConfig: {
                          ...l.quizConfig,
                          questionTypes: [r],
                          questionCount: ((d = l.quizConfig) == null ? void 0 : d.questionCount) || 3,
                          difficulty: ((m = l.quizConfig) == null ? void 0 : m.difficulty) || "medium"
                        }
                      });
                    },
                    disabled: t,
                    children: [
                      /* @__PURE__ */ e(y, { children: /* @__PURE__ */ e(N, {}) }),
                      /* @__PURE__ */ i(q, { children: [
                        /* @__PURE__ */ e(o, { value: "single", children: "单选" }),
                        /* @__PURE__ */ e(o, { value: "multiple", children: "多选" }),
                        /* @__PURE__ */ e(o, { value: "text", children: "简答" })
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }, l.id);
    }) }),
    n.length === 0 && /* @__PURE__ */ i(T, { className: "p-8 text-center", children: [
      /* @__PURE__ */ e("p", { className: "text-muted-foreground mb-4", children: "暂无场景大纲" }),
      /* @__PURE__ */ i(h, { variant: "outline", onClick: z, disabled: t, children: [
        /* @__PURE__ */ e(O, { className: "size-4 mr-1" }),
        "添加第一个场景"
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex justify-between pt-4", children: [
      /* @__PURE__ */ e(h, { variant: "outline", onClick: P, disabled: t, children: "返回修改需求" }),
      /* @__PURE__ */ e(h, { onClick: j, disabled: t || n.length === 0, children: t ? "生成中..." : "确认并生成课程" })
    ] })
  ] });
}
export {
  X as OutlinesEditor
};
//# sourceMappingURL=outlines-editor.js.map
