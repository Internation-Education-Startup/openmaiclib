import { jsx as b } from "react/jsx-runtime";
import { useRef as h, useMemo as o, useEffect as g } from "react";
import d from "tinycolor2";
import { getChartOption as v } from "./chartOption.js";
import * as p from "echarts/core";
import { BarChart as O, LineChart as z, PieChart as k, ScatterChart as L, RadarChart as _ } from "echarts/charts";
import { LegendComponent as j } from "echarts/components";
import { SVGRenderer as x } from "echarts/renderers";
p.use([
  O,
  z,
  k,
  L,
  _,
  j,
  x
]);
function q({
  width: B,
  height: C,
  type: s,
  data: f,
  themeColors: e,
  textColor: l,
  lineColor: a,
  options: n
}) {
  const u = h(null), c = h(null), m = o(() => {
    let t = [];
    if (e.length >= 10)
      t = e;
    else if (e.length === 1)
      t = d(e[0]).analogous(10).map((r) => r.toRgbString());
    else {
      const r = e.length, R = d(e[r - 1]).analogous(11 - r).map((S) => S.toRgbString());
      t = [...e.slice(0, r - 1), ...R];
    }
    return t;
  }, [e]), i = o(() => () => {
    if (!c.current) return;
    const t = v({
      type: s,
      data: f,
      themeColors: m,
      textColor: l,
      lineColor: a,
      lineSmooth: (n == null ? void 0 : n.lineSmooth) || !1,
      stack: (n == null ? void 0 : n.stack) || !1
    });
    t && c.current.setOption(t, !0);
  }, [s, f, m, l, a, n]);
  return g(() => {
    if (!u.current) return;
    c.current = p.init(u.current, null, {
      renderer: "svg"
    }), i();
    const t = new ResizeObserver(() => {
      var r;
      (r = c.current) == null || r.resize();
    });
    return t.observe(u.current), () => {
      var r;
      t.disconnect(), (r = c.current) == null || r.dispose(), c.current = null;
    };
  }, []), g(() => {
    i();
  }, [i]), /* @__PURE__ */ b("div", { ref: u, className: "chart w-full h-full" });
}
export {
  q as Chart
};
//# sourceMappingURL=Chart.js.map
