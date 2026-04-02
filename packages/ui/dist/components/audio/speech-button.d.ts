interface SpeechButtonProps {
    onTranscription: (text: string) => void;
    className?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
}
export declare function SpeechButton({ onTranscription, className, disabled, size, }: SpeechButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
