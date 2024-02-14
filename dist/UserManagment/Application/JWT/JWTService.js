"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    static generateToken(id, email) {
        const payload = { userId: id, email: email };
        return jsonwebtoken_1.default.sign(payload, 'miClaveSecretaSuperSegura123!$', { expiresIn: '1h' });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, 'miClaveSecretaSuperSegura123!$');
        }
        catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}
exports.JWTService = JWTService;
