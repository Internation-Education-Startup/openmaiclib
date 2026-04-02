import { useMemo as u } from "react";
function c(e) {
  return {
    shadowStyle: u(() => {
      if (e) {
        const { h: r, v: t, blur: o, color: n } = e;
        return `${r}px ${t}px ${o}px ${n}`;
      }
      return "";
    }, [e])
  };
}
export {
  c as useElementShadow
};
//# sourceMappingURL=useElementShadow.js.map
