import { PPTImageElement } from '../../../../../lib/types/slides';
export interface ImageElementProps {
    elementInfo: PPTImageElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTImageElement) => void;
}
/**
 * Image element component with interaction support
 */
export declare function ImageElement({ elementInfo, selectElement }: ImageElementProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map