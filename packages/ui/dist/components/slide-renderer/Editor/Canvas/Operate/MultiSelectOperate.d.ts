import { PPTElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers, MultiSelectRange } from '../../../../../lib/types/edit';
interface MultiSelectOperateProps {
    readonly elementList: PPTElement[];
    readonly scaleMultiElement: (e: React.MouseEvent, range: MultiSelectRange, command: OperateResizeHandlers) => void;
}
export declare function MultiSelectOperate({ elementList, scaleMultiElement }: MultiSelectOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
