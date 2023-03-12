"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationManager = void 0;
const errors_1 = require("../errors");
class ApplicationManager {
    constructor(authChecker, versionManager, useTracker, eventManager, commandManager, uiManager, errorReporter) {
        this.authChecker = authChecker;
        this.versionManager = versionManager;
        this.useTracker = useTracker;
        this.eventManager = eventManager;
        this.commandManager = commandManager;
        this.uiManager = uiManager;
        this.errorReporter = errorReporter;
    }
    async init() {
        this.commandManager.setupCommands(() => this.processState(), async () => {
            await this.errorReporter.report(new Error('Failed to setup commands'));
        });
        this.processState();
    }
    async processState() {
        try {
            const isUpToDate = await this.versionManager.isUpToDate();
            if (!isUpToDate) {
                this.eventManager.removeEventListeners();
                this.uiManager.renderNotUpToDate();
                return;
            }
        }
        catch (err) {
            this.reportError(err);
        }
        if (!this.authChecker.isAuthenticated()) {
            this.eventManager.removeEventListeners();
            this.uiManager.renderMissingToken();
        }
        else {
            if (!this.eventManager.isListening()) {
                this.eventManager.addUserEventListeners(() => {
                    try {
                        this.useTracker.track((err) => {
                            if (err instanceof errors_1.AuthenticationError) {
                                this.eventManager.removeEventListeners();
                                this.uiManager.renderMissingToken();
                            }
                            else {
                                this.reportError(err);
                            }
                        });
                    }
                    catch (err) {
                        this.reportError(err);
                    }
                });
            }
            this.uiManager.renderRunning();
        }
    }
    async close() {
        this.eventManager.removeEventListeners();
        this.commandManager.removeCommands();
        this.uiManager.renderDisabled();
    }
    reportError(err) {
        this.errorReporter.report(err instanceof Error ? err : new Error(err));
    }
}
exports.ApplicationManager = ApplicationManager;
//# sourceMappingURL=application-manager.js.map