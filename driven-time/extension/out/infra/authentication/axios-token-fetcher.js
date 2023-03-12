"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosTokenFetcher = void 0;
const errors_1 = require("../../business/errors");
const errors_2 = require("../services/api-fetcher/errors");
class AxiosTokenFetcher {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async fetch(email, password) {
        try {
            const { token } = await this.apiService.post('/authentication/login', {
                email,
                password,
            });
            return token;
        }
        catch (err) {
            if (err instanceof errors_2.UnauthorizedError || err instanceof errors_2.NotFoundError) {
                throw new errors_1.AuthenticationError();
            }
            else {
                console.error(err);
                throw new errors_1.UnavailableServiceError();
            }
        }
    }
}
exports.AxiosTokenFetcher = AxiosTokenFetcher;
//# sourceMappingURL=axios-token-fetcher.js.map