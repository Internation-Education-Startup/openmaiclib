import { InteractiveContent } from '../../lib/types/stage';
interface InteractiveRendererProps {
    readonly content: InteractiveContent;
    readonly mode: 'autonomous' | 'playback';
    readonly sceneId: string;
}
export declare function InteractiveRenderer({ content, mode: _mode, sceneId }: InteractiveRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
