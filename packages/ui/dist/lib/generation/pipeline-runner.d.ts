import { UserRequirements, GenerationSession } from '../types/generation';
import { StageStore } from '../api/stage-api';
import { AICallFn, GenerationResult, GenerationCallbacks } from './pipeline-types';
export declare function createGenerationSession(requirements: UserRequirements): GenerationSession;
export declare function runGenerationPipeline(session: GenerationSession, store: StageStore, aiCall: AICallFn, callbacks?: GenerationCallbacks): Promise<GenerationResult<GenerationSession>>;
