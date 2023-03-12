"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfosWriteError = void 0;
class UserInfosWriteError extends Error {
    constructor() {
        super('Could not store user infos');
        this.name = 'UserInfosWriteError';
    }
}
exports.UserInfosWriteError = UserInfosWriteError;
//# sourceMappingURL=user-infos-write-error.js.map