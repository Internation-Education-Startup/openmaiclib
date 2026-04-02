import { jsx as B } from "react/jsx-runtime";
import { forwardRef as U, useRef as Y, useMemo as ee, useCallback as d, useEffect as A, useImperativeHandle as te } from "react";
import { debounce as $ } from "lodash";
import { useCanvasStore as p } from "../../../../lib/store/canvas.js";
import "../../../../lib/store/snapshot.js";
import { useKeyboardStore as re } from "../../../../lib/store/keyboard.js";
import "../../../../lib/store/stage.js";
import "../../../../lib/store/settings.js";
import "../../../../lib/contexts/scene-context.js";
import { toggleMark as u, lift as se, wrapIn as ce } from "prosemirror-commands";
import { initProsemirrorEditor as ne, createDocument as ae } from "../../../../lib/prosemirror/index.js";
import { getTextAttrs as oe, autoSelectAll as a, addMark as m, getFontsize as D, isActiveOfParentNodeType as ie, findNodesWithSameMark as ue, markActive as me } from "../../../../lib/prosemirror/utils.js";
import C, { EmitterEvents as R } from "../../../../lib/utils/emitter.js";
import { alignmentCommand as le } from "../../../../lib/prosemirror/commands/setTextAlign.js";
import { indentCommand as fe, textIndentCommand as de } from "../../../../lib/prosemirror/commands/setTextIndent.js";
import { toggleList as j } from "../../../../lib/prosemirror/commands/toggleList.js";
import { setListStyle as x } from "../../../../lib/prosemirror/commands/setListStyle.js";
import { replaceText as pe } from "../../../../lib/prosemirror/commands/replaceText.js";
import { KEYS as F } from "../../../../configs/hotkey.js";
import { toast as he } from "sonner";
const ke = U(
  ({
    elementId: h,
    defaultColor: P,
    defaultFontName: K,
    value: k,
    editable: H = !1,
    autoFocus: V = !1,
    onUpdate: S,
    onFocus: z,
    onBlur: b,
    onMouseDown: I
  }, W) => {
    const M = Y(null), e = Y(null), g = p.use.handleElementId(), v = p.use.textFormatPainter(), y = p.use.richTextAttrs(), w = p.use.activeElementIdList(), E = p.use.setDisableHotkeysState(), N = p.use.setRichtextAttrs(), q = p.use.setTextFormatPainter(), X = re((c) => c.ctrlOrShiftKeyActive()), _ = ee(
      () => $(
        (c = !1) => {
          e.current && k.replace(/ style=""/g, "") !== e.current.dom.innerHTML.replace(/ style=""/g, "") && (S == null || S({
            value: e.current.dom.innerHTML,
            ignore: c
          }));
        },
        300,
        { trailing: !0 }
      ),
      [k, S]
    ), Z = d(() => {
      (!X || w.length <= 1) && E(!0), z == null || z();
    }, [X, w.length, E, z]), G = d(() => {
      E(!1), b == null || b();
    }, [E, b]), l = d(
      $(
        () => {
          if (!e.current) return;
          const c = oe(e.current, {
            color: P,
            fontname: K
          });
          N(c);
        },
        30,
        { trailing: !0 }
      ),
      [P, K, N]
    ), J = d(
      (c, i) => {
        const { ctrlKey: f, shiftKey: t, metaKey: r } = i, s = f || t || r, n = i.key.toUpperCase(), o = s && (n === F.Z || n === F.Y);
        _(o), l();
      },
      [_, l]
    ), T = d(
      ({ target: c, action: i }) => {
        if (!e.current || !c && g !== h || c && c !== h) return;
        const f = "command" in i ? [i] : i;
        for (const t of f)
          if (t.command === "fontname" && t.value !== void 0) {
            const r = e.current.state.schema.marks.fontname.create({
              fontname: t.value
            });
            a(e.current), m(e.current, r), t.value && !document.fonts.check(`16px ${t.value}`) && he.warning("Font is loading, please wait...");
          } else if (t.command === "fontsize" && t.value) {
            const r = e.current.state.schema.marks.fontsize.create({
              fontsize: t.value
            });
            a(e.current), m(e.current, r), x(e.current, {
              key: "fontsize",
              value: t.value
            });
          } else if (t.command === "fontsize-add") {
            const r = t.value ? +t.value : 2;
            a(e.current);
            const s = D(e.current) + r + "px", n = e.current.state.schema.marks.fontsize.create({
              fontsize: s
            });
            m(e.current, n), x(e.current, {
              key: "fontsize",
              value: s
            });
          } else if (t.command === "fontsize-reduce") {
            const r = t.value ? +t.value : 2;
            a(e.current);
            let s = D(e.current) - r;
            s < 12 && (s = 12);
            const n = e.current.state.schema.marks.fontsize.create({
              fontsize: s + "px"
            });
            m(e.current, n), x(e.current, {
              key: "fontsize",
              value: s + "px"
            });
          } else if (t.command === "color" && t.value) {
            const r = e.current.state.schema.marks.forecolor.create({
              color: t.value
            });
            a(e.current), m(e.current, r), x(e.current, {
              key: "color",
              value: t.value
            });
          } else if (t.command === "backcolor" && t.value) {
            const r = e.current.state.schema.marks.backcolor.create({
              backcolor: t.value
            });
            a(e.current), m(e.current, r);
          } else if (t.command === "bold")
            a(e.current), u(e.current.state.schema.marks.strong)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "em")
            a(e.current), u(e.current.state.schema.marks.em)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "underline")
            a(e.current), u(e.current.state.schema.marks.underline)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "strikethrough")
            a(e.current), u(e.current.state.schema.marks.strikethrough)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "subscript")
            u(e.current.state.schema.marks.subscript)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "superscript")
            u(e.current.state.schema.marks.superscript)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "blockquote")
            ie("blockquote", e.current.state) ? se(e.current.state, e.current.dispatch) : ce(e.current.state.schema.nodes.blockquote)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "code")
            u(e.current.state.schema.marks.code)(
              e.current.state,
              e.current.dispatch
            );
          else if (t.command === "align" && t.value)
            le(e.current, t.value);
          else if (t.command === "indent" && t.value)
            fe(e.current, +t.value);
          else if (t.command === "textIndent" && t.value)
            de(e.current, +t.value);
          else if (t.command === "bulletList") {
            const r = t.value || "", { bullet_list: s, list_item: n } = e.current.state.schema.nodes, o = {
              color: y.color,
              fontsize: y.fontsize
            };
            j(
              s,
              n,
              r,
              o
            )(e.current.state, e.current.dispatch);
          } else if (t.command === "orderedList") {
            const r = t.value || "", { ordered_list: s, list_item: n } = e.current.state.schema.nodes, o = {
              color: y.color,
              fontsize: y.fontsize
            };
            j(
              s,
              n,
              r,
              o
            )(e.current.state, e.current.dispatch);
          } else if (t.command === "clear") {
            a(e.current);
            const { $from: r, $to: s } = e.current.state.selection;
            e.current.dispatch(e.current.state.tr.removeMark(r.pos, s.pos)), x(e.current, [
              { key: "fontsize", value: "" },
              { key: "color", value: "" }
            ]);
          } else if (t.command === "link") {
            const r = e.current.state.schema.marks.link, { from: s, to: n } = e.current.state.selection, o = ue(e.current.state.doc, s, n, r);
            if (o)
              if (t.value) {
                const L = e.current.state.schema.marks.link.create({
                  href: t.value,
                  title: t.value
                });
                m(e.current, L, {
                  from: o.from.pos,
                  to: o.to.pos + 1
                });
              } else
                e.current.dispatch(
                  e.current.state.tr.removeMark(
                    o.from.pos,
                    o.to.pos + 1,
                    r
                  )
                );
            else if (me(e.current.state, r))
              if (t.value) {
                const L = e.current.state.schema.marks.link.create({
                  href: t.value,
                  title: t.value
                });
                m(e.current, L);
              } else u(r)(e.current.state, e.current.dispatch);
            else t.value && (a(e.current), u(r, { href: t.value, title: t.value })(
              e.current.state,
              e.current.dispatch
            ));
          } else t.command === "insert" && t.value ? e.current.dispatch(e.current.state.tr.insertText(t.value)) : t.command === "replace" && t.value && pe(e.current, t.value);
        e.current.focus(), _(), l();
      },
      [g, h, y, _, l]
    ), Q = d(() => {
      if (!v || !e.current) return;
      const { keep: c, ...i } = v, f = [{ command: "clear" }];
      for (const t of Object.keys(i)) {
        const r = t, s = v[t];
        s === !0 ? f.push({ command: r }) : s && f.push({ command: r, value: s });
      }
      T({ action: f }), c || q(null);
    }, [v, T, q]), O = d(() => {
      g === h && l();
    }, [g, h, l]);
    return A(() => {
      if (M.current)
        return e.current = ne(M.current, k, {
          handleDOMEvents: {
            focus: Z,
            blur: G,
            keydown: J,
            click: l,
            mouseup: Q
          },
          editable: () => H
        }), V && e.current.focus(), () => {
          e.current && e.current.destroy();
        };
    }, []), A(() => {
      if (!e.current || e.current.hasFocus()) return;
      const { doc: c, tr: i } = e.current.state;
      e.current.dispatch(i.replaceRangeWith(0, c.content.size, ae(k)));
    }, [k]), A(() => {
      e.current && e.current.setProps({ editable: () => H });
    }, [H]), A(() => (C.on(R.RICH_TEXT_COMMAND, T), C.on(R.SYNC_RICH_TEXT_ATTRS_TO_STORE, O), () => {
      C.off(R.RICH_TEXT_COMMAND, T), C.off(R.SYNC_RICH_TEXT_ATTRS_TO_STORE, O);
    }), [T, O]), te(W, () => ({
      focus: () => {
        e.current && e.current.focus();
      }
    })), /* @__PURE__ */ B(
      "div",
      {
        ref: M,
        className: `prosemirror-editor cursor-text ${v ? "format-painter" : ""}`,
        onMouseDown: (c) => I == null ? void 0 : I(c)
      }
    );
  }
);
ke.displayName = "ProsemirrorEditor";
export {
  ke as ProsemirrorEditor
};
//# sourceMappingURL=ProsemirrorEditor.js.map
