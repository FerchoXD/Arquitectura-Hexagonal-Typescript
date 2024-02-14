"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(contact, credential, status) {
        this.contact = contact;
        this.credential = credential;
        this.status = status;
        this.uuid = this.generateUuid();
    }
    generateUuid() {
        return (0, uuid_1.v4)();
    }
}
exports.User = User;
