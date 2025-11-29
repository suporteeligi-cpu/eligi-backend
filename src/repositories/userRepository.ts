import prisma from '../utils/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: {
  email: string;
  passwordHash?: string | null;
  name: string;
  googleId?: string | null;
  avatar?: string | null;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash ?? null,
      googleId: data.googleId ?? null,
      avatar: data.avatar ?? null
    }
  });
}


  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}

export const userRepository = new UserRepository();
