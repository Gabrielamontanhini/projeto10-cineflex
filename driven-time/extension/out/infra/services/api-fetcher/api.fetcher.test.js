"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nock = require("nock");
const faker_1 = require("@faker-js/faker");
const api_fetcher_1 = require("./api-fetcher");
const errors_1 = require("./errors");
const baseUrl = 'http://localhost';
const scopeUrl = nock(baseUrl);
function makeSut() {
    const sut = new api_fetcher_1.ApiFetcher(baseUrl);
    return {
        sut,
    };
}
beforeEach(() => {
    nock.cleanAll();
});
describe('ApiFetcher', () => {
    describe('GET', () => {
        it('should throw BadRequestError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            scopeUrl.get(path).query(params).reply(400);
            try {
                await sut.get(path, params);
                fail('should throw BadRequestError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.BadRequestError);
            }
        });
        it('should throw NotFoundError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            scopeUrl.get(path).query(params).reply(404);
            try {
                await sut.get(path, params);
                fail('should throw NotFoundError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.NotFoundError);
            }
        });
        it('should throw UnauthorizedError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            scopeUrl.get(path).query(params).reply(401);
            try {
                await sut.get(path, params);
                fail('should throw UnauthorizedError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnauthorizedError);
            }
        });
        it('should throw UnknownServerError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            scopeUrl.get(path).query(params).reply(500);
            try {
                await sut.get(path, params);
                fail('should throw InternalServerError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnknownServerError);
            }
        });
        it('should call api with correct params, method, path, body and return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            const mockReturnData = { data: 'data' };
            scopeUrl.get(path).query(params).reply(200, mockReturnData);
            const response = await sut.get(path, params);
            expect(response).toEqual(mockReturnData);
        });
        it('should call api with correct headers and return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const params = { param: 'value' };
            const mockReturnData = { data: 'data' };
            const token = faker_1.default.datatype.uuid();
            scopeUrl
                .get(path)
                .query(params)
                .matchHeader('Authorization', `Bearer ${token}`)
                .matchHeader('Content-Type', 'application/json')
                .reply(200, mockReturnData);
            const response = await sut.get(path, params, token);
            expect(response).toEqual(mockReturnData);
        });
    });
    describe('POST', () => {
        it('should throw BadRequestError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.post(path, body).reply(400);
            try {
                await sut.post(path, body);
                fail('should throw BadRequestError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.BadRequestError);
            }
        });
        it('should throw NotFoundError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.post(path, body).reply(404);
            try {
                await sut.post(path, body);
                fail('should throw NotFoundError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.NotFoundError);
            }
        });
        it('should throw UnauthorizedError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.post(path, body).reply(401);
            try {
                await sut.post(path, body);
                fail('should throw UnauthorizedError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnauthorizedError);
            }
        });
        it('should throw UnknownServerError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.post(path, body).reply(500);
            try {
                await sut.post(path, body);
                fail('should throw UnknownServerError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnknownServerError);
            }
        });
        it('should call api with correct params, method, path, body and return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            const mockReturnData = { data: 'data' };
            scopeUrl.post(path, body).reply(200, mockReturnData);
            const response = await sut.post(path, body);
            expect(response).toEqual(mockReturnData);
        });
        it('should call api with correct headers return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            const mockReturnData = { data: 'data' };
            const token = faker_1.default.datatype.uuid();
            scopeUrl
                .post(path, body)
                .matchHeader('Authorization', `Bearer ${token}`)
                .matchHeader('Content-Type', 'application/json')
                .reply(200, mockReturnData);
            const response = await sut.post(path, body, token);
            expect(response).toEqual(mockReturnData);
        });
    });
    describe('PUT', () => {
        it('should throw BadRequestError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.put(path, body).reply(400);
            try {
                await sut.put(path, body);
                fail('should throw BadRequestError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.BadRequestError);
            }
        });
        it('should throw NotFoundError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.put(path, body).reply(404);
            try {
                await sut.put(path, body);
                fail('should throw NotFoundError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.NotFoundError);
            }
        });
        it('should throw UnauthorizedError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.put(path, body).reply(401);
            try {
                await sut.put(path, body);
                fail('should throw UnauthorizedError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnauthorizedError);
            }
        });
        it('should throw UnknownServerError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            scopeUrl.put(path, body).reply(500);
            try {
                await sut.put(path, body);
                fail('should throw UnknownServerError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnknownServerError);
            }
        });
        it('should call api with correct params,method, path, body and return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            const mockReturnData = { data: 'data' };
            scopeUrl.put(path, body).reply(200, mockReturnData);
            const response = await sut.put(path, body);
            expect(response).toEqual(mockReturnData);
        });
        it('should call api with correct headers', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const body = { test: 'value' };
            const mockReturnData = { data: 'data' };
            const token = faker_1.default.datatype.uuid();
            scopeUrl
                .put(path, body)
                .matchHeader('Authorization', `Bearer ${token}`)
                .matchHeader('Content-Type', 'application/json')
                .reply(200, mockReturnData);
            const response = await sut.put(path, body, token);
            expect(response).toEqual(mockReturnData);
        });
    });
    describe('DELETE', () => {
        it('should throw BadRequestError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            scopeUrl.delete(path).reply(400);
            try {
                await sut.delete(path);
                fail('should throw BadRequestError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.BadRequestError);
            }
        });
        it('should throw NotFoundError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            scopeUrl.delete(path).reply(404);
            try {
                await sut.delete(path);
                fail('should throw NotFoundError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.NotFoundError);
            }
        });
        it('should throw UnauthorizedError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            scopeUrl.delete(path).reply(401);
            try {
                await sut.delete(path);
                fail('should throw UnauthorizedError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnauthorizedError);
            }
        });
        it('should throw UnknownServerError', async () => {
            const { sut } = makeSut();
            const path = '/path';
            scopeUrl.delete(path).reply(500);
            try {
                await sut.delete(path);
                fail('should throw UnknownServerError');
            }
            catch (e) {
                expect(e).toBeInstanceOf(errors_1.UnknownServerError);
            }
        });
        it('should call api with correct params,method, path, body and return a response data', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const mockReturnData = { data: 'data' };
            scopeUrl.delete(path).reply(200, mockReturnData);
            const response = await sut.delete(path);
            expect(response).toEqual(mockReturnData);
        });
        it('should call api with correct headers', async () => {
            const { sut } = makeSut();
            const path = '/path';
            const mockReturnData = { data: 'data' };
            const token = faker_1.default.datatype.uuid();
            scopeUrl
                .delete(path)
                .matchHeader('Authorization', `Bearer ${token}`)
                .matchHeader('Content-Type', 'application/json')
                .reply(200, mockReturnData);
            const response = await sut.delete(path, token);
            expect(response).toEqual(mockReturnData);
        });
    });
});
//# sourceMappingURL=api.fetcher.test.js.map