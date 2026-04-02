import { PPTElement } from '../../../lib/types/slides';
interface ScreenElementProps {
    readonly elementInfo: PPTElement;
    readonly elementIndex: number;
    readonly animate?: boolean;
}
export declare function ScreenElement({ elementInfo, elementIndex, animate }: ScreenElementProps): import("react/jsx-runtime").JSX.Element;
export {};
