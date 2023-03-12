"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUiManager = void 0;
const code_status_bar_presenter_1 = require("../status-bar/code-status-bar-presenter");
class CodeUiManager {
    renderMissingToken() {
        this.statusBar.setMissingToken();
        this.statusBar.render();
    }
    renderRunning() {
        this.statusBar.setRunning();
        this.statusBar.render();
    }
    renderNotUpToDate() {
        this.statusBar.setNotUpToDate();
        this.statusBar.render();
    }
    renderDisabled() {
        this.statusBar.setDisabled();
        this.statusBar.render();
    }
    get statusBar() {
        if (!this._lazyStatusBar) {
            this._lazyStatusBar = new code_status_bar_presenter_1.CodeStatusBarPresenter();
        }
        return this._lazyStatusBar;
    }
}
exports.CodeUiManager = CodeUiManager;
//# sourceMappingURL=code-ui-manager.js.map