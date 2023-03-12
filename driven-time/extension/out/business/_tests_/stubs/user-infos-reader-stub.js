"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfosReaderStub = void 0;
const fakes_1 = require("../fakes");
class UserInfosReaderStub {
    constructor() {
        this.userInfos = (0, fakes_1.generateUserInfos)();
    }
    read() {
        return this.userInfos;
    }
}
exports.UserInfosReaderStub = UserInfosReaderStub;
//# sourceMappingURL=user-infos-reader-stub.js.map