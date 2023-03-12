"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosUpToDatePackageVersionManager = void 0;
const errors_1 = require("../../business/errors");
class AxiosUpToDatePackageVersionManager {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getVersion() {
        try {
            const response = await this.apiService.get('/driven-code-time.json', {});
            return response.version;
        }
        catch (err) {
            console.error(err);
            throw new errors_1.UnavailableServiceError();
        }
    }
}
exports.AxiosUpToDatePackageVersionManager = AxiosUpToDatePackageVersionManager;
//# sourceMappingURL=axios-up-to-date-package-version-manager.js.map