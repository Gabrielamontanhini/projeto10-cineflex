"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCommand = void 0;
// eslint-disable-next-line import/no-unresolved
const vscode = require("vscode");
const errors_1 = require("../../business/errors");
const constants_1 = require("../../constants");
const presentation_1 = require("../../presentation");
const factories_1 = require("../factories");
exports.loginCommand = {
    registry: constants_1.Commands.login,
    name: 'Login',
    implementation: loginImplementation,
};
async function loginImplementation(context) {
    const notifierPresenter = new presentation_1.NotifierPresenter();
    const email = await vscode.window.showInputBox({
        prompt: 'Email',
        placeHolder: 'Email',
    });
    if (!email) {
        notifierPresenter.mount('Por favor, digite seu email para efetuar o login');
        return;
    }
    const password = await vscode.window.showInputBox({
        prompt: 'Senha',
        placeHolder: 'Senha',
        password: true,
    });
    if (!password) {
        notifierPresenter.mount('Por favor, digite sua senha para efetuar o login');
        return;
    }
    try {
        await (0, factories_1.createAuthenticator)(context).authenticate(email, password);
        const { name: username } = context.globalState.get(constants_1.USER_GLOBAL_STATE_INFOS);
        notifierPresenter.mount(`Login realizado com sucesso. Bem vindo, ${username} ❤️`);
    }
    catch (err) {
        if (err instanceof errors_1.AuthenticationError) {
            notifierPresenter.mount('Email ou senha incorretos');
        }
        else {
            console.error(err);
            notifierPresenter.mount('Ocorreu um erro ao efetuar o login, por favor tente mais tarde ou fale conosco');
        }
    }
}
//# sourceMappingURL=login.js.map