import { CSSProperties } from 'react';
import { TableCell, TableCellStyle } from '../../../../../lib/types/slides';
/**
 * Convert TableCellStyle to CSS properties
 */
export declare function getTextStyle(style?: TableCellStyle): CSSProperties;
/**
 * Format text: convert \n to <br/> and spaces to &nbsp;
 */
export declare function formatText(text: string): string;
/**
 * Compute hidden cell positions based on colspan/rowspan merges.
 * Returns a Set of "row_col" keys for cells that should be hidden.
 */
export declare function getHiddenCells(data: TableCell[][]): Set<string>;
//# sourceMappingURL=tableUtils.d.ts.map