"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
const express_1 = require("express");
const logger_1 = __importDefault(require("../utils/logger"));
function loggerMiddleware(req, _res, next) {
    logger_1.default.info({ method: req.method, url: req.url });
    next();
}
//# sourceMappingURL=loggerMiddleware.js.map