"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthenticator = void 0;
class Unauthenticator {
    constructor(tokenReader, userSessionRemover, tokenRemover, userInfosRemover) {
        this.tokenReader = tokenReader;
        this.userSessionRemover = userSessionRemover;
        this.tokenRemover = tokenRemover;
        this.userInfosRemover = userInfosRemover;
        this.logout = async () => {
            const token = this.tokenReader.read();
            if (!token) {
                return;
            }
            await this.userSessionRemover.remove(token);
            await this.tokenRemover.remove();
            await this.userInfosRemover.remove();
        };
    }
}
exports.Unauthenticator = Unauthenticator;
//# sourceMappingURL=unauthenticator.js.map