import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const router: Router = Router();
const categoryController = new CategoryController();


router.get(
    '/',
    [],
    categoryController.getCategories
);

router.get(
    '/prices',
    [],
    categoryController.getCategories
);

export default router;
