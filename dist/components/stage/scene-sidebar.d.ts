interface SceneSidebarProps {
    readonly collapsed: boolean;
    readonly onCollapseChange: (collapsed: boolean) => void;
    readonly onSceneSelect?: (sceneId: string) => void;
    readonly onRetryOutline?: (outlineId: string) => Promise<void>;
}
export declare function SceneSidebar({ collapsed, onCollapseChange, onSceneSelect, onRetryOutline, }: SceneSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=scene-sidebar.d.ts.map