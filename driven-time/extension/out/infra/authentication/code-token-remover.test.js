"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const vscode_context_stub_1 = require("../_tests_/stubs/vscode-context-stub");
const code_token_remover_1 = require("./code-token-remover");
function makeSut() {
    const context = new vscode_context_stub_1.VsCodeContextStub();
    const sut = new code_token_remover_1.CodeTokenRemover(context);
    return { sut, context };
}
describe('CodeTokenRemover', () => {
    it('should call globaState update with correct token key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'update');
        sut.remove();
        expect(mockGlobalStateFn).toHaveBeenCalledWith(constants_1.TOKEN_GLOBAL_STATE_KEY, undefined);
    });
    it('should print the error on the console in case any error occurs during the update function', async () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        jest.spyOn(globalState, 'update').mockRejectedValue(new Error());
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
            // do nothing
        });
        await sut.remove();
        expect(console.error).toBeCalledWith(new Error());
    });
});
//# sourceMappingURL=code-token-remover.test.js.map