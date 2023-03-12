"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../business/errors");
const axios_session_synchronizer_1 = require("./axios-session-synchronizer");
const errors_2 = require("./services/api-fetcher/errors");
const api_fetcher_stub_1 = require("./_tests_/stubs/api-fetcher-stub");
function makeSut() {
    const apiFetcher = new api_fetcher_stub_1.ApiFetcherStub();
    const sut = new axios_session_synchronizer_1.AxiosSessionSynchronizer(apiFetcher);
    return { sut, apiFetcher };
}
describe('AxiosSessionSynchronizer', () => {
    it('should throw AuthenticationError if api returns 401', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post').mockRejectedValue(new errors_2.UnauthorizedError());
        try {
            await sut.sync(faker_1.default.datatype.uuid(), faker_1.default.random.word());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(e).toBeInstanceOf(errors_1.AuthenticationError);
        }
    });
    it('should throw AuthenticationError if api returns 422', async () => {
        const { sut, apiFetcher } = makeSut();
        jest
            .spyOn(apiFetcher, 'post')
            .mockRejectedValue(new errors_2.UnprocessableEntityError('any_error'));
        try {
            await sut.sync(faker_1.default.datatype.uuid(), faker_1.default.random.word());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(e).toBeInstanceOf(errors_1.AuthenticationError);
        }
    });
    it('should throw Error if api returns 500 and log this error', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post').mockRejectedValue(new Error());
        const mockedConsole = jest
            .spyOn(console, 'error')
            .mockImplementationOnce(() => {
            //do nothing
        });
        try {
            await sut.sync(faker_1.default.datatype.uuid(), faker_1.default.random.word());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(mockedConsole).toBeCalledWith(new Error());
            expect(e).toBeInstanceOf(Error);
        }
    });
    it('should call ApiFetcher with correct values', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post');
        const token = faker_1.default.datatype.uuid();
        const projectName = faker_1.default.random.word();
        await sut.sync(token, projectName);
        expect(apiFetcher.post).toBeCalledWith(`/heartbeat/register`, { projectName }, token);
    });
});
//# sourceMappingURL=axios-session-synchronizer.test.js.map