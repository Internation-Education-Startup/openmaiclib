import { jsx as u } from "react/jsx-runtime";
import { createContext as m, useContext as f, useState as d, useEffect as I } from "react";
import { translate as S } from "../i18n/index.js";
import { defaultLocale as g } from "../i18n/types.js";
const n = "locale", h = ["zh-CN", "en-US"], a = m(void 0);
function E({ children: e }) {
  const [s, o] = d(g);
  I(() => {
    var t;
    try {
      const r = localStorage.getItem(n);
      if (r && h.includes(r)) {
        o(r);
        return;
      }
      const c = (t = navigator.language) != null && t.startsWith("zh") ? "zh-CN" : "en-US";
      localStorage.setItem(n, c), o(c);
    } catch {
    }
  }, []);
  const i = (t) => {
    o(t), localStorage.setItem(n, t);
  }, l = (t) => S(s, t);
  return /* @__PURE__ */ u(a.Provider, { value: { locale: s, setLocale: i, t: l }, children: e });
}
function p() {
  const e = f(a);
  if (!e)
    throw new Error("useI18n must be used within I18nProvider");
  return e;
}
export {
  E as I18nProvider,
  p as useI18n
};
//# sourceMappingURL=use-i18n.js.map
