import { EditorView } from 'prosemirror-view';
type Style = Record<string, string>;
export declare const setListStyle: (view: EditorView, style: Style | Style[]) => import('prosemirror-state').Transaction;
export {};
