import { PPTElement } from '../types/slides';
export declare function useOrderElement(): {
    moveUpElement: (elementList: PPTElement[], element: PPTElement) => PPTElement[];
    moveDownElement: (elementList: PPTElement[], element: PPTElement) => PPTElement[];
    moveTopElement: (elementList: PPTElement[], element: PPTElement) => PPTElement[];
    moveBottomElement: (elementList: PPTElement[], element: PPTElement) => PPTElement[];
};
