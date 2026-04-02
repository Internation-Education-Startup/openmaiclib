import { RefObject } from 'react';
import { CreateElementSelectionData } from '../../../../../lib/types/edit';
export declare function useInsertFromCreateSelection(viewportRef: RefObject<HTMLElement | null>): {
    formatCreateSelection: (selectionData: CreateElementSelectionData) => {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    insertElementFromCreateSelection: (selectionData: CreateElementSelectionData) => void;
};
