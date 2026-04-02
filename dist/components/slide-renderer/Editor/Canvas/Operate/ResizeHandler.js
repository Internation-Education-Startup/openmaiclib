import { jsx as z } from "react/jsx-runtime";
import { useMemo as o } from "react";
function f({
  type: t,
  rotate: r = 0,
  style: i,
  className: u,
  onMouseDown: n
}) {
  const s = o(() => {
    const e = "rotate-";
    return r > -22.5 && r <= 22.5 ? e + "0" : r > 22.5 && r <= 67.5 ? e + "45" : r > 67.5 && r <= 112.5 ? e + "90" : r > 112.5 && r <= 157.5 ? e + "135" : r > 157.5 || r <= -157.5 ? e + "0" : r > -157.5 && r <= -112.5 ? e + "45" : r > -112.5 && r <= -67.5 ? e + "90" : r > -67.5 && r <= -22.5 ? e + "135" : e + "0";
  }, [r]), c = o(() => {
    const e = `${t}.${s}`;
    return {
      // nwse-resize (northwest-southeast)
      "left-top.rotate-0": "cursor-nwse-resize",
      "right-bottom.rotate-0": "cursor-nwse-resize",
      "left.rotate-45": "cursor-nwse-resize",
      "right.rotate-45": "cursor-nwse-resize",
      "left-bottom.rotate-90": "cursor-nwse-resize",
      "right-top.rotate-90": "cursor-nwse-resize",
      "top.rotate-135": "cursor-nwse-resize",
      "bottom.rotate-135": "cursor-nwse-resize",
      // ns-resize (north-south)
      "top.rotate-0": "cursor-ns-resize",
      "bottom.rotate-0": "cursor-ns-resize",
      "left-top.rotate-45": "cursor-ns-resize",
      "right-bottom.rotate-45": "cursor-ns-resize",
      "left.rotate-90": "cursor-ns-resize",
      "right.rotate-90": "cursor-ns-resize",
      "left-bottom.rotate-135": "cursor-ns-resize",
      "right-top.rotate-135": "cursor-ns-resize",
      // nesw-resize (northeast-southwest)
      "left-bottom.rotate-0": "cursor-nesw-resize",
      "right-top.rotate-0": "cursor-nesw-resize",
      "top.rotate-45": "cursor-nesw-resize",
      "bottom.rotate-45": "cursor-nesw-resize",
      "left-top.rotate-90": "cursor-nesw-resize",
      "right-bottom.rotate-90": "cursor-nesw-resize",
      "left.rotate-135": "cursor-nesw-resize",
      "right.rotate-135": "cursor-nesw-resize",
      // ew-resize (east-west)
      "left.rotate-0": "cursor-ew-resize",
      "right.rotate-0": "cursor-ew-resize",
      "left-bottom.rotate-45": "cursor-ew-resize",
      "right-top.rotate-45": "cursor-ew-resize",
      "top.rotate-90": "cursor-ew-resize",
      "bottom.rotate-90": "cursor-ew-resize",
      "left-top.rotate-135": "cursor-ew-resize",
      "right-bottom.rotate-135": "cursor-ew-resize"
    }[e] || "cursor-pointer";
  }, [t, s]);
  return /* @__PURE__ */ z(
    "div",
    {
      className: `resize-handler absolute w-[10px] h-[10px] left-0 top-0 m-[-5px_0_0_-5px] border border-primary bg-white rounded-[1px] ${c} ${u || ""}`,
      style: i,
      onMouseDown: n
    }
  );
}
export {
  f as ResizeHandler
};
//# sourceMappingURL=ResizeHandler.js.map
