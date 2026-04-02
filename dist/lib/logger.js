const c = { debug: 0, info: 1, warn: 2, error: 3 };
function f() {
  const o = (process.env.LOG_LEVEL ?? "info").toLowerCase();
  return o in c ? o : "info";
}
function u() {
  return process.env.LOG_FORMAT === "json";
}
function g(o, r, n) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), s = o.toUpperCase(), i = n.map(
    (e) => e instanceof Error ? e.stack ?? e.message : typeof e == "string" ? e : JSON.stringify(e)
  ).join(" ");
  return u() ? JSON.stringify({ timestamp: t, level: s, tag: r, message: i }) : `[${t}] [${s}] [${r}] ${i}`;
}
function L(o) {
  const r = (n, t) => {
    if (c[n] < c[f()]) return;
    const s = g(n, o, t);
    (n === "debug" ? console.debug : n === "warn" ? console.warn : n === "error" ? console.error : console.log)(s);
  };
  return {
    debug: (...n) => r("debug", n),
    info: (...n) => r("info", n),
    warn: (...n) => r("warn", n),
    error: (...n) => r("error", n)
  };
}
export {
  L as createLogger
};
//# sourceMappingURL=logger.js.map
