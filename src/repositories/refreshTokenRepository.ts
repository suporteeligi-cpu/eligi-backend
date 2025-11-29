import { addDays } from 'date-fns';
import prisma from '../utils/prisma';

export class RefreshTokenRepository {
  async create(data: { userId: string; token: string }) {
    return prisma.refreshToken.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: addDays(new Date(), 7)
      }
    });
  }

  async findValid(token: string) {
    return prisma.refreshToken.findFirst({
      where: {
        token,
        revoked: false,
        expiresAt: { gt: new Date() }
      }
    });
  }

  async revoke(token: string) {
    return prisma.refreshToken.update({
      where: { token },
      data: { revoked: true }
    });
  }

  async revokeAllForUser(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true }
    });
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
