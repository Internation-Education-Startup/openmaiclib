import { CanvasToolbarProps } from './canvas-toolbar';
import { Scene, StageMode } from '../../lib/types/stage';
interface CanvasAreaProps extends CanvasToolbarProps {
    readonly currentScene: Scene | null;
    readonly mode: StageMode;
    readonly hideToolbar?: boolean;
    readonly isPendingScene?: boolean;
    readonly isGenerationFailed?: boolean;
    readonly onRetryGeneration?: () => void;
}
export declare function CanvasArea({ currentScene, currentSceneIndex, scenesCount, mode, engineState, isLiveSession, whiteboardOpen, sidebarCollapsed, chatCollapsed, onToggleSidebar, onToggleChat, onPrevSlide, onNextSlide, onPlayPause, onWhiteboardClose, isPresenting, onTogglePresentation, showStopDiscussion, onStopDiscussion, hideToolbar, isPendingScene, isGenerationFailed, onRetryGeneration, }: CanvasAreaProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=canvas-area.d.ts.map