import { PBLMode, PBLToolResult } from '../types';
export declare class ModeMCP {
    private currentMode;
    private availableModes;
    constructor(availableModes: PBLMode[], defaultMode: PBLMode);
    setMode(mode: PBLMode): PBLToolResult;
    getCurrentMode(): PBLMode;
    getAvailableModes(): PBLMode[];
}
//# sourceMappingURL=mode-mcp.d.ts.map