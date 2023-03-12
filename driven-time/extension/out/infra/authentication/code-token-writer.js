"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTokenWriter = void 0;
const errors_1 = require("../../business/errors");
const constants_1 = require("../../constants");
class CodeTokenWriter {
    constructor(context) {
        this.context = context;
    }
    async write(token) {
        try {
            await this.context.globalState.update(constants_1.TOKEN_GLOBAL_STATE_KEY, token);
        }
        catch (err) {
            console.error(err);
            throw new errors_1.TokenWriteError();
        }
    }
}
exports.CodeTokenWriter = CodeTokenWriter;
//# sourceMappingURL=code-token-writer.js.map