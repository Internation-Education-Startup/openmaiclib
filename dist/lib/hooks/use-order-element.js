function v() {
  const p = (t, i) => ({
    minLevel: t.findIndex((e) => e.id === i[0].id),
    maxLevel: t.findIndex(
      (e) => e.id === i[i.length - 1].id
    )
  });
  return {
    moveUpElement: (t, i) => {
      const e = JSON.parse(JSON.stringify(t));
      if (i.groupId) {
        const n = e.filter(
          (c) => c.groupId === i.groupId
        ), { minLevel: o, maxLevel: l } = p(t, n), s = e[l + 1], r = e.splice(o, n.length);
        if (s.groupId) {
          const c = e.filter(
            (d) => d.groupId === s.groupId
          );
          e.splice(o + c.length, 0, ...r);
        } else e.splice(o + 1, 0, ...r);
      } else {
        const n = t.findIndex((s) => s.id === i.id);
        if (n === t.length - 1) return;
        const o = e[n + 1], [l] = e.splice(n, 1);
        if (o.groupId) {
          const s = e.filter(
            (r) => r.groupId === o.groupId
          );
          e.splice(n + s.length, 0, l);
        } else e.splice(n + 1, 0, l);
      }
      return e;
    },
    moveDownElement: (t, i) => {
      const e = JSON.parse(JSON.stringify(t));
      if (i.groupId) {
        const n = e.filter(
          (r) => r.groupId === i.groupId
        ), { minLevel: o } = p(t, n);
        if (o === 0) return;
        const l = e[o - 1], s = e.splice(o, n.length);
        if (l.groupId) {
          const r = e.filter(
            (c) => c.groupId === l.groupId
          );
          e.splice(o - r.length, 0, ...s);
        } else e.splice(o - 1, 0, ...s);
      } else {
        const n = t.findIndex((s) => s.id === i.id);
        if (n === 0) return;
        const o = e[n - 1], l = e.splice(n, 1)[0];
        if (o.groupId) {
          const s = e.filter(
            (r) => r.groupId === o.groupId
          );
          e.splice(n - s.length, 0, l);
        } else e.splice(n - 1, 0, l);
      }
      return e;
    },
    moveTopElement: (t, i) => {
      const e = JSON.parse(JSON.stringify(t));
      if (i.groupId) {
        const n = e.filter(
          (r) => r.groupId === i.groupId
        ), { minLevel: o, maxLevel: l } = p(t, n);
        if (l === t.length - 1) return null;
        const s = e.splice(o, n.length);
        e.push(...s);
      } else {
        const n = t.findIndex((o) => o.id === i.id);
        if (n === t.length - 1) return null;
        e.splice(n, 1), e.push(i);
      }
      return e;
    },
    moveBottomElement: (t, i) => {
      const e = JSON.parse(JSON.stringify(t));
      if (i.groupId) {
        const n = e.filter(
          (s) => s.groupId === i.groupId
        ), { minLevel: o } = p(t, n);
        if (o === 0) return;
        const l = e.splice(o, n.length);
        e.unshift(...l);
      } else {
        const n = t.findIndex((o) => o.id === i.id);
        if (n === 0) return;
        e.splice(n, 1), e.unshift(i);
      }
      return e;
    }
  };
}
export {
  v as useOrderElement
};
//# sourceMappingURL=use-order-element.js.map
