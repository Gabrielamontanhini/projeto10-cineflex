"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenterState = void 0;
class PresenterState {
    constructor(initialState) {
        this.watchers = [];
        this._state = initialState;
    }
    watch(callback) {
        this.watchers.push(callback);
    }
    getState() {
        return this._state;
    }
    setState(value) {
        this._state = value;
        this.watchers.forEach((watcher) => watcher(value));
    }
}
exports.PresenterState = PresenterState;
//# sourceMappingURL=state.js.map