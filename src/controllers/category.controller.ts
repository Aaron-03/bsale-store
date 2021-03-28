import { Request, Response } from "express";
import { Op } from "sequelize";
import Category from "../models/category.model";
import Product from "../models/product.model";



export default class CategoryController {

    async getCategories(req: Request, res: Response) {
        try {

            const categoryFiltred: any[] = [];
            
            const categories: any[] = await Category.findAll({
                include: {
                    model: Product,
                    as: 'products'
                }
            }) || [];

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
                categories: categoryFiltred
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