import { default as Dexie, EntityTable } from 'dexie';
import { Scene, SceneType, SceneContent, Whiteboard } from '../types/stage';
import { Action } from '../types/action';
import { SessionType, SessionStatus, SessionConfig, ToolCallRecord, ToolCallRequest } from '../types/chat';
import { SceneOutline } from '../types/generation';
import { UIMessage } from 'ai';
/**
 * Legacy Snapshot type for undo/redo functionality
 * Used by useSnapshotStore
 */
export interface Snapshot {
    id?: number;
    index: number;
    slides: Scene[];
}
/**
 * MAIC Local Database
 *
 * Uses IndexedDB to store all user data locally
 * - Does not delete expired data; all data is stored permanently
 * - Uses a fixed database name
 * - Supports multi-course management
 */
/**
 * Stage table - Course basic info
 */
export interface StageRecord {
    id: string;
    name: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
    language?: string;
    style?: string;
    currentSceneId?: string;
    agentIds?: string[];
}
/**
 * Scene table - Scene/page data
 */
export interface SceneRecord {
    id: string;
    stageId: string;
    type: SceneType;
    title: string;
    order: number;
    content: SceneContent;
    actions?: Action[];
    whiteboard?: Whiteboard[];
    createdAt: number;
    updatedAt: number;
}
/**
 * AudioFile table - Audio files (TTS)
 */
export interface AudioFileRecord {
    id: string;
    blob: Blob;
    duration?: number;
    format: string;
    text?: string;
    voice?: string;
    createdAt: number;
    ossKey?: string;
}
/**
 * ImageFile table - Image files
 */
export interface ImageFileRecord {
    id: string;
    blob: Blob;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: number;
}
/**
 * ChatSession table - Chat session data
 */
export interface ChatSessionRecord {
    id: string;
    stageId: string;
    type: SessionType;
    title: string;
    status: SessionStatus;
    messages: UIMessage[];
    config: SessionConfig;
    toolCalls: ToolCallRecord[];
    pendingToolCalls: ToolCallRequest[];
    createdAt: number;
    updatedAt: number;
    sceneId?: string;
    lastActionIndex?: number;
}
/**
 * PlaybackState table - Playback state snapshot (at most one per stage)
 */
export interface PlaybackStateRecord {
    stageId: string;
    sceneIndex: number;
    actionIndex: number;
    consumedDiscussions: string[];
    updatedAt: number;
}
/**
 * StageOutlines table - Persisted outlines for resume-on-refresh
 */
export interface StageOutlinesRecord {
    stageId: string;
    outlines: SceneOutline[];
    createdAt: number;
    updatedAt: number;
}
/**
 * MediaFile table - AI-generated media files (images/videos)
 */
export interface MediaFileRecord {
    id: string;
    stageId: string;
    type: 'image' | 'video';
    blob: Blob;
    mimeType: string;
    size: number;
    poster?: Blob;
    prompt: string;
    params: string;
    error?: string;
    errorCode?: string;
    ossKey?: string;
    posterOssKey?: string;
    createdAt: number;
}
/**
 * GeneratedAgent table - AI-generated agent profiles
 */
export interface GeneratedAgentRecord {
    id: string;
    stageId: string;
    name: string;
    role: string;
    persona: string;
    avatar: string;
    color: string;
    priority: number;
    createdAt: number;
}
/** Build the compound primary key for mediaFiles: `${stageId}:${elementId}` */
export declare function mediaFileKey(stageId: string, elementId: string): string;
/**
 * MAIC Database Instance
 */
declare class MAICDatabase extends Dexie {
    stages: EntityTable<StageRecord, 'id'>;
    scenes: EntityTable<SceneRecord, 'id'>;
    audioFiles: EntityTable<AudioFileRecord, 'id'>;
    imageFiles: EntityTable<ImageFileRecord, 'id'>;
    snapshots: EntityTable<Snapshot, 'id'>;
    chatSessions: EntityTable<ChatSessionRecord, 'id'>;
    playbackState: EntityTable<PlaybackStateRecord, 'stageId'>;
    stageOutlines: EntityTable<StageOutlinesRecord, 'stageId'>;
    mediaFiles: EntityTable<MediaFileRecord, 'id'>;
    generatedAgents: EntityTable<GeneratedAgentRecord, 'id'>;
    constructor();
}
export declare const db: MAICDatabase;
/**
 * Initialize database
 * Call at application startup
 */
export declare function initDatabase(): Promise<void>;
/**
 * Clear database (optional)
 * Use with caution: deletes all data
 */
export declare function clearDatabase(): Promise<void>;
/**
 * Export database contents (for backup)
 */
export declare function exportDatabase(): Promise<{
    stages: StageRecord[];
    scenes: SceneRecord[];
    chatSessions: ChatSessionRecord[];
    playbackState: PlaybackStateRecord[];
}>;
/**
 * Import database contents (for restoring backups)
 */
export declare function importDatabase(data: {
    stages?: StageRecord[];
    scenes?: SceneRecord[];
    chatSessions?: ChatSessionRecord[];
    playbackState?: PlaybackStateRecord[];
}): Promise<void>;
/**
 * Get all scenes for a course
 */
export declare function getScenesByStageId(stageId: string): Promise<SceneRecord[]>;
/**
 * Delete a course and all its related data
 */
export declare function deleteStageWithRelatedData(stageId: string): Promise<void>;
/**
 * Get all generated agents for a course
 */
export declare function getGeneratedAgentsByStageId(stageId: string): Promise<GeneratedAgentRecord[]>;
/**
 * Get database statistics
 */
export declare function getDatabaseStats(): Promise<{
    stages: number;
    scenes: number;
    audioFiles: number;
    imageFiles: number;
    snapshots: number;
    chatSessions: number;
    playbackState: number;
    stageOutlines: number;
    mediaFiles: number;
    generatedAgents: number;
}>;
export {};
