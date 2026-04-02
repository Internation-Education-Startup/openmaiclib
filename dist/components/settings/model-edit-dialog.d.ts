import { EditingModel } from '../../lib/types/settings';
import { ProviderId } from '../../lib/ai/providers';
interface ModelEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingModel: EditingModel | null;
    setEditingModel: (model: EditingModel | null) => void;
    onSave: () => void;
    onAutoSave?: () => void;
    providerId: ProviderId;
    apiKey: string;
    baseUrl?: string;
    providerType?: string;
    requiresApiKey?: boolean;
    isServerConfigured?: boolean;
}
export declare function ModelEditDialog({ open, onOpenChange, editingModel, setEditingModel, onSave, onAutoSave, providerId, apiKey, baseUrl, providerType, requiresApiKey, isServerConfigured, }: ModelEditDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=model-edit-dialog.d.ts.map