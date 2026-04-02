import { OperateResizeHandlers, OperateBorderLines } from '../../../../../lib/types/edit';
export declare function useCommonOperate(width: number, height: number): {
    resizeHandlers: ({
        direction: OperateResizeHandlers;
        style: {
            left?: undefined;
            top?: undefined;
        };
    } | {
        direction: OperateResizeHandlers;
        style: {
            left: string;
            top?: undefined;
        };
    } | {
        direction: OperateResizeHandlers;
        style: {
            top: string;
            left?: undefined;
        };
    } | {
        direction: OperateResizeHandlers;
        style: {
            left: string;
            top: string;
        };
    })[];
    textElementResizeHandlers: ({
        direction: OperateResizeHandlers;
        style: {
            top: string;
            left?: undefined;
        };
    } | {
        direction: OperateResizeHandlers;
        style: {
            left: string;
            top: string;
        };
    })[];
    verticalTextElementResizeHandlers: ({
        direction: OperateResizeHandlers;
        style: {
            left: string;
            top?: undefined;
        };
    } | {
        direction: OperateResizeHandlers;
        style: {
            left: string;
            top: string;
        };
    })[];
    borderLines: ({
        type: OperateBorderLines;
        style: {
            width: string;
            top?: undefined;
            height?: undefined;
            left?: undefined;
        };
    } | {
        type: OperateBorderLines;
        style: {
            top: string;
            width: string;
            height?: undefined;
            left?: undefined;
        };
    } | {
        type: OperateBorderLines;
        style: {
            height: string;
            width?: undefined;
            top?: undefined;
            left?: undefined;
        };
    } | {
        type: OperateBorderLines;
        style: {
            left: string;
            height: string;
            width?: undefined;
            top?: undefined;
        };
    })[];
};
//# sourceMappingURL=useCommonOperate.d.ts.map