import { getDocumentProxy as l, extractText as w, extractImages as y } from "unpdf";
import x from "sharp";
import { PDF_PROVIDERS as _ } from "./constants.js";
import { createLogger as $ } from "../logger.js";
const u = $("PDFProviders");
async function E(t, c) {
  const p = _[t.providerId];
  if (!p)
    throw new Error(`Unknown PDF provider: ${t.providerId}`);
  if (p.requiresApiKey && !t.apiKey)
    throw new Error(`API key required for PDF provider: ${t.providerId}`);
  const s = Date.now();
  let o;
  switch (t.providerId) {
    case "unpdf":
      o = await P(c);
      break;
    case "mineru":
      o = await U(t, c);
      break;
    default:
      throw new Error(`Unsupported PDF provider: ${t.providerId}`);
  }
  return o.metadata && (o.metadata.processingTime = Date.now() - s), o;
}
async function P(t) {
  const c = new Uint8Array(t), p = await l(c), s = p.numPages, { text: o } = await w(p, {
    mergePages: !0
  }), h = [], d = [];
  let g = 0;
  for (let a = 1; a <= s; a++)
    try {
      const n = await y(p, a);
      for (let e = 0; e < n.length; e++) {
        const r = n[e];
        try {
          const i = `data:image/png;base64,${(await x(Buffer.from(r.data), {
            raw: {
              width: r.width,
              height: r.height,
              channels: r.channels
            }
          }).png().toBuffer()).toString("base64")}`;
          g++;
          const b = `img_${g}`;
          h.push(i), d.push({
            id: b,
            src: i,
            pageNumber: a,
            width: r.width,
            height: r.height
          });
        } catch (m) {
          u.error(`Failed to convert image ${e + 1} from page ${a}:`, m);
        }
      }
    } catch (n) {
      u.error(`Failed to extract images from page ${a}:`, n);
    }
  return {
    text: o,
    images: h,
    metadata: {
      pageCount: s,
      parser: "unpdf",
      imageMapping: Object.fromEntries(d.map((a) => [a.id, a.src])),
      pdfImages: d
    }
  };
}
async function U(t, c) {
  var e;
  if (!t.baseUrl)
    throw new Error(
      "MinerU base URL is required. Please deploy MinerU locally or specify the server URL. See: https://github.com/opendatalab/MinerU"
    );
  u.info("[MinerU] Parsing PDF with MinerU server:", t.baseUrl);
  const p = "document.pdf", s = new FormData(), o = c.buffer.slice(
    c.byteOffset,
    c.byteOffset + c.byteLength
  ), h = new Blob([o], {
    type: "application/pdf"
  });
  s.append("files", h, p), s.append("parse_method", "auto"), s.append("backend", "hybrid-auto-engine"), s.append("return_content_list", "true"), s.append("return_images", "true");
  const d = {};
  t.apiKey && (d.Authorization = `Bearer ${t.apiKey}`);
  const g = await fetch(`${t.baseUrl}/file_parse`, {
    method: "POST",
    headers: d,
    body: s
  });
  if (!g.ok) {
    const r = await g.text().catch(() => g.statusText);
    throw new Error(`MinerU API error (${g.status}): ${r}`);
  }
  const a = await g.json(), n = (e = a.results) == null ? void 0 : e[p];
  if (!n) {
    const r = a.results ? Object.keys(a.results) : [], m = r.length > 0 ? a.results[r[0]] : null;
    if (!m)
      throw new Error(`MinerU returned no results. Response keys: ${JSON.stringify(r)}`);
    return u.warn(`[MinerU] Filename mismatch, using key "${r[0]}" instead of "${p}"`), f(m);
  }
  return f(n);
}
function f(t) {
  const c = t.md_content || "", p = {};
  let s = 0;
  t.images && typeof t.images == "object" && Object.entries(t.images).forEach(([n, e]) => {
    p[n] = e.startsWith("data:") ? e : `data:image/png;base64,${e}`;
  });
  const o = /* @__PURE__ */ new Map(), h = typeof t.content_list == "string" ? JSON.parse(t.content_list) : t.content_list;
  if (Array.isArray(h)) {
    s = new Set(
      h.map((e) => e.page_idx).filter((e) => e != null)
    ).size;
    for (const e of h)
      if (e.type === "image" && e.img_path) {
        const r = {
          pageIdx: e.page_idx ?? 0,
          bbox: e.bbox || [0, 0, 1e3, 1e3],
          caption: Array.isArray(e.image_caption) ? e.image_caption[0] : void 0
        };
        o.set(e.img_path, r);
        const m = e.img_path.split("/").pop();
        m && m !== e.img_path && o.set(m, r);
      }
  }
  const d = {}, g = [];
  Object.entries(p).forEach(([n, e], r) => {
    const m = n.startsWith("img_") ? n : `img_${r + 1}`;
    d[m] = e;
    const i = o.get(n) || o.get(`images/${n}`);
    g.push({
      id: m,
      src: e,
      pageNumber: i ? i.pageIdx + 1 : 0,
      description: i == null ? void 0 : i.caption,
      width: i ? i.bbox[2] - i.bbox[0] : void 0,
      height: i ? i.bbox[3] - i.bbox[1] : void 0
    });
  });
  const a = Object.values(d);
  return u.info(
    `[MinerU] Parsed successfully: ${a.length} images, ${c.length} chars of markdown`
  ), {
    text: c,
    images: a,
    metadata: {
      pageCount: s,
      parser: "mineru",
      imageMapping: d,
      pdfImages: g
    }
  };
}
export {
  E as parsePDF
};
//# sourceMappingURL=pdf-providers.js.map
