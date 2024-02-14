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
exports.RegisterUserController = void 0;
class RegisterUserController {
    constructor(registerUserUseCase, emailService) {
        this.registerUserUseCase = registerUserUseCase;
        this.emailService = emailService;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isNumberValid(req.body.cellphone)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "El número telefonico debe de tener una longitud de 10 caracteres."
                });
            }
            if (!this.emailIsValid(req.body.email)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "Estructura del email incorrecta."
                });
            }
            if (!this.nameIsValid(req.body.name + " " + req.body.lastname)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "No tienes un nombre valido."
                });
            }
            if (!this.passwordIsValid(req.body.password)) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial."
                });
            }
            const user = yield this.registerUserUseCase.run(req.body.name, req.body.lastname, req.body.cellphone, req.body.email, req.body.password);
            if (user.error === true) {
                return res.status(500).json(user);
            }
            yield this.emailService.run(user);
            return res.status(200).json(user);
        });
    }
    isNumberValid(number) {
        if (number.length != 10) {
            return false;
        }
        return true;
    }
    emailIsValid(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }
    nameIsValid(name) {
        console.log(name);
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s-]+$/;
        return regex.test(name);
    }
    passwordIsValid(password) {
        // Explicación de la expresión regular:
        // ^(?=.*\d)             : Debe contener al menos un dígito
        // (?=.*[!@#$%^&*])      : Debe contener al menos un carácter especial
        // (?=.*[A-Za-z])        : Debe contener al menos una letra (mayúscula o minúscula)
        // .{8,}                 : Debe tener al menos 8 caracteres de longitud
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
        return regex.test(password);
    }
}
exports.RegisterUserController = RegisterUserController;
