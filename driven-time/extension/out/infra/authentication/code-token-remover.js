"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTokenRemover = void 0;
const constants_1 = require("../../constants");
class CodeTokenRemover {
    constructor(context) {
        this.context = context;
    }
    async remove() {
        try {
            await this.context.globalState.update(constants_1.TOKEN_GLOBAL_STATE_KEY, undefined);
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.CodeTokenRemover = CodeTokenRemover;
//# sourceMappingURL=code-token-remover.js.map