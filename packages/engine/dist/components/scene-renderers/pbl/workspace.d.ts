import { PBLProjectConfig } from '../../../lib/pbl/types';
interface PBLWorkspaceProps {
    readonly projectConfig: PBLProjectConfig;
    readonly userRole: string;
    readonly onConfigUpdate: (config: PBLProjectConfig) => void;
    readonly onReset: () => void;
}
export declare function PBLWorkspace({ projectConfig, userRole, onConfigUpdate, onReset, }: PBLWorkspaceProps): import("react/jsx-runtime").JSX.Element;
export {};
