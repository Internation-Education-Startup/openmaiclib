import { LinePoint, LineStyleType } from '../lib/types/slides';
export interface LinePoolItem {
    path: string;
    style: LineStyleType;
    points: [LinePoint, LinePoint];
    isBroken?: boolean;
    isBroken2?: boolean;
    isCurve?: boolean;
    isCubic?: boolean;
}
interface PresetLine {
    type: string;
    children: LinePoolItem[];
}
export declare const LINE_LIST: PresetLine[];
export {};
