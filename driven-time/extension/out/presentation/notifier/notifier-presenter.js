"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifierPresenter = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
class NotifierPresenter {
    mount(message, type = 'message') {
        const notifier = type === 'message'
            ? vscode.window.showInformationMessage
            : vscode.window.showErrorMessage;
        notifier(message);
    }
}
exports.NotifierPresenter = NotifierPresenter;
//# sourceMappingURL=notifier-presenter.js.map