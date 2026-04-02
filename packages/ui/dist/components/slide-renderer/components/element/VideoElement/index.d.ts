import { PPTVideoElement } from '../../../../../lib/types/slides';
export interface VideoElementProps {
    elementInfo: PPTVideoElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTVideoElement) => void;
}
/**
 * Editable video element component.
 * In edit mode, displays the poster/thumbnail with a play icon overlay.
 * Does NOT autoplay to avoid disrupting the editing experience.
 */
export declare function VideoElement({ elementInfo, selectElement }: VideoElementProps): import("react/jsx-runtime").JSX.Element;
