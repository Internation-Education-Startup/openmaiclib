import { NodeType } from 'prosemirror-model';
import { Transaction, EditorState } from 'prosemirror-state';
interface TextStyleAttr {
    color?: string;
    fontsize?: string;
}
export declare const toggleList: (listType: NodeType, itemType: NodeType, listStyleType: string, textStyleAttr?: TextStyleAttr) => (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export {};
//# sourceMappingURL=toggleList.d.ts.map