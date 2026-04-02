import { u as i } from "../../_virtual/index.js";
import { createLogger as f } from "../logger.js";
const s = f("ProxyFetch");
function p() {
  return process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY || void 0;
}
let e = null, o;
function u() {
  const r = p();
  if (r)
    return e && o === r || (e = new i.ProxyAgent(r), o = r), e;
}
async function l(r, t) {
  const n = u(), c = r;
  return n ? (s.info("Using proxy", o, "for:", c.slice(0, 80)), await i.fetch(r, {
    ...t,
    dispatcher: n
  })) : (s.info("No proxy configured, using direct fetch for:", c.slice(0, 80)), fetch(r, t));
}
export {
  l as proxyFetch
};
//# sourceMappingURL=proxy-fetch.js.map
