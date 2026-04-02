interface AgentRevealModalProps {
    agents: Array<{
        id: string;
        name: string;
        role: string;
        persona: string;
        avatar: string;
        color: string;
    }>;
    open: boolean;
    onClose: () => void;
    /** Called once after all cards are revealed — signals generation can continue */
    onAllRevealed?: () => void;
}
export declare function AgentRevealModal({ agents, open, onClose, onAllRevealed }: AgentRevealModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=agent-reveal-modal.d.ts.map