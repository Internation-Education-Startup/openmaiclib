import { Schema } from 'prosemirror-model';
export interface PluginOptions {
    placeholder?: string;
}
export declare const buildPlugins: (schema: Schema, options?: PluginOptions) => import('prosemirror-state').Plugin<any>[];
