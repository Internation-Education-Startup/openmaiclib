import { HTMLNode, AST } from './types';
export declare const splitHead: (str: string, sep: string) => string[];
export declare const format: (nodes: HTMLNode[]) => AST[];
