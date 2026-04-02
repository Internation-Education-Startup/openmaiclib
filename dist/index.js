import { MaicParamsContext as o, MaicRouterContext as t, useParams as a, useRouter as n } from "./shims/next-navigation.js";
import { useCanvasStore as m } from "./lib/store/canvas.js";
import { useSnapshotStore as f } from "./lib/store/snapshot.js";
import { useKeyboardStore as x } from "./lib/store/keyboard.js";
import { useStageStore as g } from "./lib/store/stage.js";
import { useSettingsStore as l } from "./lib/store/settings.js";
import { SceneProvider as c, useSceneData as P, useSceneSelector as A } from "./lib/contexts/scene-context.js";
import { useMediaGenerationStore as v } from "./lib/store/media-generation.js";
import { useWhiteboardHistoryStore as M } from "./lib/store/whiteboard-history.js";
import { AVATAR_OPTIONS as T, useUserProfileStore as b } from "./lib/store/user-profile.js";
import { agentsToParticipants as I, getDefaultAgents as y, loadGeneratedAgentsForStage as D, useAgentRegistry as F } from "./lib/orchestration/registry/store.js";
import { I18nProvider as B, useI18n as H } from "./lib/hooks/use-i18n.js";
import { ThemeProvider as k, useTheme as q } from "./lib/hooks/use-theme.js";
import { useSceneGenerator as E } from "./lib/hooks/use-scene-generator.js";
import { useDraftCache as L } from "./lib/hooks/use-draft-cache.js";
import { MediaStageProvider as U } from "./lib/contexts/media-stage-context.js";
import { Stage as _ } from "./components/stage.js";
import { Header as z } from "./components/header.js";
import { SettingsDialog as Q } from "./components/settings/index.js";
import { GenerationToolbar as Y } from "./components/generation/generation-toolbar.js";
import { GeneratingProgress as $ } from "./components/generation/generating-progress.js";
import { OutlinesEditor as re } from "./components/generation/outlines-editor.js";
import { AgentBar as te } from "./components/agent/agent-bar.js";
import { ChatArea as ne } from "./components/chat/chat-area.js";
import { SpeechButton as me } from "./components/audio/speech-button.js";
import { ServerProvidersInit as fe } from "./components/server-providers-init.js";
import { ThumbnailSlide as xe } from "./components/slide-renderer/components/ThumbnailSlide/index.js";
import { cn as ge } from "./lib/utils/cn.js";
import { createLogger as le } from "./lib/logger.js";
import { deleteStageData as ce, getFirstSlideByStages as Pe, listStages as Ae, renameStage as he } from "./lib/utils/stage-storage.js";
import { loadImageMapping as Ce, storePdfBlob as Me } from "./lib/utils/image-storage.js";
import { applyOutlineFallbacks as Te, generateSceneOutlinesFromRequirements as be } from "./lib/generation/outline-generator.js";
import { createSceneWithActions as Ie, generateSceneActions as ye, generateSceneContent as De } from "./lib/generation/scene-generator.js";
import { generateMediaForOutlines as Re } from "./lib/media/media-orchestrator.js";
import { default as He } from "./pages/home.js";
import { default as ke } from "./pages/generation-preview/page.js";
import { default as we } from "./pages/classroom.js";
export {
  T as AVATAR_OPTIONS,
  te as AgentBar,
  ne as ChatArea,
  we as ClassroomPage,
  $ as GeneratingProgress,
  ke as GenerationPreviewPage,
  Y as GenerationToolbar,
  z as Header,
  B as I18nProvider,
  o as MaicParamsContext,
  t as MaicRouterContext,
  U as MediaStageProvider,
  He as OpenMAICHomePage,
  re as OutlinesEditor,
  c as SceneProvider,
  fe as ServerProvidersInit,
  Q as SettingsDialog,
  me as SpeechButton,
  _ as Stage,
  k as ThemeProvider,
  xe as ThumbnailSlide,
  I as agentsToParticipants,
  Te as applyOutlineFallbacks,
  ge as cn,
  le as createLogger,
  Ie as createSceneWithActions,
  ce as deleteStageData,
  Re as generateMediaForOutlines,
  ye as generateSceneActions,
  De as generateSceneContent,
  be as generateSceneOutlinesFromRequirements,
  y as getDefaultAgents,
  Pe as getFirstSlideByStages,
  Ae as listStages,
  D as loadGeneratedAgentsForStage,
  Ce as loadImageMapping,
  he as renameStage,
  Me as storePdfBlob,
  F as useAgentRegistry,
  m as useCanvasStore,
  L as useDraftCache,
  H as useI18n,
  x as useKeyboardStore,
  v as useMediaGenerationStore,
  a as useParams,
  n as useRouter,
  P as useSceneData,
  E as useSceneGenerator,
  A as useSceneSelector,
  l as useSettingsStore,
  f as useSnapshotStore,
  g as useStageStore,
  q as useTheme,
  b as useUserProfileStore,
  M as useWhiteboardHistoryStore
};
//# sourceMappingURL=index.js.map
