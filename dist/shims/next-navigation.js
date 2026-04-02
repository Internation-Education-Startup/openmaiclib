import { createContext as t, useContext as e } from "react";
const r = {
  push: (o) => {
    window.location.href = o;
  },
  back: () => {
    window.history.back();
  },
  replace: (o) => {
    window.location.replace(o);
  },
  refresh: () => {
    window.location.reload();
  },
  prefetch: () => {
  }
}, n = t(r);
function i() {
  return e(n);
}
const a = t({});
function u() {
  return e(a);
}
export {
  a as MaicParamsContext,
  n as MaicRouterContext,
  u as useParams,
  i as useRouter
};
//# sourceMappingURL=next-navigation.js.map
