import { PPTChartElement } from '../../../../../lib/types/slides';
export { BaseChartElement } from './BaseChartElement';
export interface ChartElementProps {
    elementInfo: PPTChartElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTChartElement) => void;
}
/**
 * Chart element component
 * Renders interactive charts using ECharts
 */
export declare function ChartElement({ elementInfo, selectElement }: ChartElementProps): import("react/jsx-runtime").JSX.Element;
