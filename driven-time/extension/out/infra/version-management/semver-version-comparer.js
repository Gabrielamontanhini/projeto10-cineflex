"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemverVersionComparer = void 0;
const semver = require("semver");
class SemverVersionComparer {
    isUpToDate(currentVersion, latestVersion) {
        return semver.satisfies(currentVersion, `^${latestVersion}`);
    }
}
exports.SemverVersionComparer = SemverVersionComparer;
//# sourceMappingURL=semver-version-comparer.js.map