import { SceneOutline } from '../types/generation';
import { Scene } from '../types/stage';
export declare function generateMediaForClassroom(outlines: SceneOutline[], classroomId: string, baseUrl: string): Promise<Record<string, string>>;
export declare function replaceMediaPlaceholders(scenes: Scene[], mediaMap: Record<string, string>): void;
export declare function generateTTSForClassroom(scenes: Scene[], classroomId: string, baseUrl: string): Promise<void>;
