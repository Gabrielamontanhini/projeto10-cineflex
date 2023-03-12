"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenReaderStub = void 0;
const faker_1 = require("@faker-js/faker");
class TokenReaderStub {
    constructor() {
        this.token = faker_1.default.datatype.uuid();
    }
    read() {
        return this.token;
    }
}
exports.TokenReaderStub = TokenReaderStub;
//# sourceMappingURL=toker-reader-stub.js.map