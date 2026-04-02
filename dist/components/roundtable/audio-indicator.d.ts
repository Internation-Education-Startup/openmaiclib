export type AudioIndicatorState = 'idle' | 'generating' | 'playing';
interface AudioIndicatorProps {
    state: AudioIndicatorState;
    agentColor?: string;
}
export declare function AudioIndicator({ state, agentColor }: AudioIndicatorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=audio-indicator.d.ts.map