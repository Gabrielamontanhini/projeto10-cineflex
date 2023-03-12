"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeCommandManager = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
class CodeCommandManager {
    constructor(commands, context) {
        this.commands = commands;
        this.context = context;
        this.disposables = [];
        this.setupCommands = (onSuccess, onFailure) => {
            this.commands.forEach((command) => {
                const commandDisposable = vscode.commands.registerCommand(command.registry, () => {
                    command.implementation(this.context).then(onSuccess).catch(onFailure);
                });
                this.disposables.push(commandDisposable);
                this.context.subscriptions.push(commandDisposable);
            });
        };
        this.removeCommands = () => {
            this.disposables.forEach((disposable) => {
                disposable.dispose();
            });
        };
    }
}
exports.CodeCommandManager = CodeCommandManager;
//# sourceMappingURL=code-command-manager.js.map