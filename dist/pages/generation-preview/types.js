import { ScanLine as i, Search as r, Bot as a, FileText as g, LayoutPanelLeft as o, Clapperboard as c } from "lucide-react";
import { useSettingsStore as d } from "../../lib/store/settings.js";
const l = [
  {
    id: "pdf-analysis",
    title: "generation.analyzingPdf",
    description: "generation.analyzingPdfDesc",
    icon: i,
    type: "analysis"
  },
  {
    id: "web-search",
    title: "generation.webSearching",
    description: "generation.webSearchingDesc",
    icon: r,
    type: "analysis"
  },
  {
    id: "agent-generation",
    title: "generation.agentGeneration",
    description: "generation.agentGenerationDesc",
    icon: a,
    type: "writing"
  },
  {
    id: "outline",
    title: "generation.generatingOutlines",
    description: "generation.generatingOutlinesDesc",
    icon: g,
    type: "writing"
  },
  {
    id: "slide-content",
    title: "generation.generatingSlideContent",
    description: "generation.generatingSlideContentDesc",
    icon: o,
    type: "visual"
  },
  {
    id: "actions",
    title: "generation.generatingActions",
    description: "generation.generatingActionsDesc",
    icon: c,
    type: "visual"
  }
], y = (e) => l.filter((t) => {
  var n;
  return t.id === "pdf-analysis" ? !!(e != null && e.pdfStorageKey) : t.id === "web-search" ? !!((n = e == null ? void 0 : e.requirements) != null && n.webSearch) : t.id === "agent-generation" ? d.getState().agentMode === "auto" : !0;
});
export {
  l as ALL_STEPS,
  y as getActiveSteps
};
//# sourceMappingURL=types.js.map
