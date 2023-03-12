"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosSessionSynchronizer = void 0;
const errors_1 = require("../business/errors");
const errors_2 = require("./services/api-fetcher/errors");
class AxiosSessionSynchronizer {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async sync(token, projectName) {
        try {
            await this.apiService.post('/heartbeat/register', {
                projectName,
            }, token);
        }
        catch (err) {
            if (err instanceof errors_2.UnauthorizedError ||
                err instanceof errors_2.UnprocessableEntityError) {
                throw new errors_1.AuthenticationError();
            }
            else {
                console.error(err);
                throw err;
            }
        }
    }
}
exports.AxiosSessionSynchronizer = AxiosSessionSynchronizer;
//# sourceMappingURL=axios-session-synchronizer.js.map