"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownServerError = void 0;
class UnknownServerError extends Error {
    constructor(status) {
        super(`Unknown service error: status ${status}`);
        this.name = 'UnknownServerError';
    }
}
exports.UnknownServerError = UnknownServerError;
//# sourceMappingURL=unknown-server-error.js.map