"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.Router();
const productController = new product_controller_1.default();
// Single search path
router.get('/', [
    express_validator_1.query('name', 'El nombre no es válido').escape().default(''),
    express_validator_1.query('category', 'La categoría no es válido').escape().default(-1),
    express_validator_1.query('prices', 'El precio no es válido').escape().default('0_1000000'),
    express_validator_1.query('page', 'La página no es válida').exists().escape().isInt().default(1)
], productController.getProductsByAtribute);
exports.default = router;
