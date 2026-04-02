import { AgentConfig } from '../orchestration/registry/types';
import { AudioIndicatorState } from '../../components/roundtable/audio-indicator';
interface DiscussionTTSOptions {
    enabled: boolean;
    agents: AgentConfig[];
    onAudioStateChange?: (agentId: string | null, state: AudioIndicatorState) => void;
}
export declare function useDiscussionTTS({ enabled, agents, onAudioStateChange }: DiscussionTTSOptions): {
    handleSegmentSealed: (messageId: string, partId: string, fullText: string, agentId: string | null) => void;
    cleanup: () => void;
    pause: () => void;
    resume: () => void;
    shouldHold: () => {
        holding: boolean;
        segmentDone: number;
    };
};
export {};
//# sourceMappingURL=use-discussion-tts.d.ts.map