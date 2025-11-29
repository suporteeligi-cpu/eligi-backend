"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishStepSchema = exports.locationSchema = exports.basicInfoSchema = void 0;
const zod_1 = require("zod");
exports.basicInfoSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    phone: zod_1.z.string().min(8).optional(),
    segment: zod_1.z.string().optional()
});
exports.locationSchema = zod_1.z.object({
    businessId: zod_1.z.string().uuid(),
    street: zod_1.z.string().min(2),
    number: zod_1.z.string().min(1),
    neighborhood: zod_1.z.string().min(2),
    city: zod_1.z.string().min(2),
    state: zod_1.z.string().min(2),
    zipCode: zod_1.z.string().min(4)
});
exports.finishStepSchema = zod_1.z.object({
    businessId: zod_1.z.string().uuid()
});
