const _ = "https://api.minimaxi.com";
async function h(t, s) {
  var u, l, d;
  const c = (t.baseUrl || _).replace(/\/$/, ""), n = t.model || "MiniMax-Hailuo-2.3", e = s.duration || 6, r = {
    "720p": "720P",
    "1080p": "1080P"
  }[s.resolution || ""] || "768P", a = await fetch(`${c}/v1/video_generation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: n,
      prompt: s.prompt,
      duration: e,
      resolution: r,
      prompt_optimizer: !1
    })
  });
  if (!a.ok) {
    const w = await a.text().catch(() => a.statusText);
    throw new Error(`MiniMax Video submit error: ${w}`);
  }
  const i = await a.json();
  if (((u = i.base_resp) == null ? void 0 : u.status_code) !== 0) {
    const w = (l = i.base_resp) == null ? void 0 : l.status_code, p = ((d = i.base_resp) == null ? void 0 : d.status_msg) || "unknown error";
    throw new Error(`MiniMax Video API error ${w}: ${p}`);
  }
  if (!i.task_id)
    throw new Error(`MiniMax Video: no task_id returned. Response: ${JSON.stringify(i)}`);
  return i.task_id;
}
async function M(t, s) {
  const n = `${(t.baseUrl || _).replace(/\/$/, "")}/v1/query/video_generation?task_id=${encodeURIComponent(s)}`, e = await fetch(n, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${t.apiKey}`
    }
  });
  if (!e.ok) {
    const o = await e.text().catch(() => e.statusText);
    throw new Error(`MiniMax Video poll error: ${o}`);
  }
  return e.json();
}
async function f(t, s) {
  var a, i, u, l;
  const n = `${(t.baseUrl || _).replace(/\/$/, "")}/v1/files/retrieve?file_id=${encodeURIComponent(s)}`, e = await fetch(n, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${t.apiKey}`
    }
  });
  if (!e.ok) {
    const d = await e.text().catch(() => e.statusText);
    throw new Error(`MiniMax Video file retrieve error: ${d}`);
  }
  const o = await e.json();
  if (((a = o.base_resp) == null ? void 0 : a.status_code) !== 0) {
    const d = (i = o.base_resp) == null ? void 0 : i.status_code, w = ((u = o.base_resp) == null ? void 0 : u.status_msg) || "unknown error";
    throw new Error(`MiniMax Video file retrieve error ${d}: ${w}`);
  }
  const r = (l = o.file) == null ? void 0 : l.download_url;
  if (!r)
    throw new Error(`MiniMax Video: no download_url returned. Response: ${JSON.stringify(o)}`);
  return r;
}
async function m(t, s) {
  var o;
  const c = await h(t, s);
  let n = "", e = 0;
  for (; e < 120; ) {
    await new Promise((a) => setTimeout(a, 5e3));
    const r = await M(t, c);
    if (n = r.status, r.status === "Success") {
      if (!r.file_id)
        throw new Error("MiniMax Video: task succeeded but no file_id returned");
      return {
        url: await f(t, r.file_id),
        width: r.video_width || 1920,
        height: r.video_height || 1080,
        duration: s.duration || 6
      };
    }
    if (r.status === "Fail")
      throw new Error(
        `MiniMax Video generation failed: ${((o = r.base_resp) == null ? void 0 : o.status_msg) || "unknown"}`
      );
    e++;
  }
  throw new Error(
    `MiniMax Video: timeout after 120 polls, last status: ${n}`
  );
}
export {
  m as generateWithMiniMaxVideo
};
//# sourceMappingURL=minimax-video-adapter.js.map
