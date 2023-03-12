"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiSchemaValidator = void 0;
class JoiSchemaValidator {
    constructor(schema) {
        this.schema = schema;
    }
    isValid(data) {
        const { error } = this.schema.validate(data);
        return !error;
    }
}
exports.JoiSchemaValidator = JoiSchemaValidator;
//# sourceMappingURL=joi-schema-validator.js.map