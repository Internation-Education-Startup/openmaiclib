import { useMemo as o } from "react";
function s(t, r) {
  return {
    flipStyle: o(() => {
      let e = "";
      return t && r ? e = "rotateX(180deg) rotateY(180deg)" : r ? e = "rotateX(180deg)" : t && (e = "rotateY(180deg)"), e;
    }, [t, r])
  };
}
export {
  s as useElementFlip
};
//# sourceMappingURL=useElementFlip.js.map
