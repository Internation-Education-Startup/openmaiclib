export interface CanvasProps {
    editable?: boolean;
}
/**
 * Canvas component
 *
 * Architecture:
 * - Slide data (elements, background) → Scene Context (from stageStore)
 * - Local element list → useRef + useState (for drag/scale/rotate operations)
 * - Canvas UI state (selection, toolbar) → Canvas Store
 * - Keyboard state → Keyboard Store
 *
 * Usage:
 * <SceneProvider>
 *   <Canvas />
 * </SceneProvider>
 */
export declare function Canvas(_props: CanvasProps): import("react/jsx-runtime").JSX.Element;
export default Canvas;
