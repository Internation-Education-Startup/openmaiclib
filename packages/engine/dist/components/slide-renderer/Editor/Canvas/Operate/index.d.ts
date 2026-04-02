import { PPTElement, PPTLineElement, PPTVideoElement, PPTAudioElement, PPTShapeElement, PPTChartElement } from '../../../../../lib/types/slides';
import { OperateLineHandlers, OperateResizeHandlers } from '../../../../../lib/types/edit';
interface OperateProps {
    readonly elementInfo: PPTElement;
    readonly isSelected: boolean;
    readonly isActive: boolean;
    readonly isActiveGroupElement: boolean;
    readonly isMultiSelect: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: Exclude<PPTElement, PPTChartElement | PPTLineElement | PPTVideoElement | PPTAudioElement>) => void;
    readonly scaleElement: (e: React.MouseEvent, element: Exclude<PPTElement, PPTLineElement>, command: OperateResizeHandlers) => void;
    readonly dragLineElement: (e: React.MouseEvent, element: PPTLineElement, command: OperateLineHandlers) => void;
    readonly moveShapeKeypoint: (e: React.MouseEvent, element: PPTShapeElement, index: number) => void;
    readonly openLinkDialog: () => void;
}
export declare function Operate({ elementInfo, isSelected, isActive, isActiveGroupElement, isMultiSelect, rotateElement, scaleElement, dragLineElement, moveShapeKeypoint, openLinkDialog: _openLinkDialog, }: OperateProps): import("react/jsx-runtime").JSX.Element;
export {};
