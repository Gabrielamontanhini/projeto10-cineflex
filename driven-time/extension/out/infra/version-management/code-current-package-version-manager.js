"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeCurrentPackageVersionManager = void 0;
const path = require("path");
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
class CodeCurrentPackageVersionManager {
    constructor(context) {
        this.context = context;
    }
    async getVersion() {
        const extensionPath = path.join(this.context.extensionPath, 'package.json');
        const packageJsonBuffer = await vscode.workspace.fs.readFile(vscode.Uri.file(extensionPath));
        const packageJson = JSON.parse(packageJsonBuffer.toString());
        return packageJson.version.toString();
    }
}
exports.CodeCurrentPackageVersionManager = CodeCurrentPackageVersionManager;
//# sourceMappingURL=code-current-package-version-manager.js.map