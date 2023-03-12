"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.PUBLIC_API_INFOS_URL = exports.USER_GLOBAL_STATE_INFOS = exports.TOKEN_GLOBAL_STATE_KEY = exports.API_URL = void 0;
// export const API_URL = 'https://driven-code-time-lnhdqslgwa-uc.a.run.app'; //staging url
exports.API_URL = 'https://driven-code-time-pleev5musq-uc.a.run.app'; //production url
exports.TOKEN_GLOBAL_STATE_KEY = 'driven-time:token';
exports.USER_GLOBAL_STATE_INFOS = 'driven-time:user';
exports.PUBLIC_API_INFOS_URL = 'https://storage.googleapis.com/production-driven-files/code-time-extension-version';
var Commands;
(function (Commands) {
    Commands["login"] = "driven-time.login";
    Commands["logout"] = "driven-time.logout";
})(Commands = exports.Commands || (exports.Commands = {}));
//# sourceMappingURL=constants.js.map