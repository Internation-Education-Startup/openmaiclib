import { PPTImageElement } from '../../../../../lib/types/slides';
import { ClipPathTypes } from '../../../../../configs/image-clip';
/**
 * Calculate image clip shape and position
 * @param element Image element
 */
export declare function useClipImage(element: PPTImageElement): {
    clipShape: {
        name: string;
        type: ClipPathTypes;
        style: string;
        radius?: string;
        createPath?: (width: number, height: number) => string;
    };
    imgPosition: {
        top: string;
        left: string;
        width: string;
        height: string;
    };
};
