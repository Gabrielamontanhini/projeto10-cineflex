"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const joi_email_validator_1 = require("./joi-email-validator");
function makeSut() {
    const sut = new joi_email_validator_1.JoiEmailValidator();
    return { sut };
}
describe('JoiEmailValidator', () => {
    it('should return true if the email is valid', () => {
        const { sut } = makeSut();
        const validEmail = faker_1.default.internet.email();
        const isValid = sut.isValid(validEmail);
        expect(isValid).toBeTruthy();
    });
    it('should return false if the email is not valid', () => {
        const { sut } = makeSut();
        const invalidEmail = faker_1.default.random.word();
        const isValid = sut.isValid(invalidEmail);
        expect(isValid).toBeFalsy();
    });
    it('should throw if the email is not a string', () => {
        const { sut } = makeSut();
        const response = sut.isValid(faker_1.default.datatype.number());
        expect(response).toBeFalsy();
    });
    it('should throw if the email is an empty string', () => {
        const { sut } = makeSut();
        const response = sut.isValid('');
        expect(response).toBeFalsy();
    });
});
//# sourceMappingURL=joi-email-validator.test.js.map