export type WhiteboardCanvasHandle = {
    resetView: () => void;
};
/**
 * Whiteboard canvas with pan, zoom, auto-fit, and bounded viewport.
 */
export type WhiteboardCanvasProps = {
    onViewModifiedChange?: (modified: boolean) => void;
};
export declare const WhiteboardCanvas: import('react').ForwardRefExoticComponent<WhiteboardCanvasProps & import('react').RefAttributes<WhiteboardCanvasHandle>>;
//# sourceMappingURL=whiteboard-canvas.d.ts.map