"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosErrorReporter = void 0;
const constants_1 = require("../constants");
const services_1 = require("./services");
class AxiosErrorReporter {
    async report(error) {
        console.error(error);
        const apiService = new services_1.ApiFetcher(constants_1.API_URL);
        try {
            await apiService.post('/reports', {
                error: error.toString(),
            });
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.AxiosErrorReporter = AxiosErrorReporter;
//# sourceMappingURL=axios-error-reporter.js.map