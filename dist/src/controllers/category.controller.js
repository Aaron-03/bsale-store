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
const category_model_1 = __importDefault(require("../models/category.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
/**
 * Class containing the functions to handle the categories
 */
class CategoryController {
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Initialize  array of filtered categories
                const categoryFiltred = [];
                // We obtain all the categories with their respective products
                const categories = (yield category_model_1.default.findAll({
                    include: {
                        model: product_model_1.default,
                        as: 'products'
                    }
                })) || [];
                // Add categories that have products
                categories.forEach(cat => {
                    if (cat.products.length > 0) {
                        categoryFiltred.push({
                            id: cat.id,
                            name: cat.name,
                            total: cat.products.length
                        });
                    }
                });
                return res.json({
                    success: true,
                    msg: 'Categorías cargadas correctamente',
                    categories: categoryFiltred // Send the filtered categories
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    success: false,
                    msg: 'Error al obtener categorías'
                });
            }
        });
    }
}
exports.default = CategoryController;
