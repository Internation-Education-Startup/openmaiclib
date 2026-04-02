import { PPTTableElement } from '../../../../../lib/types/slides';
export { BaseTableElement } from './BaseTableElement';
export interface TableElementProps {
    elementInfo: PPTTableElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTTableElement) => void;
}
/**
 * Editable table element component.
 * Supports selection/drag/resize via selectElement callback.
 * Cell editing is not implemented yet (display-only, matching ChartElement pattern).
 */
export declare function TableElement({ elementInfo, selectElement }: TableElementProps): import("react/jsx-runtime").JSX.Element;
