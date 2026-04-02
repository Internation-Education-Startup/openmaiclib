import { useEffect as s } from "react";
import { useCanvasStore as a } from "../../../../../lib/store/canvas.js";
import "../../../../../lib/store/snapshot.js";
import "../../../../../lib/store/keyboard.js";
import "../../../../../lib/store/stage.js";
import "../../../../../lib/store/settings.js";
import "../../../../../lib/contexts/scene-context.js";
function L(d) {
  const o = a.use.disableHotkeys();
  s(() => {
    const r = d.current, i = (t) => {
      if (!t.dataTransfer || t.dataTransfer.items.length === 0 || o) return;
      const n = t.dataTransfer.items[0];
      n && n.kind === "string" && n.type === "text/plain" && n.getAsString((m) => {
      });
    }, e = (t) => t.preventDefault();
    return r && r.addEventListener("drop", i), document.addEventListener("dragleave", e), document.addEventListener("drop", e), document.addEventListener("dragenter", e), document.addEventListener("dragover", e), () => {
      r && r.removeEventListener("drop", i), document.removeEventListener("dragleave", e), document.removeEventListener("drop", e), document.removeEventListener("dragenter", e), document.removeEventListener("dragover", e);
    };
  }, [d, o]);
}
export {
  L as useDrop
};
//# sourceMappingURL=useDrop.js.map
