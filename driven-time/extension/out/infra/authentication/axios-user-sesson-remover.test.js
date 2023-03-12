"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const api_fetcher_stub_1 = require("../../infra/_tests_/stubs/api-fetcher-stub");
const axios_user_session_remover_1 = require("./axios-user-session-remover");
function makeSut() {
    const apiFetcher = new api_fetcher_stub_1.ApiFetcherStub();
    const sut = new axios_user_session_remover_1.AxiosUserSessionRemover(apiFetcher);
    return { sut, apiFetcher };
}
const LOG_OUT_PATH = '/authentication/logout';
describe('AxiosUserSessionRemover', () => {
    it('should call apiService with correct values', async () => {
        const { sut, apiFetcher } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(apiFetcher, 'delete');
        await sut.remove(token);
        expect(apiFetcher.delete).toHaveBeenCalledWith(LOG_OUT_PATH, token);
    });
    it('should return void and log the error if api returns 401', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'delete').mockRejectedValue(new Error());
        const mockedConsole = jest
            .spyOn(console, 'error')
            .mockImplementationOnce(() => {
            // do nothing
        });
        await sut.remove(faker_1.default.datatype.uuid());
        expect(mockedConsole).toBeCalledWith(new Error());
    });
});
//# sourceMappingURL=axios-user-sesson-remover.test.js.map