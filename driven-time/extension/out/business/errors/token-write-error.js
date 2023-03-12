"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWriteError = void 0;
class TokenWriteError extends Error {
    constructor() {
        super('Could not store token');
        this.name = 'TokenWriteError';
    }
}
exports.TokenWriteError = TokenWriteError;
//# sourceMappingURL=token-write-error.js.map