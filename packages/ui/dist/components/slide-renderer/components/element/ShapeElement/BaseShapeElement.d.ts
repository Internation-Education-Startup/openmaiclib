import { PPTShapeElement } from '../../../../../lib/types/slides';
export interface BaseShapeElementProps {
    elementInfo: PPTShapeElement;
}
/**
 * Base shape element for read-only/playback mode
 */
export declare function BaseShapeElement({ elementInfo }: BaseShapeElementProps): import("react/jsx-runtime").JSX.Element;
