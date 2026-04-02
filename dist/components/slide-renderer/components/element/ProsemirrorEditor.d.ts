export interface ProsemirrorEditorProps {
    elementId: string;
    defaultColor: string;
    defaultFontName: string;
    value: string;
    editable?: boolean;
    autoFocus?: boolean;
    onUpdate?: (payload: {
        value: string;
        ignore: boolean;
    }) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onMouseDown?: (e: React.MouseEvent) => void;
}
export interface ProsemirrorEditorRef {
    focus: () => void;
}
/**
 * ProseMirror rich text Editor component
 * Handles complex text editing with support for formatting, lists, links, etc.
 */
export declare const ProsemirrorEditor: import('react').ForwardRefExoticComponent<ProsemirrorEditorProps & import('react').RefAttributes<ProsemirrorEditorRef>>;
//# sourceMappingURL=ProsemirrorEditor.d.ts.map