"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLazyAppManager = void 0;
const presentation_1 = require("../../presentation");
const infra_1 = require("../../infra");
const business_1 = require("../../business");
const tracker_factory_1 = require("./tracker-factory");
const command_manager_factory_1 = require("./command-manager-factory");
const auth_factory_1 = require("./auth-factory");
const version_management_factory_1 = require("./version-management-factory");
let appManager;
function createLazyAppManager(context) {
    if (appManager) {
        return appManager;
    }
    const authChecker = (0, auth_factory_1.createAuthChecker)(context);
    const versionManager = (0, version_management_factory_1.createVersionManager)(context);
    const useTracker = (0, tracker_factory_1.createLazyUseTracker)(context);
    const eventManager = new infra_1.CodeEventManager();
    const commandManager = (0, command_manager_factory_1.createCommandManager)(context);
    const uiManager = new presentation_1.CodeUiManager();
    const errorReporter = new infra_1.AxiosErrorReporter();
    appManager = new business_1.ApplicationManager(authChecker, versionManager, useTracker, eventManager, commandManager, uiManager, errorReporter);
    return appManager;
}
exports.createLazyAppManager = createLazyAppManager;
//# sourceMappingURL=app-manager-factory.js.map