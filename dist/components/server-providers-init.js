import { useEffect as t } from "react";
import { useSettingsStore as o } from "../lib/store/settings.js";
function n() {
  const r = o((e) => e.fetchServerProviders);
  return t(() => {
    r();
  }, [r]), null;
}
export {
  n as ServerProvidersInit
};
//# sourceMappingURL=server-providers-init.js.map
