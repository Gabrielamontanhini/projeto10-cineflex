"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnauthenticator = exports.createAuthenticator = exports.createAuthChecker = void 0;
const jwt_adapter_1 = require("../../infra/cryptography/jwt-adapter");
const business_1 = require("../../business");
const infra_1 = require("../../infra");
const services_1 = require("../../infra/services");
const constants_1 = require("../../constants");
function createAuthChecker(context) {
    const authReader = new infra_1.CodeTokenReader(context);
    const tokenDecrypter = new jwt_adapter_1.JwtAdapter();
    const tokenValidator = new infra_1.JoiJwtTokenValidator(tokenDecrypter);
    return new business_1.AuthChecker(authReader, tokenValidator);
}
exports.createAuthChecker = createAuthChecker;
function createAuthenticator(context) {
    const apiFetcher = new services_1.ApiFetcher(constants_1.API_URL);
    const tokenFetcher = new infra_1.AxiosTokenFetcher(apiFetcher);
    const tokenWriter = new infra_1.CodeTokenWriter(context);
    const emailValidator = new infra_1.JoiEmailValidator();
    const tokenDecrypter = new jwt_adapter_1.JwtAdapter();
    const userInfosWriter = new infra_1.CodeUserInfosWriter(context);
    return new business_1.Authenticator(tokenFetcher, tokenWriter, emailValidator, tokenDecrypter, userInfosWriter);
}
exports.createAuthenticator = createAuthenticator;
function createUnauthenticator(context) {
    const tokenRemover = new infra_1.CodeTokenRemover(context);
    const tokenReader = new infra_1.CodeTokenReader(context);
    const apiFetcher = new services_1.ApiFetcher(constants_1.API_URL);
    const userSessionRemover = new infra_1.AxiosUserSessionRemover(apiFetcher);
    const userInfosRemover = new infra_1.CodeUserInfosRemover(context);
    return new business_1.Unauthenticator(tokenReader, userSessionRemover, tokenRemover, userInfosRemover);
}
exports.createUnauthenticator = createUnauthenticator;
//# sourceMappingURL=auth-factory.js.map