interface GeneratingProgressProps {
    outlineReady: boolean;
    firstPageReady: boolean;
    statusMessage: string;
    error?: string | null;
}
export declare function GeneratingProgress({ outlineReady, firstPageReady, statusMessage, error, }: GeneratingProgressProps): import("react/jsx-runtime").JSX.Element;
export {};
