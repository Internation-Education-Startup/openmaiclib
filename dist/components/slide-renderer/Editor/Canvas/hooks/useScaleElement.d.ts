import { PPTElement, PPTLineElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers, AlignmentLineProps, MultiSelectRange } from '../../../../../lib/types/edit';
/**
 * Scale element Hook
 *
 * @param elementListRef - Element list ref (stores the latest value)
 * @param setElementList - Element list setter (used to trigger re-render)
 * @param setAlignmentLines - Alignment lines setter
 */
export declare function useScaleElement(elementListRef: React.RefObject<PPTElement[]>, setElementList: React.Dispatch<React.SetStateAction<PPTElement[]>>, setAlignmentLines: React.Dispatch<React.SetStateAction<AlignmentLineProps[]>>): {
    scaleElement: (e: React.MouseEvent | React.TouchEvent, element: Exclude<PPTElement, PPTLineElement>, command: OperateResizeHandlers) => void;
    scaleMultiElement: (e: React.MouseEvent, range: MultiSelectRange, command: OperateResizeHandlers) => void;
};
//# sourceMappingURL=useScaleElement.d.ts.map