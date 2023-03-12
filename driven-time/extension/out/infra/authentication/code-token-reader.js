"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTokenReader = void 0;
const constants_1 = require("../../constants");
class CodeTokenReader {
    constructor(context) {
        this.context = context;
    }
    read() {
        const token = this.context.globalState.get(constants_1.TOKEN_GLOBAL_STATE_KEY);
        return token ? token : null;
    }
}
exports.CodeTokenReader = CodeTokenReader;
//# sourceMappingURL=code-token-reader.js.map