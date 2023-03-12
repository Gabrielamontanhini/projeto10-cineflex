"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
class AuthChecker {
    constructor(tokenReader, tokenValidator) {
        this.tokenReader = tokenReader;
        this.tokenValidator = tokenValidator;
    }
    isAuthenticated() {
        const token = this.tokenReader.read();
        if (!token) {
            return false;
        }
        return this.isTokenValid(token);
    }
    isTokenValid(token) {
        try {
            return this.tokenValidator.isValid(token);
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.AuthChecker = AuthChecker;
//# sourceMappingURL=auth-checker.js.map