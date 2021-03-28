import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db.config';
import Category from "./category.model";


class Product extends Model {
    id: number;
    name: string;
    urlImage: string;
    price: number;
    discount: number;
    category: number;
}

Product.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlImage: {
        type: DataTypes.STRING,
        field: 'url_image',
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    tableName: 'product'
});


Category.hasMany(Product, {
    foreignKey: 'category',
    sourceKey: 'id',
    as: 'products'
});

Product.belongsTo(Category, {
    foreignKey: 'category'
});



export default Product;