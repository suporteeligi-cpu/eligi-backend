"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessService = exports.BusinessService = void 0;
const businessRepository_1 = require("../repositories/businessRepository");
class BusinessService {
    async createBasicInfo(ownerId, data) {
        return businessRepository_1.businessRepository.createBasicInfo({
            ownerId,
            name: data.name,
            phone: data.phone,
            segment: data.segment
        });
    }
    async setLocation(data) {
        const business = await businessRepository_1.businessRepository.findById(data.businessId);
        if (!business) {
            const error = new Error('Business not found');
            error.status = 404;
            throw error;
        }
        return businessRepository_1.businessRepository.updateLocation(data);
    }
    async finishStep1(businessId) {
        const business = await businessRepository_1.businessRepository.findById(businessId);
        if (!business) {
            const error = new Error('Business not found');
            error.status = 404;
            throw error;
        }
        return businessRepository_1.businessRepository.finishStep1(businessId);
    }
}
exports.BusinessService = BusinessService;
exports.businessService = new BusinessService();
