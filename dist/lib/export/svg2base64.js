const h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = "data:image/svg+xml;base64,", f = (r) => {
  r = r.replace(/\r\n/g, `
`);
  let t = "";
  for (let o = 0; o < r.length; o++) {
    const e = r.charCodeAt(o);
    e < 128 ? t += String.fromCharCode(e) : e > 127 && e < 2048 ? (t += String.fromCharCode(e >> 6 | 192), t += String.fromCharCode(e & 63 | 128)) : (t += String.fromCharCode(e >> 12 | 224), t += String.fromCharCode(e >> 6 & 63 | 128), t += String.fromCharCode(e & 63 | 128));
  }
  return t;
}, i = (r) => {
  let t = "", o, e, c, C, l, s, a, n = 0;
  for (r = f(r); n < r.length; )
    o = r.charCodeAt(n++), e = r.charCodeAt(n++), c = r.charCodeAt(n++), C = o >> 2, l = (o & 3) << 4 | e >> 4, s = (e & 15) << 2 | c >> 6, a = c & 63, isNaN(e) ? s = a = 64 : isNaN(c) && (a = 64), t = t + h.charAt(C) + h.charAt(l) + h.charAt(s) + h.charAt(a);
  return t;
}, g = (r) => {
  const o = new XMLSerializer().serializeToString(r);
  return d + i(o);
};
export {
  g as svg2Base64
};
//# sourceMappingURL=svg2base64.js.map
