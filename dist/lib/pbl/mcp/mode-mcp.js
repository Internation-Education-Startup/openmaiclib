class t {
  constructor(e, r) {
    this.availableModes = e, this.currentMode = r;
  }
  setMode(e) {
    return this.availableModes.includes(e) ? e === this.currentMode ? { success: !1, error: `Already in "${e}" mode.` } : (this.currentMode = e, { success: !0, message: `Switched to "${e}" mode.` }) : {
      success: !1,
      error: `Mode "${e}" not available. Available: ${this.availableModes.join(", ")}`
    };
  }
  getCurrentMode() {
    return this.currentMode;
  }
  getAvailableModes() {
    return [...this.availableModes];
  }
}
export {
  t as ModeMCP
};
//# sourceMappingURL=mode-mcp.js.map
