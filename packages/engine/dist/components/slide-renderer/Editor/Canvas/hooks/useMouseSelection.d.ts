import { RefObject } from 'react';
import { PPTElement } from '../../../../../lib/types/slides';
export declare function useMouseSelection(elementListRef: React.RefObject<PPTElement[]>, viewportRef: RefObject<HTMLElement | null>): {
    mouseSelection: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    mouseSelectionVisible: boolean;
    mouseSelectionQuadrant: number;
    updateMouseSelection: (e: React.MouseEvent) => void;
};
