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
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
/**
 * Class containing the database configuration
 */
class DatabaseConfig {
    // Set the database parameters
    constructor() {
        this.host = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
        this.database = 'bsale_test';
        this.username = 'bsale_test';
        this.password = 'bsale_test';
    }
    // Start connection with the database
    static connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield exports.sequelize.authenticate();
                console.log('Conexión exitosa!');
            }
            catch (error) {
                console.error('No es posible conectar con la DB');
            }
        });
    }
}
exports.default = DatabaseConfig;
const databaseConfig = new DatabaseConfig();
// Assign the database configuration to Sequelize
exports.sequelize = new sequelize_1.Sequelize(Object.assign(Object.assign({}, databaseConfig), { dialect: 'mysql' }));
