import { PPTLineElement } from '../../../../../lib/types/slides';
import { OperateLineHandlers } from '../../../../../lib/types/edit';
interface LineElementOperateProps {
    readonly elementInfo: PPTLineElement;
    readonly handlerVisible: boolean;
    readonly dragLineElement: (e: React.MouseEvent, element: PPTLineElement, command: OperateLineHandlers) => void;
}
export declare function LineElementOperate({ elementInfo, handlerVisible, dragLineElement, }: LineElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LineElementOperate.d.ts.map