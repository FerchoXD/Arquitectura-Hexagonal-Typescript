"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(name, lastname, cellphone) {
        this.name = name;
        this.lastname = lastname;
        this.fullname = name + " " + lastname;
        this.cellphone = cellphone;
    }
    getFullName() {
        return this.fullname;
    }
}
exports.Contact = Contact;
