"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeEventManager = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
class CodeEventManager {
    constructor() {
        this.listeners = [];
        this.onDidChangeTextEditorSelection = (e) => {
            this.listeners.forEach((listener) => listener({ name: 'selection-change' }));
        };
        this.onDidChangeActiveTextEditor = (e) => {
            this.listeners.forEach((listener) => listener({ name: 'editor-change' }));
        };
        this.onDidSaveTextDocument = (e) => {
            this.listeners.forEach((listener) => listener({ name: 'editor-save' }));
        };
    }
    addUserEventListeners(listener) {
        this.populateDisposable();
        this.listeners.push(listener);
    }
    removeEventListeners() {
        this.disposable?.dispose();
        this.disposable = undefined;
    }
    isListening() {
        return this.disposable !== undefined;
    }
    populateDisposable() {
        const s1 = vscode.window.onDidChangeTextEditorSelection(this.onDidChangeTextEditorSelection);
        const s2 = vscode.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor);
        const s3 = vscode.workspace.onDidSaveTextDocument(this.onDidSaveTextDocument);
        this.disposable = vscode.Disposable.from(...[s1, s2, s3]);
    }
}
exports.CodeEventManager = CodeEventManager;
//# sourceMappingURL=code-event-manager.js.map