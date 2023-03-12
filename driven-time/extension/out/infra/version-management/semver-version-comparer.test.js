"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver_version_comparer_1 = require("./semver-version-comparer");
function makeSut() {
    const sut = new semver_version_comparer_1.SemverVersionComparer();
    return { sut };
}
describe('SemverVersionComparer', () => {
    it('should be return true if currentVersion is greater than or equal to latestVersion', () => {
        const { sut } = makeSut();
        const isUpToDate = sut.isUpToDate('1.0.0', '1.0.0');
        expect(isUpToDate).toBe(true);
    });
    it('should be return false if currentVersion is less than latestVersion', () => {
        const { sut } = makeSut();
        const isUpToDate = sut.isUpToDate('0.9.0', '1.0.0');
        expect(isUpToDate).toBe(false);
    });
});
//# sourceMappingURL=semver-version-comparer.test.js.map