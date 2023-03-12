"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../errors");
const _tests_1 = require("../_tests_");
const authenticator_1 = require("./authenticator");
function makeSut() {
    const tokenFetcherStub = new _tests_1.TokenFetcherStub();
    const tokenWriter = new _tests_1.TokenWriterStub();
    const emailValidator = new _tests_1.EmailValidatorStub();
    const tokenDecrypter = new _tests_1.TokenDecrypterStub();
    const userInfosWriter = new _tests_1.UserInfosWriterStub();
    const sut = new authenticator_1.Authenticator(tokenFetcherStub, tokenWriter, emailValidator, tokenDecrypter, userInfosWriter);
    return {
        sut,
        tokenFetcherStub,
        tokenWriter,
        emailValidator,
        tokenDecrypter,
        userInfosWriter,
    };
}
describe('Authenticator', () => {
    describe('authenticate', () => {
        it('should call tokenFetcher with correct email and password', async () => {
            const { sut, tokenFetcherStub } = makeSut();
            const email = faker_1.default.internet.email();
            const password = faker_1.default.internet.password();
            jest
                .spyOn(authenticator_1.Authenticator.prototype, 'validateInput')
                .mockReturnValueOnce('ok');
            const mockedTokenFetcher = jest.spyOn(tokenFetcherStub, 'fetch');
            await sut.authenticate(email, password);
            expect(mockedTokenFetcher).toHaveBeenCalledWith(email, password);
        });
        it('should call tokenWriter with correct token', async () => {
            const { sut, tokenFetcherStub, tokenWriter } = makeSut();
            const email = faker_1.default.internet.email();
            const password = faker_1.default.internet.password();
            jest
                .spyOn(authenticator_1.Authenticator.prototype, 'validateInput')
                .mockReturnValueOnce('ok');
            jest.spyOn(tokenWriter, 'write');
            await sut.authenticate(email, password);
            expect(tokenWriter.write).toBeCalledWith(tokenFetcherStub.token);
        });
        it('should throw InvalidInputError if password is undefined', async () => {
            const { sut } = makeSut();
            const email = faker_1.default.internet.email();
            const password = undefined;
            try {
                await sut.authenticate(email, password);
                fail('should throw InvalidInputError');
            }
            catch (error) {
                expect(error).toBeInstanceOf(errors_1.InvalidInputError);
            }
        });
        it('should throw InvalidInputError if email is undefined', async () => {
            const { sut } = makeSut();
            const email = undefined;
            const password = faker_1.default.internet.password();
            try {
                await sut.authenticate(email, password);
                fail('should throw InvalidInputError');
            }
            catch (error) {
                expect(error).toBeInstanceOf(errors_1.InvalidInputError);
            }
        });
        it('should throw InvalidInputError if email is invalid', async () => {
            const { sut, emailValidator } = makeSut();
            const email = 'invalid-email';
            const password = faker_1.default.internet.password();
            jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
            try {
                await sut.authenticate(email, password);
                fail('should throw InvalidInputError');
            }
            catch (error) {
                expect(error).toBeInstanceOf(errors_1.InvalidInputError);
            }
        });
        it('should call tokenDecrypter with correct token', async () => {
            const { sut, tokenFetcherStub, tokenDecrypter } = makeSut();
            const email = faker_1.default.internet.email();
            const password = faker_1.default.internet.password();
            jest
                .spyOn(authenticator_1.Authenticator.prototype, 'validateInput')
                .mockReturnValueOnce('ok');
            jest.spyOn(tokenDecrypter, 'decrypt');
            await sut.authenticate(email, password);
            expect(tokenDecrypter.decrypt).toHaveBeenCalledWith(tokenFetcherStub.token);
        });
        it('should call userInfosWriter with correct userInfos', async () => {
            const { sut, tokenDecrypter, userInfosWriter } = makeSut();
            const email = faker_1.default.internet.email();
            const password = faker_1.default.internet.password();
            jest
                .spyOn(authenticator_1.Authenticator.prototype, 'validateInput')
                .mockReturnValueOnce('ok');
            jest.spyOn(userInfosWriter, 'write');
            await sut.authenticate(email, password);
            expect(userInfosWriter.write).toHaveBeenCalledWith(tokenDecrypter.decodedToken);
        });
    });
});
//# sourceMappingURL=authenticator.test.js.map