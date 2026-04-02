import { PPTTextElement } from '../../../../../lib/types/slides';
export interface BaseTextElementProps {
    elementInfo: PPTTextElement;
    target?: string;
}
/**
 * Base text element component (read-only)
 * Renders static text content with styling
 */
export declare function BaseTextElement({ elementInfo, target }: BaseTextElementProps): import("react/jsx-runtime").JSX.Element;
