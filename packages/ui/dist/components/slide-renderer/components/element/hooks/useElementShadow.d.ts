import { PPTElementShadow } from '../../../../../lib/types/slides';
/**
 * Calculate element shadow style
 * Converts shadow object to CSS box-shadow string
 * @param shadow Shadow configuration
 */
export declare function useElementShadow(shadow?: PPTElementShadow): {
    shadowStyle: string;
};
