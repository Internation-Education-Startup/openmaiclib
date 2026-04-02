import _ from "crypto";
const $ = "kling-v2-6", y = "https://api-beijing.klingai.com", w = 5e3, g = 120, k = 1800;
function l(t) {
  return (Buffer.isBuffer(t) ? t : Buffer.from(t, "utf-8")).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function E(t, r) {
  const a = Math.floor(Date.now() / 1e3), e = l(JSON.stringify({ alg: "HS256", typ: "JWT" })), o = l(
    JSON.stringify({
      iss: t,
      exp: a + k,
      nbf: a - 5,
      iat: a
    })
  ), n = l(
    _.createHmac("sha256", r).update(`${e}.${o}`).digest()
  );
  return `${e}.${o}.${n}`;
}
function K(t) {
  const r = t.indexOf(":");
  if (r <= 0)
    throw new Error('Kling apiKey must be "accessKey:secretKey" format');
  return {
    accessKey: t.slice(0, r),
    secretKey: t.slice(r + 1)
  };
}
function b(t) {
  switch (t) {
    case "9:16":
      return { width: 720, height: 1280 };
    case "1:1":
      return { width: 1080, height: 1080 };
    case "4:3":
      return { width: 1024, height: 768 };
    default:
      return { width: 1280, height: 720 };
  }
}
async function T(t, r, a, e) {
  var c;
  const o = {
    model_name: a,
    prompt: e.prompt,
    negative_prompt: "",
    mode: "pro"
  };
  e.duration && (o.duration = String(e.duration)), e.aspectRatio && (o.aspect_ratio = e.aspectRatio);
  const n = await fetch(`${t}/v1/videos/text2video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${r}`
    },
    body: JSON.stringify(o)
  });
  if (!n.ok) {
    const u = await n.text();
    throw new Error(`Kling submit failed (${n.status}): ${u}`);
  }
  const s = await n.json();
  if (s.code !== 0)
    throw new Error(`Kling submit error ${s.code}: ${s.message}`);
  if (!((c = s.data) != null && c.task_id))
    throw new Error("Kling returned empty task_id");
  return s.data.task_id;
}
async function S(t, r, a) {
  const e = await fetch(`${t}/v1/videos/text2video/${a}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${r}` }
  });
  if (!e.ok) {
    const n = await e.text();
    throw new Error(`Kling poll failed (${e.status}): ${n}`);
  }
  const o = await e.json();
  if (o.code !== 0)
    throw new Error(`Kling poll error ${o.code}: ${o.message}`);
  return o.data;
}
async function L(t, r) {
  var u, f;
  const a = t.model || $, e = t.baseUrl || y, { accessKey: o, secretKey: n } = K(t.apiKey), s = E(o, n), c = await T(e, s, a, r);
  for (let h = 0; h < g; h++) {
    await new Promise((i) => setTimeout(i, w));
    const d = await S(e, s, c);
    if (d.task_status === "succeed") {
      const i = (f = (u = d.task_result) == null ? void 0 : u.videos) == null ? void 0 : f[0];
      if (!(i != null && i.url))
        throw new Error("Kling task succeeded but no video URL returned");
      const { width: m, height: p } = b(r.aspectRatio);
      return {
        url: i.url,
        duration: Number(i.duration) || r.duration || 5,
        width: m,
        height: p
      };
    }
    if (d.task_status === "failed")
      throw new Error(
        `Kling video generation failed: ${d.task_status_msg || "Unknown error"}`
      );
  }
  throw new Error(
    `Kling video generation timed out after ${g * w / 1e3}s (task: ${c})`
  );
}
export {
  L as generateWithKling
};
//# sourceMappingURL=kling-adapter.js.map
