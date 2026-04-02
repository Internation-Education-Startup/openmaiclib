import { PBLAgent, PBLProjectInfo } from '../../../lib/pbl/types';
interface PBLRoleSelectionProps {
    readonly projectInfo: PBLProjectInfo;
    readonly agents: PBLAgent[];
    readonly onSelectRole: (agentName: string) => void;
}
export declare function PBLRoleSelection({ projectInfo, agents, onSelectRole }: PBLRoleSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=role-selection.d.ts.map