import { Request, Response } from "express";
import { Op } from "sequelize";
import Category from "../models/category.model";
import Product from "../models/product.model";


/**
 * Class containing the functions to handle the categories
 */
export default class CategoryController {

    async getCategories(req: Request, res: Response) {
        try {

            // Initialize  array of filtered categories
            const categoryFiltred: any[] = [];
            
            // We obtain all the categories with their respective products
            const categories: any[] = await Category.findAll({
                include: {
                    model: Product,
                    as: 'products'
                }
            }) || [];

            // Add categories that have products
            categories.forEach(cat => {
                if(cat.products.length > 0) {
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

        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: 'Error al obtener categorías'
            });
        }
    }


}