"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFetcher = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const errors_1 = require("./errors");
class ApiFetcher {
    constructor(baseUrl) {
        this.axiosInstance = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json',
            },
        });
    }
    async get(path, params = {}, token) {
        return this.request({ method: 'GET', path, params, token });
    }
    async post(path, body, token) {
        return this.request({ method: 'POST', path, body, token });
    }
    async put(path, body, token) {
        return this.request({ method: 'PUT', path, body, token });
    }
    async delete(path, token) {
        return this.request({ method: 'DELETE', path, token });
    }
    async request({ path, method, body, params = {}, token = undefined, }) {
        try {
            const response = await this.axiosInstance({
                method,
                url: path,
                data: body,
                ...(token && { headers: { Authorization: `Bearer ${token}` } }),
                params,
            });
            return response.data;
        }
        catch (error) {
            const status = error?.response?.status;
            if (!status) {
                throw error;
            }
            if (status === 400) {
                const body = (await error.response?.data) || '';
                throw new errors_1.BadRequestError(JSON.stringify(body));
            }
            else if (status === 422) {
                const body = (await error.response?.data) || '';
                throw new errors_1.UnprocessableEntityError(JSON.stringify(body));
            }
            else if (status === 404) {
                throw new errors_1.NotFoundError();
            }
            else if ([401, 403].includes(status)) {
                throw new errors_1.UnauthorizedError();
            }
            else {
                throw new errors_1.UnknownServerError(status);
            }
        }
    }
}
exports.ApiFetcher = ApiFetcher;
//# sourceMappingURL=api-fetcher.js.map