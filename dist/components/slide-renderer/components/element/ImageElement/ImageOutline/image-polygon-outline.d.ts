import { PPTElementOutline } from '../../../../../../lib/types/slides';
export interface ImagePolygonOutlineProps {
    width: number;
    height: number;
    createPath: (width: number, height: number) => string;
    outline?: PPTElementOutline;
}
/**
 * Polygon outline for image element
 */
export declare function ImagePolygonOutline({ width, height, createPath, outline, }: ImagePolygonOutlineProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=image-polygon-outline.d.ts.map