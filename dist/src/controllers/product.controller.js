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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const product_helper_1 = require("../helpers/product.helper");
const category_model_1 = __importDefault(require("../models/category.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
/**
 * Class containing the functions to handle the products
 */
class ProductController {
    // Search products by (name, category, price range and page)
    getProductsByAtribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate if there was an error with the fields
                if (express_validator_1.validationResult(req).array().length > 0) {
                    return res.json({
                        success: false,
                        msg: 'Error al obtener productos'
                    });
                }
                /********************* Input fields ************************/
                const name = req.query.name;
                const categoryId = req.query.category;
                const prices = req.query.prices;
                const page = parseInt(req.query.page);
                /********************* END ************************/
                // Separate the maximum and minimum price
                const arr_prices = prices.split('_');
                const price_start = parseInt(arr_prices[0]) || 0;
                const price_end = parseInt(arr_prices[1]) || 100000;
                // Search a category by its id
                const category = (yield category_model_1.default.findByPk(categoryId)) || null;
                // Default search options
                let options = {
                    include: category_model_1.default,
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${name}%` // name like '%name%'
                        },
                        price: {
                            [sequelize_1.Op.between]: [price_start, price_end] // min between max
                        },
                    },
                    limit: product_helper_1.PRODUCT_LIMIT,
                    offset: product_helper_1.startPage(page)
                };
                // If category exists, we add it to the search
                if (category !== null) {
                    options.where.category = category === null || category === void 0 ? void 0 : category.id;
                }
                // Get the search result
                let result = yield product_model_1.default.findAndCountAll(options);
                return res.json({
                    success: true,
                    msg: 'Productos cargados correctamente',
                    total: result.count,
                    products: result.rows // Products matching search criteria
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    success: false,
                    msg: 'Error al obtener productos'
                });
            }
        });
    }
}
exports.default = ProductController;
