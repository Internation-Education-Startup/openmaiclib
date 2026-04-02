import { PPTTextElement } from '../../../../../lib/types/slides';
export interface TextElementProps {
    elementInfo: PPTTextElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTTextElement, canMove?: boolean) => void;
}
/**
 * Editable text element component
 * Includes auto-height adjustment and empty text cleanup
 */
export declare function TextElement({ elementInfo, selectElement }: TextElementProps): import("react/jsx-runtime").JSX.Element;
