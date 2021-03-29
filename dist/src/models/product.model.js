"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
const category_model_1 = __importDefault(require("./category.model"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    urlImage: {
        type: sequelize_1.DataTypes.STRING,
        field: 'url_image',
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db_config_1.sequelize,
    tableName: 'product'
});
category_model_1.default.hasMany(Product, {
    foreignKey: 'category',
    sourceKey: 'id',
    as: 'products'
});
Product.belongsTo(category_model_1.default, {
    foreignKey: 'category'
});
exports.default = Product;
