"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stubs_1 = require("../../business/_tests_/stubs");
const version_manager_1 = require("./version-manager");
function makeSut() {
    const currentPackageVersionManagerStub = new stubs_1.CurrentPackageVersionManagerStub();
    const upToDatePackageVersionManagerStub = new stubs_1.UpToDatePackageVersionManagerStub();
    const versionComparerStub = new stubs_1.VersionComparerStub();
    const sut = new version_manager_1.VersionManager(currentPackageVersionManagerStub, upToDatePackageVersionManagerStub, versionComparerStub);
    return {
        sut,
        currentPackageVersionManagerStub,
        upToDatePackageVersionManagerStub,
        versionComparerStub,
    };
}
describe('VersionManager', () => {
    it('should be call versionComparerStub with correct params', async () => {
        const { sut, currentPackageVersionManagerStub, upToDatePackageVersionManagerStub, versionComparerStub, } = makeSut();
        jest
            .spyOn(currentPackageVersionManagerStub, 'getVersion')
            .mockResolvedValueOnce('1.0.0');
        jest
            .spyOn(upToDatePackageVersionManagerStub, 'getVersion')
            .mockResolvedValueOnce('1.0.0');
        jest.spyOn(versionComparerStub, 'isUpToDate');
        await sut.isUpToDate();
        expect(versionComparerStub.isUpToDate).toHaveBeenCalledWith('1.0.0', '1.0.0');
    });
    it('should be return true if versionComparerStub return true', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'isUpToDate').mockResolvedValueOnce(true);
        const isUpToDate = await sut.isUpToDate();
        expect(isUpToDate).toBe(true);
    });
    it('should be return false if versionComparerStub return false', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'isUpToDate').mockResolvedValueOnce(false);
        const isUpToDate = await sut.isUpToDate();
        expect(isUpToDate).toBe(false);
    });
});
//# sourceMappingURL=version-manager.test.js.map