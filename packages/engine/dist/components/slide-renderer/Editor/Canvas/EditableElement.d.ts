import { PPTElement } from '../../../../lib/types/slides';
export interface ContextmenuItem {
    text?: string;
    subText?: string;
    divider?: boolean;
    disable?: boolean;
    hide?: boolean;
    children?: ContextmenuItem[];
    handler?: () => void;
}
interface EditableElementProps {
    readonly elementInfo: PPTElement;
    readonly elementIndex: number;
    readonly isMultiSelect: boolean;
    readonly selectElement: (e: React.MouseEvent | React.TouchEvent, element: PPTElement, canMove?: boolean) => void;
    readonly openLinkDialog: () => void;
}
export declare function EditableElement({ elementInfo, elementIndex, isMultiSelect, selectElement, openLinkDialog, }: EditableElementProps): import("react/jsx-runtime").JSX.Element;
export {};
