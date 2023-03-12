"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserInfos = void 0;
const faker_1 = require("@faker-js/faker");
function generateUserInfos({ id, name, email, isAdmin, } = {}) {
    return {
        id: id || faker_1.default.datatype.number({ min: 1 }),
        name: name || faker_1.default.name.findName(),
        email: email || faker_1.default.internet.email(),
        isAdmin: isAdmin || faker_1.default.datatype.boolean(),
    };
}
exports.generateUserInfos = generateUserInfos;
//# sourceMappingURL=generate-user-infos.js.map