import { PBLProjectConfig, PBLChatMessage, PBLIssue } from '../../../lib/pbl/types';
interface UsePBLChatOptions {
    projectConfig: PBLProjectConfig;
    userRole: string;
    onConfigUpdate: (config: PBLProjectConfig) => void;
}
export declare function usePBLChat({ projectConfig, userRole, onConfigUpdate }: UsePBLChatOptions): {
    messages: PBLChatMessage[];
    isLoading: boolean;
    sendMessage: (text: string) => Promise<void>;
    currentIssue: PBLIssue;
};
export {};
//# sourceMappingURL=use-pbl-chat.d.ts.map