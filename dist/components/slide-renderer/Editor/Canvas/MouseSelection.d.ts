export interface MouseSelectionProps {
    readonly top: number;
    readonly left: number;
    readonly width: number;
    readonly height: number;
    readonly quadrant: number;
    readonly canvasScale: number;
}
/**
 * Mouse selection component
 * Displays selection rectangle during mouse drag selection
 */
export declare function MouseSelection({ top, left, width, height, quadrant, canvasScale, }: MouseSelectionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MouseSelection.d.ts.map