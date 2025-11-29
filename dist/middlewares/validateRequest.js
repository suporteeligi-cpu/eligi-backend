"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: result.error.flatten()
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
