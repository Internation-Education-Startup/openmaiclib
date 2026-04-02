import { PPTShapeElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers } from '../../../../../lib/types/edit';
interface ShapeElementOperateProps {
    readonly elementInfo: PPTShapeElement;
    readonly handlerVisible: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: PPTShapeElement) => void;
    readonly scaleElement: (e: React.MouseEvent, element: PPTShapeElement, command: OperateResizeHandlers) => void;
    readonly moveShapeKeypoint: (e: React.MouseEvent, element: PPTShapeElement, index: number) => void;
}
export declare function ShapeElementOperate({ elementInfo, handlerVisible, rotateElement, scaleElement, moveShapeKeypoint, }: ShapeElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
