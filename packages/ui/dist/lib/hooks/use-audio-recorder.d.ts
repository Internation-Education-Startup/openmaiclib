declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
export interface UseAudioRecorderOptions {
    onTranscription?: (text: string) => void;
    onError?: (error: string) => void;
}
export declare function useAudioRecorder(options?: UseAudioRecorderOptions): {
    isRecording: boolean;
    isProcessing: boolean;
    recordingTime: number;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    cancelRecording: () => void;
};
