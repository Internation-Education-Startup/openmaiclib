import { db as c } from "./database.js";
import { nanoid as m } from "nanoid";
import { createLogger as g } from "../logger.js";
const l = g("ImageStorage");
function p(o) {
  const e = o.split(","), a = e[0].match(/:(.*?);/), t = a ? a[1] : "image/png", n = e[1], r = atob(n), d = new ArrayBuffer(r.length), i = new Uint8Array(d);
  for (let s = 0; s < r.length; s++)
    i[s] = r.charCodeAt(s);
  return new Blob([i], { type: t });
}
async function f(o) {
  return new Promise((e, a) => {
    const t = new FileReader();
    t.onloadend = () => e(t.result), t.onerror = a, t.readAsDataURL(o);
  });
}
async function w(o) {
  const e = m(10), a = [];
  for (const t of o)
    try {
      const n = p(t.src), r = t.src.match(/data:(.*?);/), d = r ? r[1] : "image/png", i = `session_${e}_${t.id}`, s = {
        id: i,
        blob: n,
        filename: `${t.id}.png`,
        mimeType: d,
        size: n.size,
        createdAt: Date.now()
      };
      await c.imageFiles.put(s), a.push(i);
    } catch (n) {
      l.error(`Failed to store image ${t.id}:`, n);
    }
  return a;
}
async function h(o) {
  const e = {};
  for (const a of o)
    try {
      const t = await c.imageFiles.get(a);
      if (t) {
        const n = await f(t.blob), r = a.replace(/^session_[^_]+_/, "");
        e[r] = n;
      }
    } catch (t) {
      l.error(`Failed to load image ${a}:`, t);
    }
  return e;
}
async function B(o = 24) {
  try {
    const e = Date.now() - o * 60 * 60 * 1e3;
    await c.imageFiles.where("createdAt").below(e).delete(), l.info(`Cleaned up images older than ${o} hours`);
  } catch (e) {
    l.error("Failed to cleanup old images:", e);
  }
}
async function F(o) {
  const e = `pdf_${m(10)}`, a = new Blob([await o.arrayBuffer()], {
    type: o.type || "application/pdf"
  }), t = {
    id: e,
    blob: a,
    filename: o.name,
    mimeType: o.type || "application/pdf",
    size: a.size,
    createdAt: Date.now()
  };
  return await c.imageFiles.put(t), e;
}
async function I(o) {
  const e = await c.imageFiles.get(o);
  return (e == null ? void 0 : e.blob) ?? null;
}
export {
  B as cleanupOldImages,
  h as loadImageMapping,
  I as loadPdfBlob,
  w as storeImages,
  F as storePdfBlob
};
//# sourceMappingURL=image-storage.js.map
