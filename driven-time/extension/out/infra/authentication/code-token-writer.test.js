"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const errors_1 = require("../../business/errors");
const vscode_context_stub_1 = require("../_tests_/stubs/vscode-context-stub");
const constants_1 = require("../../constants");
const code_token_writer_1 = require("./code-token-writer");
function makeSut() {
    const context = new vscode_context_stub_1.VsCodeContextStub();
    const sut = new code_token_writer_1.CodeTokenWriter(context);
    return { sut, context };
}
describe('CodeTokenWriter', () => {
    it('should call globaState update with correct token key', () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        const mockGlobalStateFn = jest.spyOn(globalState, 'update');
        const token = faker_1.default.datatype.uuid();
        sut.write(token);
        expect(mockGlobalStateFn).toHaveBeenCalledWith(constants_1.TOKEN_GLOBAL_STATE_KEY, token);
    });
    it('should throw the error if it is not possible to update the token with the value passed', async () => {
        const { context, sut } = makeSut();
        const { globalState } = context;
        jest.spyOn(globalState, 'update').mockRejectedValue(new errors_1.TokenWriteError());
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
            // do nothing
        });
        try {
            await sut.write('token');
            fail('Should throw an TokenWriteError');
        }
        catch (err) {
            expect(err).toBeInstanceOf(errors_1.TokenWriteError);
        }
    });
});
//# sourceMappingURL=code-token-writer.test.js.map