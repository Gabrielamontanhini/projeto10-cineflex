"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFetcherStub = void 0;
class ApiFetcherStub {
    get(path, params, token) {
        return Promise.resolve({});
    }
    post(path, body, token) {
        return Promise.resolve({});
    }
    put(path, body, token) {
        return Promise.resolve({});
    }
    delete(path, token) {
        return Promise.resolve({});
    }
}
exports.ApiFetcherStub = ApiFetcherStub;
//# sourceMappingURL=api-fetcher-stub.js.map