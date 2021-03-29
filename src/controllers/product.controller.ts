import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { PRODUCT_LIMIT, startPage } from "../helpers/product.helper";
import Category from "../models/category.model";
import Product from "../models/product.model";


export default class ProductController {


    async getProductsByName(req: Request, res: Response) {
        try {

            if(validationResult(req).array().length > 0) {
                return res.json({
                    success: false,
                    msg: 'Error al obtener productos'
                });
            }

            const name: string = req.query.name as string || '';
            const page: number = parseInt(req.query.page as string) || 1;

            const products: Product[] = await Product.findAll({
                where: {
                    name: {
                        [ Op.like ]: `%${ name }%`
                    }
                },
                limit: PRODUCT_LIMIT,
                offset: startPage(page)
            });


            return res.json({
                success: true,
                msg: 'Productos cargados correctamente',
                products
            });

        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: 'Error al obtener productos por nombre'
            });
        }
    }

    async getProductsByAtribute(req: Request, res: Response) {
        try {
            
            const name: string = req.query.name as string || '';
            const categoryId: string = req.query.category as string || '';
            const prices: string = req.query.prices as string || '';
            const page: number = parseInt(req.query.page as string) || 1;

            const arr_prices: string[] = prices.split('_');

            const price_start: number = parseInt(arr_prices[0]) || 0;
            const price_end: number = parseInt(arr_prices[1]) || 100000;

            console.log('DATOS CORRECTOS: ', name, categoryId, prices)

            const category = await Category.findByPk(categoryId) || null;

            let result: any = {};

            if(category === null) {
                result = await Product.findAndCountAll({
                    include: Category,
                    where: {
                        name: {
                            [ Op.like ]: `%${ name }%`
                        },
                        price: {
                            [ Op.between ]: [ price_start, price_end ]
                        },
                    },
                    limit: PRODUCT_LIMIT,
                    offset: startPage(page)
                });
            } else {
                result = await Product.findAndCountAll({
                    include: Category,
                    where: {
                        name: {
                            [ Op.like ]: `%${ name }%`
                        },
                        category: category?.id,
                        price: {
                            [ Op.between ]: [ price_start, price_end ]
                        },
                    },
                    limit: PRODUCT_LIMIT,
                    offset: startPage(page)
                });
            }

            return res.json({
                success: true,
                msg: 'Productos cargados correctamente',
                name,
                categoryId,
                prices,
                total: result.count,
                products: result.rows
            });


        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: 'Error al obtener productos por nombre'
            });
        }
    }


}