import { ProviderId } from '../../lib/ai/providers';
import { ProvidersConfig } from '../../lib/types/settings';
interface ModelSelectorProps {
    providerId: ProviderId;
    modelId: string;
    onModelChange: (providerId: ProviderId, modelId: string) => void;
    providersConfig: ProvidersConfig;
}
export declare function ModelSelector({ providerId, modelId, onModelChange, providersConfig, }: ModelSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
