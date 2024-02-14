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
exports.ActivateUserController = void 0;
class ActivateUserController {
    constructor(activateUserUseCase) {
        this.activateUserUseCase = activateUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.token.length < 6) {
                return res.status(400).json({
                    message: "El token no esta completo o es falso."
                });
            }
            const user = yield this.activateUserUseCase.run(req.params.token);
            return res.status(user.status).json(user);
        });
    }
}
exports.ActivateUserController = ActivateUserController;
