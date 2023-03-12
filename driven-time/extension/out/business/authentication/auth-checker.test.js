"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests_1 = require("../_tests_");
const auth_checker_1 = require("./auth-checker");
function makeSut() {
    const tokenReaderStub = new _tests_1.TokenReaderStub();
    const tokenValidatorStub = new _tests_1.TokenValidatorStub();
    const sut = new auth_checker_1.AuthChecker(tokenReaderStub, tokenValidatorStub);
    return { sut, tokenReaderStub, tokenValidatorStub };
}
describe('AuthChecker', () => {
    describe('isAuthenticated', () => {
        it('should return true if token is valid', () => {
            const { sut } = makeSut();
            const isAuthenticated = sut.isAuthenticated();
            expect(isAuthenticated).toBe(true);
        });
        it('should return false if no token is present', () => {
            const { sut, tokenReaderStub } = makeSut();
            jest.spyOn(tokenReaderStub, 'read').mockReturnValue(null);
            const isAuthenticated = sut.isAuthenticated();
            expect(isAuthenticated).toBe(false);
        });
        it('should return false if token is invalid', () => {
            const { sut, tokenValidatorStub } = makeSut();
            jest.spyOn(tokenValidatorStub, 'isValid').mockReturnValue(false);
            const isAuthenticated = sut.isAuthenticated();
            expect(isAuthenticated).toBe(false);
        });
    });
});
//# sourceMappingURL=auth-checker.test.js.map