"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_fetcher_stub_1 = require("../_tests_/stubs/api-fetcher-stub");
const errors_1 = require("../../business/errors");
const axios_up_to_date_package_version_manager_1 = require("./axios-up-to-date-package-version-manager");
function makeSut() {
    const apiFetcher = new api_fetcher_stub_1.ApiFetcherStub();
    const sut = new axios_up_to_date_package_version_manager_1.AxiosUpToDatePackageVersionManager(apiFetcher);
    return { sut, apiFetcher };
}
describe('AxiosUpToDatePackageVersionManager', () => {
    it('should throw unavailability error if api returns error', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'get').mockRejectedValueOnce(new Error());
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
            // do nothing
        });
        try {
            await sut.getVersion();
            fail('should throw unavailability error');
        }
        catch (err) {
            expect(err).toBeInstanceOf(errors_1.UnavailableServiceError);
        }
    });
    it('should call ApiFetcher with correct values', async () => {
        const { sut, apiFetcher } = makeSut();
        jest.spyOn(apiFetcher, 'get');
        await sut.getVersion();
        expect(apiFetcher.get).toBeCalledWith(`/driven-code-time.json`, {});
    });
    it('should return version from api', async () => {
        const { sut, apiFetcher } = makeSut();
        const version = '1.0.0';
        jest.spyOn(apiFetcher, 'get').mockResolvedValueOnce({ version });
        const result = await sut.getVersion();
        expect(result).toBe(version);
    });
});
//# sourceMappingURL=axios-up-to-date-package-version-manager.test.js.map