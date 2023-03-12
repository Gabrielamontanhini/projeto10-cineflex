"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandManager = void 0;
const infra_1 = require("../../infra");
const commands_1 = require("../commands");
function createCommandManager(context) {
    const commands = [commands_1.loginCommand, commands_1.logoutCommand];
    return new infra_1.CodeCommandManager(commands, context);
}
exports.createCommandManager = createCommandManager;
//# sourceMappingURL=command-manager-factory.js.map