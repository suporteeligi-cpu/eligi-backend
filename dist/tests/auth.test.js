"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const prisma_1 = __importDefault(require("../utils/prisma"));
describe('Auth flow', () => {
    const email = 'test@example.com';
    const password = 'test1234';
    const name = 'Test User';
    beforeAll(async () => {
        await prisma_1.default.refreshToken.deleteMany();
        await prisma_1.default.business.deleteMany();
        await prisma_1.default.user.deleteMany();
    });
    afterAll(async () => {
        await prisma_1.default.$disconnect();
    });
    it('should register a user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email,
            password,
            name
        });
        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe(email);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();
    });
    it('should login a user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email,
            password
        });
        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();
    });
});
