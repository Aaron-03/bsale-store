import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db.config';


class Category extends Model {
    id: number;
    name: string;
}

Category.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    tableName: 'category'
});


export default Category;