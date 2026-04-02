import { PPTTableElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers } from '../../../../../lib/types/edit';
interface TableElementOperateProps {
    readonly elementInfo: PPTTableElement;
    readonly handlerVisible: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: PPTTableElement) => void;
    readonly scaleElement: (e: React.MouseEvent, element: PPTTableElement, command: OperateResizeHandlers) => void;
}
export declare function TableElementOperate({ elementInfo, handlerVisible, rotateElement, scaleElement, }: TableElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TableElementOperate.d.ts.map