import { jsx as d } from "react/jsx-runtime";
import { cn as t } from "../../lib/utils/cn.js";
function i({
  className: a,
  size: r = "default",
  ...e
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      "data-slot": "card",
      "data-size": r,
      className: t(
        "ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
        a
      ),
      ...e
    }
  );
}
function n({ className: a, ...r }) {
  return /* @__PURE__ */ d(
    "div",
    {
      "data-slot": "card-header",
      className: t(
        "gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        a
      ),
      ...r
    }
  );
}
function c({ className: a, ...r }) {
  return /* @__PURE__ */ d(
    "div",
    {
      "data-slot": "card-title",
      className: t(
        "text-base leading-normal font-medium group-data-[size=sm]/card:text-sm",
        a
      ),
      ...r
    }
  );
}
function l({ className: a, ...r }) {
  return /* @__PURE__ */ d(
    "div",
    {
      "data-slot": "card-content",
      className: t("px-6 group-data-[size=sm]/card:px-4", a),
      ...r
    }
  );
}
export {
  i as Card,
  l as CardContent,
  n as CardHeader,
  c as CardTitle
};
//# sourceMappingURL=card.js.map
