"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityError = void 0;
class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableEntityError';
        this.message = message;
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
//# sourceMappingURL=unprocessable-entity-error.js.map