export interface KeyboardState {
    ctrlKeyState: boolean;
    shiftKeyState: boolean;
    spaceKeyState: boolean;
    ctrlOrShiftKeyActive: () => boolean;
    setCtrlKeyState: (active: boolean) => void;
    setShiftKeyState: (active: boolean) => void;
    setSpaceKeyState: (active: boolean) => void;
}
export declare const useKeyboardStore: import('zustand').UseBoundStore<import('zustand').StoreApi<KeyboardState>>;
//# sourceMappingURL=keyboard.d.ts.map