import { Token, HTMLNode } from './types';
interface StackItem {
    tagName: string | null;
    children: HTMLNode[];
}
interface State {
    stack: StackItem[];
    cursor: number;
    tokens: Token[];
}
export declare const parser: (tokens: Token[]) => HTMLNode[];
export declare const hasTerminalParent: (tagName: string, stack: StackItem[]) => boolean;
export declare const rewindStack: (stack: StackItem[], newLength: number) => void;
export declare const parse: (state: State) => void;
export {};
//# sourceMappingURL=parser.d.ts.map