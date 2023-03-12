"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUserInfosReader = void 0;
const constants_1 = require("../../constants");
class CodeUserInfosReader {
    constructor(context) {
        this.context = context;
    }
    read() {
        const userInfos = this.context.globalState.get(constants_1.USER_GLOBAL_STATE_INFOS);
        return userInfos ? userInfos : null;
    }
}
exports.CodeUserInfosReader = CodeUserInfosReader;
//# sourceMappingURL=code-user-infos-reader.js.map