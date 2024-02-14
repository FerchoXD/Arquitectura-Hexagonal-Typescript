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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
class LoginUserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.emailIsValid(req.body.email)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "Estructura del email incorrecta."
                });
            }
            if (!this.passwordIsValid(req.body.password)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
                });
            }
            const response = yield this.loginUserUseCase.run(req.body.email, req.body.password);
            return res.status(response.status).json(response);
        });
    }
    emailIsValid(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }
    passwordIsValid(password) {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
        return regex.test(password);
    }
}
exports.LoginUserController = LoginUserController;
