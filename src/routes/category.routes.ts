import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const router: Router = Router();
const categoryController = new CategoryController();

/**
 * Single path to get filtered categories
 */
router.get(
    '/',
    [],
    categoryController.getCategories
);

export default router;
