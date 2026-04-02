import { RefObject } from 'react';
import { PPTElement, PPTLineElement, PPTVideoElement, PPTAudioElement, PPTChartElement } from '../../../../../lib/types/slides';
/**
 * Rotate element Hook
 *
 * @param elementListRef - Element list ref (stores the latest value)
 * @param setElementList - Element list setter (used to trigger re-render)
 * @param viewportRef - Viewport reference
 * @param canvasScale - Canvas scale ratio
 */
export declare function useRotateElement(elementListRef: React.RefObject<PPTElement[]>, setElementList: React.Dispatch<React.SetStateAction<PPTElement[]>>, viewportRef: RefObject<HTMLElement | null>, canvasScale: number): {
    rotateElement: (e: React.MouseEvent | React.TouchEvent, element: Exclude<PPTElement, PPTChartElement | PPTLineElement | PPTVideoElement | PPTAudioElement>) => void;
};
//# sourceMappingURL=useRotateElement.d.ts.map