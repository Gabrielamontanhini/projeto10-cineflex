"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiJwtTokenValidator = void 0;
const joi = require("joi");
const services_1 = require("../services");
class JoiJwtTokenValidator {
    constructor(tokenDecrypter) {
        this.tokenDecrypter = tokenDecrypter;
        this.isValid = (token) => {
            const decodedToken = this.tokenDecrypter.decrypt(token);
            return new services_1.JoiSchemaValidator(joi
                .object({
                id: joi.number().integer().positive().required(),
                name: joi.string().required(),
                email: joi.string().email(),
                isAdmin: joi.boolean(),
                iat: joi.number().integer().positive().required(),
            })
                .required()).isValid(decodedToken);
        };
    }
}
exports.JoiJwtTokenValidator = JoiJwtTokenValidator;
//# sourceMappingURL=joi-jwt-token-validator.js.map