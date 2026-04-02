export declare const enum ClipPathTypes {
    RECT = "rect",
    ELLIPSE = "ellipse",
    POLYGON = "polygon"
}
export declare const enum ClipPaths {
    RECT = "rect",
    ROUNDRECT = "roundRect",
    ELLIPSE = "ellipse",
    TRIANGLE = "triangle",
    PENTAGON = "pentagon",
    RHOMBUS = "rhombus",
    STAR = "star"
}
interface ClipPath {
    [key: string]: {
        name: string;
        type: ClipPathTypes;
        style: string;
        radius?: string;
        createPath?: (width: number, height: number) => string;
    };
}
export declare const CLIPPATHS: ClipPath;
export {};
//# sourceMappingURL=image-clip.d.ts.map