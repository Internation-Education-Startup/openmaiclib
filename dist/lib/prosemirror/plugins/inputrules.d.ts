import { Schema } from 'prosemirror-model';
export declare const buildInputRules: (schema: Schema) => import('prosemirror-state').Plugin<{
    transform: import('prosemirror-state').Transaction;
    from: number;
    to: number;
    text: string;
}>;
//# sourceMappingURL=inputrules.d.ts.map