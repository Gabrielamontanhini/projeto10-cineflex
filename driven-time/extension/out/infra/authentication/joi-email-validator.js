"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiEmailValidator = void 0;
const Joi = require("joi");
const services_1 = require("../services");
class JoiEmailValidator {
    isValid(email) {
        return new services_1.JoiSchemaValidator(Joi.string().email().required()).isValid(email);
    }
}
exports.JoiEmailValidator = JoiEmailValidator;
//# sourceMappingURL=joi-email-validator.js.map