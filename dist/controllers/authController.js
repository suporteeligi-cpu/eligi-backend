"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, name } = req.body;
            const result = await authService_1.authService.register({ email, password, name });
            res.status(201).json({
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name
                },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService_1.authService.login({ email, password });
            res.status(200).json({
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name
                },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        }
        catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await authService_1.authService.refreshToken(refreshToken);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            await authService_1.authService.logout(refreshToken);
            res.status(200).json({ message: 'Logged out' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
