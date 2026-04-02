import { QuizContent } from '../../lib/types/stage';
interface QuizRendererProps {
    readonly content: QuizContent;
    readonly mode: 'autonomous' | 'playback';
    readonly sceneId: string;
}
export declare function QuizRenderer({ content, mode, sceneId: _sceneId }: QuizRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=quiz-renderer.d.ts.map