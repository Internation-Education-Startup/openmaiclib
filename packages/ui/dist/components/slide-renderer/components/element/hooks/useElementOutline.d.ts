import { PPTElementOutline } from '../../../../../lib/types/slides';
/**
 * Calculate element outline (border) styles
 * Handles default values and stroke dash array for dashed/dotted borders
 * @param outline Outline configuration
 */
export declare function useElementOutline(outline?: PPTElementOutline): {
    outlineWidth: number;
    outlineStyle: import('../../../../../lib/types/slides').LineStyleType;
    outlineColor: string;
    strokeDashArray: string;
};
