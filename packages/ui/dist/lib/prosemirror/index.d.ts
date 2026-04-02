import { DirectEditorProps, EditorView } from 'prosemirror-view';
import { PluginOptions } from './plugins/index';
export declare const createDocument: (content: string) => import('prosemirror-model').Node;
export declare const initProsemirrorEditor: (dom: Element, content: string, props: Omit<DirectEditorProps, "state">, pluginOptions?: PluginOptions) => EditorView;
