"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const vscode_context_stub_1 = require("../_tests_/stubs/vscode-context-stub");
const code_user_infos_remover_1 = require("./code-user-infos-remover");
function makeSut() {
    const context = new vscode_context_stub_1.VsCodeContextStub();
    const sut = new code_user_infos_remover_1.CodeUserInfosRemover(context);
    return { sut, context };
}
describe('CodeTokenRemover', () => {
    it('should call globaState update with correct token key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'update');
        sut.remove();
        expect(mockGlobalStateFn).toHaveBeenCalledWith(constants_1.USER_GLOBAL_STATE_INFOS, undefined);
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
//# sourceMappingURL=code-user-infos-remover.test.js.map