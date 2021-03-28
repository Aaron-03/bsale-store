import { Router } from 'express';
import { param, query } from 'express-validator';
import ProductController from '../controllers/product.controller';

const router: Router = Router();
const productController = new ProductController();


router.get(
    '/name',
    [
        query('q', 'El nombre no es válido').exists().escape(),
        query('page', 'La página no es válida').exists().escape().isInt()
    ],
    productController.getProductsByName
);

router.get(
    '/',
    [
        // query('name', 'El nombre no es válido').escape(),
        // query('category', 'La categoría no es válido').escape(),
        // query('prices', 'El precio no es válido').escape(),
        // query('page', 'La página no es válida').exists().escape().isInt
    ],
    productController.getProductsByAtribute
);


export default router;
