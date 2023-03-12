"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtAdapter {
    decrypt(token) {
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        return decodedToken;
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt-adapter.js.map