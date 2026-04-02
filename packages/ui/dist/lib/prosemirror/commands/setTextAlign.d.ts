import { Schema } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const setTextAlign: (tr: Transaction, schema: Schema, alignment: string) => Transaction;
export declare const alignmentCommand: (view: EditorView, alignment: string) => void;
