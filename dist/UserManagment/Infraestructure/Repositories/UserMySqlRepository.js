"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMySqlRepository = void 0;
const User_1 = require("../Models/MySQL/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWTService_1 = require("../../Application/JWT/JWTService");
class UserMySqlRepository {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userResponse = yield User_1.UserModel.create({
                    id: user.uuid,
                    name: user.contact.name,
                    lastname: user.contact.lastname,
                    cellphone: user.contact.cellphone,
                    email: user.credential.email,
                    password: user.credential.password,
                    token: user.status.token,
                    activationToken: user.status.activationToken,
                    verifiedAt: null
                });
                return userResponse.dataValues;
            }
            catch (error) {
                if (error instanceof Error && 'errors' in error && Array.isArray(error.errors) && error.errors.length > 0) {
                    return {
                        message: error.errors[0].message,
                        error: true
                    };
                }
                else {
                    return {
                        message: 'Ocurrió un error al guardar el usuario.',
                        error: true
                    };
                }
            }
        });
    }
    update(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findOne({
                    where: {
                        activationToken: token,
                        verifiedAt: null,
                    }
                });
                if (!user) {
                    return {
                        status: 404,
                        message: 'Usuario no encontrado o ya activado.'
                    };
                }
                user.verifiedAt = new Date();
                yield user.save();
                return {
                    status: 200,
                    response: user
                };
            }
            catch (error) {
                console.error(error);
                return {
                    status: 500,
                    message: 'Hubo un problema al intentar la actualización del recurso.'
                };
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findOne({ where: { email: email } });
                if (!user) {
                    return {
                        status: 404,
                        message: 'Usuario no encontrado.'
                    };
                }
                if (!user.verifiedAt) {
                    return {
                        status: 403,
                        message: 'La cuenta no está activada.'
                    };
                }
                const passwordIsValid = bcrypt_1.default.compareSync(password, user.password);
                if (!passwordIsValid) {
                    return {
                        status: 401,
                        message: 'Contraseña incorrecta.'
                    };
                }
                const token = JWTService_1.JWTService.generateToken(user.id, user.email);
                user.token = token;
                yield user.save();
                return {
                    status: 200,
                    message: 'Inicio de sesión exitoso.',
                    token: token
                };
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                return {
                    status: 500,
                    message: 'Error interno del servidor.'
                };
            }
        });
    }
    logout(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findOne({ where: { email: email } });
                if (!user) {
                    return {
                        status: 404,
                        message: 'Usuario no encontrado.'
                    };
                }
                if (!user.verifiedAt) {
                    return {
                        status: 403,
                        message: 'La cuenta no está activada.'
                    };
                }
                if (!user.token) {
                    return {
                        status: 403,
                        message: 'No has iniciado sesión.'
                    };
                }
                user.token = null;
                yield user.save();
                return {
                    status: 200,
                    message: 'Cierre de sesión exitoso.',
                };
            }
            catch (error) {
                console.error('Error al cerrar sesión:', error);
                return {
                    status: 500,
                    message: 'Error interno del servidor.'
                };
            }
        });
    }
}
exports.UserMySqlRepository = UserMySqlRepository;
