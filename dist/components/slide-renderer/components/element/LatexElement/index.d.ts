import { PPTLatexElement } from '../../../../../lib/types/slides';
export { BaseLatexElement } from './BaseLatexElement';
export interface LatexElementProps {
    elementInfo: PPTLatexElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTLatexElement) => void;
}
/**
 * Latex element component (editable mode).
 * Renders KaTeX HTML if available, falls back to legacy SVG path.
 */
export declare function LatexElement({ elementInfo, selectElement }: LatexElementProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map