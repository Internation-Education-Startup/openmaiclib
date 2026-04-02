import { SceneOutline, PdfImage, ImageMapping } from '../types/generation';
import { AgentInfo } from '../generation/generation-pipeline';
import { Scene } from '../types/stage';
/** Generate TTS for one speech action and store in IndexedDB */
export declare function generateAndStoreTTS(audioId: string, text: string, signal?: AbortSignal): Promise<void>;
export interface UseSceneGeneratorOptions {
    onSceneGenerated?: (scene: Scene, index: number) => void;
    onSceneFailed?: (outline: SceneOutline, error: string) => void;
    onPhaseChange?: (phase: 'content' | 'actions', outline: SceneOutline) => void;
    onComplete?: () => void;
}
export interface GenerationParams {
    pdfImages?: PdfImage[];
    imageMapping?: ImageMapping;
    stageInfo: {
        name: string;
        description?: string;
        language?: string;
        style?: string;
    };
    agents?: AgentInfo[];
    userProfile?: string;
}
export declare function useSceneGenerator(options?: UseSceneGeneratorOptions): {
    generateRemaining: (params: GenerationParams) => Promise<void>;
    retrySingleOutline: (outlineId: string) => Promise<void>;
    stop: () => void;
    isGenerating: () => boolean;
};
//# sourceMappingURL=use-scene-generator.d.ts.map