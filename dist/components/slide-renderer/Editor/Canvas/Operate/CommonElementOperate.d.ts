import { PPTVideoElement, PPTLatexElement, PPTAudioElement, PPTChartElement } from '../../../../../lib/types/slides';
import { OperateResizeHandlers } from '../../../../../lib/types/edit';
type PPTElement = PPTVideoElement | PPTLatexElement | PPTAudioElement | PPTChartElement;
interface CommonElementOperateProps {
    readonly elementInfo: PPTElement;
    readonly handlerVisible: boolean;
    readonly rotateElement: (e: React.MouseEvent, element: PPTElement) => void;
    readonly scaleElement: (e: React.MouseEvent, element: PPTElement, command: OperateResizeHandlers) => void;
}
export declare function CommonElementOperate({ elementInfo, handlerVisible, rotateElement, scaleElement, }: CommonElementOperateProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CommonElementOperate.d.ts.map