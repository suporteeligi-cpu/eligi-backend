"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRepository = exports.RefreshTokenRepository = void 0;
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("../utils/prisma"));
class RefreshTokenRepository {
    async create(data) {
        return prisma_1.default.refreshToken.create({
            data: {
                userId: data.userId,
                token: data.token,
                expiresAt: (0, date_fns_1.addDays)(new Date(), 7)
            }
        });
    }
    async findValid(token) {
        return prisma_1.default.refreshToken.findFirst({
            where: {
                token,
                revoked: false,
                expiresAt: { gt: new Date() }
            }
        });
    }
    async revoke(token) {
        return prisma_1.default.refreshToken.update({
            where: { token },
            data: { revoked: true }
        });
    }
    async revokeAllForUser(userId) {
        return prisma_1.default.refreshToken.updateMany({
            where: { userId, revoked: false },
            data: { revoked: true }
        });
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
exports.refreshTokenRepository = new RefreshTokenRepository();
//# sourceMappingURL=refreshTokenRepository.js.map