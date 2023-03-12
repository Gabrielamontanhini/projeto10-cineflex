"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutImplementation = exports.logoutCommand = void 0;
const constants_1 = require("../../constants");
const presentation_1 = require("../../presentation");
const factories_1 = require("../factories");
exports.logoutCommand = {
    registry: constants_1.Commands.logout,
    name: 'Logout',
    implementation: logoutImplementation,
};
async function logoutImplementation(context) {
    await (0, factories_1.createUnauthenticator)(context).logout();
    new presentation_1.NotifierPresenter().mount('Logout realizado com sucesso');
}
exports.logoutImplementation = logoutImplementation;
//# sourceMappingURL=logout.js.map