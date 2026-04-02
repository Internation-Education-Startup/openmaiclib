import { Node, NodeType, Mark, MarkType, Schema } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const isList: (node: Node, schema: Schema) => boolean;
export declare const autoSelectAll: (view: EditorView) => void;
export declare const addMark: (editorView: EditorView, mark: Mark, selection?: {
    from: number;
    to: number;
}) => void;
export declare const findNodesWithSameMark: (doc: Node, from: number, to: number, markType: MarkType) => {
    mark: any;
    from: {
        node: any;
        pos: number;
    };
    to: {
        node: any;
        pos: number;
    };
};
export declare const findParentNode: (predicate: (node: Node) => boolean) => (_ref: Selection) => {
    pos: number;
    start: number;
    depth: number;
    node: Node;
};
export declare const findParentNodeOfType: (nodeType: NodeType) => (selection: Selection) => {
    pos: number;
    start: number;
    depth: number;
    node: Node;
};
export declare const isActiveOfParentNodeType: (nodeType: string, state: EditorState) => boolean;
export declare const getLastTextNode: (node: Node | null) => Node | null;
export declare const getMarkAttrs: (view: EditorView) => readonly Mark[];
export declare const getAttrValue: (marks: readonly Mark[], markType: string, attr: string) => string | null;
export declare const isActiveMark: (marks: readonly Mark[], markType: string) => boolean;
export declare const markActive: (state: EditorState, type: MarkType) => boolean | Mark;
export declare const getAttrValueInSelection: (view: EditorView, attr: string) => string;
type Align = 'left' | 'right' | 'center';
interface DefaultAttrs {
    color: string;
    backcolor: string;
    fontsize: string;
    fontname: string;
    align: Align;
}
export declare const getTextAttrs: (view: EditorView, attrs?: Partial<DefaultAttrs>) => {
    bold: boolean;
    em: boolean;
    underline: boolean;
    strikethrough: boolean;
    superscript: boolean;
    subscript: boolean;
    code: boolean;
    color: string;
    backcolor: string;
    fontsize: string;
    fontname: string;
    link: string;
    align: Align;
    bulletList: boolean;
    orderedList: boolean;
    blockquote: boolean;
};
export type TextAttrs = ReturnType<typeof getTextAttrs>;
export declare const getFontsize: (view: EditorView) => number;
export declare const defaultRichTextAttrs: TextAttrs;
export {};
