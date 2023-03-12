"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnavailableServiceError = void 0;
class UnavailableServiceError extends Error {
    constructor() {
        super('Service is not available.');
        this.name = 'UnavailableServiceError';
    }
}
exports.UnavailableServiceError = UnavailableServiceError;
//# sourceMappingURL=unavailable-service-error.js.map