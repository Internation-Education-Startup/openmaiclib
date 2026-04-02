import { PBLContent } from '../../lib/types/stage';
interface PBLRendererProps {
    readonly content: PBLContent;
    readonly mode: 'autonomous' | 'playback';
    readonly sceneId: string;
}
export declare function PBLRenderer({ content, mode: _mode, sceneId }: PBLRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=pbl-renderer.d.ts.map