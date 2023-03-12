"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_context_stub_1 = require("../_tests_/stubs/vscode-context-stub");
const constants_1 = require("../../constants");
const code_token_reader_1 = require("./code-token-reader");
function makeSut() {
    const context = new vscode_context_stub_1.VsCodeContextStub();
    const sut = new code_token_reader_1.CodeTokenReader(context);
    return { sut, context };
}
describe('CodeTokenReader', () => {
    it('should call globaState get with correct token key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'get');
        sut.read();
        expect(mockGlobalStateFn).toHaveBeenCalledWith(constants_1.TOKEN_GLOBAL_STATE_KEY);
    });
    it('should return null if there is not token associated with given key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        jest.spyOn(globalState, 'get').mockReturnValueOnce(undefined);
        const result = sut.read();
        expect(result).toBeNull();
    });
    it('should return token if there is one associated with given key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'get');
        const result = sut.read();
        const globalStateGetReturnedValue = mockGlobalStateFn.mock.results[0].value;
        expect(result).toEqual(globalStateGetReturnedValue);
    });
});
//# sourceMappingURL=code-token-reader.test.js.map