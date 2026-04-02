import { useMemo as o } from "react";
function n(t) {
  return {
    filter: o(() => {
      if (!t) return "";
      let e = "";
      for (const r of Object.values(t))
        e += `${r.type}(${r.value}) `;
      return e.trim();
    }, [t])
  };
}
export {
  n as useFilter
};
//# sourceMappingURL=useFilter.js.map
