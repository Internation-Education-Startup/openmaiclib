import { PPTElement } from '../types/slides';
import { PercentageGeometry } from '../types/action';
/**
 * Calculate percentage coordinates (0-100) for an element
 *
 * @param element - PPT element
 * @param viewportSize - Viewport width base, default 1000px
 * @returns Percentage geometry info, or null if the element has no position info
 */
export declare function getElementPercentageGeometry(element: PPTElement, viewportSize?: number): PercentageGeometry | null;
/**
 * Find percentage geometry info by scene and element ID
 *
 * @param scene - Scene object
 * @param elementId - Element ID
 * @param viewportSize - Viewport width base, default 1000px
 * @returns Percentage geometry info, or null if element is not found or has no position info
 */
export declare function findElementGeometry(scene: Record<string, any>, elementId: string, viewportSize?: number): PercentageGeometry | null;
/**
 * Calculate which corner has the shortest distance to the element center
 *
 * @param geometry - Percentage geometry info
 * @returns Nearest corner coordinates { x: 0-100, y: 0-100 }
 */
export declare function findNearestCorner(geometry: PercentageGeometry): {
    x: number;
    y: number;
};
//# sourceMappingURL=geometry.d.ts.map