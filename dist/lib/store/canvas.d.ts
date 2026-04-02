import { TextAttrs } from '../prosemirror/utils';
import { TextFormatPainter, ShapeFormatPainter, CreatingElement } from '../types/edit';
import { PercentageGeometry } from '../types/action';
/**
 * Spotlight options
 */
export interface SpotlightOptions {
    radius?: number;
    dimness?: number;
    transition?: number;
}
/**
 * Highlight overlay options
 */
export interface HighlightOverlayOptions {
    color?: string;
    opacity?: number;
    borderWidth?: number;
    animated?: boolean;
}
/**
 * Laser pointer options
 */
export interface LaserOptions {
    color?: string;
    duration?: number;
}
/**
 * Canvas Store - Manages all UI state of the Canvas editor
 *
 * Responsibilities:
 * - Element selection state (selected, handling, editing)
 * - Canvas viewport state (zoom, drag, ruler, grid)
 * - Toolbar and panel state
 * - Element being created
 * - Rich text editing state
 * - Format painter state
 *
 * Note: Does not manage slide data (elements, background, etc.), which is managed by Scene Context
 */
interface CanvasState {
    activeElementIdList: string[];
    handleElementId: string;
    activeGroupElementId: string;
    editingElementId: string;
    hiddenElementIdList: string[];
    spotlightElementId: string;
    spotlightOptions: SpotlightOptions | null;
    spotlightMode: 'pixel' | 'percentage';
    spotlightPercentageGeometry: PercentageGeometry | null;
    highlightedElementIds: string[];
    highlightOptions: HighlightOverlayOptions | null;
    laserElementId: string;
    laserOptions: LaserOptions | null;
    zoomTarget: {
        elementId: string;
        scale: number;
    } | null;
    canvasScale: number;
    canvasPercentage: number;
    viewportSize: number;
    viewportRatio: number;
    canvasDragged: boolean;
    showRuler: boolean;
    gridLineSize: number;
    toolbarState: 'design' | 'ai' | 'elAnimation';
    showSelectPanel: boolean;
    showSearchPanel: boolean;
    creatingElement: CreatingElement | null;
    creatingCustomShape: boolean;
    isScaling: boolean;
    clipingImageElementId: string;
    richTextAttrs: TextAttrs;
    textFormatPainter: TextFormatPainter | null;
    shapeFormatPainter: ShapeFormatPainter | null;
    playingVideoElementId: string;
    whiteboardOpen: boolean;
    whiteboardClearing: boolean;
    thumbnailsFocus: boolean;
    editorAreaFocus: boolean;
    disableHotkeys: boolean;
    selectedTableCells: string[];
    setActiveElementIdList: (ids: string[]) => void;
    setHandleElementId: (id: string) => void;
    setActiveGroupElementId: (id: string) => void;
    setEditingElementId: (id: string) => void;
    setHiddenElementIdList: (ids: string[]) => void;
    clearSelection: () => void;
    setCanvasScale: (scale: number) => void;
    setCanvasPercentage: (percentage: number) => void;
    setViewportSize: (size: number) => void;
    setViewportRatio: (ratio: number) => void;
    setCanvasDragged: (dragged: boolean) => void;
    setRulerState: (show: boolean) => void;
    setGridLineSize: (size: number) => void;
    setToolbarState: (state: 'design' | 'ai') => void;
    setSelectPanelState: (show: boolean) => void;
    setSearchPanelState: (show: boolean) => void;
    setCreatingElement: (element: CreatingElement | null) => void;
    setCreatingCustomShapeState: (creating: boolean) => void;
    setScalingState: (isScaling: boolean) => void;
    setClipingImageElementId: (id: string) => void;
    setRichtextAttrs: (attrs: TextAttrs) => void;
    setTextFormatPainter: (painter: TextFormatPainter | null) => void;
    setShapeFormatPainter: (painter: ShapeFormatPainter | null) => void;
    playVideo: (elementId: string) => void;
    pauseVideo: () => void;
    setWhiteboardOpen: (open: boolean) => void;
    setWhiteboardClearing: (clearing: boolean) => void;
    setThumbnailsFocus: (focus: boolean) => void;
    setEditorAreaFocus: (focus: boolean) => void;
    setDisableHotkeysState: (disable: boolean) => void;
    setSelectedTableCells: (cells: string[]) => void;
    setSpotlight: (elementId: string, options?: SpotlightOptions) => void;
    clearSpotlight: () => void;
    setSpotlightPercentage: (elementId: string, geometry: PercentageGeometry, options?: SpotlightOptions) => void;
    setHighlight: (elementIds: string[], options?: HighlightOverlayOptions) => void;
    clearHighlight: () => void;
    setLaser: (elementId: string, options?: LaserOptions) => void;
    clearLaser: () => void;
    setZoom: (elementId: string, scale: number) => void;
    clearZoom: () => void;
    clearAllEffects: () => void;
    resetCanvasState: () => void;
}
export declare const useCanvasStore: {
    (): CanvasState;
    <U>(selector: (state: CanvasState) => U): U;
} & import('zustand').StoreApi<CanvasState> & {
    use: {
        activeElementIdList: () => string[];
        handleElementId: () => string;
        activeGroupElementId: () => string;
        editingElementId: () => string;
        hiddenElementIdList: () => string[];
        spotlightElementId: () => string;
        spotlightOptions: () => SpotlightOptions;
        spotlightMode: () => "pixel" | "percentage";
        spotlightPercentageGeometry: () => PercentageGeometry;
        highlightedElementIds: () => string[];
        highlightOptions: () => HighlightOverlayOptions;
        laserElementId: () => string;
        laserOptions: () => LaserOptions;
        zoomTarget: () => {
            elementId: string;
            scale: number;
        };
        canvasScale: () => number;
        canvasPercentage: () => number;
        viewportSize: () => number;
        viewportRatio: () => number;
        canvasDragged: () => boolean;
        showRuler: () => boolean;
        gridLineSize: () => number;
        toolbarState: () => "design" | "ai" | "elAnimation";
        showSelectPanel: () => boolean;
        showSearchPanel: () => boolean;
        creatingElement: () => CreatingElement;
        creatingCustomShape: () => boolean;
        isScaling: () => boolean;
        clipingImageElementId: () => string;
        richTextAttrs: () => {
            bold: boolean;
            em: boolean;
            underline: boolean;
            strikethrough: boolean;
            superscript: boolean;
            subscript: boolean;
            code: boolean;
            color: string;
            backcolor: string;
            fontsize: string;
            fontname: string;
            link: string;
            align: "left" | "right" | "center";
            bulletList: boolean;
            orderedList: boolean;
            blockquote: boolean;
        };
        textFormatPainter: () => TextFormatPainter;
        shapeFormatPainter: () => ShapeFormatPainter;
        playingVideoElementId: () => string;
        whiteboardOpen: () => boolean;
        whiteboardClearing: () => boolean;
        thumbnailsFocus: () => boolean;
        editorAreaFocus: () => boolean;
        disableHotkeys: () => boolean;
        selectedTableCells: () => string[];
        setActiveElementIdList: () => (ids: string[]) => void;
        setHandleElementId: () => (id: string) => void;
        setActiveGroupElementId: () => (id: string) => void;
        setEditingElementId: () => (id: string) => void;
        setHiddenElementIdList: () => (ids: string[]) => void;
        clearSelection: () => () => void;
        setCanvasScale: () => (scale: number) => void;
        setCanvasPercentage: () => (percentage: number) => void;
        setViewportSize: () => (size: number) => void;
        setViewportRatio: () => (ratio: number) => void;
        setCanvasDragged: () => (dragged: boolean) => void;
        setRulerState: () => (show: boolean) => void;
        setGridLineSize: () => (size: number) => void;
        setToolbarState: () => (state: "design" | "ai") => void;
        setSelectPanelState: () => (show: boolean) => void;
        setSearchPanelState: () => (show: boolean) => void;
        setCreatingElement: () => (element: CreatingElement | null) => void;
        setCreatingCustomShapeState: () => (creating: boolean) => void;
        setScalingState: () => (isScaling: boolean) => void;
        setClipingImageElementId: () => (id: string) => void;
        setRichtextAttrs: () => (attrs: TextAttrs) => void;
        setTextFormatPainter: () => (painter: TextFormatPainter | null) => void;
        setShapeFormatPainter: () => (painter: ShapeFormatPainter | null) => void;
        playVideo: () => (elementId: string) => void;
        pauseVideo: () => () => void;
        setWhiteboardOpen: () => (open: boolean) => void;
        setWhiteboardClearing: () => (clearing: boolean) => void;
        setThumbnailsFocus: () => (focus: boolean) => void;
        setEditorAreaFocus: () => (focus: boolean) => void;
        setDisableHotkeysState: () => (disable: boolean) => void;
        setSelectedTableCells: () => (cells: string[]) => void;
        setSpotlight: () => (elementId: string, options?: SpotlightOptions) => void;
        clearSpotlight: () => () => void;
        setSpotlightPercentage: () => (elementId: string, geometry: PercentageGeometry, options?: SpotlightOptions) => void;
        setHighlight: () => (elementIds: string[], options?: HighlightOverlayOptions) => void;
        clearHighlight: () => () => void;
        setLaser: () => (elementId: string, options?: LaserOptions) => void;
        clearLaser: () => () => void;
        setZoom: () => (elementId: string, scale: number) => void;
        clearZoom: () => () => void;
        clearAllEffects: () => () => void;
        resetCanvasState: () => () => void;
    };
};
export {};
//# sourceMappingURL=canvas.d.ts.map