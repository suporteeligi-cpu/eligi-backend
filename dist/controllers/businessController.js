"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessController = exports.BusinessController = void 0;
const businessService_1 = require("../services/businessService");
class BusinessController {
    async basicInfo(req, res, next) {
        try {
            const ownerId = req.user.id;
            const { name, phone, segment } = req.body;
            const business = await businessService_1.businessService.createBasicInfo(ownerId, {
                name,
                phone,
                segment
            });
            res.status(201).json(business);
        }
        catch (err) {
            next(err);
        }
    }
    async location(req, res, next) {
        try {
            const business = await businessService_1.businessService.setLocation(req.body);
            res.status(200).json(business);
        }
        catch (err) {
            next(err);
        }
    }
    async finishStep1(req, res, next) {
        try {
            const { businessId } = req.body;
            const business = await businessService_1.businessService.finishStep1(businessId);
            res.status(200).json(business);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.BusinessController = BusinessController;
exports.businessController = new BusinessController();
