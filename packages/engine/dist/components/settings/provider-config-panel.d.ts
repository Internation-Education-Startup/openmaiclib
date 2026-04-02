import { ProviderConfig } from '../../lib/ai/providers';
import { ProvidersConfig } from '../../lib/types/settings';
interface ProviderConfigPanelProps {
    provider: ProviderConfig;
    initialApiKey: string;
    initialBaseUrl: string;
    initialRequiresApiKey: boolean;
    providersConfig: ProvidersConfig;
    onConfigChange: (apiKey: string, baseUrl: string, requiresApiKey: boolean) => void;
    onSave: () => void;
    onEditModel: (index: number) => void;
    onDeleteModel: (index: number) => void;
    onAddModel: () => void;
    onResetToDefault?: () => void;
    isBuiltIn: boolean;
}
export declare function ProviderConfigPanel({ provider, initialApiKey, initialBaseUrl, initialRequiresApiKey, providersConfig, onConfigChange, onSave, onEditModel, onDeleteModel, onAddModel, onResetToDefault, isBuiltIn, }: ProviderConfigPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
