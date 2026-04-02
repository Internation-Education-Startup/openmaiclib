import { PPTElement, PPTLineElement, Slide } from '../types/slides';
interface RotatedElementData {
    left: number;
    top: number;
    width: number;
    height: number;
    rotate: number;
}
interface IdMap {
    [id: string]: string;
}
/**
 * 计算元素在画布中的矩形范围旋转后的新位置范围
 * @param element 元素的位置大小和旋转角度信息
 */
export declare const getRectRotatedRange: (element: RotatedElementData) => {
    xRange: number[];
    yRange: number[];
};
/**
 * 计算元素在画布中的矩形范围旋转后的新位置与旋转之前位置的偏离距离
 * @param element 元素的位置大小和旋转角度信息
 */
export declare const getRectRotatedOffset: (element: RotatedElementData) => {
    offsetX: number;
    offsetY: number;
};
/**
 * 计算元素在画布中的位置范围
 * @param element 元素信息
 */
export declare const getElementRange: (element: PPTElement) => {
    minX: any;
    maxX: any;
    minY: any;
    maxY: any;
};
/**
 * 计算一组元素在画布中的位置范围
 * @param elementList 一组元素信息
 */
export declare const getElementListRange: (elementList: PPTElement[]) => {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
/**
 * 计算线条元素的长度
 * @param element 线条元素
 */
export declare const getLineElementLength: (element: PPTLineElement) => number;
export interface AlignLine {
    value: number;
    range: [number, number];
}
/**
 * 将一组对齐吸附线进行去重：同位置的的多条对齐吸附线仅留下一条，取该位置所有对齐吸附线的最大值和最小值为新的范围
 * @param lines 一组对齐吸附线信息
 */
export declare const uniqAlignLines: (lines: AlignLine[]) => AlignLine[];
/**
 * 以页面列表为基础，为每一个页面生成新的ID，并关联到旧ID形成一个字典
 * 主要用于页面元素时，维持数据中各处页面ID原有的关系
 * @param slides 页面列表
 */
export declare const createSlideIdMap: (slides: Slide[]) => IdMap;
/**
 * 以元素列表为基础，为每一个元素生成新的ID，并关联到旧ID形成一个字典
 * 主要用于复制元素时，维持数据中各处元素ID原有的关系
 * 例如：原本两个组合的元素拥有相同的groupId，复制后依然会拥有另一个相同的groupId
 * @param elements 元素列表数据
 */
export declare const createElementIdMap: (elements: PPTElement[]) => {
    groupIdMap: IdMap;
    elIdMap: IdMap;
};
/**
 * 根据表格的主题色，获取对应用于配色的子颜色
 * @param themeColor 主题色
 */
export declare const getTableSubThemeColor: (themeColor: string) => string[];
/**
 * 获取线条元素路径字符串
 * @param element 线条元素
 */
export declare const getLineElementPath: (element: PPTLineElement) => string;
/**
 * 判断一个元素是否在可视范围内
 * @param element 元素
 * @param parent 父元素
 */
export declare const isElementInViewport: (element: HTMLElement, parent: HTMLElement) => boolean;
export {};
//# sourceMappingURL=element.d.ts.map