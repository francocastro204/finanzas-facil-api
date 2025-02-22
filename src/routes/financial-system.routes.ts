import { Router } from 'express';
import { FinancialSystemController } from '../controllers/financial-system.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

// Rutas para sistemas financieros por perfil
router.post('/profile/:profileId', 
  FinancialSystemController.create as unknown as RequestHandler
);
router.get('/profile/:profileId', 
  FinancialSystemController.getByProfile as unknown as RequestHandler
);

// Rutas para un sistema financiero específico
router.put('/:id', 
  FinancialSystemController.update as unknown as RequestHandler
);
router.delete('/:id', 
  FinancialSystemController.delete as unknown as RequestHandler
);

export default router; 