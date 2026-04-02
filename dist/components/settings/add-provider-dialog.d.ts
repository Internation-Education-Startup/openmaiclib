export interface NewProviderData {
    name: string;
    type: 'openai' | 'anthropic' | 'google';
    baseUrl: string;
    icon: string;
    requiresApiKey: boolean;
}
interface AddProviderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: (provider: NewProviderData) => void;
}
export declare function AddProviderDialog({ open, onOpenChange, onAdd }: AddProviderDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=add-provider-dialog.d.ts.map