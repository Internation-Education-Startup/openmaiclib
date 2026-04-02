import { Slide } from '../../../../lib/types/slides';
interface ThumbnailSlideProps {
    /** Slide data */
    readonly slide: Slide;
    /** Thumbnail width */
    readonly size: number;
    /** Viewport width base (default 1000px) */
    readonly viewportSize: number;
    /** Viewport aspect ratio (default 0.5625 i.e. 16:9) */
    readonly viewportRatio: number;
    /** Whether visible (for lazy loading optimization) */
    readonly visible?: boolean;
}
/**
 * Thumbnail slide component
 *
 * Renders a thumbnail preview of a single slide
 * Uses CSS transform scale to resize the entire view for better performance
 */
export declare function ThumbnailSlide({ slide, size, viewportSize, viewportRatio, visible, }: ThumbnailSlideProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map