"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const refreshTokenRepository_1 = require("../repositories/refreshTokenRepository");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
class AuthService {
    async register(data) {
        const existing = await userRepository_1.userRepository.findByEmail(data.email);
        if (existing) {
            const error = new Error('Email already in use');
            error.status = 409;
            throw error;
        }
        const passwordHash = await (0, hash_1.hashPassword)(data.password);
        const user = await userRepository_1.userRepository.create({
            email: data.email,
            passwordHash,
            name: data.name
        });
        const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, email: user.email });
        const refreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id, email: user.email });
        await refreshTokenRepository_1.refreshTokenRepository.create({ userId: user.id, token: refreshToken });
        return { user, accessToken, refreshToken };
    }
    async login(data) {
        const user = await userRepository_1.userRepository.findByEmail(data.email);
        if (!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
        const match = await (0, hash_1.comparePassword)(data.password, user.passwordHash);
        if (!match) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
        const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, email: user.email });
        const refreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id, email: user.email });
        await refreshTokenRepository_1.refreshTokenRepository.create({ userId: user.id, token: refreshToken });
        return { user, accessToken, refreshToken };
    }
    async refreshToken(token) {
        const existing = await refreshTokenRepository_1.refreshTokenRepository.findValid(token);
        if (!existing) {
            const error = new Error('Invalid refresh token');
            error.status = 401;
            throw error;
        }
        const user = await userRepository_1.userRepository.findById(existing.userId);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        const accessToken = (0, jwt_1.signAccessToken)({ sub: user.id, email: user.email });
        const newRefreshToken = (0, jwt_1.signRefreshToken)({ sub: user.id, email: user.email });
        await refreshTokenRepository_1.refreshTokenRepository.revoke(token);
        await refreshTokenRepository_1.refreshTokenRepository.create({ userId: user.id, token: newRefreshToken });
        return { accessToken, refreshToken: newRefreshToken };
    }
    async logout(token) {
        await refreshTokenRepository_1.refreshTokenRepository.revoke(token);
    }
    async logoutAll(userId) {
        await refreshTokenRepository_1.refreshTokenRepository.revokeAllForUser(userId);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
