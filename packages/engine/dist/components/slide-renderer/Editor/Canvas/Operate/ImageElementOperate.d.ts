import { PPTImageElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers } from '../../../../../lib/types/edit';
interface ImageElementOperateProps {
    readonly elementInfo: PPTImageElement;
    readonly handlerVisible: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: PPTImageElement) => void;
    readonly scaleElement: (e: React.MouseEvent, element: PPTImageElement, command: OperateResizeHandlers) => void;
}
export declare function ImageElementOperate({ elementInfo, handlerVisible, rotateElement, scaleElement, }: ImageElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
