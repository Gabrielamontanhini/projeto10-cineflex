"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionManager = void 0;
class VersionManager {
    constructor(currentPackageVersionManager, upToDatePackageVersionManager, versionComparer) {
        this.currentPackageVersionManager = currentPackageVersionManager;
        this.upToDatePackageVersionManager = upToDatePackageVersionManager;
        this.versionComparer = versionComparer;
    }
    async isUpToDate() {
        const currentVersion = await this.currentPackageVersionManager.getVersion();
        const upToDateVersion = await this.upToDatePackageVersionManager.getVersion();
        return this.versionComparer.isUpToDate(currentVersion, upToDateVersion);
    }
}
exports.VersionManager = VersionManager;
//# sourceMappingURL=version-manager.js.map