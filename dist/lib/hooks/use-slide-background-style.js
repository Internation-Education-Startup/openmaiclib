import { useMemo as d } from "react";
function k(o) {
  return {
    backgroundStyle: d(() => {
      if (!o) return { backgroundColor: "#fff" };
      const { type: n, color: c, image: a, gradient: t } = o;
      if (n === "solid") return { backgroundColor: c };
      if (n === "image" && a) {
        const { src: r, size: e } = a;
        return r ? e === "repeat" ? {
          backgroundImage: `url(${r})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain"
        } : {
          backgroundImage: `url(${r})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: e || "cover"
        } : { backgroundColor: "#fff" };
      }
      if (n === "gradient" && t) {
        const { type: r, colors: e, rotate: g } = t, u = e.map((i) => `${i.color} ${i.pos}%`);
        return r === "radial" ? { backgroundImage: `radial-gradient(${u.join(",")})` } : {
          backgroundImage: `linear-gradient(${g}deg, ${u.join(",")})`
        };
      }
      return { backgroundColor: "#fff" };
    }, [o])
  };
}
export {
  k as useSlideBackgroundStyle
};
//# sourceMappingURL=use-slide-background-style.js.map
