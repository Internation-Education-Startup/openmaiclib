import { PPTLatexElement } from '../../../../../lib/types/slides';
export interface BaseLatexElementProps {
    elementInfo: PPTLatexElement;
}
/**
 * Base latex element for read-only/playback mode.
 * Renders KaTeX HTML if available, falls back to legacy SVG path.
 */
export declare function BaseLatexElement({ elementInfo }: BaseLatexElementProps): import("react/jsx-runtime").JSX.Element;
