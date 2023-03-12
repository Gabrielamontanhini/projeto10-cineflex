"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInformerStub = void 0;
const faker_1 = require("@faker-js/faker");
class ProjectInformerStub {
    constructor() {
        this.projectName = faker_1.default.random.word();
    }
    getProjectName() {
        return this.projectName;
    }
}
exports.ProjectInformerStub = ProjectInformerStub;
//# sourceMappingURL=project-informer-stub.js.map