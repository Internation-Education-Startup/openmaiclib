import { AST, ElementAttribute } from './types';
export declare const formatAttributes: (attributes: ElementAttribute[]) => string;
export declare const toHTML: (tree: AST[]) => string;
