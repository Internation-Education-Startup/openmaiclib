import { LinePoint } from '../../../../../lib/types/slides';
type NonEmptyLinePoint = Exclude<LinePoint, ''>;
interface LinePointMarkerProps {
    id: string;
    position: 'start' | 'end';
    type: NonEmptyLinePoint;
    baseSize: number;
    color?: string;
}
export declare function LinePointMarker({ id, position, type, baseSize, color }: LinePointMarkerProps): import("react/jsx-runtime").JSX.Element;
export {};
