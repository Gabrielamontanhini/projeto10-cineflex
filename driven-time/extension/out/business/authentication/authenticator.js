"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const errors_1 = require("../errors");
class Authenticator {
    constructor(tokenFetcher, tokenWriter, emailValidator, tokenDecrypter, userInfosWriter) {
        this.tokenFetcher = tokenFetcher;
        this.tokenWriter = tokenWriter;
        this.emailValidator = emailValidator;
        this.tokenDecrypter = tokenDecrypter;
        this.userInfosWriter = userInfosWriter;
    }
    async authenticate(email, password) {
        this.validateInput(email, password);
        const token = await this.tokenFetcher.fetch(email, password);
        this.tokenWriter.write(token);
        const userInfos = await this.tokenDecrypter.decrypt(token);
        this.userInfosWriter.write(userInfos);
    }
    validateInput(email, password) {
        const invalidInputs = [];
        if (!password) {
            invalidInputs.push('password');
        }
        if (!email || !this.emailValidator.isValid(email)) {
            invalidInputs.push('email');
        }
        if (invalidInputs.length > 0) {
            throw new errors_1.InvalidInputError(invalidInputs);
        }
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map