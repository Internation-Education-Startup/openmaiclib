import { PPTVideoElement } from '../../../../../lib/types/slides';
export interface BaseVideoElementProps {
    elementInfo: PPTVideoElement;
}
/**
 * Base video element component for read-only/presentation display.
 * Controlled exclusively by the canvas store via the play_video action.
 * Videos never autoplay — they wait for an explicit play_video action.
 */
export declare function BaseVideoElement({ elementInfo }: BaseVideoElementProps): import("react/jsx-runtime").JSX.Element;
