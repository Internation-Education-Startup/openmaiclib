import { Schema } from 'prosemirror-model';
import { Command } from 'prosemirror-state';
export declare const buildKeymap: (schema: Schema) => Record<string, Command>;
