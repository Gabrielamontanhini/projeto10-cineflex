"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _tests_1 = require("../../business/_tests_");
const vscode_context_stub_1 = require("../_tests_/stubs/vscode-context-stub");
const constants_1 = require("../../constants");
const errors_1 = require("../../business/errors");
const code_user_infos_writer_1 = require("./code-user-infos-writer");
function makeSut() {
    const context = new vscode_context_stub_1.VsCodeContextStub();
    const sut = new code_user_infos_writer_1.CodeUserInfosWriter(context);
    return { sut, context };
}
describe('CodeUserInfosWriter', () => {
    it('should call globaState update with correct user infos key', async () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'update');
        const userInfos = (0, _tests_1.generateUserInfos)();
        await sut.write(userInfos);
        expect(mockGlobalStateFn).toHaveBeenCalledWith(constants_1.USER_GLOBAL_STATE_INFOS, userInfos);
    });
    it('should throw the error if it is not possible to update the user infos with the value passed', async () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        jest.spyOn(globalState, 'update').mockRejectedValue(new Error());
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
            // do nothing
        });
        try {
            await sut.write((0, _tests_1.generateUserInfos)());
            fail('Should throw an Error');
        }
        catch (err) {
            expect(err).toBeInstanceOf(errors_1.UserInfosWriteError);
        }
    });
});
//# sourceMappingURL=code-user-infos-writer.test.js.map