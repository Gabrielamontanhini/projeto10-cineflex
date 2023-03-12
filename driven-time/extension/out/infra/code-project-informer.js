"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProjectInformer = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
class CodeProjectInformer {
    getProjectName() {
        const editor = this.editor;
        if (editor) {
            const project = vscode.workspace.getWorkspaceFolder(editor.document.uri);
            if (project) {
                return project.name;
            }
        }
        return null;
    }
    get editor() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            return editor;
        }
        return null;
    }
}
exports.CodeProjectInformer = CodeProjectInformer;
//# sourceMappingURL=code-project-informer.js.map