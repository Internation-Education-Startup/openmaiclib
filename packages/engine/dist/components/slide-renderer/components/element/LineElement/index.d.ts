import { PPTLineElement } from '../../../../../lib/types/slides';
export { BaseLineElement } from './BaseLineElement';
export interface LineElementProps {
    elementInfo: PPTLineElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTLineElement) => void;
}
/**
 * Line element component
 * Renders SVG lines with optional arrow/dot endpoints
 */
export declare function LineElement({ elementInfo, selectElement }: LineElementProps): import("react/jsx-runtime").JSX.Element;
