import { SpotlightOptions, HighlightOverlayOptions } from '../store/canvas';
import { SlideContent } from '../types/stage';
import { PPTElement, Slide } from '../types/slides';
import { ElementAlignCommands, ElementOrderCommands } from '../types/edit';
type PPTElementKey = keyof PPTElement;
interface RemovePropData {
    id: string;
    propName: PPTElementKey | PPTElementKey[];
}
interface UpdateElementData {
    id: string | string[];
    props: Partial<PPTElement>;
    slideId?: string;
}
export declare function useCanvasOperations(): {
    addElement: (element: PPTElement | PPTElement[], autoSelect?: boolean) => void;
    deleteElement: (elementId?: string) => void;
    deleteAllElements: () => void;
    updateElement: (data: UpdateElementData) => void;
    updateSlide: (props: Partial<Slide>) => void;
    removeElementProps: (data: RemovePropData) => void;
    copyElement: () => void;
    pasteElement: () => void;
    cutElement: () => void;
    lockElement: () => void;
    unlockElement: (handleElement: PPTElement) => void;
    selectAllElements: () => void;
    selectElement: (id: string) => void;
    alignElementToCanvas: (command: ElementAlignCommands) => void;
    orderElement: (element: PPTElement, command: ElementOrderCommands) => void;
    combineElements: () => void;
    uncombineElements: () => void;
    updateBackground: (background: SlideContent["canvas"]["background"]) => void;
    updateTheme: (theme: Partial<SlideContent["canvas"]["theme"]>) => void;
    spotlightElement: (elementId: string, options?: SpotlightOptions) => void;
    clearSpotlight: () => void;
    highlightElements: (elementIds: string[], options?: HighlightOverlayOptions) => void;
    clearHighlight: () => void;
    laserElement: (elementId: string, options?: {
        color?: string;
        duration?: number;
    }) => void;
    clearLaser: () => void;
    zoomElement: (elementId: string, scale: number) => void;
    clearZoom: () => void;
    clearAllEffects: () => void;
};
export type CanvasOperations = ReturnType<typeof useCanvasOperations>;
export {};
//# sourceMappingURL=use-canvas-operations.d.ts.map