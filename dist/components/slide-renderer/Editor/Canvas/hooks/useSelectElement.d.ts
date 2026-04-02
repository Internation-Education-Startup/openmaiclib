import { PPTElement } from '../../../../../lib/types/slides';
/**
 * Hook for handling element selection in Canvas
 * Supports single selection, multi-selection (Ctrl/Shift), and group selection
 */
export declare function useSelectElement(elementListRef: React.RefObject<PPTElement[]>, moveElement: (e: React.MouseEvent | React.TouchEvent, element: PPTElement) => void): {
    selectElement: (e: React.MouseEvent | React.TouchEvent, element: PPTElement, startMove?: boolean) => void;
};
//# sourceMappingURL=useSelectElement.d.ts.map