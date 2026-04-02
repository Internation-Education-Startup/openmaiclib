import { NextRequest } from '../../shims/next-server.ts';
import { Scene, Stage } from '../types/stage';
export declare const CLASSROOMS_DIR: string;
export declare const CLASSROOM_JOBS_DIR: string;
export declare function ensureClassroomsDir(): Promise<void>;
export declare function ensureClassroomJobsDir(): Promise<void>;
export declare function writeJsonFileAtomic(filePath: string, data: unknown): Promise<void>;
export declare function buildRequestOrigin(req: NextRequest): string;
export interface PersistedClassroomData {
    id: string;
    stage: Stage;
    scenes: Scene[];
    createdAt: string;
}
export declare function isValidClassroomId(id: string): boolean;
export declare function readClassroom(id: string): Promise<PersistedClassroomData | null>;
export declare function persistClassroom(data: {
    id: string;
    stage: Stage;
    scenes: Scene[];
}, baseUrl: string): Promise<PersistedClassroomData & {
    url: string;
}>;
//# sourceMappingURL=classroom-storage.d.ts.map