"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUserController = exports.loginUserController = exports.activateUserController = exports.registerUserController = void 0;
const MySQLConfig_1 = require("../../Database/Config/MySQL/MySQLConfig");
const RegisterUserUseCase_1 = require("../Application/UseCase/RegisterUserUseCase");
const RegisterUserController_1 = require("./Controllers/RegisterUserController");
const UserMySqlRepository_1 = require("./Repositories/UserMySqlRepository");
const UserMongoRepository_1 = require("./Repositories/UserMongoRepository");
const MongoConfig_1 = require("../../Database/Config/MongoDb/MongoConfig");
const Email_1 = require("./Services/Email/Email");
const ActivateUserUseCase_1 = require("../Application/UseCase/ActivateUserUseCase");
const ActivateUserController_1 = require("./Controllers/ActivateUserController");
const LoginUserUseCase_1 = require("../Application/UseCase/LoginUserUseCase");
const LoginUserController_1 = require("./Controllers/LoginUserController");
const LogoutUserUseCase_1 = require("../Application/UseCase/LogoutUserUseCase");
const LogoutUserController_1 = require("./Controllers/LogoutUserController");
const mysqlRepository = new UserMySqlRepository_1.UserMySqlRepository();
const mongoRepository = new UserMongoRepository_1.UserMongoRepository();
const currentRepository = mysqlRepository;
function getDatabaseConfig(currentRepository) {
    if (currentRepository instanceof UserMySqlRepository_1.UserMySqlRepository) {
        return new MySQLConfig_1.MySQLConfig();
    }
    else if (currentRepository instanceof UserMongoRepository_1.UserMongoRepository) {
        return new MongoConfig_1.MongoConfig();
    }
    throw new Error('Unsupported repository type');
}
const registerUserUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(currentRepository);
const registerUserController = new RegisterUserController_1.RegisterUserController(registerUserUseCase, new Email_1.EmailService());
exports.registerUserController = registerUserController;
const activateUserUseCase = new ActivateUserUseCase_1.ActivateUserUseCase(currentRepository);
const activateUserController = new ActivateUserController_1.ActivateUserController(activateUserUseCase);
exports.activateUserController = activateUserController;
const loginUserUseCase = new LoginUserUseCase_1.LoginUserUseCase(currentRepository);
const loginUserController = new LoginUserController_1.LoginUserController(loginUserUseCase);
exports.loginUserController = loginUserController;
const logoutUserUseCase = new LogoutUserUseCase_1.LogoutUserUseCase(currentRepository);
const logoutUserController = new LogoutUserController_1.LogoutUserController(logoutUserUseCase);
exports.logoutUserController = logoutUserController;
const dbConfig = getDatabaseConfig(currentRepository);
dbConfig.initialize().then(() => {
    console.log('Database initialized.');
});
