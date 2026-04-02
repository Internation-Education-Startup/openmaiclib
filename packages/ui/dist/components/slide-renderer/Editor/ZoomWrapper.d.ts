import { ReactNode } from 'react';
import { PercentageGeometry } from '../../../lib/types/action';
interface ZoomWrapperProps {
    children: ReactNode;
    zoomTarget: {
        elementId: string;
        scale: number;
    } | null;
    geometry: PercentageGeometry | null;
}
/**
 * 缩放包装器组件
 *
 * 功能：
 * - 包裹整个画布，根据 zoomTarget 进行缩放
 * - 以元素中心为缩放原点
 * - 使用百分比坐标系统
 */
export declare function ZoomWrapper({ children, zoomTarget, geometry }: ZoomWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
