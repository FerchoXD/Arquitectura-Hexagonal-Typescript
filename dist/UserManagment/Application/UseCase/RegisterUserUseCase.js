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
exports.RegisterUserUseCase = void 0;
const Contact_1 = require("../../Domain/Entitys/Contact");
const Credential_1 = require("../../Domain/Entitys/Credential");
const Status_1 = require("../../Domain/Entitys/Status");
const User_1 = require("../../Domain/Entitys/User");
class RegisterUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    run(name, lastname, cellphone, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contact = new Contact_1.Contact(name, lastname, cellphone);
                let credential = new Credential_1.Credential(email, password);
                yield credential.setHashPassword();
                let status = new Status_1.Status(new Date);
                let user = new User_1.User(contact, credential, status);
                const response = yield this.repository.save(user);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
