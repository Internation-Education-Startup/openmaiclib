import { useState as ue, useRef as ge, useCallback as j } from "react";
import he from "pptxgenjs";
import R from "tinycolor2";
import { saveAs as ie } from "file-saver";
import { toast as W } from "sonner";
import { useCanvasStore as le } from "../store/canvas.js";
import "../store/snapshot.js";
import "../store/keyboard.js";
import { useStageStore as ne } from "../store/stage.js";
import "../store/settings.js";
import "../contexts/scene-context.js";
import { isMediaPlaceholder as Z, useMediaGenerationStore as q } from "../store/media-generation.js";
import { useI18n as me } from "../hooks/use-i18n.js";
import { getLineElementPath as ye, getElementRange as we, getTableSubThemeColor as be } from "../utils/element.js";
import { toAST as ve } from "./html-parser/index.js";
import { toPoints as se, getSvgPathRange as Se } from "./svg-path-parser.js";
import { svg2Base64 as re } from "./svg2base64.js";
import { latexToOmml as ke } from "./latex-to-omml.js";
import { createLogger as Te } from "../logger.js";
const Q = Te("ExportPPTX"), G = 16, J = "Microsoft YaHei";
function T(d) {
  if (!d)
    return { alpha: 0, color: "#000000" };
  const y = R(d), p = y.getAlpha(), n = p === 0 ? "#ffffff" : y.setAlpha(1).toHexString();
  return { alpha: p, color: n };
}
function ae(d, y) {
  const p = ve(d);
  let n = !1, t = 0;
  const s = [], g = (H, z = {}) => {
    for (const w of H) {
      if ("tagName" in w && ["div", "li", "p"].includes(w.tagName) && s.length) {
        const A = s[s.length - 1];
        A.options || (A.options = {}), A.options.breakLine = !0;
      }
      const r = { ...z }, O = "attributes" in w ? w.attributes.find((A) => A.key === "style") : null;
      if (O && O.value) {
        const A = O.value.split(";");
        for (const h of A) {
          const C = h.match(/([^:]+):\s*(.+)/);
          if (C) {
            const [F, L] = [C[1].trim(), C[2].trim()];
            F && L && (r[F] = L);
          }
        }
      }
      if ("tagName" in w) {
        if (w.tagName === "em" && (r["font-style"] = "italic"), w.tagName === "strong" && (r["font-weight"] = "bold"), w.tagName === "sup" && (r["vertical-align"] = "super"), w.tagName === "sub" && (r["vertical-align"] = "sub"), w.tagName === "a") {
          const A = w.attributes.find((h) => h.key === "href");
          r.href = (A == null ? void 0 : A.value) || "";
        }
        if (w.tagName === "ul" && (r["list-type"] = "ul"), w.tagName === "ol" && (r["list-type"] = "ol"), w.tagName === "li" && (n = !0), w.tagName === "p" && "attributes" in w) {
          const A = w.attributes.find((h) => h.key === "data-indent");
          A && A.value && (t = +A.value);
        }
      }
      if ("tagName" in w && w.tagName === "br")
        s.push({ text: "", options: { breakLine: !0 } });
      else if ("content" in w) {
        const A = w.content.replace(/&nbsp;/g, " ").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&").replace(/\n/g, ""), h = {};
        r["font-size"] && (h.fontSize = parseInt(r["font-size"]) / y), r.color && (h.color = T(r.color).color), r["background-color"] && (h.highlight = T(r["background-color"]).color), r["text-decoration-line"] && (r["text-decoration-line"].indexOf("underline") !== -1 && (h.underline = {
          color: h.color || "#000000",
          style: "sng"
        }), r["text-decoration-line"].indexOf("line-through") !== -1 && (h.strike = "sngStrike")), r["text-decoration"] && (r["text-decoration"].indexOf("underline") !== -1 && (h.underline = {
          color: h.color || "#000000",
          style: "sng"
        }), r["text-decoration"].indexOf("line-through") !== -1 && (h.strike = "sngStrike")), r["vertical-align"] && (r["vertical-align"] === "super" && (h.superscript = !0), r["vertical-align"] === "sub" && (h.subscript = !0)), r["text-align"] && (h.align = r["text-align"]), r["font-weight"] && (h.bold = r["font-weight"] === "bold"), r["font-style"] && (h.italic = r["font-style"] === "italic"), r["font-family"] && (h.fontFace = r["font-family"]), r.href && (h.hyperlink = { url: r.href }), n && r["list-type"] === "ol" && (h.bullet = {
          type: "number",
          indent: (h.fontSize || G) * 1.25
        }, h.paraSpaceBefore = 0.1, n = !1), n && r["list-type"] === "ul" && (h.bullet = {
          indent: (h.fontSize || G) * 1.25
        }, h.paraSpaceBefore = 0.1, n = !1), t && (h.indentLevel = t, t = 0), s.push({ text: A, options: h });
      } else "children" in w && g(w.children, r);
    }
  };
  return g(p), s;
}
function ce(d, y, p = { x: 1, y: 1 }) {
  return d.map((n) => {
    if (n.close !== void 0)
      return { close: !0 };
    if (n.type === "M")
      return {
        x: n.x / y * p.x,
        y: n.y / y * p.y,
        moveTo: !0
      };
    if (n.curve) {
      if (n.curve.type === "cubic")
        return {
          x: n.x / y * p.x,
          y: n.y / y * p.y,
          curve: {
            type: "cubic",
            x1: n.curve.x1 / y * p.x,
            y1: n.curve.y1 / y * p.y,
            x2: n.curve.x2 / y * p.x,
            y2: n.curve.y2 / y * p.y
          }
        };
      if (n.curve.type === "quadratic")
        return {
          x: n.x / y * p.x,
          y: n.y / y * p.y,
          curve: {
            type: "quadratic",
            x1: n.curve.x1 / y * p.x,
            y1: n.curve.y1 / y * p.y
          }
        };
    }
    return {
      x: n.x / y * p.x,
      y: n.y / y * p.y
    };
  });
}
function K(d, y) {
  const p = T(d.color), { h: n, v: t } = d;
  let s = 4, g = 45;
  return n === 0 && t === 0 ? (s = 4, g = 45) : n === 0 ? t > 0 ? (s = t, g = 90) : (s = -t, g = 270) : t === 0 ? n > 0 ? (s = n, g = 1) : (s = -n, g = 180) : n > 0 && t > 0 ? (s = Math.max(n, t), g = 45) : n > 0 && t < 0 ? (s = Math.max(n, -t), g = 315) : n < 0 && t > 0 ? (s = Math.max(-n, t), g = 135) : n < 0 && t < 0 && (s = Math.max(-n, -t), g = 225), {
    type: "outer",
    color: p.color.replace("#", ""),
    opacity: p.alpha,
    blur: d.blur / y,
    offset: s,
    angle: g
  };
}
const de = {
  solid: "solid",
  dashed: "dash",
  dotted: "sysDot"
};
function fe(d, y) {
  const p = T((d == null ? void 0 : d.color) || "#000000");
  return {
    color: p.color,
    transparency: (1 - p.alpha) * 100,
    width: (d.width || 1) / y,
    dashType: d.style ? de[d.style] : "solid"
  };
}
function M(d, y) {
  const { type: p, target: n } = d;
  if (p === "web") return { url: n };
  if (p === "slide") {
    const t = y.findIndex((s) => s.id === n);
    if (t !== -1) return { slide: t + 1 };
  }
  return null;
}
function _(d) {
  return /^data:image\/[^;]+;base64,/.test(d);
}
function xe(d) {
  return /^data:image\/svg\+xml;base64,/.test(d) || /\.svg$/.test(d);
}
function Ae(d) {
  if (!d.actions || d.actions.length === 0) return "";
  const y = [];
  for (const p of d.actions)
    p.type === "speech" && y.push(p.text);
  return y.join(`
`);
}
async function pe(d, y, p, n, t, s) {
  var H, z, w, B, r, O, A, h, C, F, L, U, $, Y, E, D;
  const g = new he();
  p === 0.625 ? g.layout = "LAYOUT_16x10" : p === 0.75 ? g.layout = "LAYOUT_4x3" : g.layout = "LAYOUT_16x9";
  for (let V = 0; V < d.length; V++) {
    const X = d[V], N = g.addSlide(), I = y[V];
    if (I) {
      const e = Ae(I);
      e && N.addNotes(e);
    }
    if (X.background) {
      const e = X.background;
      if (e.type === "image" && e.image)
        xe(e.image.src) ? N.addImage({
          data: e.image.src,
          x: 0,
          y: 0,
          w: n / t,
          h: n * p / t
        }) : _(e.image.src) ? N.background = { data: e.image.src } : N.background = { path: e.image.src };
      else if (e.type === "solid" && e.color) {
        const a = T(e.color);
        N.background = {
          color: a.color,
          transparency: (1 - a.alpha) * 100
        };
      } else if (e.type === "gradient" && e.gradient) {
        const a = e.gradient.colors, o = a[0].color, l = a[a.length - 1].color, v = R.mix(o, l).toHexString(), f = T(v);
        N.background = {
          color: f.color,
          transparency: (1 - f.alpha) * 100
        };
      }
    }
    if (X.elements) {
      for (const e of X.elements)
        if (e.type === "text") {
          const a = ae(e.content, s), o = {
            x: e.left / t,
            y: e.top / t,
            w: e.width / t,
            h: e.height / t,
            fontSize: G / s,
            fontFace: e.defaultFontName || J,
            color: "#000000",
            valign: "top",
            margin: 10 / s,
            paraSpaceBefore: 5 / s,
            lineSpacingMultiple: 1.5 / 1.25,
            autoFit: !0
          };
          if (e.rotate && (o.rotate = e.rotate), e.wordSpace && (o.charSpacing = e.wordSpace / s), e.lineHeight && (o.lineSpacingMultiple = e.lineHeight / 1.25), e.fill) {
            const l = T(e.fill), v = e.opacity === void 0 ? 1 : e.opacity;
            o.fill = {
              color: l.color,
              transparency: (1 - l.alpha * v) * 100
            };
          }
          e.defaultColor && (o.color = T(e.defaultColor).color), e.defaultFontName && (o.fontFace = e.defaultFontName), e.shadow && (o.shadow = K(e.shadow, s)), (H = e.outline) != null && H.width && (o.line = fe(e.outline, s)), e.opacity !== void 0 && (o.transparency = (1 - e.opacity) * 100), e.paragraphSpace !== void 0 && (o.paraSpaceBefore = e.paragraphSpace / s), e.vertical && (o.vert = "eaVert"), N.addText(a, o);
        } else if (e.type === "image") {
          let a = e.src;
          if (Z(e.src)) {
            const l = q.getState().tasks[e.src];
            if ((l == null ? void 0 : l.status) === "done" && l.objectUrl)
              a = l.objectUrl;
            else
              continue;
          }
          if (!_(a))
            try {
              const v = await (await fetch(a)).blob();
              a = await new Promise((f, c) => {
                const i = new FileReader();
                i.onloadend = () => f(i.result), i.onerror = c, i.readAsDataURL(v);
              });
            } catch {
              Q.warn("Failed to convert image to base64, skipping element");
              continue;
            }
          const o = {
            x: e.left / t,
            y: e.top / t,
            w: e.width / t,
            h: e.height / t
          };
          if (_(a) ? o.data = a : o.path = a, e.flipH && (o.flipH = e.flipH), e.flipV && (o.flipV = e.flipV), e.rotate && (o.rotate = e.rotate), e.link) {
            const l = M(e.link, d);
            l && (o.hyperlink = l);
          }
          if ((z = e.filters) != null && z.opacity && (o.transparency = 100 - parseInt(e.filters.opacity)), e.clip) {
            e.clip.shape === "ellipse" && (o.rounding = !0);
            const [l, v] = e.clip.range, [f, c] = l, [i, S] = v, m = e.width / ((i - f) / t), k = e.height / ((S - c) / t);
            o.w = m / t, o.h = k / t, o.sizing = {
              type: "crop",
              x: f / t * m / t,
              y: c / t * k / t,
              w: (i - f) / t * m / t,
              h: (S - c) / t * k / t
            };
          }
          N.addImage(o);
        } else if (e.type === "shape") {
          if (e.special) {
            const a = "http://www.w3.org/2000/svg", o = document.createElementNS(a, "svg");
            o.setAttribute("xmlns", a), o.setAttribute("viewBox", `0 0 ${e.viewBox[0]} ${e.viewBox[1]}`), o.setAttribute("width", String(e.width)), o.setAttribute("height", String(e.height));
            const l = document.createElementNS(a, "path");
            l.setAttribute("d", e.path), l.setAttribute("fill", e.fill || "none"), (w = e.outline) != null && w.color && (l.setAttribute("stroke", e.outline.color), l.setAttribute("stroke-width", String(e.outline.width || 1))), o.appendChild(l);
            const f = {
              data: re(o),
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t
            };
            if (e.rotate && (f.rotate = e.rotate), e.flipH && (f.flipH = e.flipH), e.flipV && (f.flipV = e.flipV), e.link) {
              const c = M(e.link, d);
              c && (f.hyperlink = c);
            }
            N.addImage(f);
          } else {
            const a = {
              x: e.width / e.viewBox[0],
              y: e.height / e.viewBox[1]
            }, o = ce(se(e.path), t, a);
            let l = T(e.fill);
            if (e.gradient) {
              const c = e.gradient.colors, i = c[0].color, S = c[c.length - 1].color, m = R.mix(i, S).toHexString();
              l = T(m);
            }
            e.pattern && (l = T("#00000000"));
            const v = e.opacity === void 0 ? 1 : e.opacity, f = {
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t,
              fill: {
                color: l.color,
                transparency: (1 - l.alpha * v) * 100
              },
              points: o
            };
            if (e.flipH && (f.flipH = e.flipH), e.flipV && (f.flipV = e.flipV), e.shadow && (f.shadow = K(e.shadow, s)), (B = e.outline) != null && B.width && (f.line = fe(e.outline, s)), e.rotate && (f.rotate = e.rotate), e.link) {
              const c = M(e.link, d);
              c && (f.hyperlink = c);
            }
            N.addShape("custGeom", f);
          }
          if (e.text) {
            const a = ae(e.text.content, s), o = {
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t,
              fontSize: G / s,
              fontFace: J,
              color: "#000000",
              paraSpaceBefore: 5 / s,
              valign: e.text.align
            };
            e.rotate && (o.rotate = e.rotate), e.text.defaultColor && (o.color = T(e.text.defaultColor).color), e.text.defaultFontName && (o.fontFace = e.text.defaultFontName), N.addText(a, o);
          }
          if (e.pattern) {
            const a = {
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t
            };
            if (_(e.pattern) ? a.data = e.pattern : a.path = e.pattern, e.flipH && (a.flipH = e.flipH), e.flipV && (a.flipV = e.flipV), e.rotate && (a.rotate = e.rotate), e.link) {
              const o = M(e.link, d);
              o && (a.hyperlink = o);
            }
            N.addImage(a);
          }
        } else if (e.type === "line") {
          const a = ye(e), o = ce(se(a), t), { minX: l, maxX: v, minY: f, maxY: c } = we(e), i = T(e.color), S = {
            x: e.left / t,
            y: e.top / t,
            w: (v - l) / t,
            h: (c - f) / t,
            line: {
              color: i.color,
              transparency: (1 - i.alpha) * 100,
              width: e.width / s,
              dashType: de[e.style],
              beginArrowType: e.points[0] ? "arrow" : "none",
              endArrowType: e.points[1] ? "arrow" : "none"
            },
            points: o
          };
          e.shadow && (S.shadow = K(e.shadow, s)), N.addShape("custGeom", S);
        } else if (e.type === "chart") {
          const a = [];
          for (let i = 0; i < e.data.series.length; i++) {
            const S = e.data.series[i];
            a.push({
              name: `Series ${i + 1}`,
              labels: e.data.labels,
              values: S
            });
          }
          let o = [];
          if (e.themeColors.length === 10)
            o = e.themeColors.map((i) => T(i).color);
          else if (e.themeColors.length === 1)
            o = R(e.themeColors[0]).analogous(10).map((i) => T(i.toHexString()).color);
          else {
            const i = e.themeColors.length, S = R(e.themeColors[i - 1]).analogous(11 - i).map((m) => m.toHexString());
            o = [...e.themeColors.slice(0, i - 1), ...S].map(
              (m) => T(m).color
            );
          }
          const l = {
            x: e.left / t,
            y: e.top / t,
            w: e.width / t,
            h: e.height / t,
            chartColors: e.chartType === "pie" || e.chartType === "ring" ? o : o.slice(0, e.data.series.length)
          }, v = T(e.textColor || "#000000").color;
          l.catAxisLabelColor = v, l.valAxisLabelColor = v;
          const f = 14 / s;
          if (l.catAxisLabelFontSize = f, l.valAxisLabelFontSize = f, e.fill || e.outline) {
            const i = {};
            e.fill && (i.fill = { color: T(e.fill).color }), e.outline && (i.border = {
              pt: e.outline.width / s,
              color: T(e.outline.color).color
            }), l.plotArea = i;
          }
          (e.data.series.length > 1 && e.chartType !== "scatter" || e.chartType === "pie" || e.chartType === "ring") && (l.showLegend = !0, l.legendPos = "b", l.legendColor = v, l.legendFontSize = f);
          let c = g.ChartType.bar;
          e.chartType === "bar" ? (c = g.ChartType.bar, l.barDir = "col", (r = e.options) != null && r.stack && (l.barGrouping = "stacked")) : e.chartType === "column" ? (c = g.ChartType.bar, l.barDir = "bar", (O = e.options) != null && O.stack && (l.barGrouping = "stacked")) : e.chartType === "line" ? (c = g.ChartType.line, (A = e.options) != null && A.lineSmooth && (l.lineSmooth = !0)) : e.chartType === "area" ? c = g.ChartType.area : e.chartType === "radar" ? c = g.ChartType.radar : e.chartType === "scatter" ? (c = g.ChartType.scatter, l.lineSize = 0) : e.chartType === "pie" ? c = g.ChartType.pie : e.chartType === "ring" && (c = g.ChartType.doughnut, l.holeSize = 60), N.addChart(c, a, l);
        } else if (e.type === "table") {
          const a = [];
          for (let i = 0; i < e.data.length; i++) {
            const S = e.data[i];
            for (let m = 0; m < S.length; m++) {
              const k = S[m];
              if (k.colspan > 1 || k.rowspan > 1)
                for (let u = i; u < i + k.rowspan; u++)
                  for (let x = u === i ? m + 1 : m; x < m + k.colspan; x++)
                    a.push(`${u}_${x}`);
            }
          }
          const o = [], l = e.theme;
          let v = null, f = [];
          l && (v = T(l.color), f = be(l.color).map((i) => T(i)));
          for (let i = 0; i < e.data.length; i++) {
            const S = e.data[i], m = [];
            for (let k = 0; k < S.length; k++) {
              const u = S[k], x = {
                colspan: u.colspan,
                rowspan: u.rowspan,
                bold: ((h = u.style) == null ? void 0 : h.bold) || !1,
                italic: ((C = u.style) == null ? void 0 : C.em) || !1,
                underline: { style: (F = u.style) != null && F.underline ? "sng" : "none" },
                align: ((L = u.style) == null ? void 0 : L.align) || "left",
                valign: "middle",
                fontFace: ((U = u.style) == null ? void 0 : U.fontname) || J,
                fontSize: (($ = u.style) != null && $.fontsize ? parseInt(u.style.fontsize) : 14) / s
              };
              if (l && v) {
                let b;
                i % 2 === 0 ? b = f[1] : b = f[0], (l.rowHeader && i === 0 || l.rowFooter && i === e.data.length - 1 || l.colHeader && k === 0 || l.colFooter && k === S.length - 1) && (b = v), x.fill = {
                  color: b.color,
                  transparency: (1 - b.alpha) * 100
                };
              }
              if ((Y = u.style) != null && Y.backcolor) {
                const b = T(u.style.backcolor);
                x.fill = {
                  color: b.color,
                  transparency: (1 - b.alpha) * 100
                };
              }
              (E = u.style) != null && E.color && (x.color = T(u.style.color).color), a.includes(`${i}_${k}`) || m.push({ text: u.text, options: x });
            }
            m.length && o.push(m);
          }
          const c = {
            x: e.left / t,
            y: e.top / t,
            w: e.width / t,
            h: e.height / t,
            colW: e.colWidths.map((i) => e.width * i / t)
          };
          e.theme && (c.fill = { color: "#ffffff" }), e.outline.width && e.outline.color && (c.border = {
            type: e.outline.style === "solid" ? "solid" : "dash",
            pt: e.outline.width / s,
            color: T(e.outline.color).color
          }), N.addTable(o, c);
        } else if (e.type === "latex") {
          const o = (((D = e.latex) == null ? void 0 : D.match(/\\\\/g)) || []).length + 1, l = e.height / s, v = Math.round(l / (o * 3)), f = e.latex ? ke(e.latex, v) : null;
          if (f)
            N.addFormula({
              omml: f,
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t,
              fontSize: v,
              align: e.align
            });
          else if (e.path) {
            const c = Se(e.path), i = e.strokeWidth || 0, S = c.minX - i, m = c.minY - i, k = c.maxX - c.minX + i * 2, u = c.maxY - c.minY + i * 2, x = "http://www.w3.org/2000/svg", b = document.createElementNS(x, "svg");
            b.setAttribute("xmlns", x), b.setAttribute("width", String(e.width)), b.setAttribute("height", String(e.height)), b.setAttribute("viewBox", `${S} ${m} ${k} ${u}`), b.setAttribute("stroke", e.color || "#000000"), b.setAttribute("stroke-width", String(i)), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round");
            const P = document.createElementNS(x, "path");
            P.setAttribute("d", e.path), b.appendChild(P);
            const ee = re(b);
            if (!ee) continue;
            const te = {
              data: ee,
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t
            };
            if (e.link) {
              const oe = M(e.link, d);
              oe && (te.hyperlink = oe);
            }
            N.addImage(te);
          }
        } else if (e.type === "video" || e.type === "audio") {
          let a = e.src;
          if (Z(e.src)) {
            const o = q.getState().tasks[e.src];
            if ((o == null ? void 0 : o.status) === "done" && o.objectUrl)
              a = o.objectUrl;
            else
              continue;
          }
          try {
            const l = await (await fetch(a)).blob(), v = await new Promise((i, S) => {
              const m = new FileReader();
              m.onloadend = () => i(m.result), m.onerror = S, m.readAsDataURL(l);
            }), f = {
              x: e.left / t,
              y: e.top / t,
              w: e.width / t,
              h: e.height / t,
              data: v,
              type: e.type
            }, c = a.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
            if (c && c[1] ? f.extn = c[1] : e.ext ? f.extn = e.ext : f.extn = e.type === "video" ? "mp4" : "mp3", e.type === "video") {
              let i, S = "poster" in e && e.poster ? e.poster : void 0;
              if (!S && Z(e.src)) {
                const m = q.getState().tasks[e.src];
                m != null && m.poster && (S = m.poster);
              }
              if (S)
                try {
                  const k = await (await fetch(S)).blob();
                  i = await new Promise((u, x) => {
                    const b = new FileReader();
                    b.onloadend = () => u(b.result), b.onerror = x, b.readAsDataURL(k);
                  });
                } catch {
                }
              if (!i)
                try {
                  i = await new Promise((m, k) => {
                    const u = document.createElement("video");
                    u.crossOrigin = "anonymous", u.muted = !0, u.preload = "auto", u.onloadeddata = () => {
                      u.currentTime = 0;
                    }, u.onseeked = () => {
                      try {
                        const x = document.createElement("canvas");
                        x.width = u.videoWidth || e.width, x.height = u.videoHeight || e.height;
                        const b = x.getContext("2d");
                        b ? (b.drawImage(u, 0, 0, x.width, x.height), m(x.toDataURL("image/png"))) : k(new Error("No canvas context")), u.src = "";
                      } catch (x) {
                        k(x);
                      }
                    }, u.onerror = () => k(new Error("Video load failed")), setTimeout(() => k(new Error("Video frame capture timeout")), 1e4), u.src = a;
                  });
                } catch {
                }
              i && (f.cover = i);
            }
            N.addMedia(f);
          } catch (o) {
            Q.warn(`Failed to embed ${e.type} element:`, o);
          }
        }
    }
  }
  return await g.write({ outputType: "blob" });
}
function je() {
  const [d, y] = ue(!1), p = ge(!1), { t: n } = me(), t = ne((C) => C.scenes), s = ne((C) => C.stage), g = le.use.viewportSize(), H = le.use.viewportRatio(), z = 96 * (g / 960), w = 96 / 72 * (g / 960), B = t.filter((C) => C.content.type === "slide"), r = B.map((C) => C.content.canvas), O = j(
    (C) => {
      p.current || r.length === 0 || (p.current = !0, y(!0), setTimeout(async () => {
        try {
          await C();
        } catch (F) {
          Q.error("Export failed:", F), W.error(n("export.exportFailed"));
        } finally {
          p.current = !1, y(!1);
        }
      }, 100));
    },
    [r.length, n]
  ), A = j(() => {
    O(async () => {
      const C = (s == null ? void 0 : s.name) || "slides", F = await pe(
        r,
        B,
        H,
        g,
        z,
        w
      );
      ie(F, `${C}.pptx`), W.success(n("export.exportSuccess"));
    });
  }, [
    O,
    r,
    B,
    s,
    g,
    H,
    z,
    w,
    n
  ]), h = j(() => {
    O(async () => {
      const C = (await import("jszip")).default, F = new C(), L = (s == null ? void 0 : s.name) || "slides", U = await pe(
        r,
        B,
        H,
        g,
        z,
        w
      );
      F.file(`${L}.pptx`, U);
      let $ = 0;
      for (const E of t)
        if (E.content.type === "interactive" && E.content.html) {
          $++;
          const D = E.title.replace(/[\\/:*?"<>|]/g, "_"), V = `interactive/${String($).padStart(2, "0")}_${D}.html`;
          F.file(V, E.content.html);
        }
      const Y = await F.generateAsync({ type: "blob" });
      ie(Y, `${L}.zip`), W.success(n("export.exportSuccess"));
    });
  }, [
    O,
    r,
    B,
    t,
    s,
    g,
    H,
    z,
    w,
    n
  ]);
  return { exporting: d, exportPPTX: A, exportResourcePack: h };
}
export {
  je as useExportPPTX
};
//# sourceMappingURL=use-export-pptx.js.map
