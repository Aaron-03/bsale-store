"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * API Routes
 */
const category_routes_1 = __importDefault(require("../routes/category.routes"));
const product_routes_1 = __importDefault(require("../routes/product.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        dotenv_1.default.config();
        this.app.set('port', process.env.PORT || this.port || 4000);
    }
    routes() {
        this.app.use('/api/products', product_routes_1.default);
        this.app.use('/api/categories', category_routes_1.default);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '/../../public')));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Run in port -p ${this.app.get('port')}`);
        });
    }
}
exports.default = App;
