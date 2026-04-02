import { PPTElement } from '../../../../../lib/types/slides';
import { AlignmentLineProps } from '../../../../../lib/types/edit';
/**
 * Drag element hook
 *
 * @param elementListRef - Element list ref (holds latest value)
 * @param setElementList - Element list setter (triggers re-render)
 * @param setAlignmentLines - Alignment lines setter
 */
export declare function useDragElement(elementListRef: React.RefObject<PPTElement[]>, setElementList: React.Dispatch<React.SetStateAction<PPTElement[]>>, setAlignmentLines: React.Dispatch<React.SetStateAction<AlignmentLineProps[]>>): {
    dragElement: (e: React.MouseEvent | React.TouchEvent, element: PPTElement) => void;
};
//# sourceMappingURL=useDragElement.d.ts.map