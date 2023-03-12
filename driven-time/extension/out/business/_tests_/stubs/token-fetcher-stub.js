"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFetcherStub = void 0;
const faker_1 = require("@faker-js/faker");
class TokenFetcherStub {
    constructor() {
        this.token = faker_1.default.datatype.uuid();
    }
    fetch(email, password) {
        return Promise.resolve(this.token);
    }
}
exports.TokenFetcherStub = TokenFetcherStub;
//# sourceMappingURL=token-fetcher-stub.js.map