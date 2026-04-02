import { ProviderId, ProviderConfig } from '../../lib/ai/providers';
interface ProviderWithServerInfo extends ProviderConfig {
    isServerConfigured?: boolean;
}
interface ProviderListProps {
    providers: ProviderWithServerInfo[];
    selectedProviderId: ProviderId;
    onSelect: (providerId: ProviderId) => void;
    onAddProvider: () => void;
    width?: number;
}
export declare function ProviderList({ providers, selectedProviderId, onSelect, onAddProvider, width, }: ProviderListProps): import("react/jsx-runtime").JSX.Element;
export {};
