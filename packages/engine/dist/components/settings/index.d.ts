import { SettingsSection } from '../../lib/types/settings';
interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialSection?: SettingsSection;
}
export declare function SettingsDialog({ open, onOpenChange, initialSection }: SettingsDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
