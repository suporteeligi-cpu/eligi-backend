import request from 'supertest';
import app from '../app';
import prisma from '../utils/prisma';

describe('Auth flow', () => {
  const email = 'test@example.com';
  const password = 'test1234';
  const name = 'Test User';

  beforeAll(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.business.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
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
    const res = await request(app).post('/api/auth/login').send({
      email,
      password
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });
});
