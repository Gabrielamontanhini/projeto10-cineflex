"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsCodeContextStub = void 0;
const faker_1 = require("@faker-js/faker");
class VsCodeContextStub {
    constructor() {
        this.globalState = new GlobalStateStub();
    }
}
exports.VsCodeContextStub = VsCodeContextStub;
class GlobalStateStub {
    get(key) {
        return faker_1.default.datatype.uuid();
    }
    async update(key, value) {
        return Promise.resolve();
    }
}
//# sourceMappingURL=vscode-context-stub.js.map