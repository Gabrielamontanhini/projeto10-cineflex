"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosUserSessionRemover = void 0;
const errors_1 = require("../services/api-fetcher/errors");
class AxiosUserSessionRemover {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async remove(token) {
        try {
            await this.apiService.delete('/authentication/logout', token);
        }
        catch (err) {
            if (err instanceof errors_1.UnauthorizedError) {
                return;
            }
            console.error(err);
        }
    }
}
exports.AxiosUserSessionRemover = AxiosUserSessionRemover;
//# sourceMappingURL=axios-user-session-remover.js.map