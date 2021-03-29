"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const router = express_1.Router();
const categoryController = new category_controller_1.default();
/**
 * Single path to get filtered categories
 */
router.get('/', [], categoryController.getCategories);
exports.default = router;
