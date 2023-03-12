"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests_1 = require("../_tests_");
const tracker_1 = require("./tracker");
function makeSut() {
    const tokenReaderStub = new _tests_1.TokenReaderStub();
    const sessionSynchronizerStub = new _tests_1.SessionSynchronizerStub();
    const projectInformer = new _tests_1.ProjectInformerStub();
    const sut = new tracker_1.UseTracker(projectInformer, tokenReaderStub, sessionSynchronizerStub);
    return { sut, tokenReaderStub, sessionSynchronizerStub, projectInformer };
}
describe('UseTracker', () => {
    describe('track', () => {
        jest.useFakeTimers();
        it('should not call sync method if token is null', () => {
            const { sut, sessionSynchronizerStub, tokenReaderStub } = makeSut();
            jest.spyOn(sessionSynchronizerStub, 'sync');
            jest.spyOn(tokenReaderStub, 'read').mockReturnValue(null);
            sut.track(() => {
                throw new Error();
            });
            jest.runAllTimers();
            expect(sessionSynchronizerStub.sync).not.toHaveBeenCalled();
        });
        it('should not call sync method if project is null', () => {
            const { sut, sessionSynchronizerStub, projectInformer } = makeSut();
            jest.spyOn(sessionSynchronizerStub, 'sync');
            jest
                .spyOn(projectInformer, 'getProjectName')
                .mockReturnValue(null);
            sut.track(() => {
                throw new Error();
            });
            jest.runAllTimers();
            expect(sessionSynchronizerStub.sync).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=tracker.test.js.map