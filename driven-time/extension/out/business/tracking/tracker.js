"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseTracker = void 0;
class UseTracker {
    constructor(projectInformer, tokenReader, synchronizer) {
        this.projectInformer = projectInformer;
        this.tokenReader = tokenReader;
        this.synchronizer = synchronizer;
        this.syncEventScheduleId = null;
        this.track = (onFailure) => {
            this.projectName = this.projectInformer.getProjectName();
            this.sync(onFailure);
        };
    }
    sync(onSyncFailure) {
        if (this.syncEventScheduleId) {
            return;
        }
        this.syncEventScheduleId = setTimeout(() => {
            this.syncEventScheduleId = null;
            const token = this.tokenReader.read();
            if (this.projectName && token) {
                this.synchronizer.sync(token, this.projectName).catch(onSyncFailure);
            }
        }, 10000);
    }
}
exports.UseTracker = UseTracker;
//# sourceMappingURL=tracker.js.map