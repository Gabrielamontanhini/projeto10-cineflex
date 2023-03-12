"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUserInfosWriter = void 0;
const errors_1 = require("../../business/errors");
const constants_1 = require("../../constants");
class CodeUserInfosWriter {
    constructor(context) {
        this.context = context;
    }
    async write(userInfos) {
        try {
            await this.context.globalState.update(constants_1.USER_GLOBAL_STATE_INFOS, userInfos);
        }
        catch (err) {
            console.error(err);
            throw new errors_1.UserInfosWriteError();
        }
    }
}
exports.CodeUserInfosWriter = CodeUserInfosWriter;
//# sourceMappingURL=code-user-infos-writer.js.map