"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUserInfosRemover = void 0;
const constants_1 = require("../../constants");
class CodeUserInfosRemover {
    constructor(context) {
        this.context = context;
    }
    async remove() {
        try {
            await this.context.globalState.update(constants_1.USER_GLOBAL_STATE_INFOS, undefined);
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.CodeUserInfosRemover = CodeUserInfosRemover;
//# sourceMappingURL=code-user-infos-remover.js.map