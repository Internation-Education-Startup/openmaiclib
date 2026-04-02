import { OperateBorderLines } from '../../../../../lib/types/edit';
interface BorderLineProps {
    readonly type: OperateBorderLines;
    readonly isWide?: boolean;
    readonly style?: React.CSSProperties;
    readonly className?: string;
}
export declare function BorderLine({ type, isWide, style, className }: BorderLineProps): import("react/jsx-runtime").JSX.Element;
export {};
