/**
 * 简单解析SVG路径
 * @param d SVG path d属性
 */
export declare const parseSvgPath: (d: string) => ({
    type: string;
    relative: boolean;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    x: number;
} | {
    type: string;
    relative: boolean;
    y: number;
} | {
    type: string;
} | {
    type: string;
    relative: boolean;
    x1: number;
    y1: number;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    x2: number;
    y2: number;
    x: number;
    y: number;
} | {
    type: string;
    relative: boolean;
    rX: number;
    rY: number;
    xRot: number;
    sweepFlag: 0 | 1;
    lArcFlag: 0 | 1;
    x: number;
    y: number;
    cX?: number;
    cY?: number;
    phi1?: number;
    phi2?: number;
})[];
export type SvgPath = ReturnType<typeof parseSvgPath>;
/**
 * 解析SVG路径，并将圆弧（A）类型的路径转为三次贝塞尔（C）类型的路径
 * @param d SVG path d属性
 */
export declare const toPoints: (d: string) => any[];
export declare const getSvgPathRange: (path: string) => {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
export type SvgPoints = ReturnType<typeof toPoints>;
