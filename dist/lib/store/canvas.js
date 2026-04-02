import { create as o } from "zustand";
import { createSelectors as r } from "../utils/create-selectors.js";
import { defaultRichTextAttrs as s } from "../prosemirror/utils.js";
const a = {
  // Element selection
  activeElementIdList: [],
  handleElementId: "",
  activeGroupElementId: "",
  editingElementId: "",
  hiddenElementIdList: [],
  // Canvas viewport
  canvasScale: 1,
  canvasPercentage: 90,
  viewportSize: 1e3,
  viewportRatio: 0.5625,
  // 16:9
  canvasDragged: !1,
  // Display aids
  showRuler: !1,
  gridLineSize: 0,
  // Toolbar and panels
  toolbarState: "ai",
  showSelectPanel: !1,
  showSearchPanel: !1,
  // Element creation
  creatingElement: null,
  creatingCustomShape: !1,
  // Editing state
  isScaling: !1,
  clipingImageElementId: "",
  richTextAttrs: s,
  // Format painter
  textFormatPainter: null,
  shapeFormatPainter: null,
  // Video playback
  playingVideoElementId: "",
  // Whiteboard
  whiteboardOpen: !1,
  whiteboardClearing: !1,
  // Other: false,
  editorAreaFocus: !1,
  thumbnailsFocus: !1,
  disableHotkeys: !1,
  selectedTableCells: [],
  // Teaching features
  spotlightElementId: "",
  spotlightOptions: null,
  spotlightMode: "pixel",
  spotlightPercentageGeometry: null,
  highlightedElementIds: [],
  highlightOptions: null,
  laserElementId: "",
  laserOptions: null,
  zoomTarget: null
}, d = o((t, i) => ({
  ...a,
  // ===== Element Selection Actions =====
  setActiveElementIdList: (e) => {
    t({ activeElementIdList: e }), e.length === 1 ? t({ handleElementId: e[0] }) : e.length === 0 && t({ handleElementId: "" }), e.length > 0 && t({ toolbarState: "design" });
  },
  setHandleElementId: (e) => t({ handleElementId: e }),
  setActiveGroupElementId: (e) => t({ activeGroupElementId: e }),
  setEditingElementId: (e) => t({ editingElementId: e }),
  setHiddenElementIdList: (e) => t({ hiddenElementIdList: e }),
  clearSelection: () => {
    t({
      activeElementIdList: [],
      handleElementId: "",
      activeGroupElementId: "",
      editingElementId: ""
    });
  },
  // ===== Canvas Viewport Actions =====
  setCanvasScale: (e) => t({ canvasScale: e }),
  setCanvasPercentage: (e) => t({ canvasPercentage: e }),
  setViewportSize: (e) => t({ viewportSize: e }),
  setViewportRatio: (e) => t({ viewportRatio: e }),
  setCanvasDragged: (e) => t({ canvasDragged: e }),
  // ===== Display Aids Actions =====
  setRulerState: (e) => t({ showRuler: e }),
  setGridLineSize: (e) => t({ gridLineSize: e }),
  // ===== Toolbar and Panel Actions =====
  setToolbarState: (e) => t({ toolbarState: e }),
  setSelectPanelState: (e) => t({ showSelectPanel: e }),
  setSearchPanelState: (e) => t({ showSearchPanel: e }),
  // ===== Element Creation Actions =====
  setCreatingElement: (e) => t({ creatingElement: e }),
  setCreatingCustomShapeState: (e) => t({ creatingCustomShape: e }),
  // ===== Editing State Actions =====
  setScalingState: (e) => t({ isScaling: e }),
  setClipingImageElementId: (e) => t({ clipingImageElementId: e }),
  setRichtextAttrs: (e) => t({ richTextAttrs: e }),
  // ===== Format Painter Actions =====
  setTextFormatPainter: (e) => t({ textFormatPainter: e }),
  setShapeFormatPainter: (e) => t({ shapeFormatPainter: e }),
  // ===== Video Playback Actions =====
  playVideo: (e) => t({ playingVideoElementId: e }),
  pauseVideo: () => t({ playingVideoElementId: "" }),
  // ===== Whiteboard Actions =====
  setWhiteboardOpen: (e) => t({ whiteboardOpen: e }),
  setWhiteboardClearing: (e) => t({ whiteboardClearing: e }),
  // ===== Other Actions =====
  setThumbnailsFocus: (e) => t({ thumbnailsFocus: e }),
  setEditorAreaFocus: (e) => t({ editorAreaFocus: e }),
  setDisableHotkeysState: (e) => t({ disableHotkeys: e }),
  setSelectedTableCells: (e) => t({ selectedTableCells: e }),
  // ===== Teaching Feature Actions =====
  setSpotlight: (e, l = {}) => {
    t({
      spotlightElementId: e,
      spotlightMode: "pixel",
      spotlightOptions: {
        radius: 200,
        dimness: 0.7,
        transition: 300,
        ...l
      },
      spotlightPercentageGeometry: null
    });
  },
  setSpotlightPercentage: (e, l, n = {}) => {
    t({
      spotlightElementId: e,
      spotlightMode: "percentage",
      spotlightPercentageGeometry: l,
      spotlightOptions: {
        dimness: 0.7,
        transition: 300,
        ...n
      }
    });
  },
  clearSpotlight: () => {
    t({
      spotlightElementId: "",
      spotlightOptions: null,
      spotlightMode: "pixel",
      spotlightPercentageGeometry: null
    });
  },
  setHighlight: (e, l = {}) => {
    t({
      highlightedElementIds: e,
      highlightOptions: {
        color: "#ff6b6b",
        opacity: 0.3,
        borderWidth: 3,
        animated: !0,
        ...l
      }
    });
  },
  clearHighlight: () => {
    t({
      highlightedElementIds: [],
      highlightOptions: null
    });
  },
  setLaser: (e, l = {}) => {
    t({
      laserElementId: e,
      laserOptions: {
        color: "#ff0000",
        duration: 3e3,
        ...l
      }
    });
  },
  clearLaser: () => {
    t({
      laserElementId: "",
      laserOptions: null
    });
  },
  setZoom: (e, l) => {
    t({
      zoomTarget: { elementId: e, scale: l }
    });
  },
  clearZoom: () => {
    t({
      zoomTarget: null
    });
  },
  clearAllEffects: () => {
    t({
      spotlightElementId: "",
      spotlightOptions: null,
      spotlightMode: "pixel",
      spotlightPercentageGeometry: null,
      highlightedElementIds: [],
      highlightOptions: null,
      laserElementId: "",
      laserOptions: null,
      zoomTarget: null
      // Note: playingVideoElementId intentionally NOT cleared here.
      // Video playback has its own lifecycle (playVideo/pauseVideo/onEnded)
      // and must not be interrupted by visual effect auto-clear timers.
    });
  },
  // ===== Batch Operations =====
  resetCanvasState: () => {
    t({
      ...a,
      // Preserve viewport settings
      viewportSize: i().viewportSize,
      viewportRatio: i().viewportRatio
    });
  }
})), p = r(d);
export {
  p as useCanvasStore
};
//# sourceMappingURL=canvas.js.map
