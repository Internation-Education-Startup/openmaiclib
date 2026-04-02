import { ShapePathFormulasKeys as t } from "../lib/types/slides.js";
const i = {
  [t.ROUND_RECT]: {
    editable: !0,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M ${a} 0 L ${L - a} 0 Q ${L} 0 ${L} ${a} L ${L} ${e - a} Q ${L} ${e} ${L - a} ${e} L ${a} ${e} Q 0 ${e} 0 ${e - a} L 0 ${a} Q 0 0 ${a} 0 Z`;
    }
  },
  [t.CUT_RECT_DIAGONAL]: {
    editable: !0,
    defaultValue: [0.2],
    range: [[0, 0.95]],
    relative: ["right"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 ${e - a} L 0 0 L ${L - a} 0 L ${L} ${a} L ${L} ${e} L ${a} ${e} Z`;
    }
  },
  [t.CUT_RECT_SINGLE]: {
    editable: !0,
    defaultValue: [0.2],
    range: [[0, 1]],
    relative: ["right"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 ${e} L 0 0 L ${L - a} 0 L ${L} ${a} L ${L} ${e} Z`;
    }
  },
  [t.CUT_RECT_SAMESIDE]: {
    editable: !0,
    defaultValue: [0.2],
    range: [[0, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 ${a} L ${a} 0 L ${L - a} 0 L ${L} ${a} L ${L} ${e} L 0 ${e} Z`;
    }
  },
  [t.ROUND_RECT_DIAGONAL]: {
    editable: !0,
    defaultValue: [0.125],
    range: [[0, 1]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M ${a} 0 L ${L} 0 L ${L} ${e - a} Q ${L} ${e} ${L - a} ${e} L 0 ${e} L 0 ${a} Q 0 0 ${a} 0 Z`;
    }
  },
  [t.ROUND_RECT_SINGLE]: {
    editable: !0,
    defaultValue: [0.125],
    range: [[0, 1]],
    relative: ["right"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 0 L ${L - a} 0 Q ${L} 0 ${L} ${a} L ${L} ${e} L 0 ${e} L 0 0 Z`;
    }
  },
  [t.ROUND_RECT_SAMESIDE]: {
    editable: !0,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 ${a} Q 0 0 ${a} 0 L ${L - a} 0 Q ${L} 0 ${L} ${a} L ${L} ${e} L 0 ${e} Z`;
    }
  },
  [t.CUT_ROUND_RECT]: {
    editable: !0,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M ${a} 0 L ${L - a} 0 L ${L} ${a} L ${L} ${e} L 0 ${e} L 0 ${a} Q 0 0 ${a} 0 Z`;
    }
  },
  [t.MESSAGE]: {
    editable: !0,
    range: [
      [0, 0.8],
      [0.1, 0.3]
    ],
    defaultValue: [0.3, 0.2],
    relative: ["left_bottom", "bottom"],
    getBaseSize: [(L) => L, (L, e) => e],
    formula: (L, e, c) => {
      const a = L * c[0], p = L * 0.2, l = e * c[1];
      return `M 0 0 L ${L} 0 L ${L} ${e - l} L ${a + p} ${e - l} L ${a} ${e} L ${a} ${e - l} L 0 ${e - l} Z`;
    }
  },
  [t.ROUND_MESSAGE]: {
    formula: (L, e) => {
      const c = Math.min(L, e) * 0.125, a = Math.min(L, e) * 0.2, p = Math.min(L, e) * 0.2;
      return `M 0 ${c} Q 0 0 ${c} 0 L ${L - c} 0 Q ${L} 0 ${L} ${c} L ${L} ${e - c - p} Q ${L} ${e - p} ${L - c} ${e - p} L ${L / 2} ${e - p} L ${L / 2 - a} ${e} L ${L / 2 - a} ${e - p} L ${c} ${e - p} Q 0 ${e - p} 0 ${e - c - p} L 0 ${c} Z`;
    }
  },
  [t.L]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0.05, 1]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 0 L 0 ${e} L ${L} ${e} L ${L} ${e - a} L ${a} ${e - a} L ${a} 0 Z`;
    }
  },
  [t.RING_RECT]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0.05, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M 0 0 ${L} 0 ${L} ${e} L 0 ${e} L 0 0 Z M ${a} ${a} L ${a} ${e - a} L ${L - a} ${e - a} L ${L - a} ${a} Z`;
    }
  },
  [t.DONUT]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0.05, 0.5]],
    relative: ["left"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0], p = L / 2, l = e / 2, r = L / 2, M = e / 2, o = r - a, u = M - a;
      return `M ${p - r} ${l} A ${r} ${M} 0 1 1 ${p - r} ${l + 1} Z M ${p + o} ${l} A ${o} ${u} 0 1 0 ${p + o} ${l + 1} Z`;
    }
  },
  [t.DIAGSTRIPE]: {
    editable: !0,
    defaultValue: [0.5],
    range: [[0, 0.95]],
    relative: ["left"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      if (L >= e) {
        const l = L / e * a;
        return `M ${L} 0 L ${l} 0 L 0 ${a} L 0 ${e} Z`;
      }
      const p = e / L * a;
      return `M ${L} 0 L ${a} 0 L 0 ${p} L 0 ${e} Z`;
    }
  },
  [t.PLUS]: {
    editable: !0,
    defaultValue: [0.6],
    range: [[0.05, 1]],
    relative: ["center"],
    getBaseSize: [(L, e) => Math.min(L, e)],
    formula: (L, e, c) => {
      const a = Math.min(L, e) * c[0];
      return `M ${L / 2 - a / 2} 0 L ${L / 2 - a / 2} ${e / 2 - a / 2} L 0 ${e / 2 - a / 2} L 0 ${e / 2 + a / 2} L ${L / 2 - a / 2} ${e / 2 + a / 2} L ${L / 2 - a / 2} ${e} L ${L / 2 + a / 2} ${e} L ${L / 2 + a / 2} ${e / 2 + a / 2} L ${L} ${e / 2 + a / 2} L ${L} ${e / 2 - a / 2} L ${L / 2 + a / 2} ${e / 2 - a / 2} L ${L / 2 + a / 2} 0 Z`;
    }
  },
  [t.TRIANGLE]: {
    editable: !0,
    defaultValue: [0.5],
    range: [[0, 1]],
    relative: ["left"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => `M ${L * c[0]} 0 L 0 ${e} L ${L} ${e} Z`
  },
  [t.PARALLELOGRAM_LEFT]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0, 0.95]],
    relative: ["left"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => {
      const a = L * c[0];
      return `M ${a} 0 L ${L} 0 L ${L - a} ${e} L 0 ${e} Z`;
    }
  },
  [t.PARALLELOGRAM_RIGHT]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0, 0.95]],
    relative: ["right"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => {
      const a = L * c[0];
      return `M 0 0 L ${L - a} 0 L ${L} ${e} L ${a} ${e} Z`;
    }
  },
  [t.TRAPEZOID]: {
    editable: !0,
    defaultValue: [0.25],
    range: [[0, 0.5]],
    relative: ["left"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => {
      const a = L * c[0];
      return `M ${a} 0 L ${L - a} 0 L ${L} ${e} L 0 ${e} Z`;
    }
  },
  [t.BULLET]: {
    editable: !0,
    defaultValue: [0.2],
    range: [[0, 1]],
    relative: ["top"],
    getBaseSize: [(L, e) => e],
    formula: (L, e, c) => {
      const a = e * c[0];
      return `M ${L / 2} 0 L 0 ${a} L 0 ${e} L ${L} ${e} L ${L} ${a} Z`;
    }
  },
  [t.INDICATOR]: {
    editable: !0,
    defaultValue: [0.2],
    range: [[0, 0.95]],
    relative: ["right"],
    getBaseSize: [(L) => L],
    formula: (L, e, c) => {
      const a = L * c[0];
      return `M ${L} ${e / 2} L ${L - a} 0 L 0 0 L ${a} ${e / 2} L 0 ${e} L ${L - a} ${e} Z`;
    }
  }
};
t.ROUND_RECT, t.CUT_RECT_SINGLE, t.CUT_RECT_SAMESIDE, t.CUT_RECT_DIAGONAL, t.CUT_ROUND_RECT, t.ROUND_RECT_SINGLE, t.ROUND_RECT_SAMESIDE, t.ROUND_RECT_DIAGONAL, t.TRIANGLE, t.PARALLELOGRAM_LEFT, t.PARALLELOGRAM_RIGHT, t.TRAPEZOID, t.BULLET, t.INDICATOR, t.DIAGSTRIPE, t.PLUS, t.L, t.RING_RECT, t.DONUT, t.MESSAGE, t.ROUND_MESSAGE;
export {
  i as SHAPE_PATH_FORMULAS
};
//# sourceMappingURL=shapes.js.map
