"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const jwt = require("jsonwebtoken");
const jwt_adapter_1 = require("./jwt-adapter");
function makeSut() {
    const sut = new jwt_adapter_1.JwtAdapter();
    return {
        sut,
    };
}
describe('JwtAdapter', () => {
    it('should call sign with correct values', async () => {
        const { sut } = makeSut();
        jest.spyOn(jwt, 'decode');
        const token = faker_1.default.datatype.uuid();
        await sut.decrypt(token);
        expect(jwt.decode).toHaveBeenCalledWith(token);
    });
    it('should return a decoded token', async () => {
        const { sut } = makeSut();
        const token = jwt.sign({ test: 'payload' }, 'secret');
        const decodedToken = await sut.decrypt(token);
        expect(decodedToken).toEqual(expect.objectContaining({ test: 'payload' }));
    });
    it('should throw Error if invalid token', async () => {
        const { sut } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(jwt, 'decode').mockImplementationOnce(() => {
            throw new Error();
        });
        try {
            await sut.decrypt(token);
            fail('Shuld throw Error');
        }
        catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});
//# sourceMappingURL=jwt-adapter.test.js.map