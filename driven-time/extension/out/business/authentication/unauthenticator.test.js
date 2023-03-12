"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests_1 = require("../_tests_");
const unauthenticator_1 = require("./unauthenticator");
function makeSut() {
    const tokenReaderStub = new _tests_1.TokenReaderStub();
    const userSessionRemover = new _tests_1.UserSessionRemoverStub();
    const tokenRemoverStub = new _tests_1.TokenRemoverStub();
    const userInfosRemoverStub = new _tests_1.UserInfosRemoverStub();
    const sut = new unauthenticator_1.Unauthenticator(tokenReaderStub, userSessionRemover, tokenRemoverStub, userInfosRemoverStub);
    return {
        sut,
        tokenReaderStub,
        userSessionRemover,
        tokenRemoverStub,
        userInfosRemoverStub,
    };
}
describe('Unauthenticator', () => {
    describe('logout', () => {
        it('should not call any remover if token does not exist', async () => {
            const { sut, tokenReaderStub, userSessionRemover, tokenRemoverStub, userInfosRemoverStub, } = makeSut();
            jest.spyOn(tokenReaderStub, 'read').mockReturnValue(null);
            jest.spyOn(userSessionRemover, 'remove');
            jest.spyOn(tokenRemoverStub, 'remove');
            jest.spyOn(userInfosRemoverStub, 'remove');
            await sut.logout();
            expect(userSessionRemover.remove).not.toHaveBeenCalled();
            expect(tokenRemoverStub.remove).not.toHaveBeenCalled();
            expect(userInfosRemoverStub.remove).not.toHaveBeenCalled();
        });
    });
    it('should call userSessionRemover with token', async () => {
        const { sut, tokenReaderStub, userSessionRemover } = makeSut();
        jest.spyOn(userSessionRemover, 'remove');
        await sut.logout();
        expect(userSessionRemover.remove).toHaveBeenCalledWith(tokenReaderStub.token);
    });
    it('should call tokenRemover after userSessionRemover', async () => {
        const { sut, userSessionRemover, tokenRemoverStub } = makeSut();
        const userSessionRemoverMock = jest.spyOn(userSessionRemover, 'remove');
        const tokenRemoverMock = jest.spyOn(tokenRemoverStub, 'remove');
        await sut.logout();
        expect(tokenRemoverMock.mock.invocationCallOrder[0]).toBeGreaterThan(userSessionRemoverMock.mock.invocationCallOrder[0]);
    });
    it('should call userInfosRemover after userSessionRemover', async () => {
        const { sut, userSessionRemover, userInfosRemoverStub } = makeSut();
        const userSessionRemoverMock = jest.spyOn(userSessionRemover, 'remove');
        const userInfosRemoverrMock = jest.spyOn(userInfosRemoverStub, 'remove');
        await sut.logout();
        expect(userInfosRemoverrMock.mock.invocationCallOrder[0]).toBeGreaterThan(userSessionRemoverMock.mock.invocationCallOrder[0]);
    });
});
//# sourceMappingURL=unauthenticator.test.js.map