class c {
  constructor(e) {
    this.config = e;
  }
  getProjectInfo() {
    return {
      success: !0,
      title: this.config.projectInfo.title,
      description: this.config.projectInfo.description
    };
  }
  updateTitle(e) {
    return e != null && e.trim() ? (this.config.projectInfo.title = e, { success: !0, message: "Title updated successfully." }) : { success: !1, error: "Title cannot be empty." };
  }
  updateDescription(e) {
    return e == null ? { success: !1, error: "Description cannot be null." } : (this.config.projectInfo.description = e, { success: !0, message: "Description updated successfully." });
  }
}
export {
  c as ProjectMCP
};
//# sourceMappingURL=project-mcp.js.map
