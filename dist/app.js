"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./src/config/app.config"));
const db_config_1 = __importDefault(require("./src/config/db.config"));
//import { dbtest } from './src/config/db.config';
function main() {
    const app = new app_config_1.default(4000);
    app.listen();
    // Prueba de conexión a la DB
    db_config_1.default.connectDB();
}
main();
