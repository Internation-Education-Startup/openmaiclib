import { PPTImageElement } from '../../../../../lib/types/slides';
export interface BaseImageElementProps {
    elementInfo: PPTImageElement;
}
/**
 * Base image element component for read-only display
 */
export declare function BaseImageElement({ elementInfo }: BaseImageElementProps): import("react/jsx-runtime").JSX.Element;
