import { PPTChartElement } from '../../../../../lib/types/slides';
export interface BaseChartElementProps {
    elementInfo: PPTChartElement;
    target?: string;
}
/**
 * Base chart element for read-only/playback mode
 */
export declare function BaseChartElement({ elementInfo, target }: BaseChartElementProps): import("react/jsx-runtime").JSX.Element;
