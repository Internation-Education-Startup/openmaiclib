import { SceneOutline, UserRequirements, PdfImage, ImageMapping } from '../../lib/types/generation';
export interface GenerationSessionState {
    sessionId: string;
    requirements: UserRequirements;
    pdfText: string;
    pdfImages?: PdfImage[];
    imageStorageIds?: string[];
    imageMapping?: ImageMapping;
    sceneOutlines?: SceneOutline[] | null;
    currentStep: 'generating' | 'complete';
    pdfStorageKey?: string;
    pdfFileName?: string;
    pdfProviderId?: string;
    pdfProviderConfig?: {
        apiKey?: string;
        baseUrl?: string;
    };
    researchContext?: string;
    researchSources?: Array<{
        title: string;
        url: string;
    }>;
}
export type GenerationStep = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    type: 'analysis' | 'writing' | 'visual';
};
export declare const ALL_STEPS: GenerationStep[];
export declare const getActiveSteps: (session: GenerationSessionState | null) => GenerationStep[];
