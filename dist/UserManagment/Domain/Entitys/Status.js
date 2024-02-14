"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const uuid_1 = require("uuid");
class Status {
    constructor(verifiedAt) {
        this.token = null;
        this.activationToken = this.generateShortToken();
        this.verifiedAt = verifiedAt;
    }
    generateShortToken() {
        const uuid = (0, uuid_1.v4)();
        return uuid.replace(/-/g, '').substring(0, 6);
    }
}
exports.Status = Status;
