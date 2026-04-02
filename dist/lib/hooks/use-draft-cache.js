import { useState as m, useRef as u, useEffect as i, useCallback as o } from "react";
function h({
  key: c,
  debounceMs: l = 500
}) {
  const [f] = m(() => {
    if (!(typeof window > "u"))
      try {
        const e = localStorage.getItem(c);
        if (e !== null)
          return JSON.parse(e);
      } catch {
      }
  }), r = u(null), t = u(void 0), n = u(c);
  i(() => {
    n.current = c;
  }, [c]);
  const a = o(() => {
    if (r.current !== null && (clearTimeout(r.current), r.current = null), t.current !== void 0) {
      try {
        localStorage.setItem(n.current, JSON.stringify(t.current));
      } catch {
      }
      t.current = void 0;
    }
  }, []), s = o(
    (e) => {
      t.current = e, r.current !== null && clearTimeout(r.current), r.current = setTimeout(() => {
        r.current = null;
        try {
          localStorage.setItem(n.current, JSON.stringify(e));
        } catch {
        }
        t.current = void 0;
      }, l);
    },
    [l]
  ), d = o(() => {
    r.current !== null && (clearTimeout(r.current), r.current = null), t.current = void 0;
    try {
      localStorage.removeItem(n.current);
    } catch {
    }
  }, []);
  return i(() => () => {
    a();
  }, [a]), { cachedValue: f, updateCache: s, clearCache: d };
}
export {
  h as useDraftCache
};
//# sourceMappingURL=use-draft-cache.js.map
