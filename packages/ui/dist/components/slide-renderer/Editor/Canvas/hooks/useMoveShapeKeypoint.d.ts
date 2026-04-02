import { PPTElement, PPTShapeElement } from '../../../../../lib/types/slides';
/**
 * Move shape keypoint Hook
 *
 * @param elementListRef - Element list ref (used to read the latest value on mouseup)
 * @param setElementList - Element list setter (used to trigger re-render)
 * @param canvasScale - Canvas scale ratio
 */
export declare function useMoveShapeKeypoint(elementListRef: React.RefObject<PPTElement[]>, setElementList: React.Dispatch<React.SetStateAction<PPTElement[]>>, canvasScale: number): {
    moveShapeKeypoint: (e: React.MouseEvent | React.TouchEvent, element: PPTShapeElement, index?: number) => void;
};
