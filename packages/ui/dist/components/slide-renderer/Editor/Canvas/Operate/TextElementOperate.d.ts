import { PPTTextElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers } from '../../../../../lib/types/edit';
interface TextElementOperateProps {
    readonly elementInfo: PPTTextElement;
    readonly handlerVisible: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: PPTTextElement) => void;
    readonly scaleElement: (e: React.MouseEvent, element: PPTTextElement, command: OperateResizeHandlers) => void;
}
export declare function TextElementOperate({ elementInfo, handlerVisible, rotateElement, scaleElement, }: TextElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
