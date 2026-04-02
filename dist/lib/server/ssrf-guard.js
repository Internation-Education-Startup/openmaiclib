function e(s) {
  if (!s.startsWith("172.")) return !1;
  const r = parseInt(s.split(".")[1], 10);
  return r >= 16 && r <= 31;
}
function a(s) {
  let r;
  try {
    r = new URL(s);
  } catch {
    return "Invalid URL";
  }
  if (r.protocol !== "https:" && r.protocol !== "http:")
    return "Only HTTP(S) URLs are allowed";
  const t = r.hostname.toLowerCase();
  return t === "localhost" || t === "127.0.0.1" || t === "::1" || t === "0.0.0.0" || t.startsWith("10.") || t.startsWith("192.168.") || t.startsWith("169.254.") || e(t) || t.endsWith(".local") || t.startsWith("fd") || t.startsWith("fe80") ? "Local/private network URLs are not allowed" : null;
}
export {
  a as validateUrlForSSRF
};
//# sourceMappingURL=ssrf-guard.js.map
