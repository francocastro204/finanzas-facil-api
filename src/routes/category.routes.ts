import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

// Corregir los nombres de los métodos para que coincidan con el controlador
router.post('/', CategoryController.create as unknown as RequestHandler);
router.get('/', CategoryController.getCategories as unknown as RequestHandler);

export default router; 