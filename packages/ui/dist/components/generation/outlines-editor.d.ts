import { SceneOutline } from '../../lib/types/generation';
interface OutlinesEditorProps {
    outlines: SceneOutline[];
    onChange: (outlines: SceneOutline[]) => void;
    onConfirm: () => void;
    onBack: () => void;
    isLoading?: boolean;
}
export declare function OutlinesEditor({ outlines, onChange, onConfirm, onBack, isLoading, }: OutlinesEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
