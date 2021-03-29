import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { PRODUCT_LIMIT, startPage } from "../helpers/product.helper";
import Category from "../models/category.model";
import Product from "../models/product.model";

/**
 * Class containing the functions to handle the products
 */
export default class ProductController {

    // Search products by (name, category, price range and page)
    async getProductsByAtribute(req: Request, res: Response) {
        try {

            // Validate if there was an error with the fields
            if(validationResult(req).array().length > 0) {
                return res.json({
                    success: false,
                    msg: 'Error al obtener productos'
                });
            }
            
            /********************* Input fields ************************/
            const name: string = req.query.name as string;
            const categoryId: string = req.query.category as string;
            const prices: string = req.query.prices as string;
            const page: number = parseInt(req.query.page as string);
            /********************* END ************************/

            // Separate the maximum and minimum price
            const arr_prices: string[] = prices.split('_');
            const price_start: number = parseInt(arr_prices[0]) || 0;
            const price_end: number = parseInt(arr_prices[1]) || 100000;

            // Search a category by its id
            const category = await Category.findByPk(categoryId) || null;

            // Default search options
            let options: any = {
                include: Category,
                where: {
                    name: {
                        [ Op.like ]: `%${ name }%` // name like '%name%'
                    },
                    price: {
                        [ Op.between ]: [ price_start, price_end ] // min between max
                    },
                },
                limit: PRODUCT_LIMIT,
                offset: startPage(page)
            }

            // If category exists, we add it to the search
            if(category !== null) {
                options.where.category = category?.id;
            }

            // Get the search result
            let result = await Product.findAndCountAll(options);

            return res.json({
                success: true,
                msg: 'Productos cargados correctamente',
                total: result.count, // Total quantity of products
                products: result.rows // Products matching search criteria
            });

        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: 'Error al obtener productos'
            });
        }
    }


}