import { ImageClipedEmitData } from '../../../../../lib/types/edit';
import { ImageElementClip } from '../../../../../lib/types/slides';
export interface ImageClipHandlerProps {
    src: string;
    clipPath: string;
    width: number;
    height: number;
    top: number;
    left: number;
    rotate: number;
    clipData?: ImageElementClip;
    onClip: (payload: ImageClipedEmitData | null) => void;
}
export declare function ImageClipHandler({ src, clipPath, width, height, rotate, clipData, onClip, }: ImageClipHandlerProps): import("react/jsx-runtime").JSX.Element;
