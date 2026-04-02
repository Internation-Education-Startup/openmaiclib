import { PPTElement } from '../../../../lib/types/slides';
interface ThumbnailElementProps {
    readonly elementInfo: PPTElement;
    readonly elementIndex: number;
}
/**
 * Thumbnail element component
 *
 * Renders the corresponding Base component based on element type
 */
export declare function ThumbnailElement({ elementInfo, elementIndex }: ThumbnailElementProps): import("react/jsx-runtime").JSX.Element;
export {};
