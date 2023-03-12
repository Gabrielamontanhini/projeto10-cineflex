"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const app_manager_factory_1 = require("./main/factories/app-manager-factory");
function activate(context) {
    (0, app_manager_factory_1.createLazyAppManager)(context).init();
}
exports.activate = activate;
function deactivate(context) {
    (0, app_manager_factory_1.createLazyAppManager)(context).close();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map