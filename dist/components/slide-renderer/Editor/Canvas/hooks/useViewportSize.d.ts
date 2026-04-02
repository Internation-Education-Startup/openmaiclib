import { RefObject } from 'react';
export interface ViewportStyles {
    width: number;
    height: number;
    left: number;
    top: number;
}
/**
 * Hook for managing Canvas viewport size and position
 * Handles viewport scaling, positioning, and Canvas dragging
 */
export declare function useViewportSize(canvasRef: RefObject<HTMLElement | null>): {
    viewportStyles: ViewportStyles;
    dragViewport: (e: React.MouseEvent) => void;
};
//# sourceMappingURL=useViewportSize.d.ts.map