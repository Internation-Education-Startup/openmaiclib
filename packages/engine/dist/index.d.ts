/**
 * OpenMAIC Library — Client Entry Point
 *
 * Re-exports all client-side components, stores, hooks, types, and utilities
 * needed by the consuming frontend app.
 */
export { MaicRouterContext, MaicParamsContext, useRouter, useParams } from './shims/next-navigation';
export type { MaicRouter } from './shims/next-navigation';
export { useCanvasStore, useStageStore, useSnapshotStore, useKeyboardStore, useSettingsStore, SceneProvider, useSceneData, useSceneSelector, } from './lib/store';
export { useMediaGenerationStore } from './lib/store/media-generation';
export { useWhiteboardHistoryStore } from './lib/store/whiteboard-history';
export { useUserProfileStore, AVATAR_OPTIONS } from './lib/store/user-profile';
export { useAgentRegistry, agentsToParticipants, getDefaultAgents, loadGeneratedAgentsForStage, } from './lib/orchestration/registry/store';
export { useI18n, I18nProvider } from './lib/hooks/use-i18n';
export { useTheme, ThemeProvider } from './lib/hooks/use-theme';
export { useSceneGenerator } from './lib/hooks/use-scene-generator';
export { useDraftCache } from './lib/hooks/use-draft-cache';
export { MediaStageProvider } from './lib/contexts/media-stage-context';
export { Stage } from './components/stage';
export { Header } from './components/header';
export { SettingsDialog } from './components/settings';
export { GenerationToolbar } from './components/generation/generation-toolbar';
export { GeneratingProgress } from './components/generation/generating-progress';
export { OutlinesEditor } from './components/generation/outlines-editor';
export { AgentBar } from './components/agent/agent-bar';
export { ChatArea } from './components/chat/chat-area';
export { SpeechButton } from './components/audio/speech-button';
export { ServerProvidersInit } from './components/server-providers-init';
export { ThumbnailSlide } from './components/slide-renderer/components/ThumbnailSlide';
export type { Stage as StageType, Scene, SceneType } from './lib/types/stage';
export type { UserRequirements, SceneOutline } from './lib/types/generation';
export type { Slide } from './lib/types/slides';
export type { Action } from './lib/types/action';
export type { SettingsSection } from './lib/types/settings';
export { cn } from './lib/utils';
export { createLogger } from './lib/logger';
export { listStages, deleteStageData, renameStage, getFirstSlideByStages, } from './lib/utils/stage-storage';
export type { StageListItem } from './lib/utils/stage-storage';
export { storePdfBlob, loadImageMapping } from './lib/utils/image-storage';
export { generateSceneOutlinesFromRequirements, applyOutlineFallbacks, } from './lib/generation/outline-generator';
export { generateSceneContent, generateSceneActions, createSceneWithActions, } from './lib/generation/scene-generator';
export { generateMediaForOutlines } from './lib/media/media-orchestrator';
export { default as OpenMAICHomePage } from './pages/home';
export { default as GenerationPreviewPage } from './pages/generation-preview/page';
export { default as ClassroomPage } from './pages/classroom';
