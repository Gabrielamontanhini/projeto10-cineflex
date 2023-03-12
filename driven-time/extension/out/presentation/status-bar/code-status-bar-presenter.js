"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarState = exports.CodeStatusBarPresenter = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
const constants_1 = require("../../constants");
const state_1 = require("../state");
class CodeStatusBarPresenter {
    constructor() {
        this.render = () => {
            this.statusBar.text = this.statusBarProperties.getState().text;
            this.statusBar.tooltip = this.statusBarProperties.getState().tooltip;
            this.statusBar.color = this.statusBarProperties.getState().backgroundColor;
            this.statusBar.command = this.statusBarProperties.getState().command;
            this.statusBar.show();
        };
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
        this.statusBarProperties = new state_1.PresenterState({
            text: '$(watch) Driven Time',
            tooltip: 'Driven Time',
            backgroundColor: new vscode.ThemeColor('statusBarItem.background'),
        });
        this.statusBarProperties.watch(this.render);
    }
    setRunning() {
        this.statusBarProperties.setState({
            text: '$(watch) Driven Time',
            tooltip: 'Executando. Clique para deslogar',
            backgroundColor: new vscode.ThemeColor('statusBarItem.background'),
            command: constants_1.Commands.logout,
        });
    }
    setMissingToken() {
        this.statusBarProperties.setState({
            text: '$(alert) Driven Time',
            tooltip: 'Você não está logado. Clique para logar',
            backgroundColor: new vscode.ThemeColor('statusBarItem.errorBackground'),
            command: constants_1.Commands.login,
        });
    }
    setDisabled() {
        this.statusBarProperties.setState({
            text: '$(alert) Driven Time',
            tooltip: 'A extensão não está ativada. Clique para ativar',
            backgroundColor: new vscode.ThemeColor('statusBarItem.errorBackground'),
        });
    }
    setNotUpToDate() {
        this.statusBarProperties.setState({
            text: '$(alert) Driven Time',
            tooltip: 'A extensão não está atualizada. Por favor atualize para a versão mais recente para registrar o seu tempo',
            backgroundColor: new vscode.ThemeColor('statusBarItem.errorBackground'),
        });
    }
}
exports.CodeStatusBarPresenter = CodeStatusBarPresenter;
var StatusBarState;
(function (StatusBarState) {
    StatusBarState[StatusBarState["running"] = 0] = "running";
    StatusBarState[StatusBarState["missingToken"] = 1] = "missingToken";
    StatusBarState[StatusBarState["disabled"] = 2] = "disabled";
})(StatusBarState = exports.StatusBarState || (exports.StatusBarState = {}));
//# sourceMappingURL=code-status-bar-presenter.js.map