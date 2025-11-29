import { userRepository } from '../repositories/userRepository';
import { refreshTokenRepository } from '../repositories/refreshTokenRepository';
import { comparePassword, hashPassword } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

export class AuthService {
  async register(data: { email: string; password: string; name: string }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      const error = new Error('Email already in use');
      (error as any).status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(data.password);
    const user = await userRepository.create({
      email: data.email,
      passwordHash,
      name: data.name
    });

    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email });

    await refreshTokenRepository.create({ userId: user.id, token: refreshToken });

    return { user, accessToken, refreshToken };
  }

  async login(data: { email: string; password: string }) {
  const user = await userRepository.findByEmail(data.email);
  if (!user) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }

  // ⛔ Usuário sem senha não pode logar via password
  if (!user.passwordHash) {
    const error = new Error('This account does not allow password login');
    (error as any).status = 401;
    throw error;
  }

  const match = await comparePassword(data.password, user.passwordHash);
  if (!match) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }

  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id, email: user.email });

  await refreshTokenRepository.create({ userId: user.id, token: refreshToken });

  return { user, accessToken, refreshToken };
}


  async refreshToken(token: string) {
    const existing = await refreshTokenRepository.findValid(token);
    if (!existing) {
      const error = new Error('Invalid refresh token');
      (error as any).status = 401;
      throw error;
    }

    const user = await userRepository.findById(existing.userId);
    if (!user) {
      const error = new Error('User not found');
      (error as any).status = 404;
      throw error;
    }

    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const newRefreshToken = signRefreshToken({ sub: user.id, email: user.email });

    await refreshTokenRepository.revoke(token);
    await refreshTokenRepository.create({ userId: user.id, token: newRefreshToken });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(token: string) {
    await refreshTokenRepository.revoke(token);
  }

  async logoutAll(userId: string) {
    await refreshTokenRepository.revokeAllForUser(userId);
  }
}

export const authService = new AuthService();
