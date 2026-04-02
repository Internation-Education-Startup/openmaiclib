import { PPTLineElement } from '../../../../../lib/types/slides';
export interface BaseLineElementProps {
    elementInfo: PPTLineElement;
    animate?: boolean;
}
/**
 * Base line element for read-only/playback mode.
 * When animate=true, plays a stroke-drawing animation on mount.
 */
export declare function BaseLineElement({ elementInfo, animate }: BaseLineElementProps): import("react/jsx-runtime").JSX.Element;
