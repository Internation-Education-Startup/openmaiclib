import { PercentageGeometry } from '../../../lib/types/action';
interface LaserOverlayProps {
    geometry: PercentageGeometry;
    color?: string;
    duration?: number;
}
/**
 * Laser pointer overlay component
 *
 * Features:
 * - Smoothly flies in from the nearest corner to the element center
 * - Elegant light dot with soft breathing glow
 * - Uses percentage positioning (0-100)
 */
export declare function LaserOverlay({ geometry, color, duration: _duration, }: LaserOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LaserOverlay.d.ts.map