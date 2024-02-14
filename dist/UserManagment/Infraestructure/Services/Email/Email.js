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
exports.EmailService = void 0;
const Mailer_1 = require("./Mailer");
class EmailService {
    run(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const opcionesCorreo = {
                from: 'user@gmail.com', // Debe ser el mismo email usado en la autenticación del transporter
                to: user.email,
                subject: 'Activacion de Cuenta', // Asunto del correo
                text: user.activationToken, // Cuerpo del correo en texto plano
                html: `<h1>Tu token de activación es: ${user.activationToken}.</h1>`,
            };
            try {
                // Enviar el correo
                const info = yield Mailer_1.transporter.sendMail(opcionesCorreo);
                console.log('Correo enviado con éxito: %s', info.messageId);
            }
            catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        });
    }
}
exports.EmailService = EmailService;
