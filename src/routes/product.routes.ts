import { Router } from 'express';
import { param, query } from 'express-validator';
import ProductController from '../controllers/product.controller';

const router: Router = Router();
const productController = new ProductController();

// Single search path
router.get(
    '/',
    [   // URL parameters
        query('name', 'El nombre no es válido').escape().default(''),
        query('category', 'La categoría no es válido').escape().default(-1),
        query('prices', 'El precio no es válido').escape().default('0_1000000'),
        query('page', 'La página no es válida').exists().escape().isInt().default(1)
    ],
    productController.getProductsByAtribute
);


export default router;
