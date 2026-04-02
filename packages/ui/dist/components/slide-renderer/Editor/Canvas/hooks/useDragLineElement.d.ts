import { PPTElement, PPTLineElement } from '../../../../../lib/types/slides';
import { OperateLineHandlers } from '../../../../../lib/types/edit';
/**
 * Drag line element Hook
 *
 * @param elementListRef - Element list ref (used to read the latest value on mouseup)
 * @param setElementList - Element list setter (used to trigger re-render)
 */
export declare function useDragLineElement(elementListRef: React.RefObject<PPTElement[]>, setElementList: React.Dispatch<React.SetStateAction<PPTElement[]>>): {
    dragLineElement: (e: React.MouseEvent, element: PPTLineElement, command: OperateLineHandlers) => void;
};
