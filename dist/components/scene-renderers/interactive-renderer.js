import { jsx as n } from "react/jsx-runtime";
import { useMemo as a } from "react";
function f({ content: e, mode: s, sceneId: t }) {
  const i = a(
    () => e.html ? l(e.html) : void 0,
    [e.html]
  );
  return /* @__PURE__ */ n("div", { className: "w-full h-full relative", children: /* @__PURE__ */ n(
    "iframe",
    {
      srcDoc: i,
      src: i ? void 0 : e.url,
      className: "absolute inset-0 w-full h-full border-0",
      title: `Interactive Scene ${t}`,
      sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
    }
  ) });
}
function l(e) {
  const s = `<style data-iframe-patch>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  /* Fix min-h-screen: in iframes 100vh is the iframe height, which is correct,
     but ensure body actually fills it */
  body { min-height: 100vh; }
</style>`, t = e.indexOf("<head>");
  if (t !== -1) {
    const r = t + 6;
    return e.substring(0, r) + `
` + s + e.substring(r);
  }
  const i = e.indexOf("<head ");
  if (i !== -1) {
    const r = e.indexOf(">", i);
    if (r !== -1) {
      const o = r + 1;
      return e.substring(0, o) + `
` + s + e.substring(o);
    }
  }
  return s + e;
}
export {
  f as InteractiveRenderer
};
//# sourceMappingURL=interactive-renderer.js.map
