import { create as S } from "zustand";
const s = S((e, a) => ({
  // Initial state
  ctrlKeyState: !1,
  // Ctrl key pressed state
  shiftKeyState: !1,
  // Shift key pressed state
  spaceKeyState: !1,
  // Space key pressed state
  // Getters
  ctrlOrShiftKeyActive: () => {
    const t = a();
    return t.ctrlKeyState || t.shiftKeyState;
  },
  // Actions
  setCtrlKeyState: (t) => e({ ctrlKeyState: t }),
  setShiftKeyState: (t) => e({ shiftKeyState: t }),
  setSpaceKeyState: (t) => e({ spaceKeyState: t })
}));
export {
  s as useKeyboardStore
};
//# sourceMappingURL=keyboard.js.map
