import { jsx as l } from "react/jsx-runtime";
import { createContext as u, useState as c, useEffect as o, useContext as f } from "react";
const h = u(void 0);
function T({ children: t }) {
  const [s, m] = c("system"), [d, n] = c("light"), r = s === "system" ? d : s;
  o(() => {
    const e = localStorage.getItem("theme");
    e && ["light", "dark", "system"].includes(e) && m(e), n(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []), o(() => {
    const e = document.documentElement;
    r === "dark" ? e.classList.add("dark") : e.classList.remove("dark");
  }, [r]), o(() => {
    const e = window.matchMedia("(prefers-color-scheme: dark)"), a = () => {
      n(e.matches ? "dark" : "light");
    };
    return e.addEventListener("change", a), () => e.removeEventListener("change", a);
  }, []);
  const i = (e) => {
    m(e), localStorage.setItem("theme", e);
  };
  return /* @__PURE__ */ l(h.Provider, { value: { theme: s, setTheme: i, resolvedTheme: r }, children: t });
}
function k() {
  const t = f(h);
  if (!t)
    throw new Error("useTheme must be used within ThemeProvider");
  return t;
}
export {
  T as ThemeProvider,
  k as useTheme
};
//# sourceMappingURL=use-theme.js.map
