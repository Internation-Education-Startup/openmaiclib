import { useMemo as r } from "react";
import { OperateResizeHandlers as p, OperateBorderLines as o } from "../../../../../lib/types/edit.js";
function c(e, t) {
  const l = r(() => [
    { direction: p.LEFT_TOP, style: {} },
    {
      direction: p.TOP,
      style: { left: e / 2 + "px" }
    },
    {
      direction: p.RIGHT_TOP,
      style: { left: e + "px" }
    },
    {
      direction: p.LEFT,
      style: { top: t / 2 + "px" }
    },
    {
      direction: p.RIGHT,
      style: { left: e + "px", top: t / 2 + "px" }
    },
    {
      direction: p.LEFT_BOTTOM,
      style: { top: t + "px" }
    },
    {
      direction: p.BOTTOM,
      style: { left: e / 2 + "px", top: t + "px" }
    },
    {
      direction: p.RIGHT_BOTTOM,
      style: { left: e + "px", top: t + "px" }
    }
  ], [e, t]), n = r(() => [
    {
      direction: p.LEFT,
      style: { top: t / 2 + "px" }
    },
    {
      direction: p.RIGHT,
      style: { left: e + "px", top: t / 2 + "px" }
    }
  ], [e, t]), s = r(() => [
    {
      direction: p.TOP,
      style: { left: e / 2 + "px" }
    },
    {
      direction: p.BOTTOM,
      style: { left: e / 2 + "px", top: t + "px" }
    }
  ], [e, t]), x = r(() => [
    { type: o.T, style: { width: e + "px" } },
    {
      type: o.B,
      style: { top: t + "px", width: e + "px" }
    },
    { type: o.L, style: { height: t + "px" } },
    {
      type: o.R,
      style: { left: e + "px", height: t + "px" }
    }
  ], [e, t]);
  return {
    resizeHandlers: l,
    textElementResizeHandlers: n,
    verticalTextElementResizeHandlers: s,
    borderLines: x
  };
}
export {
  c as useCommonOperate
};
//# sourceMappingURL=useCommonOperate.js.map
