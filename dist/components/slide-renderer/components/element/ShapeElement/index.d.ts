import { PPTShapeElement } from '../../../../../lib/types/slides';
export { BaseShapeElement } from './BaseShapeElement';
export interface ShapeElementProps {
    elementInfo: PPTShapeElement;
    selectElement?: (e: React.MouseEvent | React.TouchEvent, element: PPTShapeElement, canMove?: boolean) => void;
}
/**
 * Shape element component with text editing support
 * Supports gradients, patterns, and rich text content
 */
export declare function ShapeElement({ elementInfo, selectElement }: ShapeElementProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map