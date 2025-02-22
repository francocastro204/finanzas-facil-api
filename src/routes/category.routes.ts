import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware);
router.post('/', CategoryController.createCategory as RequestHandler);
router.get('/', CategoryController.getCategories as RequestHandler);

export default router; 