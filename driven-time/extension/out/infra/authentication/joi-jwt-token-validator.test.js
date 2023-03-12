"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const _tests_1 = require("../../business/_tests_");
const joi_jwt_token_validator_1 = require("./joi-jwt-token-validator");
function makeSut() {
    const tokenDecrypterStub = new _tests_1.TokenDecrypterStub();
    const sut = new joi_jwt_token_validator_1.JoiJwtTokenValidator(tokenDecrypterStub);
    return { sut, tokenDecrypterStub };
}
describe('JoiJwtTokenValidator', () => {
    function generateValidDecodedInfo({ id, name, email, isAdmin, iat, } = {}) {
        return {
            ...(0, _tests_1.generateUserInfos)({ id, name, email, isAdmin }),
            iat: iat || faker_1.default.datatype.number({ min: 1 }),
        };
    }
    it('should call TokenDecrypter instance with correct params', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt');
        await sut.isValid(token);
        expect(tokenDecrypterStub.decrypt).toBeCalledWith(token);
    });
    it('should return false if TokenDecrypter throws', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce(new Error());
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return false if TokenDecrypter returns null', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce(null);
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return false if TokenDecrypter returns undefined', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce(undefined);
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return false if decoded info is not an object ', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce([]);
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return false if decoded info is an empty object ', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce({});
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when iat of decoded info is not a positive number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, iat: -faker_1.default.datatype.number() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when iat of decoded info is not a integer number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce({
            ...decodedInfo,
            iat: faker_1.default.datatype.float({ min: 1.1, max: 1.9 }),
        });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when iat of decoded info is not a number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, iat: faker_1.default.random.word() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should not return false if iat of decoded info is missing', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, iat: undefined });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when id of decoded info is not a positive number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, id: -faker_1.default.datatype.number() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when id of decoded info is not a integer number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce({
            ...decodedInfo,
            id: faker_1.default.datatype.float({ min: 1.1, max: 1.9 }),
        });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when id of decoded info is not a number', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, id: faker_1.default.random.word() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should not return false if id of decoded info is missing', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, id: undefined });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an false when name of decoded info is not a string', () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, name: 1 });
        const isValid = sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should not return false name iat of decoded info is missing', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, name: undefined });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return an error when email of decoded info is not a valid email', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, email: faker_1.default.lorem.word() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return true when email of decoded info is missing', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, email: undefined });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(true);
    });
    it('should return an error when isAdmin of decoded info is not a boolean', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, isAdmin: faker_1.default.lorem.word() });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(false);
    });
    it('should return true when isAdmin of decoded info is missing', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest
            .spyOn(tokenDecrypterStub, 'decrypt')
            .mockReturnValueOnce({ ...decodedInfo, isAdmin: undefined });
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(true);
    });
    it('should return true when decoded info is valid', async () => {
        const { sut, tokenDecrypterStub } = makeSut();
        const token = faker_1.default.datatype.uuid();
        const decodedInfo = generateValidDecodedInfo();
        jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce(decodedInfo);
        const isValid = await sut.isValid(token);
        expect(isValid).toBe(true);
    });
});
//# sourceMappingURL=joi-jwt-token-validator.test.js.map