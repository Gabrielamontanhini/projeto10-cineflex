"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../infra/services/api-fetcher/errors");
const errors_2 = require("../../business/errors");
const api_fetcher_stub_1 = require("../../infra/_tests_/stubs/api-fetcher-stub");
const axios_token_fetcher_1 = require("./axios-token-fetcher");
function makeSut() {
    const apiFetcher = new api_fetcher_stub_1.ApiFetcherStub();
    const sut = new axios_token_fetcher_1.AxiosTokenFetcher(apiFetcher);
    return { sut, apiFetcher };
}
const LOGIN_PATH = '/authentication/login';
describe('AxiosTokenFetcher', () => {
    it('should throw AuthenticationError if api returns 401', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post').mockRejectedValue(new errors_1.UnauthorizedError());
        try {
            await sut.fetch(faker_1.default.internet.email(), faker_1.default.internet.password());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(e).toBeInstanceOf(errors_2.AuthenticationError);
        }
    });
    it('should throw AuthenticationError if api returns 404', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post').mockRejectedValue(new errors_1.NotFoundError());
        try {
            await sut.fetch(faker_1.default.internet.email(), faker_1.default.internet.password());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(e).toBeInstanceOf(errors_2.AuthenticationError);
        }
    });
    it('should throw UnavailableServiceError if api returns 500 and log this error', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post').mockRejectedValue(new Error());
        const mockedConsole = jest
            .spyOn(console, 'error')
            .mockImplementationOnce(() => {
            // do nothing.
        });
        try {
            await sut.fetch(faker_1.default.internet.email(), faker_1.default.internet.password());
            fail('should throw AuthenticationError');
        }
        catch (e) {
            expect(mockedConsole).toBeCalledWith(new Error());
            expect(e).toBeInstanceOf(errors_2.UnavailableServiceError);
        }
    });
    it('should call ApiFetcher with correct values', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'post');
        const email = faker_1.default.internet.email();
        const password = faker_1.default.internet.password();
        await sut.fetch(email, password);
        expect(apiFetcher.post).toHaveBeenCalledWith(LOGIN_PATH, expect.objectContaining({ email, password }));
    });
    it('should return token on success', async () => {
        const { sut, apiFetcher } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(apiFetcher, 'post').mockResolvedValue({ token });
        const result = await sut.fetch(faker_1.default.internet.email(), faker_1.default.internet.password());
        expect(result).toBe(token);
    });
});
//# sourceMappingURL=axios-token-fetcher.test.js.map