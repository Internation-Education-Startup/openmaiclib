import { OperateResizeHandlers } from '../../../../../lib/types/edit';
interface ResizeHandlerProps {
    readonly type?: OperateResizeHandlers;
    readonly rotate?: number;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly onMouseDown?: (e: React.MouseEvent) => void;
}
export declare function ResizeHandler({ type, rotate, style, className, onMouseDown, }: ResizeHandlerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ResizeHandler.d.ts.map