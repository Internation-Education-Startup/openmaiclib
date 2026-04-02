import { ReactFlowProps } from '@xyflow/react';
import { ReactNode } from 'react';
type CanvasProps = ReactFlowProps & {
    children?: ReactNode;
};
export declare const Canvas: ({ children, ...props }: CanvasProps) => import("react/jsx-runtime").JSX.Element;
export {};
