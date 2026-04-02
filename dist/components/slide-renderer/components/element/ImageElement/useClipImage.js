import { useMemo as o } from "react";
import { ClipPathTypes as n, CLIPPATHS as c } from "../../../../../configs/image-clip.js";
function g(i) {
  const a = o(() => {
    let t = c.rect;
    if (i.clip) {
      const p = i.clip.shape || n.RECT;
      t = c[p];
    }
    return t.radius !== void 0 && i.radius && (t = {
      ...t,
      radius: `${i.radius}px`,
      style: `inset(0 round ${i.radius}px)`
    }), t;
  }, [i.clip, i.radius]), h = o(() => {
    if (!i.clip || !i.clip.range)
      return {
        top: "0",
        left: "0",
        width: "100%",
        height: "100%"
      };
    const [t, p] = i.clip.range, r = (p[0] - t[0]) / 100, s = (p[1] - t[1]) / 100, u = t[0] / r, d = t[1] / s;
    return {
      left: -u + "%",
      top: -d + "%",
      width: 100 / r + "%",
      height: 100 / s + "%"
    };
  }, [i.clip]);
  return {
    clipShape: a,
    imgPosition: h
  };
}
export {
  g as useClipImage
};
//# sourceMappingURL=useClipImage.js.map
