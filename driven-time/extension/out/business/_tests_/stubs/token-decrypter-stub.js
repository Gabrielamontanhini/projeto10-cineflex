"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDecrypterStub = void 0;
const generate_user_infos_1 = require("../fakes/generate-user-infos");
class TokenDecrypterStub {
    constructor() {
        this.decodedToken = (0, generate_user_infos_1.generateUserInfos)();
    }
    decrypt(token) {
        return this.decodedToken;
    }
}
exports.TokenDecrypterStub = TokenDecrypterStub;
//# sourceMappingURL=token-decrypter-stub.js.map