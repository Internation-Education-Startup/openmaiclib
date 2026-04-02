import { PPTShapeElement } from '../../../../../lib/types/slides';
/**
 * Calculate element fill style
 * Returns pattern/gradient URL or solid color fill
 * @param element Shape element
 * @param source Source identifier for pattern/gradient IDs
 */
export declare function useElementFill(element: PPTShapeElement, source: string): {
    fill: string;
};
