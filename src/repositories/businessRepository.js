"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessRepository = exports.BusinessRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class BusinessRepository {
    async createBasicInfo(data) {
        return prisma_1.default.business.create({
            data: {
                name: data.name,
                phone: data.phone,
                segment: data.segment,
                ownerId: data.ownerId,
                onboardingStep: 1
            }
        });
    }
    async findById(id) {
        return prisma_1.default.business.findUnique({ where: { id } });
    }
    async updateLocation(data) {
        return prisma_1.default.business.update({
            where: { id: data.businessId },
            data: {
                street: data.street,
                number: data.number,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                onboardingStep: 2
            }
        });
    }
    async finishStep1(businessId) {
        return prisma_1.default.business.update({
            where: { id: businessId },
            data: {
                onboardingStep: 3
            }
        });
    }
}
exports.BusinessRepository = BusinessRepository;
exports.businessRepository = new BusinessRepository();
//# sourceMappingURL=businessRepository.js.map