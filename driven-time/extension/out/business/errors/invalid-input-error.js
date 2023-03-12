"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = void 0;
class InvalidInputError extends Error {
    constructor(invalidInputs) {
        super(`Invalid input: ${invalidInputs.join(', ')}`);
        this.name = 'InvalidInputError';
    }
}
exports.InvalidInputError = InvalidInputError;
//# sourceMappingURL=invalid-input-error.js.map