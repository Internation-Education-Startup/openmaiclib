var n = /* @__PURE__ */ (($) => ($.RECT = "rect", $.ELLIPSE = "ellipse", $.POLYGON = "polygon", $))(n || {});
const o = {
  rect: {
    name: "矩形",
    type: "rect",
    radius: "0",
    style: ""
  },
  rect2: {
    name: "矩形2",
    type: "polygon",
    style: "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 0 100%)",
    createPath: ($, e) => `M 0 0 L ${$ * 0.8} 0 L ${$} ${e * 0.2} L ${$} ${e} L 0 ${e} Z`
  },
  rect3: {
    name: "矩形3",
    type: "polygon",
    style: "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 20% 100%, 0% 80%)",
    createPath: ($, e) => `M 0 0 L ${$ * 0.8} 0 L ${$} ${e * 0.2} L ${$} ${e} L ${$ * 0.2} ${e} L 0 ${e * 0.8} Z`
  },
  roundRect: {
    name: "圆角矩形",
    type: "rect",
    radius: "10px",
    style: "inset(0 round 10px)"
  },
  ellipse: {
    name: "圆形",
    type: "ellipse",
    style: "ellipse(50% 50% at 50% 50%)"
  },
  triangle: {
    name: "三角形",
    type: "polygon",
    style: "polygon(50% 0%, 0% 100%, 100% 100%)",
    createPath: ($, e) => `M ${$ * 0.5} 0 L 0 ${e} L ${$} ${e} Z`
  },
  triangle2: {
    name: "三角形2",
    type: "polygon",
    style: "polygon(50% 100%, 0% 0%, 100% 0%)",
    createPath: ($, e) => `M ${$ * 0.5} ${e} L 0 0 L ${$} 0 Z`
  },
  triangle3: {
    name: "三角形3",
    type: "polygon",
    style: "polygon(0% 0%, 0% 100%, 100% 100%)",
    createPath: ($, e) => `M 0 0 L 0 ${e} L ${$} ${e} Z`
  },
  rhombus: {
    name: "菱形",
    type: "polygon",
    style: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    createPath: ($, e) => `M ${$ * 0.5} 0 L ${$} ${e * 0.5} L ${$ * 0.5} ${e} L 0 ${e * 0.5} Z`
  },
  pentagon: {
    name: "五边形",
    type: "polygon",
    style: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    createPath: ($, e) => `M ${$ * 0.5} 0 L ${$} ${0.38 * e} L ${0.82 * $} ${e} L ${0.18 * $} ${e} L 0 ${0.38 * e} Z`
  },
  hexagon: {
    name: "六边形",
    type: "polygon",
    style: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
    createPath: ($, e) => `M ${$ * 0.2} 0 L ${$ * 0.8} 0 L ${$} ${e * 0.5} L ${$ * 0.8} ${e} L ${$ * 0.2} ${e} L 0 ${e * 0.5} Z`
  },
  heptagon: {
    name: "七边形",
    type: "polygon",
    style: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
    createPath: ($, e) => `M ${$ * 0.5} 0 L ${$ * 0.9} ${e * 0.2} L ${$} ${e * 0.6} L ${$ * 0.75} ${e} L ${$ * 0.25} ${e} L 0 ${e * 0.6} L ${$ * 0.1} ${e * 0.2} Z`
  },
  octagon: {
    name: "八边形",
    type: "polygon",
    style: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    createPath: ($, e) => `M ${$ * 0.3} 0 L ${$ * 0.7} 0 L ${$} ${e * 0.3} L ${$} ${e * 0.7} L ${$ * 0.7} ${e} L ${$ * 0.3} ${e} L 0 ${e * 0.7} L 0 ${e * 0.3} Z`
  },
  chevron: {
    name: "V形",
    type: "polygon",
    style: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
    createPath: ($, e) => `M ${$ * 0.75} 0 L ${$} ${e * 0.5} L ${$ * 0.75} ${e} L 0 ${e} L ${$ * 0.25} ${e * 0.5} L 0 0 Z`
  },
  point: {
    name: "点",
    type: "polygon",
    style: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
    createPath: ($, e) => `M 0 0 L ${$ * 0.75} 0 L ${$} ${e * 0.5} L ${$ * 0.75} ${e} L 0 ${e} Z`
  },
  arrow: {
    name: "箭头",
    type: "polygon",
    style: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
    createPath: ($, e) => `M 0 ${e * 0.2} L ${$ * 0.6} ${e * 0.2} L ${$ * 0.6} 0 L ${$} ${e * 0.5} L ${$ * 0.6} ${e} L ${$ * 0.6} ${e * 0.8} L 0 ${e * 0.8} Z`
  },
  parallelogram: {
    name: "平行四边形",
    type: "polygon",
    style: "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)",
    createPath: ($, e) => `M ${$ * 0.3} 0 L ${$} 0 L ${$ * 0.7} ${e} L 0 ${e} Z`
  },
  parallelogram2: {
    name: "平行四边形2",
    type: "polygon",
    style: "polygon(30% 100%, 100% 100%, 70% 0%, 0% 0%)",
    createPath: ($, e) => `M ${$ * 0.3} ${e} L ${$} ${e} L ${$ * 0.7} 0 L 0 0 Z`
  },
  trapezoid: {
    name: "梯形",
    type: "polygon",
    style: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
    createPath: ($, e) => `M ${$ * 0.25} 0 L ${$ * 0.75} 0 L ${$} ${e} L 0 ${e} Z`
  },
  trapezoid2: {
    name: "梯形2",
    type: "polygon",
    style: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)",
    createPath: ($, e) => `M 0 0 L ${$} 0 L ${$ * 0.75} ${e} L ${$ * 0.25} ${e} Z`
  }
};
export {
  o as CLIPPATHS,
  n as ClipPathTypes
};
//# sourceMappingURL=image-clip.js.map
