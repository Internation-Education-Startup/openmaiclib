interface WhiteboardHistoryProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}
/**
 * Whiteboard history dropdown panel.
 * Shows a list of saved whiteboard snapshots with timestamps and element counts.
 * Clicking "Restore" replaces the current whiteboard content with the snapshot.
 */
export declare function WhiteboardHistory({ isOpen, onClose }: WhiteboardHistoryProps): import("react/jsx-runtime").JSX.Element;
export {};
