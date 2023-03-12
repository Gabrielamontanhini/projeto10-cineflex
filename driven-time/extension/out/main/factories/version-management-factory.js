"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVersionManager = void 0;
const constants_1 = require("../../constants");
const business_1 = require("../../business");
const infra_1 = require("../../infra");
const services_1 = require("../../infra/services");
function createVersionManager(context) {
    const currentPackageVersionManager = new infra_1.CodeCurrentPackageVersionManager(context);
    const apiFetcher = new services_1.ApiFetcher(constants_1.PUBLIC_API_INFOS_URL);
    const upToDatePackageVersionManager = new infra_1.AxiosUpToDatePackageVersionManager(apiFetcher);
    const versionComparer = new infra_1.SemverVersionComparer();
    return new business_1.VersionManager(currentPackageVersionManager, upToDatePackageVersionManager, versionComparer);
}
exports.createVersionManager = createVersionManager;
//# sourceMappingURL=version-management-factory.js.map