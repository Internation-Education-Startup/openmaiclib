import { createLogger as g } from "../logger.js";
const d = g("TTS"), T = {
  "glm-tts": 1024
};
function m(o, n) {
  const r = o.trim();
  if (!r || r.length <= n) return [r];
  const i = r.split(new RegExp("(?<=[。！？!?；;：:\\n])", "u")).map((e) => e.trim()).filter(Boolean), f = [];
  let t = "";
  const l = (e) => {
    const s = e.trim();
    s && f.push(s);
  }, p = (e) => {
    if (!t) {
      t = e;
      return;
    }
    if ((t + e).length <= n) {
      t += e;
      return;
    }
    l(t), t = e;
  }, c = (e) => {
    const s = e.split(new RegExp("(?<=[，,、])", "u")).filter(Boolean);
    if (s.length > 1) {
      for (const h of s)
        h.length <= n ? p(h) : c(h);
      return;
    }
    let u = 0;
    for (; u < e.length; )
      p(e.slice(u, u + n)), u += n;
  };
  for (const e of i.length > 0 ? i : [r])
    e.length <= n ? p(e) : c(e);
  return l(t), f;
}
function _(o, n) {
  const r = T[n];
  if (!r) return o;
  let i = !1;
  const f = o.flatMap((t) => {
    if (t.type !== "speech" || !t.text || t.text.length <= r)
      return [t];
    const l = m(t.text, r);
    if (l.length <= 1) return [t];
    i = !0;
    const { audioId: p, ...c } = t;
    return d.info(
      `Split speech for ${n}: action=${t.id}, len=${t.text.length}, chunks=${l.length}`
    ), l.map((e, s) => ({
      ...c,
      id: `${t.id}_tts_${s + 1}`,
      text: e
    }));
  });
  return i ? f : o;
}
export {
  T as TTS_MAX_TEXT_LENGTH,
  _ as splitLongSpeechActions,
  m as splitLongSpeechText
};
//# sourceMappingURL=tts-utils.js.map
