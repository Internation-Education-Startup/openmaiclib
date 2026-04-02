function d(r) {
  let e = o(r);
  return e.toLowerCase().includes("katex") || (e = a(e)), e;
}
function o(r) {
  const e = [];
  let t = r.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (n) => (e.push(n), `__SCRIPT_BLOCK_${e.length - 1}__`));
  t = t.replace(/\$\$([^$]+)\$\$/g, "\\[$1\\]"), t = t.replace(/\$([^$\n]+?)\$/g, "\\($1\\)");
  for (let n = 0; n < e.length; n++) {
    const i = `__SCRIPT_BLOCK_${n}__`, s = t.indexOf(i);
    s !== -1 && (t = t.substring(0, s) + e[n] + t.substring(s + i.length));
  }
  return t;
}
function a(r) {
  const e = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"><\/script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const katexOptions = {
        delimiters: [
            {left: '\\\\[', right: '\\\\]', display: true},
            {left: '\\\\(', right: '\\\\)', display: false},
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false,
        strict: false,
        trust: true
    };

    let renderTimeout;
    function safeRender() {
        if (renderTimeout) clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            renderMathInElement(document.body, katexOptions);
        }, 100);
    }

    renderMathInElement(document.body, katexOptions);

    const observer = new MutationObserver((mutations) => {
        let shouldRender = false;
        mutations.forEach((mutation) => {
            if (mutation.target &&
                mutation.target.className &&
                typeof mutation.target.className === 'string' &&
                mutation.target.className.includes('katex')) {
                return;
            }
            shouldRender = true;
        });

        if (shouldRender) {
            safeRender();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    setInterval(() => {
        const text = document.body.innerText;
        if (text.includes('\\\\(') || text.includes('$$')) {
            safeRender();
        }
    }, 2000);
});
<\/script>`, t = r.indexOf("</head>");
  if (t !== -1)
    return r.substring(0, t) + e + `
</head>` + r.substring(t + 7);
  const n = r.indexOf("</body>");
  return n !== -1 ? r.substring(0, n) + e + `
</body>` + r.substring(n + 7) : r + e;
}
export {
  d as postProcessInteractiveHtml
};
//# sourceMappingURL=interactive-post-processor.js.map
